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

const programImages: Record<string, string> = {
  'it-support-specialist': '/images/technology/hero-program-it-support.jpg',
  'it-support': '/images/technology/hero-program-it-support.jpg',
  'cybersecurity-analyst': '/images/technology/hero-program-cybersecurity.jpg',
  'cybersecurity': '/images/technology/hero-program-cybersecurity.jpg',
  'web-development': '/images/technology/hero-program-web-dev.jpg',
  'data-analytics': '/images/technology/hero-program-it-support.jpg',
  'default': '/images/technology/hero-programs-technology.jpg',
};

export default function TechnologyProgramsPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const res = await fetch('/api/programs?category=technology');
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
    video.playsInline = true;
    video.loop = true;
    const playVideo = () => video.play().catch(() => {});
    playVideo();
    video.addEventListener('canplay', playVideo);
    return () => video.removeEventListener('canplay', playVideo);
  }, []);

  return (
    <div className="min-h-screen bg-white">


      {/* Hero - Video only */}
      <section className="relative w-full h-[50vh] min-h-[350px] overflow-hidden bg-slate-900">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
        >
          <source src="https://pub-23811be4d3844e45a8bc2d3dc5e7aaec.r2.dev/videos/hero-home-fast.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Avatar Guide */}
      <PageAvatar 
        videoSrc="/videos/avatars/ai-tutor.mp4" 
        title="Tech Guide" 
      />

      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Pathway Disclosure */}
      <PathwayDisclosure programName="Technology" programSlug="technology" />

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
                    style={{ backgroundImage: `url(${programImages[program.slug] || programImages['default']})` }}
                    role="img"
                    aria-label={program.name}
                  >
                    <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {program.duration_weeks ? `${program.duration_weeks} Weeks` : 'Flexible'}
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
                    <span className="text-purple-600 font-semibold group-hover:underline">
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
      <section className="py-10 bg-purple-600">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Link
            href="/apply?program=technology"
            className="inline-block bg-white text-purple-600 px-8 py-3 font-semibold rounded-full hover:bg-purple-50 transition-colors"
          >
            Start Your Tech Career
          </Link>
        </div>
      </section>
    </div>
  );
}
