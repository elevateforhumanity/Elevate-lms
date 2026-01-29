# Elevate for Humanity — Security & Access Overview

## Authentication

- Supabase Auth (JWT-based)
- Server-side enforcement via Next.js middleware
- Role-based access control (RBAC)

## Authorization

- Route-level protection (middleware)
- Database-level RLS (Supabase)
- Tenant isolation enforced

## Payments

- Stripe Checkout + idempotent webhooks
- No card data stored
- PCI handled by Stripe

## Data Protection

- HTTPS enforced
- Environment secrets managed
- Audit logs for critical actions

## Compliance Alignment

- Workforce reporting supported
- Verifiable certificates
- Readiness for audits and oversight

## Operational Controls

- Provisioning jobs tracked
- Event idempotency enforced
- Failure-safe access gating

## Stripe Integration

- Canonical webhook: `/api/webhooks/stripe/route.ts`
- Canonical checkout pattern: enrollment → metadata → webhook provisioning
- Legacy endpoints acknowledged; deprecation scheduled

## Protected Routes

The following paths require authentication:

- `/lms/*` - Learning Management System
- `/dashboard/*` - User dashboards
- `/client-portal/*` - Client portal access
- `/admin/*` - Admin-only (requires admin role)
- `/api/lms/*` - LMS API endpoints
- `/api/enroll/*` - Enrollment API endpoints
- `/api/courses/*` - Course API endpoints
