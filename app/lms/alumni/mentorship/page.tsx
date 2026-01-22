import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Users, User, Briefcase, Calendar, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mentorship Program | Alumni',
  description: 'Connect with mentors in your field.',
};

export const dynamic = 'force-dynamic';

export default async function MentorshipPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login?next=/lms/alumni/mentorship');

  // Fetch mentors from database
  const { data: mentors, error } = await supabase
    .from('mentors')
    .select(`
      id,
      bio,
      expertise,
      availability,
      is_active,
      profile:profiles(full_name, avatar_url, role)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching mentors:', error.message);
  }

  const mentorList = mentors || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mentorship Program</h1>
          <p className="text-gray-600 mt-1">Connect with experienced professionals in your field</p>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white mb-8">
          <h2 className="text-xl font-bold mb-4">Why Join Our Mentorship Program?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Career Guidance</h3>
              <p className="text-blue-100 text-sm">Get personalized advice from industry professionals</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Networking</h3>
              <p className="text-blue-100 text-sm">Build connections that can open doors</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Skill Development</h3>
              <p className="text-blue-100 text-sm">Learn from real-world experience</p>
            </div>
          </div>
        </div>

        {/* Mentors */}
        {mentorList.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentorList.map((mentor: any) => (
              <div key={mentor.id} className="bg-white rounded-xl border p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{mentor.profile?.full_name || 'Mentor'}</h3>
                    <p className="text-sm text-gray-500">{mentor.expertise || 'Industry Professional'}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{mentor.bio || 'Experienced professional ready to help guide your career.'}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{mentor.availability || 'Available for mentoring'}</span>
                </div>
                <Link
                  href={`/lms/alumni/mentorship/${mentor.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <MessageSquare className="w-4 h-4" />
                  Connect
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Mentorship Program Coming Soon</h2>
            <p className="text-gray-600 mb-6">We're building our mentor network. Check back soon or sign up to be notified.</p>
            <Link 
              href="/lms/alumni"
              className="text-blue-600 hover:underline"
            >
              Return to Alumni Portal
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
