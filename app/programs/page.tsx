'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { PathwayBlock } from '@/components/PathwayBlock';
import PathwayDisclosure from '@/components/compliance/PathwayDisclosure';
import AvatarVideoOverlay from '@/components/AvatarVideoOverlay';
import { 
  Heart, 
  Wrench, 
  Monitor, 
  Truck, 
  Scissors, 
  DollarSign,
  ArrowRight,
  CheckCircle,
  Clock,
  Award,
  Users,
  Briefcase,
  GraduationCap
} from 'lucide-react';

const programCategories = [
  {
    title: 'Healthcare',
    description: 'Start a rewarding career helping others. Healthcare is one of the fastest-growing industries with strong job security, competitive wages, and opportunities for advancement. Our programs prepare you for in-demand roles in hospitals, clinics, nursing homes, and home health settings.',
    href: '/programs/healthcare',
    image: '/images/healthcare/program-cna-training.jpg',
    icon: Heart,
    color: 'red',
    programs: [
      { name: 'Certified Nursing Assistant (CNA)', href: '/programs/cna', duration: '4-8 weeks', description: 'Provide direct patient care in healthcare facilities' },
      { name: 'Medical Assistant', href: '/programs/medical-assistant', duration: '12-16 weeks', description: 'Clinical and administrative duties in medical offices' },
      { name: 'Phlebotomy Technician', href: '/programs/phlebotomy', duration: '4-6 weeks', description: 'Draw blood for tests, transfusions, and donations' },
      { name: 'Direct Support Professional', href: '/programs/direct-support-professional', duration: '2-4 weeks', description: 'Support individuals with disabilities' },
      { name: 'Drug Collector', href: '/programs/drug-collector', duration: '1-2 weeks', description: 'Collect specimens for drug testing' },
    ],
  },
  {
    title: 'Skilled Trades',
    description: 'Learn hands-on skills for well-paying trade careers that cannot be outsourced. Skilled trades offer excellent earning potential, job stability, and the satisfaction of building and fixing things. Many of our graduates start earning $40,000-$60,000+ within their first year.',
    href: '/programs/skilled-trades',
    image: '/images/trades/hero-program-hvac.jpg',
    icon: Wrench,
    color: 'orange',
    programs: [
      { name: 'HVAC Technician', href: '/programs/hvac', duration: '12-24 weeks', description: 'Install and repair heating, cooling, and ventilation systems' },
      { name: 'Welding', href: '/programs/welding', duration: '8-16 weeks', description: 'Join metal parts using various welding techniques' },
      { name: 'Electrical', href: '/programs/electrical', duration: '12-24 weeks', description: 'Install and maintain electrical systems' },
      { name: 'Plumbing', href: '/programs/plumbing', duration: '12-24 weeks', description: 'Install and repair water and drainage systems' },
    ],
  },
  {
    title: 'Technology',
    description: 'Enter the growing tech industry with no prior experience required. Technology careers offer remote work opportunities, high salaries, and continuous growth. We teach you practical skills that employers need, from troubleshooting computers to protecting networks from cyber threats.',
    href: '/programs/technology',
    image: '/images/technology/hero-programs-technology.jpg',
    icon: Monitor,
    color: 'blue',
    programs: [
      { name: 'IT Support Specialist', href: '/programs/it-support', duration: '8-12 weeks', description: 'Help desk, troubleshooting, and technical support' },
      { name: 'Cybersecurity Fundamentals', href: '/programs/cybersecurity', duration: '12-16 weeks', description: 'Protect organizations from cyber threats' },
    ],
  },
  {
    title: 'CDL & Transportation',
    description: 'Get your Commercial Driver\'s License and start earning quickly. CDL drivers are in high demand nationwide with starting salaries of $50,000-$80,000+. Our program includes classroom instruction, behind-the-wheel training, and job placement assistance with local and national carriers.',
    href: '/programs/cdl-transportation',
    image: '/images/trades/hero-program-cdl.jpg',
    icon: Truck,
    color: 'green',
    programs: [
      { name: 'CDL Class A Training', href: '/programs/cdl', duration: '3-6 weeks', description: 'Drive tractor-trailers and combination vehicles' },
    ],
  },
  {
    title: 'Barber & Cosmetology Apprenticeships',
    description: 'Turn your creativity into a career through our registered apprenticeship programs. Earn money while you learn under the guidance of experienced professionals. Upon completion, you\'ll have the hours needed for state licensure and real-world experience.',
    href: '/programs/barber-apprenticeship',
    image: '/images/barber-hero.jpg',
    icon: Scissors,
    color: 'purple',
    programs: [
      { name: 'Barber Apprenticeship', href: '/programs/barber-apprenticeship', duration: '18-24 months', description: 'Cut, style, and groom hair for men and boys' },
      { name: 'Cosmetology Apprenticeship', href: '/programs/cosmetology-apprenticeship', duration: '18-24 months', description: 'Hair styling, coloring, and beauty treatments' },
      { name: 'Esthetician Apprenticeship', href: '/programs/esthetician-apprenticeship', duration: '12-18 months', description: 'Skincare treatments and facial services' },
      { name: 'Nail Technician Apprenticeship', href: '/programs/nail-technician-apprenticeship', duration: '6-12 months', description: 'Manicures, pedicures, and nail art' },
    ],
  },
  {
    title: 'Business & Financial Services',
    description: 'Start your own business or work in financial services. Learn tax preparation to help others while earning good income during tax season, or build the skills to launch your own tax business. These programs can lead to self-employment or positions at accounting firms.',
    href: '/programs/business-financial',
    image: '/images/business/tax-prep-certification.jpg',
    icon: DollarSign,
    color: 'teal',
    programs: [
      { name: 'Tax Preparation Certification', href: '/programs/tax-preparation', duration: '4-8 weeks', description: 'Prepare individual and business tax returns' },
      { name: 'Tax Business Entrepreneurship', href: '/programs/tax-entrepreneurship', duration: '8-12 weeks', description: 'Start and run your own tax preparation business' },
    ],
  },
];

const colorClasses: Record<string, { bg: string; text: string; light: string; border: string }> = {
  red: { bg: 'bg-red-600', text: 'text-red-600', light: 'bg-red-50', border: 'border-red-200' },
  orange: { bg: 'bg-orange-600', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-200' },
  blue: { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200' },
  green: { bg: 'bg-green-600', text: 'text-green-600', light: 'bg-green-50', border: 'border-green-200' },
  purple: { bg: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-200' },
  teal: { bg: 'bg-teal-600', text: 'text-teal-600', light: 'bg-teal-50', border: 'border-teal-200' },
};

export default function ProgramsPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    
    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        setTimeout(() => {
          video.play().catch(() => {});
        }, 100);
      }
    };

    playVideo();
    video.addEventListener('loadeddata', playVideo);
    video.addEventListener('canplay', playVideo);
    
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') playVideo();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* AI Avatar Guide */}
      <AvatarVideoOverlay 
        videoSrc="/videos/hero-programs-avatar.mp4"
        avatarName="Albert"
        position="bottom-right"
        size="medium"
        showOnLoad={true}
        autoPlay={false}
      />
      
      {/* Hero */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] flex items-end overflow-hidden bg-slate-900">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover brightness-110"
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          poster="/images/learners/reentry-coaching.jpg"
        >
          <source src="/videos/programs-overview-video-with-narration.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className={`transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Career Training Programs
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Free and funded training programs to help you start a new career. 
              Most programs complete in weeks, not years.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/apply"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Check Your Eligibility
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                href="/wioa-eligibility"
                className="inline-flex items-center text-white text-lg border-b-2 border-white pb-1 hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
              >
                Learn About Funding
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How Training Can Be Free */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                How Can Training Be Free?
              </h2>
              <p className="text-xl text-green-100 mb-6">
                Through federal and state workforce programs, eligible participants can receive 
                100% funded training at no cost. We help you navigate the funding process.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">WIOA Funding</h3>
                    <p className="text-green-100">
                      The Workforce Innovation and Opportunity Act provides funding for job training 
                      to unemployed, underemployed, and low-income individuals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">On-the-Job Training (OJT)</h3>
                    <p className="text-green-100">
                      Get hired by an employer who trains you on the job. The employer receives 
                      wage reimbursement while you earn a paycheck and learn skills.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Earn While You Learn</h3>
                    <p className="text-green-100">
                      Registered apprenticeships let you earn a wage while receiving training. 
                      You graduate with experience, credentials, and no student debt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/programs/cpr-group-training-hd.jpg"
                alt="Students in training program"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Programs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Why Train With Elevate?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We connect you with funding, training, and employers to help you succeed
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                <Image
                  src="/images/business/professional-1.jpg"
                  alt="Free training"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Free or Funded</h3>
              <p className="text-gray-600 text-sm">
                Many programs are 100% free through WIOA and other funding sources for eligible participants
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                <Image
                  src="/images/business/collaboration-1.jpg"
                  alt="Fast track training"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Track</h3>
              <p className="text-gray-600 text-sm">
                Most programs complete in weeks, not years. Start your new career quickly
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                <Image
                  src="/images/business/success-1.jpg"
                  alt="Industry credentials"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Industry Credentials</h3>
              <p className="text-gray-600 text-sm">
                Earn recognized certifications that employers are looking for
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                <Image
                  src="/images/business/team-1.jpg"
                  alt="Job placement"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Job Placement</h3>
              <p className="text-gray-600 text-sm">
                Career coaching and job placement assistance to help you find employment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Explore Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose a career path that matches your interests and goals
            </p>
          </div>

          <div className="space-y-12">
            {programCategories.map((category) => {
              const colors = colorClasses[category.color];
              const IconComponent = category.icon;
              
              return (
                <div 
                  key={category.title}
                  className={`rounded-2xl overflow-hidden border ${colors.border} ${colors.light}`}
                >
                  <div className="grid lg:grid-cols-3 gap-0">
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto min-h-[300px]">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute top-4 left-4 ${colors.bg} text-white px-4 py-2 rounded-full font-bold flex items-center gap-2`}>
                        <IconComponent className="w-5 h-5" />
                        {category.title}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2 p-8">
                      <p className="text-lg text-gray-700 mb-6">
                        {category.description}
                      </p>

                      {/* Programs List */}
                      <h4 className="font-bold text-gray-900 mb-4">Programs Available:</h4>
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        {category.programs.map((program) => (
                          <Link
                            key={program.name}
                            href={program.href}
                            className="flex items-start gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-shadow group border border-gray-100"
                          >
                            <CheckCircle className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                            <div>
                              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {program.name}
                              </div>
                              <div className="text-sm text-gray-600 mb-1">
                                {program.description}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {program.duration}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <Link
                        href={category.href}
                        className={`inline-flex items-center gap-2 ${colors.bg} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                      >
                        View All {category.title} Programs
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Special Programs & Funding
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Additional pathways and funding opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link
              href="/programs/apprenticeships"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-48">
                <Image
                  src="/images/business/handshake-1.jpg"
                  alt="Apprenticeships"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  Registered Apprenticeships
                </h3>
                <p className="text-gray-600 mb-4">
                  Earn while you learn with Department of Labor registered apprenticeship programs. 
                  Get paid training, mentorship, and a nationally recognized credential.
                </p>
                <span className="inline-flex items-center gap-2 text-indigo-600 font-semibold">
                  Explore Apprenticeships <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link
              href="/programs/jri"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-48">
                <Image
                  src="/images/business/team-2.jpg"
                  alt="Second chance programs"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  Justice-Involved Programs
                </h3>
                <p className="text-gray-600 mb-4">
                  Second chance programs for individuals with criminal backgrounds. 
                  We believe everyone deserves an opportunity to build a better future.
                </p>
                <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link
              href="/wioa-eligibility"
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-48">
                <Image
                  src="/images/business/professional-2.jpg"
                  alt="WIOA funding"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  WIOA Funded Programs
                </h3>
                <p className="text-gray-600 mb-4">
                  Free training through Workforce Innovation and Opportunity Act funding. 
                  Check if you qualify for 100% funded training with support services.
                </p>
                <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                  Check Eligibility <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Pathway Block */}
      <PathwayBlock variant="dark" />

      {/* Pathway Disclosure */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <PathwayDisclosure variant="full" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Check your eligibility for free or funded training programs today. 
            Our team will help you find the right program and funding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 font-bold rounded-full hover:bg-blue-50 transition-colors text-lg"
            >
              Start Your Application
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 font-bold rounded-full border-2 border-white hover:bg-white/10 transition-colors text-lg"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
