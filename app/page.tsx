import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';
import { 
  DollarSign, 
  Monitor, 
  Heart, 
  Wallet,
  ArrowRight,
  Clock,
  Briefcase,
  Award,
  Users,
  Building2,
  CheckCircle,
} from 'lucide-react';

const Intro = dynamic(() => import('@/components/home/Intro'), { 
  loading: () => <div className="h-96 bg-white" />
});
const Orientation = dynamic(() => import('@/components/home/Orientation'), { 
  loading: () => <div className="h-96 bg-white" />
});
const Testimonials = dynamic(() => import('@/components/home/Testimonials'), { 
  loading: () => <div className="h-96 bg-white" />
});
const Assurance = dynamic(() => import('@/components/home/Assurance'), { 
  loading: () => <div className="h-96 bg-white" />
});
const Start = dynamic(() => import('@/components/home/Start'), { 
  loading: () => <div className="h-96 bg-white" />
});

// Program cards data with images
const HOMEPAGE_PROGRAMS = [
  {
    name: 'Barber Apprenticeship',
    description: 'Earn while you learn through a registered apprenticeship with employer-based training and structured oversight.',
    image: '/hero-images/barber-hero.jpg',
    href: '/programs/barber-apprenticeship',
    tags: ['Earn While You Learn', 'Hybrid', 'Second-Chance Friendly'],
  },
  {
    name: 'Cosmetology Apprenticeship',
    description: 'Complete your cosmetology training while working in a licensed salon with hands-on experience.',
    image: '/hero-images/barber-beauty-category.jpg',
    href: '/programs/cosmetology-apprenticeship',
    tags: ['Earn While You Learn', 'Hands-On', 'Funding May Be Available'],
  },
  {
    name: 'Healthcare Pathways',
    description: 'Start your healthcare career with CNA, medical assistant, and patient care training programs.',
    image: '/hero-images/healthcare-category.jpg',
    href: '/programs/healthcare',
    tags: ['Fast-Track', 'High Demand', 'Funding May Be Available'],
  },
  {
    name: 'Skilled Trades',
    description: 'HVAC, electrical, plumbing, and construction trades with industry certifications.',
    image: '/hero-images/skilled-trades-category.jpg',
    href: '/programs/skilled-trades',
    tags: ['Earn While You Learn', 'Apprenticeships', 'Second-Chance Friendly'],
  },
  {
    name: 'Technology & IT',
    description: 'CompTIA certifications, cybersecurity, and tech support training for in-demand careers.',
    image: '/hero-images/technology-hero.jpg',
    href: '/programs/technology',
    tags: ['Online Options', 'Industry Certs', 'Funding May Be Available'],
  },
  {
    name: 'Workforce Certifications',
    description: 'OSHA, forklift, CDL, and other certifications that employers need.',
    image: '/hero-images/cdl-transportation-category.jpg',
    href: '/programs/certifications',
    tags: ['Fast-Track', 'Employer-Recognized', 'Second-Chance Friendly'],
  },
];

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
      {/* Video Hero Banner - UNCHANGED */}
      <VideoHeroBanner
        videoSrc="/videos/hero-home.mp4"
        headline="Free Career Training"
        subheadline="Healthcare • Skilled Trades • Technology • Business"
        primaryCTA={{ text: "Apply Now", href: "/apply" }}
        secondaryCTA={{ text: "View Programs", href: "/programs" }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          BOX 1 — PRIMARY CTA STRIP (IMMEDIATELY AFTER HERO)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-slate-100">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-black mb-4">
            Earn While You Learn. Train for a Career. Get Paid.
          </h2>
          <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-8">
            Flexible, employer-connected programs designed for adults, career switchers, and second-chance participants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/start"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-lg shadow-lg"
            >
              Find Your Pathway
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/employers"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-800 font-bold rounded-lg hover:bg-slate-50 transition-colors text-lg border-2 border-slate-300"
            >
              For Employers
              <Building2 className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BOX 2 — KEY VALUE ICON GRID (DRAW PEOPLE IN)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-black text-black mb-2">
              Programs Built for Real Life
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Earn While You Learn */}
            <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Earn While You Learn</h3>
              <p className="text-sm text-slate-600">
                Paid or employer-based training opportunities
              </p>
            </div>

            {/* Hybrid & Flexible */}
            <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Hybrid & Flexible</h3>
              <p className="text-sm text-slate-600">
                Online + hands-on learning options
              </p>
            </div>

            {/* Second-Chance Friendly */}
            <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100">
              <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Second-Chance Friendly</h3>
              <p className="text-sm text-slate-600">
                Many programs open to justice-involved individuals
              </p>
            </div>

            {/* Funding May Be Available */}
            <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-100">
              <div className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Funding May Be Available</h3>
              <p className="text-sm text-slate-600">
                WIOA, WRG, JRI, employer support (eligibility required)
              </p>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            Eligibility and availability vary by program and participant.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BOX 3 — PROGRAM CARDS WITH IMAGES (MANDATORY)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-black text-black mb-2">
              Programs & Career Pathways
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {HOMEPAGE_PROGRAMS.map((program, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-slate-200"
              >
                {/* Program Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={program.image}
                    alt={program.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Program Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2">{program.name}</h3>
                  <p className="text-slate-600 text-sm mb-4">{program.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {program.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={program.href}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    View Program
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Explore All Programs CTA */}
          <div className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Explore All Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BOX 4 — EARN WHILE YOU LEARN EXPLAINER (SHORT, STRONG)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Text */}
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-black mb-4">
                What Does "Earn While You Learn" Mean?
              </h2>
              <p className="text-lg text-slate-700 mb-6">
                Some programs allow you to work and earn income while completing training. This can include apprenticeships, employer-based learning, or structured on-the-job training.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Get paid while gaining skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Real work experience, not just class time</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Pathway to long-term employment</span>
                </li>
              </ul>
              <Link
                href="/programs?filter=earn-while-you-learn"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
              >
                See Earn-While-You-Learn Programs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right Side - Image */}
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/hero-images/apprenticeships-hero.jpg"
                alt="Apprentice learning on the job"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BOX 5 — SECOND-CHANCE / REENTRY MESSAGE
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-4">
            Second-Chance & Reentry-Friendly Pathways
          </h2>
          <p className="text-lg md:text-xl text-purple-100 mb-6 max-w-3xl mx-auto">
            Many of our programs are open to individuals with prior justice involvement. We partner with employers willing to consider candidates based on skills, readiness, and training — not just background.
          </p>
          <p className="text-sm text-purple-200 mb-8">
            Eligibility varies by program and employer.
          </p>
          <Link
            href="/start"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-bold rounded-lg hover:bg-purple-50 transition-colors text-lg"
          >
            Start Your Pathway
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BOX 6 — EMPLOYER VALUE + FUNDING HOOK
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <h2 className="text-2xl md:text-4xl font-black mb-4">
                For Employers: Hire, Train, Get Reimbursed
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                Indiana employers partnering with Elevate for Humanity may be eligible for up to $5,000 per hire — up to $50,000 total — through workforce-aligned hiring and apprenticeship pathways.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">Pre-screened candidates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">Structured training & apprenticeships</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">Reduced hiring costs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">We help with paperwork and compliance</span>
                </li>
              </ul>
              <p className="text-sm text-slate-400 mb-8">
                Eligibility, approvals, and funding availability apply.
              </p>
              <Link
                href="/employers"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-lg"
              >
                Partner With Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right Side - Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-green-400 mb-2">$5K</div>
                <div className="text-sm text-slate-300">Per Hire (up to)</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-blue-400 mb-2">$50K</div>
                <div className="text-sm text-slate-300">Total (up to)</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-purple-400 mb-2">100+</div>
                <div className="text-sm text-slate-300">Partner Employers</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 text-center">
                <div className="text-4xl font-black text-amber-400 mb-2">Indiana</div>
                <div className="text-sm text-slate-300">Statewide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BOX 7 — SUPPORT SERVICES (VITA SECONDARY)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-black">
              Support Services
            </h2>
          </div>

          {/* VITA Card Only */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-black mb-2">
                  VITA / TCE Tax Preparation (IRS-Certified)
                </h3>
                <p className="text-slate-600 mb-4">
                  Free or low-cost tax preparation for eligible individuals and families.
                </p>
                <Link
                  href="/vita"
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keep existing sections that add value */}
      <Testimonials />
      <Start />
    </>
  );
}
