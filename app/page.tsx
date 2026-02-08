import Link from 'next/link';
import Image from 'next/image';
import HomeHeroVideo from './HomeHeroVideo';

const programs = [
  { 
    name: 'Healthcare', 
    href: '/programs/healthcare', 
    image: '/images/prog-healthcare.jpg', 
    description: 'CNA, Medical Assistant, Phlebotomy certifications',
    duration: '8-12 weeks',
    salary: '$35,000 - $45,000'
  },
  { 
    name: 'Skilled Trades', 
    href: '/programs/skilled-trades', 
    image: '/images/prog-trades.jpg', 
    description: 'HVAC, Electrical, Welding, Plumbing training',
    duration: '12-16 weeks',
    salary: '$40,000 - $65,000'
  },
  { 
    name: 'Technology', 
    href: '/programs/technology', 
    image: '/images/prog-technology.jpg', 
    description: 'IT Support, Cybersecurity certifications',
    duration: '10-14 weeks',
    salary: '$45,000 - $70,000'
  },
  { 
    name: 'CDL Training', 
    href: '/programs/cdl', 
    image: '/images/prog-cdl.jpg', 
    description: 'Class A and Class B commercial driving',
    duration: '3-6 weeks',
    salary: '$50,000 - $80,000'
  },
  { 
    name: 'Barbering', 
    href: '/programs/barber-apprenticeship', 
    image: '/images/prog-barber.jpg', 
    description: 'Licensed barber apprenticeship program',
    duration: '12-18 months',
    salary: '$30,000 - $60,000'
  },
  { 
    name: 'Business', 
    href: '/programs/business', 
    image: '/images/prog-business.jpg', 
    description: 'Tax preparation, entrepreneurship training',
    duration: '6-10 weeks',
    salary: '$35,000 - $55,000'
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ===== VIDEO HERO ===== */}
      <section className="relative h-[100svh] min-h-[600px] sm:h-[85vh] sm:min-h-[600px] sm:max-h-[800px]">
        <HomeHeroVideo />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-brand-red-400 font-semibold text-sm sm:text-base mb-3 tracking-wide">
                INDIANA WORKFORCE DEVELOPMENT
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
                Train for a Career.<br />
                <span className="text-brand-red-400">Get Paid to Learn.</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
                Elevate for Humanity provides free career training and paid apprenticeships 
                for Indiana residents. Earn industry certifications in healthcare, skilled trades, 
                technology, and more—at no cost to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/apply"
                  className="bg-brand-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-brand-red-700 transition-all hover:scale-105 text-center shadow-lg"
                >
                  Apply Now — It's Free
                </Link>
                <Link 
                  href="/programs"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all text-center"
                >
                  Explore Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT WE DO ===== */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-brand-red-600 font-semibold text-sm mb-3 tracking-wide">WHO WE ARE</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                We Help Hoosiers Build Real Careers
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                <strong>Elevate for Humanity</strong> is a nonprofit workforce development organization 
                based in Indianapolis. We connect Indiana residents with free career training, 
                paid apprenticeships, and direct pathways to employment.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Our programs are funded through partnerships with the <strong>Indiana Department of 
                Workforce Development</strong>, <strong>WorkOne</strong>, and the <strong>Justice 
                Reinvestment Initiative (JRI)</strong>—meaning qualified participants pay nothing 
                for training, certifications, or job placement assistance.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Whether you're looking to start fresh, change careers, or gain new skills, 
                we're here to help you succeed.
              </p>
              <Link 
                href="/about"
                className="inline-flex items-center text-brand-red-600 font-semibold text-lg hover:text-brand-red-700 group"
              >
                Learn More About Our Mission
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/success-new/success-2.jpg" 
                  alt="Students in career training" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-6 rounded-2xl shadow-xl hidden md:block max-w-xs">
                <p className="text-3xl font-bold text-brand-red-400 mb-1">500+</p>
                <p className="text-white/80">Hoosiers trained and employed since 2019</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EARN WHILE YOU LEARN ===== */}
      <section className="py-16 sm:py-20 md:py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden">
                  <Image 
                    src="/images/success-new/success-4.jpg" 
                    alt="Apprentice learning on the job" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden mt-8">
                  <Image 
                    src="/images/success-new/success-6.jpg" 
                    alt="Student earning while learning" 
                    fill 
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-brand-red-400 font-semibold text-sm mb-3 tracking-wide">EARN WHILE YOU LEARN</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Get Paid During Your Training
              </h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Many of our programs offer <strong className="text-white">paid apprenticeships</strong> where 
                you earn a paycheck while gaining hands-on experience. You're not just learning—you're 
                building your career from day one.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">$</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Paid Training Programs</h3>
                    <p className="text-slate-400">Earn $15-$20/hour while you learn your trade</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">✓</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Free Certifications</h3>
                    <p className="text-slate-400">All exam fees and materials covered</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">→</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Direct Job Placement</h3>
                    <p className="text-slate-400">85% of graduates employed within 90 days</p>
                  </div>
                </div>
              </div>
              <Link 
                href="/apprenticeships"
                className="inline-flex items-center bg-brand-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-red-700 transition-all"
              >
                View Apprenticeship Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FUNDING & ELIGIBILITY ===== */}
      <section className="py-16 sm:py-20 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-brand-red-600 font-semibold text-sm mb-3 tracking-wide">HOW IT'S FUNDED</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Training at No Cost to You
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our programs are funded through state and federal workforce initiatives. 
              If you qualify, your entire training is covered—including tuition, books, 
              certifications, and even supportive services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* JRI Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
              <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-6">
                <Image 
                  src="/images/success-new/success-8.jpg" 
                  alt="Justice Reinvestment Initiative participant" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Justice Reinvestment Initiative (JRI)</h3>
              <p className="text-slate-600 mb-4">
                Indiana's JRI program provides funding for individuals with justice involvement 
                to access career training and reentry support. Get a fresh start with marketable skills.
              </p>
              <Link href="/jri" className="text-brand-red-600 font-semibold hover:underline">
                Learn about JRI eligibility →
              </Link>
            </div>

            {/* WorkOne Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
              <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-6">
                <Image 
                  src="/images/success-new/success-10.jpg" 
                  alt="WorkOne participant in training" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">WorkOne / WIOA Funding</h3>
              <p className="text-slate-600 mb-4">
                The Workforce Innovation and Opportunity Act provides training funds for 
                unemployed, underemployed, and low-income Indiana residents seeking new careers.
              </p>
              <Link href="/wioa-eligibility" className="text-brand-red-600 font-semibold hover:underline">
                Check your eligibility →
              </Link>
            </div>

            {/* Next Level Jobs Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
              <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-6">
                <Image 
                  src="/images/success-new/success-12.jpg" 
                  alt="Next Level Jobs participant" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Next Level Jobs</h3>
              <p className="text-slate-600 mb-4">
                Indiana's Next Level Jobs program covers training costs for high-demand 
                careers in healthcare, IT, advanced manufacturing, and transportation.
              </p>
              <Link href="/next-level-jobs" className="text-brand-red-600 font-semibold hover:underline">
                See qualifying programs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-brand-red-600 font-semibold text-sm mb-3 tracking-wide">OUR PROGRAMS</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Career Training That Works
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Industry-recognized certifications in high-demand fields. 
              Most programs complete in 3-16 weeks—not years.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {programs.map((program) => (
              <Link 
                key={program.name}
                href={program.href}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-brand-red-300 hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{program.name}</h3>
                    <p className="text-white/80 text-sm">{program.description}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Duration</p>
                      <p className="text-slate-900 font-semibold">{program.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Avg. Salary</p>
                      <p className="text-green-600 font-semibold">{program.salary}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-brand-red-600 font-semibold text-sm group-hover:underline flex items-center">
                      Learn More
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/programs"
              className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SUCCESS STORIES ===== */}
      <section className="py-16 sm:py-20 md:py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-brand-red-400 font-semibold text-sm mb-3 tracking-wide">SUCCESS STORIES</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Real People. Real Results.
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Hundreds of Hoosiers have transformed their lives through our programs. 
              Here are some of their stories.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="aspect-square relative rounded-2xl overflow-hidden group">
              <Image src="/images/success-new/success-1.jpg" alt="Graduate success story" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="aspect-square relative rounded-2xl overflow-hidden group">
              <Image src="/images/success-new/success-3.jpg" alt="Graduate success story" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="aspect-square relative rounded-2xl overflow-hidden group">
              <Image src="/images/success-new/success-5.jpg" alt="Graduate success story" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="aspect-square relative rounded-2xl overflow-hidden group">
              <Image src="/images/success-new/success-7.jpg" alt="Graduate success story" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/testimonials" className="inline-flex items-center text-white font-semibold text-lg hover:text-brand-red-400 group">
              Read Their Stories
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-sm mb-8 tracking-wide">TRUSTED BY INDIANA'S WORKFORCE PARTNERS</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <Image src="/images/partners/usdol.webp" alt="US Department of Labor" width={60} height={60} className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/images/partners/dwd.webp" alt="Indiana DWD" width={60} height={60} className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/images/partners/workone.webp" alt="WorkOne" width={60} height={60} className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/images/partners/nextleveljobs.webp" alt="Next Level Jobs" width={60} height={60} className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* ===== AVATAR GUIDE ===== */}
      <section className="py-16 sm:py-20 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  poster="/images/hero-poster.jpg"
                >
                  <source src="/videos/avatars/home-welcome.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-brand-red-600 font-semibold text-sm mb-3 tracking-wide">MEET YOUR GUIDE</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                We're Here to Help You Succeed
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                At Elevate for Humanity, we believe everyone deserves a pathway to a meaningful career. 
                Our team of career advisors, instructors, and support staff are dedicated to helping 
                you every step of the way—from enrollment to employment.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Whether you're starting fresh, changing careers, or returning to the workforce after 
                a setback, we're here to guide you. Our programs are designed for real people with 
                real challenges, and we're committed to your success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center bg-brand-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-red-700 transition-all"
                >
                  Talk to an Advisor
                </Link>
                <Link 
                  href="/about"
                  className="inline-flex items-center text-slate-700 font-semibold hover:text-brand-red-600 group"
                >
                  Learn About Our Team
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 sm:py-20 md:py-24 bg-brand-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Take the first step today. Check your eligibility in 2 minutes, 
            or call us to speak with an enrollment advisor.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/apply"
              className="bg-white text-brand-red-600 px-10 py-5 rounded-lg font-bold text-lg hover:bg-slate-100 transition-all hover:scale-105 shadow-lg"
            >
              Apply Now — Free
            </Link>
            <Link 
              href="tel:317-314-3757"
              className="border-2 border-white text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
            >
              Call (317) 314-3757
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
