import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  Phone,
  Users,
  Building2,
  GraduationCap,
  Briefcase,
  DollarSign,
  FileCheck,
  ArrowRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How Elevate Works | Workforce Coordination Hub',
  description:
    'Understand how Elevate for Humanity coordinates access to training, funding, and career opportunities without replacing local authority or ownership.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/how-it-works',
  },
};

export const dynamic = 'force-dynamic';

export default async function HowItWorksPage() {
  const supabase = await createClient();

  // Get process steps from database
  const { data: processSteps } = await supabase
    .from('process_steps')
    .select('*')
    .eq('page', 'how-it-works')
    .order('order', { ascending: true });

  // Get FAQs
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .eq('category', 'how-it-works')
    .eq('is_active', true)
    .order('order', { ascending: true });

  // Get partner organizations
  const { data: partners } = await supabase
    .from('partners')
    .select('id, name, logo_url, type')
    .eq('is_active', true)
    .limit(6);

  const defaultSteps = [
    {
      number: 1,
      title: 'Apply Online or Call',
      description: 'Complete a simple application or call us directly. We assess your eligibility for free training.',
      icon: FileCheck,
    },
    {
      number: 2,
      title: 'Get Matched to Funding',
      description: 'We connect you with WIOA, WRG, JRI, or other funding sources that cover your training costs.',
      icon: DollarSign,
    },
    {
      number: 3,
      title: 'Enroll in Training',
      description: 'Start your program at one of our partner training providers. We handle all the paperwork.',
      icon: GraduationCap,
    },
    {
      number: 4,
      title: 'Get Certified & Hired',
      description: 'Earn industry credentials and connect with employers actively hiring in your field.',
      icon: Briefcase,
    },
  ];

  const displaySteps = processSteps && processSteps.length > 0 ? processSteps : defaultSteps;

  return (
    <div className="min-h-screen bg-white">
      {/* Video Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center bg-black">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/artlist/hero-training-1.jpg"
        >
          <source src="https://cms-artifacts.artlist.io/content/generated-video-v1/video__3/generated-video-0ce1b0b1-bda4-4d15-9273-07ecb6c6db95.mp4?Expires=2083815719&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=IMGjXRJiwqTkyQS3i4UNDu0UAOjebfNis2X16LclsmXfwscpriVKt~zchpsBDR~fJrsn4FagVcLksow2iEi4DJ7y9CpM~S12SrapFt7GibaN33FKfbFqz7DdZNlJo-6wc2kuF4jx5xPuqVFR4Njvt1qKjHnWR6w08W4yKGGIvwrWmDEy6K~tOaMVh95owTYZVxtvUIQKda5afYZK9J0pjlBNUqVQnQaz3HyDONNn9Vx9D6EdSHStO-jL1l5r6u4VZ1sr5fhrr5Rqd7I9u3hXMGMrUgukmYvcRJeLjgzeXK0QvfBsFvFZ~qLEMDxdOFudRXqWKpjmwtTOJ57UHzNXTQ__" type="video/mp4" />
        </video>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              How Elevate Works
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              We coordinate access to training, funding, and career opportunities.
              <br />
              We don't replace schools, certify credentials, or control outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </Link>
              <a
                href="tel:+13173143757"
                className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Call (317) 314-3757
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Are */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Elevate Is
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Workforce Coordination Hub
              </h3>
              <p className="text-gray-600">
                We connect people to training programs, funding sources, and
                career pathways across multiple jurisdictions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-Tenant Platform</h3>
              <p className="text-gray-600">
                Organizations license our platform to manage their own programs,
                students, and outcomes while maintaining full control.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Training Navigator</h3>
              <p className="text-gray-600">
                We help individuals find the right training program and funding
                source for their career goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Are NOT */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Elevate Is NOT
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <div className="flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Not a School</h3>
                  <p className="text-gray-600">
                    We don't teach classes, issue grades, or grant degrees. Training
                    is delivered by accredited partner institutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <div className="flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Not a Certifying Body</h3>
                  <p className="text-gray-600">
                    We don't issue certifications or credentials. Those come from
                    industry-recognized certifying organizations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <div className="flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Not a Staffing Agency</h3>
                  <p className="text-gray-600">
                    We don't employ graduates or take placement fees. We connect
                    trained individuals directly with hiring employers.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <div className="flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Not a Funding Source</h3>
                  <p className="text-gray-600">
                    We don't provide grants or loans. We help you access existing
                    funding programs like WIOA, WRG, and JRI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enrollment Process Clarification */}
          <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-lg font-bold mb-3 text-blue-900">How Enrollment Works</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Funded Programs (WIOA, WRG, JRI)</h4>
                <p className="text-blue-700">
                  All funded program enrollments require an application and advisor review. 
                  We verify eligibility, match you with the right program, and coordinate 
                  with funding sources. There is no instant checkout—this ensures you're 
                  set up for success.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Fee-Based Programs & Courses</h4>
                <p className="text-blue-700">
                  Some programs (like Barber Apprenticeship) and individual courses have 
                  tuition fees. These still require an application and enrollment agreement. 
                  Payment is collected after approval, not before.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Your Path to a New Career
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Four simple steps from application to employment
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {displaySteps.map((step: any, index: number) => {
              const IconComponent = step.icon || FileCheck;
              return (
                <div key={step.number || index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {step.number || index + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                  {index < displaySteps.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-gray-300 mx-auto mt-4 hidden md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners */}
      {partners && partners.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Partners
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {partners.map((partner: any) => (
                <div key={partner.id} className="flex items-center justify-center">
                  {partner.logo_url ? (
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="max-h-12 object-contain grayscale hover:grayscale-0 transition"
                    />
                  ) : (
                    <span className="text-gray-500 font-medium">{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq: any) => (
                <div key={faq.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Apply today and see if you qualify for free training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </Link>
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800 transition-colors"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
