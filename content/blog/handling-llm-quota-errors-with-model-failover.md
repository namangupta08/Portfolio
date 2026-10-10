---
title: "Handling LLM quota errors with model failover"
date: "2025-09-05"
description: "Designing reliable multi-tier LLM generation pipelines with structured Zod schema validation and HTTP 429/503 failover handling."
tags: ["AI", "Gemini API", "TypeScript", "VistaVoyage"]
draft: true
---

Integrating large language models into user-facing production features introduces failure modes that traditional backend services rarely encounter. Beyond general network timeouts, external LLM endpoints frequently trigger rate limit errors (HTTP 429) or transient server saturation (HTTP 503). Furthermore, even when an HTTP response arrives successfully, the generated text can deviate from the expected JSON structure.

When developing VistaVoyage—an AI trip planner generating day-by-day itineraries across multiple wizard steps—handling provider constraints deterministically was essential. This post outlines the failover architecture implemented in VistaVoyage, our Zod schema validation strategy, and findings from a 30-run benchmark test.

## Tiered Model Pool Architecture

Rather than binding the application client to a single model endpoint, VistaVoyage defines a tiered pool of Gemini models arranged in order of preference. 

The application maintains a prioritized array of models:
1. Primary tier model (e.g., fastest or highest capacity variant)
2. Secondary fallback model
3. Tertiary emergency fallback model

When generating an itinerary, the request router attempts the primary model first. If the API returns a transient error—specifically HTTP 429 (Rate Limit / Quota Exceeded) or HTTP 503 (Service Unavailable)—the router catches the status code and immediately switches execution to the next model in the tiered pool.

```typescript
async function executeWithFailover(prompt: string, modelPool: string[]) {
  let lastError: Error | null = null;

  for (const model of modelPool) {
    try {
      const response = await callGeminiModel(model, prompt);
      return response;
    } catch (error: any) {
      const status = error?.status || error?.response?.status;
      // Switch on rate limit or provider unavailability
      if (status === 429 || status === 503) {
        lastError = error;
        continue; // Fall over to next model tier
      }
      throw error; // Rethrow unexpected application errors
    }
  }

  throw new Error(`All model tiers exhausted: ${lastError?.message}`);
}
```

This failover logic shields users from transient outages on any single provider endpoint without requiring manual page refreshes.

## Structured Output Validation with Zod

Even after a model returns an HTTP 200 payload, the string output cannot be assumed to match the frontend UI contracts. Travel planning requires strict objects containing activities, timestamps, geo-coordinates, and budgetary estimates.

To guarantee type safety, VistaVoyage validates every model response against a rigorous Zod schema:

```typescript
const ItineraryDaySchema = z.object({
  dayNumber: z.number().int().positive(),
  summary: z.string().min(5),
  activities: z.array(
    z.object({
      time: z.string(),
      title: z.string(),
      description: z.string(),
      estimatedCost: z.number().nonnegative(),
    })
  ).min(1),
});
```

If the LLM output violates the schema (for example, omitting an estimated cost or returning an empty activity list), VistaVoyage does not immediately crash or fail the user request.

Instead, the system triggers exactly **one targeted retry**. The retry prompt includes both the original instruction and the specific Zod validation error message formatted as text. By providing the model with the exact field path that failed validation, the second attempt allows the model to correct its schema output deterministically.

## Benchmark Results: 30-Run Test

To measure the effectiveness and limits of this setup, I executed a controlled benchmark consisting of 30 sequential full itinerary generation runs against the Gemini free-tier endpoint.

The recorded test data revealed clear behavior:

- **First 16 Runs**: Passed Zod schema validation cleanly on the very first attempt without needing a corrective retry. The structured system instructions produced conforming JSON objects consistently.
- **Runs 17 through 20**: Completed successfully across the tiered pool.
- **Runs 21 through 30**: Encountered the hard free-tier quota ceiling of 20 requests per day. Once the daily allowance was completely consumed across all free tiers, the provider returned HTTP 429 for the remainder of the benchmark.

## Takeaways

1. **Structured validation prevents silent UI failures**: Zod validation ensures broken or incomplete model payloads are trapped at the API boundary before reaching React render trees.
2. **One targeted retry with error context works**: When an output fails validation, feeding the exact schema error back to the model resolves structural omissions efficiently.
3. **Failover extends availability but respects hard quotas**: A tiered pool successfully mitigates transient 503 errors and per-minute 429 bursts, but when a provider account reaches a hard global daily quota (such as 20 requests per day on free tier), graceful client-side messaging and caching remain indispensable.
