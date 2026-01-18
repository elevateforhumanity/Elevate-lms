import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Search, MapPin, Briefcase, Star, MessageSquare, ArrowRight, Filter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Members | Community | Elevate For Humanity',
  description: 'Connect with fellow community members, mentors, and industry professionals.',
};

export const dynamic = 'force-dynamic';

export default async function MembersPage() {
  const supabase = await createClient();

  let memberCount = 2500;

  if (supabase) {
    try {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      if (count) memberCount = count;
    } catch (error) {
      console.error('[Members] Error:', error);
    }
  }

  const featuredMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Healthcare Professional',
      location: 'Indianapolis, IN',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      badge: 'Top Contributor',
      posts: 156,
    },
    {
      name: 'Marcus Williams',
      role: 'Barber Apprentice',
      location: 'Chicago, IL',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      badge: 'Rising Star',
      posts: 89,
    },
    {
      name: 'Emily Chen',
      role: 'Career Coach',
      location: 'Remote',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      badge: 'Mentor',
      posts: 234,
    },
    {
      name: 'David Thompson',
      role: 'HVAC Technician',
      location: 'Detroit, MI',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      badge: 'Graduate',
      posts: 67,
    },
    {
      name: 'Jessica Martinez',
      role: 'CNA Graduate',
      location: 'Columbus, OH',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      badge: 'Success Story',
      posts: 112,
    },
    {
      name: 'Robert Brown',
      role: 'CDL Driver',
      location: 'Louisville, KY',
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
      badge: 'Verified',
      posts: 45,
    },
  ];

  const categories = [
    { name: 'All Members', count: memberCount },
    { name: 'Mentors', count: 45 },
    { name: 'Graduates', count: 890 },
    { name: 'Current Students', count: 1200 },
    { name: 'Industry Professionals', count: 365 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-600 to-amber-700 text-white py-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
            alt="Community members"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-6 h-6 text-orange-200" />
              <span className="text-orange-100 font-medium">Member Directory</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Connect With<br />{memberCount.toLocaleString()}+ Members
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Find mentors, study partners, and industry professionals who can help you on your journey.
            </p>
            
            {/* Search */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members by name, role, or location..."
                  className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <button className="px-6 py-4 bg-orange-800 text-white font-semibold rounded-full hover:bg-orange-900 transition-colors flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  index === 0
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count.toLocaleString()})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Members</h2>
              <p className="text-gray-600">Active contributors in our community</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                      <MapPin className="w-3 h-3" />
                      {member.location}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                    <Star className="w-3 h-3" />
                    {member.badge}
                  </span>
                  <span className="text-gray-500 text-sm">{member.posts} posts</span>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors">
                    Connect
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors">
              Load More Members
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want to Be Featured?</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Engage with the community, share your knowledge, and help others succeed.
          </p>
          <Link
            href="/community/discussions"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-orange-50 transition-colors"
          >
            Start Contributing
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
