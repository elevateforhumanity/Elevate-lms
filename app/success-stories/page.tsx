import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import {
  Quote,
  ArrowRight,
  Play,
  CheckCircle,
  TrendingUp,
  Heart,
} from 'lucide-react';
import ModernLandingHero from '@/components/landing/ModernLandingHero';

export const metadata: Metadata = {
  title: 'Success Stories - Real People, Real Results | Elevate for Humanity',
  description:
    'Read inspiring success stories from graduates who transformed their lives through our workforce training programs. Real careers, real impact.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/success-stories',
  },
};

export const dynamic = 'force-dynamic';

const defaultStories = [
  {
    id: 1,
    name: 'Marcus Thompson',
    age: 34,
    program: 'Public Safety & Reentry Specialist',
    image: '/images/learners/reentry-coaching.jpg',
    beforeJob: 'Unemployed after 8 years incarceration',
    afterJob: 'Reentry Specialist at Marion County Corrections',
    salary: '$45,000/year',
    quote:
      "After 8 years of incarceration, I didn't think anyone would give me a chance. The JRI program not only gave me the training I needed, but they believed in me when I didn't believe in myself.",
  },
  {
    id: 2,
    name: 'Sarah Martinez',
    age: 28,
    program: 'CNA Training',
    image: '/images/learners/cna-student.jpg',
    beforeJob: 'Single mom working retail',
    afterJob: 'Certified Nursing Assistant at IU Health',
    salary: '$38,000/year',
    quote:
      'As a single mom, I never thought I could afford to go back to school. WIOA funding covered everything, and now I have a career I love.',
  },
  {
    id: 3,
    name: 'James Wilson',
    age: 42,
    program: 'HVAC Technician',
    image: '/images/learners/hvac-student.jpg',
    beforeJob: 'Laid off factory worker',
    afterJob: 'HVAC Technician at Service Experts',
    salary: '$52,000/year',
    quote:
      'At 42, I thought it was too late to start over. The apprenticeship program proved me wrong. Now I have a skill that will always be in demand.',
  },
];

export default async function SuccessStoriesPage() {
  const supabase = await createClient();

  // Get success stories from database
  const { data: stories } = await supabase
    .from('success_stories')
    .select('*')
    .eq('is_published', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  // Get statistics
  const { data: stats } = await supabase
    .from('statistics')
    .select('*')
    .eq('category', 'outcomes')
    .order('order', { ascending: true });

  const displayStories = stories && stories.length > 0 ? stories : defaultStories;

  const defaultStats = [
    { label: 'Graduates Employed', value: '85%' },
    { label: 'Average Salary Increase', value: '$18,000' },
    { label: 'Students Trained', value: '2,500+' },
    { label: 'Employer Partners', value: '150+' },
  ];

  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <div className="min-h-screen bg-white">
      <ModernLandingHero
        badge="💚 Real People, Real Results"
        headline="Success"
        accentText="Stories"
        subheadline="Lives Transformed Through Training"
        description="Meet the graduates who changed their lives through our workforce training programs. Their stories prove that with the right support, anyone can build a better future."
        imageSrc="/images/heroes/success-stories-hero.jpg"
        imageAlt="Success Stories"
        primaryCTA={{ text: 'Start Your Story', href: '/apply' }}
        secondaryCTA={{ text: 'View Programs', href: '/programs' }}
        features={[
          '85% job placement rate within 90 days',
          'Average $18,000 salary increase',
          '100% free training through WIOA funding',
        ]}
        imageOnRight={true}
      />

      {/* Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {displayStats.map((stat: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Our Graduates
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayStories.map((story: any) => (
              <div
                key={story.id}
                className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition"
              >
                <div className="aspect-[4/3] relative bg-gray-200">
                  {story.image && (
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">{story.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {story.program}
                  </p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Before:</span>
                      <span>{story.beforeJob || story.before_job}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">After:</span>
                      <span className="text-green-600 font-medium">
                        {story.afterJob || story.after_job}
                      </span>
                    </div>
                    {(story.salary || story.current_salary) && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="font-medium">
                          {story.salary || story.current_salary}
                        </span>
                      </div>
                    )}
                  </div>

                  <blockquote className="text-gray-600 italic text-sm border-l-2 border-blue-500 pl-3">
                    "{story.quote}"
                  </blockquote>

                  {story.video_url && (
                    <Link
                      href={story.video_url}
                      className="inline-flex items-center gap-2 text-blue-600 font-medium mt-4 hover:underline"
                    >
                      <Play className="w-4 h-4" />
                      Watch Video
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of graduates who transformed their lives through our
            free training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/programs"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
