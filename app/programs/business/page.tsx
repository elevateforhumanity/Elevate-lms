'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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

export default function BusinessPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const res = await fetch('/api/programs?category=business');
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

  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-xl">
              <Link href="/programs" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">
                ← Back to Programs
              </Link>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Business Programs
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Develop professional skills. Tax preparation, bookkeeping, and financial services.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-base font-medium rounded-full hover:bg-gray-800 transition-colors"
                >
                  Apply Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-900 text-base font-medium rounded-full hover:border-gray-900 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/heroes/cash-bills.jpg"
                alt="Business training"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Avatar Guide */}
      <PageAvatar 
        videoSrc="/videos/avatars/financial-guide.mp4" 
        title="Business Guide" 
      />

      {/* Pathway Disclosure */}
      <PathwayDisclosure programName="Business" programSlug="business" />

      {/* Quick Facts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">8-12</p>
              <p className="text-gray-600">Weeks</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">$0</p>
              <p className="text-gray-600">Tuition (if eligible)</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">$40K+</p>
              <p className="text-gray-600">Avg. Starting Salary</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">Flexible</p>
              <p className="text-gray-600">Schedule</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-slate-600 font-semibold text-sm uppercase tracking-widest mb-3">Business Programs</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Available Programs</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">All programs are free for eligible participants through WIOA funding.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl h-96 animate-pulse shadow-lg" />
              ))
            ) : (
              programs.map((program) => (
                <Link
                  key={program.id || program.slug}
                  href={`/programs/${program.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/20 text-6xl font-bold">{program.name.charAt(0)}</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {program.duration_weeks ? `${program.duration_weeks} Weeks` : 'Flexible'}
                    </div>
                    {program.price === 0 && (
                      <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Free
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-600 transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">{program.description}</p>
                    <span className="text-slate-700 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <span>→</span>
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What you'll learn
            </h2>
            <ul className="space-y-4 text-lg text-gray-600">
              <li>Tax law fundamentals and IRS regulations</li>
              <li>Tax preparation software (Drake, TaxSlayer)</li>
              <li>Bookkeeping and accounting basics</li>
              <li>QuickBooks certification</li>
              <li>Business communication and customer service</li>
              <li>Entrepreneurship and business planning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gray-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Start your business career
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Free training for eligible Indiana residents.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 text-base font-medium rounded-full hover:bg-gray-100 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </>
  );
}
