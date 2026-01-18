import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, CheckCircle, Shield, Clock, MapPin, Beaker, FileCheck, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Drug Testing Services | Elevate for Humanity',
  description:
    'Professional drug testing services for workforce programs. DOT and non-DOT testing, nationwide collection sites, MRO review included.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/drug-testing',
  },
};

const drugTestingServices = {
  urine: [
    {
      name: 'DOT 5-Panel Urine Test',
      price: 105,
      popular: true,
      includes: [
        'DOT-compliant collection',
        '5-panel drug screen (THC, COC, OPI, AMP, PCP)',
        'SAMHSA-certified lab analysis',
        'MRO review and verification',
        'Electronic results delivery',
        'Chain of custody documentation',
      ],
      turnaround: '24-48 hours',
    },
    {
      name: '5-Panel Drug Test',
      price: 97,
      includes: [
        'Standard urine collection',
        '5-panel screen (THC, COC, OPI, AMP, PCP)',
        'Lab confirmation of positives',
        'MRO review included',
        'Results via secure portal',
      ],
      turnaround: '24-48 hours',
    },
    {
      name: '10-Panel Drug Test',
      price: 97,
      includes: [
        'Expanded drug panel',
        'Tests for 10 substance categories',
        'Includes benzodiazepines, barbiturates',
        'MRO review included',
        'Detailed results report',
      ],
      turnaround: '24-48 hours',
    },
    {
      name: '5-Panel + Expanded Opiates',
      price: 105,
      includes: [
        'Standard 5-panel plus',
        'Fentanyl and synthetic opioids',
        'Oxycodone, hydrocodone detection',
        'MRO review included',
        'Comprehensive opioid coverage',
      ],
      turnaround: '24-48 hours',
    },
    {
      name: '4-Panel (NO THC)',
      price: 105,
      includes: [
        'THC-free testing option',
        'Tests COC, OPI, AMP, PCP',
        'Ideal for legal cannabis states',
        'MRO review included',
        'Compliant with state laws',
      ],
      turnaround: '24-48 hours',
    },
    {
      name: '5-Panel + Alcohol',
      price: 119,
      includes: [
        'Standard 5-panel drug test',
        'Breath or urine alcohol test',
        'Detects recent alcohol use',
        'MRO review included',
        'Combined results report',
      ],
      turnaround: '24-48 hours',
    },
  ],
  instant: [
    {
      name: 'Instant Rapid 5-Panel',
      price: 84,
      includes: [
        'On-site rapid testing',
        'Results in 5-10 minutes',
        'Negative results immediate',
        'Positives sent to lab for confirmation',
        'Cost-effective screening',
      ],
      turnaround: '5-10 minutes (negative)',
    },
    {
      name: 'Instant Rapid 10-Panel',
      price: 97,
      includes: [
        'Expanded rapid screening',
        '10 substance categories',
        'Immediate preliminary results',
        'Lab confirmation if needed',
        'Detailed panel coverage',
      ],
      turnaround: '5-10 minutes (negative)',
    },
  ],
  hair: [
    {
      name: 'Hair Follicle 10-Panel',
      price: 412,
      includes: [
        '90-day detection window',
        'Tests 10 substance categories',
        'Difficult to cheat',
        'MRO review included',
        'Ideal for pre-employment',
        'Detailed history of use',
      ],
      turnaround: '3-5 business days',
    },
    {
      name: 'Hair 5-Panel + Expanded Opiates',
      price: 267,
      includes: [
        '90-day detection window',
        'Includes synthetic opioids',
        'THC-free option available',
        'MRO review included',
        'Comprehensive opioid detection',
      ],
      turnaround: '3-5 business days',
    },
  ],
  specialty: [
    {
      name: 'DOT Pre-Employment',
      price: 105,
      includes: [
        'FMCSA-compliant testing',
        'Required for CDL drivers',
        'DOT chain of custody',
        'MRO review and reporting',
        'Clearinghouse reporting',
        'Same-day scheduling available',
      ],
      turnaround: '24-48 hours',
    },
    {
      name: 'Return to Duty (DOT)',
      price: 525,
      includes: [
        'Post-violation testing',
        'SAP evaluation coordination',
        'Direct observation collection',
        'MRO review and clearance',
        'Clearinghouse update',
        'Follow-up test scheduling',
      ],
      turnaround: '24-48 hours',
    },
  ],
};

export default function DrugTestingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/artlist/hero-training-2.jpg"
            alt="Drug Testing Services"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/70" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Drug Testing Services
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl">
            Professional drug testing for workforce programs, employers, and individuals. 
            DOT and non-DOT testing with nationwide collection sites and MRO review included in every test.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              <Phone className="w-5 h-5" />
              Call (317) 314-3757
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-600 transition border-2 border-white"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Every Test Includes
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            No hidden fees. All prices include collection, lab analysis, MRO review, and results delivery.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Collection Site</h3>
              <p className="text-gray-700 text-sm">
                20,000+ LabCorp, Quest, and clinic locations nationwide
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Beaker className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Lab Analysis</h3>
              <p className="text-gray-700 text-sm">
                SAMHSA-certified laboratory testing with confirmation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">MRO Review</h3>
              <p className="text-gray-700 text-sm">
                Licensed Medical Review Officer reviews all results
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Results</h3>
              <p className="text-gray-700 text-sm">
                Results typically within 24-48 hours via secure portal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Urine Drug Tests */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Urine Drug Tests</h2>
          <p className="text-lg text-gray-700 mb-8">
            Lab-based urine testing is the most common and cost-effective method for workplace drug screening.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drugTestingServices.urine.map((test) => (
              <div
                key={test.name}
                className={`bg-white border-2 rounded-xl p-6 ${test.popular ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'}`}
              >
                {test.popular && (
                  <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{test.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-1">${test.price}</div>
                <p className="text-sm text-gray-600 mb-4">Results in {test.turnaround}</p>
                
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">What's Included:</p>
                  <ul className="space-y-2">
                    {test.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a
                  href="tel:+13173143757"
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Order Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instant Rapid Tests */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Instant Rapid Tests</h2>
          <p className="text-lg text-gray-700 mb-8">
            Get preliminary results in minutes. Ideal for high-volume screening or time-sensitive situations.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {drugTestingServices.instant.map((test) => (
              <div key={test.name} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{test.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-1">${test.price}</div>
                <p className="text-sm text-gray-600 mb-4">Results in {test.turnaround}</p>
                
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">What's Included:</p>
                  <ul className="space-y-2">
                    {test.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a
                  href="tel:+13173143757"
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Order Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hair Drug Tests */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hair Follicle Tests</h2>
          <p className="text-lg text-gray-700 mb-8">
            90-day detection window provides comprehensive drug use history. Difficult to cheat and ideal for pre-employment.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {drugTestingServices.hair.map((test) => (
              <div key={test.name} className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{test.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-1">${test.price}</div>
                <p className="text-sm text-gray-600 mb-4">Results in {test.turnaround}</p>
                
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">What's Included:</p>
                  <ul className="space-y-2">
                    {test.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a
                  href="tel:+13173143757"
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Order Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOT Specialty Tests */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">DOT Specialty Tests</h2>
          <p className="text-lg text-gray-700 mb-8">
            FMCSA-compliant testing for commercial drivers and DOT-regulated industries. Full compliance with 49 CFR Part 40.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {drugTestingServices.specialty.map((test) => (
              <div key={test.name} className="bg-white border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileCheck className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-600">DOT COMPLIANT</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{test.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-1">${test.price}</div>
                <p className="text-sm text-gray-600 mb-4">Results in {test.turnaround}</p>
                
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">What's Included:</p>
                  <ul className="space-y-2">
                    {test.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a
                  href="tel:+13173143757"
                  className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Order Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            {[
              { step: 1, title: 'Order Your Test', desc: 'Call (317) 314-3757 or request online. We\'ll confirm your test type and schedule collection.' },
              { step: 2, title: 'Visit Collection Site', desc: 'Go to any of our 20,000+ nationwide locations (LabCorp, Quest, or local clinic). Bring valid photo ID.' },
              { step: 3, title: 'Sample Collection', desc: 'Trained collector obtains your sample following proper chain of custody procedures.' },
              { step: 4, title: 'Lab Analysis', desc: 'Sample sent to SAMHSA-certified lab for testing. Positive screens confirmed with GC/MS.' },
              { step: 5, title: 'MRO Review', desc: 'Medical Review Officer reviews results and contacts donor if prescription verification needed.' },
              { step: 6, title: 'Results Delivered', desc: 'Receive results via secure online portal and email within 24-48 hours (most tests).' },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${item.step === 6 ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer Programs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Employer Drug Testing Programs
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                We offer comprehensive drug testing programs for employers of all sizes. Volume discounts available.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Pre-employment screening',
                  'Random testing programs',
                  'Post-accident testing',
                  'Reasonable suspicion testing',
                  'Return-to-duty testing',
                  'DOT compliance programs',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="tel:+13173143757"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition"
              >
                <Users className="w-5 h-5" />
                Set Up Employer Account
              </a>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/artlist/hero-training-7.jpg"
                alt="Employer drug testing"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Order a Drug Test?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Call us to schedule testing or get answers to your questions. Same-day appointments often available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-lg font-bold hover:bg-gray-100 transition text-lg"
            >
              <Phone className="w-5 h-5" />
              Call (317) 314-3757
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-800 text-white rounded-lg font-bold hover:bg-blue-700 transition border-2 border-white text-lg"
            >
              Email Us
            </Link>
          </div>
          <p className="mt-8 text-blue-200">
            <strong>Location:</strong> 8888 Keystone Xing, Suite 1300, Indianapolis, IN 46240
          </p>
        </div>
      </section>
    </div>
  );
}
