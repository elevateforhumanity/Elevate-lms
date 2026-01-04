import Link from 'next/link';
import { Metadata } from 'next';
import { Heart, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ongoing Career Support | Elevate for Humanity',
  description: 'Lifetime career support for all graduates.',
};

export default function OngoingSupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-brand-blue-600 to-brand-green-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-black mb-6">Ongoing Career Support</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            We support you throughout your entire career, not just job
            placement.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">
              Lifetime Support Includes
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-black mb-1">Career Coaching</h3>
                  <p className="text-gray-700">
                    Ongoing guidance for career advancement
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-brand-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-black mb-1">Alumni Network</h3>
                  <p className="text-gray-700">Connect with other graduates</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-brand-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-black mb-1">
                    Advancement Opportunities
                  </h3>
                  <p className="text-gray-700">Help finding better positions</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">
              Need Support?
            </h3>
            <p className="text-gray-700 mb-6">
              Whether you need help with a job search, career change, or
              advancement, we're here for you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue-700 transition"
            >
              Contact Career Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
