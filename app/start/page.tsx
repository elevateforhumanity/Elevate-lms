import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Briefcase, 
  GraduationCap,
  Heart,
  Clock,
  DollarSign,
  Building2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Find Your Pathway | Start Your Career Training Journey',
  description: 'Take the first step toward a new career. Explore training programs, check eligibility for funding, and connect with employers in Indiana.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/start',
  },
};

const PATHWAYS = [
  {
    title: 'I Want to Train for a New Career',
    description: 'Explore programs in healthcare, skilled trades, technology, and more.',
    icon: GraduationCap,
    href: '/programs',
    color: 'blue',
  },
  {
    title: 'I Want to Earn While I Learn',
    description: 'Find apprenticeships and employer-based training opportunities.',
    icon: DollarSign,
    href: '/programs/apprenticeships',
    color: 'green',
  },
  {
    title: 'I Need Help with Funding',
    description: 'Check if you qualify for WIOA, WRG, or other funding assistance.',
    icon: Briefcase,
    href: '/funding',
    color: 'purple',
  },
  {
    title: 'I Have a Background (Second Chance)',
    description: 'Many programs welcome justice-involved individuals.',
    icon: Heart,
    href: '/programs?filter=second-chance',
    color: 'amber',
  },
];

export default function StartPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-black mb-4">
            Find Your Pathway
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Take the first step toward a new career. We'll help you find the right program and funding.
          </p>
        </div>
      </section>

      {/* Pathway Cards */}
      <section className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-10">
            What brings you here today?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {PATHWAYS.map((pathway, index) => {
              const Icon = pathway.icon;
              const colorClasses = {
                blue: 'bg-blue-50 border-blue-200 hover:border-blue-400',
                green: 'bg-green-50 border-green-200 hover:border-green-400',
                purple: 'bg-purple-50 border-purple-200 hover:border-purple-400',
                amber: 'bg-amber-50 border-amber-200 hover:border-amber-400',
              };
              const iconColors = {
                blue: 'bg-blue-600',
                green: 'bg-green-600',
                purple: 'bg-purple-600',
                amber: 'bg-amber-600',
              };

              return (
                <Link
                  key={index}
                  href={pathway.href}
                  className={`block p-6 rounded-xl border-2 transition-all hover:shadow-lg ${colorClasses[pathway.color as keyof typeof colorClasses]}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${iconColors[pathway.color as keyof typeof iconColors]}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black mb-2">{pathway.title}</h3>
                      <p className="text-slate-600">{pathway.description}</p>
                      <span className="inline-flex items-center gap-1 mt-3 text-blue-600 font-semibold">
                        Get Started <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Steps */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-10">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Explore Programs', desc: 'Browse career training options' },
              { step: 2, title: 'Check Eligibility', desc: 'See if you qualify for funding' },
              { step: 3, title: 'Apply', desc: 'Submit your application' },
              { step: 4, title: 'Start Training', desc: 'Begin your new career path' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-black mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-slate-100">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Talk to an advisor who can help you find the right program and funding options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-800 font-bold rounded-lg hover:bg-slate-50 transition-colors border-2 border-slate-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
