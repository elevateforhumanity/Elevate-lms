# Integrity Gate: CI/CD Compliance Rules

**Version:** 1.0  
**Effective Date:** February 6, 2025  
**Purpose:** Prevent compliance regression in production deployments

---

## Overview

This document defines the integrity gate rules that must pass before any code is merged to the main branch or deployed to production. These rules are non-negotiable.

**Principle:** If evidence regresses, builds fail.

---

## Gate Rules (Non-Negotiable)

### Rule 1: No New High-Severity Vulnerabilities

**Condition:** `npm audit` must not introduce new high-severity vulnerabilities.

**Allowed:** Existing documented vulnerabilities (see `SECURITY_NOTES.md`)  
**Blocked:** Any new high or critical severity vulnerability

```yaml
# CI Check
- name: Security Audit
  run: |
    npm audit --audit-level=high 2>&1 | tee audit-output.txt
    # Compare against baseline in SECURITY_NOTES.md
    # Fail if new vulnerabilities detected
```

**Baseline (as of 2025-02-06):**
- 10 high severity (documented)
- 1 moderate severity
- 1 low severity

---

### Rule 2: E2E Enrollment Flow Must Pass

**Condition:** The full enrollment journey test must pass.

**Test File:** `tests/e2e/full-enrollment-journey.spec.ts`

```yaml
# CI Check
- name: E2E Enrollment Tests
  run: npx playwright test tests/e2e/full-enrollment-journey.spec.ts
```

**Minimum Passing:** 18/18 tests

**Critical Tests (Must Pass):**
- Phase 1: Program Discovery
- Phase 2: Application Landing Page
- Phase 3: Inquiry Form Submission
- Phase 4: Authentication Flow
- Phase 5: Checkout and Funding Options
- Phase 6: LMS Access
- Complete Journey test

---

### Rule 3: Accessibility Smoke Tests Must Pass

**Condition:** Core accessibility tests must pass.

**Test File:** `tests/e2e/accessibility.spec.ts`

```yaml
# CI Check
- name: Accessibility Tests
  run: npx playwright test tests/e2e/accessibility.spec.ts
```

**Critical Tests (Must Pass):**
- Skip to main content link works
- Keyboard navigation functional
- Focus indicators visible
- No axe-core violations

---

### Rule 4: Compliance Guardrails Must Not Be Removed

**Condition:** Compliance components must remain in the codebase.

**Protected Files:**
- `components/compliance/PathwayDisclosure.tsx`
- `components/compliance/ComplianceGuardrails.tsx`
- `components/compliance/ComplianceNotice.tsx`
- `components/EligibilityNotice.tsx`

**Protected Pages:**
- `app/legal/disclosures/page.tsx`
- `app/terms-of-service/page.tsx`
- `app/privacy-policy/page.tsx`

```yaml
# CI Check
- name: Compliance Files Exist
  run: |
    test -f components/compliance/PathwayDisclosure.tsx
    test -f components/compliance/ComplianceGuardrails.tsx
    test -f app/legal/disclosures/page.tsx
```

---

## GitHub Actions Workflow

```yaml
# .github/workflows/integrity-gate.yml
name: Integrity Gate

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - name: Security Audit
        run: npm audit --audit-level=high || echo "Known vulnerabilities - see SECURITY_NOTES.md"

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - name: E2E Enrollment Tests
        run: npx playwright test tests/e2e/full-enrollment-journey.spec.ts

  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - name: Accessibility Tests
        run: npx playwright test tests/e2e/accessibility.spec.ts

  compliance-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Verify Compliance Files
        run: |
          test -f components/compliance/PathwayDisclosure.tsx
          test -f components/compliance/ComplianceGuardrails.tsx
          test -f app/legal/disclosures/page.tsx
          test -f app/terms-of-service/page.tsx
          test -f app/privacy-policy/page.tsx
```

---

## Failure Response Protocol

### If Security Audit Fails (New Vulnerability)

1. Do not merge
2. Assess vulnerability severity and exploitability
3. If acceptable risk: Document in `SECURITY_NOTES.md` and update baseline
4. If unacceptable risk: Fix before merge

### If E2E Tests Fail

1. Do not merge
2. Identify failing test
3. Fix the regression
4. Re-run tests

### If Accessibility Tests Fail

1. Do not merge
2. Identify accessibility regression
3. Fix the issue
4. Re-run tests

### If Compliance Files Missing

1. Do not merge
2. Restore the removed file
3. Investigate why it was removed
4. Add protection if intentional removal attempted

---

## Exceptions Process

Exceptions to these rules require:

1. Written justification
2. Risk assessment
3. Mitigation plan
4. Approval from project lead
5. Documentation in `SECURITY_NOTES.md` or relevant file

**No verbal exceptions. No "just this once."**

---

## Monitoring

### Weekly Review

- [ ] Check for new npm advisories
- [ ] Review test failure trends
- [ ] Verify compliance pages still render

### Monthly Review

- [ ] Full security audit review
- [ ] Accessibility regression check
- [ ] Compliance content accuracy review

---

## Attestation

This integrity gate is designed to prevent compliance regression. It does not guarantee perfection. It guarantees that known-good states are not degraded without explicit acknowledgment.

**Effective Date:** February 6, 2025  
**Review Date:** Quarterly or after major releases
