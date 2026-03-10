# UrbanNest SEO Analytics Dashboard

**Project 4 of 4 — Portfolio: Web Designer / Developer (SEO-Aware)**

A frontend-only SEO performance dashboard and audit report for **UrbanNest**, a fictional e-commerce brand selling modern home décor and furniture. Built to demonstrate that I can work with analytics data, interpret performance metrics, communicate SEO findings to marketing teams, and translate insights into actionable recommendations.

---

## Business Problem This Solves

Marketing teams and e-commerce brands need to:
- Monitor organic traffic health without constantly logging into GA4 or Search Console
- See declining signals (CTR, rankings) at a glance before they become revenue problems
- Brief developers and content teams on what to fix, using data rather than gut feel
- Document SEO findings as a shareable, printable report

This dashboard simulates exactly that workflow.

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Main SEO performance dashboard |
| `audit.html` | Full SEO audit report (printable) |

---

## Tech Stack

- **HTML5** — semantic structure, ARIA landmarks, accessible tables
- **CSS3** — custom properties, CSS Grid layout, responsive media queries
- **JavaScript (ES6+)** — IIFE-scoped modules, DOM rendering, table sorting, Chart.js integration
- **Chart.js v4** — via CDN, responsive line chart, doughnut charts, horizontal bar chart
- No build tools, no backend, no framework dependencies

---

## Project Structure

```
urbannest-seo-dashboard/
├── index.html               Main dashboard
├── audit.html               SEO audit report
├── data/
│   ├── traffic-data.js      Weekly traffic + KPI aggregates (3 periods)
│   ├── keywords-data.js     15 keyword records
│   ├── pages-data.js        10 landing pages + device + source breakdown
│   └── issues-data.js       SEO issues, page speed, recommendations
└── assets/
    ├── css/style.css        All dashboard + audit styles
    └── js/
        ├── dashboard.js     Charts, tables, panels, filters, export
        └── audit.js         Audit report renderer
```

> **Note:** All data files are plain JavaScript (`window.UN = {…}`) rather than JSON files, so the project works when opened directly from the filesystem without a local server. To use real JSON files, serve the project with `npx serve .` or VS Code Live Server and switch to `fetch()`.

---

## How to Run

**Option A — Direct (no server):**
Open `index.html` in any modern browser. All data loads from the inline JS files.

**Option B — Local server (recommended for development):**
```bash
npx serve .
# or
python -m http.server 8080
```
Then visit `http://localhost:8080`.

---

## Dashboard Features

### Date Range Filter
Three preset filters — **7 Days**, **28 Days**, **90 Days** — switch the KPI cards and traffic trend chart to show the corresponding period. The comparison is always against the equivalent previous period (e.g. "28 Days" compares the most recent 4 weeks against the prior 4 weeks).

### Export Report
Clicking **Export PDF** triggers `window.print()`. Print CSS hides the sidebar and controls, formats the content as a clean printable report, and avoids breaking charts across pages.

### Sortable Tables
Click any column header in the **Keyword Rankings** or **Top Landing Pages** tables to sort ascending/descending. Active sort column shows an ↑ or ↓ indicator.

---

## KPI Definitions

| KPI | Source | What it measures | Good direction |
|---|---|---|---|
| **Total Sessions** | GA4 | All website visits (all channels) in the period | ↑ Higher |
| **Organic Users** | GA4 | Unique users arriving via unpaid search | ↑ Higher |
| **Conversions** | GA4 | Goal completions (purchases / leads) | ↑ Higher |
| **Bounce Rate** | GA4 | % of sessions with zero engagement events | ↓ Lower |
| **Avg. CTR** | Search Console | Clicks ÷ Impressions across all ranking keywords | ↑ Higher |
| **Avg. Position** | Search Console | Mean SERP rank across all tracked queries (1 = top) | ↓ Lower |

### Reading the trend arrows
- **Green ↑** on Sessions, Users, Conversions, CTR = positive growth
- **Green ↓** on Bounce Rate, Avg. Position = improvement (lower is better)
- **Red** on any metric = a signal that needs attention — investigate root cause before it compounds

### UrbanNest's December story
Sessions and conversions are up (BF/CM November spike), but **CTR dropped from 5.4% → 4.8%** and **Avg. Position worsened from 12.1 → 14.2**. This means organic traffic is growing due to more impressions, but click efficiency is declining — indicating title/description quality issues or competitors outranking on key terms.

---

## Keyword Rankings Table — How to Read

| Column | Meaning |
|---|---|
| **Keyword** | The search query tracked in Search Console |
| **Position** | Current average rank (lower = better) |
| **Change badge** | ↑ improved / ↓ declined vs. previous period |
| **Impressions** | How many times the page appeared in search results |
| **Clicks** | How many users clicked through |
| **CTR** | Clicks ÷ Impressions × 100 |
| **Page** | The URL receiving traffic for this keyword |

**Color coding:**
- Position ≤ 3 → green (top 3 = most clicks)
- Position 4–10 → amber (page 1, room to grow)
- Position > 10 → red (page 2+ = low visibility)
- CTR ≥ 6% → green | 3–5.9% → amber | < 3% → red

**Declining keywords to investigate:**
- `buy indoor plants online`: pos 8 → 12 (lost 4 positions)
- `kitchen accessories set`: pos 12 → 15
- `outdoor planters large`: pos 14 → 18
- `small apartment storage solutions`: pos 19 → 22

These pages need content refresh, stronger internal linking, and possibly new supporting blog content.

---

## Landing Pages Table — How to Read

| Column | Meaning |
|---|---|
| **Sessions** | Total visits to this page (all channels) |
| **Bounce Rate** | % of sessions where user left without interaction |
| **Conv. Rate** | % of sessions that completed a goal |
| **Impressions** | Search impressions for this URL |
| **Clicks** | Search clicks for this URL |
| **Avg. Position** | Average SERP rank for this page's keywords |

**Insights from the data:**
- `/sale` has a 72.4% bounce rate but 5.8% conversion rate — expected for a sale page (high intent, fast decisions)
- `/blog` has a 78.3% bounce rate and 0.4% conversion rate — opportunity to add product CTA links within posts
- `/outdoor` has the weakest avg. position (18.0) and poor conversion — content needs investment

---

## Technical SEO Issues — Severity Guide

| Level | Icon | Meaning | SLA |
|---|---|---|---|
| **Critical** | 🔴 | Directly hurts rankings, indexing, or revenue | Fix in current sprint |
| **Warning** | 🟡 | Reduces organic efficiency or creates ranking risk | Fix within 30 days |
| **Notice** | 🔵 | Good hygiene / minor improvements | Fix during next content review |

The dashboard shows all 4 critical issues and the top 3 warnings. The full audit page (`audit.html`) documents all 17 issues with detailed fix instructions.

---

## Page Speed / Core Web Vitals — How to Interpret

Google's thresholds (from `data/issues-data.js → pageSpeed.thresholds`):

| Metric | Good | Needs Improvement | Poor |
|---|---|---|---|
| **FCP** (First Contentful Paint) | < 1.8s | 1.8–3.0s | > 3.0s |
| **LCP** (Largest Contentful Paint) | < 2.5s | 2.5–4.0s | > 4.0s |
| **CLS** (Cumulative Layout Shift) | < 0.10 | 0.10–0.25 | > 0.25 |
| **TBT** (Total Blocking Time) | < 200ms | 200–600ms | > 600ms |
| **TTFB** (Time to First Byte) | < 600ms | 600–1800ms | > 1800ms |

**UrbanNest's mobile scores are failing LCP, CLS, and TBT.** Google's Page Experience ranking signal uses these metrics. A mobile performance score of 51/100 suppresses rankings for mobile queries — which is 39% of total traffic.

**Optimization actions by priority:**
1. Compress hero image to WebP < 80 KB, add `fetchpriority="high"`
2. Add explicit `width`/`height` to all images (fixes CLS: 0.14)
3. Defer third-party scripts (chat, analytics) with `async`/`defer`
4. Enable server CDN + Gzip/Brotli compression (fixes TTFB: 820ms)

---

## Recommendations — Expected Impact

| # | Recommendation | Priority | Est. Monthly Impact |
|---|---|---|---|
| 1 | Fix Mobile Core Web Vitals | High | +18% mobile conv. rate |
| 2 | Add Product Schema Markup | High | +25% CTR on product pages |
| 3 | Recover 4 declining keywords | High | +~780 clicks/month |
| 4 | Fix 12 broken internal links | Medium | Crawl budget + UX |
| 5 | Improve blog internal linking | Medium | ~40 extra product sessions/month |

---

## Audit Report (`audit.html`) — Sections Explained

| Section | What it contains |
|---|---|
| **Executive Summary** | Business narrative: what's working, what's at risk, top opportunity |
| **Critical Issues (4)** | Expandable issue cards with detail, impact, affected URLs, and fix |
| **Warnings (8)** | Expandable cards — medium-severity issues with recommended fix |
| **Notices (5)** | Low-effort hygiene improvements |
| **Content Opportunities** | 4 high-volume keywords with no or weak ranking page |
| **Mobile Usability** | Failing CWV metrics, mobile-specific issues, and strengths |
| **Priority Action Plan** | Top 10 actions ranked by impact-to-effort ratio with timeframes |
| **Appendix** | Data sources and methodology notes |

---

## What This Project Demonstrates

- **Analytics literacy:** Ability to read GA4 + Search Console data and surface the metrics that matter
- **SEO technical knowledge:** Core Web Vitals, structured data, canonical tags, crawl budget, sitemap best practices
- **Business thinking:** Every finding is connected to a revenue or traffic impact, not just a technical checklist
- **Communication:** The audit report is designed to be shared with marketing managers, not just developers
- **Frontend skill:** Clean dashboard UI, responsive layout, sortable tables, dynamic Chart.js charts, print export
- **Data modeling:** Mock data is structured to tell a coherent story with real declining signals and realistic benchmarks

---

## Deployment

This is a static site — no build step required.

**GitHub Pages:**
```bash
git init && git add . && git commit -m "Add UrbanNest SEO dashboard"
git push origin main
# Enable Pages in repo Settings → Pages → main branch
```

**Netlify drag-and-drop:**
Drop the `urbannest-seo-dashboard/` folder into [netlify.com/drop](https://app.netlify.com/drop).

---

*Part of a 4-project frontend portfolio targeting Web Designer / Developer + SEO roles.*
