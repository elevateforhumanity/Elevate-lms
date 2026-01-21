import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Plus,
  Search,
  Globe,
  Lock,
  MessageSquare,
  Calendar,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community Groups | Elevate for Humanity',
  description:
    'Join study groups, networking circles, and special interest groups. Connect with peers who share your goals and interests.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/community/groups',
  },
};

export default function GroupsPage() {
  const featuredGroups = [
    {
      id: '1',
      name: 'Healthcare Career Network',
      description: 'Connect with healthcare professionals and students pursuing medical careers',
      members: 234,
      image: '/images/healthcare/healthcare-professional-portrait-1.jpg',
      category: 'Healthcare',
      isPublic: true,
    },
    {
      id: '2',
      name: 'Skilled Trades Alliance',
      description: 'HVAC, electrical, plumbing, and construction professionals and apprentices',
      members: 189,
      image: '/images/trades/program-plumbing-training.jpg',
      category: 'Skilled Trades',
      isPublic: true,
    },
    {
      id: '3',
      name: 'Barber & Cosmetology Students',
      description: 'Study tips, exam prep, and networking for beauty industry students',
      members: 156,
      image: '/images/programs/barber-hero.jpg',
      category: 'Beauty',
      isPublic: true,
    },
    {
      id: '4',
      name: 'WIOA Funding Recipients',
      description: 'Support group for students receiving workforce development funding',
      members: 98,
      image: '/images/funding/funding-dol-program.jpg',
      category: 'Financial Aid',
      isPublic: false,
    },
  ];

  const categories = [
    { name: 'All Groups', count: 24 },
    { name: 'Healthcare', count: 6 },
    { name: 'Skilled Trades', count: 5 },
    { name: 'Beauty', count: 4 },
    { name: 'Technology', count: 3 },
    { name: 'Study Groups', count: 4 },
    { name: 'Alumni', count: 2 },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/community" className="hover:text-blue-600">Community</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Groups</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Community Groups</h1>
              <p className="text-purple-100">Find your tribe and grow together</p>
            </div>
            <Link
              href="/community/groups/create"
              className="mt-4 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Group
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search groups..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Featured Groups */}
            <h2 className="text-xl font-bold text-gray-900 mb-6">Featured Groups</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {featuredGroups.map((group) => (
                <Link
                  key={group.id}
                  href={`/community/groups/${group.id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative h-32">
                    <Image
                      src={group.image}
                      alt={group.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                        {group.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{group.name}</h3>
                      {group.isPublic ? (
                        <Globe className="w-4 h-4 text-green-600" title="Public Group" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" title="Private Group" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{group.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {group.members} members
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* All Groups */}
            <h2 className="text-xl font-bold text-gray-900 mb-6">All Groups</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {featuredGroups.map((group) => (
                  <Link
                    key={group.id}
                    href={`/community/groups/${group.id}`}
                    className="flex items-center p-4 hover:bg-gray-50 transition"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={group.image}
                        alt={group.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{group.name}</h3>
                        {group.isPublic ? (
                          <Globe className="w-4 h-4 text-green-600" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{group.members} members</p>
                    </div>
                    <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition">
                      Join
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={`/community/groups?category=${encodeURIComponent(category.name)}`}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded">
                        {category.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Your Groups */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your Groups</h2>
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">You have not joined any groups yet</p>
                <Link
                  href="/login"
                  className="text-purple-600 font-medium hover:text-purple-700"
                >
                  Sign in to join groups
                </Link>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                Group Events
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-3">
                  <p className="font-medium text-gray-900 text-sm">Healthcare Networking Mixer</p>
                  <p className="text-xs text-gray-500">Jan 25, 2026 • 6:00 PM</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="font-medium text-gray-900 text-sm">HVAC Study Session</p>
                  <p className="text-xs text-gray-500">Jan 28, 2026 • 7:00 PM</p>
                </div>
              </div>
              <Link
                href="/events"
                className="block text-center text-purple-600 font-medium mt-4 hover:text-purple-700"
              >
                View all events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
