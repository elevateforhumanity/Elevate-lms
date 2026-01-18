'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LMSNavigation } from '@/components/lms/LMSNavigation';
import { AIInstructorWidget } from '@/components/AIInstructorWidget';
import { LogoStamp } from '@/components/layout/LogoBanner';
import { canAccessRoute, getUnauthorizedRedirect } from '@/lib/auth/lms-routes';

export default function LmsAppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDemoMode = searchParams.get('demo') === 'true';
  
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
    // Demo mode - skip auth and use sample data
    if (isDemoMode) {
      setUser({ id: 'demo-user', email: 'demo@elevateforhumanity.org' });
      setProfile({
        id: 'demo-user',
        full_name: 'Demo Student',
        role: 'student',
        avatar_url: '/images/testimonials/student-marcus.jpg',
        program: 'Healthcare Training',
        progress: 67,
      });
      setLoading(false);
      return;
    }

    const supabase = createClient();

    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) {
        router.push('/login?next=/lms/dashboard');
        return;
      }

      setUser(data.user);

      supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()
        .then(({ data: profileData }) => {
          setProfile(profileData);
          
          // Check role-based access
          if (profileData?.role && !canAccessRoute(pathname, profileData.role)) {
            setAuthorized(false);
            router.push(getUnauthorizedRedirect(profileData.role));
            return;
          }
          
          setLoading(false);
        });
    });
  }, [router, isDemoMode, pathname]);

  if (loading || !authorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">{!authorized ? 'Redirecting...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {isDemoMode && (
        <div className="bg-green-600 text-white text-center py-2 px-4 text-sm">
          Demo Mode — Exploring LMS features with sample data
        </div>
      )}
      <LMSNavigation user={user} profile={profile} />
      <main>{children}</main>
      {/* Logo stamp for brand recognition */}
      <LogoStamp />
      {/* AI Instructor Widget - Available on all LMS pages */}
      <AIInstructorWidget context="lesson" />
    </div>
  );
}
