import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Users, Award, Heart, ArrowRight, CheckCircle, Shield, Building, GraduationCap } from 'lucide-react';

const SITE_URL = 'https://www.elevateforhumanity.org';

export const metadata: Metadata = {
  title: 'About Us | Elevate for Humanity',
  description: 'Learn about Elevate for Humanity mission to transform lives through career-focused education and workforce development in Indiana. DOL Registered Apprenticeship Sponsor, WIOA approved.',
  keywords: ['about elevate', 'mission', 'workforce training', 'career education', 'job placement', 'accredited', 'WIOA', 'DOL', 'apprenticeship'],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Us | Elevate for Humanity',
    description: 'Learn about our mission to transform lives through career-focused education and workforce development.',
    url: `${SITE_URL}/about`,
    siteName: 'Elevate for Humanity',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/og/about-og.jpg`,
        width: 1200,
        height: 630,
        alt: 'About Elevate for Humanity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Elevate for Humanity',
    description: 'Learn about our mission to transform lives through career-focused education.',
  },
};

const credentials = [
  {
    title: 'U.S. Department of Labor Registered Apprenticeship Sponsor',
    description: 'RAPIDS Program Number: 2025-IN-132301',
    icon: Shield,
  },
  {
    title: 'Indiana Department of Workforce Development (DWD)',
    description: 'INTraining Provider - Location ID: 10004621',
    icon: Building,
  },
  {
    title: 'Indiana Department of Education (DOE)',
    description: 'Recognized Training Provider',
    icon: GraduationCap,
  },
  {
    title: 'WIOA Eligible Training Provider',
    description: 'Workforce Innovation and Opportunity Act Approved',
    icon: CheckCircle,
  },
  {
    title: 'Workforce Ready Grant (WRG) Approved',
    description: 'State-funded training programs',
    icon: Award,
  },
  {
    title: 'Justice Reinvestment Initiative (JRI)',
    description: 'Approved provider for justice-involved individuals',
    icon: Heart,
  },
];

const values = [
  { icon: Target, title: 'Mission-Driven', description: 'Empowering individuals through accessible, quality career education' },
  { icon: Users, title: 'Student-Centered', description: 'Every decision we make puts our students first' },
  { icon: Award, title: 'Excellence', description: 'Committed to the highest standards in education and training' },
  { icon: Heart, title: 'Community', description: 'Building a supportive network of learners and professionals' },
];

const partners = [
  'EmployIndy',
  'WorkOne Centers',
  'Indiana Department of Workforce Development',
  'Marion County Community Corrections',
  'Certiport',
  'Milady',
  'National Retail Federation (NRF)',
  'CareerSafe',
  'Health & Safety Institute (HSI)',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-brand-blue-700 text-white py-24">
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Elevate for Humanity</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Workforce infrastructure that connects public funding, employer demand, and 
            credential-backed training to drive measurable outcomes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mission Statement */}
        <div className="mb-16">
          <div className="bg-blue-50 border-l-4 border-brand-blue-600 p-8 rounded-r-xl">
            <h2 className="text-2xl font-bold text-black mb-4">Our Mission</h2>
            <p className="text-lg text-black leading-relaxed">
              Elevate for Humanity Technical & Career Institute is dedicated to creating pathways 
              out of poverty and into prosperity. We serve justice-involved individuals, low-income 
              families, and barrier-facing populations with dignity, excellence, and measurable results. 
              Our fully integrated ecosystem combines workforce training, apprenticeship programs, 
              case management, mental health support, housing assistance, and employer partnerships—all 
              designed to address the root causes of poverty and recidivism.
            </p>
          </div>
        </div>

        {/* Credentials & Approvals */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-4">
            Credentials & Approvals
          </h2>
          <p className="text-center text-black mb-12 max-w-3xl mx-auto">
            Elevate for Humanity has achieved recognition and approval from federal, state, and local agencies, 
            making training 100% free for qualified students.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((credential, index) => (
              <div 
                key={index} 
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-brand-blue-600 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <credential.icon className="w-6 h-6 text-brand-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black mb-1">{credential.title}</h3>
                    <p className="text-sm text-black">{credential.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">Our Story</h2>
            <p className="text-black mb-4">
              Elevate for Humanity (2EXCLUSIVE LLC-S) was founded by Elizabeth Greene with a 
              vision to create one of Indiana&apos;s most innovative and compliant workforce 
              development organizations.
            </p>
            <p className="text-black mb-4">
              Today, we offer career-focused programs across trades, healthcare, technology, 
              business, and more. Our programs are designed to meet the needs of employers 
              while providing students with the skills and credentials they need to succeed.
            </p>
            <p className="text-black mb-6">
              We continue to innovate, bringing the latest industry practices and technologies 
              to our curriculum, ensuring our students are prepared for the jobs of today and tomorrow.
            </p>
            <Link 
              href="/team" 
              className="inline-flex items-center gap-2 text-brand-blue-600 font-semibold hover:text-brand-blue-700"
            >
              Meet Our Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/images/team/elizabeth-greene.jpg"
              alt="Elizabeth Greene - Founder"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-brand-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-brand-blue-600" />
                </div>
                <h3 className="font-bold text-black mb-2">{value.title}</h3>
                <p className="text-black text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-4">Our Partners</h2>
          <p className="text-center text-black mb-8 max-w-2xl mx-auto">
            We work with leading organizations to deliver quality training and employment opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((partner, index) => (
              <span 
                key={index} 
                className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-black"
              >
                {partner}
              </span>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/partners" 
              className="inline-flex items-center gap-2 text-brand-blue-600 font-semibold hover:text-brand-blue-700"
            >
              View All Partners <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join students who have transformed their careers with Elevate. 
            Training is 100% free for qualified students through WIOA, WRG, and JRI funding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/programs" 
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50"
            >
              Explore Programs <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/apply" 
              className="inline-flex items-center gap-2 bg-brand-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-orange-600"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
