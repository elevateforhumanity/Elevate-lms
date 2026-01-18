import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import {
  MessageSquare,
  Users,
  Clock,
  TrendingUp,
  Plus,
  Search,
  Filter,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community Discussions | Elevate for Humanity',
  description:
    'Join conversations with fellow learners, share experiences, ask questions, and connect with the Elevate community.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/community/discussions',
  },
};

export const dynamic = 'force-dynamic';

export default async function DiscussionsPage() {
  const supabase = await createClient();
  
  // Try to fetch discussions from database
  let discussions: any[] = [];
  try {
    const { data } = await supabase
      .from('forum_threads')
      .select('*, profiles(full_name, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(20);
    if (data) discussions = data;
  } catch {
    // Use sample data if table doesn't exist
  }

  // Sample discussions if none exist
  const sampleDiscussions = [
    {
      id: '1',
      title: 'Tips for passing the HVAC certification exam?',
      category: 'Skilled Trades',
      author: 'Marcus J.',
      replies: 12,
      views: 156,
      lastActivity: '2 hours ago',
      pinned: true,
    },
    {
      id: '2',
      title: 'Best resources for medical assistant training',
      category: 'Healthcare',
      author: 'Sarah M.',
      replies: 8,
      views: 89,
      lastActivity: '4 hours ago',
      pinned: false,
    },
    {
      id: '3',
      title: 'How I landed my first job after completing the program',
      category: 'Success Stories',
      author: 'David L.',
      replies: 24,
      views: 312,
      lastActivity: '1 day ago',
      pinned: true,
    },
    {
      id: '4',
      title: 'Study group for barber apprenticeship students',
      category: 'Study Groups',
      author: 'Angela R.',
      replies: 15,
      views: 178,
      lastActivity: '1 day ago',
      pinned: false,
    },
    {
      id: '5',
      title: 'Questions about WIOA funding eligibility',
      category: 'Financial Aid',
      author: 'James T.',
      replies: 6,
      views: 67,
      lastActivity: '2 days ago',
      pinned: false,
    },
  ];

  const displayDiscussions = discussions.length > 0 ? discussions : sampleDiscussions;

  const categories = [
    { name: 'All Discussions', count: 156 },
    { name: 'Healthcare', count: 42 },
    { name: 'Skilled Trades', count: 38 },
    { name: 'Technology', count: 28 },
    { name: 'Success Stories', count: 24 },
    { name: 'Study Groups', count: 18 },
    { name: 'Financial Aid', count: 6 },
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
            <span className="text-gray-900 font-medium">Discussions</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Community Discussions</h1>
              <p className="text-blue-100">Connect, share, and learn from fellow students</p>
            </div>
            <Link
              href="/community/discussions/new"
              className="mt-4 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition inline-flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Start Discussion
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-5 h-5 mr-2 text-gray-600" />
                  <span className="text-gray-700">Filter</span>
                </button>
              </div>
            </div>

            {/* Discussions List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {displayDiscussions.map((discussion: any) => (
                  <Link
                    key={discussion.id}
                    href={`/community/discussions/${discussion.id}`}
                    className="block p-6 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {discussion.pinned && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                              Pinned
                            </span>
                          )}
                          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                            {discussion.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 gap-4">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {discussion.author || discussion.profiles?.full_name}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {discussion.replies} replies
                          </span>
                          <span className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {discussion.views} views
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {discussion.lastActivity || 'Recently'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next
                </button>
              </nav>
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
                      href={`/community/discussions?category=${encodeURIComponent(category.name)}`}
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

            {/* Community Guidelines */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Community Guidelines</h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Be respectful and supportive of others
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Stay on topic and keep discussions relevant
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  No spam, self-promotion, or solicitation
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Protect your privacy and others privacy
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Report inappropriate content to moderators
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
