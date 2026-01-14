import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Phone,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/employer',
  },
  title: 'For Employers | Hire Trained Workers | No Fees',
  description:
    'Hire job-ready workers trained in healthcare, skilled trades, and technology. No recruiting fees. Build apprenticeship programs.',
  openGraph: {
    title: 'For Employers - Hire Trained Workers',
    description: 'Access job-ready candidates with industry credentials. No recruiting fees.',
    url: 'https://www.elevateforhumanity.org/employer',
    siteName: 'Elevate for Humanity',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Employer Services' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'For Employers - Hire Trained Workers',
    description: 'Access job-ready candidates. No recruiting fees.',
    images: ['/og-default.jpg'],
  },
};

export default function EmployerPage() {
  return (
    <div className="bg-white">
      {/* Video Hero Section - No Gradient */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video */}
            <div className="relative h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/employer-hero.mp4" type="video/mp4" />
              </video>
            </div>
            
            {/* Content */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                ⚡ 200+ Employer Partners
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-4 leading-tight">
                Hire Trained Workers
                <span className="block text-blue-600">No Recruiting Fees</span>
              </h1>
              
              <h2 className="text-xl md:text-2xl text-black font-semibold mb-6">
                Access job-ready candidates with industry credentials
              </h2>
              
              <p className="text-lg text-black mb-8 leading-relaxed">
                Pre-screened workers trained in healthcare, skilled trades, and technology. Average time-to-hire: 14 days. Direct hire, zero fees, no contracts.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-black">Pre-screened candidates with industry credentials</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-black">Average time-to-hire: 14 days vs. 42 days industry average</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-black">Optional apprenticeship programs with wage reimbursement</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="tel:+13173143757"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Call (317) 314-3757
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-black px-8 py-4 rounded-lg font-bold text-lg transition-colors border-2 border-gray-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PROBLEMS WE SOLVE */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Three Problems We Solve
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Can't Find Qualified Workers
              </h3>
              <p className="text-black mb-4">
                We train them for you in high-demand fields
              </p>
              <div className="text-green-600 font-semibold">
                → Pre-screened candidates with credentials
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Can't Afford Recruiting Fees
              </h3>
              <p className="text-black mb-4">
                No placement fees, no contracts required
              </p>
              <div className="text-green-600 font-semibold">
                → Direct hire, zero fees
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Can't Wait 6 Months
              </h3>
              <p className="text-black mb-4">
                Candidates ready in 2-4 weeks after training
              </p>
              <div className="text-green-600 font-semibold">
                → Average time-to-hire: 14 days
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET (ROI) */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            What You Get
          </h2>
          <div className="space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Pre-Screened Candidates with Industry Credentials
                </h3>
                <p className="text-black">
                  Every candidate has completed training and earned recognized
                  certifications (CNA, HVAC, CDL, etc.)
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Average Time-to-Hire: 14 Days
                </h3>
                <p className="text-black">
                  vs. 42 days industry average. We match you with qualified
                  candidates fast.
                </p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-lg p-6 flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Optional Apprenticeship Programs with Wage Reimbursement
                </h3>
                <p className="text-black">
                  Build your own talent pipeline. Potential wage reimbursement +
                  federal tax credits available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Call Us
                </h3>
                <p className="text-black">
                  Tell us what positions you need to fill and what skills you're
                  looking for.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  We Match Candidates
                </h3>
                <p className="text-black">
                  Pre-screened, credential-verified workers ready to interview.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  You Interview
                </h3>
                <p className="text-black">
                  Direct hire, no placement fees, no contracts.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  We Support Onboarding
                </h3>
                <p className="text-black">
                  Optional apprenticeship setup and ongoing support available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPRENTICESHIP OPTION */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-6">
            Want to Train Your Own Workers?
          </h2>
          <p className="text-xl text-center text-black mb-12">
            Build a registered apprenticeship program with our support
          </p>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-black mb-4">
                  What We Provide
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-black">
                      One simple MOU (agreement)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-black">
                      One transparent wage schedule
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-black">
                      One point of contact (no runaround)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-black">
                      Potential wage reimbursement
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-black">
                      Federal tax credit eligibility
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-black mb-4">
                  Why This Works
                </h3>
                <div className="space-y-4 text-black">
                  <p>
                    <strong className="text-black">
                      Simple = Scalable.
                    </strong>{' '}
                    One MOU, one schedule, one contact. That's how you build a
                    talent pipeline.
                  </p>
                  <p>
                    <strong className="text-black">
                      Business Language.
                    </strong>{' '}
                    We translate workforce policy into business value. You hear
                    "funded training" and "tax credits," not jargon.
                  </p>
                  <p>
                    <strong className="text-black">Fast Activation.</strong>{' '}
                    No 6-month onboarding. Sign MOU, get checklist, start
                    hosting apprentices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF (METRICS) */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Proven Results
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                200+
              </div>
              <div className="text-black text-lg">Employer Partners</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                1,500+
              </div>
              <div className="text-black text-lg">
                Workers Placed Since 2020
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">92%</div>
              <div className="text-black text-lg">
                Retention After 6 Months
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ONE CTA */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Talk About Your Hiring Needs
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Call us to discuss open positions, apprenticeship programs, or
            workforce development goals.
          </p>
          <a
            href="tel:+13173143757"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-600 rounded-lg font-bold text-xl hover:bg-purple-50 transition shadow-2xl"
          >
            <Phone className="h-6 w-6" />
            Call (317) 314-3757
          </a>
          <p className="mt-6 text-purple-100">
            Or email{' '}
            <a
              href="mailto:elevate4humanityedu@gmail.com"
              className="underline font-semibold hover:text-white"
            >
              elevate4humanityedu@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
