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

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Card with content */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-6">
                  <Heart className="w-4 h-4 text-red-500" />
                  100% FREE Tax Prep - Save $200+
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4">
                  File Your Taxes
                  <span className="block text-green-600">For $0</span>
                </h1>

              {/* Subheadline */}
              <p className="text-xl text-green-700 font-semibold mb-4">
                Free VITA Tax Preparation - Income Under $64K
              </p>

              {/* Description */}
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Get your taxes prepared for free by IRS-certified volunteers. 
                Save hundreds on tax prep fees and get help claiming credits like 
                the Earned Income Tax Credit (EITC) and Child Tax Credit.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/vita/schedule"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
                >
                  Book Free Appointment
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/vita/eligibility"
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg border-2 border-gray-300 hover:bg-gray-200 transition-colors"
                >
                  Check If You Qualify
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>IRS-certified volunteers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>E-file included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Direct deposit setup</span>
                </div>
              </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Who Qualifies?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900">Income under $64,000</div>
                    <div className="text-sm text-gray-600">Individuals and families with low to moderate income</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900">Persons with disabilities</div>
                    <div className="text-sm text-gray-600">We provide accessible tax preparation assistance</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900">Limited English speakers</div>
                    <div className="text-sm text-gray-600">Assistance available in multiple languages</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900">Seniors (60+)</div>
                    <div className="text-sm text-gray-600">Special assistance through TCE program</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose VITA */}
      {/* What is VITA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/tax-office-1.jpg"
                alt="VITA volunteer helping with taxes"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                What is VITA?
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                <strong>VITA (Volunteer Income Tax Assistance)</strong> is an IRS program that offers 
                free tax preparation to individuals and families who earn $64,000 or less, 
                persons with disabilities, and limited English-speaking taxpayers.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our IRS-certified volunteers are trained to help you file your federal and state 
                tax returns accurately and claim all the credits and deductions you deserve, 
                including the <strong>Earned Income Tax Credit (EITC)</strong> and <strong>Child Tax Credit</strong>.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-black text-green-600">$0</div>
                  <div className="text-sm text-gray-600">Cost to You</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-3xl font-black text-blue-600">$64K</div>
                  <div className="text-sm text-gray-600">Income Limit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Qualifies Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              Do You Qualify for Free Tax Prep?
            </h2>
            <p className="text-xl text-green-100">
              You may be eligible if you meet any of these criteria:
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="relative h-32 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/business/professional-1.jpg"
                  alt="Individual taxpayer"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Income Under $64,000</h3>
              <p className="text-gray-600">
                Individuals and families earning less than $64,000 annually qualify for free tax preparation.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="relative h-32 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/business/team-1.jpg"
                  alt="Seniors"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Seniors (60+)</h3>
              <p className="text-gray-600">
                Seniors age 60 and older can get free tax help through our VITA and TCE programs.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="relative h-32 mb-6 rounded-xl overflow-hidden">
                <Image
                  src="/images/business/collaboration-1.jpg"
                  alt="Limited English speakers"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Limited English Speakers</h3>
              <p className="text-gray-600">
                We provide assistance in multiple languages to help you file accurately.
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/vita/eligibility"
              className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Check Your Eligibility
              <ArrowRight className="w-5 h-5" />
            </Link>
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
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40">
                <Image
                  src="/images/business/program-tax-preparation.jpg"
                  alt="Free tax preparation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                    $0 Cost
                  </span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">100% Free</h3>
                <p className="text-gray-600">
                  No hidden fees. Save $200+ in tax prep costs that you&apos;d pay
                  elsewhere.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40">
                <Image
                  src="/images/business/tax-prep-certification.jpg"
                  alt="IRS certified volunteers"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                    IRS Certified
                  </span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  IRS Certified
                </h3>
                <p className="text-gray-600">
                  All volunteers are IRS-certified and trained to prepare accurate
                  returns.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40">
                <Image
                  src="/images/tax-office-1.jpg"
                  alt="Electronic filing"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full">
                    Fast Refunds
                  </span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  E-File Included
                </h3>
                <p className="text-gray-600">
                  Electronic filing and direct deposit setup for faster refunds.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40">
                <Image
                  src="/images/tax-office-2.jpg"
                  alt="Expert tax help"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                    Expert Help
                  </span>
                </div>
              </div>
              <div className="p-6 text-center">
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
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/images/business/professional-1.jpg"
                  alt="Check eligibility"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  1
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Check Eligibility
                </h3>
                <p className="text-gray-600 mb-4">
                  If you earn under $64,000, you likely qualify for free tax
                  preparation.
                </p>
                <Link
                  href="/vita/eligibility"
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
                >
                  Check now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/images/calendar-card.jpg"
                  alt="Book appointment"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  2
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Book Appointment
                </h3>
                <p className="text-gray-600 mb-4">
                  Schedule a time at one of our convenient locations or virtual
                  appointments.
                </p>
                <Link
                  href="/vita/schedule"
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
                >
                  Schedule now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-48">
                <Image
                  src="/images/business/success-1.jpg"
                  alt="Get your refund"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  3
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Get Your Refund
                </h3>
                <p className="text-gray-600 mb-4">
                  Our certified volunteers prepare and e-file your return. Get
                  your refund fast!
                </p>
                <Link
                  href="/vita/what-to-bring"
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
                >
                  What to bring
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Credits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Tax Credits You May Qualify For
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our trained volunteers help you claim every credit you deserve
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="text-3xl font-black text-green-600 mb-2">$7,430</div>
              <h3 className="font-bold text-gray-900 mb-2">Earned Income Tax Credit</h3>
              <p className="text-sm text-gray-600">
                For working individuals and families with low to moderate income
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="text-3xl font-black text-blue-600 mb-2">$2,000</div>
              <h3 className="font-bold text-gray-900 mb-2">Child Tax Credit</h3>
              <p className="text-sm text-gray-600">
                Per qualifying child under age 17
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
              <div className="text-3xl font-black text-purple-600 mb-2">$2,500</div>
              <h3 className="font-bold text-gray-900 mb-2">American Opportunity Credit</h3>
              <p className="text-sm text-gray-600">
                For college students in their first 4 years
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
              <div className="text-3xl font-black text-amber-600 mb-2">$500</div>
              <h3 className="font-bold text-gray-900 mb-2">Credit for Other Dependents</h3>
              <p className="text-sm text-gray-600">
                For dependents who don&apos;t qualify for Child Tax Credit
              </p>
            </div>
          </div>
          <div className="mt-10 bg-green-50 rounded-2xl p-8 border border-green-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Don&apos;t Leave Money on the Table
                </h3>
                <p className="text-gray-700 mb-4">
                  Many taxpayers miss out on thousands of dollars in credits each year. 
                  Our IRS-certified volunteers are trained to identify every credit and 
                  deduction you qualify for.
                </p>
                <Link
                  href="/vita/schedule"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
                >
                  Get Your Free Tax Prep
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/business/success-1.jpg"
                  alt="Happy taxpayer with refund"
                  fill
                  className="object-cover"
                />
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
                    <p className="text-gray-600">8888 Keystone Xing</p>
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

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Contact</h3>
                    <p className="text-gray-600">(317) 314-3757</p>
                    <p className="text-gray-600">vita@elevateforhumanity.org</p>
                  </div>
                </div>

                {/* IRS VITA Locator */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a
                    href="https://irs.treasury.gov/freetaxprep/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-blue-900 group-hover:text-blue-700">
                        Find More VITA Sites Near You
                      </p>
                      <p className="text-sm text-blue-700">
                        Use the official IRS VITA Locator Tool →
                      </p>
                    </div>
                  </a>
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Get Started with Free Tax Prep
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to file your taxes for free with our IRS-certified volunteers
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link
              href="/vita/eligibility"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group border border-gray-100"
            >
              <div className="relative h-48">
                <Image
                  src="/images/business/professional-1.jpg"
                  alt="Check if you qualify for free tax preparation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  Check Your Eligibility
                </h3>
                <p className="text-gray-600 mb-4">
                  Find out if you qualify for free VITA tax preparation. Generally, if you earn under $64,000 annually, you&apos;re eligible.
                </p>
                <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
                  Check Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link
              href="/vita/what-to-bring"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group border border-gray-100"
            >
              <div className="relative h-48">
                <Image
                  src="/images/business/professional-2.jpg"
                  alt="Documents needed for tax appointment"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  What to Bring
                </h3>
                <p className="text-gray-600 mb-4">
                  Bring your W-2s, 1099s, photo ID, Social Security cards, and last year&apos;s tax return for a smooth appointment.
                </p>
                <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                  View Checklist <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link
              href="/vita/schedule"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group border border-gray-100"
            >
              <div className="relative h-48">
                <Image
                  src="/images/business/collaboration-1.jpg"
                  alt="Schedule your free tax appointment"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Schedule Appointment
                </h3>
                <p className="text-gray-600 mb-4">
                  Book your free tax preparation appointment online. Choose a time that works for you at our Indianapolis location.
                </p>
                <span className="inline-flex items-center gap-2 text-purple-600 font-semibold">
                  Book Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link
              href="/vita/volunteer"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group border border-gray-100"
            >
              <div className="relative h-48">
                <Image
                  src="/images/business/team-1.jpg"
                  alt="Volunteer as a tax preparer"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-red-500 transition-colors">
                  Become a Volunteer
                </h3>
                <p className="text-gray-600 mb-4">
                  Make a difference in your community. Get IRS-certified and help families file their taxes for free.
                </p>
                <span className="inline-flex items-center gap-2 text-red-500 font-semibold">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Elevate Educational Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
              <Image
                src="/images/artlist/hero-training-1.jpg"
                alt="Free career training programs"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mb-6">
                <Heart className="w-4 h-4" />
                Free Career Training
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Build Your Career with Elevate
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                <strong>Elevate for Humanity</strong> offers free workforce training programs 
                to help you start a new career. If you qualify for VITA, you may also qualify 
                for our funded training programs!
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-1">Healthcare</h4>
                  <p className="text-sm text-gray-600">CNA, Medical Assistant, Phlebotomy</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-1">Skilled Trades</h4>
                  <p className="text-sm text-gray-600">HVAC, Welding, Electrical</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-1">Technology</h4>
                  <p className="text-sm text-gray-600">IT Support, Cybersecurity</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-1">CDL Training</h4>
                  <p className="text-sm text-gray-600">Commercial Driving License</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Many programs are <strong>100% free</strong> through WIOA funding for eligible participants. 
                Career coaching, job placement assistance, and support services included.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                >
                  Explore Free Training
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition-colors"
                >
                  View All Programs
                </Link>
              </div>
            </div>
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
