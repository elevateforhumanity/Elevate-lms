import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Users, MessageSquare, Calendar, Award, BookOpen, Briefcase, Heart, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community | Elevate For Humanity',
  description: 'Join our community of learners, mentors, and employers. Connect, learn, and grow together.',
};

export const dynamic = 'force-dynamic';

export default async function CommunityPage() {
  const supabase = await createClient();

  // Get community stats
  const { count: studentCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  const { count: employerCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'employer');

  const { count: completionCount } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');

  const { count: jobCount } = await supabase
    .from('job_postings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const communityLinks = [
    {
      title: 'Student Forums',
      description: 'Connect with fellow students, share experiences, and get study tips',
      href: '/lms/forums',
      icon: MessageSquare,
      color: 'bg-blue-500',
    },
    {
      title: 'Events & Workshops',
      description: 'Join career fairs, workshops, and networking events',
      href: '/events',
      icon: Calendar,
      color: 'bg-purple-500',
    },
    {
      title: 'Success Stories',
      description: 'Read inspiring stories from our graduates',
      href: '/success-stories',
      icon: Award,
      color: 'bg-green-500',
    },
    {
      title: 'Learning Resources',
      description: 'Access free tutorials, guides, and study materials',
      href: '/learning',
      icon: BookOpen,
      color: 'bg-orange-500',
    },
    {
      title: 'Job Board',
      description: 'Browse job opportunities from our employer partners',
      href: '/jobs',
      icon: Briefcase,
      color: 'bg-indigo-500',
    },
    {
      title: 'Volunteer',
      description: 'Give back by mentoring students or supporting our mission',
      href: '/volunteer',
      icon: Heart,
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Join Our Community
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Connect with thousands of learners, mentors, and employers committed to career success.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">{studentCount || 0}+</div>
              <div className="text-blue-200">Students</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">{employerCount || 0}+</div>
              <div className="text-blue-200">Employers</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">{completionCount || 0}+</div>
              <div className="text-blue-200">Graduates</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold">{jobCount || 0}+</div>
              <div className="text-blue-200">Job Openings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Links */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Our Community</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-lg transition-shadow group"
                >
                  <div className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{link.description}</p>
                  <span className="inline-flex items-center text-blue-600 font-medium">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8">
            Join thousands of students who have transformed their careers through our programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/programs"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
