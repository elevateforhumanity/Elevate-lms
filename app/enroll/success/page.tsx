import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
  PartyPopper,
} from 'lucide-react';
import ConfettiWrapper from '@/components/ConfettiWrapper';

export const metadata: Metadata = {
  title: 'Enrollment Successful | Elevate for Humanity',
  description: 'Your enrollment was successful. Welcome to Elevate for Humanity!',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/enroll/success',
  },
};

export const dynamic = 'force-dynamic';

export default async function EnrollSuccessPage() {
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

  // Get next steps content
  const { data: nextSteps } = await supabase
    .from('content_blocks')
    .select('*')
    .eq('page', 'enroll-success')
    .eq('section', 'next-steps')
    .order('order', { ascending: true });

  // Get contact info
  const { data: contactInfo } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'enrollment_contact')
    .single();

  const defaultNextSteps = [
    {
      step: 1,
      title: 'Start Learning Now',
      description: 'Your courses are ready! Access them in the Learning Portal.',
    },
    {
      step: 2,
      title: 'Check Your Email',
      description: 'We\'ve sent a confirmation email with important details.',
    },
    {
      step: 3,
      title: 'Complete Any Paperwork',
      description: 'Review and sign any required documents sent to your email.',
    },
    {
      step: 4,
      title: 'Track Your Progress',
      description: 'View your progress and earn certificates as you complete courses.',
    },
  ];

  const displayNextSteps = nextSteps && nextSteps.length > 0 ? nextSteps : defaultNextSteps;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <ConfettiWrapper />
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">
            <PartyPopper className="w-8 h-8 inline-block mr-2" aria-hidden="true" />
            Enrollment Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to Elevate for Humanity. We&apos;re excited to have you!
          </p>
        </div>

        {/* What's Next */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-black mb-6">
            What Happens Next:
          </h2>

          <div className="space-y-6">
            {displayNextSteps.map((item: any, index: number) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step || index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-50 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-lg mb-4">Questions? Contact Us</h3>
          <div className="space-y-3">
            <a 
              href="tel:3173143757" 
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
            >
              <Phone className="w-5 h-5" />
              <span>(317) 314-3757</span>
            </a>
            <a 
              href="mailto:elevate4humanityedu@gmail.com" 
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
            >
              <Mail className="w-5 h-5" />
              <span>elevate4humanityedu@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Primary Action - Start Learning */}
        <div className="mb-6">
          <Link
            href="/lms"
            className="block w-full bg-green-600 text-white px-6 py-4 rounded-lg font-bold text-center text-lg hover:bg-green-700 transition"
          >
            <ArrowRight className="w-5 h-5 inline-block mr-2" />
            Start Learning Now
          </Link>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/student/dashboard"
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-blue-700 transition"
          >
            Student Dashboard
          </Link>
          <Link
            href="/student/progress"
            className="flex-1 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-blue-50 transition"
          >
            View My Progress
          </Link>
        </div>

        {/* Schedule Orientation */}
        <div className="mt-8 text-center">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
          >
            <Calendar className="w-5 h-5" />
            Schedule Your Orientation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
