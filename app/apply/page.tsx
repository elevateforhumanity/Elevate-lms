// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import ModernLandingHero from '@/components/landing/ModernLandingHero';
import { GraduationCap, Building2, Briefcase, Users } from 'lucide-react';

export default function Apply() {
  const searchParams = useSearchParams();
  const [selectedProgram, setSelectedProgram] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const programParam = searchParams.get('program');
    if (programParam) {
      const programMap: Record<string, string> = {
        'barber-apprenticeship': 'Barber Apprenticeship',
        'hvac-technician': 'HVAC Technician',
        'cna-certification': 'CNA (Certified Nursing Assistant)',
      };
      setSelectedProgram(programMap[programParam] || '');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/apply/success';
        }, 1000);
      } else {
        setError(result.error || 'Application failed. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again or call 317-314-3757.');
      setLoading(false);
    }
  };

  return (
    <>
      <ModernLandingHero
        badge="⚡ Limited Seats Available"
        headline="Start Your Career"
        accentText="In 10 Minutes"
        subheadline="Quick application. Fast response. Real results."
        description="Last year, 753 students were accepted and 89% got jobs after graduation. Average time from application to first paycheck: 67 days."
        imageSrc="/hero-images/apply-hero.jpg"
        imageAlt="Apply Now"
        primaryCTA={{ text: "Start Application", href: "#application" }}
        secondaryCTA={{ text: "Questions? Call Us", href: "tel:317-314-3757" }}
        features={[
          "10-minute application with 2-3 day response",
          "100% free training through WIOA and state grants",
          "Job placement support and career counseling included"
        ]}
        imageOnRight={true}
      />
    <section className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-black mb-4">
        Start Your Application
      </h1>
      <p className="my-4 text-black">
        10–15 minutes. Response within 2–3 business days.
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
          <p className="text-red-800 font-semibold">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
          <p className="text-green-800 font-semibold">✓ Application submitted successfully! Redirecting...</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white border border-slate-200 rounded-lg p-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-black mb-2"
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
            className="block text-sm font-medium text-black mb-2"
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
            className="block text-sm font-medium text-black mb-2"
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
            className="block text-sm font-medium text-black mb-2"
          >
            Program <span className="text-red-600">*</span>
          </label>
          <select
            required
            id="program"
            name="program"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="w-full min-h-[44px] px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select program...</option>
            <optgroup label="Healthcare">
              <option value="CNA (Certified Nursing Assistant)">CNA (Certified Nursing Assistant)</option>
              <option value="Medical Assistant">Medical Assistant</option>
              <option value="Home Health Aide">Home Health Aide</option>
              <option value="Phlebotomy">Phlebotomy</option>
            </optgroup>
            <optgroup label="Skilled Trades">
              <option value="HVAC Technician">HVAC Technician</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Building Maintenance">Building Maintenance</option>
              <option value="Construction">Construction</option>
            </optgroup>
            <optgroup label="Barber & Beauty">
              <option value="Barber Apprenticeship">Barber Apprenticeship</option>
              <option value="Cosmetology">Cosmetology</option>
              <option value="Esthetics">Esthetics</option>
            </optgroup>
            <optgroup label="Technology">
              <option value="IT Support">IT Support</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Web Development">Web Development</option>
            </optgroup>
            <optgroup label="Business">
              <option value="Accounting">Accounting</option>
              <option value="Business Management">Business Management</option>
              <option value="Entrepreneurship">Entrepreneurship</option>
            </optgroup>
            <optgroup label="Transportation">
              <option value="CDL (Commercial Driver License)">CDL (Commercial Driver License)</option>
            </optgroup>
            <option value="Not Sure - Help Me Choose">Not Sure - Help Me Choose</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="funding"
            className="block text-sm font-medium text-black mb-2"
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
            <option value="WIOA">WIOA / Next Level Jobs</option>
            <option value="Employer Sponsored">Employer Sponsored</option>
            <option value="Self Pay">Self Pay</option>
            <option value="Not Sure">Not Sure</option>
          </select>
        </div>

        <label className="text-sm flex gap-2 items-center">
          <input type="checkbox" required className="w-4 h-4" />
          <span>Consent to contact</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full min-h-[44px] bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </section>
    </>
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
      <main id="main-content">
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <Image
          src="/images/og-default.jpg"
          alt="Apply to training programs"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={85}
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
              href="mailto:info@elevateforhumanity.org"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-slate-300 text-black font-semibold rounded-lg hover:border-slate-400 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}
