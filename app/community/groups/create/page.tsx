'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Save, CheckCircle } from 'lucide-react';

export default function CreateGroupPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    program: '',
    meetingType: 'online',
    meetingDay: '',
    meetingTime: '',
    maxMembers: '10',
    isPrivate: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Study Group Created!</h1>
            <p className="text-gray-600 mb-6">Your study group "{formData.name}" has been created successfully.</p>
            <div className="flex justify-center gap-4">
              <Link href="/community/discussions/study-groups" className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                View All Groups
              </Link>
              <button onClick={() => setSubmitted(false)} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Create Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Link href="/community/discussions/study-groups" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Study Groups
        </Link>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Study Group</h1>
              <p className="text-gray-600">Start a new study group for your program</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., CNA Evening Study Group"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="What will your group focus on?"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program *</label>
              <select
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select a program</option>
                <option value="cna">CNA Certification</option>
                <option value="phlebotomy">Phlebotomy</option>
                <option value="hvac">HVAC Technician</option>
                <option value="medical-assistant">Medical Assistant</option>
                <option value="it-support">IT Support</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                <select
                  value={formData.meetingType}
                  onChange={(e) => setFormData({ ...formData, meetingType: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="online">Online (Zoom/Meet)</option>
                  <option value="in-person">In-Person</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Members</label>
                <select
                  value={formData.maxMembers}
                  onChange={(e) => setFormData({ ...formData, maxMembers: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="5">5 members</option>
                  <option value="10">10 members</option>
                  <option value="15">15 members</option>
                  <option value="20">20 members</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Day</label>
                <select
                  value={formData.meetingDay}
                  onChange={(e) => setFormData({ ...formData, meetingDay: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select a day</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                <input
                  type="time"
                  value={formData.meetingTime}
                  onChange={(e) => setFormData({ ...formData, meetingTime: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="private"
                checked={formData.isPrivate}
                onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="private" className="text-sm text-gray-700">
                <span className="font-medium">Private Group</span>
                <span className="block text-gray-500">Members must be approved to join</span>
              </label>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Link href="/community/discussions/study-groups" className="px-6 py-2 text-gray-700 hover:text-gray-900">
                Cancel
              </Link>
              <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <Save className="w-4 h-4" /> Create Group
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
