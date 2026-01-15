import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Mail, MessageCircle, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Customer Service | Staff Portal',
  description: 'Customer service tools, templates, and resources for staff.',
};

export default async function CustomerServicePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const quickActions = [
    {
      image: '/hero-images/healthcare-cat-new.jpg',
      title: 'Response Templates',
      description: 'Pre-written responses for common inquiries',
      href: '/staff-portal/customer-service/templates',
    },
    {
      image: '/hero-images/skilled-trades-cat-new.jpg',
      title: 'FAQ Database',
      description: 'Searchable answers to frequent questions',
      href: '/faq',
    },
    {
      image: '/hero-images/technology-cat-new.jpg',
      title: 'Escalation Guide',
      description: 'When and how to escalate issues',
      href: '/staff-portal/customer-service/escalation',
    },
    {
      image: '/hero-images/business-hero.jpg',
      title: 'Contact Directory',
      description: 'Staff and department contact information',
      href: '/staff-portal/customer-service/directory',
    },
  ];

  const serviceCategories = [
    {
      image: '/hero-images/cdl-cat-new.jpg',
      title: 'Enrollment Support',
      description: 'Help students with applications and enrollment questions',
      count: 'Most Common',
    },
    {
      image: '/hero-images/barber-beauty-cat-new.jpg',
      title: 'Technical Issues',
      description: 'Troubleshoot login, video, and platform problems',
      count: 'High Priority',
    },
    {
      image: '/hero-images/healthcare-category.jpg',
      title: 'Program Questions',
      description: 'Answer questions about courses and certifications',
      count: 'Frequent',
    },
    {
      image: '/hero-images/skilled-trades-category.jpg',
      title: 'Funding & Eligibility',
      description: 'Explain WIOA, grants, and payment options',
      count: 'Complex',
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: '(317) 314-3757',
      hours: 'Mon-Fri 9AM-6PM EST',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@elevateforhumanity.org',
      hours: '24-48 hour response',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Website chat widget',
      hours: 'Mon-Fri 9AM-6PM EST',
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
          poster="/images/artlist/hero-training-4.jpg"
        >
          <source src="/videos/staff-portal-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/85 to-blue-800/75" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Customer Service</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Tools and resources to deliver exceptional support to students and partners
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={action.image}
                    alt={action.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 text-lg font-bold text-white">
                    {action.title}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-slate-600 text-sm">{action.description}</p>
                  <span className="inline-flex items-center gap-1 text-cyan-600 font-medium text-sm mt-2 group-hover:gap-2 transition-all">
                    Open <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Service Categories */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Service Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {serviceCategories.map((category) => (
              <div
                key={category.title}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-3 right-3 bg-cyan-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {category.count}
                  </span>
                  <h3 className="absolute bottom-3 left-3 text-lg font-bold text-white">
                    {category.title}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-slate-600 text-sm">{category.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Methods */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Methods</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                    <method.icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{method.title}</h3>
                    <p className="text-cyan-600 font-medium">{method.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock className="w-4 h-4" />
                  {method.hours}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
