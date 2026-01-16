import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Stethoscope } from 'lucide-react';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Healthcare Programs | Medical Assistant, CNA Training',
  description:
    'Medical Assistant training funded through WIOA and state grants. CNA certification available as self-pay. Start your healthcare career today.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs/healthcare',
  },
};

export default async function HealthcarePage() {
  const supabase = await createClient();
  
  // Fetch healthcare programs
  const { data: healthcarePrograms } = await supabase
    .from('programs')
    .select('*')
    .eq('category', 'healthcare');
  return (
    <div className="min-h-screen bg-gray-50">
      <VideoHeroBanner
        videoSrc="/videos/cna-hero.mp4"
        headline="Healthcare Programs"
        subheadline="Start Your Healthcare Career - CNA, Medical Assistant & More"
        primaryCTA={{ text: 'Apply Now', href: '/apply' }}
        secondaryCTA={{ text: 'View All Programs', href: '/programs' }}
      />

      {/* At-a-Glance */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-black mb-8">At-a-Glance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4">
              <Image src="/images/icons/clock.png" alt="Duration" width={24} height={24} className="flex-shrink-0 mt-1" loading="lazy" />
              <div>
                <h3 className="font-bold text-black mb-1">Duration</h3>
                <p className="text-black">4-12 weeks</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Image src="/images/icons/dollar.png" alt="Cost" width={24} height={24} className="flex-shrink-0 mt-1" loading="lazy" />
              <div>
                <h3 className="font-bold text-black mb-1">Cost</h3>
                <p className="text-black">Varies by program</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Image src="/images/icons/shield.png" alt="Format" width={24} height={24} className="flex-shrink-0 mt-1" loading="lazy" />
              <div>
                <h3 className="font-bold text-black mb-1">Format</h3>
                <p className="text-black">Hybrid</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Image src="/images/icons/award.png" alt="Outcome" width={24} height={24} className="flex-shrink-0 mt-1" loading="lazy" />
              <div>
                <h3 className="font-bold text-black mb-1">Outcome</h3>
                <p className="text-black">
                  CNA, MA, Phlebotomy certification
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Program */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            About the Program
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <p className="text-black mb-4">
              Our Healthcare pathway prepares you for rewarding careers in the medical field. From Certified Nursing Assistant (CNA) to Medical Assistant, Phlebotomy Technician, and Home Health Aide, you'll gain the skills and certifications needed to start your healthcare career.
            </p>
            <p className="text-black mb-4">
              With hands-on training from experienced healthcare professionals, you'll learn patient care, medical procedures, and clinical skills in real-world settings. Most programs can be completed in 4-12 weeks, getting you to work quickly.
            </p>
            <p className="text-black">
              The healthcare industry offers strong job security, competitive salaries starting at $30,000-$40,000 annually, and clear pathways for career advancement. Many employers offer tuition reimbursement for continued education.
            </p>
          </div>
        </div>
      </section>

      {/* Who This Program Is For */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            Who This Program Is For
          </h2>
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                <div>
                  <strong className="text-black">Career changers</strong>
                  <p className="text-black text-sm">Looking to enter the healthcare field from another industry</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                <div>
                  <strong className="text-black">No experience required</strong>
                  <p className="text-black text-sm">Most programs accept students with no prior healthcare background</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                <div>
                  <strong className="text-black">Individuals with criminal records</strong>
                  <p className="text-black text-sm">We work with justice-impacted individuals and help navigate background check requirements</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                <div>
                  <strong className="text-black">Those facing barriers</strong>
                  <p className="text-black text-sm">We provide support for transportation, childcare, housing, and other challenges</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl flex-shrink-0">✓</span>
                <div>
                  <strong className="text-black">High school diploma or GED holders</strong>
                  <p className="text-black text-sm">Basic education requirement for most healthcare certifications</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            What You'll Learn
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-3 list-disc list-inside">
              <li className="text-black">Patient care fundamentals and bedside manner</li>
              <li className="text-black">Vital signs monitoring and documentation</li>
              <li className="text-black">Medical terminology and healthcare communication</li>
              <li className="text-black">Infection control and safety protocols</li>
              <li className="text-black">Basic life support (BLS) and emergency procedures</li>
              <li className="text-black">Electronic health records (EHR) systems</li>
              <li className="text-black">Phlebotomy and specimen collection (program-specific)</li>
              <li className="text-black">Medical assisting procedures (program-specific)</li>
              <li className="text-black">HIPAA compliance and patient privacy</li>
              <li className="text-black">Certification exam preparation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Funding Options */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            Funding & Payment Options
          </h2>
          
          {/* Funded Programs */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-black mb-4">State-Funded Programs (Medical Assistant)</h3>
            <p className="text-black mb-4">Medical Assistant training may be funded through:</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-black mb-2">WIOA</h4>
                <p className="text-black text-sm">
                  Workforce Innovation and Opportunity Act funding
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-black mb-2">WRG</h4>
                <p className="text-black text-sm">Workforce Ready Grant</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-black mb-2">JRI</h4>
                <p className="text-black text-sm">
                  Justice Reinvestment Initiative
                </p>
              </div>
            </div>
          </div>

          {/* Self-Pay Programs */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-black mb-4">Self-Pay Programs (CNA)</h3>
            <p className="text-black mb-4">CNA certification is a self-pay program with flexible payment options:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-bold text-black mb-2">Payment Plans</h4>
                <p className="text-black text-sm">
                  Flexible payment plans available to fit your budget
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-bold text-black mb-2">Employer Sponsorship</h4>
                <p className="text-black text-sm">
                  Some employers offer tuition reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            Support Services
          </h2>
          <p className="text-black mb-6">We help coordinate:</p>
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-black">Case management</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-black">
                  Justice navigation for returning citizens
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-black">Transportation resources</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-black">Childcare referrals</span>
              </li>
              <li className="flex items-start gap-3">
                <Image src="/images/icons/users.png" alt="Users" width={20} height={20} className="flex-shrink-0 mt-0.5" loading="lazy" />
                <span className="text-black">Documentation support</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-black mb-6">
            Career Outcomes
          </h2>
          <p className="text-black mb-6">Students typically move into:</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">
                Certified Nursing Assistant
              </h3>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">Medical Assistant</h3>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">
                Phlebotomy Technician
              </h3>
            </div>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <h3 className="font-bold text-black mb-2">Home Health Aide</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-white text-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Next Steps</h2>
          <div className="space-y-4 text-left max-w-2xl mx-auto mb-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold mb-1">Visit Indiana Career Connect</h3>
                <p className="text-black text-sm">
                  Go to <a href="https://www.indianacareerconnect.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.indianacareerconnect.com</a> and create your free account
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold mb-1">Complete Your Profile</h3>
                <p className="text-black text-sm">
                  Fill out your work history, education, and career goals
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold mb-1">Schedule Appointment</h3>
                <p className="text-black text-sm">
                  Book an appointment with a WorkOne career advisor through the portal (in-person or virtual)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold mb-1">Meet with Advisor</h3>
                <p className="text-black text-sm">
                  Your advisor will verify eligibility and help you select Elevate for Humanity as your training provider
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-orange-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="font-bold mb-1">Get Approved & Enroll</h3>
                <p className="text-black text-sm">
                  Once approved for WIOA funding, bring your training voucher to us and start your program
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.indianacareerconnect.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 bg-brand-orange-600 hover:bg-brand-orange-700 text-white font-bold text-xl rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Go to Indiana Career Connect
            </a>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xl rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Need Help? Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
