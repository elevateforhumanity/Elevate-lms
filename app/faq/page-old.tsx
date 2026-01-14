'use client';

import React from 'react';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ChevronDown,
  DollarSign,
  HelpCircle,
  Laptop,
  Mail,
  Phone,
  Rocket,
  Search,
  Star,
} from 'lucide-react';

const faqCategories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: '<Rocket className="w-5 h-5 inline-block" />',
    questions: [
      {
        q: 'How do I apply for a program?',
        a: "You can apply online through our website by visiting the Apply page, calling us at 317-314-3757, or visiting our office. The application takes about 5-10 minutes to complete. You'll need basic information about yourself, your education history, and your career goals.",
      },
      {
        q: 'Are your programs really 100% free?',
        a: 'Yes! Most students pay nothing out of pocket. Our programs are funded through WIOA (Workforce Innovation and Opportunity Act), WRG (Workforce Ready Grant), JRI (Justice Reinvestment Initiative), and registered apprenticeships. We help you determine which funding source you qualify for during the application process.',
      },
      {
        q: 'What are the eligibility requirements?',
        a: 'Requirements vary by program and funding source, but generally you must be: 18 years or older (16+ for some youth programs), legally authorized to work in the US, and meet income guidelines for WIOA funding. We help you determine eligibility during your initial consultation.',
      },
      {
        q: 'How long does the application process take?',
        a: 'From application to starting class typically takes 1-3 weeks. This includes: submitting your application (5-10 minutes), meeting with an advisor (within 1-2 days), completing any required paperwork, and enrolling in the next available class.',
      },
      {
        q: 'Do I need a high school diploma or GED?',
        a: 'Most programs require a high school diploma or GED, but we also offer GED preparation services if you need them. Some programs may accept students currently working toward their GED. Contact us to discuss your specific situation.',
      },
    ],
  },
  {
    id: 'programs',
    name: 'Programs & Training',
    icon: '<BookOpen className="w-5 h-5 inline-block" />',
    questions: [
      {
        q: 'What programs do you offer?',
        a: "We offer 8 career training programs: HVAC Technician, Barber Apprenticeship, CNA (Certified Nursing Assistant), CDL (Commercial Driver's License), Medical Assistant, Building Maintenance, Building Technician, and Workforce Readiness. Each program is designed to get you job-ready in weeks, not years.",
      },
      {
        q: 'How long are the programs?',
        a: 'Program lengths vary: CNA (4-8 weeks), CDL (4-6 weeks), Medical Assistant (8-12 weeks), HVAC (12-16 weeks), Barber Apprenticeship (12-18 months), Building Maintenance (8-12 weeks), Workforce Readiness (1-4 weeks). All programs are designed to get you working as quickly as possible.',
      },
      {
        q: 'Are classes online or in-person?',
        a: 'Most programs are hybrid - combining online theory with hands-on, in-person training. Some programs like CDL and Barber Apprenticeship are primarily hands-on. We offer flexible schedules including day, evening, and weekend options for most programs.',
      },
      {
        q: 'What certifications will I earn?',
        a: "You'll earn industry-recognized certifications specific to your program: CNA State Certification, CDL Class A License, EPA 608 Certification (HVAC), State Barber License, Medical Assistant Certification, and more. These are the same certifications employers require.",
      },
      {
        q: 'Can I work while in the program?',
        a: 'Yes! Many students work while training. We offer flexible schedules to accommodate working students. The Barber Apprenticeship actually requires you to work in a shop while training - you earn while you learn.',
      },
    ],
  },
  {
    id: 'funding',
    name: 'Funding & Costs',
    icon: '<DollarSign className="w-5 h-5 inline-block" />',
    questions: [
      {
        q: 'What is WIOA funding?',
        a: 'WIOA (Workforce Innovation and Opportunity Act) is federal funding that pays for job training for eligible individuals. If you meet income guidelines or face barriers to employment, WIOA can cover your entire training cost including tuition, books, supplies, and sometimes transportation and childcare.',
      },
      {
        q: "What if I don't qualify for WIOA?",
        a: 'We have multiple funding options: WRG (Workforce Ready Grant), JRI (Justice Reinvestment Initiative) for those with justice involvement, registered apprenticeships, employer sponsorship, and payment plans. We help you find the right funding source during your consultation.',
      },
      {
        q: 'Do you help with transportation costs?',
        a: 'Yes! For WIOA-eligible students, we can provide gas cards, bus passes, or mileage reimbursement. We understand transportation is often a barrier to training, and we work to remove that barrier.',
      },
      {
        q: "What about childcare while I'm in class?",
        a: 'WIOA funding can cover childcare costs for eligible students. We work with local childcare providers and can help arrange and pay for childcare so you can focus on your training.',
      },
      {
        q: 'Are there any hidden fees?',
        a: "No hidden fees! If you're funded through WIOA, WRG, or JRI, everything is covered: tuition, books, supplies, certification exam fees, and support services. You pay nothing out of pocket.",
      },
    ],
  },
  {
    id: 'support',
    name: 'Student Support',
    icon: '🤝',
    questions: [
      {
        q: 'Do you help with job placement?',
        a: 'Absolutely! Job placement assistance is included in all programs. We have partnerships with local employers, help with resume writing and interview prep, connect you with job openings, and support you through your first 90 days of employment.',
      },
      {
        q: 'What if I need help with my resume?',
        a: 'We provide one-on-one resume writing assistance, interview coaching, and professional development training. Our career coaches work with you to create a strong resume and practice interviewing until you feel confident.',
      },
      {
        q: 'Can I get help with work clothes or uniforms?',
        a: 'Yes! WIOA funding can cover work clothes, uniforms, tools, and equipment needed for your program or job. We want to make sure you have everything you need to succeed.',
      },
      {
        q: "What if I'm struggling in class?",
        a: 'We provide tutoring, one-on-one support, and flexible scheduling if you need extra help. Our instructors are committed to your success and will work with you to ensure you understand the material and pass your certification exams.',
      },
      {
        q: 'Do you offer mental health or counseling services?',
        a: "We have partnerships with local mental health providers and can connect you with counseling services, substance abuse support, and other wraparound services. We understand that life challenges can affect your training, and we're here to help.",
      },
    ],
  },
  {
    id: 'special-populations',
    name: 'Special Populations',
    icon: '<Star className="w-5 h-5 inline-block" />',
    questions: [
      {
        q: 'I have a criminal record. Can I still enroll?',
        a: "Yes! We welcome individuals with criminal records. Our JRI (Justice Reinvestment Initiative) program specifically serves people with justice involvement. Some programs like CNA and Medical Assistant may have background check requirements, but we'll work with you to find the right program.",
      },
      {
        q: "I'm over 50. Am I too old for training?",
        a: "Absolutely not! We serve students of all ages. Many of our most successful graduates are over 50. Age brings maturity, work ethic, and life experience that employers value. It's never too late for a career change.",
      },
      {
        q: "I don't speak English well. Can you help?",
        a: "We offer ESL (English as a Second Language) support and can connect you with language learning resources. Some programs may require a certain English proficiency level, but we'll work with you to build those skills.",
      },
      {
        q: 'I have a disability. Are your programs accessible?',
        a: 'Yes! We provide reasonable accommodations for students with disabilities. This may include assistive technology, modified schedules, or additional support services. Contact us to discuss your specific needs.',
      },
      {
        q: "I'm a veteran. Do you have special programs?",
        a: 'We welcome veterans and can help you use your VA benefits for training. We also have partnerships with veteran service organizations and understand the unique needs of transitioning service members.',
      },
    ],
  },
  {
    id: 'technical',
    name: 'Technical Questions',
    icon: '<Laptop className="w-5 h-5 inline-block" />',
    questions: [
      {
        q: 'Do I need a computer for online classes?',
        a: "For programs with online components, you'll need access to a computer or tablet with internet. If you don't have one, we can help you access computers at our facility or connect you with programs that provide devices.",
      },
      {
        q: "What if I'm not good with technology?",
        a: "We provide technology training and support. Our staff will help you learn to use our online learning platform, email, and any other technology needed for your program. You don't need to be tech-savvy to succeed.",
      },
      {
        q: 'How do I access my student portal?',
        a: "After enrollment, you'll receive login credentials for your student portal. You can access it at www.elevateforhumanity.org/student/dashboard. Contact support if you have trouble logging in.",
      },
      {
        q: 'Can I use my phone for online classes?',
        a: 'While our platform is mobile-friendly, we recommend using a computer or tablet for the best learning experience. Some activities and assessments work better on larger screens.',
      },
      {
        q: 'What if I have technical problems during class?',
        a: 'We have IT support available during class hours. You can also email support@www.elevateforhumanity.org or call our main number for technical assistance.',
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const key = `${categoryId}-${questionIndex}`;
    setOpenQuestions((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const filteredCategories = faqCategories.filter((category) => {
    if (selectedCategory !== 'all' && category.id !== selectedCategory)
      return false;
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return category.questions.some(
      (q) =>
        q.q.toLowerCase().includes(query) || q.a.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm font-semibold">
                We&apos;re Here to Help
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-base md:text-lg text-blue-100 mb-8">
              Find answers to common questions about our programs, funding, and
              support services.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-slate-50 border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === 'all'
                  ? 'bg-brand-blue-600 text-white'
                  : 'bg-white text-black hover:bg-slate-100'
              }`}
            >
              All Questions
            </button>
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === category.id
                    ? 'bg-brand-blue-600 text-white'
                    : 'bg-white text-black hover:bg-slate-100'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {filteredCategories.map((category) => (
              <div key={category.id}>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 flex items-center gap-3">
                  <span className="text-4xl text-2xl md:text-3xl lg:text-4xl">
                    {category.icon}
                  </span>
                  {category.name}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((question, index) => {
                    const key = `${category.id}-${index}`;
                    const isOpen = openQuestions.includes(key);

                    return (
                      <div
                        key={index}
                        className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition"
                      >
                        <button
                          onClick={() => toggleQuestion(category.id, index)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                        >
                          <span className="font-semibold text-black text-lg">
                            {question.q}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                              isOpen ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4 text-black leading-relaxed">
                            {question.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Still Have Questions?
            </h2>
            <p className="text-base md:text-lg text-black mb-8">
              We&apos;re here to help! Contact us and we&apos;ll get you the
              answers you need.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <Phone className="w-12 h-12 text-brand-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-black mb-2">
                  Call Us
                </h3>
                <p className="text-black mb-4">
                  Speak with an advisor Monday-Friday, 8am-5pm
                </p>
                <a
                  href="tel:317-314-3757"
                  className="inline-block px-6 py-3 bg-brand-blue-600 text-white font-bold rounded-lg hover:bg-brand-blue-700 transition"
                >
                  317-314-3757
                </a>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-black mb-2">
                  Email Us
                </h3>
                <p className="text-black mb-4">
                  Send us a message and we&apos;ll respond within 24 hours
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition"
                >
                  Contact Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-black mb-6 text-center">
              Quick Links
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/programs"
                className="bg-blue-50 hover:bg-gray-100 rounded-lg p-6 text-center transition"
              >
                <div className="text-3xl mb-2">
                  <BookOpen className="w-5 h-5 inline-block" />
                </div>
                <div className="font-semibold text-black">
                  View Programs
                </div>
              </Link>
              <Link
                href="/apply"
                className="bg-green-50 hover:bg-brand-green-100 rounded-lg p-6 text-center transition"
              >
                <div className="text-3xl mb-2">✍️</div>
                <div className="font-semibold text-black">Apply Now</div>
              </Link>
              <Link
                href="/getstarted"
                className="bg-purple-50 hover:bg-purple-100 rounded-lg p-6 text-center transition"
              >
                <div className="text-3xl mb-2">
                  <Rocket className="w-5 h-5 inline-block" />
                </div>
                <div className="font-semibold text-black">Get Started</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
