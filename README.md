# Elevate Connects Directory – Workforce LMS + Case Management

Elevate Connects is a workforce-first LMS and directory built for real programs like **WRG, WIOA, JRI, EmployIndy, DOL apprenticeships, and employer-sponsored upskilling**.

Instead of a one-sided "course website," Elevate brings together:

- A full **Student/Learner portal**
- An **Admin portal** for training sponsors
- A **Program Holder portal** for barbershops, CNA schools, HVAC partners, etc.
- A **Delegate/Case Manager portal** for workforce agencies
- **Public verification & enrollment** pages

**Live at:** [https://www.elevateconnectsdirectory.org](https://www.elevateconnectsdirectory.org)

---

## 🌱 Student / Learner Portal

- **Dashboard** – at-a-glance view of active training
- **Courses & Learning Paths** – structured programs instead of random standalone lessons  
- **Assignments & Grades** – track what's due and what's completed  
- **My Progress** – see training hours and completion percentages  
- **Workforce Enrollment** – specialized flows for funded programs (WRG, WIOA, JRI, etc.)  
- **My Certificates** – view, download, and share credentials  
- **Messages & Notifications** – built-in communication with admins, providers, and coaches  
- **Calendar & Resources** – upcoming sessions, deadlines, and support resources  
- **Profile** – update contact info and preferences  

---

## 🏛 Admin Portal (Training Sponsor / System Owner)

- **Training Providers (Program Holders)** – Manage the organizations that host training (barbershops, CNA schools, HVAC shops, etc.)
- **Review Applications** – Approve or decline new program holder applications
- **Manage Delegates** – Invite and manage case managers / delegates for each provider
- **Reports Hub** – Central reporting for participation, completions, certificates, and funding programs
- **Caseload Report** – WRG/WIOA-style view of who is On Track / At Risk / Not Engaged
- **Bulk Certificates** – Issue and manage credentials at scale with QR-ready verification

---

## 🧩 Program Holder Portal (Training Providers)

For barbers, CNA owners, HVAC/Construction partners, and other training sites:

- **Provider Dashboard** – overview of learners, caseload, and payouts  
- **Self-Service Application** – become a training provider inside the platform  
- **Digital MOU Signing** – sign Elevate's revenue-share agreement online  

Program holders can see their participants, track progress, add case notes, and eventually receive payout reports tied to funded enrollments.

---

## 👥 Delegate Portal (Case Managers / Navigators)

For workforce staff and case managers:

- **Delegate Reports** – view learner progress, case notes, and follow-up dates per provider and program  

This turns Elevate into a **lightweight case management layer** on top of the LMS.

---

## 🌍 Public Pages

- **Homepage:** [elevateconnectsdirectory.org](https://www.elevateconnectsdirectory.org)
- **Privacy Policy:** `/privacy-policy`
- **Public Enrollment:** `/enroll/:program`
- **Certificate Verification:** `/cert/verify/:code`

Employers and agencies can verify credentials without logging in.

---

## 🔍 How Elevate Compares to Moodle / Docebo / LearnWorlds

### What Elevate Already Has ✅

Elevate covers the same "core LMS" terrain as the big players:

- ✅ Dashboards, courses, learning paths, grades, progress tracking
- ✅ Certificates and public verification
- ✅ Multi-role access and comprehensive reports
- ✅ Messages, notifications, calendar
- ✅ Assignments and assessments

### Where Elevate is Different 🎯

Built from day one for **funded workforce programs**:

- ✅ **Program Holder Portal** – Not bolted on later, baked in from the start
- ✅ **Delegate/Case Manager Portal** – Lightweight case management layer
- ✅ **Digital MOU Signing** – Two-step signature workflow with PDF generation
- ✅ **Workforce Enrollment Flows** – WRG, WIOA, JRI, EmployIndy, DOL tracking
- ✅ **Caseload Reports** – On Track / At Risk / Not Engaged status tracking
- ✅ **Revenue Share Model** – Built-in payout tracking for training providers

### Feature Comparison Table

| Feature | Moodle | Docebo | LearnWorlds | Elevate Connects |
|---------|--------|--------|-------------|------------------|
| Student Portal | ✅ | ✅ | ✅ | ✅ |
| Admin Portal | ✅ | ✅ | ✅ | ✅ |
| Courses & Learning Paths | ✅ | ✅ | ✅ | ✅ |
| Certificates | ✅ | ✅ | ✅ | ✅ + Public Verification |
| Reports & Analytics | ✅ | ✅ | ✅ | ✅ + Caseload Tracking |
| **Workforce Program Support** | ❌ | ❌ | ❌ | ✅ |
| **Program Holder Portal** | ❌ | ❌ | ❌ | ✅ |
| **Delegate/Case Manager Portal** | ❌ | ❌ | ❌ | ✅ |
| **Digital MOU Signing** | ❌ | ❌ | ❌ | ✅ |
| **WRG/WIOA/JRI Integration** | ❌ | ❌ | ❌ | ✅ |
| Interactive Video | ✅ | ✅ | ✅ | 🔄 Roadmap |
| SCORM/xAPI | ✅ | ✅ | ✅ | 🔄 Roadmap |
| Course Authoring | ✅ | ✅ | ✅ | 🔄 Roadmap |
| eCommerce | ✅ | ✅ | ✅ | 🔄 Roadmap |
| Gamification | ✅ | ✅ | ✅ | 🔄 Roadmap |

---

## 🗺️ Roadmap

To match (and beat) the big LMS feature checklists, Elevate's roadmap includes:

### Phase 2 (Q1 2025)
- **Interactive Video Player**
  - Auto-generated transcripts
  - In-video quizzes
  - Time-coded notes
  - Clickable links and resources

- **SCORM/xAPI Import**
  - Import existing course packages
  - Support for SCORM 1.2/2004
  - xAPI (Tin Can) compatibility

- **Course Authoring Tools**
  - Drag-and-drop lesson builder
  - Quiz and assessment creator
  - File upload and management
  - Module organization

### Phase 3 (Q2 2025)
- **Gamification**
  - Badges for completion
  - Streak tracking
  - Progress rewards
  - Leaderboards

- **Live Session Integration**
  - Zoom integration
  - Google Meet support
  - Teams compatibility
  - Session recording

- **eCommerce (Optional)**
  - Stripe checkout
  - Free vs Paid vs Workforce-funded tracks
  - Subscription management
  - Revenue reporting

### Phase 4 (Q3 2025)
- **Community Features**
  - Cohort discussion spaces
  - Announcements
  - Peer support forums
  - Group projects

- **Mobile App**
  - iOS and Android apps
  - Offline content access
  - Push notifications
  - Mobile-optimized video

---

## ⚙️ Technology Stack

- **Frontend:** Next.js 16 + TypeScript + Tailwind CSS
- **Backend:** Supabase (Postgres + Auth + Storage)
- **Deployment:** Netlify with serverless functions
- **Email:** Resend for transactional emails
- **PDF Generation:** pdf-lib for certificates and MOUs
- **Signatures:** react-signature-canvas for digital signing

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- Supabase account
- Netlify account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/elevateforhumanity/fix2.git
   cd fix2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   RESEND_API_KEY=your_resend_key
   EMAIL_FROM=noreply@yourdomain.com
   ```

4. **Run database migrations**
   - Open Supabase dashboard
   - Go to SQL Editor
   - Run migrations from `supabase/migrations/`

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Visit** [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment

### Netlify Deployment

1. **Connect to GitHub**
   - Link your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `.next`

2. **Configure Environment Variables**
   - Add all variables from `.env.local`
   - Ensure `SUPABASE_SERVICE_ROLE_KEY` is set

3. **Deploy**
   - Push to main branch
   - Netlify auto-deploys

### Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=Elevate for Humanity <noreply@elevateforhumanity.org>
MOU_ARCHIVE_EMAIL=agreements@elevateforhumanity.org
NEXT_PUBLIC_APP_URL=https://www.elevateconnectsdirectory.org
```

---

## 🎥 Video Demo Scripts

### Clip 1: "What Elevate Is" (30-40s)

> "Most LMS platforms like Moodle, Docebo, and LearnWorlds were built for generic online courses. Elevate Connects is different. We combine a full student portal, an admin portal, a program holder portal, and a delegate case-manager portal in one place — built around real workforce programs like WRG, WIOA, JRI, EmployIndy, and DOL apprenticeships.
>
> Learners see courses, assignments, grades, progress, certificates, and workforce enrollment. Admins see training providers, applications, reports, caseloads, and bulk certificates. Program holders sign their MOU, log in, and track their own participants. Case managers see live caseload reports, notes, and follow-ups.
>
> It's not just an LMS. It's a workforce training system."

### Clip 2: "How We Compare" (40-50s)

> "If you've looked at Moodle, Docebo, or LearnWorlds, you'll see a lot of the same checkboxes: dashboards, courses, learning paths, grades, certificates. Elevate already has those — plus things they don't give you out of the box:
>
> - Workforce enrollment flows
> - Partner and program holder onboarding with digital MOUs
> - Delegate and case manager portals tied to funding programs
> - Public certificate verification for employers
>
> Where we're different is focus: Elevate is built from day one around funded training, case notes, caseloads, and reporting back to agencies — not just selling courses."

### Clip 3: "What's on the Roadmap" (30-40s)

> "Feature-wise, we're catching up fast to the biggest LMS names. Next on our roadmap:
>
> - Interactive video lessons with transcripts and in-video quizzes
> - SCORM/xAPI import so you can bring in existing content
> - Light gamification so learners earn badges and milestones
> - Deeper integrations with Zoom and other tools
> - And optional eCommerce for providers who want to sell private courses on top of workforce programs.
>
> So if you want the structure of Moodle and Docebo, but tuned for real-world workforce training and funding — that's exactly what Elevate Connects is becoming."

---

## 📊 Key Metrics

- **4 Portals:** Student, Admin, Program Holder, Delegate
- **30+ Pages:** Comprehensive coverage of all workflows
- **Digital MOU:** Two-step signature with PDF generation
- **Certificate Verification:** Public QR code verification
- **Caseload Tracking:** On Track / At Risk / Not Engaged
- **Multi-Tenant:** Support for multiple training providers

---

## 🤝 Contributing

This is a private repository for Elevate for Humanity's workforce training platform. 

For questions or partnership inquiries:
- **Email:** elevateforhumanity@gmail.com
- **Website:** [elevateconnectsdirectory.org](https://www.elevateconnectsdirectory.org)

---

## 📝 License

Copyright © 2024-2025 Elevate for Humanity. All rights reserved.

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Netlify](https://www.netlify.com/)
