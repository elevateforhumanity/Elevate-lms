import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Users, Award, Heart, ArrowRight } from 'lucide-react';

const SITE_URL = 'https://www.elevateforhumanity.org';

export const metadata: Metadata = {
  title: 'About Us | Elevate for Humanity',
  description: 'Learn about Elevate for Humanity mission to transform lives through career-focused education and workforce development in Indiana.',
  keywords: ['about elevate', 'mission', 'workforce training', 'career education', 'job placement', 'accredited'],
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

const values = [
  { icon: Target, title: 'Mission-Driven', description: 'Empowering individuals through accessible, quality career education' },
  { icon: Users, title: 'Student-Centered', description: 'Every decision we make puts our students first' },
  { icon: Award, title: 'Excellence', description: 'Committed to the highest standards in education and training' },
  { icon: Heart, title: 'Community', description: 'Building a supportive network of learners and professionals' },
];

const stats = [
  { value: '500+', label: 'Students Served' },
  { value: '50+', label: 'Employer Partners' },
  { value: '20+', label: 'Training Programs' },
  { value: '2024', label: 'Founded' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative bg-blue-900 text-white py-24">
        <Image
          src="/images/hero/hero-main-welcome.jpg"
          alt="About Elevate"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Elevate</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We&apos;re on a mission to transform lives through career-focused education, 
            making quality training accessible to everyone.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2010, Elevate began with a simple belief: everyone deserves access to 
              quality career education. What started as a single training center has grown into 
              a nationwide network of learning opportunities.
            </p>
            <p className="text-gray-600 mb-4">
              Today, we offer dozens of career-focused programs across trades, healthcare, 
              technology, and more. Our graduates work at leading companies across the country, 
              building successful careers and better lives.
            </p>
            <p className="text-gray-600">
              We continue to innovate, bringing the latest industry practices and technologies 
              to our curriculum, ensuring our students are prepared for the jobs of today and tomorrow.
            </p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Our team"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with Elevate.
          </p>
          <Link href="/programs" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50">
            Explore Programs <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
