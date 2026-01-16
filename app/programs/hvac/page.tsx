import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Thermometer, Clock, DollarSign, Award, MapPin, Calendar, ArrowRight, CheckCircle, Users, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HVAC Technician Training | Free Program | Elevate For Humanity',
  description: 'Become a certified HVAC technician with our free training program. Learn heating, ventilation, and air conditioning installation and repair.',
};

export const dynamic = 'force-dynamic';

export default async function HVACProgramPage() {
  const supabase = await createClient();

  // Get program details
  const { data: program } = await supabase
    .from('programs')
    .select('*')
    .eq('slug', 'hvac')
    .single();

  // Get enrollment count
  const { count: enrollmentCount } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('program_id', program?.id);

  // Get upcoming cohorts
  const { data: cohorts } = await supabase
    .from('cohorts')
    .select('*')
    .eq('program_id', program?.id)
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(3);

  // Get employer partners
  const { data: partners } = await supabase
    .from('program_partners')
    .select('company_name, logo_url')
    .eq('program_id', program?.id)
    .limit(6);

  const curriculum = [
    { week: '1-2', title: 'HVAC Fundamentals', topics: ['System components', 'Refrigeration cycle', 'Electrical basics', 'Safety protocols'] },
    { week: '3-4', title: 'Heating Systems', topics: ['Furnace operation', 'Heat pumps', 'Combustion analysis', 'Troubleshooting'] },
    { week: '5-6', title: 'Cooling Systems', topics: ['Air conditioning', 'Refrigerant handling', 'EPA 608 prep', 'System charging'] },
    { week: '7-8', title: 'Ventilation & Controls', topics: ['Ductwork design', 'Air quality', 'Thermostats', 'Building codes'] },
    { week: '9-10', title: 'Advanced Topics', topics: ['Commercial systems', 'Energy efficiency', 'Smart HVAC', 'Business skills'] },
    { week: '11-12', title: 'Certification & Placement', topics: ['EPA 608 exam', 'OSHA 10', 'Resume prep', 'Job interviews'] },
  ];

  const certifications = [
    'EPA 608 Universal Certification',
    'OSHA 10-Hour Safety',
    'R-410A Safety Certification',
    'First Aid/CPR',
  ];

  const outcomes = [
    { label: 'Average Starting Salary', value: '$45,000 - $55,000' },
    { label: 'Job Placement Rate', value: '90%' },
    { label: 'Time to Employment', value: '2-4 weeks' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[500px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-white">
          <Link href="/programs" className="text-blue-200 hover:text-white mb-4 inline-block">
            ← All Programs
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Thermometer className="w-10 h-10" />
            <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">100% FREE</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            HVAC Technician Training
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-6">
            Launch a high-demand career in heating, ventilation, and air conditioning. 
            Earn industry certifications and get placed with top employers.
          </p>
          <div className="flex flex-wrap gap-4 text-sm mb-8">
            <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4" /> 12 Weeks
            </span>
            <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4" /> Indianapolis, IN
            </span>
            <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <DollarSign className="w-4 h-4" /> $45K-$65K Salary
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/apply?program=hvac"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600"
            >
              Apply Now - It's Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/wioa-eligibility"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">12</div>
              <div className="text-gray-600">Weeks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">FREE</div>
              <div className="text-gray-600">Tuition</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">4</div>
              <div className="text-gray-600">Certifications</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">90%</div>
              <div className="text-gray-600">Placement Rate</div>
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
                Our HVAC Technician Training program prepares you for a rewarding career in one of the 
                fastest-growing trades. You'll learn to install, maintain, and repair heating, ventilation, 
                and air conditioning systems for residential and commercial buildings.
              </p>
              <p className="text-gray-600 text-lg">
                This hands-on program combines classroom instruction with practical lab work, ensuring 
                you graduate with the skills employers are looking for. All training is provided at no 
                cost through WIOA funding.
              </p>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Curriculum</h2>
              <div className="space-y-4">
                {curriculum.map((module) => (
                  <div key={module.week} className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 text-center flex-shrink-0">
                        <span className="text-sm text-gray-500">Week</span>
                        <div className="text-xl font-bold text-blue-600">{module.week}</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{module.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {module.topics.map((topic) => (
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

            {/* Certifications */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Certifications Included</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-3 bg-white rounded-xl shadow-sm border p-4">
                    <Award className="w-8 h-8 text-yellow-500" />
                    <span className="font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Career Outcomes */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Career Outcomes</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {outcomes.map((outcome) => (
                  <div key={outcome.label} className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">{outcome.value}</div>
                    <div className="text-gray-600">{outcome.label}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply CTA */}
            <div className="bg-blue-600 text-white rounded-xl p-6">
              <h3 className="font-bold text-xl mb-3">Ready to Start?</h3>
              <p className="text-blue-100 mb-4">
                Apply now for our next cohort. Limited seats available.
              </p>
              <Link
                href="/apply?program=hvac"
                className="block w-full text-center bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100"
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
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{new Date(cohort.start_date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">{cohort.seats_available} seats available</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Next cohort starting soon</p>
                      <p className="text-sm text-gray-500">Contact us for dates</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Employer Partners */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Hiring Partners</h3>
              {partners && partners.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {partners.map((partner: any, i: number) => (
                    <div key={i} className="text-center p-2">
                      <Briefcase className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                      <span className="text-sm text-gray-600">{partner.company_name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  We partner with leading HVAC companies in the Indianapolis area.
                </p>
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
                  Authorized to work in the US
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  Meet WIOA eligibility requirements
                </li>
              </ul>
              <Link href="/wioa-eligibility" className="text-blue-600 text-sm font-medium mt-4 inline-block hover:underline">
                Check Your Eligibility
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your HVAC Career Today</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our next cohort and become a certified HVAC technician in just 12 weeks.
          </p>
          <Link
            href="/apply?program=hvac"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600"
          >
            Apply Now - It's Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
