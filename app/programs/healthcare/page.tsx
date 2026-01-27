'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import PathwayDisclosure from '@/components/PathwayDisclosure';
import PageAvatar from '@/components/PageAvatar';

interface Program {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  duration_weeks: number;
  price: number;
  certification: string;
  is_active: boolean;
}

// Map program slugs to images
const programImages: Record<string, string> = {
  'cna': '/images/healthcare/hero-program-patient-care.jpg',
  'cna-cert': '/images/healthcare/hero-program-patient-care.jpg',
  'cna-training-wrg': '/images/healthcare/hero-program-patient-care.jpg',
  'direct-support-professional': '/images/healthcare/hero-program-medical-assistant.jpg',
  'dsp-training': '/images/healthcare/hero-program-medical-assistant.jpg',
  'drug-collector': '/images/healthcare/hero-program-phlebotomy.jpg',
  'medical-assistant': '/images/healthcare/hero-program-medical-assistant.jpg',
  'phlebotomy-technician': '/images/healthcare/hero-program-phlebotomy.jpg',
  'pharmacy-technician': '/images/healthcare/hero-program-medical-assistant.jpg',
  'dental-assistant': '/images/healthcare/hero-program-patient-care.jpg',
  'default': '/images/healthcare/hero-program-patient-care.jpg',
};

export default function HealthcareProgramsPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch programs from database
  useEffect(() => {
    async function fetchPrograms() {
      try {
        const res = await fetch('/api/programs?category=healthcare');
        const data = await res.json();
        if (data.status === 'success' && data.programs?.length > 0) {
          setPrograms(data.programs);
        }
      } catch (error) {
        console.error('Failed to fetch programs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPrograms();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  const getImageForProgram = (slug: string) => {
    return programImages[slug] || programImages['default'];
  };

  const formatDuration = (weeks: number) => {
    if (!weeks) return 'Flexible';
    if (weeks <= 2) return '1-2 Weeks';
    if (weeks <= 4) return '2-4 Weeks';
    if (weeks <= 6) return '4-6 Weeks';
    if (weeks <= 8) return '6-8 Weeks';
    return `${weeks} Weeks`;
  };

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
          preload="metadata"
          poster="/images/artlist/hero-training-4.jpg"
        >
          <source src="https://pub-23811be4d3844e45a8bc2d3dc5e7aaec.r2.dev/videos/cna-hero.mp4" type="video/mp4" />
        </video>
        
        
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className={`flex flex-wrap gap-4 transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link 
              href="/apply?program=healthcare"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Apply Now
            </Link>
            <Link 
              href="/wioa-eligibility"
              className="inline-flex items-center text-white text-lg border-b-2 border-white pb-1 hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Avatar Guide */}
      <PageAvatar 
        videoSrc="/videos/avatars/healthcare-guide.mp4" 
        title="Healthcare Guide" 
      />

      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Pathway Disclosure */}
      <PathwayDisclosure programName="Healthcare" programSlug="healthcare" />

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
              {programs.map((program) => (
                <Link
                  key={program.id || program.slug}
                  href={`/programs/${program.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-slate-100"
                >
                  <div 
                    className="relative h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${getImageForProgram(program.slug)})` }}
                    role="img"
                    aria-label={program.name}
                  >
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {formatDuration(program.duration_weeks)}
                    </div>
                    {program.price === 0 && (
                      <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Free
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {program.name}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{program.description}</p>
                    <span className="text-blue-600 font-semibold group-hover:underline">
                      Learn More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Link
            href="/apply?program=healthcare"
            className="inline-block bg-white text-blue-600 px-8 py-3 font-semibold rounded-full hover:bg-blue-50 transition-colors"
          >
            Start Your Healthcare Career
          </Link>
        </div>
      </section>
    </div>
  );
}
