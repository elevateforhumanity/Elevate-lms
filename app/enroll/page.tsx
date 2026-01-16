import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import ProgramHowItWorks from '@/components/program/ProgramHowItWorks';
import ProgramFAQ from '@/components/program/ProgramFAQ';
import ModernLandingHero from '@/components/landing/ModernLandingHero';

export const metadata: Metadata = {
  title: 'Enroll Now | Elevate For Humanity',
  description: 'Start your career training journey. Enroll in free workforce development programs with WIOA funding in Indianapolis.',
};

export const dynamic = 'force-dynamic';

export default async function EnrollPage() {
  const supabase = await createClient();

  // Get available programs for enrollment
  const { data: programs } = await supabase
    .from('programs')
    .select('id, name, slug, description, duration, is_active')
    .eq('is_active', true)
    .eq('accepting_enrollments', true)
    .order('name', { ascending: true });

  // Get funding options
  const { data: fundingOptions } = await supabase
    .from('funding_options')
    .select('*')
    .eq('is_active', true);

  const defaultFunding = [
    { code: 'WRG', name: 'Workforce Ready Grant', description: 'Indiana state funding for workforce training' },
    { code: 'WIOA', name: 'Workforce Innovation', description: 'Federal workforce development funding' },
    { code: 'JRI', name: 'Justice Reinvestment', description: 'Funding for justice-involved individuals' },
  ];

  const displayFunding = fundingOptions && fundingOptions.length > 0 ? fundingOptions : defaultFunding;

  return (
    <div className="min-h-screen bg-white">
      <ModernLandingHero
        badge="⚡ 100% Free Training Available"
        headline="Enroll in"
        accentText="Free Career Training"
        subheadline="No Tuition. No Debt. Start Your New Career Today."
        description="Most students qualify for 100% free training through WIOA, WRG, or JRI funding. We handle all the paperwork and help you every step of the way."
        imageSrc="/og-default.jpg"
        imageAlt="Enroll in Free Training"
        primaryCTA={{ text: "Apply for Free Training", href: "#enrollment" }}
        secondaryCTA={{ text: "Call 317-314-3757", href: "tel:317-314-3757" }}
        features={[
          "100% free training through WIOA, WRG, or JRI funding",
          "No tuition, no debt, no hidden costs",
          "We handle all paperwork and applications"
        ]}
        imageOnRight={true}
      />

      {/* Enrollment Form */}
      <section id="enrollment" className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          {/* FREE Training Only */}
          <div className="bg-white rounded-2xl border-2 border-green-500 p-8 shadow-lg">
            <div className="text-3xl font-black text-green-700 mb-4 text-center">
              Apply for FREE Training
            </div>
            <p className="text-lg text-black mb-6 text-center">
              Most students qualify for 100% free training through:
            </p>
            <ul className="space-y-3 mb-8 text-black max-w-md mx-auto">
              {displayFunding.map((funding: any) => (
                <li key={funding.code} className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span>
                    <strong>{funding.code}</strong> - {funding.name}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-black mb-8 text-center">
              No tuition. No debt. We help you apply and handle all paperwork.
            </p>
            <Link
              href="/apply"
              className="block w-full text-center px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all text-lg"
            >
              Apply for Free Training
            </Link>
          </div>

          {/* Available Programs */}
          {programs && programs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-center mb-6">Available Programs</h2>
              <div className="grid gap-4">
                {programs.map((program: any) => (
                  <Link
                    key={program.id}
                    href={`/programs/${program.slug || program.id}`}
                    className="block bg-white rounded-xl border p-6 hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-lg">{program.name}</h3>
                    {program.description && (
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{program.description}</p>
                    )}
                    {program.duration && (
                      <p className="text-sm text-green-600 mt-2">Duration: {program.duration}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <p className="text-black mb-2">Questions?</p>
            <a
              href="tel:3173143757"
              className="text-2xl font-bold text-orange-600 hover:text-orange-700"
            >
              Call 317-314-3757
            </a>
          </div>

          {/* How It Works Section */}
          <div className="mt-12">
            <ProgramHowItWorks programName="Enrollment" />
          </div>

          {/* FAQ Section */}
          <div className="mt-8">
            <ProgramFAQ />
          </div>
        </div>
      </section>
    </div>
  );
}
