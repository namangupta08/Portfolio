---
title: "Budget alerts that fire once"
date: "2025-09-18"
description: "Designing deterministic threshold notification state machines for personal finance systems without duplicate alert fatigue."
tags: ["Node.js", "PostgreSQL", "SpendWise", "Fintech"]
draft: true
---

Threshold notifications are one of the most critical features in financial applications, yet they are notoriously easy to implement poorly. If a user receives five push notifications every time they buy a coffee simply because their monthly budget is already above 80%, they will mute notifications immediately. Conversely, if an alert fails to re-arm after a user returns an item or deletes a recorded expense, future threshold breaches will pass unnoticed.

In SpendWise, I designed an alert evaluation engine built around a single rule: alerts must trigger exactly once per threshold crossing, while reliably resetting whenever financial state drops back below the boundary.

Here is the architecture and state management logic behind the SpendWise budget alert engine.

## The Dual Threshold Rule

SpendWise monitors category budgets using two defined trigger points:

1. **80% Utilization Threshold**: An early warning alert informing the user that discretionary spending has consumed four-fifths of the allocated envelope.
2. **100% Utilization Threshold**: A critical breach alert indicating that the budget limit has been reached or exceeded.

Each threshold represents an independent state transition. Crossing 80% fires the warning alert. Subsequent transactions that remain between 81% and 99% must not re-trigger the 80% notification. Crossing from 99% to 101% must trigger only the 100% alert, leaving the 80% alert in its triggered state.

## Event-Driven Recomputation

Rather than running heavy polling cron jobs scanning all user accounts every few minutes, SpendWise recalculates budget status immediately on transaction mutation events:

- When an **expense is created**
- When an **expense is edited** (amount modified or category reallocated)
- When an **expense is deleted**

Whenever one of these three operations commits to PostgreSQL, the alert evaluation pipeline executes within the same transactional context or via an immediate domain event:

```typescript
async function reevaluateBudgetAlerts(budgetId: string, client: DatabaseClient) {
  // 1. Fetch budget limits and current alert state
  const budget = await client.getBudgetWithAlertState(budgetId);

  // 2. Compute aggregate spend for the active billing cycle
  const totalSpent = await client.getMonthlySpendForCategory(
    budget.userId,
    budget.categoryId,
    budget.cycleStart,
    budget.cycleEnd
  );

  const usageRatio = totalSpent / budget.allocatedAmount;

  // 3. Evaluate 80% threshold state transition
  if (usageRatio >= 0.8 && !budget.hasAlerted80) {
    await sendAlert(budget.userId, budgetId, "80_PERCENT_BREACH", usageRatio);
    await client.updateAlertState(budgetId, { hasAlerted80: true });
  } else if (usageRatio < 0.8 && budget.hasAlerted80) {
    // Reset state if spend drops below threshold
    await client.updateAlertState(budgetId, { hasAlerted80: false });
  }

  // 4. Evaluate 100% threshold state transition
  if (usageRatio >= 1.0 && !budget.hasAlerted100) {
    await sendAlert(budget.userId, budgetId, "100_PERCENT_BREACH", usageRatio);
    await client.updateAlertState(budgetId, { hasAlerted100: true });
  } else if (usageRatio < 1.0 && budget.hasAlerted100) {
    // Reset state if spend drops below threshold
    await client.updateAlertState(budgetId, { hasAlerted100: false });
  }
}
```

## Handling Downward State Resets

The crucial aspect of the state machine is handling downward revisions. In personal finance, transactions are not strictly append-only:

- A user enters $150 instead of $15 by typo and edits the row.
- A merchant issues a refund or voided transaction.
- An accidental duplicate entry is deleted.

When an expense is modified or deleted, the usage ratio drops. If a user previously stood at 84% budget consumption (`hasAlerted80: true`) and deletes a $100 expense, their new consumption might fall to 74%.

SpendWise detects this transition (`usageRatio < 0.8 && budget.hasAlerted80`) and automatically flips `hasAlerted80` back to `false`. 

If the user later makes additional purchases that climb back past 80%, the alert will fire again cleanly. This bidirectional state machine guarantees that users are never spammed for subsequent purchases while above a threshold, yet never miss an alert after legitimate budget adjustments.

## Summary

By maintaining explicit boolean states (`hasAlerted80`, `hasAlerted100`) per budget cycle, evaluating triggers strictly on expense creation, editing, and deletion, and resetting the state whenever expenditures drop below thresholds, SpendWise delivers deterministic alerts that fire exactly once per crossing.
