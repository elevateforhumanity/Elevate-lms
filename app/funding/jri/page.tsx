import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { 
  DollarSign, 
  CheckCircle, 
  Users, 
  BookOpen,
  Briefcase,
  Award,
  Shield,
  Heart,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/funding/jri',
  },
  title: 'JRI Funding | Justice Reinvestment Initiative | Elevate For Humanity',
  description: 'Learn about Justice Reinvestment Initiative (JRI) funding for reentry training programs. Free career training for justice-involved individuals.',
};

const ELIGIBILITY_CRITERIA = [
  'Currently on probation or parole',
  'Recently released from incarceration (within 5 years)',
  'Participating in a diversion program',
  'Court-ordered to complete job training',
  'Referred by a reentry organization',
  'Enrolled in a reentry support program',
];

const COVERED_PROGRAMS = [
  { name: 'Healthcare Training', examples: 'CNA, Medical Assistant, Phlebotomy' },
  { name: 'Skilled Trades', examples: 'HVAC, Electrical, Welding, Construction' },
  { name: 'Transportation', examples: 'CDL, Forklift, Heavy Equipment' },
  { name: 'Business Skills', examples: 'Tax Preparation, Bookkeeping, Customer Service' },
  { name: 'Technology', examples: 'IT Support, Data Entry, Computer Skills' },
  { name: 'Food Service', examples: 'ServSafe, Culinary Arts, Food Handler' },
];

const SUPPORT_SERVICES = [
  { service: 'Career Counseling', description: 'One-on-one guidance for career planning' },
  { service: 'Job Placement', description: 'Connections with reentry-friendly employers' },
  { service: 'Transportation', description: 'Bus passes, gas cards, or ride assistance' },
  { service: 'Work Clothing', description: 'Professional attire and uniforms' },
  { service: 'Tool Assistance', description: 'Required tools and equipment for work' },
  { service: 'Housing Referrals', description: 'Connections to transitional housing' },
];

export default function JRIFundingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
          <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Shield className="w-4 h-4" />
                  <span>Reentry Support</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                  JRI Funding
                </h1>
                <p className="text-xl text-indigo-100 mb-4 leading-relaxed">
                  The Justice Reinvestment Initiative (JRI) provides funding for career training 
                  and support services for justice-involved individuals seeking a fresh start.
                </p>
                <p className="text-lg text-indigo-200 mb-8">
                  Free training programs designed to reduce recidivism and create pathways to 
                  sustainable employment.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition shadow-lg"
                  >
                    Apply Now
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-indigo-500/30 backdrop-blur text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-500/40 transition border border-white/30"
                  >
                    Talk to a Counselor
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/heroes/reentry-support.jpg"
                    alt="JRI Reentry Support"
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is JRI */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  What is JRI?
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  The Justice Reinvestment Initiative is a data-driven approach to reduce corrections 
                  spending and reinvest savings in strategies that can decrease crime and strengthen 
                  communities.
                </p>
                <p className="text-lg text-slate-600 mb-6">
                  JRI funding supports workforce development programs specifically designed for 
                  individuals with criminal backgrounds, helping them gain skills and find employment.
                </p>
                <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                  <h3 className="font-bold text-indigo-900 mb-2">Program Goals:</h3>
                  <ul className="space-y-2 text-indigo-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Reduce recidivism through employment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Provide marketable job skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>Connect with reentry-friendly employers</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/business/job-training.jpg"
                  alt="Job Training"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                Who Qualifies?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                JRI funding is available for individuals who meet one or more of these criteria.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <div className="grid md:grid-cols-2 gap-4">
                  {ELIGIBILITY_CRITERIA.map((criteria, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Covered Programs */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                Training Programs Available
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                JRI funding covers a variety of in-demand career training programs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COVERED_PROGRAMS.map((program) => (
                <div
                  key={program.name}
                  className="bg-slate-50 rounded-xl p-6 hover:shadow-md transition"
                >
                  <h3 className="font-bold text-slate-900 mb-2">{program.name}</h3>
                  <p className="text-slate-600 text-sm">{program.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Services */}
        <section className="py-20 bg-indigo-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Additional Support Services
              </h2>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
                Beyond training, JRI programs provide wraparound support to help you succeed.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SUPPORT_SERVICES.map((item) => (
                <div
                  key={item.service}
                  className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20"
                >
                  <h3 className="font-bold text-white mb-2">{item.service}</h3>
                  <p className="text-indigo-200 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                Second Chance Success
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our JRI participants are building new careers and new lives.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { stat: '85%', label: 'Employment Rate', description: 'Of graduates find employment within 90 days' },
                { stat: '12%', label: 'Recidivism Rate', description: 'Compared to 44% state average' },
                { stat: '$18/hr', label: 'Average Starting Wage', description: 'For program graduates' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-5xl font-black text-indigo-600 mb-2">{item.stat}</div>
                  <div className="text-xl font-bold text-slate-900 mb-1">{item.label}</div>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Heart className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Everyone Deserves a Second Chance
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Your past doesn&apos;t define your future. Let us help you build the career you deserve.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition"
              >
                Start Your Application
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-indigo-500/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-500/40 transition border border-white/30"
              >
                Talk to Someone
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
