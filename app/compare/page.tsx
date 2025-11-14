import Link from 'next/link';
import { Check, X } from 'lucide-react';

export const metadata = {
  title: 'Compare Training Providers | Elevate for Humanity',
  description: 'See how Elevate for Humanity compares to other workforce training providers',
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6 items-center">
          <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">Home</Link>
          <Link href="/programs" className="text-gray-700 hover:text-red-600 font-medium">Programs</Link>
          <Link href="/pricing" className="text-gray-700 hover:text-red-600 font-medium">Pricing</Link>
          <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium">About</Link>
        </nav>
        <div className="flex gap-3">
          <Link href="/login" className="elevate-btn-secondary">Sign In</Link>
          <Link href="/enroll" className="elevate-btn-primary">Get Started</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="elevate-hero">
        <div className="elevate-hero-content text-center">
          <h1 className="elevate-hero-title">Why Choose Elevate for Humanity?</h1>
          <p className="elevate-hero-subtitle mx-auto">
            See how we compare to traditional training providers and online learning platforms
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="elevate-container">
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-6 font-bold text-gray-900">Features</th>
                  <th className="p-6 text-center">
                    <div className="font-bold text-red-600 text-lg mb-1">Elevate for Humanity</div>
                    <div className="elevate-pill elevate-pill--success">Recommended</div>
                  </th>
                  <th className="p-6 text-center font-bold text-gray-700">Traditional Training</th>
                  <th className="p-6 text-center font-bold text-gray-700">Online Platforms</th>
                </tr>
              </thead>
              <tbody>
                {/* Cost */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-6 font-semibold text-gray-900">Cost (WIOA Eligible)</td>
                  <td className="p-6 text-center">
                    <div className="text-2xl font-bold text-green-600">$0</div>
                    <div className="text-xs text-gray-500">100% Free</div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900">$3K-$8K</div>
                    <div className="text-xs text-gray-500">Per course</div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900">$500-$2K</div>
                    <div className="text-xs text-gray-500">Per course</div>
                  </td>
                </tr>

                {/* Industry Certifications */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-6 font-semibold text-gray-900">Industry-Recognized Certifications</td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  </td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  </td>
                  <td className="p-6 text-center">
                    <X className="h-6 w-6 text-gray-300 mx-auto" />
                  </td>
                </tr>

                {/* Job Placement */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-6 font-semibold text-gray-900">Job Placement Assistance</td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                    <div className="text-xs text-gray-500 mt-1">85% placement rate</div>
                  </td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                    <div className="text-xs text-gray-500 mt-1">Varies</div>
                  </td>
                  <td className="p-6 text-center">
                    <X className="h-6 w-6 text-gray-300 mx-auto" />
                  </td>
                </tr>

                {/* Hands-on Training */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-6 font-semibold text-gray-900">Hands-On Training</td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  </td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  </td>
                  <td className="p-6 text-center">
                    <X className="h-6 w-6 text-gray-300 mx-auto" />
                  </td>
                </tr>

                {/* Support Services */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-6 font-semibold text-gray-900">Support Services (Childcare, Transportation)</td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  </td>
                  <td className="p-6 text-center">
                    <X className="h-6 w-6 text-gray-300 mx-auto" />
                  </td>
                  <td className="p-6 text-center">
                    <X className="h-6 w-6 text-gray-300 mx-auto" />
                  </td>
                </tr>

                {/* Career Counseling */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-6 font-semibold text-gray-900">Career Counseling</td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  </td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  </td>
                  <td className="p-6 text-center">
                    <X className="h-6 w-6 text-gray-300 mx-auto" />
                  </td>
                </tr>

                {/* Flexible Schedule */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-6 font-semibold text-gray-900">Flexible Online Learning</td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  </td>
                  <td className="p-6 text-center">
                    <X className="h-6 w-6 text-gray-300 mx-auto" />
                  </td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  </td>
                </tr>

                {/* Instructor Support */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-6 font-semibold text-gray-900">Live Instructor Support</td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  </td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                  </td>
                  <td className="p-6 text-center">
                    <X className="h-6 w-6 text-gray-300 mx-auto" />
                  </td>
                </tr>

                {/* Completion Time */}
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-6 font-semibold text-gray-900">Average Completion Time</td>
                  <td className="p-6 text-center">
                    <div className="font-bold text-gray-900">8-16 weeks</div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="font-bold text-gray-900">12-24 weeks</div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="font-bold text-gray-900">Self-paced</div>
                  </td>
                </tr>

                {/* Employer Recognition */}
                <tr className="hover:bg-gray-50">
                  <td className="p-6 font-semibold text-gray-900">Employer Recognition</td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                    <div className="text-xs text-gray-500 mt-1">High</div>
                  </td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                    <div className="text-xs text-gray-500 mt-1">High</div>
                  </td>
                  <td className="p-6 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto" />
                    <div className="text-xs text-gray-500 mt-1">Medium</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-center mt-12">
            <Link href="/enroll" className="elevate-btn-primary" style={{fontSize: '1.125rem', padding: '1rem 2.5rem'}}>
              Get Started with Elevate
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="elevate-container max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">The Elevate Advantage</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="elevate-card elevate-card-red">
              <h3 className="font-bold text-gray-900 mb-3">100% Free for Eligible Participants</h3>
              <p className="text-gray-600">
                Through WIOA funding, qualified participants pay nothing—no tuition, no fees, no hidden costs. 
                We even provide support services like childcare and transportation assistance.
              </p>
            </div>

            <div className="elevate-card elevate-card-orange">
              <h3 className="font-bold text-gray-900 mb-3">Real Results</h3>
              <p className="text-gray-600">
                85% of our graduates find employment within 6 months, with an average starting salary of $45K+. 
                Our industry partnerships ensure you're learning skills employers actually need.
              </p>
            </div>

            <div className="elevate-card elevate-card-blue">
              <h3 className="font-bold text-gray-900 mb-3">Comprehensive Support</h3>
              <p className="text-gray-600">
                From career counseling to job placement assistance, we're with you every step of the way. 
                Our support doesn't end when you complete your training—we help you launch your new career.
              </p>
            </div>

            <div className="elevate-card">
              <h3 className="font-bold text-gray-900 mb-3">Flexible Learning</h3>
              <p className="text-gray-600">
                Combine online learning with hands-on training. Study at your own pace while getting the 
                practical experience and certifications employers demand.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
