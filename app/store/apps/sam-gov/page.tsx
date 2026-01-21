import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Play, ShoppingCart, Star, Shield, Zap, FileText, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SAM.gov Registration & Compliance App | Elevate Store',
  description: 'Streamline your SAM.gov registration and maintain compliance. Automated UEI lookup, entity validation, annual renewal reminders, and government contracting readiness tools.',
  keywords: ['SAM.gov', 'SAM registration', 'UEI number', 'government contracting', 'federal registration', 'CAGE code', 'entity validation'],
  openGraph: {
    title: 'SAM.gov Registration & Compliance App',
    description: 'Streamline your SAM.gov registration and maintain compliance for government contracting.',
    images: ['/images/store/sam-gov-app.jpg'],
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store/apps/sam-gov',
  },
};

const features = [
  { icon: FileText, title: 'Automated Registration', desc: 'Step-by-step SAM.gov registration wizard with validation' },
  { icon: Shield, title: 'Compliance Monitoring', desc: 'Track expiration dates and renewal requirements' },
  { icon: Building2, title: 'UEI Management', desc: 'Unique Entity Identifier lookup and verification' },
  { icon: Zap, title: 'CAGE Code Support', desc: 'Commercial and Government Entity code assistance' },
];

const pricing = [
  { name: 'Starter', price: 49, period: '/month', features: ['1 Entity Registration', 'Basic Compliance Alerts', 'Email Support', 'UEI Lookup'] },
  { name: 'Professional', price: 149, period: '/month', features: ['5 Entity Registrations', 'Advanced Compliance Dashboard', 'Priority Support', 'CAGE Code Management', 'Annual Renewal Automation'], popular: true },
  { name: 'Enterprise', price: 399, period: '/month', features: ['Unlimited Entities', 'White-label Options', 'Dedicated Account Manager', 'API Access', 'Custom Integrations', 'SLA Guarantee'] },
];

export default function SamGovAppPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">GOVERNMENT</span>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  <span className="text-sm ml-1">4.9 (127 reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SAM.gov Registration & Compliance App
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Simplify federal contractor registration. Automate compliance tracking, manage multiple entities, and never miss a renewal deadline.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/store/cart?add=sam-gov-pro"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart - $149/mo
                </Link>
                <button className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">Product Demo Video</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">See It In Action</h2>
          <p className="text-gray-600 mb-8">Watch how easy it is to register and maintain SAM.gov compliance</p>
          <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="w-20 h-20 mx-auto mb-4 opacity-80" />
              <p className="text-lg">Full Product Walkthrough</p>
              <p className="text-sm text-gray-400">12 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-gray-600 text-center mb-12">Choose the plan that fits your needs</p>
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, i) => (
              <div key={i} className={`rounded-2xl p-8 ${plan.popular ? 'bg-blue-600 text-white ring-4 ring-blue-300' : 'bg-white border border-gray-200'}`}>
                {plan.popular && <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>}
                <h3 className={`text-2xl font-bold mt-4 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className={plan.popular ? 'text-blue-100' : 'text-gray-500'}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <Check className={`w-5 h-5 ${plan.popular ? 'text-blue-200' : 'text-green-500'}`} />
                      <span className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/store/cart?add=sam-gov-${plan.name.toLowerCase()}`}
                  className={`block w-full text-center py-3 rounded-lg font-bold transition-colors ${
                    plan.popular 
                      ? 'bg-white text-blue-600 hover:bg-gray-100' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 inline mr-2" />
                  Add to Cart
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Simplify SAM.gov Compliance?</h2>
          <p className="text-gray-300 mb-8">Start your free 14-day trial today. No credit card required.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/store/cart?add=sam-gov-pro" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold">
              Start Free Trial
            </Link>
            <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
