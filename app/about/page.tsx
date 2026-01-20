import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Users, Award, Heart, ArrowRight, Building2, GraduationCap } from 'lucide-react';

const SITE_URL = 'https://www.elevateforhumanity.org';

export const metadata: Metadata = {
  title: 'About Us | Elevate for Humanity',
  description: 'Elevate for Humanity connects workforce training, public funding, and employer demand to help individuals build sustainable careers in Indiana.',
  keywords: ['about elevate', 'mission', 'workforce training', 'career education', 'job placement', 'Indiana'],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Us | Elevate for Humanity',
    description: 'Elevate for Humanity connects workforce training, public funding, and employer demand to help individuals build sustainable careers.',
    url: `${SITE_URL}/about`,
    siteName: 'Elevate for Humanity',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Elevate for Humanity',
    description: 'Connecting workforce training, public funding, and employer demand.',
  },
};

const values = [
  { icon: Target, title: 'Mission-Driven', description: 'Connecting individuals to funded training pathways that lead to real employment' },
  { icon: Users, title: 'Student-Centered', description: 'Designing programs around learner needs, not institutional convenience' },
  { icon: Award, title: 'Accountability', description: 'Measuring success by employment outcomes, not enrollment numbers' },
  { icon: Heart, title: 'Community', description: 'Partnering with local employers and agencies to strengthen regional workforce' },
];

const whatWeDo = [
  {
    icon: GraduationCap,
    title: 'Workforce Training',
    description: 'We deliver career-focused training programs in healthcare, skilled trades, technology, and business—designed to meet employer hiring requirements.',
  },
  {
    icon: Building2,
    title: 'Funding Navigation',
    description: 'We help eligible individuals access WIOA funding, grants, and other workforce development resources to cover training costs.',
  },
  {
    icon: Users,
    title: 'Employer Partnerships',
    description: 'We work directly with employers to understand their hiring needs and align our training programs accordingly.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - No gradient overlay */}
      <div className="relative min-h-[400px] flex items-center">
        <Image
          src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="About Elevate for Humanity"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-2xl shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Elevate</h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Elevate for Humanity is a workforce development organization based in Indiana. 
              We connect individuals to funded training programs, help them earn industry credentials, 
              and support their transition into employment.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* What We Do Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">What We Do</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We operate at the intersection of workforce training, public funding, and employer demand.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {whatWeDo.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Approach Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Approach</h2>
            <p className="text-gray-600 mb-4">
              We focus on programs that lead to employment. This means working backward from 
              what employers need—specific credentials, skills, and competencies—and building 
              training programs that deliver those outcomes.
            </p>
            <p className="text-gray-600 mb-4">
              We partner with workforce development boards, community organizations, and 
              employers across Indiana to identify training needs and connect eligible 
              individuals to funded opportunities.
            </p>
            <p className="text-gray-600">
              Our programs are designed for working adults, career changers, and individuals 
              re-entering the workforce. We provide structured support from enrollment through 
              job placement.
            </p>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
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

        {/* Who We Serve Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Serve</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Individuals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Adults seeking career training or career change</li>
                <li>• Individuals eligible for WIOA or other workforce funding</li>
                <li>• People re-entering the workforce after a gap</li>
                <li>• Those seeking industry-recognized credentials</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Organizations</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Employers seeking trained, job-ready candidates</li>
                <li>• Workforce development boards and agencies</li>
                <li>• Community organizations serving job seekers</li>
                <li>• Training providers seeking partnership opportunities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Learn More About Our Programs</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore training programs, check your eligibility for funding, or connect with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/programs" className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50">
              Explore Programs <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 border border-blue-500">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
