import { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  DollarSign,
  Rocket,
  Users,
  Laptop,
  Star,
  Phone,
  Mail,
} from 'lucide-react';
import { FAQClient } from '@/components/faq/FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Elevate for Humanity',
  description: 'Find answers to common questions about our free career training programs, WIOA funding, certifications, job placement, and student support services.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/faq',
  },
  openGraph: {
    title: 'FAQ | Elevate for Humanity',
    description: 'Get answers to your questions about free career training',
    url: 'https://elevateforhumanity.institute/faq',
    type: 'website',
  },
};

export const revalidate = 3600; // Revalidate every hour

const faqCategories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: Rocket,
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
    icon: BookOpen,
    questions: [
      {
        q: 'What programs do you offer?',
        a: "We offer career training programs in Healthcare (CNA, Medical Assistant), Technology (CompTIA A+, Cybersecurity), Skilled Trades (HVAC, CDL, Building Maintenance), and Business (QuickBooks, Microsoft Office). Each program is designed to get you job-ready in weeks, not years.",
      },
      {
        q: 'How long are the programs?',
        a: 'Program lengths vary: CNA (4-8 weeks), CDL (4-6 weeks), Medical Assistant (8-12 weeks), HVAC (12-16 weeks), CompTIA A+ (8-12 weeks), Building Maintenance (8-12 weeks), Workforce Readiness (1-4 weeks). All programs are designed to get you working as quickly as possible.',
      },
      {
        q: 'Are classes online or in-person?',
        a: 'Most programs are hybrid - combining online theory with hands-on, in-person training. Some programs like CDL require primarily hands-on training. We offer flexible schedules including day, evening, and weekend options for most programs.',
      },
      {
        q: 'What certifications will I earn?',
        a: "You'll earn industry-recognized certifications specific to your program: CNA State Certification, CDL Class A License, EPA 608 Certification (HVAC), CompTIA A+, Medical Assistant Certification, and more. These are the same certifications employers require.",
      },
      {
        q: 'Can I work while in the program?',
        a: 'Yes! Many students work while training. We offer flexible schedules to accommodate working students. Some apprenticeship programs actually require you to work while training - you earn while you learn.',
      },
      {
        q: 'What if I need to miss a class?',
        a: 'We understand life happens. Contact your instructor as soon as possible if you need to miss a class. Most programs offer makeup sessions, recorded lectures, or flexible scheduling options to help you stay on track.',
      },
    ],
  },
  {
    id: 'funding',
    name: 'Funding & Costs',
    icon: DollarSign,
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
      {
        q: 'What if I need a laptop or equipment?',
        a: 'For technology programs, we can provide loaner laptops for the duration of your training. Some programs include equipment in the training cost. We ensure you have everything you need to succeed.',
      },
    ],
  },
  {
    id: 'career-services',
    name: 'Career Services',
    icon: Users,
    questions: [
      {
        q: 'Do you help with job placement?',
        a: 'Yes! We have partnerships with over 200 employers actively hiring our graduates. Our career services team helps with job search, applications, and connecting you with employers in your field.',
      },
      {
        q: 'What is your job placement rate?',
        a: 'Our overall job placement rate is 85% within 6 months of graduation. Rates vary by program, with some programs like CDL and CNA having placement rates over 90%. We track outcomes and work closely with employers.',
      },
      {
        q: 'Do you help with resumes and interviews?',
        a: 'Absolutely! Our career services include: resume writing assistance, interview preparation and practice, professional clothing assistance, and ongoing career counseling. We prepare you for every step of the job search.',
      },
      {
        q: 'Can I get career counseling after graduation?',
        a: 'Yes! Career support continues after graduation. You can access our career services team for up to 1 year after completing your program. We want to ensure your long-term success.',
      },
      {
        q: 'Do you work with employers?',
        a: 'Yes! We have strong relationships with employers across Indiana. Many employers come to us specifically to hire our graduates. We also offer job fairs, employer site visits, and direct hiring events.',
      },
    ],
  },
  {
    id: 'technical',
    name: 'Technical Support',
    icon: Laptop,
    questions: [
      {
        q: 'How do I access my online courses?',
        a: 'Log in to your student portal at elevateforhumanity.institute/lms using your email and password. Your courses will be listed on your dashboard. If you have trouble logging in, contact support at elevate4humanityedu@gmail.com.',
      },
      {
        q: 'What if I forget my password?',
        a: 'Click "Forgot Password" on the login page and enter your email. You\'ll receive a password reset link within a few minutes. If you don\'t receive it, check your spam folder or contact support.',
      },
      {
        q: 'What browsers are supported?',
        a: 'Our platform works best with Chrome, Firefox, Safari, and Edge (latest versions). We recommend using Chrome for the best experience. Make sure your browser is up to date.',
      },
      {
        q: 'How do I submit assignments?',
        a: 'Go to your course page, click on the assignment, complete the work, and click "Submit". You\'ll receive a confirmation message. You can view your submitted assignments in your course dashboard.',
      },
      {
        q: 'Who do I contact for technical issues?',
        a: 'For technical support, email elevate4humanityedu@gmail.com or call 317-314-3757. Our tech support team is available Monday-Friday 9am-5pm EST. For urgent issues outside these hours, leave a message and we\'ll respond first thing.',
      },
    ],
  },
  {
    id: 'student-life',
    name: 'Student Life',
    icon: Star,
    questions: [
      {
        q: 'What support services are available?',
        a: 'We offer comprehensive support including: academic tutoring, career counseling, mental health resources, financial assistance, transportation help, childcare assistance, and peer support groups. We\'re here to help you succeed.',
      },
      {
        q: 'Are there study groups?',
        a: 'Yes! Many programs have study groups organized by students and instructors. You can also form your own study group with classmates. Check your course page or ask your instructor about study group schedules.',
      },
      {
        q: 'Can I take breaks between modules?',
        a: 'Most programs are designed to be completed continuously for best results. However, if you need a break due to personal circumstances, talk to your advisor. We can work with you to create a plan that fits your needs.',
      },
      {
        q: 'What if I need to withdraw?',
        a: 'If you need to withdraw, contact your advisor immediately. We\'ll discuss your options, which may include: taking a temporary leave, transferring to a different program, or formal withdrawal. We want to help you succeed.',
      },
      {
        q: 'How do I request accommodations?',
        a: 'We provide accommodations for students with disabilities. Contact our student services office at elevate4humanityedu@gmail.com to discuss your needs. We\'ll work with you to ensure you have the support you need to succeed.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* FAQ Client Component handles search and filtering */}
      <FAQClient categories={faqCategories} />

      {/* Contact CTA */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-black mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Our team is here to help you find the answers you need
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="tel:+13173143757"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition border-2 border-gray-200 hover:border-blue-600"
            >
              <Phone className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <div className="font-bold text-black mb-2">Call Us</div>
              <div className="text-sm text-gray-600">(317) 314-3757</div>
            </Link>
            <Link
              href="mailto:elevate4humanityedu@gmail.com"
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition border-2 border-gray-200 hover:border-blue-600"
            >
              <Mail className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <div className="font-bold text-black mb-2">Email Us</div>
              <div className="text-sm text-gray-600">Get a response within 24 hours</div>
            </Link>
            <Link
              href="/apply"
              className="bg-blue-600 text-white rounded-xl p-6 shadow-sm hover:shadow-lg transition hover:bg-blue-700"
            >
              <Rocket className="w-10 h-10 mx-auto mb-4" />
              <div className="font-semibold">Get Started</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqCategories.flatMap((category) =>
              category.questions.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              }))
            ),
          }),
        }}
      />
    </div>
  );
}
