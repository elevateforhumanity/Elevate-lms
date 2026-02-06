# Performance Audit Report — Production

**Date:** February 6, 2025  
**URL:** https://www.elevateforhumanity.org  
**Tool:** Lighthouse 12.x (CLI)  
**Status:** PASS

---

## Production Results

| Platform | Score | Target | Status |
|----------|-------|--------|--------|
| **Mobile** | **86** | ≥80 | ✅ PASS |
| **Desktop** | **94** | ≥80 | ✅ PASS |

---

## Mobile Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Performance Score | **86** | ≥80 | ✅ |
| First Contentful Paint | 1.8s | <1.8s | ✅ |
| Largest Contentful Paint | 3.7s | <2.5s | ⚠️ |
| Total Blocking Time | 70ms | <200ms | ✅ |
| Cumulative Layout Shift | 0 | <0.1 | ✅ |
| Time to Interactive | 3.7s | <3.8s | ✅ |
| Speed Index | 4.2s | <3.4s | ⚠️ |

---

## Desktop Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Performance Score | **94** | ≥80 | ✅ |
| First Contentful Paint | 0.6s | <1.8s | ✅ |
| Largest Contentful Paint | 1.0s | <2.5s | ✅ |
| Total Blocking Time | 0ms | <200ms | ✅ |
| Cumulative Layout Shift | 0 | <0.1 | ✅ |
| Time to Interactive | 1.0s | <3.8s | ✅ |
| Speed Index | 2.3s | <3.4s | ✅ |

---

## Artifacts

| File | Description |
|------|-------------|
| `PERFORMANCE_PROD_DESKTOP.json` | Full Lighthouse desktop report |
| `PERFORMANCE_PROD_MOBILE.json` | Full Lighthouse mobile report |

---

## Attestation

These results were captured via Lighthouse CLI against the production URL. Both mobile and desktop scores exceed the ≥80 threshold.

**Audit Date:** February 6, 2025  
**Result:** PASS
