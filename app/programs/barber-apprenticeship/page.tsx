// Force static generation for performance
export const dynamic = 'force-static';
export const revalidate = 86400;

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";


export const metadata: Metadata = {
  title: 'Barber Apprenticeship Program | Become a Licensed Barber | Elevate for Humanity',
  description: 'Become a licensed barber through real-world apprenticeship training in Indianapolis. Train in approved barbershops, earn hours, track progress digitally, and graduate job-ready.',
};

const IMAGES = {
  training: "/images/barber/training.jpg",
  gallery1: "/images/barber/gallery-1.jpg",
  gallery2: "/images/barber/gallery-2.jpg",
  gallery3: "/images/barber/gallery-3.jpg",
};

async function getProgramStats() {
  try {
    const supabase = await createClient();
    if (!supabase) return { totalHours: 2000, enrolledCount: 0, completedCount: 0 };

    // Get program details
    const { data: program } = await supabase
      .from('programs')
      .select('id, total_hours, tuition')
      .or('slug.eq.barber-apprenticeship,code.eq.BARBER-2024')
      .single();

    // Get enrollment stats
    const { count: enrolledCount } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('program_id', program?.id)
      .in('status', ['active', 'completed']);

    const { count: completedCount } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true })
      .eq('program_id', program?.id)
      .eq('status', 'completed');

    return {
      totalHours: program?.total_hours || 2000,
      tuition: program?.tuition || 5250,
      enrolledCount: enrolledCount || 0,
      completedCount: completedCount || 0,
    };
  } catch {
    return { totalHours: 2000, tuition: 5250, enrolledCount: 0, completedCount: 0 };
  }
}

export default async function BarberApprenticeshipPage() {
  const stats = await getProgramStats();
  
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* VIDEO HERO */}
      <section className="relative min-h-screen flex items-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/hero-images/barber-hero.jpg"
        >
          <source src="/videos/barber-hero-final.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 md:py-32">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full">
                USDOL Registered
              </span>
              <span className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-full">
                WRG Funding Available
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
              Barber Apprenticeship
              <span className="block text-white/90">Built for real shop skills and real hours.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white drop-shadow-md">
              Train at approved partner sites, track hours in your dashboard, and complete the pathway with structured support.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/programs/barber-apprenticeship/inquiry"
                className="rounded-2xl bg-white text-slate-900 px-8 py-4 font-semibold shadow-lg hover:bg-gray-100 transition text-center"
              >
                Request Information
              </Link>
              <Link
                href="/programs/barber-apprenticeship/apply"
                className="rounded-2xl bg-purple-600 text-white px-8 py-4 font-semibold shadow-lg hover:bg-purple-700 transition text-center"
              >
                Apply to Program
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-white/90 px-5 py-4 text-gray-900">
                <div className="text-2xl font-bold">{stats.totalHours.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Hours required</div>
              </div>
              <div className="rounded-2xl bg-white/90 px-5 py-4 text-gray-900">
                <div className="text-2xl font-bold">Milady</div>
                <div className="text-sm text-gray-600">Related instruction</div>
              </div>
              <div className="rounded-2xl bg-white/90 px-5 py-4 text-gray-900">
                <div className="text-2xl font-bold">${stats.tuition?.toLocaleString() || '4,980'}</div>
                <div className="text-sm text-gray-600">Program tuition</div>
              </div>
              <div className="rounded-2xl bg-white/90 px-5 py-4 text-gray-900">
                <div className="text-2xl font-bold">WRG</div>
                <div className="text-sm text-gray-600">Funding available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[IMAGES.gallery1, IMAGES.gallery2, IMAGES.gallery3].map((src, idx) => (
            <div key={src} className="relative h-56 md:h-64 rounded-3xl overflow-hidden shadow-lg">
              <Image
                src={src}
                alt={`Barber apprenticeship gallery ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-900">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition bg-white">
            <div className="text-blue-800 text-2xl font-bold mb-4">1</div>
            <p className="text-lg font-semibold text-gray-900">Choose your path</p>
            <p className="mt-3 text-gray-600">
              Use the Inquiry form for questions. Use Enrollment to submit your application and complete payment.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition bg-white">
            <div className="text-blue-800 text-2xl font-bold mb-4">2</div>
            <p className="text-lg font-semibold text-gray-900">Pay + get access</p>
            <p className="mt-3 text-gray-600">
              After successful payment, you receive two emails: Milady access (from Milady) and dashboard access (from us).
            </p>
          </div>
          <div className="rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition bg-white">
            <div className="text-blue-800 text-2xl font-bold mb-4">3</div>
            <p className="text-lg font-semibold text-gray-900">Train + track hours</p>
            <p className="mt-3 text-gray-600">
              Clock hours, sign your MOU, and report progress in your dashboard until completion.
            </p>
          </div>
        </div>
      </section>

      {/* WRG FUNDING SECTION */}
      <section className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-full">
                Workforce Ready Grant
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
              WRG Funding May Cover Your Tuition
            </h2>
            <p className="text-lg text-green-800 mb-8">
              Indiana residents may qualify for Workforce Ready Grant (WRG) funding through the State of Indiana. 
              This grant can cover the full cost of your barber apprenticeship tuition.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 border border-green-200">
                <h3 className="font-bold text-green-900 mb-3">Eligibility Requirements</h3>
                <ul className="space-y-2 text-green-800">
                  <li>• Indiana resident</li>
                  <li>• 18 years or older</li>
                  <li>• High school diploma or GED</li>
                  <li>• Not currently enrolled in college</li>
                  <li>• Meet income guidelines</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-green-200">
                <h3 className="font-bold text-green-900 mb-3">How to Apply</h3>
                <ul className="space-y-2 text-green-800">
                  <li>1. Check eligibility at your local WorkOne</li>
                  <li>2. Complete WRG application</li>
                  <li>3. Get approved for funding</li>
                  <li>4. Enroll in our program with $0 out of pocket</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/programs/barber-apprenticeship/eligibility"
                className="rounded-2xl bg-green-600 text-white px-8 py-4 font-semibold hover:bg-green-700 transition text-center"
              >
                Check Your Eligibility
              </Link>
              <a
                href="https://www.in.gov/dwd/workone/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-white text-green-700 border-2 border-green-600 px-8 py-4 font-semibold hover:bg-green-50 transition text-center"
              >
                Find Your Local WorkOne
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Professional training, clean compliance.</h2>
            <p className="mt-5 text-lg text-gray-700">
              You get a structured pathway with clear requirements, documented progress, and a dashboard that keeps everything organized.
            </p>
            <ul className="mt-8 space-y-4 text-lg text-gray-700">
              <li>• Approved training sites + hour verification</li>
              <li>• Digital clock-in/out and progress tracking</li>
              <li>• Payment options (deposit + weekly)</li>
              <li>• Related instruction through Milady (Milady emails you access)</li>
            </ul>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-lg">
            <Image src={IMAGES.training} alt="Hands-on barber training" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* PARTNERSHIP SECTION */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="px-4 py-2 bg-white/20 text-white text-sm font-bold rounded-full">
                For Barbershop Owners
              </span>
              <h2 className="mt-6 text-3xl md:text-4xl font-bold">
                Become a Host Barbershop Partner
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Join our network of approved training sites and help shape the next generation of licensed barbers. 
                We handle the paperwork, you provide the real-world training.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Access Trained Apprentices</h3>
                    <p className="text-blue-200 text-sm">Get motivated learners ready to contribute to your shop</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">We Handle Compliance</h3>
                    <p className="text-blue-200 text-sm">Documentation, hour tracking, and state requirements managed for you</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Build Your Legacy</h3>
                    <p className="text-blue-200 text-sm">Train future barbers and strengthen the profession</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/programs/barber-apprenticeship/host-shops"
                  className="rounded-2xl bg-white text-blue-900 px-8 py-4 font-semibold hover:bg-blue-50 transition"
                >
                  Learn More
                </Link>
                <Link
                  href="/forms/host-shop-inquiry"
                  className="rounded-2xl bg-transparent border-2 border-white text-white px-8 py-4 font-semibold hover:bg-white/10 transition"
                >
                  Partner Inquiry
                </Link>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">Host Shop Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Active Indiana barbershop license in good standing</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>At least one licensed barber to supervise apprentices</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Safe, professional training environment</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Commitment to apprentice development</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Willingness to use digital hour tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to start your barber career?</h2>
          <p className="mt-4 text-lg text-white/90">
            Self-pay or WRG funded - we'll help you find the right path.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row">
            <Link
              href="/programs/barber-apprenticeship/eligibility"
              className="rounded-2xl bg-green-600 text-white px-8 py-4 font-semibold hover:bg-green-700 transition"
            >
              Check WRG Eligibility
            </Link>
            <Link
              href="/programs/barber-apprenticeship/apply"
              className="rounded-2xl bg-purple-600 text-white px-8 py-4 font-semibold hover:bg-purple-700 transition"
            >
              Enroll & Pay Now
            </Link>
            <Link
              href="/programs/barber-apprenticeship/inquiry"
              className="rounded-2xl bg-white text-slate-900 px-8 py-4 font-semibold hover:bg-gray-100 transition"
            >
              Request Info
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
