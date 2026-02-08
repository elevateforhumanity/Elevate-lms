# Route Status Table
Generated: 2026-02-07T22:39:15Z

| Route | Status | Redirect | Notes |
|-------|--------|----------|-------|
| /programs/barber-apprenticeship | 200 | - | OK |
| /programs/barber-apprenticeship/apply | 200 | - | OK |
| /inquiry?program=barber-apprenticeship | 200 | - | OK |
| /programs/barber-apprenticeship/enrollment-success | 200 | - | OK |
| /programs/barber-apprenticeship/orientation | 200 | - | OK |
| /programs/barber-apprenticeship/documents | 200 | - | OK |
| /apprentice | 307 | http://localhost:3000/login?redirect=/apprentice000 | Redirect |
| /apprentice/dashboard | 307 | http://localhost:3000/apprentice000 | Redirect |
| /apprentice/timeclock | 200 | - | OK |
| /apprentice/hours | 307 | http://localhost:3000/login?next=/apprentice/hours000 | Redirect |
| /apprentice/documents | 307 | http://localhost:3000/login?redirect=/apprentice/documents000 | Redirect |
| /apprentice/profile | 404 | - | NOT FOUND |
| /pwa/barber/checkin | 200 | - | OK |
| /pwa/checkin | 404 | - | NOT FOUND |

## API Endpoints (unauthenticated)
| Endpoint | Method | Status | Notes |
|----------|--------|--------|-------|
| /api/inquiry | POST | 500 | - |
| /api/applications | POST | 500 | - |
| /api/barber/checkout | POST | 401 | Auth required (expected) |
| /api/webhooks/stripe | POST | 500 | - |
| /api/enrollment/complete-orientation | POST | 401 | Auth required (expected) |
| /api/enrollment/upload-document | POST | 401 | Auth required (expected) |
| /api/enrollment/submit-documents | POST | 401 | Auth required (expected) |
| /api/timeclock/context | GET | 401 | Auth required (expected) |
| /api/timeclock/action | POST | 500 | - |
| /api/checkin | POST | 401 | Auth required (expected) |
| /api/admin/enrollment-override | POST | 503 | - |

## Route Issues Found

### Missing Routes (404)
- `/apprentice/profile` - NOT FOUND
- `/pwa/checkin` - NOT FOUND

### API 500 Errors (need investigation)
- `/api/inquiry` - 500 (likely missing body validation)
- `/api/applications` - 500 (likely missing body validation)
- `/api/webhooks/stripe` - 500 (expected without signature)
- `/api/timeclock/action` - 500 (likely missing body validation)
- `/api/admin/enrollment-override` - 503 (service unavailable - expected without DB)

### Redirect Issues
- Some redirects have malformed URLs (000 appended)

## Handbook & Policy Routes
| Route | Status | Notes |
|-------|--------|-------|
| /apprentice/handbook | 200 | OK |
| /student-handbook | 200 | OK |
| /student/handbook | 308 | Redirect |
| /program-holder/handbook | 200 | OK |
| /program-holder/rights-responsibilities | 200 | OK |

## Termination/Zero-Tolerance Policy
**Location:** `lib/apprenticeship/handbook-content.ts` (policies-procedures section)

**Immediate Dismissal Grounds:**
- Falsifying records or hours
- Theft or dishonesty
- Violence or threats
- Drug/alcohol use at work
- Serious safety violations

**Progressive Discipline:**
- Verbal warning → Written warning → Probation → Suspension → Dismissal

**Attendance Policy:**
- 3 unexcused absences = probation
- 30 days no contact = automatic withdrawal
