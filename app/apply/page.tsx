import { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Building2,
  Briefcase,
  Users,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apply | Start Your Journey',
  description:
    'Choose your path: Student programs, Program holder partnership, Employer hiring, or Staff/Instructor roles.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/apply',
  },
};

/**
 * UNIFIED APPLY LANDING PAGE
 *
 * Single entry point for all application types.
 * White-label neutral - no hardcoded branding.
 * Routes to role-specific forms.
 */
export default function ApplyLandingPage() {
  const paths = [
    {
      role: 'student',
      title: 'Student Programs',
      description:
        'Enroll in workforce training, apprenticeships, and career development programs.',
      icon: GraduationCap,
      href: '/apply/student',
      color: 'emerald',
    },
    {
      role: 'program_holder',
      title: 'Program Holder Partnership',
      description:
        'Partner with us to offer training programs to your community or organization.',
      icon: Building2,
      href: '/apply/program-holder',
      color: 'blue',
    },
    {
      role: 'employer',
      title: 'Employer Hiring',
      description:
        'Post jobs, find qualified candidates, and build your workforce.',
      icon: Briefcase,
      href: '/apply/employer',
      color: 'orange',
    },
    {
      role: 'staff',
      title: 'Staff / Instructor',
      description:
        'Join our team as staff or instructor to support student success.',
      icon: Users,
      href: '/apply/staff',
      color: 'purple',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/apply-section-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white uppercase tracking-wide">
              START YOUR JOURNEY
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-8">
              Choose Your Path to Success with Elevate for Humanity
            </p>
          </div>
        </div>
      </section>

      {/* Path Selection */}
      <section className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {paths.map((path) => {
            const Icon = path.icon;
            return (
              <Link
                key={path.role}
                href={path.href}
                className="group block p-8 bg-white border-2 border-slate-200 rounded-lg hover:border-slate-400 hover:shadow-lg transition-all"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-lg bg-${path.color}-100 text-${path.color}-700 mb-4`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-bold text-black mb-2 group-hover:text-black">
                  {path.title}
                </h2>
                <p className="text-black mb-4">{path.description}</p>
                <div className="flex items-center text-sm font-semibold text-black group-hover:text-black">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Help Section */}
      <section className="max-w-6xl mx-auto px-4 py-8 mb-12">
        <div className="bg-slate-100 border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-black mb-2">
            Need Help Choosing?
          </h3>
          <p className="text-black mb-4">
            Not sure which path is right for you? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:3173143757"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Call Us: 317-314-3757
            </a>
            <a
              href="mailto:info@elevateforhumanity.org"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-slate-300 text-black font-semibold rounded-lg hover:border-slate-400 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
