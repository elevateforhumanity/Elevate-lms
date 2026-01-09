import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Application Submitted | Elevate for Humanity',
  description: 'Your application has been successfully submitted.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/apply/success',
  },
};

export default function ApplicationSuccessPage({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const role = searchParams.role || 'student';

  const roleMessages = {
    student: {
      title: 'Student Application Submitted!',
      message:
        "We've received your application and will review it within 1-2 business days.",
      nextSteps: [
        'Check your email for a confirmation message',
        'A team member will contact you to discuss program options',
        "We'll help you explore funding options like WIOA, WRG, and apprenticeships",
        "Once approved, you'll receive access to your student dashboard",
      ],
      dashboardLink: '/lms/dashboard',
      dashboardText: 'Student Dashboard',
    },
    'program-holder': {
      title: 'Partnership Application Submitted!',
      message:
        "Thank you for your interest in partnering with us. We'll review your application and contact you soon.",
      nextSteps: [
        'Our team will review your organization details',
        "We'll schedule a call to discuss partnership opportunities",
        "You'll receive a partnership agreement for review",
        "Once verified, you'll get access to your program holder dashboard",
      ],
      dashboardLink: '/program-holder/dashboard',
      dashboardText: 'Program Holder Dashboard',
    },
    employer: {
      title: 'Employer Application Submitted!',
      message:
        "We're excited to partner with you! Our team will verify your company information and contact you shortly.",
      nextSteps: [
        "We'll verify your company information",
        'A team member will contact you within 1-2 business days',
        "We'll discuss your hiring needs and available candidates",
        "Once verified, you'll receive access to your employer dashboard",
      ],
      dashboardLink: '/employer/dashboard',
      dashboardText: 'Employer Dashboard',
    },
    staff: {
      title: 'Application Submitted!',
      message:
        "Thank you for your interest in joining our team. We'll review your application and contact you if there's a match.",
      nextSteps: [
        'Our HR team will review your application',
        "If your qualifications match our needs, we'll contact you for an interview",
        'The hiring process typically takes 1-2 weeks',
        "Once approved, you'll receive access to your staff portal",
      ],
      dashboardLink: '/staff-portal/dashboard',
      dashboardText: 'Staff Portal',
    },
  };

  const content =
    roleMessages[role as keyof typeof roleMessages] || roleMessages.student;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="bg-white border border-slate-200 rounded-lg p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {content.title}
          </h1>

          <p className="text-lg text-slate-700 mb-8">{content.message}</p>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              What Happens Next?
            </h2>
            <ol className="space-y-3">
              {content.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Return Home
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href={content.dashboardLink}
              className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-slate-400 transition-colors"
            >
              {content.dashboardText}
            </Link>
          </div>

          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Need Help?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:3173143757"
                className="inline-flex items-center justify-center text-slate-700 hover:text-emerald-600 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                <span className="font-semibold">317-314-3757</span>
              </a>
              <a
                href="mailto:info@elevateforhumanity.institute"
                className="inline-flex items-center justify-center text-slate-700 hover:text-emerald-600 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                <span className="font-semibold">
                  info@elevateforhumanity.institute
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
