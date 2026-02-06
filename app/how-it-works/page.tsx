import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'How It Works | Elevate for Humanity',
  description:
    'Learn how Elevate for Humanity helps you get trained, certified, and hired.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/how-it-works',
  },
};

const steps = [
  {
    title: 'Submit Your Application',
    description: 'Complete our free online application in under 5 minutes. No fees, no obligations. We will review your information and contact you within 24-48 hours to discuss your eligibility for funded training programs including WIOA, Next Level Jobs, and employer-sponsored options.',
    image: '/images/success-new/success-1.jpg',
    href: '/apply',
    cta: 'Start Application',
  },
  {
    title: 'Meet With Your Advisor',
    description: 'Schedule a one-on-one consultation with a career advisor who will assess your goals, experience, and eligibility. We will help you choose the right training program and connect you with funding sources that cover tuition, books, and certification fees.',
    image: '/images/success-new/success-2.jpg',
    href: '/programs',
    cta: 'View Programs',
  },
  {
    title: 'Complete Your Training',
    description: 'Attend classes online or in-person at our Indianapolis training center. Our industry-certified instructors provide hands-on training with real equipment. Programs range from 2 weeks to 6 months depending on your career path.',
    image: '/images/success-new/success-3.jpg',
    href: '/programs',
    cta: 'Explore Training',
  },
  {
    title: 'Earn Credentials & Get Hired',
    description: 'Graduate with industry-recognized certifications that employers demand. Our career services team provides resume writing, interview coaching, and direct connections to hiring employers. 85% of our graduates find employment within 90 days.',
    image: '/images/success-new/success-4.jpg',
    href: '/career-services',
    cta: 'Career Services',
  },
];

const resources = [
  {
    title: 'WIOA Eligibility',
    description: 'Find out if you qualify for free training.',
    image: '/images/heroes-hq/funding-hero.jpg',
    href: '/wioa-eligibility',
  },
  {
    title: 'Funding Options',
    description: 'Learn about grants and payment options.',
    image: '/images/heroes-hq/career-services-hero.jpg',
    href: '/funding',
  },
  {
    title: 'Training Programs',
    description: 'Explore healthcare, trades, technology, and more.',
    image: '/images/heroes-hq/programs-hero.jpg',
    href: '/programs',
  },
  {
    title: 'FAQ',
    description: 'Get answers to common questions.',
    image: '/images/heroes-hq/contact-hero.jpg',
    href: '/faq',
  },
];

const programs = [
  {
    title: 'Healthcare',
    description: 'CNA, Medical Assistant, Phlebotomy',
    image: '/images/healthcare/hero-programs-healthcare.jpg',
    href: '/programs/healthcare',
  },
  {
    title: 'Skilled Trades',
    description: 'HVAC, Electrical, Welding, Plumbing',
    image: '/images/trades/hero-program-hvac.jpg',
    href: '/programs/skilled-trades',
  },
  {
    title: 'Technology',
    description: 'IT Support, Cybersecurity, Web Development',
    image: '/images/technology/hero-programs-technology.jpg',
    href: '/programs/technology',
  },
  {
    title: 'CDL Training',
    description: 'Commercial Driver License',
    image: '/images/trades/hero-program-cdl.jpg',
    href: '/programs/cdl-training',
  },
  {
    title: 'Barber Apprenticeship',
    description: 'USDOL Registered Program',
    image: '/images/beauty/program-barber-training.jpg',
    href: '/programs/barber-apprenticeship',
  },
  {
    title: 'Business',
    description: 'Tax Preparation, Entrepreneurship',
    image: '/images/heroes/hero-state-funding.jpg',
    href: '/programs/business',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'How It Works' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center">
        <Image
          src="/images/heroes-hq/how-it-works-hero.jpg"
          alt="Career training"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Your path to a new career in 4 simple steps</p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Your Path to a New Career
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            We make career training simple and accessible. No confusing paperwork, no hidden fees. 
            Here is exactly what happens when you start with Elevate for Humanity.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-56">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {item.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-40">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Training Programs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-52">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700"
            >
              Contact Us
            </Link>
          </div>
          <p className="text-blue-100 text-sm mt-4">
            After applying, a workforce advisor will confirm your eligibility and start date.
          </p>
        </div>
      </section>
    </div>
  );
}
