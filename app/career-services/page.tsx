import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  Briefcase,
  FileText,
  Users,
  Calendar,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career Services | Elevate for Humanity',
  description: 'Resume building, interview prep, job placement, and career counseling services.',
};

export const dynamic = 'force-dynamic';

export default async function CareerServicesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get stats from database
  const { count: placementCount } = await supabase
    .from('placements')
    .select('*', { count: 'exact', head: true });

  const { count: employerCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'employer');

  const { count: graduateCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'alumni');

  // Get upcoming career events
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('event_type', 'career')
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(3);

  // Get job listings
  const { data: jobs } = await supabase
    .from('job_listings')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(4);

  // Get user's career profile if logged in
  let careerProfile = null;
  if (user) {
    const { data } = await supabase
      .from('career_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    careerProfile = data;
  }

  const services = [
    {
      icon: FileText,
      title: 'Resume Building',
      description: 'Professional resume writing and optimization to highlight your skills.',
      href: '/career-services/resume-building',
      color: 'blue',
    },
    {
      icon: Users,
      title: 'Interview Prep',
      description: 'Mock interviews, coaching, and feedback to ace your interviews.',
      href: '/career-services/interview-prep',
      color: 'green',
    },
    {
      icon: Briefcase,
      title: 'Job Placement',
      description: 'Direct connections to employers actively hiring our graduates.',
      href: '/career-services/job-placement',
      color: 'purple',
    },
    {
      icon: MessageSquare,
      title: 'Career Counseling',
      description: 'One-on-one guidance for career planning and development.',
      href: '/career-services/career-counseling',
      color: 'orange',
    },
    {
      icon: Calendar,
      title: 'Networking Events',
      description: 'Career fairs, employer meetups, and industry networking.',
      href: '/career-services/networking-events',
      color: 'teal',
    },
    {
      icon: TrendingUp,
      title: 'Ongoing Support',
      description: 'Continued career support even after you land your job.',
      href: '/career-services/ongoing-support',
      color: 'pink',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Career Services</h1>
          <p className="text-xl text-green-100 max-w-2xl mb-8">
            From resume to job offer - we support you every step of the way.
          </p>
          {user ? (
            <Link
              href="/career-services/dashboard"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              My Career Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-3xl font-bold">{placementCount || 200}+</div>
              <div className="text-gray-600">Job Placements</div>
            </div>
            <div className="text-center">
              <Briefcase className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold">{employerCount || 50}+</div>
              <div className="text-gray-600">Employer Partners</div>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-3xl font-bold">85%</div>
              <div className="text-gray-600">Placement Rate</div>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-3xl font-bold">{graduateCount || 500}+</div>
              <div className="text-gray-600">Graduates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition group"
              >
                <service.icon className={`w-10 h-10 text-${service.color}-600 mb-4`} />
                <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings & Events */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Jobs */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recent Job Openings</h2>
                <Link href="/jobs" className="text-green-600 font-medium hover:underline">
                  View All
                </Link>
              </div>
              {jobs && jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.map((job: any) => (
                    <div key={job.id} className="bg-white rounded-lg shadow-sm border p-4">
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-gray-600 text-sm">{job.company}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500">{job.location}</span>
                        <Link href={`/jobs/${job.id}`} className="text-green-600 text-sm font-medium">
                          Apply
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-8 text-center text-gray-500">
                  <Briefcase className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <p>New job listings coming soon</p>
                </div>
              )}
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Career Events</h2>
                <Link href="/events" className="text-green-600 font-medium hover:underline">
                  View All
                </Link>
              </div>
              {events && events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event: any) => (
                    <div key={event.id} className="bg-white rounded-lg shadow-sm border p-4">
                      <div className="flex items-center gap-2 text-green-600 text-sm mb-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.start_date).toLocaleDateString()}
                      </div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{event.location}</p>
                      <Link href={`/events/${event.id}`} className="text-green-600 text-sm font-medium mt-2 inline-block">
                        Register
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border p-8 text-center text-gray-500">
                  <Calendar className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <p>No upcoming events</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Career?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join our programs and get access to all career services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100"
            >
              Apply Now
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-400 border-2 border-white"
            >
              Browse Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
