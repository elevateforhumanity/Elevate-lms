import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, GraduationCap, Phone, Clock } from 'lucide-react';
import PageAvatar from '@/components/PageAvatar';

export const metadata: Metadata = {
  title: 'Apply | Elevate for Humanity',
  description: 'Start your journey to a new career. Choose to get more information or enroll directly in our free workforce training programs.',
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero - Image only */}
      <section className="relative h-[40vh] min-h-[300px]">
        <Image
          src="/images/heroes-hq/programs-hero.jpg"
          alt="Apply for Training"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Avatar Guide */}
      <PageAvatar 
        videoSrc="/videos/apply-section-video.mp4" 
        title="Start Your Journey" 
      />

      {/* Two Options */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-4">
            How Would You Like to Get Started?
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Not sure which program is right for you? Start with an inquiry. Ready to commit? Enroll directly.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Inquiry Option */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-transparent hover:border-blue-500 transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Get More Information</h3>
              <p className="text-slate-600 mb-6">
                Not sure which program is right for you? Submit an inquiry and our enrollment team will contact you to discuss your options.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Quick 2-minute form</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Get personalized program recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Learn about funding options</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Response within 1-2 business days</span>
                </li>
              </ul>

              <Link
                href="/inquiry"
                className="block w-full text-center py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Submit an Inquiry
              </Link>
            </div>

            {/* Enroll Option */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-600 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Enroll Now</h3>
              <p className="text-slate-600 mb-6">
                Ready to start? Choose your program and begin the enrollment process. Our team will guide you through funding eligibility.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Browse all available programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">See program details and schedules</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Start enrollment immediately</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">Most programs are FREE with WIOA</span>
                </li>
              </ul>

              <Link
                href="/enroll"
                className="block w-full text-center py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                View Programs & Enroll
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Prefer to Talk to Someone?
          </h2>
          <p className="text-slate-600 mb-6">
            Our enrollment team is available Monday-Friday, 9am-5pm EST
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:317-314-3757"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-slate-900">(317) 314-3757</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="font-semibold text-slate-900">Contact Us Online</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
