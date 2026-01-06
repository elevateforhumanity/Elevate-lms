import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, CheckCircle, Shield, Clock, MapPin } from 'lucide-react';
import CheckoutButton from '@/components/drug-testing/CheckoutButton';

export const metadata: Metadata = {
  title: 'Drug Testing Services | Elevate for Humanity',
  description:
    'Professional drug testing services for workforce programs. DOT and non-DOT testing, nationwide collection sites, MRO review included.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/drug-testing',
  },
};

// NDS Prices with 40% markup
const drugTestingServices = {
  urine: [
    {
      name: 'DOT Urine Drug Test',
      ndsPrice: 75,
      price: 105, // 40% markup
      description: 'DOT-compliant 5-panel urine drug test with MRO review',
      popular: true,
    },
    {
      name: '5 Panel Drug Test',
      ndsPrice: 69,
      price: 97,
      description: 'Standard 5-panel urine drug test (COC, THC, OPI, AMP, PCP)',
    },
    {
      name: '10 Panel Drug Test',
      ndsPrice: 69,
      price: 97,
      description: 'Expanded 10-panel urine drug test',
    },
    {
      name: '5 Panel + Expanded Opiates',
      ndsPrice: 75,
      price: 105,
      description: 'Includes testing for synthetic opioids',
    },
    {
      name: '4 Panel (NO THC)',
      ndsPrice: 75,
      price: 105,
      description: 'Drug test without marijuana for states with legal cannabis',
    },
    {
      name: '5 Panel + Alcohol',
      ndsPrice: 85,
      price: 119,
      description: '5-panel drug test plus alcohol screening',
    },
    {
      name: '10 Panel + Alcohol',
      ndsPrice: 85,
      price: 119,
      description: '10-panel drug test plus alcohol screening',
    },
    {
      name: '5 Panel + Alcohol EtG',
      ndsPrice: 169,
      price: 237,
      description: '5-panel plus EtG alcohol test (detects up to 80 hours)',
    },
    {
      name: '10 Panel + Alcohol EtG + Exp Opi',
      ndsPrice: 179,
      price: 251,
      description: 'Comprehensive test with extended alcohol detection',
    },
    {
      name: '5 Panel + Nicotine',
      ndsPrice: 103,
      price: 144,
      description: '5-panel drug test plus nicotine/cotinine screening',
    },
  ],
  instant: [
    {
      name: 'Instant Rapid 5 Panel',
      ndsPrice: 60,
      price: 84,
      description: 'Rapid on-site testing with immediate results',
    },
    {
      name: 'Instant Rapid 10 Panel',
      ndsPrice: 69,
      price: 97,
      description: 'Rapid 10-panel on-site testing',
    },
    {
      name: 'Instant Rapid 4 Panel (NO THC)',
      ndsPrice: 60,
      price: 84,
      description: 'Rapid testing without marijuana',
    },
    {
      name: 'Instant Rapid 9 Panel (NO THC)',
      ndsPrice: 65,
      price: 91,
      description: 'Expanded rapid testing without marijuana',
    },
  ],
  hair: [
    {
      name: 'Hair Drug Test 10 Panel',
      ndsPrice: 294,
      price: 412,
      description: 'Hair follicle testing (90-day detection window)',
    },
    {
      name: 'Hair Drug Test 13 Panel + Exp Opi',
      ndsPrice: 687,
      price: 962,
      description: 'Comprehensive hair testing with expanded opiates',
    },
    {
      name: 'Hair Drug Test 18 Panel + Exp Opi',
      ndsPrice: 744,
      price: 1042,
      description: 'Most comprehensive hair drug test available',
    },
    {
      name: 'Hair 4 Panel + Exp Opi + Oxi (NO THC)',
      ndsPrice: 191,
      price: 267,
      description: 'Hair testing without marijuana',
    },
  ],
  specialty: [
    {
      name: 'DOT Pre-Employment Drug Test',
      ndsPrice: 75,
      price: 105,
      description: 'Required for FMCSA-regulated drivers',
    },
    {
      name: 'Return to Duty DOT Test',
      ndsPrice: 375,
      price: 525,
      description: 'For drivers returning after positive test',
    },
  ],
};

export default function DrugTestingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white text-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Drug Testing Services
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Professional drug testing for workforce programs. DOT and non-DOT
              testing, nationwide collection sites, MRO review included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+13173143757"
                className="inline-block px-8 py-4 bg-white text-brand-blue-600 rounded-lg font-bold hover:bg-blue-50"
              >
                Call (317) 314-3757
              </a>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-brand-blue-700 text-white rounded-lg font-bold hover:bg-brand-blue-600 border-2 border-white"
              >
                Request Information
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Drug Testing Services
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-brand-blue-600" />
              </div>
              <h3 className="font-bold mb-2">MRO Review Included</h3>
              <p className="text-sm text-gray-600">
                All tests reviewed by certified Medical Review Officer
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-brand-green-600" />
              </div>
              <h3 className="font-bold mb-2">Nationwide Network</h3>
              <p className="text-sm text-gray-600">
                20,000+ collection sites across the US
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">Fast Results</h3>
              <p className="text-sm text-gray-600">
                Results typically within 24-48 hours
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-brand-orange-600" />
              </div>
              <h3 className="font-bold mb-2">DOT Compliant</h3>
              <p className="text-sm text-gray-600">
                FMCSA-approved testing and procedures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Urine Drug Tests */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8">Urine Drug Tests</h2>
          <p className="text-gray-600 mb-8">
            Lab-based urine drug testing with certified MRO review. Most common
            testing method for workplace programs.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drugTestingServices.urine.map((test) => (
              <div
                key={test.name}
                className={`bg-white border-2 rounded-lg p-6 ${test.popular ? 'border-blue-500' : 'border-gray-200'}`}
              >
                {test.popular && (
                  <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{test.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{test.description}</p>
                <div className="text-3xl font-bold text-brand-blue-600 mb-4">
                  ${test.price}
                </div>
                <a
                  href="tel:+13173143757"
                  className="block w-full text-center px-6 py-3 bg-brand-blue-600 text-white rounded-lg font-bold hover:bg-brand-blue-700"
                >
                  Order Test
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instant Rapid Tests */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8">Instant Rapid Tests</h2>
          <p className="text-gray-600 mb-8">
            On-site rapid testing with immediate preliminary results. Positive
            results confirmed by lab.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {drugTestingServices.instant.map((test) => (
              <div
                key={test.name}
                className="bg-white border-2 border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-lg font-bold mb-2">{test.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{test.description}</p>
                <div className="text-2xl font-bold text-brand-blue-600 mb-4">
                  ${test.price}
                </div>
                <a
                  href="tel:+13173143757"
                  className="block w-full text-center px-4 py-2 bg-brand-blue-600 text-white rounded-lg font-bold hover:bg-brand-blue-700 text-sm"
                >
                  Order Test
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hair Drug Tests */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8">Hair Drug Tests</h2>
          <p className="text-gray-600 mb-8">
            Hair follicle testing provides 90-day detection window. Ideal for
            pre-employment and comprehensive screening.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {drugTestingServices.hair.map((test) => (
              <div
                key={test.name}
                className="bg-white border-2 border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-lg font-bold mb-2">{test.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{test.description}</p>
                <div className="text-2xl font-bold text-brand-blue-600 mb-4">
                  ${test.price}
                </div>
                <a
                  href="tel:+13173143757"
                  className="block w-full text-center px-4 py-2 bg-brand-blue-600 text-white rounded-lg font-bold hover:bg-brand-blue-700 text-sm"
                >
                  Order Test
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOT Specialty Tests */}
      <section className="py-16 bg-blue-50">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8">DOT Specialty Tests</h2>
          <p className="text-gray-600 mb-8">
            FMCSA-compliant testing for commercial drivers and DOT-regulated
            industries.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {drugTestingServices.specialty.map((test) => (
              <div
                key={test.name}
                className="bg-white border-2 border-blue-200 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold mb-2">{test.name}</h3>
                <p className="text-gray-600 mb-4">{test.description}</p>
                <div className="text-3xl font-bold text-brand-blue-600 mb-4">
                  ${test.price}
                </div>
                <a
                  href="tel:+13173143757"
                  className="block w-full text-center px-6 py-3 bg-brand-blue-600 text-white rounded-lg font-bold hover:bg-brand-blue-700"
                >
                  Order Test
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Order Test</h3>
                <p className="text-gray-700">
                  Call (317) 314-3757 to order. We'll schedule your test at a
                  convenient collection site.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Visit Collection Site
                </h3>
                <p className="text-gray-700">
                  Go to the collection site (LabCorp, Quest, or local clinic).
                  Bring photo ID.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Sample Collection</h3>
                <p className="text-gray-700">
                  Trained collector obtains sample and sends to SAMHSA-certified
                  lab.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">MRO Review</h3>
                <p className="text-gray-700">
                  Medical Review Officer reviews results and contacts donor if
                  needed.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Results Delivered</h3>
                <p className="text-gray-700">
                  Results typically available within 24-48 hours via email and
                  online portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-blue-600 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Order a Drug Test?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Call us to schedule testing or get answers to your questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-blue-600 rounded-lg font-bold hover:bg-blue-50"
            >
              <Phone className="w-5 h-5" />
              Call (317) 314-3757
            </a>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-brand-blue-700 text-white rounded-lg font-bold hover:bg-brand-blue-600 border-2 border-white"
            >
              Email Us
            </Link>
          </div>
          <p className="mt-8 text-blue-100">
            <strong>Address:</strong> 8888 Keystone Xing, Suite 1300,
            Indianapolis, IN 46240
          </p>
        </div>
      </section>
    </div>
  );
}
