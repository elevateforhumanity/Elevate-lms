import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { Quote, ArrowRight, TrendingUp, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Success Stories - Real People, Real Results | Elevate for Humanity',
  description:
    'Read inspiring success stories from graduates who transformed their lives through our workforce training programs. Real careers, real impact.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/success-stories',
  },
};

export const dynamic = 'force-dynamic';

interface SuccessStory {
  id: string;
  name: string;
  program_completed: string;
  graduation_date: string | null;
  current_job_title: string | null;
  current_employer: string | null;
  story: string;
  quote: string | null;
  image_url: string | null;
  salary_before: number | null;
  salary_after: number | null;
  featured: boolean;
  display_order: number;
}

export default async function SuccessStoriesPage() {
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

  const { data: stories, error } = await supabase
    .from('success_stories')
    .select('*')
    .eq('approved', true)
    .order('display_order', { ascending: true });

  if (error || !stories || stories.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Success Stories</h1>
          <p className="text-gray-600 mb-6">Success stories are being collected.</p>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Share your story
          </Link>
        </div>
      </div>
    );
  }

  const featuredStories = stories.filter((s: SuccessStory) => s.featured);
  const otherStories = stories.filter((s: SuccessStory) => !s.featured);

  // Calculate average salary increase
  const storiesWithSalary = stories.filter((s: SuccessStory) => s.salary_before && s.salary_after);
  const avgIncrease = storiesWithSalary.length > 0
    ? Math.round(
        storiesWithSalary.reduce((acc: number, s: SuccessStory) => {
          const increase = ((s.salary_after! - s.salary_before!) / s.salary_before!) * 100;
          return acc + increase;
        }, 0) / storiesWithSalary.length
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <Image
          src="/images/heroes-hq/success-hero.jpg"
          alt="Success Stories"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-full mb-6">
              Real People, Real Results
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Meet the graduates who transformed their lives through career training. 
              Their success could be your success.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{stories.length}</div>
              <div className="text-gray-600">Success Stories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">85%+</div>
              <div className="text-gray-600">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{avgIncrease > 0 ? `${avgIncrease}%` : '50%+'}</div>
              <div className="text-gray-600">Avg Salary Increase</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600">Free Training</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Featured Stories */}
        {featuredStories.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Stories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredStories.map((story: SuccessStory) => (
                <div key={story.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="h-48 bg-gray-200 relative">
                    {story.image_url ? (
                      <Image
                        src={story.image_url}
                        alt={story.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                        <span className="text-4xl font-bold text-white">
                          {story.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{story.program_completed}</p>
                    
                    {story.current_job_title && story.current_employer && (
                      <p className="text-gray-600 text-sm mb-3">
                        Now: {story.current_job_title} at {story.current_employer}
                      </p>
                    )}

                    {story.quote && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <Quote className="w-5 h-5 text-blue-500 mb-2" />
                        <p className="text-gray-700 text-sm italic line-clamp-3">
                          &ldquo;{story.quote}&rdquo;
                        </p>
                      </div>
                    )}

                    {story.salary_before && story.salary_after && (
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600">
                          ${story.salary_before.toLocaleString()} → ${story.salary_after.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Other Stories */}
        {otherStories.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">More Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {otherStories.map((story: SuccessStory) => (
                <div key={story.id} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0 relative overflow-hidden">
                      {story.image_url ? (
                        <Image
                          src={story.image_url}
                          alt={story.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                          <span className="text-xl font-bold text-white">
                            {story.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{story.name}</h3>
                      <p className="text-blue-600 text-sm mb-2">{story.program_completed}</p>
                      {story.quote && (
                        <p className="text-gray-600 text-sm italic line-clamp-2">
                          &ldquo;{story.quote}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Your Success Story Starts Here</h2>
          <p className="text-orange-100 mb-6 max-w-xl mx-auto">
            Join the hundreds of graduates who have transformed their lives through 
            free career training. Your story could be next.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/programs"
              className="px-6 py-3 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-300 transition"
            >
              View Programs
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
