import { Metadata } from 'next';
import Link from 'next/link';
import { 
  CheckCircle, 
  Calendar,
  Shield,
  Clock,
  Headphones,
  BarChart3,
  ArrowRight,
  Server,
  Lock,
  RefreshCw
} from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Managed Workforce OS | Elevate for Humanity',
  description: 'Fully managed workforce operating system. We operate it, you use it. Zero engineering burden, guaranteed uptime, compliance reporting included.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/managed',
  },
};

const includedFeatures = [
  'Full platform access (all 7 portals)',
  'Automated enrollment orchestration',
  'WIOA/WRG/JRI compliance reporting',
  'Credential issuance and verification',
  'Employer pipeline integration',
  'Progress tracking and nudges',
  'Audit logs and activity tracking',
  'Data exports and API access',
];

const managedServices = [
  { icon: Shield, title: '99.9% Uptime SLA', description: 'Guaranteed availability with proactive monitoring' },
  { icon: Headphones, title: 'Dedicated Support', description: 'Priority support with named account manager' },
  { icon: Clock, title: 'Same-Day Updates', description: 'Security patches and feature updates deployed automatically' },
  { icon: BarChart3, title: 'Compliance Reporting', description: 'Automated DOL/DWD reports generated on schedule' },
];

const pricingTiers = [
  {
    name: 'Starter',
    price: 1500,
    period: 'month',
    description: 'For small training providers getting started',
    features: [
      'Up to 100 active learners',
      'Core LMS features',
      'Basic compliance reports',
      'Email support',
      '99.5% uptime SLA',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: 2500,
    period: 'month',
    description: 'For established providers with multiple programs',
    features: [
      'Up to 500 active learners',
      'All platform features',
      'Advanced compliance automation',
      'Priority support',
      '99.9% uptime SLA',
      'Custom branding',
    ],
    cta: 'Schedule Demo',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: null,
    period: 'custom',
    description: 'For large organizations and workforce boards',
    features: [
      'Unlimited learners',
      'Multi-tenant configuration',
      'Dedicated account manager',
      'Custom integrations',
      '99.99% uptime SLA',
      'On-site training available',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function ManagedPlatformPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Managed Platform' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-block bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Managed Service — We Operate, You Use
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Managed Workforce OS
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              We operate it. You use it. Zero engineering burden, guaranteed uptime, 
              compliance reporting included. Focus on outcomes, not infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                <Calendar className="w-5 h-5" />
                Schedule Demo
              </Link>
              <Link
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                View Pricing
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What This Is */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">What This Is</h2>
            <p className="text-gray-700 text-lg mb-6">
              A <strong>subscription service</strong> where we host, operate, and maintain the entire 
              Workforce OS platform for you. You get outcomes, uptime, support, and compliance 
              reporting — with zero engineering burden on your team.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Server className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold">We Host</div>
                  <div className="text-sm text-gray-600">Infrastructure managed by us</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold">We Update</div>
                  <div className="text-sm text-gray-600">Automatic security and features</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <div className="font-semibold">No Source Access</div>
                  <div className="text-sm text-gray-600">Platform only, not code</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What's Included</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to run workforce programs without managing infrastructure
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {includedFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg border">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Managed Services */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Fully Managed</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We handle operations, security, updates, and compliance so you don't have to
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {managedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Simple, Predictable Pricing</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Monthly subscription includes platform access, support, and all updates
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl p-8 border-2 ${
                  tier.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                }`}
              >
                {tier.popular && (
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold mt-4">{tier.name}</h3>
                <div className="my-4">
                  {tier.price ? (
                    <>
                      <span className="text-4xl font-bold">${tier.price.toLocaleString()}</span>
                      <span className="text-gray-500">/{tier.period}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-gray-700">Custom Pricing</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.price ? '/schedule' : '/contact'}
                  className={`block text-center py-3 rounded-lg font-semibold transition ${
                    tier.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contract Terms */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contract Terms</h2>
          <div className="bg-slate-50 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">What's Included</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Monthly subscription fee</li>
                  <li>• Implementation and onboarding</li>
                  <li>• Ongoing support and maintenance</li>
                  <li>• All platform updates</li>
                  <li>• Data backup and recovery</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Service Level Agreement</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Uptime guarantee (tier-dependent)</li>
                  <li>• Response time commitments</li>
                  <li>• Scheduled maintenance windows</li>
                  <li>• Incident communication</li>
                  <li>• Data retention standards</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t">
              <p className="text-gray-500 text-sm text-center">
                <strong>Note:</strong> This is a managed service subscription. No source code access. 
                No self-hosting. For enterprise source-use rights, see{' '}
                <Link href="/enterprise" className="text-blue-600 hover:underline">
                  Enterprise Source-Use
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-8">
            Schedule a demo to see the platform in action and discuss your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/schedule"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition"
            >
              Schedule Demo
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
