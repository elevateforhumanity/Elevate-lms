# Supabase Integration Guide

**Status:** ✅ Fully Integrated  
**Date:** January 11, 2026  
**Environment:** Gitpod + Netlify Ready

---

## Overview

Complete Supabase integration with:
- ✅ Unified client setup (server + browser)
- ✅ Full error handling integration
- ✅ Auth API routes (signup, signin, signout, me)
- ✅ Example programs API route
- ✅ Gitpod environment configuration
- ✅ Netlify deployment ready

---

## Quick Start

### 1. Get Supabase Credentials

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (or create one)
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`)

### 2. Configure Environment Variables

#### For Gitpod Development:

```bash
# Edit .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### For Netlify Deployment:

1. Go to Netlify Dashboard → Site Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Redeploy

### 3. Test the Integration

```bash
# In Gitpod terminal
curl http://localhost:3000/api/programs/list

# Expected response:
{
  "success": true,
  "programs": [],
  "count": 0,
  "authenticated": false
}
```

---

## File Structure

```
lib/
├── supabase/
│   ├── index.ts          # Main exports
│   ├── server.ts         # Server-side client
│   ├── client.ts         # Browser client
│   └── admin.ts          # Admin client (service role)
│
├── api/
│   ├── index.ts          # Error handling exports
│   ├── error-codes.ts    # Error code definitions
│   ├── api-error.ts      # Custom error class
│   └── with-error-handling.ts  # Error wrapper
│
app/api/
├── auth/
│   ├── signup/route.ts   # User registration
│   ├── signin/route.ts   # User login
│   ├── signout/route.ts  # User logout
│   └── me/route.ts       # Get current user
│
└── programs/
    └── list/route.ts     # Example Supabase query
```

---

## Usage Examples

### Server-Side (API Routes)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, APIErrors } from '@/lib/api';
import { createClient } from '@/lib/supabase/server';

export const GET = withErrorHandling(async (request: NextRequest) => {
  const supabase = await createClient();
  
  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw APIErrors.unauthorized();
  }
  
  // Query database
  const { data, error } = await supabase
    .from('your_table')
    .select('*');
  
  if (error) {
    throw APIErrors.database(error.message);
  }
  
  return NextResponse.json({ data });
});
```

### Client-Side (React Components)

```typescript
'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase';
import { toast } from '@/lib/client/toast';

export function MyComponent() {
  const [data, setData] = useState([]);
  const supabase = createBrowserClient();
  
  useEffect(() => {
    async function fetchData() {
      if (!supabase) {
        toast.error('Supabase not configured');
        return;
      }
      
      const { data, error } = await supabase
        .from('your_table')
        .select('*');
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      setData(data);
    }
    
    fetchData();
  }, []);
  
  return <div>{/* Render data */}</div>;
}
```

---

## API Routes

### Authentication

#### POST /api/auth/signup
Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "emailConfirmed": false
  },
  "message": "Please check your email to confirm your account"
}
```

#### POST /api/auth/signin
Sign in with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "session": {
    "accessToken": "eyJ...",
    "expiresAt": 1234567890
  }
}
```

#### POST /api/auth/signout
Sign out the current user.

**Response:**
```json
{
  "success": true,
  "message": "Signed out successfully"
}
```

#### GET /api/auth/me
Get current authenticated user.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "emailConfirmed": true,
    "createdAt": "2026-01-11T00:00:00Z"
  }
}
```

### Data Queries

#### GET /api/programs/list
List all programs (example route).

**Response:**
```json
{
  "success": true,
  "programs": [
    { "id": 1, "name": "Program 1" },
    { "id": 2, "name": "Program 2" }
  ],
  "count": 2,
  "authenticated": true
}
```

---

## Error Handling

All routes use the standardized error handling system:

**Error Response Format:**
```json
{
  "error": "Human-readable error message",
  "code": "ERROR_CODE"
}
```

**Common Error Codes:**
- `AUTH_001` - Unauthorized
- `VAL_001` - Validation error
- `DB_001` - Database error
- `EXT_002` - Supabase error

**Example Error:**
```json
{
  "error": "Email and password are required",
  "code": "VAL_001"
}
```

---

## Gitpod Setup

### Automatic Setup

When you open the project in Gitpod:

1. Environment variables are automatically configured
2. `.env.local` is created from `.env.example`
3. Gitpod URLs are set automatically
4. Dev server starts on port 3000

### Manual Configuration

If you need to update Supabase credentials:

```bash
# Edit .env.local
nano .env.local

# Add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Restart dev server
npm run dev
```

### Environment Setup Script

Run manually if needed:

```bash
bash .gitpod/setup-env.sh
```

---

## Netlify Deployment

### Environment Variables

Set these in Netlify Dashboard → Site Settings → Environment Variables:

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Optional:**
- `NEXT_PUBLIC_SITE_URL` (auto-set by Netlify)
- `NEXTAUTH_URL` (for NextAuth integration)

### Deploy

```bash
# Push to main branch
git push origin main

# Netlify auto-deploys
```

### Verify Deployment

```bash
# Test API
curl https://your-site.netlify.app/api/programs/list

# Test auth
curl -X POST https://your-site.netlify.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

## Database Setup

### Create Tables

Example `programs` table:

```sql
-- Create programs table
CREATE TABLE programs (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public programs are viewable by everyone"
  ON programs FOR SELECT
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Authenticated users can insert programs"
  ON programs FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
```

### Enable Realtime (Optional)

```sql
-- Enable realtime for programs table
ALTER PUBLICATION supabase_realtime ADD TABLE programs;
```

---

## Testing

### Test Auth Flow

```bash
# 1. Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'

# 2. Sign in
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 3. Get current user
curl http://localhost:3000/api/auth/me

# 4. Sign out
curl -X POST http://localhost:3000/api/auth/signout
```

### Test Data Query

```bash
# List programs
curl http://localhost:3000/api/programs/list
```

---

## Troubleshooting

### Issue: "Missing NEXT_PUBLIC_SUPABASE_URL"

**Solution:**
1. Check `.env.local` exists
2. Verify variables are set correctly
3. Restart dev server

### Issue: "Database error"

**Solution:**
1. Check Supabase project is active
2. Verify table exists
3. Check Row Level Security policies
4. Verify service role key is correct

### Issue: "Unauthorized" on authenticated routes

**Solution:**
1. Sign in first via `/api/auth/signin`
2. Check session cookie is being sent
3. Verify auth token hasn't expired

### Issue: Gitpod URLs not working

**Solution:**
1. Run `.gitpod/setup-env.sh`
2. Check `NEXT_PUBLIC_SITE_URL` in `.env.local`
3. Restart dev server

---

## Security Best Practices

### 1. Never Expose Service Role Key

❌ **DON'T:**
```typescript
// Client-side code
const supabase = createClient(url, SERVICE_ROLE_KEY); // NEVER!
```

✅ **DO:**
```typescript
// Server-side only
import { createAdminClient } from '@/lib/supabase/server';
const supabase = await createAdminClient();
```

### 2. Use Row Level Security

Always enable RLS on tables:

```sql
ALTER TABLE your_table ENABLE ROW LEVEL SECURITY;
```

### 3. Validate Input

Always validate user input:

```typescript
if (!email || !password) {
  throw APIErrors.validation('credentials', 'Required fields missing');
}
```

### 4. Sanitize Errors

Production errors are automatically sanitized by the error handling system.

---

## Next Steps

1. ✅ **Setup Complete** - Supabase is integrated
2. **Create Your Tables** - Design your database schema
3. **Add RLS Policies** - Secure your data
4. **Build Features** - Use the auth and data APIs
5. **Deploy** - Push to Netlify

---

## Support

**Documentation:**
- Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)
- Error Handling: See `ERROR_HANDLING_IMPLEMENTATION.md`
- API Reference: See `lib/api/error-codes.ts`

**Need Help?**
- Check Supabase dashboard for errors
- Review Netlify function logs
- Test locally in Gitpod first

---

**Status:** ✅ Ready for Development  
**Integration:** Complete  
**Deployment:** Netlify Ready
