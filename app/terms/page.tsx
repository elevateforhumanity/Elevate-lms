import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FileText, CheckCircle, AlertTriangle, Phone } from 'lucide-react';

const SITE_URL = 'https://www.elevateforhumanity.org';

export const metadata: Metadata = {
  title: 'Terms of Service | Elevate for Humanity',
  description: 'Terms and conditions for using Elevate for Humanity services and programs.',
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-blue-400" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-slate-300">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm text-slate-400 mt-4">Last updated: January 2025</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600">
              By accessing or using Elevate for Humanity&apos;s website, learning management system, 
              or any of our services, you agree to be bound by these Terms of Service. If you 
              do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Services Description</h2>
            <p className="text-slate-600 mb-4">
              Elevate for Humanity provides:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Career training and workforce development programs</li>
              <li>Online learning management system (LMS)</li>
              <li>Job placement and career services</li>
              <li>Certification and credentialing programs</li>
              <li>Support services for program participants</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Responsibilities</h2>
            <p className="text-slate-600 mb-4">
              As a user of our services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect intellectual property rights</li>
              <li>Not engage in fraudulent or deceptive practices</li>
              <li>Follow our academic integrity policies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Program Enrollment</h2>
            <p className="text-slate-600">
              Enrollment in our programs is subject to eligibility requirements, available 
              funding, and program capacity. We reserve the right to verify eligibility 
              information and to deny or revoke enrollment for misrepresentation or 
              non-compliance with program requirements.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Intellectual Property</h2>
            <p className="text-slate-600">
              All content, materials, and resources provided through our services are the 
              property of Elevate for Humanity or our licensors. You may not reproduce, 
              distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-slate-600">
              Elevate for Humanity provides services on an &quot;as is&quot; basis. We do not guarantee 
              employment outcomes, certification pass rates, or specific results. Our liability 
              is limited to the extent permitted by law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Termination</h2>
            <p className="text-slate-600">
              We may suspend or terminate your access to our services for violation of these 
              terms, non-compliance with program requirements, or other reasons at our discretion.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Changes to Terms</h2>
            <p className="text-slate-600">
              We may update these terms from time to time. Continued use of our services 
              after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Contact</h2>
            <p className="text-slate-600 mb-4">
              For questions about these terms, contact us:
            </p>
            <div className="bg-slate-50 rounded-xl p-6">
              <p className="text-slate-700">
                <strong>Elevate for Humanity</strong><br />
                Email: <a href="mailto:legal@elevateforhumanity.org" className="text-blue-600 hover:underline">legal@elevateforhumanity.org</a><br />
                Phone: (317) 314-3757<br />
                Address: Indianapolis, IN
              </p>
            </div>
          </section>
        </div>

        {/* Related Links */}
        <div className="border-t pt-8 mt-8">
          <h3 className="font-bold text-slate-900 mb-4">Related Policies</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            <Link href="/accessibility" className="text-blue-600 hover:underline">Accessibility</Link>
            <Link href="/academic-integrity" className="text-blue-600 hover:underline">Academic Integrity</Link>
          </div>
        </div>
      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Start Your Career?</h2>
          <p className="text-blue-100 mb-6">Apply today for free career training programs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-white text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Apply Now
            </Link>
            <a
              href="tel:317-314-3757"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition"
            >
              <Phone className="w-4 h-4" />
              (317) 314-3757
            </a>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
