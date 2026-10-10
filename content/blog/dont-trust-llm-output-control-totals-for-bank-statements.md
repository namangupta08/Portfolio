---
title: "Don't trust LLM output: control totals for bank statements"
date: "2025-10-02"
description: "Why generative models cannot be trusted for financial extraction alone, and how arithmetic control totals guarantee parsing integrity across document layouts."
tags: ["AI", "Architecture", "Fintech", "Data Pipelines"]
draft: true
---

Large language models and vision-based document extractors have made extracting unstructured text from arbitrary document layouts dramatically easier. Instead of writing dozens of fragile regular expressions or bespoke bounding-box coordinate parsers for every new document template, a multimodal pipeline can inspect a PDF statement and return structured rows in seconds.

However, in financial systems, there is an inescapable rule: **probabilistic systems cannot be trusted blindly with financial accounting.**

LLMs are statistical token predictors, not calculators. In real-world document ingestion, an LLM can silently drop a transaction row on a crowded table border, transpose two adjacent digits, or misread an amount due to visual artifacts. A single missing $500 debit corrupts an entire reconciliation ledger.

To solve this across more than 10 distinct statement layouts, I designed an extraction pipeline centered around deterministic mathematical verification: **control totals**.

## How LLMs Fail on Financial Documents

When extracting transaction tables from multi-page statements, LLMs exhibit two subtle failure modes:

1. **Row Dropping**: When a transaction table spans across page boundaries or contains tightly packed rows with faint dividing rules, attention mechanisms occasionally skip an item. The resulting JSON appears syntactically valid and cleanly formatted, but a ledger record is quietly omitted.
2. **Amount Transcription Errors**: Character recognition errors (such as reading a comma as a decimal point, confusing "8" and "3", or assigning a credit to a debit column) cause individual transaction values to drift from the actual document.

If an application ingests LLM responses directly into a database without validation, these errors remain invisible until an analyst or auditor manually audits the records weeks later.

## Implementing Deterministic Control Totals

Almost every formal bank statement layout provides summary metadata alongside the detailed transaction ledger:
- Total opening balance
- Total closing balance
- Statement transaction count (e.g., "Total Transactions: 48")
- Summary total of all debits / withdrawals (e.g., "Total Debits: $14,250.00")
- Summary total of all credits / deposits (e.g., "Total Credits: $22,100.50")

These summary values provide an exact arithmetic bounding box for the document. 

Rather than having the LLM just extract transaction rows, our pipeline instructs the model to extract the stated summary totals as separate, isolated header fields:

```typescript
interface ExtractedStatement {
  statementMetadata: {
    reportedTransactionCount: number;
    reportedTotalDebits: number;
    reportedTotalCredits: number;
    openingBalance: number;
    closingBalance: number;
  };
  transactions: Array<{
    date: string;
    description: string;
    type: "debit" | "credit";
    amount: number;
  }>;
}
```

## The Verification Gate

Once the document fields are extracted, the pipeline immediately transfers control to a deterministic verification step. No LLM logic is involved in this verification—it is pure arithmetic:

```typescript
function verifyStatementIntegrity(statement: ExtractedStatement): VerificationResult {
  const { statementMetadata, transactions } = statement;

  // 1. Verify transaction count parity
  const actualCount = transactions.length;
  const countMatches = actualCount === statementMetadata.reportedTransactionCount;

  // 2. Calculate sum of individual debits and credits
  const computedTotalDebits = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const computedTotalCredits = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  // 3. Compare with epsilon tolerance for floating-point arithmetic
  const debitsMatch = Math.abs(computedTotalDebits - statementMetadata.reportedTotalDebits) < 0.01;
  const creditsMatch = Math.abs(computedTotalCredits - statementMetadata.reportedTotalCredits) < 0.01;

  // 4. Verify balance reconciliation equation
  const computedClosingBalance = statementMetadata.openingBalance + computedTotalCredits - computedTotalDebits;
  const balanceMatches = Math.abs(computedClosingBalance - statementMetadata.closingBalance) < 0.01;

  const isValid = countMatches && debitsMatch && creditsMatch && balanceMatches;

  return {
    isValid,
    actualCount,
    reportedCount: statementMetadata.reportedTransactionCount,
    computedTotalDebits,
    reportedTotalDebits: statementMetadata.reportedTotalDebits,
    computedTotalCredits,
    reportedTotalCredits: statementMetadata.reportedTotalCredits,
  };
}
```

## How the Pipeline Responds to Discrepancies

If all control totals match—the transaction count equals the reported count, the sum of debits equals total debits, and the balance equation holds—the extracted data is approved for automated reconciliation.

If any check fails:
- The system flags the exact discrepancy (e.g., "Extracted 47 transactions, but statement reports 48; debits are short by $45.00").
- The pipeline re-prompts the ingestion engine with the specific bounding discrepancy or flags the file for human analyst review with visual side-by-side highlighting.

## Generalizing Across 10+ Layouts

This control total architecture has proven remarkably robust across more than 10 distinct statement layouts. While each financial institution arranges tables, columns, dates, and typography differently, the fundamental accounting identity never changes:

$$\text{Opening Balance} + \sum \text{Credits} - \sum \text{Debits} = \text{Closing Balance}$$

By coupling LLM flexibility for parsing diverse document layouts with deterministic arithmetic verification, the pipeline eliminates silent extraction errors and guarantees accounting integrity.
