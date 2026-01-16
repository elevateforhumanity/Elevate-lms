import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import VideoHeroSection from '@/components/home/VideoHeroSection';
import Intro from '@/components/home/Intro';
import Orientation from '@/components/home/Orientation';
import Testimonials from '@/components/home/Testimonials';
import Assurance from '@/components/home/Assurance';
import Start from '@/components/home/Start';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Elevate for Humanity | Workforce and Education Hub',
  description:
    'A regulated workforce development and credentialing institute connecting students to approved training, recognized credentials, and real career pathways.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org',
  },
  openGraph: {
    title: 'Elevate for Humanity - Free Career Training',
    description: 'Workforce development connecting students to approved training, credentials, and career pathways.',
    url: 'https://www.elevateforhumanity.org',
    siteName: 'Elevate for Humanity',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Elevate for Humanity' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elevate for Humanity - Free Career Training',
    description: 'Workforce development connecting students to training and career pathways.',
    images: ['/og-default.jpg'],
  },
};

export default async function HomePage() {
  const supabase = await createClient();
  
  // Fetch homepage stats
  const { count: studentCount } = await supabase
    .from('students')
    .select('*', { count: 'exact', head: true });

  return (
    <>
      {/* Video Hero Banner - autoplays on all devices */}
      <VideoHeroSection />

      {/* Flagship Program: Barber Apprenticeship */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-bold rounded-full mb-4">
                ⭐ USDOL Registered Apprenticeship
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
                Barber Apprenticeship Program
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-6">
                Earn while you learn. Get your Indiana Barber License through our USDOL-registered apprenticeship. 
                Work with a licensed sponsor, build real skills, and launch your career.
              </p>
              <ul className="text-white/90 space-y-2 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> USDOL Registered Apprenticeship
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Pathway to Indiana Barber License (IPLA)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Earn income while training
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 2,000 hours hands-on experience
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/programs/barber-apprenticeship"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-lg"
                >
                  Learn More
                </a>
                <a
                  href="/apply?program=barber-apprenticeship"
                  className="inline-flex items-center justify-center px-8 py-4 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-400 transition-colors border-2 border-white text-lg"
                >
                  Apply Now
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <div className="text-center">
                  <div className="text-6xl mb-4">💈</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Become a Licensed Barber</h3>
                  <p className="text-white/80 mb-6">Join Indiana's premier barber apprenticeship program</p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-3xl font-black text-white">2,000</div>
                      <div className="text-sm text-white/70">Training Hours</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="text-3xl font-black text-white">$45K+</div>
                      <div className="text-sm text-white/70">Avg. Salary</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Programs Banner */}
      <section className="py-8 md:py-10 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <p className="text-lg text-white/80 mb-2">Also offering free training in:</p>
          <p className="text-xl md:text-2xl font-bold text-white">
            Healthcare • Skilled Trades • Technology • Business
          </p>
        </div>
      </section>

      {/* Features with Your Icon Images */}
      {/* Removed duplicate main tag - ConditionalLayout already provides main#main-content */}
      <section className="py-8 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-black mb-2 md:mb-4">
              Why Choose Our Programs
            </h2>
            <p className="text-base md:text-xl text-black max-w-3xl mx-auto">
              Real training, real credentials, real careers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: "/images/icons/dollar.png",
                title: "100% Free Training",
                description: "No tuition costs with WIOA, WRG, or DOL funding. Training is completely free for eligible students."
              },
              {
                icon: "/images/icons/users.png",
                title: "Job Placement Support",
                description: "Connect with employers hiring our graduates. Resume help, interview prep, and job search assistance included."
              },
              {
                icon: "/images/icons/clock.png",
                title: "Fast-Track Programs",
                description: "Complete programs in weeks or months, not years. Get certified and start earning sooner."
              },
              {
                icon: "/images/icons/award.png",
                title: "Industry Credentials",
                description: "State licenses, national certifications, DOL-registered apprenticeships. Credentials employers recognize."
              },
              {
                icon: "/images/icons/shield.png",
                title: "Career Support",
                description: "Resume building, interview coaching, job matching, and ongoing career counseling throughout your journey."
              },
              {
                icon: "/images/icons/trending-up.png",
                title: "Multiple Start Dates",
                description: "Rolling enrollment throughout the year. Apply now to secure your spot in the next available cohort."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-3 md:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="relative w-12 h-12 md:w-20 md:h-20 mx-auto mb-2 md:mb-4">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-black mb-1 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-base text-black leading-relaxed hidden md:block">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Coverage */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
            Serving Indiana Residents Statewide
          </h2>
          <p className="text-lg md:text-xl text-black max-w-3xl mx-auto mb-8">
            With training locations across Indiana and online options, we make career training accessible to all Hoosiers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-black text-blue-600 mb-2">Indianapolis</div>
              <div className="text-sm text-black">Main Campus</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-black text-blue-600 mb-2">Fort Wayne</div>
              <div className="text-sm text-black">Training Center</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-black text-blue-600 mb-2">Evansville</div>
              <div className="text-sm text-black">Partner Site</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-black text-blue-600 mb-2">Online</div>
              <div className="text-sm text-black">Statewide Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Credentials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
              Trusted Partners & Recognized Credentials
            </h2>
            <p className="text-lg text-black max-w-3xl mx-auto">
              We partner with leading organizations to provide industry-recognized training and certifications
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-12">
            <div className="flex flex-col items-center gap-2">
              <div className="h-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-black">WorkOne</div>
                  <div className="text-xs text-black">Indiana</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-black">Certiport</div>
                  <div className="text-xs text-black">Testing Center</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-black">WIOA</div>
                  <div className="text-xs text-black">Approved Provider</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-black">ETPL</div>
                  <div className="text-xs text-black">Listed Programs</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-black mb-4">
              Industry-Recognized Certifications
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-black">
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">CompTIA A+</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">CNA Certification</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">HVAC EPA 608</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">CDL Class A</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">QuickBooks Certified</span>
              <span className="bg-white px-4 py-2 rounded-full shadow-sm">Microsoft Office Specialist</span>
            </div>
          </div>
        </div>
      </section>

      {/* Keep existing sections */}
      <Intro />
      <Orientation />
      <Testimonials />
      <Assurance />
      <Start />
      {/* Removed closing main tag - ConditionalLayout handles it */}
    </>
  );
}
