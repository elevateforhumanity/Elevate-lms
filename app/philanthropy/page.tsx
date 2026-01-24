import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Users, GraduationCap, DollarSign, CheckCircle, ArrowRight, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/philanthropy',
  },
  title: 'Support Our Mission | Elevate For Humanity',
  description:
    'Support workforce development and career training for underserved communities. Your contribution helps provide free training, certifications, and job placement.',
};

const impactStats = [
  { value: '500+', label: 'Lives Transformed' },
  { value: '85%', label: 'Job Placement Rate' },
  { value: '100%', label: 'Free for Eligible Students' },
  { value: '$0', label: 'Cost to Qualifying Students' },
];

const givingOptions = [
  {
    title: 'Sponsor a Student',
    amount: '$2,500',
    description: 'Cover the full cost of training and certification for one student.',
    impact: 'Provides complete career training, certification fees, and job placement support.',
  },
  {
    title: 'Equipment Fund',
    amount: '$500',
    description: 'Help purchase professional tools and equipment for training programs.',
    impact: 'Equips students with industry-standard tools they need to succeed.',
  },
  {
    title: 'Scholarship Fund',
    amount: '$1,000',
    description: 'Support students who need additional assistance with training costs.',
    impact: 'Removes financial barriers for students pursuing career training.',
  },
  {
    title: 'General Support',
    amount: 'Any Amount',
    description: 'Flexible funding to support our greatest needs.',
    impact: 'Helps expand programs, improve facilities, and serve more students.',
  },
];

const partnershipTypes = [
  {
    title: 'Corporate Partnerships',
    description: 'Partner with us to develop talent pipelines and support workforce development in your industry.',
    benefits: ['Tax-deductible contributions', 'Brand visibility', 'Access to trained candidates', 'Community impact'],
  },
  {
    title: 'Foundation Grants',
    description: 'We welcome grant funding to expand our programs and reach more underserved communities.',
    benefits: ['Measurable outcomes', 'Transparent reporting', 'Aligned missions', 'Scalable impact'],
  },
  {
    title: 'In-Kind Donations',
    description: 'Donate equipment, supplies, or professional services to support our training programs.',
    benefits: ['Direct program support', 'Tax benefits', 'Inventory management', 'Community connection'],
  },
];

export default function PhilanthropyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <Image
          src="/images/success-new/success-8.jpg"
          alt="Supporting career development"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-200 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Heart className="w-4 h-4" />
              Support Our Mission
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Invest in Futures
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Your support provides free career training, industry certifications, and 
              job placement for individuals seeking pathways out of poverty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?type=donate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5" />
                Make a Gift
              </Link>
              <Link
                href="#partnerships"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-colors"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {impactStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-rose-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Give */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Your Support Matters
              </h2>
              <p className="text-gray-600 mb-6">
                Many individuals face barriers to career advancement: lack of training, 
                certification costs, and limited access to opportunities. Your contribution 
                removes these barriers and creates pathways to sustainable careers.
              </p>
              <ul className="space-y-4">
                {[
                  'Fund training for students who cannot afford it',
                  'Provide industry certifications that lead to jobs',
                  'Support job placement and career coaching',
                  'Help expand programs to reach more communities',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/success-new/success-9.jpg"
                alt="Student success"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Giving Options */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ways to Give</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose how you want to make an impact. Every contribution helps transform lives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {givingOptions.map((option) => (
              <div
                key={option.title}
                className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition"
              >
                <div className="text-2xl font-bold text-rose-600 mb-2">
                  {option.amount}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {option.description}
                </p>
                <p className="text-sm text-gray-500 italic">
                  {option.impact}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/contact?type=donate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg transition-colors"
            >
              Donate Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section id="partnerships" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Organizations can make a lasting impact through strategic partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnershipTypes.map((type) => (
              <div
                key={type.title}
                className="bg-white rounded-xl p-6 shadow-sm border"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Information */}
      <section className="py-12 bg-blue-50 border-y">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-700">
            <strong>Elevate for Humanity</strong> is a 501(c)(3) nonprofit organization. 
            Your donation may be tax-deductible to the extent allowed by law. 
            EIN: Contact us for details.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-rose-600 to-rose-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-12 h-12 mx-auto mb-6 text-rose-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Contact us to discuss how you can support our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?type=donate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-rose-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </Link>
            <a
              href="tel:317-314-3757"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rose-800 text-white font-semibold rounded-lg hover:bg-rose-900 transition-colors"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
