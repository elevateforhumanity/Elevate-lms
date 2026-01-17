import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Business Programs | Elevate for Humanity',
  description: 'Tax Preparation, Financial Services training. Free for eligible Indiana residents.',
};

const programs = [
  {
    title: 'Tax Preparation',
    duration: '8 weeks',
    description: 'IRS-certified tax preparer training for seasonal and year-round work.',
    href: '/programs/tax-preparation',
  },
  {
    title: 'Business & Financial Services',
    duration: '10 weeks',
    description: 'Bookkeeping, QuickBooks, and financial management skills.',
    href: '/programs/business-financial',
  },
  {
    title: 'Tax & Entrepreneurship',
    duration: '12 weeks',
    description: 'Start your own tax preparation business.',
    href: '/programs/tax-entrepreneurship',
  },
];

export default function BusinessPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-xl">
              <Link href="/programs" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">
                ← Back to Programs
              </Link>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Business Programs
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Develop professional skills. Tax preparation, bookkeeping, and financial services.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-base font-medium rounded-full hover:bg-gray-800 transition-colors"
                >
                  Apply Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-900 text-base font-medium rounded-full hover:border-gray-900 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/business/professional-1.jpg"
                alt="Business training"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">8-12</p>
              <p className="text-gray-600">Weeks</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">$0</p>
              <p className="text-gray-600">Tuition (if eligible)</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">$40K+</p>
              <p className="text-gray-600">Avg. Starting Salary</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">Flexible</p>
              <p className="text-gray-600">Schedule</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Available Programs
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program) => (
              <Link
                key={program.title}
                href={program.href}
                className="group p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:underline">
                    {program.title}
                  </h3>
                  <span className="text-sm text-gray-500">{program.duration}</span>
                </div>
                <p className="text-gray-600">{program.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What you'll learn
            </h2>
            <ul className="space-y-4 text-lg text-gray-600">
              <li>Tax law fundamentals and IRS regulations</li>
              <li>Tax preparation software (Drake, TaxSlayer)</li>
              <li>Bookkeeping and accounting basics</li>
              <li>QuickBooks certification</li>
              <li>Business communication and customer service</li>
              <li>Entrepreneurship and business planning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gray-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Start your business career
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Free training for eligible Indiana residents.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 text-base font-medium rounded-full hover:bg-gray-100 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </>
  );
}
