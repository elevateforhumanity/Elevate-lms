'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProgramCategory {
  label: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  image: string;
}

const categoryConfig: Record<string, Omit<ProgramCategory, 'features'>> = {
  healthcare: {
    label: 'FOR CAREER CHANGERS',
    title: 'Healthcare Training',
    description: 'Get certified in high-demand healthcare roles.',
    href: '/programs/healthcare',
    image: '/images/healthcare/cna-training.jpg',
  },
  trades: {
    label: 'FOR HANDS-ON LEARNERS',
    title: 'Skilled Trades',
    description: 'Build a career with in-demand trade skills.',
    href: '/programs/skilled-trades',
    image: '/images/trades/hero-program-hvac.jpg',
  },
  technology: {
    label: 'FOR TECH CAREERS',
    title: 'Technology Programs',
    description: 'Launch your career in IT and cybersecurity.',
    href: '/programs/technology',
    image: '/images/technology/hero-program-it-support.jpg',
  },
};

const testimonials = [
  {
    name: 'Program Graduate',
    quote: 'This program showed me exactly what to do. Now I\'m certified and working full-time at a hospital. Amazing staff and support throughout.',
    link: '#',
  },
  {
    name: 'Program Graduate',
    quote: 'The training was real and practical. I got hired two weeks after finishing. Best decision I ever made for my career.',
    link: '#',
  },
  {
    name: 'Maria Rodriguez',
    quote: 'No cost, no debt, and a real career path. The instructors were supportive and the job placement actually worked.',
    link: '#',
  },
  {
    name: 'David Chen',
    quote: 'I went from unemployed to earning $50K in just 4 months. The program changed everything for my family.',
    link: '#',
  },
];

export default function HomePage() {
  const [programs, setPrograms] = useState<ProgramCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const res = await fetch('/api/programs');
        const data = await res.json();
        if (data.status === 'success' && data.programs) {
          const categoryMap: Record<string, string[]> = {};
          
          data.programs.forEach((p: any) => {
            const cat = p.category?.toLowerCase() || 'other';
            let normalizedCat = cat;
            if (cat.includes('health')) normalizedCat = 'healthcare';
            else if (cat.includes('trade') || cat.includes('barber') || cat.includes('beauty')) normalizedCat = 'trades';
            else if (cat.includes('tech')) normalizedCat = 'technology';
            
            if (!categoryMap[normalizedCat]) {
              categoryMap[normalizedCat] = [];
            }
            if (categoryMap[normalizedCat].length < 3) {
              categoryMap[normalizedCat].push(p.name || p.title);
            }
          });

          const cats: ProgramCategory[] = [];
          ['healthcare', 'trades', 'technology'].forEach(key => {
            const config = categoryConfig[key];
            if (config && categoryMap[key]) {
              cats.push({
                ...config,
                features: categoryMap[key],
              });
            }
          });
          
          setPrograms(cats);
        }
      } catch (error) {
        console.error('Failed to fetch programs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPrograms();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-[#f5f4f0] min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-normal text-[#1a1a1a] leading-[1.1] tracking-[-0.02em] max-w-4xl mb-6">
            The <em className="italic">best</em> career training and job placement, period.
          </h1>
          <p className="text-xl lg:text-2xl text-[#666] mb-8">
            Training programs for Indiana residents
          </p>
          <Link
            href="/programs"
            className="inline-block text-[#1a1a1a] font-medium border-b-2 border-[#1a1a1a] pb-1 hover:opacity-60 transition-opacity"
          >
            Explore All Training Programs
          </Link>
        </div>
      </section>

      {/* Program Cards - Horizontal Layout */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-6 pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible scrollbar-hide">
            {programs.map((program) => (
              <div
                key={program.title}
                className="flex-shrink-0 w-[85vw] lg:w-auto bg-[#f5f4f0] rounded-lg overflow-hidden"
              >
                <div className="p-8">
                  <p className="text-xs font-medium text-[#666] uppercase tracking-[0.1em] mb-4">
                    {program.label}
                  </p>
                  <h3 className="text-2xl font-normal text-[#1a1a1a] mb-3">
                    {program.title}
                  </h3>
                  <p className="text-[#666] mb-6">{program.description}</p>
                  <ul className="space-y-3 mb-6">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-[#1a1a1a]">
                        <svg className="w-4 h-4 text-[#1a1a1a]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={program.href}
                    className="inline-block text-[#1a1a1a] font-medium border-b border-[#1a1a1a] pb-0.5 hover:opacity-60 transition-opacity"
                  >
                    Learn More
                  </Link>
                </div>
                <div className="relative h-48 lg:h-56">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 85vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-12 bg-white border-y border-[#e5e5e5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
            <span className="text-lg font-medium text-[#999]">WorkOne</span>
            <span className="text-lg font-medium text-[#999]">WIOA</span>
            <span className="text-lg font-medium text-[#999]">Certiport</span>
            <span className="text-lg font-medium text-[#999]">USDOL</span>
            <span className="text-lg font-medium text-[#999]">ETPL</span>
          </div>
        </div>
      </section>

      {/* Value Props - 3 Image Cards */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/programs" className="group block">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <Image
                  src="/images/pathways/cna.jpg"
                  alt="Training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-normal text-[#1a1a1a] mb-2">
                Real training, real credentials
              </h3>
              <span className="text-[#1a1a1a] font-medium border-b border-[#1a1a1a] pb-0.5 group-hover:opacity-60 transition-opacity">
                See Programs
              </span>
            </Link>
            <Link href="/how-it-works" className="group block">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <Image
                  src="/images/pathways/hvac.jpg"
                  alt="Free training"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-normal text-[#1a1a1a] mb-2">
                Free for eligible residents
              </h3>
              <span className="text-[#1a1a1a] font-medium border-b border-[#1a1a1a] pb-0.5 group-hover:opacity-60 transition-opacity">
                Check Eligibility
              </span>
            </Link>
            <Link href="/career-services" className="group block">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                <Image
                  src="/images/business/collaboration-1.jpg"
                  alt="Job placement"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-normal text-[#1a1a1a] mb-2">
                Job placement included
              </h3>
              <span className="text-[#1a1a1a] font-medium border-b border-[#1a1a1a] pb-0.5 group-hover:opacity-60 transition-opacity">
                Learn More
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-[#f5f4f0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-normal text-[#1a1a1a] mb-12">
            See what our graduates are saying
          </h2>
          <div className="flex overflow-x-auto gap-6 pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible scrollbar-hide">
            {testimonials.map((t, i) => (
              <a
                key={i}
                href={t.link}
                className="flex-shrink-0 w-[80vw] lg:w-auto bg-white p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <p className="font-medium text-[#1a1a1a] mb-2">{t.name}</p>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[#666] leading-relaxed">{t.quote}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-normal text-white mb-4">
            Ready to start your new career?
          </h2>
          <p className="text-[#999] mb-8">
            Free training, real credentials, job placement support.
          </p>
          <Link
            href="/apply"
            className="inline-block bg-white text-[#1a1a1a] px-8 py-3 font-medium hover:bg-[#f5f4f0] transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </main>
  );
}
