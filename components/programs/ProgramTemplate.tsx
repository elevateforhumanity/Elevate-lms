import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import type { Program } from '@/app/data/programs';
import { ProgramPaymentButton } from './ProgramPaymentButton';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';

export function ProgramTemplate({ program }: { program: Program }) {
  return (
    <main className="bg-white">
      {/* HERO SECTION - Video or Text */}
      {program.heroVideo ? (
        <VideoHeroBanner
          videoSrc={program.heroVideo}
          voiceoverSrc={program.voiceoverSrc}
          withAudio={!!program.voiceoverSrc}
        />
      ) : (
        <section className="bg-zinc-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {program.heroTitle}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {program.heroSubtitle}
              </p>

              {/* Format chips */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-medium">
                  {program.duration}
                </span>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-medium">
                  {program.delivery}
                </span>
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-medium">
                  {program.price ? `$${program.price}` : '$0 with funding'}
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={program.ctaPrimary.href}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg"
                >
                  {program.ctaPrimary.label}
                </Link>
                {program.ctaSecondary && (
                  <Link
                    href={program.ctaSecondary.href}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg transition"
                  >
                    {program.ctaSecondary.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AT-A-GLANCE CARDS */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          <Card title="Duration" value={program.duration} />
          <Card title="Format" value={program.delivery} />
          <Card title="Schedule" value={program.schedule} />
          <Card title="Credential" value={program.credential} />
        </div>
      </section>

      {/* PROGRAM OVERVIEW */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Left: Overview + Outcomes */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Program Overview
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {program.shortDescription}
            </p>

            <h3 className="text-xl font-bold mb-4 text-gray-900">
              What You'll Achieve
            </h3>
            <ul className="space-y-3">
              {program.outcomes
                .filter((outcome) => outcome && outcome.trim())
                .map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold text-xl">✓</span>
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Middle: What You'll Learn */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              What You'll Learn
            </h2>

            {/* Show specializations for programs with multiple tracks */}
            {program.slug === 'drug-alcohol-specimen-collector' && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900">
                  Program Specializations:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                    <h4 className="font-bold text-orange-900 mb-2">
                      DOT Urine Drug Testing
                    </h4>
                    <p className="text-sm text-gray-700">
                      Department of Transportation certified collection
                      procedures
                    </p>
                  </div>
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                    <h4 className="font-bold text-orange-900 mb-2">
                      DOT Breath Alcohol Testing
                    </h4>
                    <p className="text-sm text-gray-700">
                      Breath Alcohol Technician (BAT) certification
                    </p>
                  </div>
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                    <h4 className="font-bold text-orange-900 mb-2">
                      Non-DOT Testing
                    </h4>
                    <p className="text-sm text-gray-700">
                      Workplace and employer-mandated testing programs
                    </p>
                  </div>
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                    <h4 className="font-bold text-orange-900 mb-2">
                      Oral Fluid Testing
                    </h4>
                    <p className="text-sm text-gray-700">
                      Saliva-based drug testing procedures
                    </p>
                  </div>
                </div>
              </div>
            )}

            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Training Curriculum:
            </h3>
            <div className="space-y-4">
              {program.whatYouLearn.map((item, i) => (
                <div
                  key={i}
                  className="bg-blue-50 border border-blue-100 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">{i + 1}.</span>
                    <span className="text-gray-800">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Payment/Enrollment */}
          {program.price && (
            <div>
              <ProgramPaymentButton
                programSlug={program.slug}
                programName={program.name}
                price={program.price}
                etplProgramId={program.etplProgramId}
                partnerUrl={program.partnerUrl}
              />
            </div>
          )}
        </div>
      </section>

      {/* PROGRAM HIGHLIGHTS */}
      {program.highlights && program.highlights.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
              Why This Program
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {program.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-xl p-6"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⭐</span>
                    <p className="text-gray-700">{highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW TO ENROLL */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
          How to Enroll
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Step
            n={1}
            title="Apply Online"
            desc="Submit the short application so we can match you to the right path."
          />
          <Step
            n={2}
            title="Advisor Outreach"
            desc="We contact you to confirm goals, eligibility, and next steps."
          />
          <Step
            n={3}
            title="WorkOne Appointment"
            desc="We guide you to schedule and prepare for the funding appointment (if applicable)."
          />
          <Step
            n={4}
            title="Onboarding"
            desc="Upload required documents and complete orientation."
          />
          <Step
            n={5}
            title="Start Training"
            desc="Begin class and track progress through your dashboard."
          />
        </div>
      </section>

      {/* REQUIREMENTS */}
      {program.requirements && program.requirements.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Who This Is For
            </h2>
            <ul className="space-y-3">
              {program.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FUNDING OPTIONS */}
      {program.fundingOptions && program.fundingOptions.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Funding Options
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <ul className="space-y-3">
              {program.fundingOptions.map((option, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-xl">$</span>
                  <span className="text-gray-800">{option}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="bg-zinc-900   text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8">
            Apply now and we'll guide you step-by-step through the enrollment
            process.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href={program.ctaPrimary.href}
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-10 py-5 rounded-xl font-bold text-lg transition shadow-2xl"
            >
              {program.ctaPrimary.label}
            </Link>
            <a
              href="tel:3173143757"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
            <a
              href="mailto:info@elevateforhumanity.org"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-white/70">
              Questions? Call us at (317) 314-3757 or email
              info@elevateforhumanity.org
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="text-sm text-gray-500 mb-2">{title}</div>
      <div className="text-base font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold mb-4">
          {n}
        </div>
        <div className="font-bold text-gray-900 mb-2">{title}</div>
        <div className="text-sm text-gray-600">{desc}</div>
      </div>
    </div>
  );
}
