import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Donate',
  description: 'Support workforce development in Indianapolis. Your donation helps provide free career training to those in need.',
  path: '/nonprofit/donations',
});

import Link from 'next/link';
import { Heart, DollarSign, Users, TrendingUp } from 'lucide-react';

export default function DonationsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-white text-center">
        <div className="max-w-4xl mx-auto">
          <Heart className="w-16 h-16 text-purple-600 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-black text-black mb-6">
            Support Our Mission
          </h1>
          <p className="text-xl text-black mb-8">
            Your donation helps us provide mental wellness and holistic healing
            services to those in need
          </p>
          <Link
            href="https://donate.stripe.com/5kA5kn7EsfrD08w4gg"
            target="_blank"
            className="inline-block bg-purple-600 text-white px-12 py-4 rounded-lg text-lg font-bold hover:bg-purple-700 transition-colors shadow-lg"
          >
            Donate Now
          </Link>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Your Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">$50</h3>
              <p className="text-black">Provides one counseling session</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">$100</h3>
              <p className="text-black">Sponsors a workshop for 5 people</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">$500</h3>
              <p className="text-black">
                Funds a full program for one person
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
