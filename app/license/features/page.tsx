import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { CheckCircle, Calendar, Users, BookOpen, BarChart, Settings, Shield, Zap } from 'lucide-react';
import { PLATFORM_FEATURES, ROUTES } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Platform Features | Elevate LMS',
  description: 'Explore the features of the Elevate LMS platform. Learning management, student tracking, employer portal, and more.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/license/features',
  },
};

export const dynamic = 'force-dynamic';

export default async function FeaturesPage() {
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

  // Get features from database
  const { data: dbFeatures } = await supabase
    .from('platform_features')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true })
    .order('order', { ascending: true });

  const featureCategories = [
    {
      name: 'Learning Management',
      icon: BookOpen,
      features: [
        'Course creation and management',
        'Video hosting and streaming',
        'Quizzes and assessments',
        'Progress tracking',
        'Certificates and badges',
        'SCORM/xAPI support',
      ],
    },
    {
      name: 'Student Management',
      icon: Users,
      features: [
        'Enrollment management',
        'Attendance tracking',
        'Document management',
        'Communication tools',
        'Student portal',
        'Mobile access',
      ],
    },
    {
      name: 'Reporting & Analytics',
      icon: BarChart,
      features: [
        'Real-time dashboards',
        'WIOA compliance reports',
        'Outcome tracking',
        'Custom report builder',
        'Data export',
        'API access',
      ],
    },
    {
      name: 'Administration',
      icon: Settings,
      features: [
        'Multi-tenant architecture',
        'Role-based access control',
        'White-label branding',
        'Custom workflows',
        'Integration options',
        'Audit logging',
      ],
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Platform Features</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Everything you need to run a modern workforce training program
          </p>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {featureCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className="w-8 h-8 text-orange-600" />
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                  </div>
                  <ul className="space-y-3">
                    {category.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Elevate?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <Zap className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Fast Implementation</h3>
              <p className="text-gray-600">Get up and running in weeks, not months</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <Shield className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Compliance Ready</h3>
              <p className="text-gray-600">Built-in WIOA, FERPA, and DOL compliance</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Dedicated Support</h3>
              <p className="text-gray-600">Training and support included with every license</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Integrations</h2>
          <p className="text-gray-600 mb-8">
            Connect with the tools you already use
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Salesforce', 'Workday', 'ADP', 'Zoom', 'Google Workspace', 'Microsoft 365'].map((integration) => (
              <span key={integration} className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700">
                {integration}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            See It In Action
          </h2>
          <p className="text-orange-100 mb-8">
            Schedule a personalized demo to explore all features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ROUTES.schedule}
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold hover:bg-orange-50 transition"
            >
              <Calendar className="w-5 h-5" />
              Schedule Demo
            </Link>
            <Link
              href="/license/pricing"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-700 transition"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
