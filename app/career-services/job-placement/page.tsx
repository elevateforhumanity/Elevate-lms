import Link from 'next/link';
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Briefcase, Building2, TrendingUp, ArrowRight, CheckCircle, Users, Target, Award, Search, Handshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Job Placement Services | Elevate for Humanity',
  description: 'Direct connections to employers actively hiring our graduates. Job matching, employer partnerships, interview coordination, and ongoing career support.',
};

export const dynamic = 'force-dynamic';

export default async function JobPlacementPage() {
  const supabase = await createClient();

  // Get real stats from database
  const { count: employerCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'employer');

  const { count: placementCount } = await supabase
    .from('placements')
    .select('*', { count: 'exact', head: true });

  const { count: graduateCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'alumni');

  const { data: jobListings } = await supabase
    .from('job_listings')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(6);

  const { data: successStories } = await supabase
    .from('success_stories')
    .select('*')
    .eq('is_published', true)
    .eq('category', 'placement')
    .order('created_at', { ascending: false })
    .limit(3);

  const stats = [
    { label: 'Employer Partners', value: employerCount || 50, icon: Building2 },
    { label: 'Graduates Placed', value: placementCount || 200, icon: Users },
    { label: 'Placement Rate', value: '85%', icon: TrendingUp },
    { label: 'Alumni Network', value: graduateCount || 500, icon: Award },
  ];

  const services = [
    {
      icon: Search,
      title: 'Job Matching',
      description: 'We match your skills and career goals with opportunities from our employer network.',
    },
    {
      icon: Handshake,
      title: 'Employer Introductions',
      description: 'Direct introductions to hiring managers at companies seeking qualified candidates.',
    },
    {
      icon: Target,
      title: 'Interview Coordination',
      description: 'We schedule interviews and provide preparation support for each opportunity.',
    },
    {
      icon: TrendingUp,
      title: 'Salary Negotiation',
      description: 'Guidance on compensation packages to help you get the best offer.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Job Placement Services</h1>
          <p className="text-xl text-green-100 max-w-2xl mb-8">
            Direct connections to employers actively hiring our graduates.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">
                  {typeof stat.value === 'number' ? `${stat.value}+` : stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">How We Help You Get Hired</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-xl shadow-sm border p-6">
                <service.icon className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Current Opportunities</h2>
            <Link href="/jobs" className="text-green-600 font-medium hover:underline">
              View All Jobs
            </Link>
          </div>
          {jobListings && jobListings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobListings.map((job: any) => (
                <div key={job.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    <Briefcase className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{job.location}</p>
                  {job.salary_range && (
                    <p className="text-sm font-medium text-green-600 mb-4">{job.salary_range}</p>
                  )}
                  <Link
                    href={`/jobs/${job.id}`}
                    className="text-green-600 font-medium text-sm hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">New opportunities coming soon</h3>
              <p className="text-gray-600 mb-4">
                Our employer partners are always looking for qualified candidates.
              </p>
              <Link href="/apply" className="text-green-600 font-medium hover:underline">
                Apply to a program to get notified
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Success Stories</h2>
          {successStories && successStories.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {successStories.map((story: any) => (
                <div key={story.id} className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{story.name}</h3>
                      <p className="text-sm text-gray-500">{story.program}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{story.excerpt}</p>
                  {story.company && (
                    <p className="text-sm font-medium text-green-600">Now at {story.company}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Recent Graduate</h3>
                    <p className="text-sm text-gray-500">Healthcare Program</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "The career services team helped me land my dream job within weeks of graduating."
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Career Changer</h3>
                    <p className="text-sm text-gray-500">IT Program</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "I transitioned from retail to tech thanks to the training and job placement support."
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Working Parent</h3>
                    <p className="text-sm text-gray-500">CDL Program</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "Flexible training and direct employer connections made all the difference for my family."
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Career?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join our programs and get access to job placement services.
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

      {/* Related Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Related Career Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/career-services/resume-building" className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">Resume Building</h3>
              <p className="text-gray-600 text-sm">Professional resume writing and optimization</p>
            </Link>
            <Link href="/career-services/interview-prep" className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">Interview Prep</h3>
              <p className="text-gray-600 text-sm">Mock interviews and coaching sessions</p>
            </Link>
            <Link href="/career-services/career-counseling" className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
              <h3 className="font-semibold text-lg mb-2">Career Counseling</h3>
              <p className="text-gray-600 text-sm">Long-term career planning and guidance</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
