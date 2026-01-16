import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { DollarSign, GraduationCap, Home, CheckCircle, Users, Briefcase } from 'lucide-react';
import ModernLandingHero from '@/components/landing/ModernLandingHero';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/wioa-eligibility',
  },
  title: 'WIOA Eligibility Requirements | Elevate For Humanity',
  description:
    'Check if you qualify for 100% free career training through WIOA funding. Learn about eligibility requirements and how to apply.',
  openGraph: {
    title: 'WIOA Eligibility - Free Career Training',
    description: 'Check if you qualify for 100% free career training through WIOA funding.',
    url: 'https://www.elevateforhumanity.org/wioa-eligibility',
    siteName: 'Elevate for Humanity',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'WIOA Eligibility' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WIOA Eligibility - Free Career Training',
    description: 'Check if you qualify for 100% free career training.',
    images: ['/og-default.jpg'],
  },
};

export const dynamic = 'force-dynamic';

export default async function WIOAEligibilityPage() {
  const supabase = await createClient();

  // Get eligibility criteria from database
  const { data: eligibilityCriteria } = await supabase
    .from('eligibility_criteria')
    .select('*')
    .eq('funding_type', 'WIOA')
    .eq('is_active', true)
    .order('order', { ascending: true });

  // Get FAQs about WIOA
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('category', 'wioa')
    .eq('is_active', true)
    .order('order', { ascending: true });

  // Get programs that accept WIOA funding
  const { data: programs } = await supabase
    .from('programs')
    .select('id, name, slug, description')
    .eq('is_active', true)
    .eq('accepts_wioa', true)
    .limit(6);

  const defaultCriteria = [
    {
      title: 'Adults (18+)',
      description: 'You must be 18 years or older and legally authorized to work in the United States.',
      icon: Users,
    },
    {
      title: 'Indiana Resident',
      description: 'You must be a resident of Indiana to qualify for state WIOA funding.',
      icon: Home,
    },
    {
      title: 'Employment Status',
      description: 'Unemployed, underemployed, or seeking better employment opportunities.',
      icon: Briefcase,
    },
    {
      title: 'Income Guidelines',
      description: 'Meet income requirements based on household size (most working families qualify).',
      icon: DollarSign,
    },
  ];

  const displayCriteria = eligibilityCriteria && eligibilityCriteria.length > 0 
    ? eligibilityCriteria 
    : defaultCriteria;

  const priorityGroups = [
    'Veterans and eligible spouses',
    'Recipients of public assistance (SNAP, TANF, SSI)',
    'Low-income individuals',
    'Basic skills deficient individuals',
    'Individuals with disabilities',
    'Ex-offenders',
    'Homeless individuals',
    'Youth aging out of foster care',
    'English language learners',
    'Long-term unemployed (27+ weeks)',
  ];

  return (
    <div className="min-h-screen bg-white">
      <ModernLandingHero
        badge="⚡ Most People Qualify"
        headline="Check Your"
        accentText="WIOA Eligibility"
        subheadline="Find out if you qualify for 100% free career training"
        description="WIOA (Workforce Innovation and Opportunity Act) provides funding for job training programs. Most Indiana residents qualify if they're unemployed, underemployed, or seeking better employment."
        imageSrc="/images/heroes/hero-state-funding.jpg"
        imageAlt="WIOA Eligibility"
        primaryCTA={{ text: "Check Eligibility", href: "#form" }}
        secondaryCTA={{ text: "Apply Now", href: "/apply" }}
        features={[
          "100% free training for eligible Indiana residents",
          "No student debt - all costs covered by WIOA funding",
          "Most people qualify - we help with the application"
        ]}
        imageOnRight={true}
      />

      {/* Main Content */}
      <section id="eligibility" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-50 border-l-4 border-green-600 p-8 mb-12 rounded-r-xl shadow-sm">
            <h2 className="text-2xl font-black text-green-900 mb-2">
              Good News!
            </h2>
            <p className="text-lg text-gray-700">
              Most people qualify for WIOA funding. If you're looking to start a
              new career or upgrade your skills, you likely qualify.
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-black mb-8">
            Who Qualifies for WIOA?
          </h2>

          <div className="space-y-6 mb-12">
            {displayCriteria.map((criteria: any, index: number) => {
              const IconComponent = criteria.icon || CheckCircle;
              return (
                <div 
                  key={index} 
                  className="bg-white border-2 border-slate-200 rounded-lg p-6 hover:border-orange-500 transition-colors"
                >
                  <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    {criteria.title}
                  </h3>
                  <p className="text-gray-600">{criteria.description}</p>
                </div>
              );
            })}
          </div>

          {/* Priority Groups */}
          <div className="bg-blue-50 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6">Priority Service Groups</h3>
            <p className="text-gray-600 mb-6">
              The following groups receive priority for WIOA services:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {priorityGroups.map((group, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{group}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Programs */}
          {programs && programs.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">WIOA-Approved Programs</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {programs.map((program: any) => (
                  <Link
                    key={program.id}
                    href={`/programs/${program.slug || program.id}`}
                    className="bg-white border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <h4 className="font-semibold">{program.name}</h4>
                    {program.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{program.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {faqs && faqs.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq: any) => (
                  <div key={faq.id} className="bg-white rounded-lg p-6 border">
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Form */}
          <div id="form" className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-500">
            <h3 className="text-2xl font-bold text-center mb-4">
              Check Your Eligibility
            </h3>
            <p className="text-gray-600 text-center mb-8">
              Not sure if you qualify? Apply and we'll help determine your eligibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition text-center"
              >
                Apply for Free Training
              </Link>
              <a
                href="tel:3173143757"
                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition text-center"
              >
                Call (317) 314-3757
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other Funding Options */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Other Funding Options
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Don't qualify for WIOA? You may be eligible for other funding programs:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/wioa-eligibility/veterans" className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition">
              <h3 className="font-bold mb-2">Veterans Benefits</h3>
              <p className="text-sm text-gray-600">GI Bill and veteran-specific training programs</p>
            </Link>
            <Link href="/wioa-eligibility/public-assistance" className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition">
              <h3 className="font-bold mb-2">Public Assistance</h3>
              <p className="text-sm text-gray-600">SNAP, TANF, and other assistance recipients</p>
            </Link>
            <Link href="/wioa-eligibility/low-income" className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition">
              <h3 className="font-bold mb-2">Low Income</h3>
              <p className="text-sm text-gray-600">Income-based eligibility guidelines</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
