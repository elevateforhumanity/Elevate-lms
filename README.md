# Elevate for Humanity - Workforce Marketplace Platform

**Production URL:** https://www.elevateforhumanity.org  
**Status:** ✅ Live and Operational  
**Version:** 2.0.0  
**Last Updated:** January 13, 2026

---

## Overview

Elevate for Humanity is a vertically integrated workforce development ecosystem connecting community services, job training, and employment opportunities.

### Ecosystem Entities

| Entity | Type | Purpose |
|--------|------|---------|
| **Elevate for Humanity** | Training Provider | DOL-registered apprenticeship sponsor (RAPIDS: 2025-IN-132301), DWD approved (INTraining: 10004621) |
| **Selfish Inc.** | 501(c)(3) Nonprofit | Mental wellness services and community support |
| **The Rise Foundation** | DBA of Selfish Inc. | VITA site - free tax preparation and community education |
| **Supersonic Fast Cash LLC** | Employer | Tax preparation services, hires tax prep graduates |
| **Curvature Body Sculpting** | Employer | Body sculpting services + Meri-Go-Round wellness products, hires esthetician graduates |

### Community Flywheel
```
VITA (Free Tax Services) → Selfish Inc. (Mental Wellness) → Elevate (Training) → Employment → Community
```

### Platform Type
**Workforce Development Marketplace** serving:
- **Students** - Access to free/funded training (WIOA, WRG, JRI)
- **Program Holders** - Training providers with 50/50 revenue share
- **Employers** - Hiring trained graduates (Supersonic, Curvature, partners)
- **Workforce Boards** - Compliance oversight and reporting
- **Partners** - EmployIndy, JRI, Certiport, Milady, NRF
- **Staff** - Operations and support
- **Delegates** - Sub-office management
- **Community** - VITA, mental wellness, education access

---

## Business Model

### Revenue Streams
1. **Government Funding (Primary)** - WIOA, WRG, JRI, EmployIndy contracts
2. **Program Holder Revenue Share** - 50/50 split on funded participants
3. **Stripe Payments (Secondary)** - Self-pay and employer-sponsored training
4. **Platform Licensing** - $4,999 - $50,000 for other training providers
5. **Supersonic Fast Cash** - Tax preparation and refund advance services
6. **Curvature Body Sculpting** - Body sculpting services
7. **Meri-Go-Round Products** - Wellness products (teas, butters, oils, soaps)

### Compliance Requirements
- ✅ WIOA reporting (automated)
- ✅ DOL compliance tracking
- ✅ State workforce reporting
- ✅ Attendance tracking
- ✅ Outcome reporting

### Employer Businesses

**Supersonic Fast Cash LLC** (`/supersonic-fast-cash`)
- Tax preparation services
- Refund advance products
- Hires graduates from Tax Preparation program
- Multi-state operations (IN, IL, OH, TN, TX)

**Curvature Body Sculpting** (`/curvature-body-sculpting`)
- Body contouring and sculpting services
- Meri-Go-Round wellness products (e-commerce)
- Hires graduates from Esthetician/Beauty programs
- Indianapolis, IN

### Nonprofit Services

**Selfish Inc. / The Rise Foundation** (`/nonprofit`, `/rise-foundation`, `/vita`)
- VITA free tax preparation (income < $64,000)
- Mental wellness counseling
- Trauma recovery programs
- Community education

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
- **Hosting:** Netlify (Serverless)
- **Database:** Supabase Cloud
- **Payments:** Stripe 19.3.1 + Affirm
- **Email:** Resend 6.4.2
- **Monitoring:** Sentry 10.32.1
- **CDN:** Netlify Edge Network

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
pnpm deploy:netlify          # Deploy to Netlify
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

### Production Deployment (Netlify)

The platform is configured for automatic deployment via Netlify:

1. **Push to main branch** - Triggers automatic deployment
2. **Environment variables** - Configured in Netlify dashboard
3. **Database migrations** - Run automatically via Supabase
4. **Build optimization** - 8GB memory allocation for builds

### Manual Deployment

```bash
# Build locally
pnpm build

# Deploy to Netlify
pnpm deploy:netlify
```

### Health Checks

Production health endpoint: https://www.elevateforhumanity.org/api/health

```bash
# Check production health
curl https://www.elevateforhumanity.org/api/health
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

**Base URL:** `https://www.elevateforhumanity.org/api`

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
- **Netlify Analytics:** Web vitals and performance
- **Custom Health Checks:** `/api/health` endpoint
- **Uptime Monitoring:** External service monitoring

### Health Check

```bash
# Check system health
curl https://www.elevateforhumanity.org/api/health

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
- ✅ **HTTPS:** Enforced via Netlify
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
- **Email:** support@www.elevateforhumanity.org
- **Website:** https://www.elevateforhumanity.org/support

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

## Course Flow (Student Journey)

### Discovery → Enrollment → Learning → Completion

#### 1. **Browse Programs** (`/programs`)
Students discover training programs filtered by:
- Industry (Healthcare, Trades, Technology, Business)
- Funding type (WIOA, WRG, JRI, Self-pay)
- Duration and location
- Career outcomes

#### 2. **View Program Details** (`/programs/[slug]`)
Each program page shows:
- Curriculum overview
- Instructor information
- Funding eligibility
- Career pathways
- Enrollment requirements

#### 3. **Apply for Training** (`/apply` or `/apply/[programId]`)
Application process:
- Create account or login
- Complete eligibility screening
- Upload required documents (ID, proof of eligibility)
- Select funding source
- Submit application

#### 4. **Approval & Enrollment**
- Admin reviews application (1-3 business days)
- Student receives approval notification
- Complete enrollment agreement
- Payment processing (if applicable)
- Course access granted

#### 5. **Learning Experience** (`/courses/[courseId]/learn`)
Course player features:
- Video lessons with progress tracking
- Interactive quizzes and assessments
- Downloadable resources
- Discussion forums
- Live class sessions
- AI tutor assistance

**Course Structure:**
```
Program
  └─ Courses (multiple)
      └─ Modules (chapters)
          └─ Lessons (individual units)
              ├─ Video content
              ├─ Reading materials
              ├─ Activities
              └─ Assessments
```

#### 6. **Progress Tracking** (`/client-portal`)
Student dashboard shows:
- Current enrollments
- Course progress (%)
- Upcoming lessons
- Completed certificates
- Attendance records
- Compliance status

#### 7. **Completion & Certification** (`/certificates/[id]`)
Upon course completion:
- Certificate automatically generated
- Digital badge issued
- Transcript available
- LinkedIn sharing
- Employer verification link

---

## Production Readiness Assessment

### ✅ **LMS Core - Production Ready**

**Learning Management System:**
- ✅ Course catalog with 27+ programs
- ✅ Video-based lesson delivery
- ✅ Progress tracking and completion
- ✅ Quiz and assessment engine
- ✅ Certificate generation
- ✅ Student dashboard
- ✅ Enrollment workflows
- ✅ Multi-tenant architecture

**Technical Infrastructure:**
- ✅ 716 pages building successfully
- ✅ Next.js 16.1.1 with App Router
- ✅ Supabase authentication & database
- ✅ Stripe payment integration
- ✅ Netlify deployment configured
- ✅ SSL/HTTPS active
- ✅ CDN caching optimized
- ✅ Security headers configured

**Database:**
- ✅ 51 migrations applied
- ✅ Row Level Security (RLS) policies
- ✅ Multi-tenant data isolation
- ✅ Audit logging enabled
- ✅ Seed data available

### ✅ **Marketing Site - Production Ready**

**Public Pages:**
- ✅ Homepage with video hero
- ✅ Programs catalog
- ✅ Individual program pages
- ✅ About/Contact pages
- ✅ Application forms
- ✅ SEO optimization
- ✅ Mobile responsive
- ✅ Accessibility (WCAG 2.1)

**Performance:**
- ✅ Image optimization (Next.js Image)
- ✅ Code splitting
- ✅ Static page generation
- ✅ Edge caching
- ✅ Fast page loads (<2s)

### ⚠️ **Ready to Execute (Documented)**

**Database Population:**
- Seed files ready: `complete_programs_catalog.sql`, `comprehensive_student_data.sql`
- Guide: `DATABASE_SETUP_GUIDE.md`
- Time: 10-15 minutes

**SMTP Configuration:**
- Provider: Resend (recommended) or SendGrid
- Guide: `SMTP_SETUP_GUIDE.md`
- Time: 30-60 minutes

### 🔧 **Optional Enhancements**

**Nice-to-Have Features:**
- Advanced analytics dashboard
- Mobile app (PWA ready)
- AI-powered recommendations
- Social learning features
- Gamification leaderboards
- Live video conferencing

**SEO Improvements:**
- Canonical tags on 44 client pages (requires refactoring)
- Structured data expansion
- Blog content creation

---

## Key Architectural Decisions

### Multi-Tenant Architecture
- Organization-based data isolation
- Row Level Security (RLS) at database level
- Tenant-specific branding and configuration
- Shared infrastructure, isolated data

### Authentication Strategy
- Supabase Auth with JWT tokens
- Role-based access control (RBAC)
- 7 user roles: Student, Admin, Program Holder, Staff, Workforce Board, Partner, Delegate
- Protected API routes with middleware

### Payment Processing
- Primary: Stripe (cards, ACH, Apple Pay, Google Pay)
- Secondary: Affirm (buy-now-pay-later)
- Webhook-based order fulfillment
- PCI DSS compliant (via Stripe)

### Content Delivery
- Static pages: Pre-rendered at build time
- Dynamic pages: Server-rendered on demand
- API routes: Edge runtime for low latency
- Media: Cloudflare CDN

### Compliance & Reporting
- WIOA automated reporting
- DOL compliance tracking
- Attendance logging
- Outcome tracking
- Audit trail for all actions

---

## Roadmap & Future Improvements

### Code Organization
- **State-specific pages** - Pages like `/career-training-indiana`, `/community-services-ohio` are intentionally separate for SEO (local search rankings). They use shared template components (`StateCareerTrainingPage`, `StateCommunityServicesPage`) with state-specific config from `/config/states.ts`. This is the correct architecture.
- **Component library standardization** - Some UI patterns could benefit from a shared component library for consistency

### Testing
- **Expand unit test coverage** - Current coverage focuses on core business logic; expand to cover more edge cases
- **Add integration tests** - API endpoint testing with mock database
- **E2E test suite** - Automated browser testing for critical user flows (enrollment, payment, course completion)
- **Performance testing** - Load testing for concurrent users

### Documentation
- **Internal developer docs** - Architecture decisions, coding standards, and onboarding guide for future developers
- **API documentation** - OpenAPI/Swagger spec for all 200+ endpoints
- **Database schema docs** - ERD diagrams and table relationship documentation
- **Deployment runbook** - Step-by-step production deployment and rollback procedures

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

**Last Updated:** January 13, 2026  
**Platform Status:** ✅ Production Ready  
**Readiness Score:** 4/4 checks passed

---

## Recent Updates (January 13, 2026)

### SEO Improvements
- Expanded sitemap from 23 to 280 URLs with proper priorities
- Added robots.txt disallow rules for admin/api/internal pages
- Fixed 50+ duplicate page titles
- Added OpenGraph tags to 15+ key landing pages
- Fixed canonical URL handling (page-specific canonicals)

### Bug Fixes
- Fixed application form validation (funding field)
- Fixed syntax errors in gamification components
- Updated jspdf to v4.0.0 (security fix)

### Testing
- All 125 unit tests passing
- Added E2E tests for application flow
- Accessibility audit passed (WCAG 2.1 AA)

### Security
- 0 npm vulnerabilities
- Sentry error monitoring configured
- Rate limiting on API endpoints

---

## Quick Validation

Run automated readiness checks:

```bash
# Run all validation checks
pnpm readiness

# Individual checks
pnpm validate:env          # Environment configuration
pnpm validate:docs         # Documentation completeness
pnpm validate:routes       # Critical routes exist
pnpm validate:enrollment   # Enrollment flow components
```

**Latest Report:** See `readiness-report.md` for detailed validation results.
