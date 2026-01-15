import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/student-portal',
  },
  title: 'Student Portal | Elevate For Humanity',
  description:
    'Access your courses, track progress, connect with instructors, view grades, manage your schedule, and access career services. Your complete student dashboard.',
  keywords: ['student portal', 'student dashboard', 'course access', 'grades', 'schedule', 'career services', 'student resources'],
};

export default async function StudentPortalPage() {
  const quickLinks = [
    {
      image: '/images/artlist/hero-training-1.jpg',
      title: 'My Courses',
      description: 'Access course materials, lectures, and assignments',
      href: '/lms/dashboard',
      color: 'blue',
    },
    {
      image: '/images/artlist/hero-training-2.jpg',
      title: 'Schedule',
      description: 'View class schedule, deadlines, and upcoming events',
      href: '/lms/dashboard',
      color: 'green',
    },
    {
      image: '/images/artlist/hero-training-3.jpg',
      title: 'Grades & Progress',
      description: 'Track your academic performance and completion status',
      href: '/lms/dashboard',
      color: 'purple',
    },
    {
      image: '/images/artlist/hero-training-4.jpg',
      title: 'Instructors',
      description: 'Connect with instructors and get support',
      href: '/lms/dashboard',
      color: 'orange',
    },
    {
      image: '/images/artlist/hero-training-5.jpg',
      title: 'Career Services',
      description: 'Resume help, job placement, and interview prep',
      href: '/career-services',
      color: 'teal',
    },
    {
      image: '/images/artlist/hero-training-6.jpg',
      title: 'Documents',
      description: 'Transcripts, certificates, and important forms',
      href: '/lms/dashboard',
      color: 'indigo',
    },
  ];

  const resources = [
    {
      image: '/images/artlist/hero-training-7.jpg',
      title: 'Video Tutorials',
      description: 'Step-by-step guides for using the portal and course tools',
      href: '/resources',
    },
    {
      image: '/images/artlist/hero-training-8.jpg',
      title: 'Student Handbook',
      description: 'Policies, procedures, and important information',
      href: '/student-portal/handbook',
    },
    {
      image: '/images/artlist/hero-training-1.jpg',
      title: 'Discussion Forums',
      description: 'Connect with classmates and study groups',
      href: '/community',
    },
    {
      image: '/images/artlist/hero-training-2.jpg',
      title: 'Certifications',
      description: 'View earned credentials and download certificates',
      href: '/lms/dashboard',
    },
  ];

  const careerServices = [
    {
      image: '/images/artlist/hero-training-3.jpg',
      title: 'Resume Building',
      description: 'Professional resume writing and review services',
      href: '/career-services/resume-building',
    },
    {
      image: '/images/artlist/hero-training-4.jpg',
      title: 'Interview Prep',
      description: 'Mock interviews and expert feedback',
      href: '/career-services/interview-prep',
    },
    {
      image: '/images/artlist/hero-training-5.jpg',
      title: 'Job Placement',
      description: 'Direct connections to hiring employers',
      href: '/career-services/job-placement',
    },
    {
      image: '/images/artlist/hero-training-6.jpg',
      title: 'Networking Events',
      description: 'Career fairs and industry meetups',
      href: '/career-fair',
    },
  ];

  const supportOptions = [
    {
      icon: Phone,
      title: 'Call Student Services',
      description: '(317) 314-3757',
      href: 'tel:317-314-3757',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'students@elevateforhumanity.org',
      href: 'mailto:students@elevateforhumanity.org',
    },
  ];

  const faqs = [
    {
      question: 'How do I access my courses?',
      answer:
        'Log in to your dashboard to see all enrolled courses with direct links to course materials, lectures, and assignments.',
    },
    {
      question: 'Where can I view my grades?',
      answer:
        'Your dashboard shows current grades, assignment scores, and overall completion percentage for each course.',
    },
    {
      question: 'How do I contact my instructor?',
      answer:
        'Use the messaging feature in your dashboard or check instructor office hours listed in your course.',
    },
    {
      question: 'Can I download my transcripts?',
      answer:
        'Yes! Visit your dashboard to request official transcripts, download unofficial transcripts, and access certificates.',
    },
    {
      question: 'What career services are available?',
      answer:
        'All students have free access to resume building, interview prep, job placement assistance, and networking events.',
    },
    {
      question: 'How do I get technical support?',
      answer:
        'Contact student services via phone or email. Support is available Monday-Friday 9AM-6PM EST.',
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
          <source src="/videos/student-portal-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/70" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Student Portal
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Your complete dashboard for courses, grades, schedule, career services, and student resources
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white/90 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>24/7 Course Access</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Real-Time Grades</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Career Support</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg"
            >
              Sign In to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur text-white px-8 py-4 rounded-lg font-semibold text-lg transition border border-white/30"
            >
              New Student? Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Quick Access
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Everything you need in one place. Sign in to access your personalized dashboard.
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
                  <span className="inline-flex items-center gap-1 text-blue-600 font-medium text-sm mt-2 group-hover:gap-2 transition-all">
                    Access Now <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Student Resources */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Student Resources
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Tools and guides to help you succeed in your program
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 mb-1">{resource.title}</h3>
                  <p className="text-slate-600 text-sm">{resource.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Career Services */}
      <section className="py-16 px-6 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Career Services
          </h2>
          <p className="text-blue-100 text-center mb-12 max-w-2xl mx-auto">
            Free career support for all students - from resume building to job placement
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white/10 backdrop-blur rounded-xl hover:bg-white/20 transition overflow-hidden"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-900/40" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-1">{service.title}</h3>
                  <p className="text-blue-100 text-sm">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/career-services"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition"
            >
              Explore All Career Services
              <ArrowRight className="w-5 h-5" />
            </Link>
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
            Our student services team is here to support you
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {supportOptions.map((option) => (
              <a
                key={option.title}
                href={option.href}
                className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <option.icon className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{option.title}</h3>
                  <p className="text-blue-600">{option.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-center mb-12">
            Quick answers to common questions
          </p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="font-semibold text-slate-900 pr-4">{faq.question}</h3>
                  <span className="text-blue-600 group-open:rotate-180 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students building their careers with Elevate for Humanity
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition"
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              Apply Now - It&apos;s Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
