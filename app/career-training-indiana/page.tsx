import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Award,
  Shield,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Building2,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/career-training-indiana',
  },
  title: 'Career Training Indiana | Elevate for Humanity - Workforce Development Programs',
  description:
    'Workforce development and career training programs in Indiana. WIOA-eligible training, apprenticeships, and certification programs serving Indianapolis, Fort Wayne, and statewide. Free for qualifying residents.',
  openGraph: {
    title: 'Career Training Indiana | Elevate for Humanity',
    description:
      'Workforce development and career training programs across Indiana. WIOA-eligible, apprenticeships, certifications.',
    url: 'https://www.elevateforhumanity.org/career-training-indiana',
    siteName: 'Elevate for Humanity',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Indiana Career Training' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Training Indiana | Elevate for Humanity',
    description: 'Workforce development and career training programs across Indiana.',
    images: ['/og-default.jpg'],
  },
};

export default function CareerTrainingIndianaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-green-200 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Serving All of Indiana</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            Indiana Career Training &amp; Workforce Development
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-3xl">
            Build your career with Indiana's trusted workforce development partner. Our programs
            connect Hoosiers with in-demand skills, industry certifications, and employment
            pathways. Serving Indianapolis, Fort Wayne, Evansville, South Bend, and communities
            across all 92 counties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-lg font-bold transition-colors"
            >
              Explore Training Programs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-lg text-lg font-bold transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Indiana-Specific Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Why Indiana Residents Choose Elevate for Humanity
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We partner with Indiana workforce agencies, employers, and community organizations to
            deliver training that leads to real careers.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">WIOA Funding Available</h3>
              <p className="text-gray-600">
                Many Indiana residents qualify for free training through WIOA (Workforce Innovation
                and Opportunity Act). We help you navigate WorkOne Indiana eligibility.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Indiana Employer Partners</h3>
              <p className="text-gray-600">
                Our graduates work at Indiana's top employers. We maintain direct hiring
                relationships with healthcare systems, manufacturers, and tech companies statewide.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Industry Certifications</h3>
              <p className="text-gray-600">
                Earn credentials recognized by Indiana employers: CNA, CDL, CompTIA, OSHA, and more.
                Our pass rates exceed state averages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs for Indiana */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Career Training Programs for Indiana Residents
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Healthcare Careers</h3>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Certified Nursing Assistant (CNA) - Indiana State Board approved</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Medical Assistant certification</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Phlebotomy technician training</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Direct Support Professional (DSP)</span>
                </li>
              </ul>
              <Link
                href="/programs/healthcare"
                className="text-green-600 hover:underline font-semibold inline-flex items-center"
              >
                View Healthcare Programs <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Skilled Trades</h3>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">CDL Training - Class A &amp; B licenses</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">HVAC technician certification</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Electrical apprenticeship pathways</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Welding certification programs</span>
                </li>
              </ul>
              <Link
                href="/programs/skilled-trades"
                className="text-green-600 hover:underline font-semibold inline-flex items-center"
              >
                View Skilled Trades Programs <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Technology &amp; Business</h3>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">IT Support Specialist (CompTIA A+)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Cybersecurity fundamentals</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Business administration essentials</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Tax preparation certification</span>
                </li>
              </ul>
              <Link
                href="/programs/technology"
                className="text-green-600 hover:underline font-semibold inline-flex items-center"
              >
                View Technology Programs <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Apprenticeships</h3>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Earn while you learn - paid training</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Indiana DOL registered programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Barber &amp; cosmetology apprenticeships</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Construction trades pathways</span>
                </li>
              </ul>
              <Link
                href="/apprenticeships"
                className="text-green-600 hover:underline font-semibold inline-flex items-center"
              >
                View Apprenticeship Programs <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Governance Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Trusted Training with Transparent Operations
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Accredited Programs</h3>
                <p className="text-gray-600">
                  Our training programs meet Indiana state requirements and industry certification
                  standards. We maintain transparent outcome reporting.
                </p>
                <Link href="/governance/compliance" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  View our compliance standards →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Nonprofit Mission</h3>
                <p className="text-gray-600">
                  As a 501(c)(3) nonprofit, our mission is workforce development - not profit. Every
                  dollar supports Indiana residents building careers.
                </p>
                <Link href="/governance/operational-controls" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  Learn about our operations →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">WorkOne Indiana Partner</h3>
                <p className="text-gray-600">
                  We work directly with Indiana's WorkOne centers to connect eligible residents with
                  funded training opportunities.
                </p>
                <Link href="/lms" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  Explore our learning platform →
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600">
                  Evening, weekend, and online options available. We design programs for working
                  adults and those with family responsibilities.
                </p>
                <Link href="/resources" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
                  View student resources →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indiana Locations */}
      <section className="py-16 bg-green-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Serving Indiana Communities</h2>
          <p className="text-green-200 text-center mb-12 max-w-2xl mx-auto">
            We serve learners throughout Indiana with both in-person training sites and online
            learning options.
          </p>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="font-bold text-lg mb-2">Indianapolis Metro</h3>
              <p className="text-green-200 text-sm">
                Marion County, Hamilton County, Hendricks County, Johnson County
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Northern Indiana</h3>
              <p className="text-green-200 text-sm">
                Fort Wayne, South Bend, Elkhart, Gary, Hammond
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Southern Indiana</h3>
              <p className="text-green-200 text-sm">
                Evansville, Bloomington, Columbus, New Albany
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Central Indiana</h3>
              <p className="text-green-200 text-sm">
                Lafayette, Muncie, Anderson, Terre Haute, Kokomo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Start Your Indiana Career Journey Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Discover which training programs match your goals. Many Indiana residents qualify for
            free or funded training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Browse All Programs
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-lg font-bold hover:bg-white hover:text-orange-600 transition-colors"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
