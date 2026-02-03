import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { GraduationCap, Phone, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apply | Elevate for Humanity',
  description: 'Start your journey to a new career. Check your eligibility and enroll in funded workforce training programs.',
};

// Program-specific redirects to modern intake forms
const programRedirects: Record<string, string> = {
  'barber-apprenticeship': '/programs/barber-apprenticeship/apply',
  'barber': '/programs/barber-apprenticeship/apply',
  'cna': '/programs/cna-certification',
  'hvac': '/programs/hvac-technician',
  'medical-assistant': '/programs/medical-assistant',
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>;
}) {
  const params = await searchParams;
  // Redirect program-specific apply links to program pages
  const program = (params?.program || '').toLowerCase();
  if (program && programRedirects[program]) {
    redirect(programRedirects[program]);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Apply' }]} />
        </div>
      </div>

      {/* Hero */}
      <section 
        className="relative py-20 px-4 bg-gradient-to-br from-blue-900 to-slate-900"
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start Your Career Training
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse our programs, check your eligibility for funding, and begin your enrollment in minutes.
          </p>
          
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors"
          >
            Browse Programs & Apply
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-12">
            How Enrollment Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Choose a Program</h3>
              <p className="text-slate-600 text-sm">Browse our career training programs and find the right fit.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Check Eligibility</h3>
              <p className="text-slate-600 text-sm">See if you qualify for WIOA, WRG, or other funding options.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Complete Application</h3>
              <p className="text-slate-600 text-sm">Submit your application and required documents.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">4</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Start Training</h3>
              <p className="text-slate-600 text-sm">Begin your career training once approved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
            Why Train With Us
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900">Funding Available</h3>
                <p className="text-slate-600 text-sm">Many students qualify for funded training through WIOA, WRG, JRI, or employer sponsorship.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900">Industry Credentials</h3>
                <p className="text-slate-600 text-sm">Earn recognized certifications and licenses that employers value.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900">Career Support</h3>
                <p className="text-slate-600 text-sm">Get help with job placement and career advancement after training.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900">Flexible Schedules</h3>
                <p className="text-slate-600 text-sm">Programs designed to fit around work and family commitments.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-slate-600 mb-6">
            Our enrollment team is here to help. Call us or submit an inquiry.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:317-314-3757"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-slate-900">(317) 314-3757</span>
            </a>
            <Link
              href="/inquiry"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="font-semibold text-slate-900">Submit an Inquiry</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
