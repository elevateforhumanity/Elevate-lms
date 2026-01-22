import { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare, Users, TrendingUp, Award, ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community Forums | Elevate For Humanity',
  description: 'Connect with fellow students, alumni, and instructors. Ask questions, share experiences, and grow together.',
};

const categories = [
  {
    name: 'General Discussion',
    description: 'Introduce yourself and connect with the community',
    topics: 156,
    posts: 1243,
    icon: MessageSquare,
    color: 'blue',
  },
  {
    name: 'Healthcare Programs',
    description: 'CNA, Medical Assistant, Phlebotomy discussions',
    topics: 89,
    posts: 567,
    icon: Users,
    color: 'green',
  },
  {
    name: 'Skilled Trades',
    description: 'HVAC, Electrical, Welding, CDL conversations',
    topics: 124,
    posts: 892,
    icon: TrendingUp,
    color: 'orange',
  },
  {
    name: 'Technology',
    description: 'IT Support, Cybersecurity, Web Development',
    topics: 78,
    posts: 445,
    icon: Award,
    color: 'purple',
  },
  {
    name: 'Job Search & Career',
    description: 'Resume tips, interview prep, job opportunities',
    topics: 203,
    posts: 1567,
    icon: TrendingUp,
    color: 'red',
  },
  {
    name: 'Student Support',
    description: 'Financial aid, scheduling, technical help',
    topics: 67,
    posts: 334,
    icon: Users,
    color: 'teal',
  },
];

const recentTopics = [
  { title: 'Tips for passing the CNA state exam?', author: 'Sarah M.', replies: 23, time: '2 hours ago', category: 'Healthcare' },
  { title: 'Best study resources for CompTIA A+', author: 'Marcus J.', replies: 15, time: '4 hours ago', category: 'Technology' },
  { title: 'HVAC apprenticeship experience sharing', author: 'David C.', replies: 31, time: '6 hours ago', category: 'Skilled Trades' },
  { title: 'How to negotiate salary for first job?', author: 'Emily R.', replies: 42, time: '1 day ago', category: 'Career' },
];

export default function ForumsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Community Forums
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Connect with fellow students, alumni, and instructors. Ask questions, share experiences, and grow together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Sign In to Participate
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-blue-50 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">Active</div>
              <div className="text-gray-600 text-sm">Community</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">Open</div>
              <div className="text-gray-600 text-sm">Discussions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">Peer</div>
              <div className="text-gray-600 text-sm">Support</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">Free</div>
              <div className="text-gray-600 text-sm">For Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Forum Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/login"
                className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-${cat.color}-100 rounded-lg flex items-center justify-center`}>
                    <cat.icon className={`w-6 h-6 text-${cat.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{cat.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{cat.description}</p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>{cat.topics} topics</span>
                      <span>{cat.posts} posts</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Topics */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Recent Discussions</h2>
          <div className="space-y-4">
            {recentTopics.map((topic) => (
              <div key={topic.title} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium mb-1">{topic.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>by {topic.author}</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{topic.category}</span>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">{topic.replies} replies</div>
                    <div className="text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {topic.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in to view all discussions →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
