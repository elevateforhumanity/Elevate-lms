import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Users, Star, MessageSquare, Award, ArrowRight, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Become a Mentor | Elevate For Humanity',
  description: 'Share your expertise and guide the next generation of professionals.',
};

export const dynamic = 'force-dynamic';

export default async function MentorPage() {
  const supabase = await createClient();

  const { data: mentors } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, bio, expertise')
    .eq('role', 'mentor')
    .limit(6);

  const { count: mentorCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'mentor');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Become a Mentor</h1>
          <p className="text-xl text-teal-100 max-w-2xl mb-8">
            Join {mentorCount || 25}+ industry professionals helping students succeed.
          </p>
          <Link href="/mentor/apply" className="inline-flex items-center gap-2 bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Apply to Mentor <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Share Knowledge</h3>
            <p className="text-gray-600">Guide students with your industry experience and insights</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Career Guidance</h3>
            <p className="text-gray-600">Help mentees navigate their career paths and opportunities</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Make an Impact</h3>
            <p className="text-gray-600">Transform lives and build the next generation of talent</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Our Mentors</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors && mentors.length > 0 ? mentors.map((mentor: any) => (
            <div key={mentor.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{mentor.full_name}</h3>
                  <p className="text-sm text-gray-500">{mentor.expertise || 'Industry Expert'}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{mentor.bio || 'Experienced professional dedicated to helping students succeed.'}</p>
            </div>
          )) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Be one of our first mentors!</p>
              <Link href="/mentor/apply" className="text-teal-600 font-medium hover:underline">Apply Now</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
