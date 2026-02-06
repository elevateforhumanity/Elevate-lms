import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';
import { Building, BarChart, Users, FileText, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Workforce Board Solutions | Elevate For Humanity',
  description: 'Comprehensive workforce development platform for regional workforce boards.',
};

const features = [
  { icon: Users, title: 'Participant Tracking', description: 'Track WIOA participants from enrollment to employment' },
  { icon: BarChart, title: 'Performance Metrics', description: 'Real-time dashboards for DOL reporting requirements' },
  { icon: FileText, title: 'Compliance Management', description: 'Automated documentation and audit trails' },
  { icon: Building, title: 'Provider Network', description: 'Manage training providers and program approvals' },
];

export default function WorkforceBoardsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Platform' }, { label: 'Workforce Boards' }]} />
        </div>
      </div>

      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Workforce Board Solutions</h1>
          <p className="text-xl text-blue-100 mb-8">Streamline WIOA compliance and maximize participant outcomes</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:bg-blue-50">
            Request Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border flex items-start gap-4">
                <f.icon className="w-10 h-10 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Trusted by Regional Workforce Boards</h2>
          <p className="text-gray-600 mb-8">Join the growing network of workforce boards using Elevate.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {['WIOA Compliant', 'DOL Reporting', 'Real-time Analytics', 'Secure & Auditable'].map((item, i) => (
              <span key={i} className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700">
                <CheckCircle className="w-4 h-4" /> {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
