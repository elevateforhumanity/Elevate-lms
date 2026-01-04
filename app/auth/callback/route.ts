import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/lms/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Claim any pre-auth applications
      try {
        await supabase.rpc('claim_applications_for_current_user');
      } catch (claimError) {
        console.error('Error claiming applications:', claimError);
        // Don't block redirect if claim fails
      }

      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }
  }

  // Return to login if there's an error
  return NextResponse.redirect(
    new URL('/login?error=auth_failed', requestUrl.origin)
  );
}
