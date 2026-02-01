import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';
import { BarChart, TrendingUp, Users, FileText, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Workforce Analytics | Elevate For Humanity',
  description: 'Data-driven insights for workforce development decision making.',
};

const metrics = [
  { label: 'Participants Served', value: '12,450', change: '+15%' },
  { label: 'Completion Rate', value: '87%', change: '+3%' },
  { label: 'Employment Rate', value: '78%', change: '+5%' },
  { label: 'Avg Wage Gain', value: '$4.50/hr', change: '+8%' },
];

export default function WorkforceAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Platform' }, { label: 'Workforce Analytics' }]} />
        </div>
      </div>

      <section className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BarChart className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Workforce Analytics</h1>
          <p className="text-xl text-indigo-100 mb-8">Data-driven insights for better workforce outcomes</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {metrics.map((m, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border text-center">
                <p className="text-3xl font-bold text-gray-900">{m.value}</p>
                <p className="text-gray-600 text-sm mb-2">{m.label}</p>
                <span className="text-green-600 text-sm font-medium">{m.change} YoY</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border text-center">
            <h2 className="text-2xl font-bold mb-4">Request a Demo</h2>
            <p className="text-gray-600 mb-6">See how our analytics platform can help your organization.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700">
              Schedule Demo <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
