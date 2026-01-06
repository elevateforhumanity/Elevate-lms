import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apprenticeship Programs | Elevate for Humanity',
  description:
    'Build your workforce through DOL-registered apprenticeship programs.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/employers/apprenticeships',
  },
};

export default function ApprenticeshipPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/employers"
            className="inline-flex items-center text-orange-100 hover:text-white mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employers
          </Link>
          <h1 className="text-4xl font-bold mb-4">Apprenticeship Programs</h1>
          <p className="text-xl text-orange-100 max-w-3xl">
            Build your workforce through DOL-registered apprenticeship programs
            with our comprehensive support and infrastructure.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Why Apprenticeships?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Earn While You Learn</h3>
                  <p className="text-gray-600">
                    Apprentices earn wages while gaining valuable skills and
                    experience.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Industry Credentials</h3>
                  <p className="text-gray-600">
                    Programs lead to nationally recognized certifications.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Reduced Turnover</h3>
                  <p className="text-gray-600">
                    Apprentices are more likely to stay with your company
                    long-term.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Tax Benefits</h3>
                  <p className="text-gray-600">
                    Employers may qualify for tax credits and incentives.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Support</h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <p className="text-gray-700">
                We provide comprehensive support for employers looking to start
                or expand apprenticeship programs:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>DOL registration and compliance assistance</li>
                <li>Curriculum development and training materials</li>
                <li>Apprentice recruitment and screening</li>
                <li>Progress tracking and reporting</li>
                <li>Ongoing program management support</li>
              </ul>
            </div>
          </section>

          <section className="bg-orange-50 border border-orange-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start an Apprenticeship Program?
            </h2>
            <p className="text-gray-700 mb-6">
              Contact us to discuss how we can help you build a skilled
              workforce through apprenticeships.
            </p>
            <Link href="/contact">
              <Button size="lg">Get Started</Button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
