import { Metadata } from 'next';
import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { VideoHero } from '@/components/heroes/VideoHero';
import { ProgramNav } from '@/components/programs/ProgramNav';

export const metadata: Metadata = {
  title:
    'Free CNA Training Indiana | Certified Nursing Assistant | WRG, WIOA, JRI Funded | Indianapolis',
  description:
    '100% free CNA training in Indianapolis. State approved, DOL approved. Get your Certified Nursing Assistant certification through WRG, WIOA, or JRI funding. 6-8 weeks, job placement included. Start earning $16-$20/hour.',
  keywords:
    'free CNA training Indiana, CNA classes Indianapolis, certified nursing assistant Indiana, WRG CNA training, WIOA CNA program, JRI CNA training, free nursing assistant school Indiana, CNA certification Indianapolis, CNA job placement, state approved CNA training Indiana',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/programs/cna',
  },
};

export default function Page() {
  const navSections = [
    { id: 'overview', label: 'Overview' },
    { id: 'curriculum', label: "What You'll Learn" },
    { id: 'schedule', label: 'Schedule' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'career', label: 'Career Outlook' },
  ];

  return (
    <>
      <VideoHero
        videoSrc="/videos/cna-hero.mp4"
        badge={{
          icon: Stethoscope,
          text: 'Healthcare Career',
        }}
        headline="Become a Certified Nursing Assistant"
        description="100% free CNA training through WRG, WIOA, or JRI funding. State approved, DOL approved. Job placement included. Start earning $16-$20/hour."
        primaryCTA={{ text: 'Apply Now', href: '/apply' }}
        secondaryCTA={{ text: 'Talk to an Advisor', href: '/contact' }}
      />

      <ProgramNav sections={navSections} />

      {/* Program Details */}
      <section id="overview" className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Quick Facts */}
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Program Length
            </h3>
            <p className="text-3xl font-black text-green-600 mb-2">6-8 Weeks</p>
            <p className="text-gray-600">Full-time training</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cost</h3>
            <p className="text-3xl font-black text-blue-600 mb-2">$0</p>
            <p className="text-gray-600">100% Free with WIOA/WRG/JRI</p>
          </div>

          <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Starting Salary
            </h3>
            <p className="text-3xl font-black text-orange-600 mb-2">
              $16-$20/hr
            </p>
            <p className="text-gray-600">Entry-level positions</p>
          </div>
        </div>

        {/* What You'll Learn */}
        <div id="curriculum" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Clinical Skills
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • Vital signs monitoring (blood pressure, temperature, pulse)
                </li>
                <li>• Patient hygiene and personal care</li>
                <li>• Mobility assistance and transfers</li>
                <li>• Feeding and nutrition support</li>
                <li>• Infection control and safety procedures</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Professional Skills
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Medical terminology</li>
                <li>• Patient communication and empathy</li>
                <li>• Documentation and record keeping</li>
                <li>• HIPAA compliance and patient privacy</li>
                <li>• Working with healthcare teams</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Program Schedule */}
        <div id="schedule" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Program Schedule
          </h2>
          <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Classroom Training
                </h3>
                <p className="text-gray-700 mb-4">
                  4 weeks of classroom instruction covering:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Anatomy and physiology basics</li>
                  <li>• Nursing assistant duties and responsibilities</li>
                  <li>• Patient care procedures</li>
                  <li>• Safety and emergency protocols</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Clinical Experience
                </h3>
                <p className="text-gray-700 mb-4">
                  2-4 weeks of hands-on training in:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Nursing homes and long-term care facilities</li>
                  <li>• Hospitals and medical centers</li>
                  <li>• Supervised patient care</li>
                  <li>• Real-world healthcare environment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div id="requirements" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Requirements
          </h2>
          <div className="bg-white rounded-xl p-8 border-2 border-gray-200">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  To Enroll:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• High school diploma or GED</li>
                  <li>• Valid government-issued ID</li>
                  <li>• Background check (required for healthcare)</li>
                  <li>• Drug screening</li>
                  <li>• TB test and immunizations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  To Graduate:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Complete all classroom hours</li>
                  <li>• Pass skills competency exam</li>
                  <li>• Complete clinical rotation hours</li>
                  <li>• Pass written final exam</li>
                  <li>• Pass state certification exam</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Career Opportunities */}
        <div id="career" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Career Opportunities
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Nursing Homes
              </h3>
              <p className="text-gray-600 mb-2">$16-$18/hour</p>
              <p className="text-sm text-gray-500">Long-term patient care</p>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Hospitals
              </h3>
              <p className="text-gray-600 mb-2">$17-$20/hour</p>
              <p className="text-sm text-gray-500">Acute care settings</p>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Home Health
              </h3>
              <p className="text-gray-600 mb-2">$18-$22/hour</p>
              <p className="text-sm text-gray-500">In-home patient care</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Healthcare Career?
          </h2>
          <p className="text-xl mb-8">
            Apply now and begin training in as little as 2 weeks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-10 py-4 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              Talk to an Advisor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
