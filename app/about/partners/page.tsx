import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Building2, Users, Briefcase, GraduationCap, Handshake, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Partners | Elevate for Humanity',
  description: 'Elevate for Humanity partners with workforce boards, employers, training providers, and government agencies to deliver free career training in Indianapolis.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/about/partners',
  },
};

const governmentPartners = [
  {
    name: 'U.S. Department of Labor',
    description: 'Federal workforce development funding and program oversight',
    logo: '/images/partners/usdol.webp',
  },
  {
    name: 'Indiana Department of Workforce Development',
    description: 'State workforce programs including WIOA, WRG, and Next Level Jobs',
    logo: '/images/partners/dwd.webp',
  },
  {
    name: 'WorkOne Indy',
    description: 'Local workforce development board and career services',
    logo: '/images/partners/workone.webp',
  },
  {
    name: 'Next Level Jobs',
    description: 'Indiana employer training grant program',
    logo: '/images/partners/nextleveljobs.webp',
  },
];

const certificationPartners = [
  {
    name: 'OSHA',
    description: 'Occupational Safety and Health Administration certifications',
    logo: '/images/partners/osha.webp',
  },
  {
    name: 'Microsoft',
    description: 'Microsoft Office Specialist and technology certifications',
    logo: '/images/partners/microsoft-logo.png',
  },
];

const credentialedTrainingPartners = [
  {
    name: 'National Drug Screening',
    initials: 'NDS',
    description: 'DOT and non-DOT drug testing services with 20,000+ nationwide collection sites',
    website: 'https://www.nationaldrugscreening.com',
    color: 'bg-blue-600',
  },
  {
    name: 'MyDrugTestTraining',
    initials: 'MDTT',
    description: 'DOT-compliant training courses for supervisors, collectors, and employers',
    website: 'https://www.mydrugtesttraining.com',
    color: 'bg-green-600',
  },
];

const employerPartners = [
  'Community Health Network',
  'Eskenazi Health',
  'IU Health',
  'Franciscan Health',
  'Ascension St. Vincent',
  'Carrier Corporation',
  'Johnson Controls',
  'Service Experts',
  'Great Clips',
  'Sport Clips',
  'Floyd\'s 99 Barbershop',
  'Supercuts',
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 to-slate-900 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero/hero-main-welcome.jpg"
            alt="Partners background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our Partners
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
            Working together to create pathways to prosperity for Indiana communities
          </p>
        </div>
      </section>

      {/* Partnership Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Handshake className="w-16 h-16 text-orange-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Building Stronger Communities Together
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Elevate for Humanity collaborates with government agencies, employers, training 
              providers, and community organizations to deliver comprehensive workforce solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6">
              <Building2 className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Government Partners</h3>
              <p className="text-gray-600">Federal, state, and local workforce agencies</p>
            </div>
            <div className="text-center p-6">
              <Briefcase className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Employer Partners</h3>
              <p className="text-gray-600">Companies actively hiring our graduates</p>
            </div>
            <div className="text-center p-6">
              <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Certification Partners</h3>
              <p className="text-gray-600">Industry-recognized credential providers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Government Partners */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Government & Workforce Partners
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {governmentPartners.map((partner) => (
              <div key={partner.name} className="bg-white p-8 rounded-xl shadow-sm flex items-center gap-6">
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                  <p className="text-gray-600">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Partners */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Certification Partners
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {certificationPartners.map((partner) => (
              <div key={partner.name} className="bg-gray-50 p-8 rounded-xl flex items-center gap-6">
                <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                  <p className="text-gray-600">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentialed Training Partners */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Credentialed Training Partners
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We partner with industry-leading providers to deliver specialized training and compliance services.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {credentialedTrainingPartners.map((partner) => (
              <a 
                key={partner.name} 
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-8 rounded-xl flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-20 h-20 flex-shrink-0 ${partner.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">{partner.initials}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.name}</h3>
                  <p className="text-gray-600">{partner.description}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/drug-testing"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              View Drug Testing Services
            </Link>
          </div>
        </div>
      </section>

      {/* Employer Partners */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Users className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Employer Partners
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              These employers actively hire our graduates and partner with us to develop 
              training programs that meet industry needs.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {employerPartners.map((employer) => (
              <div key={employer} className="bg-slate-800 p-4 rounded-lg text-center">
                <span className="text-slate-200">{employer}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-16 md:py-24 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Become a Partner
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join our network of partners committed to workforce development. Whether you&apos;re 
            an employer looking to hire skilled workers or an organization wanting to support 
            our mission, we&apos;d love to connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/employers"
              className="px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-all"
            >
              Employer Partnership
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-orange-600 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
