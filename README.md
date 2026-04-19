# Addiction Impact Tracker

Estimated health risk tracker for cigarettes, alcohol, and behavioral addiction (porn).
No login. No database. Server-rendered with NestJS + Handlebars + Tailwind CSS.

## Stack

- **NestJS** — HTTP server, routing, DI
- **Handlebars (hbs)** — server-rendered HTML views
- **Tailwind CSS** — utility-first styling
- **Chart.js** (CDN) — projection line chart
- **No database** — stateless, MVP

## Quick start

```bash
npm install

# Build Tailwind CSS (one-time or watch)
npm run tailwind:build
# or watch mode (separate terminal):
npm run tailwind

# Development (hot reload)
npm run start:dev

# Production
npm run build
npm run start
```

Visit → http://localhost:3000

## File structure

```
src/
  main.ts                        # Bootstrap, HBS setup, static assets
  app.module.ts

  modules/report/
    report.controller.ts         # GET / → index.hbs | POST /report → report.hbs
    report.service.ts            # Orchestrates scoring + projection
    report.module.ts
    dto/input.dto.ts             # Validation (class-validator)

  common/
    utils/
      scoring.util.ts            # Score formulas: cigarettes / alcohol / porn
      projection.util.ts         # Future continue + quit/recovery curves
      constants.ts               # Risk ranges, affected parts, costs
    types/index.ts               # Shared TypeScript types

  views/
    index.hbs                    # Input form
    report.hbs                   # Risk report

  styles/tailwind.css            # Tailwind source (compiled → public/css/)

public/
  css/tailwind.css               # Compiled Tailwind output
  js/app.js                      # Optional client-side animation helpers
```

## Routes

| Method | Path      | Description                          |
|--------|-----------|--------------------------------------|
| GET    | `/`       | Input form                           |
| POST   | `/report` | Process input → render risk report   |

## Scoring logic

All formulas are in `src/common/utils/scoring.util.ts`.

```
clamp(x, 0, 100)
norm(x, max) = min(x/max, 1)
ageFactor = age>=40 ? 1.15 : age>=30 ? 1.05 : 1.0

Cigarettes: (40*norm(sticks,30) + 40*norm(sticks*years,300) + 20*norm(years,20)) * ageFactor
Alcohol:    (45*norm(units,35)  + 35*norm(units*years,350)  + 20*norm(years,15))  * ageFactor
Porn:        50*norm(sessions,5) + 30*norm(sessions*years,50) + 20*norm(years,10)
```

Risk levels: 0–25 LOW | 26–50 MODERATE | 51–75 HIGH | 76–100 SEVERE

## Disclaimer

This tool provides **estimated** assessments based on general population data.
It is **not** medical advice. Consult a qualified healthcare professional.
