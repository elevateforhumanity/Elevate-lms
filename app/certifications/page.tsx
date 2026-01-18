import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Award, CheckCircle, ArrowRight, Shield, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industry Certifications | Elevate for Humanity',
  description: 'Earn industry-recognized certifications that employers value. Healthcare, skilled trades, technology, and more.',
  alternates: { canonical: 'https://www.elevateforhumanity.org/certifications' },
};

export default function CertificationsPage() {
  const certifications = [
    { name: 'Certified Medical Assistant (CMA)', industry: 'Healthcare', duration: '12 weeks', demand: 'High' },
    { name: 'Certified Phlebotomy Technician (CPT)', industry: 'Healthcare', duration: '6 weeks', demand: 'High' },
    { name: 'EPA 608 Certification', industry: 'HVAC', duration: '2 weeks', demand: 'High' },
    { name: 'OSHA 10/30 Safety', industry: 'Construction', duration: '1-3 days', demand: 'Required' },
    { name: 'CompTIA A+', industry: 'Technology', duration: '8 weeks', demand: 'High' },
    { name: 'Barber License', industry: 'Beauty', duration: '1500 hours', demand: 'Required' },
  ];

  return (
    <div className="bg-white">
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Certifications</span>
          </nav>
        </div>
      </div>

      <section className="relative h-[350px] flex items-center justify-center text-white overflow-hidden">
        <Image src="/images/hero/hero-certifications.jpg" alt="Certifications" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-white/80" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Industry Certifications</h1>
          <p className="text-xl text-green-100">Credentials that open doors to career opportunities</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Available Certifications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <Award className="w-10 h-10 text-green-600" />
                  <span className={`text-xs font-bold px-2 py-1 rounded ${cert.demand === 'Required' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {cert.demand} Demand
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center"><Shield className="w-4 h-4 mr-2" />{cert.industry}</p>
                  <p className="flex items-center"><Clock className="w-4 h-4 mr-2" />{cert.duration}</p>
                </div>
                <Link href="/programs" className="mt-4 text-green-600 font-medium hover:text-green-700 inline-flex items-center">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Certifications Matter</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, title: 'Employer Recognition', desc: 'Certifications prove your skills to employers' },
              { icon: Users, title: 'Higher Earnings', desc: 'Certified professionals earn 15-20% more' },
              { icon: Shield, title: 'Career Advancement', desc: 'Required for many positions and promotions' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <item.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get Certified Today</h2>
          <p className="text-xl text-green-100 mb-8">Start your journey toward industry-recognized credentials.</p>
          <Link href="/apply" className="bg-white hover:bg-gray-100 text-green-700 px-8 py-4 rounded-lg text-lg font-bold transition inline-flex items-center">
            Apply Now <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
