'use client';

import { useEffect } from 'react';
import { Metadata } from 'next';
import ModernLandingHero from '@/components/landing/ModernLandingHero';

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export default function Apply() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'apply_view');
    }
  }, []);

  return (
    <>
      <ModernLandingHero
        badge="⚡ 89 Seats Left - Feb 3rd Start Date"
        headline="Your Application Takes"
        accentText="10 Minutes"
        subheadline="Apply Now. Hear Back in 2-3 Days. Start Training Feb 3rd."
        description="847 people applied last year. 753 got accepted. 89% got jobs. Average time from application to first paycheck: 67 days. Your turn starts with this 10-minute application."
        imageSrc="/images/efh/hero/hero-main.jpg"
        imageAlt="Apply Now"
        primaryCTA={{ text: "Start Application Below", href: "#application" }}
        secondaryCTA={{ text: "Questions? Call Us", href: "tel:317-314-3757" }}
        features={[
          "10-minute application • 2-3 day response time",
          "89 seats left for Feb 3rd start • Application deadline: Jan 27",
          "753 accepted last year • 89% got jobs after graduation"
        ]}
        imageOnRight={true}
      />
    <main id="application" className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">
        Start Your Application
      </h1>
      <p className="my-4 text-slate-700">
        10–15 minutes. Response within 2–3 business days.
      </p>

      <form
        method="POST"
        action="/api/apply"
        className="space-y-4 bg-white border border-slate-200 rounded-lg p-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            required
            id="name"
            name="name"
            placeholder="Full name"
            className="w-full min-h-[44px] px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Email <span className="text-red-600">*</span>
          </label>
          <input
            required
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="w-full min-h-[44px] px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Phone <span className="text-red-600">*</span>
          </label>
          <input
            required
            id="phone"
            name="phone"
            placeholder="Phone"
            className="w-full min-h-[44px] px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="program"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Program <span className="text-red-600">*</span>
          </label>
          <select
            required
            id="program"
            name="program"
            className="w-full min-h-[44px] px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select program...</option>
            <option>CNA</option>
            <option>Barber Apprenticeship</option>
            <option>HVAC</option>
            <option>IT Support</option>
            <option>Not Sure</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="funding"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Funding <span className="text-red-600">*</span>
          </label>
          <select
            required
            id="funding"
            name="funding"
            className="w-full min-h-[44px] px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select funding...</option>
            <option>WIOA / Next Level Jobs</option>
            <option>Employer Sponsored</option>
            <option>Self Pay</option>
            <option>Not Sure</option>
          </select>
        </div>

        <label className="text-sm flex gap-2 items-center">
          <input type="checkbox" required className="w-4 h-4" />
          <span>Consent to contact</span>
        </label>

        <button
          type="submit"
          onClick={() => {
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'apply_submit');
            }
          }}
          className="w-full min-h-[44px] bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors font-semibold"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

function ApplyLandingPageOld() {
  const paths = [
    {
      role: 'student',
      title: 'Student Programs',
      description:
        'Enroll in workforce training, apprenticeships, and career development programs.',
      icon: GraduationCap,
      href: '/apply/student',
      color: 'emerald',
    },
    {
      role: 'program_holder',
      title: 'Program Holder Partnership',
      description:
        'Partner with us to offer training programs to your community or organization.',
      icon: Building2,
      href: '/apply/program-holder',
      color: 'blue',
    },
    {
      role: 'employer',
      title: 'Employer Hiring',
      description:
        'Post jobs, find qualified candidates, and build your workforce.',
      icon: Briefcase,
      href: '/apply/employer',
      color: 'orange',
    },
    {
      role: 'staff',
      title: 'Staff / Instructor',
      description:
        'Join our team as staff or instructor to support student success.',
      icon: Users,
      href: '/apply/staff',
      color: 'purple',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <img
          src="/images/efh/hero/hero-main.jpg"
          alt="Apply"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white uppercase tracking-wide">
              START YOUR JOURNEY
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-8">
              Choose Your Path to Success with Elevate for Humanity
            </p>
          </div>
        </div>
      </section>

      {/* Path Selection */}
      <section className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {paths.map((path) => {
            const Icon = path.icon;
            return (
              <Link
                key={path.role}
                href={path.href}
                className="group block p-8 bg-white border-2 border-slate-200 rounded-lg hover:border-slate-400 hover:shadow-lg transition-all"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-lg bg-${path.color}-100 text-${path.color}-700 mb-4`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-black mb-2 group-hover:text-black">
                  {path.title}
                </h2>
                <p className="text-black mb-4">{path.description}</p>
                <div className="flex items-center text-sm font-semibold text-black group-hover:text-black">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Help Section */}
      <section className="max-w-6xl mx-auto px-4 py-8 mb-12">
        <div className="bg-slate-100 border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            Need Help Choosing?
          </h3>
          <p className="text-black mb-4">
            Not sure which path is right for you? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:3173143757"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Call Us: 317-314-3757
            </a>
            <a
              href="mailto:info@elevateforhumanity.institute"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-slate-300 text-black font-semibold rounded-lg hover:border-slate-400 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
