# Mobile QA (Appium)

**Role:** QA Engineer  
**Timeline:** May–Jul 2025 (8 weeks)  
**Stack:** Appium (JavaScript/TypeScript), WebdriverIO runner, Device Cloud (BrowserStack/App Automate), GitHub Actions, Allure/Mochawesome, TestRail, Firebase Crashlytics (monitoring)  
**Links:** [Repo](#) · [Video Demo](#) · [Issue Board](#)

## Context
A cross-platform mobile app (Android/iOS) where users sign up, browse content, purchase a subscription, and use offline features. Release cadence is weekly. Manual regression on real devices took hours and was error-prone, and flakiness in critical flows (login, purchase, offline playback) caused last-minute delays. We needed stable automation, broader device/OS coverage, and reliable CI signals before each release.

## Goals & Risks
- Establish a stable **mobile smoke suite** (login → onboarding → purchase → content access) that gates PRs.
- **Cut manual regression time** to under 1 hour while **increasing device coverage** across OS versions.
- Capture reliable evidence (videos, screenshots, traces) for fast debugging.
**Key risks:** flaky selectors and timing, unstable 3rd-party SDK calls (IAP, analytics, push), non-deterministic data (renewals, entitlements), and OS-specific quirks.

## Approach
- **Test design:** Page-Object Model for `Login`, `Onboarding`, `Catalog`, `Paywall`, `Checkout`, `Library`. Tagged suites: `@smoke`, `@regression`, `@payments`, `@offline`. Data-driven tests for locales/timezones and deep-links.
- **Tooling:** Appium + WebdriverIO service; custom helpers for wait-until-visible and deep-link navigation; Allure/Mochawesome reports with screenshots and recorded videos. `testID`/`accessibilityLabel` added to key elements for stable selectors.
- **Data strategy:** Seeded sandbox accounts and fixtures; idempotent teardown for purchases; mock/stub for 3rd-party endpoints where safe; deterministic test content for offline cases.
- **CI/CD:** GitHub Actions runs on PR and nightly; matrix by device/OS (Android 12/13, iOS 16/17) via device cloud; artifacts (videos, screenshots, reports) uploaded for each job; `@smoke` is a required PR gate.
- **Flakiness control:** Auto-wait utilities (no fixed sleeps), retry only on idempotent steps, quarantine tag for known external SDK instability, and regular selector audits. Network conditioning profiles (offline/3G) for resilience checks.

## Evidence
- Test plan: LINK  
- Test cases (TestRail): LINK  
- CI runs with reports/videos (GitHub Actions): LINK  
- Crash/issue monitoring (Crashlytics or Sentry) dashboards: LINK  
- Bug tickets caught by the suite (purchase edge cases, offline entitlement sync): LINK

## Results (Before → After)
- Manual mobile regression runtime: **240m → 48m** (−80%)  
- CI flake rate (last 150 runs): **10.7% → 1.9%**  
- P0/P1 mobile defects escaping to prod (per release): **2–3 → 0** (last 2 releases)

> Summary: Releases became faster and safer. The PR-gated smoke suite now gives a trustworthy “go/no-go,” and engineers debug faster using recorded videos and step-level artifacts.

## What I’d Improve Next
- Add **visual diff testing** for paywall, checkout, and library screens to catch UI regressions.
- Expand **device coverage** (older Android hardware, low-memory iOS devices).
- Add **consumer-driven contract tests** for purchase/entitlement APIs used by the app.
- Integrate **real-user monitoring (RUM)** to track startup time and INP across the field.

---
*Prepared by Chimezie Sunday · [https://www.linkedin.com/in/chimezie-sunday](https://www.linkedin.com/in/chimezie-sunday) · [thejephthahsunday@gmail.com](mailto:thejephthahsunday@gmail.com)*