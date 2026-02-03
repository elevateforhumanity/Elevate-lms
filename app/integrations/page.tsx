import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { 
  Search, 
  CheckCircle, 
  ArrowRight, 
  Plug, 
  Video, 
  Calendar, 
  CreditCard,
  Users,
  FileText,
  BarChart3,
  MessageSquare,
  Shield,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Integrations Marketplace | Elevate Platform',
  description: 'Connect Elevate with your favorite tools. Native integrations with Zoom, Microsoft Teams, Google Workspace, Salesforce, and 50+ more applications.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/integrations',
  },
};

const categories = [
  { id: 'all', name: 'All Integrations', count: 52 },
  { id: 'video', name: 'Video Conferencing', count: 4, icon: Video },
  { id: 'calendar', name: 'Calendar & Scheduling', count: 5, icon: Calendar },
  { id: 'payment', name: 'Payments', count: 6, icon: CreditCard },
  { id: 'hr', name: 'HR & Payroll', count: 8, icon: Users },
  { id: 'content', name: 'Content & Authoring', count: 7, icon: FileText },
  { id: 'analytics', name: 'Analytics & BI', count: 5, icon: BarChart3 },
  { id: 'communication', name: 'Communication', count: 6, icon: MessageSquare },
  { id: 'security', name: 'Security & SSO', count: 5, icon: Shield },
  { id: 'automation', name: 'Automation', count: 6, icon: Zap },
];

const featuredIntegrations = [
  {
    name: 'Zoom',
    category: 'Video Conferencing',
    description: 'Host live virtual classes, webinars, and one-on-one sessions directly from the LMS.',
    logo: '/images/integrations/zoom.svg',
    features: ['Auto-create meetings', 'Attendance tracking', 'Recording sync'],
    popular: true,
  },
  {
    name: 'Microsoft Teams',
    category: 'Collaboration',
    description: 'Integrate with Teams for messaging, video calls, and collaborative learning.',
    logo: '/images/integrations/teams.svg',
    features: ['SSO integration', 'Channel notifications', 'File sharing'],
    popular: true,
  },
  {
    name: 'Google Workspace',
    category: 'Productivity',
    description: 'Connect Google Calendar, Drive, and Meet for seamless productivity.',
    logo: '/images/integrations/google.svg',
    features: ['Calendar sync', 'Drive storage', 'Meet integration'],
    popular: true,
  },
  {
    name: 'Salesforce',
    category: 'CRM',
    description: 'Sync learner data with Salesforce for employer partnerships and recruitment.',
    logo: '/images/integrations/salesforce.svg',
    features: ['Contact sync', 'Opportunity tracking', 'Custom objects'],
    popular: true,
  },
  {
    name: 'Workday',
    category: 'HRIS',
    description: 'Integrate with Workday for employee learning and development tracking.',
    logo: '/images/integrations/workday.svg',
    features: ['Employee sync', 'Learning assignments', 'Completion reporting'],
    popular: false,
  },
  {
    name: 'ADP',
    category: 'Payroll',
    description: 'Connect ADP for workforce management and compliance training tracking.',
    logo: '/images/integrations/adp.svg',
    features: ['Employee import', 'Training compliance', 'Certification tracking'],
    popular: false,
  },
  {
    name: 'Stripe',
    category: 'Payments',
    description: 'Accept payments for courses, certifications, and subscriptions.',
    logo: '/images/integrations/stripe.svg',
    features: ['One-time payments', 'Subscriptions', 'Invoicing'],
    popular: true,
  },
  {
    name: 'LinkedIn Learning',
    category: 'Content',
    description: 'Access LinkedIn Learning content library within your LMS.',
    logo: '/images/integrations/linkedin.svg',
    features: ['Content catalog', 'Progress sync', 'Completion tracking'],
    popular: false,
  },
  {
    name: 'Articulate 360',
    category: 'Authoring',
    description: 'Import SCORM courses created with Articulate Storyline and Rise.',
    logo: '/images/integrations/articulate.svg',
    features: ['SCORM import', 'xAPI support', 'Review integration'],
    popular: false,
  },
  {
    name: 'Okta',
    category: 'SSO',
    description: 'Enterprise single sign-on with Okta identity management.',
    logo: '/images/integrations/okta.svg',
    features: ['SAML 2.0', 'SCIM provisioning', 'MFA support'],
    popular: false,
  },
  {
    name: 'Zapier',
    category: 'Automation',
    description: 'Connect to 5,000+ apps with Zapier automation workflows.',
    logo: '/images/integrations/zapier.svg',
    features: ['Triggers & actions', 'Multi-step zaps', 'Custom workflows'],
    popular: true,
  },
  {
    name: 'Tableau',
    category: 'Analytics',
    description: 'Advanced analytics and visualization with Tableau dashboards.',
    logo: '/images/integrations/tableau.svg',
    features: ['Data export', 'Live connection', 'Custom dashboards'],
    popular: false,
  },
];

const integrationTypes = [
  {
    name: 'Native Integrations',
    description: 'Pre-built connectors with one-click setup',
    count: '50+',
  },
  {
    name: 'LTI Tools',
    description: 'Learning Tools Interoperability connections',
    count: '100+',
  },
  {
    name: 'API Connections',
    description: 'Custom integrations via REST API',
    count: 'Unlimited',
  },
  {
    name: 'Webhooks',
    description: 'Real-time event notifications',
    count: '25+ events',
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Integrations' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Plug className="w-4 h-4" />
              Integration Marketplace
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connect Your Entire Tech Stack
            </h1>
            <p className="text-xl text-purple-200 mb-8">
              50+ native integrations, LTI tool support, and a developer API to 
              connect Elevate with the tools your organization already uses.
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search integrations..."
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Integration Types */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrationTypes.map((type) => (
              <div key={type.name} className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">{type.count}</div>
                <div className="font-semibold text-gray-900">{type.name}</div>
                <div className="text-sm text-gray-600">{type.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm ${
                      cat.id === 'all' 
                        ? 'bg-purple-100 text-purple-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-gray-500">{cat.count}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Featured Integrations</h2>
                <span className="text-sm text-gray-500">52 integrations</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredIntegrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="bg-white rounded-xl border-2 border-gray-100 p-6 hover:border-purple-300 hover:shadow-lg transition"
                  >
                    {integration.popular && (
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded mb-3">
                        Popular
                      </span>
                    )}
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <Plug className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{integration.name}</h3>
                    <p className="text-xs text-purple-600 mb-2">{integration.category}</p>
                    <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                    <ul className="space-y-1">
                      {integration.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Build Custom Integrations
                </h2>
                <p className="text-slate-300 mb-6">
                  Use our REST API, webhooks, and SDKs to build custom integrations 
                  for your specific workflow needs.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/docs/api"
                    className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    API Documentation <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/platform/standards"
                    className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                  >
                    View Standards
                  </Link>
                </div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 font-mono text-sm">
                <div className="text-slate-400 mb-2"># Webhook example</div>
                <div className="text-green-400">POST /webhooks/course-complete</div>
                <div className="text-white mt-2">{'{'}</div>
                <div className="text-white pl-4">"event": "course.completed",</div>
                <div className="text-white pl-4">"learner_id": "usr_123",</div>
                <div className="text-white pl-4">"course_id": "crs_456",</div>
                <div className="text-white pl-4">"score": 94,</div>
                <div className="text-white pl-4">"timestamp": "2025-02-03T..."</div>
                <div className="text-white">{'}'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need a Custom Integration?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Our team can help you connect Elevate with any system in your tech stack.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-purple-50 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
