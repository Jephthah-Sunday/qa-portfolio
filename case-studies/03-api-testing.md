# API Testing & Contract Checks

**Role:** QA Engineer  
**Timeline:** Feb–Mar 2025 (6 weeks)  
**Stack:** Postman/Newman, JSON Schema, GitHub Actions, k6 (smoke perf), Swagger/OpenAPI  
**Links:** [Repo](#) · [Video Demo](#) · [Issue Board](#)

## Context
Public REST APIs powering web + mobile. Incidents were traced to breaking changes in responses and missing validation for edge cases.

## Goals & Risks
- Guard against schema drift with contract tests on critical endpoints.
- Increase negative coverage (auth, rate limits, pagination, malformed payloads).
- Generate runnable docs from OpenAPI and CI results.
**Key risks:** environment drift, flaky dependencies, test data collisions.

## Approach
- **Test design:** Positive/negative suites per endpoint; data‑driven with examples; auth flows (expired/invalid tokens).
- **Tooling:** Postman collections + JSON schema asserts; Newman in CI with JUnit XML; k6 mini smoke for p95 latency.
- **Data strategy:** seeded fixtures; idempotent create/delete; unique IDs.
- **CI/CD:** GitHub Actions on PR + nightly; threshold gates on status codes and schema failures; reports uploaded.
- **Flakiness control:** mock/stub for third‑party when possible; resilient retries for idempotent GETs only.

## Evidence
- Postman collection + environment: LINK
- CI run with JUnit report: LINK
- k6 summary + thresholds: LINK
- Bug tickets: LINK

## Results (Before → After)
- Contract test failures caught pre‑merge: **0 → 6** (first month)  
- p95 latency under smoke: **620ms → 410ms**
- 4xx/5xx error rate during release week: **2.1% → 0.6%**

> Summary: Prevented breaking API changes from reaching production and improved reliability during releases.

## What I’d Improve Next
- Add consumer‑driven contract tests for key clients.
- Broaden pagination + sorting edge cases across large datasets.

---
*Prepared by Chimezie Sunday · [https://www.linkedin.com/in/chimezie-sunday](https://www.linkedin.com/in/chimezie-sunday) · [thejephthahsunday@gmail.com](mailto:thejephthahsunday@gmail.com)*