---
title: "Handling LLM quota errors with model failover"
date: "2025-07-20"
description: "How VistaVoyage handles unpredictable Gemini API rate limits with fallback chains and schema-safe recovery."
tags: ["AI", "LLM", "Gemini API", "Resilience"]
draft: true
---

# Handling LLM quota errors with model failover

## Overview
Lessons learned building resilient trip planning flows in VistaVoyage without dropping traveler state.

## Outline & Topics to Cover
- **The Problem with Raw LLM Calls**:
  - Rate limiting (429 Too Many Requests) and sudden quota depletion during peak hours.
  - The bad user experience of restarting a multi-step travel wizard when generation fails.
- **Designing the Model Fallback Chain**:
  - Prioritizing Gemini 1.5 Flash for speed and cost.
  - Seamlessly switching to backup Gemini models upon specific error codes.
  - Exponential backoff with jitter on transient network errors.
- **Strict Schema Adherence Across Models**:
  - Why different models produce subtly different JSON shapes.
  - Enforcing output conformity via Zod validation pipelines.
  - Sanitizing responses before state hydration.
- **Modular Section & Day Regeneration**:
  - Isolating itinerary days so a failover or retry only impacts the selected segment.
  - Preserving previous context in the prompt while regenerating specific details.
- **Production Checklist**:
  - Handling client-side state recovery.
  - Monitoring failure rates across primary and fallback endpoints.
