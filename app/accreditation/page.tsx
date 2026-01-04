import { Metadata } from 'next';

import Link from 'next/link';

import Image from 'next/image';
import {
  BarChart,
  Briefcase,
  CheckCircle,
  Target,
  TrendingUp,
} from 'lucide-react';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elevateforhumanity.org/accreditation',
  },
  title:
    'Accreditation & Approvals | DOL, DWD, DOE Approved Training Provider | Elevate For Humanity',
  description:
    'Officially approved by U.S. Department of Labor (DOL), Indiana Department of Workforce Development (DWD), Indiana Department of Education (DOE), WIOA eligible, WRG approved, JRI partner. Registered Apprenticeship Sponsor RAPIDS ID: 2025-IN-132301. INTraining Location ID: 10004621.',
  keywords:
    'DOL approved training, DWD approved, DOE approved, WIOA eligible training provider, WRG approved programs, registered apprenticeship sponsor, Indiana workforce development, accredited training Indiana, state approved training, federal approved training',
};

export default function AccreditationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/facilities-new/facility-3.jpg"
          alt="Accredited Training Facility"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold">✓ DOL Approved</span>
            <span className="text-white/50">|</span>
            <span className="text-sm font-semibold">✓ DWD Approved</span>
            <span className="text-white/50">|</span>
            <span className="text-sm font-semibold">✓ DOE Approved</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Officially Approved. Fully Accredited.
          </h1>
          <p className="text-base md:text-lg mb-8">
            Your training is legitimate, recognized by employers, and approved
            by state and federal agencies.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
              WIOA Eligible
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
              WRG Approved
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
              JRI Partner
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
              Registered Apprenticeship Sponsor
            </span>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Why Accreditation Matters
          </h2>

          <p className="text-base md:text-lg text-slate-700 mb-6 leading-relaxed">
            Anyone can call themselves a "training provider." But not everyone
            is officially approved by the government.
          </p>

          <p className="text-lg text-slate-600 mb-6">
            We're not just a training school—we're an{' '}
            <strong>officially approved provider</strong> by Indiana's
            Department of Workforce Development, the U.S. Department of Labor,
            and state licensing boards.
          </p>

          <p className="text-lg text-slate-600 mb-6">That means:</p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-brand-green-600 font-bold text-base">
                ✓
              </span>
              <span className="text-slate-700">
                Your training is <strong>recognized by employers</strong>{' '}
                nationwide
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-green-600 font-bold text-base">
                ✓
              </span>
              <span className="text-slate-700">
                You can get <strong>government funding</strong> (WRG, WIOA) to
                pay for it
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-green-600 font-bold text-base">
                ✓
              </span>
              <span className="text-slate-700">
                Your certifications are <strong>valid and transferable</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-green-600 font-bold text-base">
                ✓
              </span>
              <span className="text-slate-700">
                We meet <strong>federal and state standards</strong> for quality
                training
              </span>
            </li>
          </ul>

          <p className="text-lg text-slate-600">
            Bottom line: When you train with us, you're getting real credentials
            that employers respect.
          </p>
        </div>
      </section>

      {/* Official Approvals */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Our Official Approvals
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Federal */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🇺🇸</span>
              </div>
              <h3 className="text-lg md:text-lg font-bold mb-4">
                Federal Approvals
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900">
                    U.S. Department of Labor
                  </p>
                  <p className="text-sm text-slate-600">
                    Registered Apprenticeship Sponsor
                  </p>
                  <p className="text-xs text-slate-500">
                    RAPIDS ID: 2025-IN-132301
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    WIOA Eligible Training Provider
                  </p>
                  <p className="text-sm text-slate-600">
                    Approved for federal workforce funding
                  </p>
                </div>
              </div>
            </div>

            {/* State */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🏛️</span>
              </div>
              <h3 className="text-lg md:text-lg font-bold mb-4">
                State Approvals
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900">
                    Indiana Department of Workforce Development
                  </p>
                  <p className="text-sm text-slate-600">
                    INTraining Program Location ID: 10004621
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Workforce Ready Grant (WRG) Approved
                  </p>
                  <p className="text-sm text-slate-600">
                    All programs eligible for free state funding
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Indiana State Board of Cosmetology
                  </p>
                  <p className="text-sm text-slate-600">
                    Approved school for beauty programs
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Indiana State Board of Barber Examiners
                  </p>
                  <p className="text-sm text-slate-600">
                    Approved for barber apprenticeships
                  </p>
                </div>
              </div>
            </div>

            {/* Partnerships */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-16 h-16 bg-brand-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-lg md:text-lg font-bold mb-4">
                Official Partnerships
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900">
                    Justice Reinvestment Initiative (JRI)
                  </p>
                  <p className="text-sm text-slate-600">
                    Partner for justice-involved individuals
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-900">WorkOne Centers</p>
                  <p className="text-sm text-slate-600">
                    Approved WIOA training provider
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-900">EmployIndy</p>
                  <p className="text-sm text-slate-600">
                    Workforce development partner
                  </p>
                </div>
              </div>
            </div>

            {/* Quality Standards */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-lg md:text-lg font-bold mb-4">
                Quality Standards
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="font-bold text-slate-900">
                    Licensed Instructors
                  </p>
                  <p className="text-sm text-slate-600">
                    All instructors hold current state licenses and industry
                    certifications
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Industry-Recognized Certifications
                  </p>
                  <p className="text-sm text-slate-600">
                    Credentials accepted by employers nationwide
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-900">ADA Compliant</p>
                  <p className="text-sm text-slate-600">
                    Accessible facilities and accommodations
                  </p>
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Equal Opportunity Provider
                  </p>
                  <p className="text-sm text-slate-600">
                    No discrimination based on race, gender, age, or background
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What This Means for You */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            What This Means for You
          </h2>

          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2 text-green-900">
                ✓ Your Training is Legitimate
              </h3>
              <p className="text-slate-700">
                We're not a diploma mill. We're officially approved by
                government agencies. Your certifications are real and
                recognized.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2 text-blue-900">
                ✓ You Can Get Free Funding
              </h3>
              <p className="text-slate-700">
                Because we're WRG and WIOA approved, you can get 100% free
                training through government programs. No tuition. No debt.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2 text-orange-900">
                ✓ Employers Trust Our Graduates
              </h3>
              <p className="text-slate-700">
                When you graduate from an approved program, employers know
                you've been trained to industry standards. It opens doors.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2 text-purple-900">
                ✓ Your Credentials Transfer
              </h3>
              <p className="text-slate-700">
                If you move to another state, your certifications are still
                valid. Federal and state approvals mean nationwide recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Verify Our Credentials
          </h2>

          <p className="text-lg text-slate-600 mb-8">
            Don't just take our word for it. You can verify our approvals
            directly with government agencies:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 text-left">
              <p className="font-bold mb-2">U.S. Department of Labor</p>
              <p className="text-sm text-slate-600 mb-2">
                Search RAPIDS ID: 2025-IN-132301
              </p>
              <a
                href="https://www.apprenticeship.gov/apprenticeship-finder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue-600 underline text-sm"
              >
                apprenticeship.gov/apprenticeship-finder
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 text-left">
              <p className="font-bold mb-2">Indiana DWD</p>
              <p className="text-sm text-slate-600 mb-2">
                INTraining Location ID: 10004621
              </p>
              <a
                href="https://intraining.dwd.in.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue-600 underline text-sm"
              >
                intraining.dwd.in.gov
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* For Donors, Grants, and Philanthropic Organizations */}
      <section className="py-16 bg-white text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              For Donors, Grant Boards & Philanthropic Organizations
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Partner with a fully compliant, government-approved training
              provider with proven outcomes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Our Credentials</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold">U.S. Department of Labor (DOL)</p>
                    <p className="text-sm text-purple-100">
                      Registered Apprenticeship Sponsor
                    </p>
                    <p className="text-xs text-purple-200">
                      RAPIDS ID: 2025-IN-132301
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold">
                      Indiana Department of Workforce Development (DWD)
                    </p>
                    <p className="text-sm text-purple-100">
                      Approved Training Provider
                    </p>
                    <p className="text-xs text-purple-200">
                      INTraining Location ID: 10004621
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold">
                      Indiana Department of Education (DOE)
                    </p>
                    <p className="text-sm text-purple-100">
                      Approved Training Provider
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold">WIOA Eligible Training Provider</p>
                    <p className="text-sm text-purple-100">
                      Federal workforce funding approved
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold">
                      Workforce Ready Grant (WRG) Approved
                    </p>
                    <p className="text-sm text-purple-100">
                      All programs eligible for state funding
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold">
                      Justice Reinvestment Initiative (JRI) Partner
                    </p>
                    <p className="text-sm text-purple-100">
                      Official partner for justice-involved individuals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-bold">State Licensing Board Approvals</p>
                    <p className="text-sm text-purple-100">
                      Cosmetology, Barber, Healthcare
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Why Partner With Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    <BarChart className="w-5 h-5 inline-block" />
                  </span>
                  <div>
                    <p className="font-bold">Measurable Outcomes</p>
                    <p className="text-sm text-purple-100">
                      Track completion rates, job placements, and wage gains
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    <Target className="w-5 h-5 inline-block" />
                  </span>
                  <div>
                    <p className="font-bold">Targeted Impact</p>
                    <p className="text-sm text-purple-100">
                      Serving justice-involved, low-income, and barrier-facing
                      populations
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    <CheckCircle className="w-5 h-5 inline-block" />
                  </span>
                  <div>
                    <p className="font-bold">Full Compliance</p>
                    <p className="text-sm text-purple-100">
                      Meet all federal and state reporting requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🤝</span>
                  <div>
                    <p className="font-bold">Proven Partnerships</p>
                    <p className="text-sm text-purple-100">
                      WorkOne, EmployIndy, community corrections, nonprofits
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    <Briefcase className="w-5 h-5 inline-block" />
                  </span>
                  <div>
                    <p className="font-bold">Employer Connections</p>
                    <p className="text-sm text-purple-100">
                      Direct job placement with hiring partners
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    <TrendingUp className="w-5 h-5 inline-block" />
                  </span>
                  <div>
                    <p className="font-bold">Transparent Reporting</p>
                    <p className="text-sm text-purple-100">
                      Regular updates on program outcomes and impact
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 text-gray-900">
            <h3 className="text-2xl font-bold mb-4 text-center">Our Impact</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  500+
                </div>
                <div className="text-sm text-gray-600">Students Trained</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  85%
                </div>
                <div className="text-sm text-gray-600">Job Placement Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  $18+
                </div>
                <div className="text-sm text-gray-600">
                  Average Starting Wage
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  15+
                </div>
                <div className="text-sm text-gray-600">Career Pathways</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg mb-4">
              Interested in funding workforce development that creates real
              change?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition text-lg"
              >
                Request Partnership Information
              </Link>
              <a
                href="mailto:info@elevateforhumanity.org"
                className="inline-flex px-8 py-4 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition text-lg"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Approved Training?
          </h2>
          <p className="text-base md:text-lg mb-8">
            Get certified with a program employers trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-block px-10 py-5 bg-white text-brand-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all text-lg shadow-xl"
            >
              Apply Now
            </Link>
            <a
              href="https://www.indianacareerconnect.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition-all text-lg shadow-xl"
            >
              Schedule at IndianaCareerConnect.com
            </a>
          </div>
          <p className="mt-6 text-slate-600">
            Call{' '}
            <a href="tel:3173143757" className="font-bold underline">
              317-314-3757
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
