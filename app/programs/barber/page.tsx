import { Metadata } from 'next';
import { CredentialsOutcomes } from '@/components/programs/CredentialsOutcomes';
import PathwayDisclosure from '@/components/PathwayDisclosure';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Scissors, Clock, DollarSign, Award, MapPin, Calendar, ArrowRight, CheckCircle, Users } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Barber Apprenticeship Program | $4,980 Tuition | Elevate For Humanity',
  description: 'Become a licensed barber through our fee-based USDOL Registered Apprenticeship program. Learn cutting, styling, and business skills.',
};

export const dynamic = 'force-dynamic';

export default async function BarberProgramPage() {
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

  const { data: program } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', 'barber')
    .single();

  const { count: enrollmentCount } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('program_id', program?.id);

  const { data: cohorts } = await supabase
    .from('cohorts')
    .select('*')
    .eq('program_id', program?.id)
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(3);

  const curriculum = [
    { phase: 'Foundation', duration: '3 months', topics: ['Sanitation & safety', 'Tool knowledge', 'Basic cuts', 'Client consultation'] },
    { phase: 'Intermediate', duration: '6 months', topics: ['Fades & tapers', 'Beard grooming', 'Razor techniques', 'Hair textures'] },
    { phase: 'Advanced', duration: '6 months', topics: ['Creative styling', 'Color basics', 'Business skills', 'Client retention'] },
    { phase: 'Licensure', duration: '3 months', topics: ['State exam prep', 'Portfolio building', 'Shop management', 'Marketing'] },
  ];

  const skills = [
    'Clipper cuts and fades',
    'Scissor cutting techniques',
    'Beard trimming and shaping',
    'Hot towel shaves',
    'Hair styling and finishing',
    'Sanitation and safety',
    'Client consultation',
    'Business management',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs 
            items={[
              { label: 'Programs', href: '/programs' },
              { label: 'Skilled Trades', href: '/programs/skilled-trades' },
              { label: 'Barber Program' },
            ]} 
          />
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-[500px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-white">
          <Link href="/programs" className="text-gray-300 hover:text-white mb-4 inline-block">
            ← All Programs
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Scissors className="w-10 h-10" />
            <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">USDOL Registered</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Barber Apprenticeship
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mb-6">
            Master the art of barbering through hands-on apprenticeship. Earn while you learn 
            and graduate with your Indiana Barber License.
          </p>
          <div className="flex flex-wrap gap-4 text-sm mb-8">
            <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4" /> 18 Months
            </span>
            <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4" /> Indianapolis, IN
            </span>
            <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <DollarSign className="w-4 h-4" /> $30K-$60K+ Salary
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/apply?program=barber"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/wioa-eligibility"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Pathway Disclosure */}
      <PathwayDisclosure programName="Barber" programSlug="barber" />

      {/* Stats */}
      <section className="py-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-800">18</div>
              <div className="text-gray-600">Months</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">$4,980</div>
              <div className="text-gray-600">Tuition</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">1,500</div>
              <div className="text-gray-600">Hours Required</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">$60K+</div>
              <div className="text-gray-600">Earning Potential</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <section>
              <h2 className="text-3xl font-bold mb-6">About This Program</h2>
              <p className="text-gray-600 text-lg mb-4">
                Our Barber Apprenticeship program provides a pathway to becoming a licensed barber 
                in Indiana. Through hands-on training at partner barbershops, you'll learn the 
                technical skills and business knowledge needed to succeed in this creative profession.
              </p>
              <p className="text-gray-600 text-lg">
                Unlike traditional barber school, our apprenticeship model allows you to earn money 
                while you learn. You'll work alongside experienced barbers, building your skills 
                and clientele from day one.
              </p>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Program Phases</h2>
              <div className="space-y-4">
                {curriculum.map((phase, index) => (
                  <div key={phase.phase} className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{phase.phase}</h3>
                          <span className="text-sm text-gray-500">{phase.duration}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {phase.topics.map((topic) => (
                            <span key={topic} className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Skills You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 bg-white rounded-lg shadow-sm border p-4">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Certification */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Certification</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <Award className="w-12 h-12 text-yellow-600" />
                  <div>
                    <h3 className="font-bold text-lg">Indiana Barber License</h3>
                    <p className="text-gray-600">
                      Upon completing 2,000 hours and passing the state exam, you'll receive your 
                      Indiana Barber License, allowing you to work anywhere in the state.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply CTA */}
            <div className="bg-gray-900 text-white rounded-xl p-6">
              <h3 className="font-bold text-xl mb-3">Start Your Journey</h3>
              <p className="text-gray-300 mb-4">
                Apply now to join our barber apprenticeship program.
              </p>
              <Link
                href="/apply?program=barber"
                className="block w-full text-center bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600"
              >
                Apply Now
              </Link>
            </div>

            {/* Upcoming Cohorts */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Upcoming Start Dates</h3>
              {cohorts && cohorts.length > 0 ? (
                <div className="space-y-3">
                  {cohorts.map((cohort: any) => (
                    <div key={cohort.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">{new Date(cohort.start_date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">{cohort.seats_available} spots left</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Rolling admissions - apply anytime</p>
              )}
            </div>

            {/* Eligibility */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Eligibility</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  18 years or older
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  High school diploma or GED
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  Pass background check
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  Reliable transportation
                </li>
              </ul>
            </div>

            {/* Earning Potential */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Earning Potential</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Entry Level</span>
                  <span className="font-medium">$30,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Experienced</span>
                  <span className="font-medium">$45,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Shop Owner</span>
                  <span className="font-medium">$60,000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credentials & Outcomes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <CredentialsOutcomes
            programName="Barber"
            partnerCertifications={[
              'Indiana Barber License (issued by Indiana Professional Licensing Agency)',
              'USDOL Registered Apprenticeship Certificate of Completion',
            ]}
            employmentOutcomes={[
              'Licensed Barber',
              'Barbershop Owner/Operator',
              'Master Barber',
              'Barber Instructor',
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Become a Barber?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our apprenticeship program and start your career in barbering.
          </p>
          <Link
            href="/apply?program=barber"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600"
          >
            Apply Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
