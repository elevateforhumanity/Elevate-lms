import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, Calendar, User, Target, Compass, ArrowRight, CheckCircle, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career Counseling | Career Services | Elevate For Humanity',
  description: 'One-on-one career guidance to help you discover your path, set goals, and achieve professional success.',
};

export const dynamic = 'force-dynamic';

export default async function CareerCounselingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get counselors
  const { data: counselors } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, bio, specialties')
    .eq('role', 'counselor')
    .eq('is_active', true)
    .limit(4);

  // Get user's appointments if logged in
  let appointments = null;
  if (user) {
    const { data } = await supabase
      .from('counseling_appointments')
      .select('*')
      .eq('user_id', user.id)
      .order('scheduled_at', { ascending: true });
    appointments = data;
  }

  // Get stats
  const { count: sessionsCompleted } = await supabase
    .from('counseling_appointments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');

  const services = [
    {
      icon: Compass,
      title: 'Career Exploration',
      description: 'Discover careers that match your interests, skills, and values.',
    },
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Create actionable plans to achieve your short and long-term career goals.',
    },
    {
      icon: MessageSquare,
      title: 'Decision Support',
      description: 'Get guidance on job offers, career changes, and professional decisions.',
    },
    {
      icon: User,
      title: 'Personal Development',
      description: 'Build confidence, communication skills, and professional presence.',
    },
  ];

  const topics = [
    'Choosing the right career path',
    'Transitioning to a new industry',
    'Work-life balance strategies',
    'Dealing with workplace challenges',
    'Building professional confidence',
    'Long-term career planning',
    'Salary and benefits negotiation',
    'Professional networking strategies',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 to-orange-800/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 text-white">
          <Link href="/career-services" className="text-orange-200 hover:text-white mb-4 inline-block">
            ← Career Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Career Counseling</h1>
          <p className="text-xl text-orange-100 max-w-2xl mb-8">
            One-on-one guidance to help you navigate your career journey with confidence.
          </p>
          {user ? (
            <Link
              href="/career-services/career-counseling/schedule"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Schedule Appointment <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href="/login?redirect=/career-services/career-counseling"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Sign In to Schedule <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600">{sessionsCompleted || 500}+</div>
              <div className="text-gray-600">Sessions Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">{counselors?.length || 4}</div>
              <div className="text-gray-600">Career Counselors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">Free</div>
              <div className="text-gray-600">For Students</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Services */}
            <div>
              <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div key={service.title} className="bg-white rounded-xl shadow-sm border p-6">
                    <service.icon className="w-10 h-10 text-orange-600 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Topics We Can Help With</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {topics.map((topic) => (
                  <div key={topic} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-600">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* User's Appointments */}
            {user && appointments && appointments.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
                <div className="space-y-3">
                  {appointments.map((apt: any) => (
                    <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="font-medium">{apt.type || 'Career Counseling'}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(apt.scheduled_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        apt.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                        apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Counselors */}
            {counselors && counselors.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Our Counselors</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {counselors.map((counselor: any) => (
                    <div key={counselor.id} className="bg-white rounded-xl shadow-sm border p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center relative overflow-hidden">
                          {counselor.avatar_url ? (
                            <Image src={counselor.avatar_url} alt="" fill className="rounded-full object-cover" sizes="64px" />
                          ) : (
                            <User className="w-8 h-8 text-orange-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{counselor.full_name}</h3>
                          <p className="text-sm text-gray-500">Career Counselor</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{counselor.bio || 'Dedicated to helping you achieve your career goals.'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Schedule CTA */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Book a Session</h3>
              <p className="text-sm text-gray-600 mb-4">
                Schedule a free one-on-one session with a career counselor.
              </p>
              <Link
                href="/career-services/career-counseling/schedule"
                className="block w-full text-center bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700"
              >
                Schedule Now
              </Link>
            </div>

            {/* Session Info */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Session Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>30-60 minute sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>In-person or virtual</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  <span>Confidential discussions</span>
                </div>
              </div>
            </div>

            {/* Related Services */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Related Services</h3>
              <div className="space-y-2 text-sm">
                <Link href="/career-services/resume-building" className="block text-orange-600 hover:underline">
                  Resume Building
                </Link>
                <Link href="/career-services/interview-prep" className="block text-orange-600 hover:underline">
                  Interview Preparation
                </Link>
                <Link href="/career-services/job-placement" className="block text-orange-600 hover:underline">
                  Job Placement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
