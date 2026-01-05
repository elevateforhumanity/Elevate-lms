import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Briefcase, Home, Target } from 'lucide-react';
import {
  getActivePositions,
  formatSalaryRange,
  getEmploymentTypeDisplay,
} from '@/lib/data/careers';

export const metadata: Metadata = {
  title: 'Careers - Join Our Team | Elevate For Humanity',
  description:
    'Join our mission to provide free career training and workforce development. Explore career opportunities at Elevate For Humanity.',
  alternates: {
    canonical: 'https://elevateforhumanity.org/careers',
  },
};

// Force dynamic rendering - don't try to statically generate at build time
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CareersPage() {
  // Fetch real job positions from database
  let openPositions = [];
  try {
    openPositions = await getActivePositions();
  } catch (error: unknown) {
    console.error('Error loading positions:', error);
    // Continue with empty positions array
  }

  const benefits = [
    {
      icon: '<Briefcase className="w-5 h-5 inline-block" />',
      title: 'Competitive Salary',
      description: 'Fair compensation with performance bonuses',
    },
    {
      icon: '🏥',
      title: 'Health Benefits',
      description: 'Comprehensive health, dental, and vision coverage',
    },
    {
      icon: '🏖️',
      title: 'Paid Time Off',
      description: 'Generous PTO and holiday schedule',
    },
    {
      icon: '<BookOpen className="w-5 h-5 inline-block" />',
      title: 'Professional Development',
      description: 'Continuous learning and growth opportunities',
    },
    {
      icon: '<Home className="w-5 h-5 inline-block" />',
      title: 'Remote Work',
      description: 'Flexible work arrangements',
    },
    {
      icon: '<Target className="w-5 h-5 inline-block" />',
      title: 'Mission-Driven',
      description: "Make a real impact on people's lives",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-orange-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Mission
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Help us transform lives through free career training and workforce
              development
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="#positions"
                className="bg-white text-brand-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                View Open Positions
              </Link>
              <Link
                href="#culture"
                className="bg-brand-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-orange-800 transition border-2 border-white"
              >
                Learn About Our Culture
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-8">
              At Elevate For Humanity, we believe everyone deserves access to
              quality career training and the opportunity to build a better
              future. We partner with workforce boards, employers, and community
              organizations to provide 100% free training programs that lead to
              real jobs.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-blue-600 mb-2">
                  10,000+
                </div>
                <div className="text-gray-600">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-blue-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600">Employer Partners</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-blue-600 mb-2">
                  85%
                </div>
                <div className="text-gray-600">Job Placement Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="culture" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Work With Us
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-lg transition"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Open Positions
            </h2>
            <div className="space-y-6">
              {openPositions.map((position) => (
                <div
                  key={position.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-500 hover:shadow-lg transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {position.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {position.description ||
                          'Join our team and make a difference in workforce development.'}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        {position.department?.name && (
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            {position.department.name}
                          </span>
                        )}
                        <span className="bg-brand-green-100 text-green-700 px-3 py-1 rounded-full">
                          Remote
                        </span>
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                          {getEmploymentTypeDisplay(position.employment_type)}
                        </span>
                        {(position.min_salary || position.max_salary) && (
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                            {formatSalaryRange(
                              position.min_salary,
                              position.max_salary
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <Link
                        href={`/careers/${position.id}`}
                        className="inline-block bg-brand-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue-700 transition"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {openPositions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-4">
                  No open positions at the moment.
                </p>
                <p className="text-gray-500">
                  Check back soon or send us your resume for future
                  opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Hiring Process
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
                  <p className="text-gray-600">
                    Submit your application and resume through our online
                    portal.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone Screen</h3>
                  <p className="text-gray-600">
                    Initial conversation with our HR team to discuss your
                    background and the role.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Team Interview</h3>
                  <p className="text-gray-600">
                    Meet with the hiring manager and team members to discuss the
                    role in detail.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Offer</h3>
                  <p className="text-gray-600">
                    Receive your offer and join our mission to transform lives!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Don't See the Right Position?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              We're always looking for talented individuals who share our
              mission. Send us your resume and we'll keep you in mind for future
              opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-brand-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
