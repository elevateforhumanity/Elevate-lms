'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import { LMSNavigation } from '@/components/lms/LMSNavigation';

export default function LmsAppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          setLoading(false);
        });
    });
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <LMSNavigation user={user} profile={profile} />
      <main>{children}</main>
    </div>
  );
}
