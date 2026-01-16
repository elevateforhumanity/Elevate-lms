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
    canonical: 'https://elevateforhumanity.institute',
  },
  openGraph: {
    title: 'Elevate for Humanity - Free Career Training',
    description: 'Workforce development connecting students to approved training, credentials, and career pathways.',
    url: 'https://elevateforhumanity.institute',
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
      {/* Video Hero Banner */}
      <VideoHeroBanner
        videoSrc="/videos/hero-home.mp4"
        headline="Free Career Training"
        subheadline="Healthcare • Skilled Trades • Technology • Business"
        primaryCTA={{ text: "Apply Now", href: "/apply" }}
        secondaryCTA={{ text: "View Programs", href: "/programs" }}
      />

      {/* Why Choose Our Programs - Paragraph with Image */}
      <section className="py-8 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-black mb-4">
              Why Choose Our Programs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/artlist/hero-training-1.png"
                alt="Students in training program"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-4 md:space-y-6">
              <p className="text-base md:text-lg text-black leading-relaxed">
                Real training, real credentials, real careers. Our programs provide 100% free training with WIOA, WRG, or DOL funding - no tuition costs for eligible students. We connect you with employers hiring our graduates and provide resume help, interview prep, and job search assistance.
              </p>
              <p className="text-base md:text-lg text-black leading-relaxed">
                Complete fast-track programs in weeks or months, not years, and earn industry credentials that employers recognize including state licenses, national certifications, and DOL-registered apprenticeships. You'll receive ongoing career support with resume building, interview coaching, and job matching throughout your journey.
              </p>
              <p className="text-base md:text-lg text-black leading-relaxed">
                With rolling enrollment and multiple start dates throughout the year, you can apply now to secure your spot in the next available cohort and start your path to a rewarding career.
              </p>
            </div>
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
