import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  BookOpen,
  BarChart3,
  MessageSquare,
  Calendar,
  FileText,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Zap,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Staff Portal - Streamline Student & Course Management | Elevate For Humanity',
  description:
    'Powerful staff portal for managing students, courses, attendance, and operations. Save time with automated workflows and real-time reporting.',
};

export default function StaffPortalLandingPage() {
  const features = [
    {
      icon: Users,
      title: 'Student Management',
      description:
        'Track student progress, attendance, and engagement in one place',
    },
    {
      icon: BookOpen,
      title: 'Course Administration',
      description: 'Manage courses, schedules, and curriculum with ease',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Reporting',
      description: 'Generate reports on enrollment, completion, and outcomes',
    },
    {
      icon: MessageSquare,
      title: 'Communication Tools',
      description: 'Message students, send announcements, and track responses',
    },
    {
      icon: Calendar,
      title: 'Attendance Tracking',
      description: 'Monitor attendance and identify at-risk students early',
    },
    {
      icon: FileText,
      title: 'Document Management',
      description:
        'Store and access student records, forms, and compliance docs',
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description:
        'Automated workflows eliminate repetitive administrative tasks',
    },
    {
      icon: Shield,
      title: 'Stay Compliant',
      description:
        'Built-in compliance tracking for WIOA, DOL, and state requirements',
    },
    {
      icon: Zap,
      title: 'Work Faster',
      description: 'Quick actions, bulk operations, and keyboard shortcuts',
    },
    {
      icon: TrendingUp,
      title: 'Better Outcomes',
      description: 'Data-driven insights help improve student success rates',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20 overflow-hidden">
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
              <Users className="w-5 h-5" />
              <span className="text-sm font-bold">For Staff & Advisors</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Manage Students & Courses
              <br />
              <span className="text-yellow-300">More Efficiently</span>
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed font-medium">
              The all-in-one staff portal that saves you time with automated
              workflows and real-time insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/staff-portal/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition shadow-2xl hover:scale-105"
              >
                Access Staff Portal
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg transition"
              >
                Request Demo
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
              Everything You Need in One Portal
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Streamline your workflow with tools designed specifically for
              workforce development staff
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-indigo-600 hover:shadow-xl transition-all"
                >
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-indigo-600" />
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
              Why Staff Love Our Portal
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Built by workforce professionals, for workforce professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
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

      {/* What You Can Do */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              What You Can Do
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-start gap-4 bg-white border-2 border-gray-200 rounded-xl p-6">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Enroll & Track Students
                </h3>
                <p className="text-black">
                  Process applications, enroll students, track progress, and
                  monitor completion rates in real-time
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white border-2 border-gray-200 rounded-xl p-6">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Manage Courses & Schedules
                </h3>
                <p className="text-black">
                  Create courses, set schedules, assign instructors, and manage
                  capacity with drag-and-drop simplicity
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white border-2 border-gray-200 rounded-xl p-6">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Generate Reports Instantly
                </h3>
                <p className="text-black">
                  Create WIOA reports, outcome reports, and custom analytics
                  with one click - no spreadsheets needed
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white border-2 border-gray-200 rounded-xl p-6">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Communicate Effectively
                </h3>
                <p className="text-black">
                  Send targeted messages, announcements, and reminders to
                  students, instructors, and partners
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white border-2 border-gray-200 rounded-xl p-6">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Stay Compliant
                </h3>
                <p className="text-black">
                  Automated compliance tracking for WIOA, DOL, and state
                  requirements with audit-ready documentation
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-white border-2 border-gray-200 rounded-xl p-6">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Identify At-Risk Students
                </h3>
                <p className="text-black">
                  Early warning system alerts you to attendance issues, low
                  engagement, and students who need support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              Who Should Use the Staff Portal?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center border-2 border-gray-200">
              <Users className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">
                Program Coordinators
              </h3>
              <p className="text-black">
                Manage day-to-day operations, student enrollment, and program
                delivery
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center border-2 border-gray-200">
              <MessageSquare className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">
                Career Advisors
              </h3>
              <p className="text-black">
                Track student progress, provide support, and monitor career
                outcomes
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center border-2 border-gray-200">
              <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">
                Administrative Staff
              </h3>
              <p className="text-black">
                Handle enrollment, documentation, reporting, and compliance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
            Ready to Streamline Your Workflow?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Join staff members who streamline their workflow with our portal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/staff-portal/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 hover:bg-gray-100 px-10 py-5 rounded-xl text-lg font-black shadow-2xl hover:scale-105 transition-all"
            >
              Access Staff Portal
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-5 rounded-xl text-lg font-black transition-all"
            >
              Contact Support
            </Link>
          </div>
          <p className="text-white/80 mt-6">
            Need help? Contact us at (317) 314-3757
          </p>
        </div>
      </section>
    </div>
  );
}
