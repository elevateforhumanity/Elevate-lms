import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compliance | Elevate for Humanity',
  description: 'Our commitment to WIOA, DOL, and workforce compliance standards.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/compliance',
  },
};

export default function CompliancePage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-orange-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Compliance & Standards</h1>
          <p className="text-xl text-black">
            We maintain the highest standards of compliance with federal and
            state workforce regulations.
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Our Compliance Framework</h2>
            <div className="space-y-4">
              {[
                'WIOA (Workforce Innovation & Opportunity Act) Compliance',
                'DOL (Department of Labor) Standards',
                'State Workforce Board Requirements',
                'FERPA (Student Privacy Protection)',
                'ADA (Accessibility Standards)',
                'Equal Opportunity Employment',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-10 w-10 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-black">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">For Partners</h2>
            <p className="text-black mb-4">
              Program holders and workforce partners can access compliance tools
              and reporting through their portals.
            </p>
            <Link
              href="/partners/compliance"
              className="text-orange-600 font-semibold hover:underline"
            >
              Partner Compliance Tools →
            </Link>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Questions?</h2>
            <p className="text-black mb-4">
              For compliance inquiries or to request documentation, please
              contact our compliance team.
            </p>
            <Link
              href="/contact"
              className="text-orange-600 font-semibold hover:underline"
            >
              Contact Compliance Team →
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
