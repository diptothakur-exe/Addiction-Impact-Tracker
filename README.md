<div align="center">

# Addiction Impact Tracker

**An estimated health-risk model for cigarettes, alcohol, and behavioral addiction - no login, no database, no tracking.**

[Live Demo](https://habitrisk.vercel.app/)

</div>

---

## Goal

Most addiction-risk calculators either require an account or hide their logic behind a black box. This tool does neither. It's a stateless, server-rendered risk model: you enter your habit data, it computes a transparent score using a formula you can read yourself, and nothing is stored.

The intent isn't diagnosis - it's giving someone a fast, honest, numeric reflection of where a habit currently sits, and where it's headed if nothing changes.

---

## Core Features

**Multi-substance risk scoring**
Separate weighted models for cigarettes, alcohol, and porn/behavioral addiction — each tuned to the variables that matter for that habit (frequency, duration, intensity).

**Age-adjusted risk**
Cigarette and alcohol scores apply an age multiplier (1.0× under 30, 1.05× 30–39, 1.15× 40+), reflecting cumulative physiological risk.

**Future projection**
A Chart.js line chart projects two paths forward from the current score: continuing the habit unchanged, versus quitting/recovering — giving the number a trajectory instead of a single static value.

**Zero data retention**
No database, no accounts, no cookies of consequence. Every request is computed and rendered fresh; nothing about the user persists after the response.

**Instant, server-rendered report**
Form submission returns a fully rendered risk report — no client-side hydration delay, no loading spinners for the result itself.

---

## Risk Model (Spec)

Each substance is scored 0–100 via a weighted composite of normalized inputs, then bucketed into a risk band.

```
clamp(x, 0, 100)
norm(x, max) = min(x / max, 1)
ageFactor     = age ≥ 40 ? 1.15 : age ≥ 30 ? 1.05 : 1.0

Cigarettes  = (40·norm(sticks,30) + 40·norm(sticks·years,300) + 20·norm(years,20)) × ageFactor
Alcohol     = (45·norm(units,35)  + 35·norm(units·years,350)  + 20·norm(years,15))  × ageFactor
Porn        =  50·norm(sessions,5) + 30·norm(sessions·years,50) + 20·norm(years,10)
```

| Band | Range |
|---|---|
| Low | 0–25 |
| Moderate | 26–50 |
| High | 51–75 |
| Severe | 76–100 |

Each formula blends current intensity, cumulative exposure (intensity × years), and duration alone — so a short but heavy habit and a long but light one can land in the same band for different reasons, which the report surfaces rather than hides.

---

## System Design

| Property | Choice | Why |
|---|---|---|
| Rendering | Server-side (NestJS + Handlebars) | Report appears instantly, no client JS required for the core flow |
| State | None — fully stateless | Nothing to secure, nothing to leak, nothing to migrate |
| Styling | Tailwind CSS | Fast iteration, small compiled output |
| Visualization | Chart.js (CDN) | Lightweight projection chart without a bundler dependency |
| Validation | class-validator DTOs | Rejects malformed input before it reaches scoring logic |

---

## Scope & Limits

- Estimates only — not a diagnostic or medical tool
- Not personalized beyond the inputs provided (no history, no adaptive model)
- Three habit types by design, not a general-purpose addiction platform

## Disclaimer

This tool produces **estimated** assessments based on general population data. It is **not** medical advice. Consult a qualified healthcare professional for any health or addiction concern.
