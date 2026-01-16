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
  Clock,
  FileText,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/funding/wioa',
  },
  title: 'WIOA Funding | Free Training Programs | Elevate For Humanity',
  description: 'Learn about WIOA (Workforce Innovation and Opportunity Act) funding for free career training. Check eligibility and apply for funded training programs.',
};

const ELIGIBILITY_CRITERIA = [
  {
    title: 'Age Requirement',
    description: 'Must be 18 years or older (youth programs available for ages 16-24)',
    icon: Users,
  },
  {
    title: 'Work Authorization',
    description: 'Must be authorized to work in the United States',
    icon: FileText,
  },
  {
    title: 'Selective Service',
    description: 'Males must be registered with Selective Service (if applicable)',
    icon: CheckCircle,
  },
  {
    title: 'Income Guidelines',
    description: 'Meet income eligibility requirements or qualify through other criteria',
    icon: DollarSign,
  },
];

const PRIORITY_GROUPS = [
  'Veterans and eligible spouses',
  'Recipients of public assistance (TANF, SNAP, SSI)',
  'Low-income individuals',
  'Individuals with disabilities',
  'Ex-offenders and justice-involved individuals',
  'Homeless individuals',
  'Long-term unemployed (27+ weeks)',
  'Single parents',
  'Youth aging out of foster care',
  'Individuals with limited English proficiency',
];

const COVERED_EXPENSES = [
  { item: 'Tuition & Training Fees', description: 'Full cost of approved training programs' },
  { item: 'Books & Supplies', description: 'Required textbooks, uniforms, and materials' },
  { item: 'Certification Exams', description: 'State licensing and certification test fees' },
  { item: 'Transportation', description: 'Gas cards, bus passes, or mileage reimbursement' },
  { item: 'Childcare', description: 'Childcare assistance while in training' },
  { item: 'Work Equipment', description: 'Tools and equipment needed for employment' },
];

export default function WIOAFundingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
          <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <DollarSign className="w-4 h-4" />
                  <span>Government Funded Training</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                  WIOA Funding
                </h1>
                <p className="text-xl text-green-100 mb-4 leading-relaxed">
                  The Workforce Innovation and Opportunity Act (WIOA) provides funding for 
                  eligible individuals to receive free career training and supportive services.
                </p>
                <p className="text-lg text-green-200 mb-8">
                  Qualified participants can receive up to <strong className="text-white">$10,000+</strong> in 
                  training funds with no repayment required.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/wioa-eligibility"
                    className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-green-50 transition shadow-lg"
                  >
                    Check Eligibility
                  </Link>
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 bg-green-500/30 backdrop-blur text-white px-8 py-4 rounded-xl font-bold hover:bg-green-500/40 transition border border-white/30"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/heroes/wioa-funding.jpg"
                    alt="WIOA Funding"
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

        {/* What is WIOA */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                  What is WIOA?
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  The Workforce Innovation and Opportunity Act (WIOA) is a federal law that provides 
                  funding for workforce development programs. It helps job seekers access employment, 
                  education, training, and support services to succeed in the labor market.
                </p>
                <p className="text-lg text-slate-600 mb-6">
                  WIOA funding is administered through local American Job Centers (also known as 
                  CareerSource, WorkOne, or Workforce Solutions depending on your state).
                </p>
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="font-bold text-green-900 mb-2">Key Benefits:</h3>
                  <ul className="space-y-2 text-green-800">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>100% free training - no loans or repayment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Supportive services for transportation and childcare</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Career counseling and job placement assistance</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/business/career-counseling.jpg"
                  alt="Career Counseling"
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
                Basic Eligibility Requirements
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                To qualify for WIOA funding, you must meet these basic requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {ELIGIBILITY_CRITERIA.map((criteria) => {
                const IconComponent = criteria.icon;
                return (
                  <div
                    key={criteria.title}
                    className="bg-white rounded-xl p-6 border border-slate-200"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{criteria.title}</h3>
                    <p className="text-slate-600 text-sm">{criteria.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Priority Groups</h3>
              <p className="text-slate-600 mb-6">
                The following groups receive priority for WIOA services:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {PRIORITY_GROUPS.map((group, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{group}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What's Covered */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                What WIOA Covers
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                WIOA funding can cover a wide range of training and supportive service expenses.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COVERED_EXPENSES.map((expense) => (
                <div
                  key={expense.item}
                  className="bg-slate-50 rounded-xl p-6 hover:shadow-md transition"
                >
                  <h3 className="font-bold text-slate-900 mb-2">{expense.item}</h3>
                  <p className="text-slate-600">{expense.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                How to Apply for WIOA Funding
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Follow these steps to apply for WIOA-funded training.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Check Eligibility', description: 'Use our eligibility checker to see if you qualify' },
                { step: '2', title: 'Contact Workforce Center', description: 'Visit your local American Job Center' },
                { step: '3', title: 'Complete Assessment', description: 'Meet with a career counselor for evaluation' },
                { step: '4', title: 'Get Approved', description: 'Receive your ITA (Individual Training Account)' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Check your eligibility in minutes and take the first step toward a new career.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/wioa-eligibility"
                className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-green-50 transition"
              >
                Check Eligibility Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 bg-green-500/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-500/40 transition border border-white/30"
              >
                Browse Programs
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
