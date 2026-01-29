'use client';

import Link from 'next/link';
import { StateConfig, getOtherStates } from '@/config/states';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface StateCommunityServicesPageProps {
  state: StateConfig;
}

const SERVICES = [
  { title: 'Job Placement', desc: 'Resume building, interview prep, employer connections' },
  { title: 'Financial Literacy', desc: 'Budgeting, credit repair, savings programs' },
  { title: 'Housing Assistance', desc: 'Rental support, homebuyer education, emergency aid' },
  { title: 'Family Services', desc: 'Childcare resources, parenting support, youth programs' },
  { title: 'Benefits Navigation', desc: 'SNAP, Medicaid, TANF application assistance' },
  { title: 'Transportation', desc: 'Bus passes, car repair assistance, rideshare programs' },
];

export default function StateCommunityServicesPage({ state }: StateCommunityServicesPageProps) {
  const otherStates = getOtherStates(state.slug);

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Community Services', href: '/community-services' }, { label: state.name }]} />
        </div>
      </div>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          {state.communityServices.headline}
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          {state.communityServices.description}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((service) => (
            <div key={service.title} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-green-600 text-white p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Need Support? We&apos;re Here to Help</h2>
          <p className="mb-6">Connect with our team to find the resources you need.</p>
          <Link href="/contact" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Contact Us
          </Link>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Also in {state.name}</h3>
            <Link href={`/career-training-${state.slug}`} className="text-blue-600 hover:underline block">
              Career Training Programs →
            </Link>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-3">Other States</h3>
            <div className="space-y-1">
              {otherStates.map((s) => (
                <Link 
                  key={s.slug} 
                  href={`/community-services-${s.slug}`} 
                  className="text-green-600 hover:underline block"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Serving: {state.majorCities.join(', ')}</p>
          <div className="mt-4 space-x-4">
            <Link href="/locations" className="text-green-600 hover:underline">All Locations</Link>
            <Link href="/programs" className="text-green-600 hover:underline">All Programs</Link>
            <Link href="/contact" className="text-green-600 hover:underline">Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
