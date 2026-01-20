'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, MessageSquare, ThumbsUp, User, Plus, Search } from 'lucide-react';

const mockDiscussions = [
  { id: 1, title: 'Introduce yourself! 👋', author: 'Community Team', replies: 45, likes: 89, time: '1 week ago', pinned: true },
  { id: 2, title: 'Best study spots in Indianapolis?', author: 'Marcus J.', replies: 18, likes: 22, time: '3 hours ago', pinned: false },
  { id: 3, title: 'Anyone else struggling with work-life balance?', author: 'Emily R.', replies: 24, likes: 41, time: '6 hours ago', pinned: false },
  { id: 4, title: 'Coffee or energy drinks for late night studying?', author: 'David C.', replies: 32, likes: 28, time: 'Yesterday', pinned: false },
  { id: 5, title: 'Weekend plans thread', author: 'Sarah M.', replies: 15, likes: 19, time: '2 days ago', pinned: false },
  { id: 6, title: 'Favorite podcasts for motivation?', author: 'Ashley B.', replies: 11, likes: 25, time: '3 days ago', pinned: false },
];

export default function GeneralDiscussionsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">General Discussions</h1>
              <p className="text-gray-600">Chat about anything with fellow students</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search discussions..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg" />
          </div>
          <select className="px-4 py-2 border rounded-lg">
            <option>Most Recent</option>
            <option>Most Popular</option>
            <option>Most Replies</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm border divide-y">
          {mockDiscussions.map((discussion) => (
            <Link key={discussion.id} href={`/community/discussions/${discussion.id}`} className="block p-4 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {discussion.pinned && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Pinned</span>}
                    <h3 className="font-medium text-gray-900">{discussion.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Posted by {discussion.author} • {discussion.time}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {discussion.replies}</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {discussion.likes}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
