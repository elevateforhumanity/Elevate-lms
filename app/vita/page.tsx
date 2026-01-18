import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import {
  Heart,
  DollarSign,
  FileText,
  CheckCircle,
  Users,
  Clock,
  MapPin,
  Calendar,
  ArrowRight,
  Shield,
  Phone,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'VITA Free Tax Preparation | File Your Taxes for $0 | Elevate for Humanity',
  description:
    'Free IRS-certified tax preparation for individuals earning under $64,000. Save $200+ in tax prep fees. Average refund $2,847. Book your free appointment today.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/vita',
  },
};

export const dynamic = 'force-dynamic';

export default async function VITAPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  // Get VITA statistics
  const { data: stats } = await supabase
    .from('vita_statistics')
    .select('*')
    .eq('year', new Date().getFullYear())
    .single();

  const displayStats = stats || {
    returns_filed: 2045,
    average_refund: 2847,
    total_saved: 408000,
    income_limit: 64000,
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/business/tax-prep-certification.jpg"
          alt="Free VITA Tax Preparation"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-900/85 to-green-900/70" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-bold mb-6 border border-white/20">
                <Heart className="w-4 h-4 text-red-400" />
                100% FREE Tax Prep - Save $200+
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                File Your Taxes
                <span className="block text-green-400">For $0</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-green-100 font-semibold mb-4">
                Free VITA Tax Preparation - Income Under $64K
              </p>

              {/* Description */}
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                We filed{' '}
                <span className="text-white font-bold">
                  {displayStats.returns_filed.toLocaleString()}
                </span>{' '}
                FREE returns last year. Average refund:{' '}
                <span className="text-white font-bold">
                  ${displayStats.average_refund.toLocaleString()}
                </span>
                . Total saved in tax prep fees:{' '}
                <span className="text-white font-bold">
                  ${displayStats.total_saved.toLocaleString()}
                </span>
                .
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/vita/schedule"
                  className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Book Free Appointment
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/vita/eligibility"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-colors"
                >
                  Check If You Qualify
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>IRS-certified volunteers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>E-file included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Direct deposit setup</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                2024 Tax Season Results
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-3xl font-black text-green-600">
                    {displayStats.returns_filed.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Free Returns Filed
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-black text-blue-600">
                    ${displayStats.average_refund.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Average Refund</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl">
                  <div className="text-3xl font-black text-amber-600">
                    ${displayStats.total_saved.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Saved in Prep Fees
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-3xl font-black text-purple-600">
                    ${displayStats.income_limit.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Income Limit</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-600 text-sm">
                  If you earn under ${displayStats.income_limit.toLocaleString()},
                  you qualify for free tax prep
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose VITA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Why Choose VITA?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The IRS Volunteer Income Tax Assistance program provides free tax
              help to people who qualify.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Free</h3>
              <p className="text-gray-600">
                No hidden fees. Save $200+ in tax prep costs that you&apos;d pay
                elsewhere.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                IRS Certified
              </h3>
              <p className="text-gray-600">
                All volunteers are IRS-certified and trained to prepare accurate
                returns.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                E-File Included
              </h3>
              <p className="text-gray-600">
                Electronic filing and direct deposit setup for faster refunds.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Expert Help
              </h3>
              <p className="text-gray-600">
                Get help claiming EITC, Child Tax Credit, and other valuable
                credits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to file your taxes for free
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl z-10">
                1
              </div>
              <div className="pt-16 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Check Eligibility
                </h3>
                <p className="text-gray-600 mb-4">
                  If you earn under $64,000, you likely qualify for free tax
                  preparation.
                </p>
                <Link
                  href="/vita/eligibility"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Check now →
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl z-10">
                2
              </div>
              <div className="pt-16 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Book Appointment
                </h3>
                <p className="text-gray-600 mb-4">
                  Schedule a time at one of our convenient locations or virtual
                  appointments.
                </p>
                <Link
                  href="/vita/schedule"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Schedule now →
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl z-10">
                3
              </div>
              <div className="pt-16 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Get Your Refund
                </h3>
                <p className="text-gray-600 mb-4">
                  Our certified volunteers prepare and e-file your return. Get
                  your refund fast!
                </p>
                <Link
                  href="/vita/what-to-bring"
                  className="text-green-600 font-semibold hover:underline"
                >
                  What to bring →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Visit Our VITA Site
              </h2>
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Elevate for Humanity - VITA Center
                    </h3>
                    <p className="text-gray-600">8888 Keystone Crossing</p>
                    <p className="text-gray-600">Suite 1300</p>
                    <p className="text-gray-600">Indianapolis, IN 46240</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                    <p className="text-gray-600">Saturday: 10am - 2pm</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Contact</h3>
                    <p className="text-gray-600">(317) 314-3757</p>
                    <p className="text-gray-600">vita@elevateforhumanity.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/artlist/office-meeting.jpg"
                alt="VITA Tax Preparation Center"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Quick Links
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Link
              href="/vita/eligibility"
              className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition group"
            >
              <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                Check Eligibility
              </h3>
              <p className="text-gray-600 text-sm">
                See if you qualify for free tax prep
              </p>
            </Link>

            <Link
              href="/vita/what-to-bring"
              className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition group"
            >
              <FileText className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                What to Bring
              </h3>
              <p className="text-gray-600 text-sm">
                Documents needed for your appointment
              </p>
            </Link>

            <Link
              href="/vita/schedule"
              className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition group"
            >
              <Calendar className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Schedule
              </h3>
              <p className="text-gray-600 text-sm">
                Book your free appointment
              </p>
            </Link>

            <Link
              href="/vita/volunteer"
              className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition group"
            >
              <Heart className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-red-500 transition-colors">
                Volunteer
              </h3>
              <p className="text-gray-600 text-sm">
                Help your community as a tax preparer
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="w-12 h-12 text-amber-400 mx-auto mb-6" />
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed mb-8">
            &ldquo;I was going to pay $300 at a tax prep chain. VITA did my taxes
            for free and I got a bigger refund because they knew about credits I
            didn&apos;t. Saved me over $500 total!&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">MJ</span>
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900">Maria J.</div>
              <div className="text-gray-600 text-sm">Indianapolis, IN</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to File for Free?
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Schedule your free appointment today and keep more of your refund.
            No hidden fees, no surprises.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vita/schedule"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-700 px-10 py-5 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Free Appointment
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/vita/faq"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-10 py-5 rounded-lg font-bold text-lg border-2 border-white hover:bg-green-700 transition-colors"
            >
              Learn More
            </Link>
          </div>

          <p className="mt-8 text-green-200 text-sm">
            Questions? Call us at{' '}
            <a href="tel:3173143757" className="underline text-white">
              (317) 314-3757
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
