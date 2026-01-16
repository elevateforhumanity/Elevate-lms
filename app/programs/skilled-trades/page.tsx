import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Wrench, Clock, DollarSign, Award, ArrowRight, CheckCircle, Zap, Thermometer, HardHat } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Skilled Trades Programs | Free Training | Elevate For Humanity',
  description: 'Free training in HVAC, electrical, plumbing, welding, and construction. High-demand careers with excellent pay.',
};

export const dynamic = 'force-dynamic';

export default async function SkilledTradesPage() {
  const supabase = await createClient();

  // Get skilled trades programs
  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .eq('category', 'skilled-trades')
    .eq('is_active', true)
    .order('name', { ascending: true });

  // Get stats
  const { count: graduateCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'alumni')
    .eq('program_category', 'skilled-trades');

  const { count: employerCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'employer')
    .eq('industry', 'skilled-trades');

  const defaultPrograms = [
    {
      id: '1',
      name: 'HVAC Technician',
      slug: 'hvac',
      description: 'Install, maintain, and repair heating, ventilation, and air conditioning systems.',
      duration: '12 weeks',
      salary_range: '$45,000 - $65,000',
      icon: 'thermometer',
      image_url: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '2',
      name: 'Electrician Pre-Apprenticeship',
      slug: 'electrical',
      description: 'Foundation training for a career as an electrician. Prepare for union apprenticeship.',
      duration: '8 weeks',
      salary_range: '$50,000 - $80,000',
      icon: 'zap',
      image_url: 'https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '3',
      name: 'Construction Fundamentals',
      slug: 'construction',
      description: 'Learn carpentry, framing, and general construction skills for residential and commercial projects.',
      duration: '10 weeks',
      salary_range: '$40,000 - $60,000',
      icon: 'hardhat',
      image_url: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '4',
      name: 'Welding Certification',
      slug: 'welding',
      description: 'Master MIG, TIG, and stick welding techniques. Earn AWS certifications.',
      duration: '12 weeks',
      salary_range: '$45,000 - $70,000',
      icon: 'wrench',
      image_url: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const displayPrograms = programs && programs.length > 0 ? programs : defaultPrograms;

  const benefits = [
    'High-demand careers with job security',
    'Excellent earning potential',
    'Hands-on, practical work',
    'No college degree required',
    'Clear career advancement paths',
    'Work with your hands, not a desk',
  ];

  const stats = [
    { label: 'Average Starting Salary', value: '$45,000+' },
    { label: 'Job Growth Rate', value: '8-15%' },
    { label: 'Graduates Placed', value: graduateCount || 200 },
    { label: 'Employer Partners', value: employerCount || 30 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[500px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/90 to-orange-800/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-white">
          <Link href="/programs" className="text-yellow-200 hover:text-white mb-4 inline-block">
            ← All Programs
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-10 h-10" />
            <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">100% FREE</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Skilled Trades Programs
          </h1>
          <p className="text-xl text-yellow-100 max-w-2xl mb-8">
            Build a rewarding career with your hands. Free training in HVAC, electrical, 
            construction, welding, and more. High demand, excellent pay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/wioa-eligibility"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-orange-600">
                  {typeof stat.value === 'number' ? `${stat.value}+` : stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Programs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Available Programs</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {displayPrograms.map((program: any) => (
              <Link
                key={program.id}
                href={`/programs/${program.slug}`}
                className="group bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-48 relative">
                  {program.image_url ? (
                    <img
                      src={program.image_url}
                      alt={program.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                      <Wrench className="w-16 h-16 text-white/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{program.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4" /> {program.duration}
                    </span>
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      <DollarSign className="w-4 h-4" /> {program.salary_range}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Skilled Trades */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Skilled Trades?</h2>
              <p className="text-gray-600 text-lg mb-6">
                Skilled trades offer stable, well-paying careers without the burden of college debt. 
                With an aging workforce and growing demand, there's never been a better time to 
                enter the trades.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-orange-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">What's Included</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-orange-600 mt-0.5" />
                  <span>Industry-recognized certifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <Wrench className="w-5 h-5 text-orange-600 mt-0.5" />
                  <span>Hands-on training with real equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <HardHat className="w-5 h-5 text-orange-600 mt-0.5" />
                  <span>Safety certifications (OSHA 10/30)</span>
                </li>
                <li className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-orange-600 mt-0.5" />
                  <span>Job placement assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Future?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Apply today and start your career in the skilled trades.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100"
          >
            Apply Now - It's Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
