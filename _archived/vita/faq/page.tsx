import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ | VITA Free Tax Prep',
  description: 'Frequently asked questions about VITA free tax preparation services.',
};

export const dynamic = 'force-dynamic';

export default async function VITAFAQPage() {
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

  // Get FAQs
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('category', 'vita')
    .eq('is_active', true)
    .order('order', { ascending: true });

  const defaultFaqs = [
    {
      question: 'What is VITA?',
      answer: 'VITA (Volunteer Income Tax Assistance) is an IRS program that offers free tax preparation to qualifying individuals. All volunteers are IRS-certified and trained to help you file your taxes accurately.',
    },
    {
      question: 'Who qualifies for free VITA services?',
      answer: 'Generally, individuals and families with income under $64,000 qualify. This also includes persons with disabilities, elderly taxpayers, and limited English speakers.',
    },
    {
      question: 'Is VITA really free?',
      answer: 'Yes! VITA is 100% free. There are no hidden fees. You save the $200+ you would typically pay for tax preparation services.',
    },
    {
      question: 'How long does an appointment take?',
      answer: 'Most appointments take 1-2 hours depending on the complexity of your return. Simple returns may be completed faster.',
    },
    {
      question: 'Do I need an appointment?',
      answer: 'Yes, appointments are required. This ensures we have enough time to complete your return accurately. Walk-ins may be accommodated if time permits.',
    },
    {
      question: 'Can I file jointly with my spouse?',
      answer: 'Yes, but both spouses must be present at the appointment with valid photo IDs and Social Security cards.',
    },
    {
      question: 'What if I\'m missing documents?',
      answer: 'We cannot complete your return without all required documents. You may need to reschedule or return with the missing items.',
    },
    {
      question: 'Will I get my refund faster?',
      answer: 'We e-file all returns and can set up direct deposit, which is the fastest way to receive your refund (typically 21 days or less).',
    },
    {
      question: 'Can you help with state taxes?',
      answer: 'Yes, we prepare both federal and Indiana state returns at no charge.',
    },
    {
      question: 'What if I have self-employment income?',
      answer: 'We can help with simple self-employment situations. If your self-employment income exceeds $10,000 or involves complex business expenses, we may refer you to a paid preparer.',
    },
  ];

  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-green-100">
            Common questions about VITA free tax preparation
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/vita" className="text-green-600 hover:underline mb-8 inline-block">
          ← Back to VITA
        </Link>

        {/* FAQs */}
        <div className="space-y-4">
          {displayFaqs.map((faq: any, index: number) => (
            <details key={index} className="bg-white rounded-xl shadow-sm border group">
              <summary className="p-6 cursor-pointer flex items-center justify-between font-semibold list-none">
                {faq.question}
                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 bg-green-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            Contact us and we'll be happy to help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vita/contact"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Contact Us
            </Link>
            <a
              href="tel:3173143757"
              className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              Call (317) 314-3757
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
