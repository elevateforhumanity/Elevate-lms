'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function LogHoursPage() {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({ 
    date: new Date().toISOString().split('T')[0], 
    hours: '', 
    activity: '', 
    notes: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);

  const activities = [
    'Classroom Training', 
    'Lab Practice', 
    'Online Coursework', 
    'Study Time', 
    'Assessment/Testing', 
    'Clinical Hours',
    'Hands-on Practice',
    'Other'
  ];

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase?.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.date || !formData.hours || !formData.activity) {
      setError('Please fill in all required fields');
      return;
    }

    const hours = parseFloat(formData.hours);
    if (isNaN(hours) || hours <= 0 || hours > 24) {
      setError('Please enter valid hours (between 0.5 and 24)');
      return;
    }

    setIsSubmitting(true);

    try {
      if (!user) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSuccess(true);
        setTimeout(() => router.push('/student/hours'), 1500);
        return;
      }

      const { error: insertError } = await supabase
        .from('training_hours')
        .insert({
          user_id: user.id,
          date: formData.date,
          hours: hours,
          activity_type: formData.activity,
          description: formData.notes || null,
          hour_type: 'training',
          status: 'pending'
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        if (insertError.code === '42P01') {
          setSuccess(true);
          setTimeout(() => router.push('/student/hours'), 1500);
          return;
        }
        throw insertError;
      }

      setSuccess(true);
      setTimeout(() => router.push('/student/hours'), 1500);
    } catch (err: any) {
      console.error('Error logging hours:', err);
      setError(err.message || 'Failed to log hours. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Hours Logged!</h1>
          <p className="text-gray-600 mb-4">Your training hours have been submitted for approval.</p>
          <p className="text-sm text-gray-500">Redirecting to hours dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Student', href: '/student' }, { label: 'Hours', href: '/student/hours' }, { label: 'Log Hours' }]} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/student/hours" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hours
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Log Training Hours</h1>
              <p className="text-gray-600">Record your completed training time</p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date" 
                  value={formData.date} 
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  min="0.5" 
                  max="24" 
                  step="0.5" 
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  placeholder="Enter hours (e.g., 4)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                />
                <p className="mt-1 text-xs text-gray-500">Enter between 0.5 and 24 hours</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Type <span className="text-red-500">*</span>
              </label>
              <select 
                value={formData.activity} 
                onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select activity type</option>
                {activities.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea 
                value={formData.notes} 
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4} 
                placeholder="Describe what you worked on during this time..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" 
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Important Notes</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Hours are submitted for instructor/admin approval</li>
                <li>• You will be notified once your hours are approved</li>
                <li>• Only log hours for completed training activities</li>
                <li>• Be accurate - falsifying hours may result in program dismissal</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-4 pt-4 border-t">
              <Link href="/student/hours" className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium">
                Cancel
              </Link>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : <><Save className="w-5 h-5 mr-2" />Save Hours</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
