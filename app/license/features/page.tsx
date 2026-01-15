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
      <section className="bg-slate-50 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Platform Features</h1>
            <p className="text-base sm:text-xl text-slate-600">
              Everything you need to run workforce training programs.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 sm:space-y-16">
            {PLATFORM_FEATURES.map((feature, index) => {
              const Icon = iconMap[feature.id] || GraduationCap;
              const colors = colorMap[feature.id] || colorMap.lms;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={feature.id} 
                  className={`grid lg:grid-cols-2 gap-6 sm:gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 ${colors.light} rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6`}>
                      <Icon className={`w-5 h-5 sm:w-7 sm:h-7 ${colors.text}`} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-4">{feature.name}</h2>
                    <p className="text-sm sm:text-lg text-slate-600 mb-4 sm:mb-6">{feature.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {feature.capabilities.map((cap, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-700 text-sm sm:text-base">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={`${colors.light} rounded-xl sm:rounded-2xl p-6 sm:p-8 flex items-center justify-center min-h-[150px] sm:min-h-[300px] ${!isEven ? 'lg:order-1' : ''}`}>
                    <Icon className={`w-16 h-16 sm:w-32 sm:h-32 ${colors.text} opacity-30`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">See these features in action</h2>
          <p className="text-sm sm:text-base text-orange-100 mb-6 sm:mb-8">
            Schedule a live demo to explore how these features work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href={ROUTES.schedule}
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-orange-50 transition text-sm sm:text-base"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              Schedule a Demo
            </Link>
            <Link
              href={ROUTES.licenseIntegrations}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold border-2 border-white hover:bg-white/10 transition text-sm sm:text-base"
            >
              Integrations <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
