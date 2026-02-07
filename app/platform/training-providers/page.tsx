import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';
import { GraduationCap, DollarSign, Users, BarChart, Circle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Training Provider Solutions | Elevate For Humanity',
  description: 'Grow your training business with our comprehensive LMS and student management platform.',
};

const benefits = [
  { icon: Users, title: 'Reach More Students', description: 'Access our network of funded learners' },
  { icon: DollarSign, title: 'Streamlined Payments', description: 'Get paid faster with automated billing' },
  { icon: GraduationCap, title: 'LMS Platform', description: 'Deliver courses online with our tools' },
  { icon: BarChart, title: 'Track Outcomes', description: 'Measure and report student success' },
];

export default function TrainingProvidersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Platform' }, { label: 'Training Providers' }]} />
        </div>
      </div>

      <section className="bg-teal-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">For Training Providers</h1>
          <p className="text-xl text-teal-100 mb-8">Grow your training business and reach more students</p>
          <Link href="/partners/join" className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-full font-bold hover:bg-teal-50">
            Become a Provider <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Why Partner With Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border flex items-start gap-4">
                <b.icon className="w-10 h-10 text-teal-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="text-gray-600">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
