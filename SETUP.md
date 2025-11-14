# Setup Instructions for Elevate LMS

This guide will help you set up and run the Elevate LMS locally.

## Prerequisites

- Node.js 20.11.1 or higher (but less than version 23)
- npm or yarn package manager
- Supabase account (for database and authentication)
- Git

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 15
- TypeScript
- Supabase client
- Tailwind CSS
- Radix UI components
- And many more dependencies listed in package.json

### 2. Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe (if using payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# AWS S3 (for file storage)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your_s3_bucket_name
AWS_REGION=your_aws_region
```

### 3. Database Setup

#### Option A: Using Supabase Cloud

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and keys from the project settings
3. Run the database migrations:

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your_project_id

# Push the schema
supabase db push
```

#### Option B: Using Local Supabase

```bash
# Start local Supabase
supabase start

# Apply migrations
supabase db reset
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── lms/               # LMS pages (courses, assignments, etc.)
│   ├── admin/             # Admin dashboard
│   ├── program-holder/    # Program holder portal
│   └── delegate/          # Delegate dashboard
├── components/            # Reusable React components
├── lib/                   # Utility libraries
├── types/                 # TypeScript type definitions
├── utils/                 # Helper functions
├── supabase/              # Database migrations and functions
│   ├── migrations/        # SQL migration files
│   └── functions/         # Edge functions
├── public/                # Static assets
└── messages/              # i18n messages

```

## Key Features

### LMS Features
- **Courses**: Create and manage courses with lessons and content
- **Assignments**: Assign tasks to learners with due dates
- **Quizzes**: Build assessments with multiple question types
- **Grades**: Track and manage learner performance
- **Certificates**: Issue digital certificates upon completion
- **Learning Paths**: Group courses into structured pathways
- **Progress Tracking**: Monitor learner advancement
- **Calendar**: Schedule and view upcoming events
- **Messages**: Internal messaging system
- **Notifications**: Real-time alerts for learners

### Admin Features
- **User Management**: Create and manage learner accounts
- **Program Holders**: Manage training provider organizations
- **Reports**: Generate various reports on usage and progress
- **Certificates**: Issue and manage certificates
- **Delegates**: Manage case managers and their assignments
- **Caseload Reports**: Track learner engagement levels

### Program Holder Features
- **Application System**: Apply to become a training provider
- **MOU Signing**: Digital signature for agreements
- **Participant Management**: Track enrolled learners
- **Dashboard**: View program statistics

### Delegate Features
- **Caseload Management**: Track assigned learners
- **Notes**: Add case notes to learner profiles
- **Reports**: Export caseload data

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill the process using port 3000
   lsof -ti:3000 | xargs kill
   ```

2. **Database Connection Issues**
   - Verify your Supabase URL and keys are correct
   - Check that your Supabase project is running
   - Ensure your IP is allowed in Supabase project settings

3. **Build Errors**
   - Clear Next.js cache: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

## Support

For questions or issues, please open an issue on GitHub or contact the development team.

## License

This project is proprietary and confidential.
