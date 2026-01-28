import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'VITA FAQ | Elevate For Humanity',
  description: 'Frequently asked questions about VITA free tax preparation services.',
};

export default function VITAFAQPage() {
  const faqs = [
    {
      question: 'What is VITA?',
      answer: 'VITA (Volunteer Income Tax Assistance) is an IRS-sponsored program that offers free tax preparation to qualifying individuals.',
    },
    {
      question: 'Who qualifies for VITA services?',
      answer: 'Generally, people who make $60,000 or less, persons with disabilities, the elderly, and limited English-speaking taxpayers qualify for VITA services.',
    },
    {
      question: 'What documents do I need to bring?',
      answer: 'Bring photo ID, Social Security cards for all family members, all income documents (W-2s, 1099s), and last year\'s tax return if available.',
    },
    {
      question: 'Is VITA really free?',
      answer: 'Yes, VITA services are completely free. There are no hidden fees or charges.',
    },
    {
      question: 'When is VITA available?',
      answer: 'VITA services are typically available from late January through mid-April during tax filing season.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/vita" className="text-green-600 hover:underline mb-6 inline-block">
          ← Back to VITA
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-8">VITA Frequently Asked Questions</h1>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
