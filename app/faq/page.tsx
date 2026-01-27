import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare } from 'lucide-react';
import FAQSearch from './FAQSearch';

export const metadata: Metadata = {
  title: 'FAQ | Elevate For Humanity',
  description: 'Frequently asked questions about our free career training programs, eligibility, funding, and services.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/faq',
  },
};

export const dynamic = 'force-dynamic';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
}

export default async function FAQPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  const { data: faqs, error } = await supabase
    .from('faqs')
    .select('id, question, answer, category, display_order')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error || !faqs || faqs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="relative h-64 overflow-hidden">
          <Image
            src="/images/programs-hq/students-learning.jpg"
            alt="FAQ"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/60" />
          <div className="relative z-10 h-full flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">Frequently Asked Questions</h1>
          </div>
        </section>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No FAQs Available</h2>
          <p className="text-gray-600 mb-6">Have a question? Contact us directly.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Contact Us
          </Link>
        </div>
      </div>
    );
  }

  // Group FAQs by category
  const categories = [...new Set(faqs.map((faq: FAQ) => faq.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden">
        <Image
          src="/images/business/collaboration-1.jpg"
          alt="Get answers to your questions"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              Find answers to common questions about our free training programs, 
              eligibility requirements, funding options, and career services.
            </p>

          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/wioa-eligibility" className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
              WIOA Eligibility
            </Link>
            <Link href="/funding" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
              Funding Options
            </Link>
            <Link href="/programs" className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
              Training Programs
            </Link>
            <Link href="/how-it-works" className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors">
              How It Works
            </Link>
            <Link href="/contact" className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Category filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <a 
                key={cat} 
                href={`#${cat}`} 
                className="px-4 py-2 bg-white border rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 capitalize"
              >
                {cat}
              </a>
            ))}
          </div>
        )}

        {/* FAQ List with Search */}
        <FAQSearch faqs={faqs} />

        {/* Contact CTA */}
        <div className="mt-12 bg-orange-50 rounded-xl p-8 text-center">
          <MessageSquare className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Still have questions?</h2>
          <p className="text-gray-600 mb-4">Our team is here to help you find the answers you need.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
