import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Users,
  BookOpen,
  ArrowRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Scissors,
} from 'lucide-react';
import { BARBER_PRICING, formatFirstBillingDate } from '@/lib/programs/pricing';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Enrollment Confirmed | Barber Apprenticeship | Elevate for Humanity',
  description: 'Your enrollment in the Barber Apprenticeship program has been confirmed.',
};

export default async function EnrollmentSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const supabase = await createClient();
  
  if (!supabase) {
    redirect('/error?message=service-unavailable');
  }

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login?redirect=/programs/barber-apprenticeship/enrollment-success');
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, phone')
    .eq('id', user.id)
    .single();

  // Get subscription details if session_id provided
  let subscriptionDetails = null;
  if (searchParams.session_id) {
    const { data: session } = await supabase
      .from('payment_sessions')
      .select('*')
      .eq('stripe_session_id', searchParams.session_id)
      .single();
    
    if (session) {
      subscriptionDetails = session;
    }
  }

  // Get first billing date
  const firstBillingDate = formatFirstBillingDate();

  // Next steps for the apprentice
  const nextSteps = [
    {
      step: 1,
      title: 'Check Your Email',
      description: 'You\'ll receive a welcome email with your enrollment agreement and program details within 24 hours.',
      icon: Mail,
    },
    {
      step: 2,
      title: 'Complete Onboarding',
      description: 'Sign your enrollment agreement and complete the required onboarding documents.',
      icon: FileText,
    },
    {
      step: 3,
      title: 'Partner Shop Placement',
      description: 'We\'ll coordinate with partner shops to find the best training location for you.',
      icon: MapPin,
    },
    {
      step: 4,
      title: 'Start Training',
      description: 'Begin your 2,000-hour apprenticeship journey with hands-on training and related instruction.',
      icon: Scissors,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-slate-900">
      {/* Success Header */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Enrollment Confirmed!
          </h1>
          
          <p className="text-xl text-green-100 mb-2">
            Welcome to the Barber Apprenticeship Program
          </p>
          
          {profile?.full_name && (
            <p className="text-green-200">
              Congratulations, <span className="font-bold text-white">{profile.full_name}</span>!
            </p>
          )}
        </div>
      </div>

      {/* Payment Confirmation Card */}
      <div className="px-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="bg-slate-900 px-6 py-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                Payment Confirmation
              </h2>
            </div>

            {/* Payment Details */}
            <div className="p-6 space-y-4">
              {/* Setup Fee Paid */}
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <div className="font-semibold text-slate-900">Setup Fee Paid</div>
                  <div className="text-sm text-slate-500">One-time enrollment fee (35%)</div>
                </div>
                <div className="text-2xl font-black text-green-600">
                  ${BARBER_PRICING.setupFee.toLocaleString()}
                </div>
              </div>

              {/* Weekly Payment */}
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <div className="font-semibold text-slate-900">Weekly Payment</div>
                  <div className="text-sm text-slate-500">Based on your schedule</div>
                </div>
                <div className="text-xl font-bold text-slate-700">
                  {subscriptionDetails?.weekly_payment 
                    ? `$${subscriptionDetails.weekly_payment.toFixed(2)}/week`
                    : 'See email for details'
                  }
                </div>
              </div>

              {/* First Billing Date */}
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div>
                  <div className="font-semibold text-slate-900">First Weekly Charge</div>
                  <div className="text-sm text-slate-500">Billed every Friday at 10 AM</div>
                </div>
                <div className="text-lg font-bold text-purple-600">
                  {subscriptionDetails?.first_billing_date || firstBillingDate}
                </div>
              </div>

              {/* Program Duration */}
              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="font-semibold text-slate-900">Program Duration</div>
                  <div className="text-sm text-slate-500">2,000 hours total</div>
                </div>
                <div className="text-lg font-bold text-slate-700">
                  {subscriptionDetails?.weeks_remaining 
                    ? `~${subscriptionDetails.weeks_remaining} weeks`
                    : '15-24 months'
                  }
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                <p className="text-blue-800 text-sm">
                  <strong>Important:</strong> Weekly payments begin on{' '}
                  <span className="font-bold">{subscriptionDetails?.first_billing_date || firstBillingDate}</span>{' '}
                  and occur every Friday thereafter. Your receipt and enrollment agreement will be sent to{' '}
                  <span className="font-bold">{profile?.email || user.email}</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-white text-center mb-8">
            What Happens Next
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {nextSteps.map((item) => (
              <div
                key={item.step}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-green-400 uppercase">Step {item.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-green-100 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Links</h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/apprentice"
                className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition group"
              >
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-purple-700">
                    Apprentice Dashboard
                  </div>
                  <div className="text-xs text-slate-500">Track your progress</div>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-600 ml-auto" />
              </Link>

              <Link
                href="/apprentice/hours"
                className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition group"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-blue-700">
                    Log Hours
                  </div>
                  <div className="text-xs text-slate-500">Start tracking OJT</div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600 ml-auto" />
              </Link>

              <Link
                href="/courses"
                className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition group"
              >
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-green-700">
                    Related Instruction
                  </div>
                  <div className="text-xs text-slate-500">Milady theory courses</div>
                </div>
                <ArrowRight className="w-5 h-5 text-green-600 ml-auto" />
              </Link>

              <Link
                href="/support"
                className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition group"
              >
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-orange-700">
                    Get Support
                  </div>
                  <div className="text-xs text-slate-500">Questions? We're here</div>
                </div>
                <ArrowRight className="w-5 h-5 text-orange-600 ml-auto" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-6 pb-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-green-200 mb-4">
            Questions about your enrollment? Contact us:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-white">
            <a href="tel:+13173143757" className="flex items-center gap-2 hover:text-green-300 transition">
              <Phone className="w-4 h-4" />
              (317) 314-3757
            </a>
            <a href="mailto:elevate4humanityedu@gmail.com" className="flex items-center gap-2 hover:text-green-300 transition">
              <Mail className="w-4 h-4" />
              elevate4humanityedu@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
