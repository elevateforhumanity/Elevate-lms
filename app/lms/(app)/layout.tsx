'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LMSNavigation } from '@/components/lms/LMSNavigation';
import { AIInstructorWidget } from '@/components/AIInstructorWidget';
import { LogoStamp } from '@/components/layout/LogoBanner';
import { canAccessRoute, getUnauthorizedRedirect } from '@/lib/auth/lms-routes';
import { checkComplianceStatus, logComplianceEvent } from '@/lib/compliance/enforcement';

function LmsAppLayoutInner({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(true);
  const [complianceChecked, setComplianceChecked] = useState(false);

  useEffect(() => {
    // NO DEMO MODE BYPASS - All users must authenticate
    const supabase = createClient();

    supabase?.auth.getUser().then(async ({ data, error }) => {
      if (error || !data?.user) {
        router.push('/login?next=/lms/dashboard');
        return;
      }

      setUser(data.user);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      setProfile(profileData);
      
      // Check role-based access
      if (profileData?.role && !canAccessRoute(pathname, profileData.role)) {
        setAuthorized(false);
        router.push(getUnauthorizedRedirect(profileData.role));
        return;
      }

      // COMPLIANCE ENFORCEMENT: Check agreements, onboarding, handbook
      // Skip for admin/staff roles
      if (profileData?.role && !['admin', 'staff', 'super_admin'].includes(profileData.role)) {
        try {
          const compliance = await checkComplianceStatus(data.user.id, 'student');
          
          if (!compliance.canAccess && compliance.redirectTo) {
            // Log the access denial
            await logComplianceEvent({
              eventType: 'access_denied',
              userId: data.user.id,
              userEmail: data.user.email,
              details: {
                reason: 'compliance_incomplete',
                onboarding_complete: compliance.onboardingComplete,
                agreements_complete: compliance.agreementsComplete,
                handbook_complete: compliance.handbookComplete,
                missing_agreements: compliance.missingAgreements,
                attempted_path: pathname,
              },
            });
            
            setAuthorized(false);
            router.push(compliance.redirectTo);
            return;
          }
          
          // Log successful access
          await logComplianceEvent({
            eventType: 'access_granted',
            userId: data.user.id,
            userEmail: data.user.email,
            details: {
              path: pathname,
            },
          });
        } catch (complianceError) {
          // On compliance check failure, allow access but log the error
          // This prevents blocking users if the compliance tables don't exist yet
          console.warn('Compliance check failed (tables may not exist yet):', complianceError);
        }
      }
      
      setComplianceChecked(true);
      setLoading(false);
    });
  }, [router, pathname]);

  if (loading || !authorized || !complianceChecked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">
            {!authorized ? 'Redirecting...' : !complianceChecked ? 'Verifying compliance...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <LMSNavigation user={user} profile={profile} />
      <main>{children}</main>
      {/* Logo stamp for brand recognition */}
      <LogoStamp />
      {/* AI Instructor Widget - Available on all LMS pages */}
      <AIInstructorWidget context="lesson" />
    </div>
  );
}

export default function LmsAppLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    }>
      <LmsAppLayoutInner>{children}</LmsAppLayoutInner>
    </Suspense>
  );
}
