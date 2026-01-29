import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

import { createClient } from '@/lib/supabase/server';

import ReelsFeed from '@/components/reels/ReelsFeed';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Reels | Elevate For Humanity',
  description:
    'Watch short-form videos about career training and success stories',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/reels',
  },
};

async function getReels() {
  try {
    const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
    const { data }: any = await supabase
      .from('reels')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(20);
    return data || [];
  } catch (error) { /* Error handled silently */ 
    return [];
  }
}

export default async function ReelsPage() {
  const reels = await getReels();

  return (
    <div className="bg-gray-950 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: "Reels" }]} />
      </div>
<ReelsFeed reels={reels} />
    </div>
  );
}
