import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Heart, Users, Clock, MapPin, Calendar, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Volunteer Opportunities | Elevate For Humanity',
  description: 'Make a difference in your community. Join our volunteer programs.',
};

export const dynamic = 'force-dynamic';

export default async function VolunteerPage() {
  const supabase = await createClient();

  // Fetch volunteer opportunities from database
  const { data: opportunities, error } = await supabase
    .from('volunteer_opportunities')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching opportunities:', error.message);
  }

  const opportunityList = opportunities || [];

  const benefits = [
    'Make a real impact in your community',
    'Gain valuable experience and skills',
    'Network with like-minded individuals',
    'Flexible scheduling options',
    'Certificate of volunteer service',
    'Letter of recommendation available',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center">
        <Image
          src="/images/efh/sections/coaching.jpg"
          alt="Volunteer with Elevate"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-500/80" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          <Heart className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">Volunteer With Us</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Join our community of volunteers making a difference. Your time and skills can help transform lives.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Benefits */}
        <div className="bg-white rounded-xl border p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Volunteer?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Opportunities</h2>
        
        {opportunityList.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {opportunityList.map((opp: any) => (
              <div key={opp.id} className="bg-white rounded-xl border p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{opp.title}</h3>
                    <p className="text-sm text-gray-500">{opp.category || 'General'}</p>
                  </div>
                  {opp.spots_available && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      {opp.spots_available} spots
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{opp.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  {opp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {opp.location}
                    </span>
                  )}
                  {opp.time_commitment && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {opp.time_commitment}
                    </span>
                  )}
                  {opp.schedule && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {opp.schedule}
                    </span>
                  )}
                </div>
                <Link
                  href={`/volunteer/apply?opportunity=${opp.id}`}
                  className="inline-flex items-center gap-2 text-orange-600 font-medium hover:underline"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities listed</h3>
            <p className="text-gray-600 mb-6">Check back soon for new volunteer opportunities, or contact us to learn more.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Contact Us
            </Link>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Whether you have a few hours or want to commit long-term, we have opportunities for you.
          </p>
          <Link
            href="/volunteer/apply"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Apply to Volunteer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
