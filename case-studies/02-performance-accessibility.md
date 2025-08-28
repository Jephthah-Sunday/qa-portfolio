# Performance & Accessibility Audits

**Role:** QA Engineer  
**Timeline:** Jan–Feb 2025 (4 weeks)  
**Stack:** Lighthouse CI, WebPageTest (lab), Chrome DevTools, axe-core, GitHub Actions  
**Links:** [Before/After Reports](#) · [Dashboard](#)

## Context
Marketing + app shell had poor Core Web Vitals on mobile. Accessibility issues (contrast, landmarks) affected screen-reader users.

## Goals & Risks
- Improve mobile Lighthouse Performance to ≥80 and Accessibility to ≥90.
- Reduce Largest Contentful Paint (LCP) and First Input Delay (FID/INP surrogate).
- Establish a CI budget with fail‑the‑build thresholds.
**Key risks:** render‑blocking fonts, unoptimized images, heavy third‑party scripts.

## Approach
- **Performance:** image WebP + responsive sizes; preload hero fonts; code‑split below‑the‑fold modules; defer analytics; lazy‑load media.
- **Accessibility:** semantic headings; ARIA labels; color contrast fixes; focus states; keyboard traps removed; axe CI checks.
- **CI:** Lighthouse CI in Actions with budgets; artifacts stored; trend chart in dashboard repo.

## Evidence
- Baseline & post‑fix Lighthouse reports: LINK
- axe reports & issue list: LINK
- PRs with diffs for image/Font changes: LINK

## Results (Before → After)
- Lighthouse Perf (mobile): **44 → 88**
- LCP (p75, lab): **4.8s → 2.6s**
- Accessibility (axe issues): **31 → 7**

> Summary: Faster page loads and improved accessibility; regressions now blocked by budgets in CI.

## What I’d Improve Next
- Implement server‑side caching for API responses.
- Add RUM to track CWV in the field.

---
*Prepared by Chimezie Sunday · [https://www.linkedin.com/in/chimezie-sunday](https://www.linkedin.com/in/chimezie-sunday) · [thejephthahsunday@gmail.com](mailto:thejephthahsunday@gmail.com)*