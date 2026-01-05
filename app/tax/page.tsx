import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle,
  Building2,
  Users,
  Shield,
  AlertCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/tax',
  },
  title: 'Tax Preparation Services | Elevate For Humanity',
  description:
    'Trusted tax help — free community-based tax preparation and professional paid tax services.',
};

export default function TaxServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Tax Preparation Services"
          fill
          className="object-cover brightness-50"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Trusted Tax Help — Free or Professional Options Available
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8">
            We offer both free community-based tax preparation and professional
            paid tax services through separate programs to ensure clarity,
            compliance, and choice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tax/free"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-green-600 hover:bg-green-700 text-white rounded-lg text-lg font-bold transition-colors"
            >
              Free Tax Help (Rise Up Foundation)
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/tax/professional"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-blue-600 hover:bg-brand-blue-700 text-white rounded-lg text-lg font-bold transition-colors"
            >
              Professional Tax Services (SupersonicFastCash)
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Choose Your Option */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Choose the Option That Fits You
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Tax Prep */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-10 h-10 text-brand-green-600" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Rise Up Foundation
                  </h3>
                  <p className="text-green-700 font-semibold">
                    Free tax preparation for eligible individuals and families
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">No cost</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    IRS-aligned volunteer program
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Appointment-based</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Secure document handling
                  </span>
                </li>
              </ul>

              <Link
                href="/tax/free"
                className="block w-full text-center px-6 py-3 bg-brand-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors mb-4"
              >
                Get Free Tax Help
              </Link>

              <p className="text-xs text-gray-600 italic">
                Free tax services are provided through Rise Up Foundation and
                follow IRS VITA/TCE guidelines.
              </p>
            </div>

            {/* Paid Tax Prep */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-10 h-10 text-brand-blue-600" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    SupersonicFastCash
                  </h3>
                  <p className="text-blue-700 font-semibold">
                    Professional tax preparation for individuals and businesses
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Experienced preparers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Fast turnaround</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Business & self-employed support
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Secure upload & appointments
                  </span>
                </li>
              </ul>

              <Link
                href="/tax/professional"
                className="block w-full text-center px-6 py-3 bg-brand-blue-600 hover:bg-brand-blue-700 text-white rounded-lg font-bold transition-colors mb-4"
              >
                Book Paid Tax Services
              </Link>

              <p className="text-xs text-gray-600 italic">
                Paid tax services are provided by SupersonicFastCash, a
                for-profit tax preparation business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Notice */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border-l-4 border-orange-500 p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-brand-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Important Compliance Notice
                </h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Free and paid tax services are operated separately. Clients
                  must choose one service path.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Volunteers involved in free tax services do not receive
                  compensation for tax preparation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Additional Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/tax/volunteer"
              className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-brand-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-green-600 transition-colors">
                <Users className="w-6 h-6 text-brand-green-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Volunteer With Us
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Help your community by becoming a VITA volunteer tax preparer.
              </p>
              <div className="flex items-center text-brand-green-600 font-semibold text-sm">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <Link
              href="/tax/upload"
              className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-blue-600 transition-colors">
                <Shield className="w-6 h-6 text-brand-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Secure Document Upload
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload your tax documents securely for faster processing.
              </p>
              <div className="flex items-center text-brand-blue-600 font-semibold text-sm">
                Upload Documents <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </Link>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                IRS Resources
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Official IRS information and free tax preparation resources.
              </p>
              <div className="space-y-2">
                <a
                  href="https://irs.treasury.gov/freetaxprep/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-purple-600 hover:underline"
                >
                  IRS Free Tax Prep →
                </a>
                <a
                  href="https://linklearncertification.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-purple-600 hover:underline"
                >
                  Link & Learn Taxes →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
