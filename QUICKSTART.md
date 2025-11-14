# Quick Start Guide

Welcome to the Elevate LMS repository! This is a comprehensive Learning Management System built with Next.js 15, TypeScript, and Supabase.

## What's Included

This repository contains the **complete LMS application** pulled from the `elevateforhumanity/fix2` repository, including:

- ✅ Full-featured Learning Management System
- ✅ Multi-portal system (Student, Admin, Program Holder, Delegate)
- ✅ Complete database schema and migrations
- ✅ API layer with 23+ route groups
- ✅ 196+ TypeScript files
- ✅ 496 total files

## Getting Started in 5 Steps

### 1. Clone the Repository
```bash
git clone https://github.com/elevateforhumanity/Elevate-lms.git
cd Elevate-lms
```

### 2. Install Dependencies
```bash
npm install
```
This will install all 114 dependencies (61 production + 53 development).

### 3. Set Up Environment Variables
```bash
cp .env.example .env.local
```
Then edit `.env.local` with your Supabase credentials and other configuration.

### 4. Set Up Database
```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your_project_id

# Push the schema
supabase db push
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Elevate-lms/
├── app/                    # Next.js app directory (1.8 MB)
│   ├── lms/               # LMS portal
│   ├── admin/             # Admin dashboard
│   ├── program-holder/    # Training provider portal
│   ├── delegate/          # Case manager portal
│   └── api/               # API routes
├── components/            # React components (224 KB)
├── lib/                   # Utility libraries (100 KB)
├── supabase/              # Database schema & migrations (708 KB)
├── public/                # Static assets (10 MB)
├── types/                 # TypeScript definitions
├── utils/                 # Helper functions
└── Documentation:
    ├── README.md          # Full project documentation
    ├── SETUP.md           # Detailed setup guide
    └── TRANSFER_REPORT.md # Code transfer details
```

## Key Features

### For Learners
- Course enrollment and learning
- Assignments and quizzes
- Progress tracking
- Certificate viewing
- Internal messaging
- Calendar and deadlines

### For Administrators
- User management
- Course creation
- Certificate issuance
- Reporting and analytics
- Program holder management
- Delegate oversight

### For Program Holders
- Application to become provider
- MOU digital signing
- Participant enrollment
- Progress monitoring

### For Delegates
- Caseload management
- Learner tracking
- Case notes
- Export reports

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Payments**: Stripe
- **File Storage**: AWS S3
- **PDF Generation**: React-PDF

## Available Commands

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run ESLint
npm run type-check  # Check TypeScript types
```

## Documentation

- **[README.md](./README.md)** - Comprehensive project overview
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[TRANSFER_REPORT.md](./TRANSFER_REPORT.md)** - Code transfer documentation

## Need Help?

1. Check the **SETUP.md** for detailed setup instructions
2. Review **TRANSFER_REPORT.md** for what's included
3. See **README.md** for feature documentation
4. Open an issue on GitHub for questions

## License

This project is proprietary and confidential.

---

**Status**: ✅ Complete and ready for development  
**Last Updated**: November 14, 2025
