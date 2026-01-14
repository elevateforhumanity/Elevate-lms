import { Metadata } from 'next';
import Link from 'next/link';
import { 
  GraduationCap, Route, ClipboardCheck, Handshake, BarChart3,
  Calendar, ArrowRight, CheckCircle
} from 'lucide-react';
import { PLATFORM_FEATURES, ROUTES } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Platform Features | Elevate LMS Licensing',
  description: 'LMS delivery, program management, intake workflows, employer partnerships, and compliance reporting. Everything you need for workforce training.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/license/features',
  },
};

const iconMap: Record<string, typeof GraduationCap> = {
  lms: GraduationCap,
  programs: Route,
  intake: ClipboardCheck,
  employer: Handshake,
  reporting: BarChart3,
};

const colorMap: Record<string, { bg: string; light: string; text: string }> = {
  lms: { bg: 'bg-orange-600', light: 'bg-orange-100', text: 'text-orange-600' },
  programs: { bg: 'bg-blue-600', light: 'bg-blue-100', text: 'text-blue-600' },
  intake: { bg: 'bg-green-600', light: 'bg-green-100', text: 'text-green-600' },
  employer: { bg: 'bg-purple-600', light: 'bg-purple-100', text: 'text-purple-600' },
  reporting: { bg: 'bg-slate-600', light: 'bg-slate-100', text: 'text-slate-600' },
};

export default function FeaturesPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Platform Features</h1>
            <p className="text-xl text-slate-600">
              Everything you need to run workforce training programs, from course delivery to employer partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {PLATFORM_FEATURES.map((feature, index) => {
              const Icon = iconMap[feature.id] || GraduationCap;
              const colors = colorMap[feature.id] || colorMap.lms;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={feature.id} 
                  className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    <div className={`w-14 h-14 ${colors.light} rounded-xl flex items-center justify-center mb-6`}>
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">{feature.name}</h2>
                    <p className="text-lg text-slate-600 mb-6">{feature.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {feature.capabilities.map((cap, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-700">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={`${colors.light} rounded-2xl p-8 flex items-center justify-center min-h-[300px] ${!isEven ? 'lg:order-1' : ''}`}>
                    <Icon className={`w-32 h-32 ${colors.text} opacity-30`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">See these features in action</h2>
          <p className="text-orange-100 mb-8">
            Schedule a live demo to explore how these features work for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ROUTES.schedule}
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Demo
            </Link>
            <Link
              href={ROUTES.licenseIntegrations}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg font-semibold border-2 border-white hover:bg-white/10 transition"
            >
              View Integrations <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
