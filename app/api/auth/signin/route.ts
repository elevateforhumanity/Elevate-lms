/**
 * Auth API - Sign In
 * Authenticates user with email and password
 */

import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, APIErrors } from '@/lib/api';
import { createClient } from '@/lib/supabase/server';

export const POST = withErrorHandling(async (request: NextRequest) => {
  const supabase = await createClient();
  
  // Parse request body
  const body = await request.json();
  const { email, password } = body;

  // Validation
  if (!email || !password) {
    throw APIErrors.validation('credentials', 'Email and password are required');
  }

  // Sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      throw APIErrors.unauthorized('Invalid email or password');
    }
    if (error.message.includes('Email not confirmed')) {
      throw APIErrors.unauthorized('Please confirm your email before signing in');
    }
    throw APIErrors.external('Supabase Auth', error.message);
  }

  if (!data.user || !data.session) {
    throw APIErrors.internal('Authentication failed');
  }

  return NextResponse.json({
    success: true,
    user: {
      id: data.user.id,
      email: data.user.email,
      firstName: data.user.user_metadata?.first_name,
      lastName: data.user.user_metadata?.last_name,
    },
    session: {
      accessToken: data.session.access_token,
      expiresAt: data.session.expires_at,
    },
  });
});

export const runtime = 'edge';
export const maxDuration = 60;
