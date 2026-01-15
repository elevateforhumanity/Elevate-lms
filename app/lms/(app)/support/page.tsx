import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ArrowRight, MessageCircle, Phone, Mail, Clock, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/lms/support',
  },
  title: 'Live Support | Elevate For Humanity',
  description: 'Get help when you need it with 24/7 live chat support and resources.',
};

export default async function SupportPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const supportOptions = [
    {
      image: '/hero-images/healthcare-cat-new.jpg',
      title: 'Live Chat',
      description: 'Chat with a support agent in real-time',
      action: 'Start Chat',
      href: '#chat',
      available: true,
    },
    {
      image: '/hero-images/skilled-trades-cat-new.jpg',
      title: 'Phone Support',
      description: 'Call us at (317) 314-3757',
      action: 'Call Now',
      href: 'tel:317-314-3757',
      available: true,
    },
    {
      image: '/hero-images/technology-cat-new.jpg',
      title: 'Email Support',
      description: 'support@elevateforhumanity.org',
      action: 'Send Email',
      href: 'mailto:support@elevateforhumanity.org',
      available: true,
    },
    {
      image: '/hero-images/business-hero.jpg',
      title: 'Schedule Call',
      description: 'Book a time with an advisor',
      action: 'Schedule',
      href: '/booking',
      available: true,
    },
  ];

  const helpTopics = [
    {
      image: '/hero-images/cdl-cat-new.jpg',
      title: 'Getting Started',
      description: 'How to navigate the platform and start your first course',
      href: '/resources',
    },
    {
      image: '/hero-images/barber-beauty-cat-new.jpg',
      title: 'Technical Issues',
      description: 'Troubleshooting video playback, login, and browser issues',
      href: '/faq',
    },
    {
      image: '/hero-images/healthcare-category.jpg',
      title: 'Course Questions',
      description: 'Help with assignments, quizzes, and course content',
      href: '/lms/forums',
    },
    {
      image: '/hero-images/skilled-trades-category.jpg',
      title: 'Account & Billing',
      description: 'Manage your profile, certificates, and account settings',
      href: '/lms/settings',
    },
  ];

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page and follow the email instructions.',
    },
    {
      question: 'Why won\'t my video play?',
      answer: 'Try refreshing the page, clearing your browser cache, or using Chrome/Firefox.',
    },
    {
      question: 'How do I contact my instructor?',
      answer: 'Use the messaging feature in your course dashboard or post in the discussion forum.',
    },
    {
      question: 'When will I receive my certificate?',
      answer: 'Certificates are automatically generated within 24 hours of course completion.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Hero */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-white overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/artlist/hero-training-5.jpg"
        >
          <source src="/videos/student-portal-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/85 to-blue-800/75" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 text-cyan-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Live Support</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Get help when you need it - we&apos;re here for you
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-cyan-200">
            <Clock className="w-5 h-5" />
            <span>Support available Monday-Friday, 9AM-6PM EST</span>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {supportOptions.map((option) => (
              <a
                key={option.title}
                href={option.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={option.image}
                    alt={option.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 text-lg font-bold text-white">
                    {option.title}
                  </h3>
                  {option.available && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Available
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-slate-600 text-sm mb-3">{option.description}</p>
                  <span className="inline-flex items-center gap-1 text-cyan-600 font-medium text-sm group-hover:gap-2 transition-all">
                    {option.action} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Help Topics */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Help Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {helpTopics.map((topic) => (
              <Link
                key={topic.title}
                href={topic.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 mb-1">{topic.title}</h3>
                  <p className="text-slate-600 text-sm">{topic.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* FAQs */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-cyan-600" />
                    <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                  </div>
                  <span className="text-cyan-600 group-open:rotate-180 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 ml-8">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-cyan-600 font-medium hover:text-cyan-700"
            >
              View All FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
