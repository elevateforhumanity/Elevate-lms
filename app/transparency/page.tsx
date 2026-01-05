import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield,
  DollarSign,
  Users,
  TrendingUp,
  FileText,
  Award,
  CheckCircle2,
  ExternalLink,
  Download,
  BarChart3,
  PieChart,
  Target,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Transparency & Accountability | Elevate for Humanity',
  description:
    'View our financial reports, program outcomes, and organizational transparency. See how donations are used and the impact we create.',
  keywords:
    'transparency, accountability, financial reports, nonprofit, 501c3, impact metrics',
  alternates: {
    canonical: 'https://elevateforhumanity.org/transparency',
  },
};

export default function TransparencyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/heroes/hero-homepage.jpg"
            alt="Transparency"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-semibold">501(c)(3) Nonprofit</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transparency & Accountability
            </h1>
            <p className="text-base md:text-lg text-blue-50 mb-8 leading-relaxed">
              We believe in complete transparency. See exactly how we use
              resources and the impact we create in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              2024 Impact at a Glance
            </h2>
            <p className="text-lg text-slate-600">Real numbers, real impact</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 text-center border border-teal-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-full mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-teal-900 mb-2">523</div>
              <div className="text-slate-700 font-semibold">
                Students Trained
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 text-center border border-blue-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue-600 rounded-full mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-blue-900 mb-2">87%</div>
              <div className="text-slate-700 font-semibold">
                Job Placement Rate
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 text-center border border-green-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green-600 rounded-full mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-green-900 mb-2">
                $2.1M
              </div>
              <div className="text-slate-700 font-semibold">Total Budget</div>
            </div>

            <div className="bg-white rounded-xl p-8 text-center border border-purple-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-purple-900 mb-2">
                $45K
              </div>
              <div className="text-slate-700 font-semibold">
                Avg. Starting Salary
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Breakdown */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              How We Use Your Donations
            </h2>
            <p className="text-lg text-slate-600">
              Every dollar is invested in our mission
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Pie Chart Visual */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-lg md:text-lg font-bold text-slate-900 mb-8 text-center">
                2024 Expense Allocation
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900">
                      Program Services
                    </span>
                    <span className="text-2xl font-bold text-teal-600">
                      82%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div
                      className="bg-teal-600 h-4 rounded-full"
                      style={{ width: '82%' }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    Direct training, certifications, and job placement services
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900">
                      Administrative
                    </span>
                    <span className="text-2xl font-bold text-brand-blue-600">
                      12%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div
                      className="bg-brand-blue-600 h-4 rounded-full"
                      style={{ width: '12%' }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    Operations, technology, and compliance
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900">
                      Fundraising
                    </span>
                    <span className="text-2xl font-bold text-purple-600">
                      6%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div
                      className="bg-purple-600 h-4 rounded-full"
                      style={{ width: '6%' }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    Donor relations and development activities
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-6 h-6 text-brand-green-600" />
                  <span className="font-bold text-green-900">
                    Industry Leading Efficiency
                  </span>
                </div>
                <p className="text-sm text-slate-700">
                  82% program spending exceeds the Charity Navigator standard of
                  75%
                </p>
              </div>
            </div>

            {/* Revenue Sources */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-lg md:text-lg font-bold text-slate-900 mb-8 text-center">
                2024 Revenue Sources
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900">
                      Government Grants
                    </span>
                    <span className="text-2xl font-bold text-brand-blue-600">
                      45%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div
                      className="bg-brand-blue-600 h-4 rounded-full"
                      style={{ width: '45%' }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    WIOA, WRG, and federal workforce funding
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900">
                      Individual Donations
                    </span>
                    <span className="text-2xl font-bold text-teal-600">
                      30%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div
                      className="bg-teal-600 h-4 rounded-full"
                      style={{ width: '30%' }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    Generous support from community members
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900">
                      Corporate Partnerships
                    </span>
                    <span className="text-2xl font-bold text-purple-600">
                      20%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div
                      className="bg-purple-600 h-4 rounded-full"
                      style={{ width: '20%' }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    Employer sponsorships and partnerships
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-900">
                      Foundation Grants
                    </span>
                    <span className="text-2xl font-bold text-brand-orange-600">
                      5%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div
                      className="bg-brand-orange-600 h-4 rounded-full"
                      style={{ width: '5%' }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    Private foundation support
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-6 h-6 text-brand-blue-600" />
                  <span className="font-bold text-blue-900">
                    Diversified Funding
                  </span>
                </div>
                <p className="text-sm text-slate-700">
                  Multiple revenue streams ensure program stability and
                  sustainability
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Outcomes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Program Outcomes & Impact
            </h2>
            <p className="text-lg text-slate-600">Measuring what matters</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <Award className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Completion Rate
                </h3>
                <div className="text-5xl font-bold text-teal-600 mb-2">95%</div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>497 of 523 students completed training</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Industry-leading retention rate</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Comprehensive support services</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Users className="w-8 h-8 text-brand-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Job Placement
                </h3>
                <div className="text-5xl font-bold text-brand-blue-600 mb-2">
                  87%
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span>432 graduates employed within 90 days</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Average starting salary: $45,000</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Full-time positions with benefits</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green-100 rounded-full mb-4">
                  <TrendingUp className="w-8 h-8 text-brand-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Wage Growth
                </h3>
                <div className="text-5xl font-bold text-brand-green-600 mb-2">
                  215%
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Average income increase from $14K to $45K</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Breaking the cycle of poverty</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                  <span>Long-term economic mobility</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Documents & Reports */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Official Documents & Reports
            </h2>
            <p className="text-lg text-slate-600">
              Download our complete financial and impact reports
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '2024 Annual Report',
                desc: 'Complete impact and financial report',
                size: '6.4 MB',
                year: '2024',
              },
              {
                title: '2024 IRS Form 990',
                desc: 'Tax filing and financial disclosure',
                size: '2.1 MB',
                year: '2024',
              },
              {
                title: '2024 Audited Financials',
                desc: 'Independent audit by certified CPA',
                size: '3.8 MB',
                year: '2024',
              },
              {
                title: '2023 Annual Report',
                desc: 'Previous year impact report',
                size: '5.9 MB',
                year: '2023',
              },
              {
                title: '2023 IRS Form 990',
                desc: 'Previous year tax filing',
                size: '1.9 MB',
                year: '2023',
              },
              {
                title: 'Board of Directors',
                desc: 'Current board members and bios',
                size: '1.2 MB',
                year: '2024',
              },
            ].map((doc, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-slate-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-brand-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 mb-1">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">{doc.desc}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="px-2 py-1 bg-slate-100 rounded">
                        PDF
                      </span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
                <a
                  href={`/downloads/${doc.title.toLowerCase().replace(/\s+/g, '-')}.pdf`}
                  download
                  className="flex items-center justify-center gap-2 w-full bg-brand-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-brand-blue-700 transition"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Third-Party Ratings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Third-Party Ratings & Certifications
            </h2>
            <p className="text-lg text-slate-600">
              Independently verified excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center border-2 border-blue-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-blue-600 rounded-full mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Charity Navigator
              </h3>
              <div className="text-4xl font-bold text-brand-blue-600 mb-2">
                4 Stars
              </div>
              <p className="text-sm text-slate-700 mb-4">
                Highest rating for accountability and transparency
              </p>
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-brand-blue-600 font-semibold hover:text-brand-blue-700"
              >
                View Profile
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-xl p-8 text-center border-2 border-green-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-green-600 rounded-full mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                GuideStar
              </h3>
              <div className="text-4xl font-bold text-brand-green-600 mb-2">
                Platinum
              </div>
              <p className="text-sm text-slate-700 mb-4">
                Seal of transparency from Candid
              </p>
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-brand-green-600 font-semibold hover:text-green-700"
              >
                View Profile
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-xl p-8 text-center border-2 border-purple-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-full mb-4">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                BBB Accredited
              </h3>
              <div className="text-4xl font-bold text-purple-600 mb-2">A+</div>
              <p className="text-sm text-slate-700 mb-4">
                Better Business Bureau accreditation
              </p>
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700"
              >
                View Profile
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Questions About Our Finances or Impact?
          </h2>
          <p className="text-base md:text-lg text-teal-50 mb-8">
            We're committed to complete transparency. Contact us for any
            additional information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-50 transition shadow-xl"
            >
              Contact Us
            </Link>
            <Link
              href="/annual-report"
              className="inline-flex items-center justify-center gap-2 bg-teal-500/30 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-teal-500/40 transition border-2 border-white/30"
            >
              <Download className="w-5 h-5" />
              Download Full Report
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
