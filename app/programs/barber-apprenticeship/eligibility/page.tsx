import { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle,
  ExternalLink,
  Phone,
  Calendar,
  FileText,
  ArrowRight,
  DollarSign,
  Clock,
  MapPin,
  AlertCircle,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Check Funding Eligibility | Barber Apprenticeship | Elevate for Humanity',
  description: 'Learn how to check your eligibility for WIOA or Workforce Ready Grant funding for the Barber Apprenticeship program.',
};

export default function BarberEligibilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/programs/barber-apprenticeship"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition"
          >
            ← Back to Program Details
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Check Your Funding Eligibility
          </h1>
          <p className="text-xl text-blue-100">
            The Barber Apprenticeship may be available at no cost through WIOA or Workforce Ready Grant funding.
          </p>
        </div>
      </section>

      {/* What is WIOA/WRG */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Funded Training?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">WIOA Funding</h3>
              <p className="text-gray-600 text-sm mb-3">
                The Workforce Innovation and Opportunity Act (WIOA) provides funding for eligible adults 
                and dislocated workers to receive job training at no cost.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Must be 18+ years old</li>
                <li>• Must meet income guidelines OR be unemployed/underemployed</li>
                <li>• Must be authorized to work in the U.S.</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Workforce Ready Grant (WRG)</h3>
              <p className="text-gray-600 text-sm mb-3">
                Indiana's Workforce Ready Grant covers tuition for high-demand certificate programs 
                for Indiana residents.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Must be an Indiana resident</li>
                <li>• Must not already have a bachelor's degree</li>
                <li>• Must be enrolled in an eligible program</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Check Eligibility */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How to Check Your Eligibility</h2>
          <p className="text-gray-600 mb-8">
            Eligibility is determined by your local WorkOne office through Indiana Career Connect. 
            Follow these steps to get started:
          </p>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Create an Indiana Career Connect Account
                </h3>
                <p className="text-gray-600 mb-3">
                  Visit Indiana Career Connect and create a free account. This is the state's official 
                  workforce development portal.
                </p>
                <a
                  href="https://www.indianacareerconnect.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Go to Indiana Career Connect
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Schedule an Intake Appointment
                </h3>
                <p className="text-gray-600 mb-3">
                  Contact your local WorkOne office to schedule an eligibility intake appointment. 
                  During this appointment, a case manager will review your situation and determine 
                  which funding programs you qualify for.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900 mb-2">Marion County WorkOne (Indianapolis):</p>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Phone className="w-4 h-4" />
                    <a href="tel:3176842400" className="hover:text-blue-600">(317) 684-2400</a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>3500 DePauw Blvd, Indianapolis, IN 46268</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Bring Required Documents to Your Appointment
                </h3>
                <p className="text-gray-600 mb-3">
                  To speed up the eligibility process, bring the following documents:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Government-issued ID
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Social Security card
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Proof of income (pay stubs, tax return)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Proof of address
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    High school diploma or GED
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Selective Service registration (males 18-25)
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Request Elevate for Humanity as Your Training Provider
                </h3>
                <p className="text-gray-600 mb-3">
                  Once you're determined eligible, tell your case manager you want to enroll in the 
                  <strong> Barber Apprenticeship with Elevate for Humanity</strong>. We are an approved 
                  ETPL (Eligible Training Provider List) provider.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900 text-sm">
                    <strong>Provider Name:</strong> Elevate for Humanity<br />
                    <strong>Program:</strong> Barber Apprenticeship (2,000 hours)<br />
                    <strong>RAPIDS Code:</strong> 0626CB
                  </p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  We'll Handle the Rest
                </h3>
                <p className="text-gray-600">
                  Once your funding is approved, we'll receive notification from your case manager. 
                  We'll then contact you to complete enrollment and match you with a partner barbershop 
                  to begin your apprenticeship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Expected Timeline</h2>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm"><strong>1-2 weeks:</strong> Intake appointment</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 hidden sm:block" />
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm"><strong>1-2 weeks:</strong> Eligibility determination</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 hidden sm:block" />
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="w-5 h-5 text-green-600" />
              <span className="text-sm"><strong>1 week:</strong> Enrollment & shop placement</span>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm mt-4">
            Total time from first contact to starting training: approximately 3-5 weeks
          </p>
        </div>
      </section>

      {/* Alternative: Self-Pay */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-amber-900 mb-2">
                  Don't Want to Wait? Self-Pay Option Available
                </h3>
                <p className="text-amber-800 mb-4">
                  If you don't qualify for funding or prefer to start immediately, you can enroll 
                  directly with our self-pay option. Payment plans are available.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/programs/barber-apprenticeship/apply"
                    className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-amber-700 transition"
                  >
                    Apply for Self-Pay
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/programs/barber-apprenticeship#pricing"
                    className="inline-flex items-center gap-2 bg-white text-amber-700 border border-amber-300 px-5 py-2.5 rounded-lg font-medium hover:bg-amber-50 transition"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Eligibility?</h2>
          <p className="text-slate-300 mb-6">
            Our team can help guide you through the process.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+13173143757"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
            <a
              href="mailto:elevate4humanityedu@gmail.com"
              className="inline-flex items-center gap-2 bg-slate-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-600 transition"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
