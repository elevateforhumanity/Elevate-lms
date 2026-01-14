import { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  DollarSign,
  FileCheck,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How Elevate Works | Workforce Coordination Hub',
  description:
    'Understand how Elevate for Humanity coordinates access to training, funding, and career opportunities without replacing local authority or ownership.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/how-it-works',
  },
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white text-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How Elevate Works
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            We coordinate access to training, funding, and career opportunities.
            <br />
            We don't replace schools, certify credentials, or control outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-block px-8 py-4 bg-white text-brand-blue-600 rounded-lg font-bold hover:bg-gray-50 transition-colors"
            >
              Apply Now
            </Link>
            <a
              href="tel:+13173143757"
              className="inline-block px-8 py-4 bg-brand-blue-700 text-white rounded-lg font-bold hover:bg-brand-blue-600 transition-colors"
            >
              Call (317) 314-3757
            </a>
          </div>
        </div>
      </section>

      {/* What We Are */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Elevate Is
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-green-200">
              <div className="w-12 h-12 bg-brand-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-brand-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Workforce Coordination Hub
              </h3>
              <p className="text-black">
                We connect people to training programs, funding sources, and
                career pathways across multiple jurisdictions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-green-200">
              <div className="w-12 h-12 bg-brand-green-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-brand-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-Tenant Platform</h3>
              <p className="text-black">
                Organizations license our platform to manage their own programs,
                students, and compliance requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-green-200">
              <div className="w-12 h-12 bg-brand-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-brand-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Flexible Enrollment</h3>
              <p className="text-black">
                Instant checkout for self-pay courses. Advisor-led process for funded programs (WIOA, WRG, JRI). No predatory enrollment, no false promises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Enrollment Paths */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Two Ways to Enroll
          </h2>
          <p className="text-center text-black mb-12 max-w-2xl mx-auto">
            Choose the path that works for you: instant enrollment for self-pay courses or advisor-guided enrollment for funded programs.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Instant Enrollment */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border-2 border-orange-300">
              <div className="inline-block px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-bold mb-4">
                ⚡ Instant Access
              </div>
              <h3 className="text-2xl font-bold mb-4">Self-Pay Courses</h3>
              <p className="text-black mb-6">
                Browse our course catalog, click "Enroll Now", complete secure checkout, and start learning immediately.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Instant access after payment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>No waiting for approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Secure payment via Stripe</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>30-day money-back guarantee</span>
                </li>
              </ul>
              <Link
                href="/courses/catalog"
                className="inline-block w-full text-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold transition-colors"
              >
                Browse Courses
              </Link>
            </div>

            {/* Advisor-Guided Enrollment */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-300">
              <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold mb-4">
                💯 100% Free
              </div>
              <h3 className="text-2xl font-bold mb-4">Funded Programs</h3>
              <p className="text-black mb-6">
                Apply for free training through WIOA, WRG, or JRI funding. An advisor will guide you through eligibility and enrollment.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>100% free with funding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Advisor reviews eligibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>We handle all paperwork</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>1-2 day response time</span>
                </li>
              </ul>
              <Link
                href="/apply"
                className="inline-block w-full text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors"
              >
                Apply for Free Training
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Step by Step */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Funded Program Process
          </h2>
          <p className="text-center text-black mb-12">
            For WIOA, WRG, and JRI funded programs
          </p>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  You Apply (No Payment Required)
                </h3>
                <p className="text-black mb-3">
                  Submit an application expressing interest in a program. This
                  is not enrollment. This is inquiry.
                </p>
                <p className="text-sm text-black">
                  <strong>What happens:</strong> Your information is reviewed by
                  an advisor within 1-2 business days.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Advisor Reviews Your Eligibility
                </h3>
                <p className="text-black mb-3">
                  An advisor contacts you to discuss program fit, funding
                  options (WIOA, WRG, JRI, apprenticeships), and next steps.
                </p>
                <p className="text-sm text-black">
                  <strong>What happens:</strong> We determine if you qualify for
                  free or subsidized training, or if self-pay is required.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Funding Is Coordinated (If Eligible)
                </h3>
                <p className="text-black mb-3">
                  If you qualify for workforce funding, we coordinate with the
                  appropriate agency (WorkOne, DOC, etc.) to secure approval.
                </p>
                <p className="text-sm text-black">
                  <strong>What happens:</strong> You are not charged until
                  funding is confirmed or you approve self-pay terms.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  You Are Enrolled in a Partner Program
                </h3>
                <p className="text-black mb-3">
                  Once approved, you are enrolled with an accredited training
                  provider (Milady, HSI, CareerSafe, etc.) or apprenticeship
                  sponsor.
                </p>
                <p className="text-sm text-black">
                  <strong>What happens:</strong> You receive access to course
                  materials, schedules, and support resources.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  You Complete Training & Earn Credentials
                </h3>
                <p className="text-black mb-3">
                  You complete coursework, log hours (if apprenticeship), and
                  meet all requirements set by the training provider and
                  certifying body.
                </p>
                <p className="text-sm text-black">
                  <strong>What happens:</strong> Credentials are issued by the
                  appropriate authority (state board, industry certification
                  body, etc.).
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  6
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  We Track Outcomes & Support Your Next Step
                </h3>
                <p className="text-black mb-3">
                  We report completion to funders, track employment outcomes,
                  and support your career progression.
                </p>
                <p className="text-sm text-black">
                  <strong>What happens:</strong> You remain connected to our
                  network for ongoing support and advancement opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Who We Serve</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <GraduationCap className="w-8 h-8 text-brand-blue-600 mb-3" />
              <h3 className="text-lg font-bold mb-2">Students</h3>
              <p className="text-sm text-black">
                People seeking training, credentials, and career pathways with
                funding support.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <Building2 className="w-8 h-8 text-brand-blue-600 mb-3" />
              <h3 className="text-lg font-bold mb-2">Workforce Boards</h3>
              <p className="text-sm text-black">
                Agencies managing WIOA, WRG, JRI, and other workforce
                development programs.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <Users className="w-8 h-8 text-brand-blue-600 mb-3" />
              <h3 className="text-lg font-bold mb-2">Training Providers</h3>
              <p className="text-sm text-black">
                Accredited schools, certification bodies, and apprenticeship
                sponsors.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
              <Briefcase className="w-8 h-8 text-brand-blue-600 mb-3" />
              <h3 className="text-lg font-bold mb-2">Employers</h3>
              <p className="text-sm text-black">
                Companies seeking trained workers and apprenticeship
                partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Operating Principles
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-brand-blue-600">
              <h3 className="text-xl font-bold mb-2">
                We Coordinate, We Don't Control
              </h3>
              <p className="text-black">
                We connect people to resources. We don't own credentials,
                replace authorities, or sell outcomes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-brand-blue-600">
              <h3 className="text-xl font-bold mb-2">Interest ≠ Obligation</h3>
              <p className="text-black">
                Applying does not create debt, obligation, or enrollment.
                Advisors review every case before any commitment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-brand-blue-600">
              <h3 className="text-xl font-bold mb-2">
                Some Programs Are Free, Some Are Not
              </h3>
              <p className="text-black">
                Programs funded by WIOA, WRG, JRI, or apprenticeships are free to eligible students. 
                Other programs require self-pay or alternative funding. Your advisor will explain all costs upfront.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-brand-blue-600">
              <h3 className="text-xl font-bold mb-2">Platform ≠ Provider</h3>
              <p className="text-black">
                We provide the coordination platform. Training delivery,
                certification, and employment are handled by partners and
                authorities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-brand-blue-600">
              <h3 className="text-xl font-bold mb-2">
                Multi-Jurisdiction by Design
              </h3>
              <p className="text-black">
                We respect state, federal, and local authority. Our platform
                adapts to each jurisdiction's rules and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-600 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Apply now or call to speak with an advisor about your options.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/apply"
              className="inline-block px-8 py-4 bg-white text-brand-blue-600 rounded-lg font-bold hover:bg-gray-50 transition-colors"
            >
              Apply Now
            </Link>
            <a
              href="tel:+13173143757"
              className="inline-block px-8 py-4 bg-brand-blue-700 text-white rounded-lg font-bold hover:bg-brand-blue-600 transition-colors border-2 border-white"
            >
              Call (317) 314-3757
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start gap-3">
              <Phone className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold mb-1">Phone</div>
                <a
                  href="tel:+13173143757"
                  className="text-blue-100 hover:text-white"
                >
                  (317) 314-3757
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold mb-1">Email</div>
                <a
                  href="mailto:elevate4humanityedu@gmail.com"
                  className="text-blue-100 hover:text-white"
                >
                  elevate4humanityedu@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold mb-1">Address</div>
                <div className="text-blue-100">
                  8888 Keystone Xing, Suite 1300
                  <br />
                  Indianapolis, IN 46240
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
