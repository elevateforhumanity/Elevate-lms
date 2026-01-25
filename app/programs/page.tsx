'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { PathwayBlock } from '@/components/PathwayBlock';
import PathwayDisclosure from '@/components/compliance/PathwayDisclosure';
import HeroAvatarGuide from '@/components/HeroAvatarGuide';
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

interface ProgramCategory {
  title: string;
  description: string;
  href: string;
  image: string;
  count: number;
}

const categoryConfig = {
  healthcare: {
    title: 'Healthcare',
    href: '/programs/healthcare',
    image: '/images/programs-hq/healthcare-hero.jpg',
    icon: Heart,
    color: 'blue',
    programs: [
      { name: 'Certified Nursing Assistant (CNA)', href: '/programs/cna', duration: '4-8 weeks', description: 'Provide direct patient care in healthcare facilities' },
      { name: 'Medical Assistant', href: '/programs/medical-assistant', duration: '12-16 weeks', description: 'Clinical and administrative duties in medical offices' },
      { name: 'Phlebotomy Technician', href: '/programs/phlebotomy', duration: '4-6 weeks', description: 'Draw blood for tests, transfusions, and donations' },
      { name: 'Direct Support Professional', href: '/programs/direct-support-professional', duration: '2-4 weeks', description: 'Support individuals with disabilities' },
      { name: 'Drug Collector', href: '/programs/drug-collector', duration: '1-2 weeks', description: 'Collect specimens for drug testing' },
    ],
  },
  trades: {
    title: 'Skilled Trades',
    href: '/programs/skilled-trades',
    image: '/images/programs-hq/skilled-trades-hero.jpg',
    icon: Wrench,
    color: 'blue',
    programs: [
      { name: 'HVAC Technician', href: '/programs/hvac', duration: '12-24 weeks', description: 'Install and repair heating, cooling, and ventilation systems' },
      { name: 'Welding', href: '/programs/welding', duration: '8-16 weeks', description: 'Join metal parts using various welding techniques' },
      { name: 'Electrical', href: '/programs/electrical', duration: '12-24 weeks', description: 'Install and maintain electrical systems' },
      { name: 'Plumbing', href: '/programs/plumbing', duration: '12-24 weeks', description: 'Install and repair water and drainage systems' },
    ],
  },
  technology: {
    title: 'Technology',
    href: '/programs/technology',
    image: '/images/programs-hq/technology-hero.jpg',
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
    image: '/images/programs-hq/cdl-trucking.jpg',
    icon: Truck,
    color: 'blue',
    programs: [
      { name: 'CDL Class A Training', href: '/programs/cdl', duration: '3-6 weeks', description: 'Drive tractor-trailers and combination vehicles' },
    ],
  },
  {
    title: 'Barber & Cosmetology Apprenticeships',
    description: 'Turn your creativity into a career through our registered apprenticeship programs. Earn money while you learn under the guidance of experienced professionals. Upon completion, you\'ll have the hours needed for state licensure and real-world experience.',
    href: '/programs/barber-apprenticeship',
    image: '/images/programs-hq/barber-training.jpg',
    icon: Scissors,
    color: 'blue',
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
    image: '/images/programs-hq/tax-preparation.jpg',
    icon: DollarSign,
    color: 'blue',
    programs: [
      { name: 'Tax Preparation Certification', href: '/programs/tax-preparation', duration: '4-8 weeks', description: 'Prepare individual and business tax returns' },
      { name: 'Tax Business Entrepreneurship', href: '/programs/tax-entrepreneurship', duration: '8-12 weeks', description: 'Start and run your own tax preparation business' },
    ],
  },
};

const colorClasses: Record<string, { bg: string; text: string; light: string; border: string }> = {
  red: { bg: 'bg-red-600', text: 'text-red-600', light: 'bg-red-50', border: 'border-red-200' },
  orange: { bg: 'bg-orange-600', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-200' },
  blue: { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200' },
  green: { bg: 'bg-green-600', text: 'text-green-600', light: 'bg-green-50', border: 'border-green-200' },
  teal: { bg: 'bg-blue-600', text: 'text-blue-600', light: 'bg-blue-50', border: 'border-blue-200' },
};

export default function ProgramsPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [categories, setCategories] = useState<ProgramCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch program categories from database
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/programs');
        const data = await res.json();
        if (data.status === 'success' && data.programs) {
          // Group programs by category and count
          const categoryMap: Record<string, { programs: any[], names: string[] }> = {};
          
          data.programs.forEach((p: any) => {
            const cat = p.category?.toLowerCase() || 'other';
            let normalizedCat = cat;
            if (cat.includes('health')) normalizedCat = 'healthcare';
            else if (cat.includes('trade') || cat.includes('barber') || cat.includes('beauty')) normalizedCat = 'trades';
            else if (cat.includes('tech')) normalizedCat = 'technology';
            
            if (!categoryMap[normalizedCat]) {
              categoryMap[normalizedCat] = { programs: [], names: [] };
            }
            categoryMap[normalizedCat].programs.push(p);
            if (categoryMap[normalizedCat].names.length < 3) {
              categoryMap[normalizedCat].names.push(p.name);
            }
          });

          const cats: ProgramCategory[] = [];
          ['healthcare', 'trades', 'technology'].forEach(key => {
            const config = categoryConfig[key as keyof typeof categoryConfig];
            const catData = categoryMap[key];
            if (config && catData) {
              cats.push({
                ...config,
                description: catData.names.join(', '),
                count: catData.programs.length,
              });
            }
          });
          
          setCategories(cats);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

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
          poster="/images/heroes-hq/homepage-hero.jpg"
        >
          <source src="/videos/programs-overview-video-with-narration.mp4" type="video/mp4" />
        </video>
        
        
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className={`transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Hero Text */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 max-w-3xl">
              Free Career Training Programs
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-2xl">
              Get job-ready in weeks, not years. 100% funded training for eligible participants.
            </p>
            
            {/* CTAs */}
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

      {/* Avatar Guide - Below Hero */}
      <HeroAvatarGuide 
        videoSrc="/videos/hero-programs-avatar.mp4"
        avatarName="Albert"
        message="Let me help you find the right training program for your career goals."
      />

      {/* How Training Can Be Free */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                How Can Training Be Free?
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Through federal and state workforce programs, eligible participants can receive 
                100% funded training at no cost. We help you navigate the funding process.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">WIOA Funding</h3>
                    <p className="text-blue-100">
                      The Workforce Innovation and Opportunity Act provides funding for job training 
                      to unemployed, underemployed, and low-income individuals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">On-the-Job Training (OJT)</h3>
                    <p className="text-blue-100">
                      Get hired by an employer who trains you on the job. The employer receives 
                      wage reimbursement while you earn a paycheck and learn skills.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Earn While You Learn</h3>
                    <p className="text-blue-100">
                      Registered apprenticeships let you earn a wage while receiving training. 
                      You graduate with experience, credentials, and no student debt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/programs-hq/students-learning.jpg"
                alt="Students in training program"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-slate-100"
                >
                  <div className="relative h-48">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      quality={85}
                    />
                    {category.count > 0 && (
                      <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {category.count} Programs
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {category.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <span className="text-blue-600 font-semibold group-hover:underline">
                      View Programs →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
