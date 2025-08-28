# Web E2E Automation (Cypress)

**Role:** QA Engineer (Automation)  
**Timeline:** Apr–Jun 2025 (10 weeks)  
**Stack:** Cypress, Page Object Model, GitHub Actions, Allure/Mochawesome, TestRail, Node 18  
**Links:** [Repo](#) · [Video Demo](#) · [Issue Board](#)

## Context
A subscription SaaS web app with weekly releases. Manual regression took ~2.5 hours and often missed edge cases in billing and SSO. Flaky tests blocked deploys, and PRs lacked a reliable gate to prevent breaking changes.

## Goals & Risks
- Reduce manual regression to <30 minutes via parallelized, tagged specs.
- Enforce PR gating with a stable smoke suite (≤2% flake rate).
- Improve observability with artifacts and traces in CI.
**Key risks:** brittle element selectors, async race conditions, unstable test data.

## Approach
- **Test design:** POM for Login, Billing, Subscription; fixtures for seeded users; `@smoke` and `@regression` tags; parallel across 4 runners.
- **Tooling:** Cypress with custom commands; network stubbing for third‑party calls; Allure/Mochawesome reports uploaded as artifacts.
- **Data strategy:** sandbox tenant + factory scripts; idempotent teardown; unique test data per run.
- **CI/CD:** GitHub Actions matrix (Chrome/Firefox); required PR check; artifacts (reports + videos) and flaky‑test detector job.
- **Flakiness control:** retriable helpers for known timing issues; quarantine list for transient third‑party failures; deterministic waits (no `cy.wait(5000)`).

## Evidence
- Test plan: LINK
- Test cases: LINK
- Reports/Dashboards: LINK to Allure run + Actions summary
- Bugs found: LINK to Jira/Linear tickets (e.g., SSO token expiry edge case)

## Results (Before → After)
- Regression runtime: **150m → 28m** (−81%)
- Flake rate (last 200 runs): **9.4% → 1.6%**
- P0 escapes (last 2 releases): **3 → 0**

> Summary: Releases sped up and became predictable; PRs now block on a fast, trustworthy smoke suite.

## What I’d Improve Next
- Add visual diffs for pricing and checkout.
- Add contract tests on billing webhooks to catch schema drift.
- Expand device coverage with Playwright for WebKit.

---
*Prepared by Chimezie Sunday · [https://www.linkedin.com/in/chimezie-sunday](https://www.linkedin.com/in/chimezie-sunday) · [thejephthahsunday@gmail.com](mailto:thejephthahsunday@gmail.com)*