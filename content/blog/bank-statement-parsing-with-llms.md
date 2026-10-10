---
title: "Parsing Messy Bank Statements with LLMs and LangGraph"
date: "2025-11-20"
summary: "How we replaced dozens of fragile regex parsers with a resilient LangGraph extraction pipeline, handling 10+ bank layouts with 95% field accuracy."
readTime: "4 min read"
tags: ["LLM", "LangGraph", "Python", "Data Extraction", "Architecture"]
---

Bank statements are a notorious nightmare in financial software. Every institution invents its own tabular formatting, splits transactions across arbitrary line breaks, formats dates inconsistently (`DD/MM/YYYY` vs. `MM-DD-YY`), and collapses debit/credit amounts into confusing dual-column or signed single-column layouts.

At Epigee, our legacy ingestion pipeline relied on dozens of handcrafted regex scripts and template matchers. The result was predictable: whenever a bank updated its PDF export styling or introduced multi-line payee notes, the parser broke silently or produced phantom reconciliation errors.

Here is how we redesigned bank statement parsing from scratch using LangGraph and structured LLM extraction.

---

## The Core Challenge: Why Naive Prompts Fail

Dumping an entire raw bank statement PDF into an LLM context window with a prompt like *"Extract all transactions as JSON"* fails catastrophically for three reasons:

1. **Context Bloat & Token Cost**: A 15-page corporate statement can easily span 40,000 tokens of raw text. Sending all pages in a single prompt is expensive and triggers model attention drift.
2. **Hallucinated Balances**: Small numeric discrepancies (e.g., misreading `$1,240.50` as `$1,240.00`) destroy automated ledger balancing.
3. **Table Alignment Loss**: Raw PDF text extractors (like `pdfplumber` or `pypdf`) frequently interleave columns across rows when text coordinates are slightly shifted.

---

## The Architecture: State-Driven Chunking with LangGraph

Rather than a single giant prompt, we built a cyclic state graph in LangGraph that breaks parsing into deterministic phases:

```
[PDF Ingestion & Page Chunking]
              ↓
  [Header & Account Meta Node]
              ↓
  [Table Boundary Detection Node]
              ↓
  [Transaction Batch Extractor Node] ⟲ (Iterates page chunks)
              ↓
     [Arithmetic Validation Node]
              ↓
      (Pass?) ──Yes──→ [Normalized Schema Output]
         │
        No
         ↓
  [Targeted LLM Error Correction Node]
```

### 1. Header & Account Meta Extraction
The first node inspects only the header region of page 1. It extracts:
- Account holder name
- Account number (masked)
- Opening & closing balance
- Statement date range
- Currency code

This metadata establishes the *ground truth invariants* for the rest of the pipeline.

### 2. Chunking Transactions by Visual Anchors
We slice statement pages into 15–20 transaction chunks. Each chunk preserves page coordinates so the model receives spatial cues alongside text tokens.

### 3. Strict Schema Validation with Pydantic & Zod
Every extracted batch must satisfy a strict schema:

```typescript
interface ExtractedTransaction {
  date: string; // ISO 8601 YYYY-MM-DD
  description: string;
  type: "DEBIT" | "CREDIT";
  amount: number; // Positive float
  runningBalance?: number;
  confidenceScore: number;
}
```

If the LLM returns an ambiguous debit/credit indicator, the schema validator flags the record immediately before it reaches the database.

---

## The Arithmetic Self-Correction Loop

The most crucial innovation in our pipeline was the **Arithmetic Validation Node**. 

Financial statements have a mathematical invariant:
$$\text{Opening Balance} + \sum \text{Credits} - \sum \text{Debits} = \text{Closing Balance}$$

If our computed balance differs from the statement's reported closing balance by even one cent, the LangGraph workflow triggers a targeted correction cycle:

1. It calculates the exact difference ($\Delta$).
2. It pinpoints the batch of transactions most likely responsible (e.g., transactions near page breaks or those with ambiguous signs).
3. It passes the specific diff back to the LLM with a targeted prompt:
   > *"The sum of transactions is off by +$42.50. Check the transactions on Page 3 where line wrapping may have conjoined a fee with a transfer."*

In benchmark testing across 10+ bank formats, this single self-correction loop boosted extraction field accuracy from **81% to over 95%**, completely eliminating manual data-entry fallbacks for finance teams.

---

## Lessons Learned

1. **Don't ask the LLM to do arithmetic**: Let the LLM do pattern extraction into JSON, and let Python/TypeScript verify math.
2. **Cycle over failure instead of guessing**: Multi-agent cyclic graphs beat single-pass prompts every single time on structured enterprise documents.
3. **Store the raw line references**: Always store the bounding box or source line with each extracted record so users can visually inspect flagged anomalies with zero friction.
