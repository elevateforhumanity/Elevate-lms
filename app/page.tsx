import Link from 'next/link';
import Image from 'next/image';
import HomeHeroVideo from './HomeHeroVideo';
import { GraduationCap, Users, Building2, Award, Clock, DollarSign, Briefcase, Shield, BookOpen, HeartHandshake } from 'lucide-react';

const programs = [
  { 
    name: 'Healthcare', 
    href: '/programs/healthcare', 
    image: '/images/healthcare-vibrant.jpg', 
    description: 'CNA, Medical Assistant, Phlebotomy certifications',
    duration: '8-12 weeks',
    careers: ['Certified Nursing Assistant', 'Medical Assistant', 'Phlebotomist'],
    salary: '$35,000 - $45,000'
  },
  { 
    name: 'Skilled Trades', 
    href: '/programs/skilled-trades', 
    image: '/images/skilled-trades-vibrant.jpg', 
    description: 'HVAC, Electrical, Welding, Plumbing training',
    duration: '12-16 weeks',
    careers: ['HVAC Technician', 'Electrician', 'Welder'],
    salary: '$40,000 - $65,000'
  },
  { 
    name: 'Technology', 
    href: '/programs/technology', 
    image: '/images/technology-vibrant.jpg', 
    description: 'IT Support, Cybersecurity certifications',
    duration: '10-14 weeks',
    careers: ['IT Support Specialist', 'Help Desk Technician', 'Network Admin'],
    salary: '$45,000 - $70,000'
  },
  { 
    name: 'CDL Training', 
    href: '/programs/cdl', 
    image: '/images/cdl-vibrant.jpg', 
    description: 'Class A and Class B commercial driving',
    duration: '3-6 weeks',
    careers: ['Truck Driver', 'Delivery Driver', 'Bus Driver'],
    salary: '$50,000 - $80,000'
  },
  { 
    name: 'Barbering', 
    href: '/programs/barber-apprenticeship', 
    image: '/images/barber/gallery-3.jpg', 
    description: 'Licensed barber apprenticeship program',
    duration: '12-18 months',
    careers: ['Licensed Barber', 'Shop Owner', 'Stylist'],
    salary: '$30,000 - $60,000'
  },
  { 
    name: 'Business', 
    href: '/programs/business', 
    image: '/images/business-vibrant.jpg', 
    description: 'Tax preparation, entrepreneurship training',
    duration: '6-10 weeks',
    careers: ['Tax Preparer', 'Bookkeeper', 'Business Owner'],
    salary: '$35,000 - $55,000'
  },
];

const stats = [
  { value: '500+', label: 'Graduates', icon: GraduationCap },
  { value: '85%', label: 'Job Placement Rate', icon: Briefcase },
  { value: '50+', label: 'Employer Partners', icon: Building2 },
  { value: '$0', label: 'Cost for Eligible Students', icon: DollarSign },
];

const features = [
  {
    icon: Shield,
    title: 'WIOA Approved',
    description: 'Federally funded training through the Workforce Innovation and Opportunity Act. Eligible students pay nothing.'
  },
  {
    icon: Clock,
    title: 'Fast-Track Programs',
    description: 'Most certifications completed in 3-16 weeks. Start your new career quickly without years of schooling.'
  },
  {
    icon: Award,
    title: 'Industry Certifications',
    description: 'Earn recognized credentials that employers actively seek. Our certifications are valued across Indiana.'
  },
  {
    icon: HeartHandshake,
    title: 'Career Support',
    description: 'Resume building, interview prep, and direct connections to hiring employers. We support you beyond graduation.'
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ===== VIDEO HERO ===== */}
      <section className="relative h-[100svh] min-h-[500px] sm:h-[80vh] sm:min-h-[500px] sm:max-h-[700px]">
        <HomeHeroVideo />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
                Your Future Starts Here
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8">
                Free career training for eligible Indiana residents. Get certified and hired in weeks, not years.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link 
                  href="/programs"
                  className="bg-brand-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-brand-red-700 transition-colors text-center"
                >
                  Explore Programs
                </Link>
                <Link 
                  href="/wioa-eligibility"
                  className="bg-white text-slate-900 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-slate-100 transition-colors text-center"
                >
                  Check Eligibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-8 sm:py-10 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-brand-red-500 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm sm:text-base text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section className="py-6 sm:py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 text-xs sm:text-sm mb-4 sm:mb-6">APPROVED TRAINING PROVIDER</p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12">
            <Image src="/images/partners/usdol.webp" alt="US Department of Labor" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            <Image src="/images/partners/dwd.webp" alt="Indiana DWD" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            <Image src="/images/partners/workone.webp" alt="WorkOne" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            <Image src="/images/partners/nextleveljobs.webp" alt="Next Level Jobs" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
          </div>
        </div>
      </section>

      {/* ===== ABOUT ELEVATE ===== */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6">
                Transforming Lives Through Career Training
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mb-4">
                Elevate for Humanity is an Indiana-based workforce development organization dedicated to helping individuals gain the skills they need for meaningful careers. We partner with employers, workforce boards, and community organizations to provide free, high-quality training.
              </p>
              <p className="text-base sm:text-lg text-slate-600 mb-6">
                Our programs are funded through the Workforce Innovation and Opportunity Act (WIOA), meaning eligible students pay nothing for tuition, books, or certification exams. We believe everyone deserves access to career opportunities regardless of their financial situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/about" className="text-brand-red-600 font-semibold hover:underline">
                  Learn About Our Mission →
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src="/images/success-new/success-2.jpg" 
                  alt="Students in training" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-brand-red-600 text-white p-4 rounded-xl shadow-lg hidden sm:block">
                <div className="text-2xl font-bold">Since 2019</div>
                <div className="text-sm">Serving Indiana Communities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ELEVATE ===== */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Why Choose Elevate?</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              We're more than a training provider. We're your partner in building a better future.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="w-10 h-10 text-brand-red-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Career Training Programs</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
              Industry-recognized certifications in high-demand fields. Start your new career in weeks, not years.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {programs.map((program) => (
              <Link 
                key={program.name}
                href={program.href}
                className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 hover:border-brand-red-300 hover:shadow-xl transition-all"
              >
                <div className="aspect-[16/10] sm:aspect-[4/3] relative">
                  <Image
                    src={program.image}
                    alt={program.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="bg-brand-red-600 text-white text-xs px-2 py-1 rounded">{program.duration}</span>
                  </div>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 sm:mb-2 group-hover:text-brand-red-600 transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mb-3">{program.description}</p>
                  <div className="border-t border-slate-100 pt-3 mt-3">
                    <div className="text-xs text-slate-500 mb-1">Potential Salary Range</div>
                    <div className="text-sm font-semibold text-green-600">{program.salary}/year</div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-brand-red-600 font-semibold text-xs sm:text-sm group-hover:underline">
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link 
              href="/programs"
              className="inline-flex items-center gap-2 bg-brand-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-red-700 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SUCCESS STORIES ===== */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">Success Stories</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600">Real people who transformed their lives through our programs</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <div className="aspect-square relative rounded-xl sm:rounded-2xl overflow-hidden">
              <Image src="/images/success-new/success-10.jpg" alt="Graduate" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-square relative rounded-xl sm:rounded-2xl overflow-hidden">
              <Image src="/images/success-new/success-11.jpg" alt="Graduate" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-square relative rounded-xl sm:rounded-2xl overflow-hidden">
              <Image src="/images/success-new/success-12.jpg" alt="Graduate" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-square relative rounded-xl sm:rounded-2xl overflow-hidden">
              <Image src="/images/success-new/success-13.jpg" alt="Graduate" fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
          
          <div className="text-center mt-6 sm:mt-8 md:mt-10">
            <Link href="/testimonials" className="text-brand-red-600 font-semibold text-base sm:text-lg hover:underline">
              Read Their Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOR EMPLOYERS ===== */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Employers: Find Skilled Talent
              </h2>
              <p className="text-base sm:text-lg text-slate-300 mb-4">
                Partner with Elevate to access a pipeline of trained, certified candidates ready to work. Our graduates are job-ready from day one with industry-recognized credentials.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-brand-red-500 rounded-full" />
                  Pre-screened, trained candidates
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-brand-red-500 rounded-full" />
                  No recruiting fees
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-2 h-2 bg-brand-red-500 rounded-full" />
                  Customized training partnerships available
                </li>
              </ul>
              <Link 
                href="/employers"
                className="inline-flex items-center gap-2 bg-brand-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-red-700 transition-colors"
              >
                <Building2 className="w-5 h-5" />
                Partner With Us
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image 
                  src="/images/success-new/success-6.jpg" 
                  alt="Employer partnership" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-12 sm:py-16 md:py-20 bg-brand-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to Start Your New Career?</h2>
          <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-8 md:mb-10">
            Check your eligibility in 2 minutes. Most students begin training within 2-4 weeks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link 
              href="/wioa-eligibility"
              className="bg-white text-brand-red-600 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-lg font-bold text-base sm:text-lg hover:bg-slate-100 transition-colors"
            >
              Check Eligibility
            </Link>
            <Link 
              href="tel:317-314-3757"
              className="border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-lg font-bold text-base sm:text-lg hover:bg-white/10 transition-colors"
            >
              Call (317) 314-3757
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
