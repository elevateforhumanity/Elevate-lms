'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function VITAFAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What is VITA?',
      answer: 'VITA (Volunteer Income Tax Assistance) is an IRS program that offers free tax help to people who generally make $64,000 or less, persons with disabilities, and limited English-speaking taxpayers.'
    },
    {
      question: 'How much does it cost?',
      answer: 'VITA services are 100% FREE. There are no fees, no hidden costs, and no obligations. We are funded by the IRS and community partners to provide free tax preparation.'
    },
    {
      question: 'Who can use VITA services?',
      answer: 'You can use VITA if you earn $64,000 or less per year, have a disability, need language assistance, or are a senior needing help with taxes.'
    },
    {
      question: 'Do I need an appointment?',
      answer: 'While walk-ins are welcome at most sites, we recommend scheduling an appointment to minimize wait times. You can book online or call us.'
    },
    {
      question: 'What documents do I need to bring?',
      answer: 'Bring photo ID, Social Security cards for everyone on your return, all income documents (W-2s, 1099s), and bank account information for direct deposit.'
    },
    {
      question: 'How long does it take?',
      answer: 'Most returns are completed the same day. Simple returns take 30-60 minutes, while more complex returns may take 1-2 hours.'
    },
    {
      question: 'Are VITA volunteers qualified?',
      answer: 'Yes! All VITA volunteers are IRS-certified and pass annual competency exams. They receive ongoing training and quality review.'
    },
    {
      question: 'Can you help with state taxes?',
      answer: 'Yes, we prepare both federal and state tax returns at no cost.'
    },
    {
      question: 'What if I get audited?',
      answer: 'VITA provides free audit support. If the IRS audits your return, we will help you respond at no charge.'
    },
    {
      question: 'Can I e-file through VITA?',
      answer: 'Yes, all VITA sites offer free e-filing. Your refund will be deposited directly into your bank account in 7-14 days.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl">Common questions about VITA tax services</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-green-50 border-2 border-green-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-700 mb-6">
            Contact us or schedule a free appointment to speak with a VITA volunteer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/vita/schedule"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Schedule Appointment
            </a>
            <a
              href="/contact"
              className="bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 px-6 py-3 rounded-lg font-semibold transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
