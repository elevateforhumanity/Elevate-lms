import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { HelpCircle, ChevronDown, Search, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ | Elevate For Humanity',
  description: 'Frequently asked questions about our programs and services.',
};

export const dynamic = 'force-dynamic';

export default async function FAQPage() {
  const supabase = await createClient();

  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_published', true)
    .order('order', { ascending: true });

  const { data: categories } = await supabase
    .from('faq_categories')
    .select('*')
    .order('order', { ascending: true });

  const defaultFaqs = [
    { id: 1, question: 'What programs does Elevate offer?', answer: 'We offer workforce development programs in healthcare, technology, skilled trades, and professional services. Each program includes hands-on training, certification preparation, and job placement support.', category: 'Programs' },
    { id: 2, question: 'How much do programs cost?', answer: 'Many of our programs are offered at no cost to eligible participants through grants and partnerships. Financial assistance is available for those who qualify.', category: 'Costs' },
    { id: 3, question: 'How long are the training programs?', answer: 'Program length varies from 4 weeks to 6 months depending on the field and certification requirements. Most programs offer flexible scheduling options.', category: 'Programs' },
    { id: 4, question: 'Do you help with job placement?', answer: 'Yes! We have dedicated career services staff and partnerships with over 50 employers. Our job placement rate is over 85% within 90 days of program completion.', category: 'Career Services' },
    { id: 5, question: 'What are the eligibility requirements?', answer: 'Requirements vary by program. Generally, applicants must be 18+, have a high school diploma or GED, and be authorized to work in the US. Some programs have additional prerequisites.', category: 'Eligibility' },
    { id: 6, question: 'Can I attend while working?', answer: 'Yes, we offer evening and weekend classes for many programs. We also have online and hybrid options to accommodate working schedules.', category: 'Schedule' },
  ];

  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-orange-100 max-w-2xl mb-8">
            Find answers to common questions about our programs and services.
          </p>
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search questions..."
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat: any) => (
              <a key={cat.id} href={`#${cat.slug}`} className="px-4 py-2 bg-white border rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
                {cat.name}
              </a>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {displayFaqs.map((faq: any) => (
            <details key={faq.id} className="bg-white rounded-lg shadow-sm border group">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-900">{faq.question}</span>
                </div>
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 pl-16">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

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
