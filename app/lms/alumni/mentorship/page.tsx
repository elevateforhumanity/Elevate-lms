import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ChevronRight,
  Users,
  User,
  Star,
  MessageCircle,
  Calendar,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mentorship Program | Elevate LMS',
  description: 'Connect with experienced mentors or become a mentor yourself.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface Mentor {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  job_title: string | null;
  company: string | null;
  expertise: string[];
  years_experience: number;
  mentees_count: number;
  rating: number;
}

export default async function MentorshipPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Database connection failed.</p>
        </div>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/lms/alumni/mentorship');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_mentor')
    .eq('id', user.id)
    .single();

  // Fetch available mentors
  const { data: mentors } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, job_title, company')
    .eq('is_mentor', true)
    .limit(6);

  // Sample mentors if none exist
  const sampleMentors: Mentor[] = [
    {
      id: '1',
      full_name: 'Marcus Johnson',
      avatar_url: null,
      job_title: 'Master Barber',
      company: 'Elite Cuts Barbershop',
      expertise: ['Barbering', 'Business Management', 'Client Relations'],
      years_experience: 12,
      mentees_count: 8,
      rating: 4.9,
    },
    {
      id: '2',
      full_name: 'Sarah Williams',
      avatar_url: null,
      job_title: 'HVAC Project Manager',
      company: 'Comfort Systems Inc',
      expertise: ['HVAC', 'Project Management', 'Team Leadership'],
      years_experience: 8,
      mentees_count: 5,
      rating: 4.8,
    },
    {
      id: '3',
      full_name: 'Dr. Angela Martinez',
      avatar_url: null,
      job_title: 'Clinical Director',
      company: 'Community Health Network',
      expertise: ['Healthcare', 'Medical Assisting', 'Career Development'],
      years_experience: 15,
      mentees_count: 12,
      rating: 5.0,
    },
  ];

  const displayMentors = mentors && mentors.length > 0 ? mentors : sampleMentors;

  const benefits = [
    {
      title: 'Career Guidance',
      description: 'Get personalized advice on career paths and opportunities',
      icon: ArrowRight,
    },
    {
      title: 'Industry Insights',
      description: 'Learn from real-world experience and industry knowledge',
      icon: Star,
    },
    {
      title: 'Networking',
      description: 'Expand your professional network through mentor connections',
      icon: Users,
    },
    {
      title: 'Skill Development',
      description: 'Identify and develop skills needed for career advancement',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/lms" className="hover:text-gray-700">LMS</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/lms/alumni" className="hover:text-gray-700">Alumni</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Mentorship</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">Mentorship Program</h1>
          <p className="text-gray-600 mt-1">Connect with experienced professionals in your field</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Accelerate Your Career with a Mentor</h2>
            <p className="text-blue-100 mb-6">
              Our mentorship program connects you with successful alumni who can guide you 
              through your career journey, share industry insights, and help you achieve your goals.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                Find a Mentor
              </button>
              {!profile?.is_mentor && (
                <button className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white rounded-lg hover:bg-white/10 font-medium">
                  Become a Mentor
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Featured Mentors */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Featured Mentors</h2>
            <Link href="/lms/alumni/directory?mentors=true" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {(displayMentors as Mentor[]).map((mentor) => (
              <div key={mentor.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    {mentor.avatar_url ? (
                      <img
                        src={mentor.avatar_url}
                        alt={mentor.full_name || ''}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-7 h-7 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{mentor.full_name}</h3>
                    <p className="text-sm text-gray-600">{mentor.job_title}</p>
                    <p className="text-sm text-gray-500">{mentor.company}</p>
                  </div>
                </div>
                {mentor.expertise && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {mentor.expertise.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{mentor.rating || '5.0'}</span>
                    <span className="mx-1">•</span>
                    <span>{mentor.mentees_count || 0} mentees</span>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Browse Mentors</h3>
              <p className="text-sm text-gray-600">
                Explore our directory of experienced alumni mentors in your field.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Request Connection</h3>
              <p className="text-sm text-gray-600">
                Send a connection request with your goals and what you hope to learn.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Start Learning</h3>
              <p className="text-sm text-gray-600">
                Schedule sessions and begin your mentorship journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
