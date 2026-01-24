import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  Wrench, 
  Monitor, 
  Truck, 
  Scissors, 
  DollarSign,
  ArrowRight,
  CheckCircle,
  Clock,
  Award,
  GraduationCap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career Training Programs | Elevate For Humanity',
  description: 'Free career training programs in healthcare, skilled trades, technology, CDL, and more. WIOA-funded with job placement support.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs',
  },
};

export const dynamic = 'force-dynamic';

interface Program {
  id: string;
  slug: string;
  name: string;
  title: string;
  category: string;
  description: string;
  estimated_weeks: number | null;
  image_url: string | null;
  is_free: boolean;
  wioa_approved: boolean;
  funding_tags: string[];
}

const categoryIcons: Record<string, any> = {
  'Healthcare': Heart,
  'Skilled Trades': Wrench,
  'Technology': Monitor,
  'CDL & Transportation': Truck,
  'Transportation': Truck,
  'Beauty & Cosmetology': Scissors,
  'Barber': Scissors,
  'Tax & Finance': DollarSign,
  'Business': DollarSign,
};

const categoryColors: Record<string, string> = {
  'Healthcare': 'blue',
  'Skilled Trades': 'orange',
  'Technology': 'purple',
  'CDL & Transportation': 'green',
  'Transportation': 'green',
  'Beauty & Cosmetology': 'pink',
  'Barber': 'pink',
  'Tax & Finance': 'emerald',
  'Business': 'emerald',
};

const categoryDescriptions: Record<string, string> = {
  'Healthcare': 'Start a rewarding career helping others. Healthcare is one of the fastest-growing industries with strong job security and competitive wages.',
  'Skilled Trades': 'Learn hands-on skills for well-paying trade careers. Many graduates start earning $40,000-$60,000+ within their first year.',
  'Technology': 'Enter the growing tech industry with no prior experience required. Technology careers offer remote work opportunities and high salaries.',
  'CDL & Transportation': 'Get your Commercial Driver\'s License and start earning quickly. CDL drivers are in high demand with starting salaries of $50,000-$80,000+.',
  'Beauty & Cosmetology': 'Turn your creativity into a career through our registered apprenticeship programs. Earn money while you learn.',
  'Barber': 'Turn your creativity into a career through our registered apprenticeship programs. Earn money while you learn.',
  'Tax & Finance': 'Build a career in financial services. Tax preparers and financial professionals are always in demand.',
  'Business': 'Develop business skills for entrepreneurship or corporate careers.',
};

export default async function ProgramsPage() {
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

  const { data: programs, error } = await supabase
    .from('programs')
    .select('id, slug, name, title, category, description, estimated_weeks, image_url, is_free, wioa_approved, funding_tags')
    .eq('is_active', true)
    .eq('published', true)
    .order('category')
    .order('name');

  if (error || !programs || programs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Programs Loading</h1>
          <p className="text-gray-600 mb-6">Our program catalog is being updated.</p>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact us for program information
          </Link>
        </div>
      </div>
    );
  }

  // Group programs by category
  const programsByCategory = programs.reduce((acc: Record<string, Program[]>, program: Program) => {
    const category = program.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(program);
    return acc;
  }, {});

  const categories = Object.keys(programsByCategory).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <Image
          src="/images/heroes-hq/programs-hero.jpg"
          alt="Career Training Programs"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-full mb-6">
              100% Free for Eligible Students
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Career Training Programs
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Industry-recognized certifications in high-demand fields. 
              Get trained, get certified, get hired.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/wioa-eligibility"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-colors"
              >
                Check Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{programs.length}+</div>
              <div className="text-gray-600">Programs Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{categories.length}</div>
              <div className="text-gray-600">Career Fields</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">85%+</div>
              <div className="text-gray-600">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">$0</div>
              <div className="text-gray-600">Cost for Eligible Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs by Category */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category] || GraduationCap;
            const categoryPrograms = programsByCategory[category];
            const description = categoryDescriptions[category] || 'Explore career opportunities in this field.';

            return (
              <div key={category} className="mb-16" id={category.toLowerCase().replace(/\s+/g, '-')}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                    <p className="text-gray-600">{categoryPrograms.length} programs available</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 max-w-3xl">{description}</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryPrograms.map((program: Program) => (
                    <Link
                      key={program.id}
                      href={`/programs/${program.slug}`}
                      className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {program.name || program.title}
                        </h3>
                        {program.is_free && (
                          <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded">
                            Free
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {program.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {program.estimated_weeks && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{program.estimated_weeks} weeks</span>
                          </div>
                        )}
                        {program.wioa_approved && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>WIOA Approved</span>
                          </div>
                        )}
                      </div>

                      {program.funding_tags && program.funding_tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-4">
                          {program.funding_tags.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-700 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="w-12 h-12 mx-auto mb-6 text-blue-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Apply today and find out if you qualify for free training through WIOA or other funding programs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
