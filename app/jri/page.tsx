import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import {
  CheckCircle2,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Heart,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Shield,
  Target,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'JRI Program | Elevate For Humanity',
  description: 'Justice Reinvestment Initiative program providing career training and support for justice-involved individuals.',
};

export const dynamic = 'force-dynamic';

export default async function JRIPage() {
  // Safely get Supabase client - may be null if not configured
  const supabase = await createClient();

  // Initialize with defaults - will be overwritten if Supabase is available
  let programs: any[] = [];
  let successStories: any[] = [];
  let stats: any[] = [];

  // Only query if Supabase is configured
  if (supabase) {
    try {
      // Get JRI-eligible programs
      const { data: programsData } = await supabase
        .from('programs')
        .select('id, name, slug, description, duration')
        .eq('is_active', true)
        .eq('accepts_jri', true)
        .order('name', { ascending: true });
      
      if (programsData) programs = programsData;

      // Get success stories
      const { data: storiesData } = await supabase
        .from('testimonials')
        .select('*')
        .eq('category', 'jri')
        .eq('is_featured', true)
        .limit(3);
      
      if (storiesData) successStories = storiesData;

      // Get JRI statistics
      const { data: statsData } = await supabase
        .from('statistics')
        .select('*')
        .eq('category', 'jri')
        .order('order', { ascending: true });
      
      if (statsData) stats = statsData;
    } catch (error) {
      console.error('[JRI Page] Database query failed:', error);
      // Continue with defaults
    }
  }

  const defaultStats = [
    { label: 'Graduates', value: '500+', icon: GraduationCap },
    { label: 'Job Placement Rate', value: '85%', icon: Briefcase },
    { label: 'Partner Employers', value: '100+', icon: Users },
    { label: 'Recidivism Reduction', value: '60%', icon: TrendingUp },
  ];

  const displayStats = stats && stats.length > 0 ? stats : defaultStats;

  const eligibilityRequirements = [
    'Currently on probation or parole in Indiana',
    'Within 2 years of release from incarceration',
    'Committed to completing training program',
    'Willing to participate in support services',
    'Legally authorized to work in the United States',
  ];

  const programBenefits = [
    { title: '100% Free Training', description: 'All costs covered by JRI funding', icon: Award },
    { title: 'Career Counseling', description: 'One-on-one guidance and support', icon: Heart },
    { title: 'Job Placement', description: 'Direct connections to hiring employers', icon: Briefcase },
    { title: 'Support Services', description: 'Transportation, childcare, and more', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Hero Section with Image */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden">
        <Image
          src="/images/funding/funding-jri-program-v2.jpg"
          alt="JRI Program - Transforming Lives Through Education"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-6">
              Justice Reinvestment Initiative Partner
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Breaking Barriers.
              <br />
              Building Futures.
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              The Justice Reinvestment Initiative transforms lives by providing
              fully-funded workforce training and career pathways for
              individuals reentering society. Everyone deserves a second chance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6"
              >
                <Link href="/programs">
                  Explore Programs <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300 text-lg px-8 py-6"
                asChild
              >
                <Link href="/apply">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/wioa-eligibility" className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
              WIOA Eligibility
            </Link>
            <Link href="/funding" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
              Funding Options
            </Link>
            <Link href="/programs" className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
              Training Programs
            </Link>
            <Link href="/how-it-works" className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors">
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {displayStats.map((stat: any, index: number) => {
              const IconComponent = stat.icon || Target;
              return (
                <div key={index} className="text-center">
                  <IconComponent className="w-10 h-10 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What is JRI */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              What is the Justice Reinvestment Initiative?
            </h2>
            <p className="text-lg text-gray-600 text-center mb-8">
              JRI is a state-funded program that provides free workforce training and 
              support services to justice-involved individuals. The goal is to reduce 
              recidivism by helping people build sustainable careers and become 
              contributing members of their communities.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {programBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <IconComponent className="w-10 h-10 text-green-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Who Qualifies for JRI?
            </h2>
            <div className="bg-green-50 rounded-xl p-8">
              <ul className="space-y-4">
                {eligibilityRequirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Not sure if you qualify? Contact us and we&apos;ll help determine your eligibility.
                </p>
                <Link
                  href="/apply"
                  className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Check Your Eligibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Programs */}
      {programs && programs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              JRI-Approved Training Programs
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {programs.map((program: any) => (
                <Link
                  key={program.id}
                  href={`/programs/${program.slug || program.id}`}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition group"
                >
                  <BookOpen className="w-10 h-10 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition">
                    {program.name}
                  </h3>
                  {program.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {program.description}
                    </p>
                  )}
                  {program.duration && (
                    <p className="text-sm text-green-600 font-medium">
                      Duration: {program.duration}
                    </p>
                  )}
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 text-green-600 font-semibold hover:underline"
              >
                View All Programs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Success Stories */}
      {successStories && successStories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Success Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {successStories.map((story: any) => (
                <div key={story.id} className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-600 italic mb-4">&quot;{story.content}&quot;</p>
                  <div className="font-semibold">{story.name}</div>
                  {story.program && (
                    <div className="text-sm text-green-600">{story.program}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your New Chapter?
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Take the first step toward a new career. Apply today and our team will 
            help you navigate the JRI program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Apply Now
            </Link>
            <a
              href="tel:3173143757"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-green-700 transition"
            >
              Call (317) 314-3757
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
