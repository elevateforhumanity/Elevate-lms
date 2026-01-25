'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { PathwayBlock } from '@/components/PathwayBlock';
import PathwayDisclosure from '@/components/compliance/PathwayDisclosure';

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
    image: '/images/healthcare/program-cna-training.jpg',
  },
  trades: {
    title: 'Skilled Trades',
    href: '/programs/skilled-trades',
    image: '/images/trades/hero-program-hvac.jpg',
  },
  technology: {
    title: 'Technology',
    href: '/programs/technology',
    image: '/images/technology/hero-programs-technology.jpg',
  },
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

  // Play video immediately - works on all devices including iPad/laptop
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


      {/* Hero - Clean video with just CTAs */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] flex items-end overflow-hidden bg-slate-900">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover brightness-110"
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          poster="/images/artlist/hero-training-3.jpg"
        >
          <source src="/videos/programs-overview-video-with-narration.mp4" type="video/mp4" />
        </video>
        
        
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className={`flex flex-wrap gap-4 transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link 
              href="/apply"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Start Eligibility & Choose a Career Path
            </Link>
            <Link 
              href="/wioa-eligibility"
              className="inline-flex items-center text-white text-lg border-b-2 border-white pb-1 hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
            >
              Learn About Eligibility
            </Link>
          </div>
          <p className="text-blue-200 text-sm mt-4 max-w-xl">
            All programs require eligibility screening before enrollment.
          </p>
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
      <section className="py-10 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Link
            href="/apply"
            className="inline-block bg-white text-blue-600 px-8 py-3 font-semibold rounded-full hover:bg-blue-50 transition-colors"
          >
            Start Eligibility & Choose This Program
          </Link>
        </div>
      </section>
    </div>
  );
}
