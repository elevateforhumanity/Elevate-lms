import Link from 'next/link';
import { CredentialsOutcomes } from '@/components/programs/CredentialsOutcomes';
import Image from 'next/image';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { programs } from '@/app/data/programs';
import {
  Heart,
  Shield,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  GraduationCap,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:
    'JRI Programs | Justice Reinvestment Initiative | Elevate for Humanity',
  description:
    'Second chance career training for justice-involved individuals. Free programs in healthcare, trades, and workforce readiness. Fresh start, real career.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/jri',
  },
};

const jriProgramSlugs = [
  'cna',
  'phlebotomy-technician',
  'home-health-aide',
  'direct-support-professional',
  'cdl',
  'workforce-readiness',
  'peer-recovery-coach',
];

export default async function JRIProgramsPage() {
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
  
  // Fetch JRI programs
  const { data: dbPrograms } = await supabase
    .from('programs')
    .select('*')
    .eq('category', 'jri');

  const jriPrograms = programs.filter((p) => jriProgramSlugs.includes(p.slug));

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-white text-white px-6 sm:px-10 lg:px-12 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-semibold">JRI Programs</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Everyone Deserves
            <br />A Second Chance
          </h1>

          <p className="text-xl sm:text-2xl text-indigo-100 leading-relaxed max-w-3xl mx-auto">
            The Justice Reinvestment Initiative (JRI) provides 100% free career
            training and wraparound support for individuals with justice
            involvement. Your past doesn't define your future.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-black text-center leading-tight mb-12">
            Why JRI Works
          </h2>

          <div className="space-y-6 text-lg text-black leading-relaxed">
            <p>
              Returning to society after incarceration is one of the hardest
              challenges anyone can face. Without job skills, stable employment,
              and support, the cycle of recidivism continues. JRI breaks that
              cycle.
            </p>

            <p>
              <span className="font-bold text-black">
                This isn't just training—it's a complete support system.
              </span>{' '}
              JRI provides free career training in high-demand fields, plus case
              management, transportation assistance, childcare support, and job
              placement services.
            </p>

            <p>
              We believe in second chances. Your past mistakes don't define who
              you are or what you can become. With the right training and
              support, you can build a stable career, support your family, and
              contribute to your community.
            </p>

            <p className="text-xl font-bold text-black">
              This is your opportunity to rewrite your story. We're here to help
              you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* What JRI Provides */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            What JRI Provides
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-black mb-2">Free Training</h3>
              <p className="text-black">
                100% free career training in high-demand fields
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-green-100 text-brand-green-600 mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-black mb-2">Case Management</h3>
              <p className="text-black">
                Dedicated support coordinator to help you succeed
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-brand-blue-600 mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-black mb-2">Job Placement</h3>
              <p className="text-black">
                Direct connections to employers ready to hire
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-black mb-2">Wraparound Support</h3>
              <p className="text-black">
                Transportation, childcare, and other assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Earn While You Learn - Apprenticeships */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 lg:py-20 bg-zinc-900   text-black">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">
                <DollarSign className="w-5 h-5 inline-block" />
              </span>
              <span className="text-sm font-semibold">
                DOL Registered Apprenticeships
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Earn While You Learn
            </h2>
            <p className="text-xl text-green-100">
              Get paid while you train through DOL-registered apprenticeship
              programs
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6">
              How Apprenticeships Work
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold text-lg">Get Hired First</p>
                    <p className="text-green-100">
                      Start working with an employer immediately
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold text-lg">Earn a Paycheck</p>
                    <p className="text-green-100">
                      Get paid hourly wages while you train
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold text-lg">Learn on the Job</p>
                    <p className="text-green-100">
                      Hands-on training with experienced mentors
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold text-lg">Free Classroom Training</p>
                    <p className="text-green-100">
                      Related instruction at no cost to you
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold text-lg">Earn Certifications</p>
                    <p className="text-green-100">
                      Industry-recognized credentials included
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold text-lg">No Student Debt</p>
                    <p className="text-green-100">
                      Zero tuition - you get paid to learn
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 text-black">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Available Apprenticeship Programs
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="font-bold text-lg mb-2">Barber Apprenticeship</p>
                <p className="text-sm text-black mb-2">
                  1,500 hours | $12-15/hr starting
                </p>
                <p className="text-xs text-black">State Board approved</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="font-bold text-lg mb-2">HVAC Technician</p>
                <p className="text-sm text-black mb-2">
                  2,000 hours | $15-18/hr starting
                </p>
                <p className="text-xs text-black">
                  EPA certification included
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="font-bold text-lg mb-2">Building Maintenance</p>
                <p className="text-sm text-black mb-2">
                  1,000 hours | $14-17/hr starting
                </p>
                <p className="text-xs text-black">Multi-trade skills</p>
              </div>
            </div>
            <p className="text-center mt-6 text-sm text-black">
              <strong>
                U.S. Department of Labor Registered Apprenticeship Sponsor
              </strong>
              <br />
              RAPIDS ID: 2025-IN-132301
            </p>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg mb-4">
              <strong>For Students:</strong> Apply for apprenticeship programs
              through JRI funding
            </p>
            <p className="text-lg mb-6">
              <strong>For Employers/Program Holders:</strong> Partner with us to
              create registered apprenticeship programs for your workforce
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apprenticeships"
                className="inline-flex px-8 py-4 bg-white text-brand-green-600 font-bold rounded-lg hover:bg-green-50 transition text-lg"
              >
                View All Apprenticeships
              </Link>
              <Link
                href="/partner-with-us"
                className="inline-flex px-8 py-4 bg-brand-green-800 text-white font-bold rounded-lg hover:bg-brand-green-900 transition text-lg"
              >
                Become an Employer Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Available JRI Programs
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jriPrograms.map((program: any) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    priority
                    src={program.heroImage}
                    alt={program.heroImageAlt}
                    fill
                    sizes="100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2">
                    {program.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-2 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                      {program.duration}
                    </span>
                    <span className="px-3 py-2 bg-brand-green-100 text-green-700 text-xs font-semibold rounded-full">
                      JRI Funded
                    </span>
                  </div>
                  <span className="inline-flex items-center font-semibold text-indigo-600 group-hover:underline text-sm">
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Who Can Participate
          </h2>

          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-black mb-4">
              JRI Eligibility
            </h3>
            <ul className="space-y-3 text-black">
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <span>Individuals with prior justice system involvement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <span>
                  Currently on probation, parole, or recently released
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <span>
                  Committed to completing training and finding employment
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <span>Willing to work with case manager and support team</span>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-indigo-200">
              <p className="text-sm text-black">
                <strong>Note:</strong> Eligibility requirements may vary by
                program and location. Contact us to discuss your specific
                situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-black text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <details className="group bg-gray-50 rounded-lg p-6 border border-gray-200">
              <summary className="font-bold text-lg text-black cursor-pointer list-none flex justify-between items-center">
                What is the Justice Reinvestment Initiative (JRI)?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-black space-y-3">
                <p>
                  JRI is a state-funded program designed to reduce recidivism by
                  providing job training, education, and support services to
                  justice-involved individuals. The program is approved by the
                  Indiana Department of Correction, Indiana Department of
                  Workforce Development (DWD), and U.S. Department of Labor
                  (DOL).
                </p>
                <p>
                  JRI provides 100% free career training in high-demand
                  industries, case management, transportation assistance, and
                  direct job placement with employers who hire individuals with
                  criminal backgrounds.
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-lg p-6 border border-gray-200">
              <summary className="font-bold text-lg text-black cursor-pointer list-none flex justify-between items-center">
                Am I eligible for JRI programs?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-black space-y-3">
                <p>You may be eligible if you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Have prior involvement with the criminal justice system
                  </li>
                  <li>
                    Are currently on probation, parole, community corrections,
                    or recently released
                  </li>
                  <li>
                    Are committed to completing training and securing employment
                  </li>
                  <li>Are willing to work with a case manager</li>
                </ul>
                <p className="font-bold">
                  Schedule a free eligibility assessment at{' '}
                  <a
                    href="https://www.indianacareerconnect.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline"
                  >
                    IndianaCareerConnect.com
                  </a>
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-lg p-6 border border-gray-200">
              <summary className="font-bold text-lg text-black cursor-pointer list-none flex justify-between items-center">
                Is this training really 100% free?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-black space-y-3">
                <p>
                  <strong>Yes, completely free.</strong> JRI funding covers all
                  tuition, books, materials, certifications, and exam fees. You
                  pay nothing.
                </p>
                <p>
                  We also provide transportation assistance, childcare support,
                  and other wraparound services to help you succeed. This is
                  funded by the State of Indiana through the Justice
                  Reinvestment Initiative.
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-lg p-6 border border-gray-200">
              <summary className="font-bold text-lg text-black cursor-pointer list-none flex justify-between items-center">
                Will my criminal record prevent me from getting certified?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-black space-y-3">
                <p>
                  Not necessarily. Many of our programs are specifically
                  designed for individuals with criminal backgrounds. We work
                  with state licensing boards and employers who practice "ban
                  the box" hiring.
                </p>
                <p>
                  During your consultation, we'll review your background and
                  recommend programs where you can obtain licensure and
                  employment. Some fields (like healthcare) have restrictions,
                  but many trades and industries welcome second-chance
                  candidates.
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-lg p-6 border border-gray-200">
              <summary className="font-bold text-lg text-black cursor-pointer list-none flex justify-between items-center">
                How do I schedule an appointment?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-black space-y-3">
                <p className="font-bold text-lg">
                  Visit{' '}
                  <a
                    href="https://www.indianacareerconnect.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline"
                  >
                    www.IndianaCareerConnect.com
                  </a>
                </p>
                <p>
                  Indiana Career Connect is the official state workforce portal
                  where you can schedule appointments with approved training
                  providers like Elevate for Humanity.
                </p>
                <p>
                  You can also call us directly at{' '}
                  <a
                    href="tel:3173143757"
                    className="text-indigo-600 underline font-bold"
                  >
                    317-314-3757
                  </a>{' '}
                  or visit our office at 8888 Keystone Xing, Suite 1300,
                  Indianapolis, IN 46240.
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-lg p-6 border border-gray-200">
              <summary className="font-bold text-lg text-black cursor-pointer list-none flex justify-between items-center">
                What credentials and approvals does Elevate for Humanity have?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-black space-y-3">
                <p className="font-bold">We are officially approved by:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>U.S. Department of Labor (DOL)</strong> - Registered
                    Apprenticeship Sponsor (RAPIDS ID: 2025-IN-132301)
                  </li>
                  <li>
                    <strong>
                      Indiana Department of Workforce Development (DWD)
                    </strong>{' '}
                    - INTraining Location ID: 10004621
                  </li>
                  <li>
                    <strong>Indiana Department of Education (DOE)</strong> -
                    Approved training provider
                  </li>
                  <li>
                    <strong>Workforce Ready Grant (WRG)</strong> - All programs
                    eligible for state funding
                  </li>
                  <li>
                    <strong>WIOA Eligible Training Provider</strong> - Federal
                    workforce funding approved
                  </li>
                  <li>
                    <strong>Justice Reinvestment Initiative (JRI)</strong> -
                    Official partner
                  </li>
                  <li>
                    <strong>EmployIndy</strong> - Workforce development partner
                  </li>
                  <li>
                    <strong>Indiana State Board of Cosmetology</strong> -
                    Approved school
                  </li>
                  <li>
                    <strong>Indiana State Board of Barber Examiners</strong> -
                    Approved for apprenticeships
                  </li>
                </ul>
                <p className="mt-4">
                  <a
                    href="/accreditation"
                    className="text-indigo-600 underline font-bold"
                  >
                    View all credentials and verify our approvals →
                  </a>
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-lg p-6 border border-gray-200">
              <summary className="font-bold text-lg text-black cursor-pointer list-none flex justify-between items-center">
                Will you help me find a job after training?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-black space-y-3">
                <p>
                  <strong>Yes.</strong> Job placement is a core part of JRI. We
                  have partnerships with employers across Indiana who actively
                  hire our graduates, including those with criminal backgrounds.
                </p>
                <p>
                  Your case manager will work with you on resume building,
                  interview preparation, and direct introductions to hiring
                  managers. We don't just train you—we help you get hired.
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-lg p-6 border border-gray-200">
              <summary className="font-bold text-lg text-black cursor-pointer list-none flex justify-between items-center">
                How long does training take?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-black space-y-3">
                <p>Training duration varies by program:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Workforce Readiness:</strong> 2-4 weeks
                  </li>
                  <li>
                    <strong>Home Health Aide:</strong> 4-6 weeks
                  </li>
                  <li>
                    <strong>CNA (Certified Nursing Assistant):</strong> 6-8
                    weeks
                  </li>
                  <li>
                    <strong>CDL (Commercial Driver's License):</strong> 4-6
                    weeks
                  </li>
                  <li>
                    <strong>Peer Recovery Coach:</strong> 8-12 weeks
                  </li>
                  <li>
                    <strong>Direct Support Professional:</strong> 4-6 weeks
                  </li>
                </ul>
                <p>
                  All programs include hands-on training, certification exams,
                  and job placement assistance.
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-lg p-6 border border-gray-200">
              <summary className="font-bold text-lg text-black cursor-pointer list-none flex justify-between items-center">
                Can I earn money while I train?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-black space-y-3">
                <p className="font-bold text-lg">
                  Yes! Through DOL-registered apprenticeship programs, you can
                  earn while you learn.
                </p>
                <p>
                  Apprenticeships allow you to get hired by an employer first,
                  then receive paid on-the-job training while earning hourly
                  wages. You'll also receive free classroom instruction and
                  industry certifications—all while getting a paycheck.
                </p>
                <p>
                  <strong>Available apprenticeships include:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Barber Apprenticeship (1,500 hours, $12-15/hr starting)
                  </li>
                  <li>HVAC Technician (2,000 hours, $15-18/hr starting)</li>
                  <li>
                    Building Maintenance (1,000 hours, $14-17/hr starting)
                  </li>
                </ul>
                <p>
                  We are a U.S. Department of Labor Registered Apprenticeship
                  Sponsor (RAPIDS ID: 2025-IN-132301). This means your
                  apprenticeship is federally recognized and portable
                  nationwide.
                </p>
                <p>
                  <a
                    href="/apprenticeships"
                    className="text-indigo-600 underline font-bold"
                  >
                    Learn more about apprenticeship programs →
                  </a>
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-lg p-6 border border-gray-200">
              <summary className="font-bold text-lg text-black cursor-pointer list-none flex justify-between items-center">
                I'm an employer or program holder - how can I partner with you?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-black space-y-3">
                <p>
                  We partner with employers, nonprofits, and program holders to
                  create registered apprenticeship programs and provide trained
                  workers.
                </p>
                <p className="font-bold">Benefits for employers:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access to pre-screened, motivated candidates</li>
                  <li>
                    We handle all DOL apprenticeship registration and compliance
                  </li>
                  <li>Free training and certification for your employees</li>
                  <li>
                    Tax credits and incentives for hiring justice-involved
                    individuals
                  </li>
                  <li>Ongoing support and case management</li>
                  <li>Reduced turnover through wraparound services</li>
                </ul>
                <p>
                  Whether you need CDL drivers, healthcare workers, skilled
                  trades, or other positions, we can create a customized
                  training pipeline for your organization.
                </p>
                <p>
                  <a
                    href="/partner-with-us"
                    className="text-indigo-600 underline font-bold"
                  >
                    Learn about employer partnerships →
                  </a>{' '}
                  or call{' '}
                  <a
                    href="tel:3173143757"
                    className="text-indigo-600 underline font-bold"
                  >
                    317-314-3757
                  </a>
                </p>
              </div>
            </details>

            <details className="group bg-gray-50 rounded-lg p-6 border border-gray-200">
              <summary className="font-bold text-lg text-black cursor-pointer list-none flex justify-between items-center">
                What makes Elevate for Humanity different from other training
                providers?
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-4 text-black space-y-3">
                <p>
                  We're not just a training school—we're a complete support
                  system:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Officially approved</strong> by DOL, DWD, DOE, and
                    state licensing boards
                  </li>
                  <li>
                    <strong>Specialized in second-chance hiring</strong> - we
                    understand your challenges
                  </li>
                  <li>
                    <strong>Case management included</strong> - dedicated
                    support coordinator
                  </li>
                  <li>
                    <strong>Wraparound services</strong> - transportation,
                    childcare, emergency assistance
                  </li>
                  <li>
                    <strong>Employer partnerships</strong> - direct connections
                    to jobs
                  </li>
                  <li>
                    <strong>Flexible scheduling</strong> - day, evening, and
                    weekend classes
                  </li>
                  <li>
                    <strong>Small class sizes</strong> - personalized attention
                  </li>
                </ul>
                <p className="font-bold mt-4">
                  We believe everyone deserves a second chance. Your past
                  doesn't define your future.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Credentials & Outcomes */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <CredentialsOutcomes
            programName="Justice-Involved Reentry"
            partnerCertifications={[
              'Industry certifications based on chosen career pathway',
              'OSHA Safety Certifications',
              'Workforce Readiness Credentials',
            ]}
            employmentOutcomes={[
              'Stable employment in high-demand industries',
              'Career pathway to self-sufficiency',
              'Reduced recidivism through meaningful work',
              'Foundation for career advancement',
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 lg:px-12 py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl text-black mb-8">
            Apply now to see if you qualify for JRI-funded training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition text-lg"
            >
              Apply Now
            </Link>
            <a
              href="https://www.indianacareerconnect.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition text-lg"
            >
              Schedule at IndianaCareerConnect.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
