# Elevate for Humanity - Workforce Marketplace Platform

**Production URL:** https://elevateforhumanity.institute  
**Status:** ✅ Live and Operational  
**Version:** 2.0.0  
**Last Updated:** January 8, 2026

---

## Overview

Elevate for Humanity is a multi-sided workforce marketplace platform connecting job seekers with free/funded training programs, training providers, employers, and workforce development boards.

### Platform Type
**Workforce Development Marketplace** serving:
- **Students** - Access to free/funded training (WIOA, WRG, JRI)
- **Program Holders** - Training providers with 50/50 revenue share
- **Employers** - Hiring trained graduates
- **Workforce Boards** - Compliance oversight and reporting
- **Partners** - EmployIndy, JRI, Certiport, Milady, NRF
- **Staff** - Operations and support
- **Delegates** - Sub-office management

---

## Business Model

### Revenue Streams
1. **Government Funding (Primary)** - WIOA, WRG, JRI, EmployIndy contracts
2. **Program Holder Revenue Share** - 50/50 split on funded participants
3. **Stripe Payments (Secondary)** - Self-pay and employer-sponsored training

### Compliance Requirements
- ✅ WIOA reporting (automated)
- ✅ DOL compliance tracking
- ✅ State workforce reporting
- ✅ Attendance tracking
- ✅ Outcome reporting

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16.1.1 (App Router)
- **Language:** TypeScript 5.9.3
- **UI:** React 19.2.1, Tailwind CSS 3.4.18, Radix UI
- **State:** Zustand 5.0.9
- **Forms:** React Hook Form 7.66.1 + Zod 4.1.12

### Backend
- **Runtime:** Node.js 20+ (Edge Runtime for APIs)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth + Row Level Security
- **API:** Next.js API Routes (200+ endpoints)

### Infrastructure
- **Hosting:** Vercel (Serverless)
- **Database:** Supabase Cloud
- **Payments:** Stripe 19.3.1 + Affirm
- **Email:** Resend 6.4.2
- **Monitoring:** Sentry 10.32.1
- **CDN:** Vercel Edge Network

### Key Integrations
- **Payments:** Stripe, Affirm
- **Email:** Resend, SendGrid
- **AI:** OpenAI 6.9.1
- **Video:** Video.js, Cloudflare
- **Documents:** PDF generation, e-signatures
- **Analytics:** Custom analytics system

---

## Quick Start

### Prerequisites
- Node.js 20.11.1 or higher (< 25)
- pnpm (recommended) or npm
- Supabase account
- Stripe account (for payments)

### Installation

```bash
# Clone repository
git clone https://github.com/elevateforhumanity/Elevate-lms.git
cd Elevate-lms

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations (if needed)
pnpm db:migrate

# Start development server
pnpm dev
```

Visit: http://localhost:3000

### Environment Variables

Required variables (see `.env.example` for complete list):

```env
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Payments
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Email
RESEND_API_KEY=your_resend_key

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

---

## Project Structure

```
elevate-lms/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── (marketing)/       # Public marketing pages
│   ├── (partner)/         # Partner portal
│   ├── admin/             # Admin panel
│   ├── courses/           # Course catalog & player
│   ├── api/               # API routes (200+ endpoints)
│   └── [1,094 routes]     # Total compiled routes
├── components/            # React components (331 files)
├── lib/                   # Utility libraries (92 modules)
├── hooks/                 # Custom React hooks
├── contexts/              # React contexts
├── types/                 # TypeScript type definitions
├── supabase/              # Database schema & migrations
│   ├── migrations/        # 349 migration files
│   └── seeds/             # Seed data
├── scripts/               # Automation scripts (660 files)
├── public/                # Static assets
└── styles/                # Global styles
```

---

## Key Features

### ✅ Core Platform
- **1,094 routes** - Fully compiled and deployed
- **7 portals** - Student, Admin, Program Holder, Staff, Workforce Board, Partner, Delegate
- **Multi-tenant** - Organization-based access control
- **Role-based access** - 10+ user roles with granular permissions

### ✅ Learning Management System (LMS)
- Course catalog and browsing
- Video-based lessons
- Progress tracking
- Quizzes and assessments
- Certificate generation
- Course completion tracking
- Student dashboard

### ✅ Enrollment System
- Multiple enrollment flows
- Free/funded program applications
- Paid program enrollment (Stripe)
- Approval workflows
- Waitlist management
- Enrollment status tracking

### ✅ Payment Processing
- Stripe integration (cards, ACH, Apple Pay, Google Pay)
- Affirm buy-now-pay-later
- Subscription management
- Invoice generation
- Payment history
- Refund processing
- Webhook handling

### ✅ Compliance & Reporting
- WIOA automated reporting
- DOL compliance tracking
- Attendance tracking
- Outcome reporting
- Audit logs
- Document management
- Identity verification

### ✅ Partner Management
- Partner registration and approval
- Partner dashboard
- Course/program management
- Student roster view
- Progress reporting
- Revenue sharing (50/50 split)
- Analytics and insights

### ✅ Communication
- Email notifications (Resend)
- In-app messaging
- SMS notifications (optional)
- Calendar integration
- Meeting scheduling

### ✅ Additional Features
- AI tutors and instructors
- Live classes and discussions
- Gamification (leaderboards, badges)
- Document upload and management
- E-signature support
- Tax services integration
- Mobile-responsive (PWA)

---

## User Roles

### Student
- Browse and enroll in courses
- Track progress
- Complete lessons and assessments
- Earn certificates
- Access support resources

### Program Holder (Training Provider)
- List training programs
- Manage student enrollments
- Track student progress
- Generate reports
- Receive revenue share

### Admin
- Full platform access
- User management
- Content management
- System configuration
- Analytics and reporting

### Workforce Board
- Compliance oversight
- Outcome tracking
- Reporting dashboards
- Funding allocation

### Partner
- Integration management
- Student referrals
- Co-branded experiences
- API access

### Staff
- Operations support
- Student assistance
- Content moderation
- Technical support

### Delegate
- Sub-office management
- Limited admin access
- Regional oversight

---

## Development

### Available Scripts

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm preview                # Preview production build

# Code Quality
pnpm lint                   # Run ESLint
pnpm lint:fix               # Fix linting issues
pnpm typecheck              # TypeScript type checking
pnpm format                 # Format with Prettier
pnpm format:check           # Check formatting

# Database
pnpm db:migrate             # Run migrations
pnpm db:seed                # Seed database
pnpm db:check               # Check database status

# Testing
pnpm test                   # Run unit tests
pnpm test:watch             # Watch mode
pnpm test:e2e               # End-to-end tests
pnpm test:coverage          # Coverage report

# Deployment
pnpm deploy:vercel          # Deploy to Vercel
pnpm verify                 # Pre-deployment checks
```

### Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test**
   ```bash
   pnpm dev
   pnpm typecheck
   pnpm lint
   ```

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

---

## Deployment

### Production Deployment (Vercel)

The platform is configured for automatic deployment via Vercel:

1. **Push to main branch** - Triggers automatic deployment
2. **Environment variables** - Configured in Vercel dashboard
3. **Database migrations** - Run automatically via Supabase
4. **Build optimization** - 8GB memory allocation for builds

### Manual Deployment

```bash
# Build locally
pnpm build

# Deploy to Vercel
pnpm deploy:vercel
```

### Health Checks

Production health endpoint: https://elevateforhumanity.institute/api/health

```bash
# Check production health
curl https://elevateforhumanity.institute/api/health
```

---

## Database

### Schema Overview

**Core Tables:**
- `profiles` - User accounts and roles
- `tenants` - Multi-tenant organizations
- `licenses` - Licensing and feature flags
- `courses` - Course catalog
- `programs` - Training programs
- `enrollments` - Student enrollments
- `lesson_progress` - Progress tracking
- `certificates` - Certificate records
- `payment_history` - Payment transactions
- `audit_logs` - System audit trail

**Total:** 349 migration files applied

### Running Migrations

```bash
# Run all pending migrations
pnpm db:migrate

# Check migration status
pnpm db:check

# Seed database with sample data
pnpm db:seed
```

### Database Access

- **Supabase Dashboard:** https://app.supabase.com
- **Direct SQL:** Use Supabase SQL Editor
- **API Access:** Via Supabase client libraries

---

## API Documentation

### API Structure

**Base URL:** `https://elevateforhumanity.institute/api`

**Total Endpoints:** 200+

### Key API Routes

#### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Get current session

#### Courses
- `GET /api/courses` - List courses
- `GET /api/courses/[id]` - Get course details
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/[id]` - Update course (admin)

#### Enrollments
- `GET /api/enrollments` - List user enrollments
- `POST /api/enrollments` - Create enrollment
- `GET /api/enrollments/[id]` - Get enrollment details
- `PUT /api/enrollments/[id]` - Update enrollment

#### Progress
- `GET /api/progress` - Get user progress
- `POST /api/progress` - Update progress
- `GET /api/progress/[courseId]` - Course-specific progress

#### Payments
- `POST /api/stripe/create-checkout-session` - Create checkout
- `POST /api/stripe/webhook` - Stripe webhook handler
- `GET /api/payments/history` - Payment history

See `docs/API_DOCUMENTATION.md` for complete API reference.

---

## Testing

### Test Coverage

- **Unit Tests:** Core business logic
- **Integration Tests:** API endpoints
- **E2E Tests:** Critical user flows
- **Smoke Tests:** Production health checks

### Running Tests

```bash
# All tests
pnpm test

# Watch mode
pnpm test:watch

# E2E tests
pnpm test:e2e

# Coverage report
pnpm test:coverage
```

---

## Monitoring & Observability

### Production Monitoring

- **Sentry:** Error tracking and performance monitoring
- **Vercel Analytics:** Web vitals and performance
- **Custom Health Checks:** `/api/health` endpoint
- **Uptime Monitoring:** External service monitoring

### Health Check

```bash
# Check system health
curl https://elevateforhumanity.institute/api/health

# Response
{
  "status": "healthy",
  "timestamp": "2026-01-04T21:00:00.000Z",
  "database": "connected",
  "version": "2.0.0"
}
```

---

## Security

### Security Features

- ✅ **Authentication:** Supabase Auth with JWT tokens
- ✅ **Authorization:** Row Level Security (RLS) policies
- ✅ **HTTPS:** Enforced via Vercel
- ✅ **CSRF Protection:** Built into Next.js
- ✅ **XSS Protection:** DOMPurify sanitization
- ✅ **SQL Injection:** Parameterized queries
- ✅ **Rate Limiting:** API rate limits
- ✅ **Input Validation:** Zod schema validation
- ✅ **Audit Logging:** All critical actions logged

### Compliance

- ✅ **FERPA:** Student data protection
- ✅ **WIOA:** Workforce compliance
- ✅ **PCI DSS:** Payment security (via Stripe)
- ✅ **GDPR:** Data privacy controls
- ✅ **SOC 2:** Security controls (in progress)

---

## Support

### Documentation
- **Setup Guide:** `docs/SETUP.md`
- **Architecture:** `docs/ARCHITECTURE.md`
- **API Docs:** `docs/API_DOCUMENTATION.md`
- **User Flows:** `docs/USER_FLOWS.md`

### Getting Help
- **Issues:** https://github.com/elevateforhumanity/Elevate-lms/issues
- **Email:** support@elevateforhumanity.institute
- **Website:** https://elevateforhumanity.institute/support

---

## Contributing

We welcome contributions! Please see `docs/CONTRIBUTING.md` for guidelines.

### Development Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

---

## License

Proprietary - All rights reserved by Elevate for Humanity

---

## Changelog

See `docs/CHANGELOG.md` for version history and updates.

---

## Acknowledgments

Built with support from:
- EmployIndy
- Indiana Department of Workforce Development
- Justice Reinvestment Initiative (JRI)
- Workforce Ready Grant (WRG) program
- Partner training providers and employers

---

**Last Updated:** January 4, 2026  
**Platform Status:** ✅ Production Ready  
**Health Score:** 10/10
