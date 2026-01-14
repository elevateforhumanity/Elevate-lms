import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  TrendingUp,
  FileText,
  BarChart3,
  Shield,
  CheckCircle,
  ArrowRight,
  Target,
  DollarSign,
  Award,
  Eye,
  Clock,
  Briefcase,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/workforce-board',
  },
  title:
    'Workforce Board Portal - Program Oversight & Performance Tracking | Elevate For Humanity',
  description:
    'Comprehensive workforce board portal for program oversight, performance metrics, compliance monitoring, and strategic planning. Real-time data and reporting.',
};

export default function WorkforceBoardPage() {
  const features = [
    {
      icon: BarChart3,
      title: 'Performance Dashboards',
      description:
        'Real-time metrics on enrollment, completion, and employment outcomes',
    },
    {
      icon: FileText,
      title: 'Compliance Reporting',
      description:
        'Automated WIOA, DOL, and state compliance reports with audit trails',
    },
    {
      icon: Users,
      title: 'Participant Tracking',
      description:
        'Monitor participant progress, services, and outcomes across all programs',
    },
    {
      icon: DollarSign,
      title: 'Budget Oversight',
      description:
        'Track spending, allocations, and financial performance by program',
    },
    {
      icon: Target,
      title: 'Goal Monitoring',
      description: 'Track progress toward performance goals and benchmarks',
    },
    {
      icon: Shield,
      title: 'Audit Readiness',
      description: 'Maintain audit-ready documentation and compliance records',
    },
  ];

  const benefits = [
    {
      icon: Eye,
      title: 'Complete Visibility',
      description: 'See all programs, participants, and outcomes in one place',
    },
    {
      icon: Clock,
      title: 'Real-Time Data',
      description: 'Access up-to-date information without waiting for reports',
    },
    {
      icon: CheckCircle,
      title: 'Ensure Compliance',
      description:
        'Stay compliant with federal and state workforce requirements',
    },
    {
      icon: TrendingUp,
      title: 'Data-Driven Decisions',
      description: 'Make informed decisions based on performance analytics',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Logo */}
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={200}
                height={80}
                className="brightness-0 invert"
              />
            </div>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm font-bold">
                For Workforce Development Boards
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Workforce Board Portal
              <br />
              <span className="text-blue-300">Oversight Made Simple</span>
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed font-medium">
              Monitor program performance, ensure compliance, and make
              data-driven decisions with real-time workforce development
              analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/workforce-board/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition shadow-2xl hover:scale-105"
              >
                Access Board Portal
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                Request Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              Everything You Need for Oversight
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Comprehensive tools for monitoring workforce development programs
              and ensuring accountability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-900 hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-blue-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-black leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              Why Workforce Boards Choose Us
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Built specifically for workforce development board oversight and
              accountability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-black">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What You Can Monitor */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              What You Can Monitor
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-start gap-4 bg-white border-2 border-gray-200 rounded-xl p-6">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Program Performance Metrics
                </h3>
                <p className="text-black">
                  Track enrollment, completion rates, credential attainment, and
                  employment outcomes across all programs
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white border-2 border-gray-200 rounded-xl p-6">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Participant Demographics & Services
                </h3>
                <p className="text-black">
                  Monitor participant characteristics, services received, and
                  barrier removal activities
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white border-2 border-gray-200 rounded-xl p-6">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Financial Performance
                </h3>
                <p className="text-black">
                  Track budget utilization, spending by program, and cost per
                  participant outcomes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white border-2 border-gray-200 rounded-xl p-6">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Compliance Status
                </h3>
                <p className="text-black">
                  Monitor WIOA compliance, eligibility documentation, and audit
                  readiness across all programs
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white border-2 border-gray-200 rounded-xl p-6">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Provider Performance
                </h3>
                <p className="text-black">
                  Evaluate training provider performance, participant
                  satisfaction, and outcome achievement
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white border-2 border-gray-200 rounded-xl p-6">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Labor Market Alignment
                </h3>
                <p className="text-black">
                  Track how training programs align with local labor market
                  demands and in-demand occupations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Detail */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              Portal Features
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Comprehensive tools designed specifically for workforce board
              oversight
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <BarChart3 className="w-12 h-12 text-blue-900 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">
                Interactive Dashboards
              </h3>
              <ul className="space-y-3 text-black">
                <li>• Real-time enrollment and completion metrics</li>
                <li>• Employment outcome tracking</li>
                <li>• Credential attainment rates</li>
                <li>• Program performance comparisons</li>
                <li>• Customizable date ranges and filters</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <FileText className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">
                Automated Reporting
              </h3>
              <ul className="space-y-3 text-black">
                <li>• WIOA quarterly reports</li>
                <li>• DOL compliance reports</li>
                <li>• State-specific reporting</li>
                <li>• Custom report builder</li>
                <li>• Export to Excel, PDF, CSV</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">
                Participant Management
              </h3>
              <ul className="space-y-3 text-black">
                <li>• Individual participant records</li>
                <li>• Service tracking and documentation</li>
                <li>• Eligibility verification status</li>
                <li>• Follow-up and outcome tracking</li>
                <li>• Case notes and activity logs</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <DollarSign className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">
                Financial Oversight
              </h3>
              <ul className="space-y-3 text-black">
                <li>• Budget vs. actual spending</li>
                <li>• Cost per participant analysis</li>
                <li>• Program allocation tracking</li>
                <li>• Expenditure reports by category</li>
                <li>• Financial performance alerts</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <Shield className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">
                Compliance Monitoring
              </h3>
              <ul className="space-y-3 text-black">
                <li>• Eligibility documentation tracking</li>
                <li>• Required document checklists</li>
                <li>• Compliance alerts and warnings</li>
                <li>• Audit trail and history</li>
                <li>• Policy and procedure library</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <Target className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">
                Performance Goals
              </h3>
              <ul className="space-y-3 text-black">
                <li>• Set and track performance benchmarks</li>
                <li>• Goal progress visualization</li>
                <li>• Performance measure calculations</li>
                <li>• Trend analysis and forecasting</li>
                <li>• Comparative performance metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              Who Should Use the Board Portal?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center border-2 border-gray-200">
              <Users className="w-16 h-16 text-blue-900 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">
                Board Members
              </h3>
              <p className="text-black">
                Monitor program performance and make strategic decisions
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center border-2 border-gray-200">
              <Briefcase className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">
                Executive Directors
              </h3>
              <p className="text-black">
                Oversee operations and ensure accountability
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center border-2 border-gray-200">
              <FileText className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">
                Compliance Officers
              </h3>
              <p className="text-black">
                Monitor compliance and prepare for audits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
            Ready for Better Oversight?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Get the visibility and accountability your workforce board needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/workforce-board/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-gray-100 px-10 py-5 rounded-xl text-lg font-black shadow-2xl hover:scale-105 transition-all"
            >
              Access Board Portal
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-5 rounded-xl text-lg font-black transition-all"
            >
              Request Access
            </Link>
          </div>
          <p className="text-white/80 mt-6">
            Questions? Contact us at (317) 314-3757
          </p>
        </div>
      </section>
    </div>
  );
}
