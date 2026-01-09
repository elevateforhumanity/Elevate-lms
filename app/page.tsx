import { Metadata } from 'next';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';
import Intro from '@/components/home/Intro';
import Orientation from '@/components/home/Orientation';
import Testimonials from '@/components/home/Testimonials';
import Assurance from '@/components/home/Assurance';
import Start from '@/components/home/Start';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Elevate for Humanity | Workforce and Education Hub',
  description:
    'A regulated workforce development and credentialing institute connecting students to approved training, recognized credentials, and real career pathways.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute',
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

      {/* Features with Your Icon Images */}
      <section className="py-8 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-2 md:mb-4">
              Why Choose Our Programs
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
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
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-base text-gray-600 leading-relaxed hidden md:block">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keep existing sections */}
      <Intro />
      <Orientation />
      <Testimonials />
      <Assurance />
      <Start />
    </>
  );
}
