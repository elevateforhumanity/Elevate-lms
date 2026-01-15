'use client';

import { useState } from 'react';
import { Plus, CheckCircle, Clock, Calendar } from 'lucide-react';

interface HourEntry {
  id: number;
  date: string;
  location: string;
  type: string;
  hours: number;
  mentor: string;
  verified: boolean;
}

interface HoursTabProps {
  hours: HourEntry[];
  progress: { practicalHours: { completed: number; total: number }; rtiHours: { completed: number; total: number } };
  onLogHours: (entry: Omit<HourEntry, 'id' | 'verified'>) => void;
}

export function HoursTab({ hours, progress, onLogHours }: HoursTabProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    location: '',
    type: 'OJT',
    hours: 8,
    mentor: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogHours(formData);
    setShowForm(false);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      location: '',
      type: 'OJT',
      hours: 8,
      mentor: '',
    });
  };

  const ojtPercent = Math.round((progress.practicalHours.completed / progress.practicalHours.total) * 100);
  const rtiPercent = Math.round((progress.rtiHours.completed / progress.rtiHours.total) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hours Log</h1>
          <p className="text-slate-600">Track your OJT and RTI training hours</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition"
        >
          <Plus className="w-5 h-5" /> Log Hours
        </button>
      </div>

      {/* Progress Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">OJT Hours (On-the-Job Training)</h3>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-2">
            {progress.practicalHours.completed.toLocaleString()} / {progress.practicalHours.total.toLocaleString()}
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${ojtPercent}%` }} />
          </div>
          <div className="text-sm text-slate-500">{ojtPercent}% complete • {progress.practicalHours.total - progress.practicalHours.completed} hours remaining</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">RTI Hours (Related Technical Instruction)</h3>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-2">
            {progress.rtiHours.completed} / {progress.rtiHours.total}
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${rtiPercent}%` }} />
          </div>
          <div className="text-sm text-slate-500">{rtiPercent}% complete • {progress.rtiHours.total - progress.rtiHours.completed} hours remaining</div>
        </div>
      </div>

      {/* Log Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Log Training Hours</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="OJT">OJT (On-the-Job Training)</option>
                  <option value="RTI">RTI (Related Technical Instruction)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Elite Cuts Barbershop"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hours</label>
                <input
                  type="number"
                  min="0.5"
                  max="12"
                  step="0.5"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Supervisor/Mentor</label>
                <input
                  type="text"
                  value={formData.mentor}
                  onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
                  placeholder="e.g., James Carter"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition"
                >
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hours History */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">Training History</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {hours.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  entry.type === 'OJT' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">{entry.location}</div>
                  <div className="text-sm text-slate-500">{entry.date} • {entry.type} • {entry.mentor}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-slate-900">{entry.hours} hrs</span>
                {entry.verified ? (
                  <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                ) : (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Pending</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
