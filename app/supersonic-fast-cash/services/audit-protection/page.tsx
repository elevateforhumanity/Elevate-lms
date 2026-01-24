import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Shield, FileText, Users, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Audit Protection | Peace of Mind Tax Coverage | Supersonic Fast Cash',
  description: 'Full audit protection and representation. If the IRS contacts you, we handle everything. Professional defense from IRS-certified experts.',
};

export default function AuditProtectionPage() {
  const coverageIncludes = [
    {
      title: 'Full IRS Representation',
      description: 'We handle all communication with the IRS on your behalf',
      image: '/images/programs-hq/business-training.jpg',
    },
    {
      title: 'Document Preparation',
      description: 'We prepare and organize all required documentation',
      image: '/images/programs-hq/tax-preparation.jpg',
    },
    {
      title: 'In-Person Support',
      description: 'Our experts attend any IRS meetings with you',
      image: '/images/heroes-hq/career-services-hero.jpg',
    },
    {
      title: 'Resolution Assistance',
      description: 'We work to resolve issues and minimize any penalties',
      image: '/images/programs-hq/career-success.jpg',
    },
  ];

  const benefits = [
    'No out-of-pocket costs for audit defense',
    'Experienced IRS-certified professionals',
    'Coverage for federal and state audits',
    'Protection for 3 full tax years',
    'Identity theft resolution assistance',
    '24/7 support hotline access',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <Image
          src="/images/heroes-hq/tax-refund-hero.jpg"
          alt="Audit Protection - Peace of Mind"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/95 to-red-800/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <span className="inline-block bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-6">
              FULL AUDIT REPRESENTATION
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6">
              Audit Protection <span className="text-red-300">Peace of Mind</span>
            </h1>
            <p className="text-xl text-red-100 mb-8">
              If the IRS comes knocking, we&apos;ve got your back. Our audit protection plan 
              provides full representation and defense by IRS-certified tax professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/supersonic-fast-cash/apply"
                className="inline-flex items-center justify-center gap-2 bg-white text-red-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-50 transition-colors"
              >
                Get Protected <Shield className="w-5 h-5" />
              </Link>
              <Link
                href="/supersonic-fast-cash/contact"
                className="inline-flex items-center justify-center gap-2 bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-colors border border-red-500"
              >
                <Phone className="w-5 h-5" /> Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What's Covered */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              What&apos;s Covered
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive protection when you need it most
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coverageIncludes.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-40">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/programs-hq/business-training.jpg"
                alt="Professional audit protection"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Why You Need Audit Protection
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                An IRS audit can be stressful and time-consuming. With our protection plan, 
                you can file with confidence knowing experts have your back.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">
              How Audit Protection Works
            </h2>
            <p className="text-xl text-red-200">
              Simple process, complete peace of mind
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white text-red-900 rounded-full flex items-center justify-center font-black text-3xl mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Add Protection</h3>
              <p className="text-red-200">
                Add audit protection when you file your taxes. It&apos;s affordable and easy.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white text-red-900 rounded-full flex items-center justify-center font-black text-3xl mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Get Notified</h3>
              <p className="text-red-200">
                If you receive an IRS notice, contact us immediately. We take it from there.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white text-red-900 rounded-full flex items-center justify-center font-black text-3xl mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">We Handle It</h3>
              <p className="text-red-200">
                Our experts communicate with the IRS, prepare documents, and resolve the issue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            Affordable Protection
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-red-200">
            <div className="text-6xl font-black text-red-600 mb-4">$49</div>
            <p className="text-xl text-gray-600 mb-6">
              One-time fee for 3 years of protection
            </p>
            <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Federal audit representation</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>State audit representation</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Identity theft resolution</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>24/7 support access</span>
              </li>
            </ul>
            <Link
              href="/supersonic-fast-cash/apply"
              className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-red-700 transition-colors"
            >
              Add Audit Protection <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-6">
            File With Confidence
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get your taxes done right and protect yourself from IRS audits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/supersonic-fast-cash/apply"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-blue-700 transition-colors"
            >
              Start Your Return <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/supersonic-fast-cash/services"
              className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-900 px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-300 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
