import { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';
import Intro from '@/components/home/Intro';
import Orientation from '@/components/home/Orientation';
import Testimonials from '@/components/home/Testimonials';
import Assurance from '@/components/home/Assurance';
import Start from '@/components/home/Start';

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

// Use ISR for optimal performance with fresh content
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      {/* Static Image Hero Banner - loads instantly */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Free career training"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
              Free Career Training
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-6 max-w-xl">
              Healthcare • Skilled Trades • Technology • Business
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/apply"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 text-base font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                Apply Now
              </a>
              <a
                href="/pathways"
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white text-base font-bold rounded-xl hover:bg-white/10 transition-colors border-2 border-white"
              >
                View Pathways
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - loads after hero */}
      <section className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">See What We Do</h2>
          <VideoHeroBanner
            videoSrc="/videos/hero-home.mp4"
            headline=""
            subheadline=""
            primaryCTA={{ text: "", href: "" }}
            secondaryCTA={{ text: "", href: "" }}
          />
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
      <section className="py-12 bg-gradient-to-br from-blue-50 to-white">
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

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center">
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
