import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Staff Portal | Elevate For Humanity',
  description:
    'Powerful staff portal for managing students, courses, attendance, and operations. Save time with automated workflows and real-time reporting.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/staff-portal',
  },
};

export default function StaffPortalPage() {
  const quickLinks = [
    {
      image: '/images/artlist/hero-training-1.jpg',
      title: 'Student Management',
      description: 'Track student progress, attendance, and engagement in one place',
      href: '/staff-portal/students',
    },
    {
      image: '/images/artlist/hero-training-2.jpg',
      title: 'Course Administration',
      description: 'Manage courses, schedules, and curriculum with ease',
      href: '/staff-portal/courses',
    },
    {
      image: '/images/artlist/hero-training-3.jpg',
      title: 'Reports & Analytics',
      description: 'Generate reports on enrollment, completion, and outcomes',
      href: '/staff-portal/dashboard',
    },
    {
      image: '/images/artlist/hero-training-4.jpg',
      title: 'Training Resources',
      description: 'Access staff training materials and best practices',
      href: '/staff-portal/training',
    },
    {
      image: '/images/artlist/hero-training-5.jpg',
      title: 'QA Checklist',
      description: 'Quality assurance tools and compliance checklists',
      href: '/staff-portal/qa-checklist',
    },
    {
      image: '/images/artlist/hero-training-6.jpg',
      title: 'Customer Service',
      description: 'Support tools and communication templates',
      href: '/staff-portal/customer-service',
    },
  ];

  const capabilities = [
    {
      title: 'Enroll & Track Students',
      description: 'Process applications, enroll students, track progress, and monitor completion rates in real-time',
    },
    {
      title: 'Manage Courses & Schedules',
      description: 'Create courses, set schedules, assign instructors, and manage capacity with ease',
    },
    {
      title: 'Generate Reports Instantly',
      description: 'Create WIOA reports, outcome reports, and custom analytics with one click',
    },
    {
      title: 'Communicate Effectively',
      description: 'Send targeted messages, announcements, and reminders to students and partners',
    },
    {
      title: 'Stay Compliant',
      description: 'Automated compliance tracking for WIOA, DOL, and state requirements',
    },
    {
      title: 'Identify At-Risk Students',
      description: 'Early warning system alerts you to attendance issues and students who need support',
    },
  ];

  const roles = [
    {
      image: '/images/artlist/hero-training-7.jpg',
      title: 'Program Coordinators',
      description: 'Manage day-to-day operations, student enrollment, and program delivery',
    },
    {
      image: '/images/artlist/hero-training-8.jpg',
      title: 'Career Advisors',
      description: 'Track student progress, provide support, and monitor career outcomes',
    },
    {
      image: '/images/artlist/hero-training-1.jpg',
      title: 'Administrative Staff',
      description: 'Handle enrollment, documentation, reporting, and compliance',
    },
  ];

  const supportOptions = [
    {
      icon: Phone,
      title: 'Call Support',
      description: '(317) 314-3757',
      href: 'tel:317-314-3757',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'staff@elevateforhumanity.org',
      href: 'mailto:staff@elevateforhumanity.org',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center text-white overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/artlist/hero-training-1.jpg"
        >
          <source src="/videos/staff-portal-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 to-purple-800/75" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-bold">For Staff & Advisors</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Staff Portal
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Manage students, courses, and operations with powerful tools designed for workforce development professionals
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/90 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Real-Time Reporting</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Compliance Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Automated Workflows</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Sign In to Portal
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur text-white px-8 py-4 rounded-lg font-semibold text-lg transition border border-white/30"
            >
              Request Access
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Staff Tools
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to manage students and programs effectively
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={link.image}
                    alt={link.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                    {link.title}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-slate-600 text-sm">{link.description}</p>
                  <span className="inline-flex items-center gap-1 text-indigo-600 font-medium text-sm mt-2 group-hover:gap-2 transition-all">
                    Access Now <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            What You Can Do
          </h2>
          <p className="text-slate-600 text-center mb-12">
            Powerful features to streamline your workflow
          </p>
          <div className="space-y-4">
            {capabilities.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-6"
              >
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-6 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Who Should Use the Staff Portal?
          </h2>
          <p className="text-indigo-100 text-center mb-12 max-w-2xl mx-auto">
            Built by workforce professionals, for workforce professionals
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="bg-white/10 backdrop-blur rounded-xl overflow-hidden"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={role.image}
                    alt={role.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-indigo-900/50" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-white text-xl mb-2">{role.title}</h3>
                  <p className="text-indigo-100">{role.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Need Help?
          </h2>
          <p className="text-slate-600 text-center mb-12">
            Our support team is here to assist you
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {supportOptions.map((option) => (
              <a
                key={option.title}
                href={option.href}
                className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <option.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{option.title}</h3>
                  <p className="text-indigo-600">{option.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Streamline Your Workflow?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join staff members who manage their programs more efficiently
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition border border-white/30"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
