'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FundingBadge } from './FundingBadge';
import PathwayDisclosure from '@/components/compliance/PathwayDisclosure';
import AvatarVideoOverlay from '@/components/AvatarVideoOverlay';

export type OutcomeItem = string | { title: string; description: string };

export interface ProgramData {
  title: string;
  category: string;
  categoryHref: string;
  description: string;
  image: string;
  duration: string;
  tuition: string;
  salary: string;
  demand: string;
  fundingType?: 'funded' | 'self-pay';
  highlights: string[];
  skills: string[];
  outcomes: OutcomeItem[];
  requirements?: string[];
  relatedPrograms?: { title: string; href: string; description: string }[];
  avatarVideo?: string;
  avatarName?: string;
}

interface ProgramPageTemplateProps {
  program: ProgramData;
}

export function ProgramPageTemplate({ program }: ProgramPageTemplateProps) {
  return (
    <>
      {/* AI Avatar Guide */}
      {program.avatarVideo && (
        <AvatarVideoOverlay 
          videoSrc={program.avatarVideo}
          avatarName={program.avatarName || 'AI Guide'}
          position="bottom-right"
          size="medium"
          showOnLoad={true}
          autoPlay={false}
        />
      )}
      
      {/* Hero Image */}
      <section className="relative h-[40vh] min-h-[300px] lg:h-[50vh] lg:min-h-[400px] bg-gray-100">
        <Image
          src={program.image}
          alt={program.title}
          fill
          sizes="100vw"
          className="object-cover brightness-105"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </section>

      {/* Funding Badge */}
      {program.fundingType && (
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <FundingBadge type={program.fundingType} />
          </div>
        </section>
      )}

      {/* Badges + CTA */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {program.duration}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {program.tuition} Tuition
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded-full">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {program.salary} Avg. Salary
              </span>
            </div>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              Check Eligibility & Apply
            </Link>
          </div>
        </div>
      </section>

      {/* Title + Highlights */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <Link 
              href={program.categoryHref} 
              className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block"
            >
              ← {program.category}
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {program.title}
            </h1>
            <p className="text-xl text-gray-500">
              {program.description}
            </p>
          </div>

          {program.highlights && program.highlights.length > 0 && (
            <div className="border-t border-gray-100 pt-12">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-8">This program includes</p>
              <div className="grid md:grid-cols-3 gap-8">
                {program.highlights.map((highlight, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900">{highlight}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-12">
            What you'll learn
          </h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-4">
            {(program.skills || []).map((skill, index) => (
              <div key={index} className="flex items-start gap-3 py-3 border-b border-gray-200">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <p className="text-4xl font-bold text-gray-200 mb-4">1.</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Apply online</h3>
              <p className="text-gray-500">Submit your application in minutes</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-200 mb-4">2.</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete training</h3>
              <p className="text-gray-500">Earn your industry credential</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-200 mb-4">3.</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Start working</h3>
              <p className="text-gray-500">Get job placement support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-12">
            Career outcomes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(program.outcomes || []).map((outcome, index) => {
              const isObject = typeof outcome === 'object';
              const title = isObject ? outcome.title : outcome;
              const description = isObject ? outcome.description : null;
              
              return (
                <div key={index} className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                  {description && (
                    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements */}
      {program.requirements && program.requirements.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-12">
              Requirements
            </h2>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-4">
              {program.requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3 py-3 border-b border-gray-100">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Programs */}
      {program.relatedPrograms && program.relatedPrograms.length > 0 && (
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-12">
              Looking for a different program?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {program.relatedPrograms.map((related, index) => (
                <Link
                  key={index}
                  href={related.href}
                  className="group p-6 bg-white rounded-xl hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:underline">
                    {related.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{related.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gray-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-400 mb-6">
            {program.fundingType === 'funded' 
              ? 'Free training for eligible Indiana residents.'
              : 'Self-pay program with payment options available.'}
          </p>
          
          {/* Pathway Disclosure above CTA */}
          <div className="mb-8">
            <PathwayDisclosure variant="compact" className="bg-gray-800 border-gray-700" />
          </div>
          
          <Link
            href="/apply"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 text-sm font-medium rounded-full hover:bg-gray-100 transition-colors"
          >
            Start Eligibility & Choose This Program
          </Link>
        </div>
      </section>
    </>
  );
}
