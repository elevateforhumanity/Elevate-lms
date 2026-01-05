import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/terms-of-service',
  },
  title: 'Terms of Service | Elevate For Humanity',
  description: 'Terms of Service and user agreement for Elevate For Humanity.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean, No Gradient, No Image, No CTAs */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-base md:text-lg text-slate-300">
            Last Updated: December 8, 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-700 mb-6">
              By accessing or using the Elevate For Humanity website and
              services, you agree to be bound by these Terms of Service. If you
              do not agree to these terms, please do not use our website or
              services.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              2. Services Provided
            </h2>
            <p className="text-slate-700 mb-4">
              Elevate For Humanity provides:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>
                Free workforce training programs funded by government grants
              </li>
              <li>Professional tax preparation services</li>
              <li>Career counseling and job placement assistance</li>
              <li>Educational resources and support services</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              3. Eligibility
            </h2>
            <p className="text-slate-700 mb-4">
              To participate in our programs, you must:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>Meet program-specific eligibility requirements</li>
              <li>
                Provide accurate and complete information during enrollment
              </li>
              <li>Comply with all program rules and requirements</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              4. User Responsibilities
            </h2>
            <p className="text-slate-700 mb-4">
              As a user of our services, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Attend classes and complete assignments as required</li>
              <li>Treat staff, instructors, and other students with respect</li>
              <li>Follow all facility rules and safety guidelines</li>
              <li>Not engage in any illegal or prohibited activities</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              5. Intellectual Property
            </h2>
            <p className="text-slate-700 mb-4">
              All content on this website is protected by copyright law:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>
                Course materials, videos, and documents are for personal
                educational use only
              </li>
              <li>
                You may not reproduce, distribute, or sell our materials without
                permission
              </li>
              <li>Our logo, trademarks, and branding are protected</li>
              <li>
                User-generated content remains your property but grants us a
                license to use it
              </li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              6. Privacy and Data
            </h2>
            <p className="text-slate-700 mb-6">
              We collect and use your personal information as described in our
              Privacy Policy. By using our services, you consent to our data
              practices.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              7. Program Withdrawal
            </h2>
            <p className="text-slate-700 mb-4">
              You may withdraw from a program at any time by:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>Notifying your instructor or program coordinator</li>
              <li>Completing required withdrawal paperwork</li>
              <li>Returning any borrowed equipment or materials</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              8. Termination
            </h2>
            <p className="text-slate-700 mb-4">
              We reserve the right to terminate your access to our services if
              you:
            </p>
            <ul className="list-disc pl-6 mb-6 text-slate-700 space-y-2">
              <li>Violate these Terms of Service</li>
              <li>Engage in disruptive or inappropriate behavior</li>
              <li>Provide false or misleading information</li>
              <li>
                Fail to meet program attendance or performance requirements
              </li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              9. Disclaimer of Warranties
            </h2>
            <p className="text-slate-700 mb-6">
              Our services are provided "as is" without warranties of any kind.
              While we strive to provide quality education and services, we do
              not guarantee specific outcomes, job placement, or certification
              results.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              10. Limitation of Liability
            </h2>
            <p className="text-slate-700 mb-6">
              Elevate For Humanity shall not be liable for any indirect,
              incidental, special, or consequential damages arising from your
              use of our services or inability to use our services.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              11. Third-Party Links
            </h2>
            <p className="text-slate-700 mb-6">
              Our website may contain links to third-party websites. We are not
              responsible for the content, privacy practices, or terms of
              service of external sites.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              12. Changes to Terms
            </h2>
            <p className="text-slate-700 mb-6">
              We reserve the right to modify these Terms of Service at any time.
              Changes will be posted on this page with an updated date. Your
              continued use of our services after changes are posted constitutes
              acceptance of the modified terms.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              13. Governing Law
            </h2>
            <p className="text-slate-700 mb-6">
              These Terms of Service are governed by the laws of the State of
              Indiana, United States, without regard to conflict of law
              principles.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12">
              14. Contact Information
            </h2>
            <p className="text-slate-700 mb-4">
              For questions about these Terms of Service:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg mb-8">
              <p className="text-slate-700 mb-2">
                <strong>Elevate For Humanity</strong>
              </p>
              <p className="text-slate-700 mb-2">
                Phone:{' '}
                <a
                  href="tel:317-314-3757"
                  className="text-brand-blue-600 hover:underline"
                >
                  317-314-3757
                </a>
              </p>
              <p className="text-slate-700">
                Email:{' '}
                <a
                  href="mailto:legal@elevateforhumanity.org"
                  className="text-brand-blue-600 hover:underline"
                >
                  legal@elevateforhumanity.org
                </a>
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-slate-700 mb-4">
                <strong>Related Policies:</strong>
              </p>
              <div className="space-y-2">
                <Link
                  href="/privacy"
                  className="block text-brand-blue-600 hover:underline font-semibold"
                >
                  Privacy Policy →
                </Link>
                <Link
                  href="/refund-policy"
                  className="block text-brand-blue-600 hover:underline font-semibold"
                >
                  Refund Policy →
                </Link>
                <Link
                  href="/dmca"
                  className="block text-brand-blue-600 hover:underline font-semibold"
                >
                  DMCA Policy →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
