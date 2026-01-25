import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Clock,
  DollarSign,
  MapPin,
  CheckCircle,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  Star,
  Briefcase,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Program Name | Elevate for Humanity',
  description: 'Program description for SEO',
};

export default function ProgramPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Video */}
      <section className="relative w-full -mt-[72px]">
        <div className="relative min-h-[100vh] sm:min-h-[70vh] md:min-h-[75vh] w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/programs-overview-video-with-narration.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-slate-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-orange-500">
                4-12
              </div>
              <div className="text-sm text-slate-300">Weeks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-orange-500">$0</div>
              <div className="text-sm text-slate-300">Tuition Cost</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-orange-500">
                20+
              </div>
              <div className="text-sm text-slate-300">Programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-orange-500">
                50+
              </div>
              <div className="text-sm text-slate-300">Employer Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Content */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-4 py-2 bg-green-100 text-green-800 text-sm font-bold rounded-full">
              100% Free with Funding
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">
              WIOA Approved
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-800 text-sm font-bold rounded-full">
              Fast Track
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-black mb-6 leading-tight">
            Launch Your Career in Healthcare
          </h1>

          <p className="text-xl md:text-2xl text-black mb-8 leading-relaxed">
            Get certified as a CNA, Medical Assistant, or Phlebotomist in weeks,
            not years. 100% funded training with guaranteed job placement
            support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-3 bg-brand-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-brand-orange-700 transition shadow-lg"
            >
              Apply Now - It's Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white border-2 border-slate-900 text-black px-8 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Why Choose This Program?
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Everything you need to launch a successful healthcare career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Fast Track Training
              </h3>
              <p className="text-black leading-relaxed">
                Complete your certification in 4-12 weeks with our accelerated
                program. Start your new career faster than traditional programs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                100% Free
              </h3>
              <p className="text-black leading-relaxed">
                No tuition, no fees, no student debt. Your training is fully
                funded through WIOA, WRG, and other workforce programs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">
                Job Placement
              </h3>
              <p className="text-black leading-relaxed">
                Our career services team provides job placement support. We connect
                you directly with hiring employers in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
                What You'll Learn
              </h2>
              <p className="text-xl text-black mb-8">
                Comprehensive training covering everything you need to succeed
                in your new career.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">
                      Core Skills
                    </h3>
                    <p className="text-black">
                      Master essential healthcare skills including patient care,
                      vital signs, and medical terminology.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">
                      Hands-On Practice
                    </h3>
                    <p className="text-black">
                      Real-world clinical experience in actual healthcare
                      settings with experienced instructors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">
                      Certification Prep
                    </h3>
                    <p className="text-black">
                      Complete exam preparation to ensure you pass your
                      certification on the first try.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">
                      Career Support
                    </h3>
                    <p className="text-black">
                      Resume building, interview prep, and direct connections to
                      hiring employers in your area.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-8">Program Highlights</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">4-12 Weeks</div>
                    <div className="text-slate-300 text-sm">
                      Program Duration
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Hybrid Format</div>
                    <div className="text-slate-300 text-sm">
                      Online + In-Person
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">State Approved</div>
                    <div className="text-slate-300 text-sm">
                      Nationally Recognized
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Small Classes</div>
                    <div className="text-slate-300 text-sm">
                      Personalized Attention
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-black">
              Real graduates, real results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-black mb-6 leading-relaxed">
                "This program changed my life. I went from unemployed to working
                as a CNA at a top hospital in just 8 weeks. The instructors were
                amazing!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div>
                  <div className="font-bold text-black">Graduate</div>
                  <div className="text-sm text-black">
                    CNA Graduate 2024
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-black mb-6 leading-relaxed">
                "Best decision I ever made. The training was thorough, the
                support was incredible, and I had a job offer before I even
                graduated."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div>
                  <div className="font-bold text-black">Michael Davis</div>
                  <div className="text-sm text-black">
                    Medical Assistant 2024
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-black mb-6 leading-relaxed">
                "I was skeptical about free training, but this exceeded all my
                expectations. Now I'm earning $48K a year doing work I love."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                <div>
                  <div className="font-bold text-black">
                    Graduate
                  </div>
                  <div className="text-sm text-black">
                    Phlebotomist 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">
              Career Outcomes
            </h2>
            <p className="text-xl text-black">Where our graduates work</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-black mb-2">50+</div>
              <div className="text-black">Employer Partners</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-black mb-2">
                100%
              </div>
              <div className="text-black">Free with WIOA Funding</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-black mb-2">500+</div>
              <div className="text-black">Graduates Placed</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-black mb-2">100%</div>
              <div className="text-black">Pass Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-blue-700 to-brand-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl mb-8">
            Join hundreds of graduates who transformed their lives through our
            free training program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-3 bg-brand-orange-600 text-white px-10 py-5 rounded-xl text-lg font-bold hover:bg-brand-orange-700 transition shadow-2xl"
            >
              Apply Now - 100% Free
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-xl text-lg font-bold hover:bg-slate-100 transition"
            >
              Schedule a Call
            </Link>
          </div>
          <p className="text-white mt-6 text-sm">
            Takes 5 minutes • No commitment required • Start as soon as next
            week
          </p>
        </div>
      </section>
    </main>
  );
}
