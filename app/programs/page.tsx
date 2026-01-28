// Programs page - ALL DIFFERENT images from homepage, high quality, different avatar
import Link from 'next/link';
import { PathwayBlock } from '@/components/PathwayBlock';
import PathwayDisclosure from '@/components/compliance/PathwayDisclosure';
import PageAvatar from '@/components/PageAvatar';

// ALL UNIQUE IMAGES - completely different from homepage
const categories = [
  { title: 'Healthcare', description: 'Start a rewarding career helping others in medical settings.', href: '/programs/healthcare', image: '/images/prog-healthcare.jpg', programs: ['CNA Training', 'Medical Assistant', 'Phlebotomy', 'EKG Technician'] },
  { title: 'Skilled Trades', description: 'Build a hands-on career in high-demand technical fields.', href: '/programs/skilled-trades', image: '/images/prog-trades.jpg', programs: ['HVAC Technician', 'Electrical', 'Welding', 'Plumbing'] },
  { title: 'Technology', description: 'Launch your career in the growing digital economy.', href: '/programs/technology', image: '/images/prog-technology.jpg', programs: ['IT Support', 'Cybersecurity', 'Web Development'] },
  { title: 'CDL & Transportation', description: 'Get on the road to a stable driving career.', href: '/programs/cdl', image: '/images/prog-cdl.jpg', programs: ['Class A CDL', 'Class B CDL', 'Hazmat Endorsement'] },
  { title: 'Beauty & Barbering', description: 'Turn your passion for style into a licensed career.', href: '/programs/barber-apprenticeship', image: '/images/prog-barber.jpg', programs: ['Barber Apprenticeship', 'Cosmetology', 'Esthetics'] },
  { title: 'Business & Finance', description: 'Build skills for entrepreneurship and financial services.', href: '/programs/business', image: '/images/prog-business.jpg', programs: ['Tax Preparation', 'Entrepreneurship', 'Customer Service'] },
];

const roadmap = [
  { step: '01', title: 'Check Eligibility', desc: 'Complete a quick assessment to see if you qualify for free training through WIOA or other programs.' },
  { step: '02', title: 'Choose Your Path', desc: 'Select from healthcare, trades, technology, or other career programs based on your interests.' },
  { step: '03', title: 'Get Approved', desc: 'Our team helps you complete enrollment paperwork and get approved for funding.' },
  { step: '04', title: 'Start Training', desc: 'Begin your program with all materials, books, and supplies provided at no cost.' },
  { step: '05', title: 'Earn Credentials', desc: 'Complete industry-recognized certifications that employers are looking for.' },
  { step: '06', title: 'Launch Career', desc: 'Get job placement support including resume help, interview prep, and employer connections.' },
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO - Full width, consistent height */}
      <section className="relative w-full h-[45vh] sm:h-[50vh] lg:h-[55vh]">
        <div className="absolute inset-0">
          <img src="/images/prog-hero-main.jpg" alt="Career training programs" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
          <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
            Career Training Programs
          </span>
        </div>
      </section>

      {/* TEXT SECTION - Below hero, consistent sizing */}
      <section className="py-10 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4">
            Find Your <span className="text-blue-600">Career Path.</span><br />
            <span className="text-red-600">Start Free.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-6">
            Choose from healthcare, skilled trades, technology, and more. All programs are free for eligible participants.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/apply" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg">
              Check Eligibility
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/wioa-eligibility" className="inline-flex items-center gap-2 border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transition-all">
              Learn About Funding
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="py-3 bg-slate-900 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4">
              {['Healthcare', 'Skilled Trades', 'Technology', 'CDL', 'Barbering', 'Business', 'Free Training'].map((text, j) => (
                <span key={j} className="text-white/80 text-base font-medium flex items-center gap-4">
                  {text}<span className="text-red-500">★</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* AVATAR - DIFFERENT from homepage */}
      <PageAvatar videoSrc="/videos/avatars/orientation-guide.mp4" title="Program Guide" />

      {/* PROGRAMS GRID - Consistent card sizes */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Training Categories</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Choose Your Career Path</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Each program is designed to take you from beginner to job-ready.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.title} href={cat.href} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{cat.title}</h3>
                  <p className="text-slate-600 text-sm mb-3">{cat.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {cat.programs.slice(0, 2).map((p, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{p}</span>
                    ))}
                    {cat.programs.length > 2 && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">+{cat.programs.length - 2}</span>
                    )}
                  </div>
                  <span className="text-blue-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore Programs <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP - Consistent sizing */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">How It Works</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Roadmap to Your New Career</h2>
              <p className="text-base text-slate-600 mb-6">Our structured process is designed to get you job-ready fast.</p>
              
              <div className="space-y-3">
                {roadmap.map((item, i) => (
                  <details key={i} className="group bg-slate-50 rounded-xl overflow-hidden" open={i === 0}>
                    <summary className="flex items-center gap-3 p-4 cursor-pointer list-none">
                      <span className="text-xl font-bold text-blue-600">{item.step}</span>
                      <span className="font-semibold text-slate-900 flex-1 text-sm">{item.title}</span>
                      <svg className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-slate-600 text-sm pl-9">{item.desc}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
            
            <div className="lg:sticky lg:top-24">
              <div className="h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
                <img src="/images/prog-roadmap.jpg" alt="Career roadmap" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLLING TEXT */}
      <section className="py-6 bg-blue-600 overflow-hidden">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-4xl md:text-5xl font-black text-white/20 mx-6">
              Free Training • Real Careers • No Debt • Job Placement • 
            </span>
          ))}
        </div>
      </section>

      {/* WHY ELEVATE - Consistent sizing */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">Why Elevate?</p>
              <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-4">
                We don&apos;t just train you. <span className="text-blue-600">We launch your career.</span>
              </h2>
              <p className="text-base text-slate-600 mb-5">From enrollment to employment, we support you every step of the way.</p>
              <div className="space-y-2">
                {[
                  'Free Tuition through WIOA Funding',
                  'Books & Supplies Included',
                  'Transportation Assistance Available',
                  'Job Placement Support',
                  'Industry-Recognized Certifications',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 bg-white rounded-lg shadow-sm">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg">
                <img src="/images/prog-why.jpg" alt="Career support" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PATHWAY BLOCK */}
      <PathwayBlock variant="dark" />

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              { q: 'Is the training really free?', a: 'Yes! WIOA and other workforce programs cover tuition, books, and supplies for eligible participants.' },
              { q: 'How do I know if I qualify?', a: 'Most Indiana residents who are unemployed, underemployed, or looking to change careers qualify. Complete our eligibility check to find out.' },
              { q: 'How long are the programs?', a: 'Most programs are 8-16 weeks. Apprenticeships are longer but you earn while you learn.' },
              { q: 'Will I get help finding a job?', a: 'Yes. We provide career coaching, resume help, interview prep, and direct connections to hiring employers.' },
              { q: 'What support services are available?', a: 'Eligible participants may receive help with transportation, childcare, work supplies, and other support services.' },
            ].map((faq, i) => (
              <details key={i} className="group bg-slate-50 rounded-2xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-slate-900">
                  {faq.q}
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLOSURE */}
      <section className="py-8 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <PathwayDisclosure variant="full" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Begin Your Journey Today</h2>
          <p className="text-lg text-blue-100 mb-8">Whether you&apos;re starting fresh or changing careers, we&apos;re here to help.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/apply" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all">
              Check Eligibility
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="tel:317-314-3757" className="inline-flex items-center gap-2 text-white border-2 border-white/50 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
              (317) 314-3757
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
