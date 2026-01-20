'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, MessageSquare, ThumbsUp, User, Plus, Search, Calendar, MapPin } from 'lucide-react';

const mockGroups = [
  { id: 1, title: 'CNA Study Group - Evening Session', author: 'Sarah M.', members: 8, nextMeeting: 'Tomorrow 6PM', location: 'Online', active: true },
  { id: 2, title: 'Phlebotomy Practice Partners', author: 'Marcus J.', members: 5, nextMeeting: 'Wed 4PM', location: 'Campus Lab', active: true },
  { id: 3, title: 'HVAC Certification Prep', author: 'David C.', members: 6, nextMeeting: 'Thu 7PM', location: 'Online', active: true },
  { id: 4, title: 'Medical Terminology Flash Cards', author: 'Emily R.', members: 12, nextMeeting: 'Sat 10AM', location: 'Library', active: true },
  { id: 5, title: 'IT Support Exam Prep', author: 'James W.', members: 4, nextMeeting: 'TBD', location: 'Online', active: false },
];

const mockDiscussions = [
  { id: 1, title: 'Looking for study partners for CNA exam', author: 'Ashley B.', replies: 8, time: '1 hour ago' },
  { id: 2, title: 'Best resources for anatomy review?', author: 'Marcus J.', replies: 12, time: '3 hours ago' },
  { id: 3, title: 'Study schedule tips for working students', author: 'Emily R.', replies: 15, time: 'Yesterday' },
];

export default function StudyGroupsPage() {
  const [tab, setTab] = useState<'groups' | 'discussions'>('groups');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Study Groups</h1>
              <p className="text-gray-600">Find study partners and join group sessions</p>
            </div>
          </div>
          <Link href="/community/groups/create" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Plus className="w-4 h-4" /> Create Group
          </Link>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('groups')} className={`px-4 py-2 rounded-lg ${tab === 'groups' ? 'bg-purple-600 text-white' : 'bg-white border'}`}>
            Study Groups
          </button>
          <button onClick={() => setTab('discussions')} className={`px-4 py-2 rounded-lg ${tab === 'discussions' ? 'bg-purple-600 text-white' : 'bg-white border'}`}>
            Discussions
          </button>
        </div>

        {tab === 'groups' ? (
          <div className="grid md:grid-cols-2 gap-4">
            {mockGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-xl shadow-sm border p-4 hover:border-purple-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{group.title}</h3>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${group.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {group.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">Created by {group.author}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {group.members} members</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {group.nextMeeting}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {group.location}</span>
                </div>
                <button className="w-full py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50">
                  Join Group
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border divide-y">
            {mockDiscussions.map((discussion) => (
              <Link key={discussion.id} href={`/community/discussions/${discussion.id}`} className="block p-4 hover:bg-gray-50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{discussion.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Posted by {discussion.author} • {discussion.time}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {discussion.replies} replies</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
