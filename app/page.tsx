import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Lazy load ALL components including hero with SSR disabled
const VideoHeroBanner = dynamic(() => import('@/components/home/VideoHeroBanner'), { ssr: false, loading: () => <div className="h-screen bg-gray-900" /> });
const Intro = dynamic(() => import('@/components/home/Intro'), { ssr: false, loading: () => <div className="h-96" /> });
const Orientation = dynamic(() => import('@/components/home/Orientation'), { ssr: false, loading: () => <div className="h-96" /> });
const Testimonials = dynamic(() => import('@/components/home/Testimonials'), { ssr: false, loading: () => <div className="h-96" /> });
const Assurance = dynamic(() => import('@/components/home/Assurance'), { ssr: false, loading: () => <div className="h-96" /> });
const Start = dynamic(() => import('@/components/home/Start'), { ssr: false, loading: () => <div className="h-96" /> });

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
      <main id="main-content">
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

      {/* Geographic Coverage */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Serving Indiana Residents Statewide
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            With training locations across Indiana and online options, we make career training accessible to all Hoosiers
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-black text-blue-600 mb-2">Indianapolis</div>
              <div className="text-sm text-gray-600">Main Campus</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-black text-blue-600 mb-2">Fort Wayne</div>
              <div className="text-sm text-gray-600">Training Center</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-black text-blue-600 mb-2">Evansville</div>
              <div className="text-sm text-gray-600">Partner Site</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-black text-blue-600 mb-2">Online</div>
              <div className="text-sm text-gray-600">Statewide Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Credentials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Trusted Partners & Recognized Credentials
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We partner with leading organizations to provide industry-recognized training and certifications
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-12">
            <div className="flex flex-col items-center gap-2">
              <div className="h-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-gray-800">WorkOne</div>
                  <div className="text-xs text-gray-600">Indiana</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-gray-800">Certiport</div>
                  <div className="text-xs text-gray-700">Testing Center</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-gray-800">WIOA</div>
                  <div className="text-xs text-gray-700">Approved Provider</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-gray-800">ETPL</div>
                  <div className="text-xs text-gray-700">Listed Programs</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Industry-Recognized Certifications
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-gray-700">
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
      </main>
    </>
  );
}
