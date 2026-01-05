import { Metadata } from 'next';
import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { CompactHero } from '@/components/heroes/CompactHero';

export const metadata: Metadata = {
  title: 'Drug & Alcohol Specimen Collector Certification | Free DOT Training',
  description:
    '100% free DOT-certified drug collector training. Fast-track to a specialized healthcare career. High demand across transportation, healthcare, and corporate sectors.',
  keywords: [
    'Drug Collector Indianapolis',
    'free Drug Collector training',
    'WIOA Drug Collector',
    'Drug Collector apprenticeship',
    'DOT certification',
  ],
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/drug-collector',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <CompactHero
        variant="default"
        badge={{
          icon: Stethoscope,
          text: 'Healthcare Career',
          href: '/programs/healthcare',
        }}
        headline="Drug & Alcohol Specimen Collector: DOT-certified training"
        description="100% free training to become a certified specimen collector. Work in healthcare facilities, labs, and workplace testing programs. High demand across multiple sectors."
        primaryCTA={{ text: 'Apply Now', href: '/apply' }}
        secondaryCTA={{ text: 'Talk to an Advisor', href: '/contact' }}
      />

      {/* Program Overview */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Program Overview
            </h2>
            <p className="text-lg text-slate-600 mb-4">
              Become a certified Drug & Alcohol Specimen Collector and work in
              healthcare facilities, labs, and workplace testing programs. This
              specialized certification is in high demand across transportation,
              healthcare, and corporate sectors.
            </p>
            <p className="text-lg text-slate-600 mb-4">
              Our DOT-approved training meets all federal requirements for urine
              and breath alcohol specimen collection.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Quick Facts
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">Duration:</span>
                <span className="text-slate-700">2-3 weeks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">Cost:</span>
                <span className="text-slate-700">$0 with funding</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">Format:</span>
                <span className="text-slate-700">
                  Hybrid (online + hands-on)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">Starting Pay:</span>
                <span className="text-slate-700">$16-$22/hour</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">Certification:</span>
                <span className="text-slate-700">DOT-approved</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                DOT Regulations
              </h3>
              <p className="text-slate-600">
                Federal requirements for drug and alcohol testing
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Specimen Collection
              </h3>
              <p className="text-slate-600">
                Proper urine collection procedures and chain of custody
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Breath Alcohol Testing
              </h3>
              <p className="text-slate-600">
                Operating evidential breath testing devices
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Documentation
              </h3>
              <p className="text-slate-600">
                Accurate record-keeping and reporting
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Quality Control
              </h3>
              <p className="text-slate-600">
                Maintaining specimen integrity and validity
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Legal Compliance
              </h3>
              <p className="text-slate-600">
                Privacy laws and legal requirements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Outlook */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          Career Opportunities
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Work Settings
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• Medical Laboratories</li>
              <li>• Occupational Health Clinics</li>
              <li>• Mobile Collection Services</li>
              <li>• Corporate Testing Programs</li>
              <li>• Transportation Companies</li>
              <li>• Third-Party Administrators</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Why This Career?
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>• High demand across industries</li>
              <li>• Flexible scheduling options</li>
              <li>• Specialized, respected role</li>
              <li>• Opportunities for mobile work</li>
              <li>• Stable employment</li>
              <li>• Room for advancement</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Get DOT-Certified in Weeks
          </h2>
          <p className="text-xl mb-8">
            Start your specialized healthcare career today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-bold rounded-lg transition-all text-center"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg transition-all text-center border-2 border-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
