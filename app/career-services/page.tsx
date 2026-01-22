import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import AvatarVideoOverlay from '@/components/AvatarVideoOverlay';
import {
  Briefcase,
  FileText,
  Users,
  Target,
  CheckCircle,
  ArrowRight,
  MapPin,
  DollarSign,
  Building,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career Services | Elevate For Humanity',
  description: 'Resume building, interview prep, job placement assistance, and career coaching to help you land your dream job.',
};

export const dynamic = 'force-dynamic';

const SERVICES = [
  {
    icon: FileText,
    title: 'Resume Building',
    description: 'Professional resume writing and optimization to highlight your skills and experience.',
  },
  {
    icon: Users,
    title: 'Interview Prep',
    description: 'Mock interviews, coaching, and strategies to help you ace any interview.',
  },
  {
    icon: Briefcase,
    title: 'Job Placement',
    description: 'Direct connections to employers actively hiring in your field.',
  },
  {
    icon: Target,
    title: 'Career Coaching',
    description: 'One-on-one guidance to help you navigate your career path.',
  },
];

export default async function CareerServicesPage() {
  const supabase = await createClient();

  // Fetch job postings from database
  const { data: jobs, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(4);

  if (error) {
    console.error('Error fetching jobs:', error.message);
  }

  const jobList = jobs || [];

  return (
    <div className="min-h-screen bg-white">
      <AvatarVideoOverlay 
        videoSrc="/videos/avatars/home-welcome.mp4"
        avatarName="Career Guide"
        position="bottom-right"
        autoPlay={true}
        showOnLoad={true}
      />
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80 z-10" />
        <div className="relative h-[400px] bg-gray-900">
          <Image
            src="/images/artlist/office-meeting.jpg"
            alt="Career Services"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-6xl mx-auto px-4 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Career Services</h1>
            <p className="text-xl text-blue-100 max-w-2xl mb-8">
              From resume building to job placement, we're here to help you succeed in your career journey.
            </p>
            <Link
              href="/career-services/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 border hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
            <Link href="/career-services/jobs" className="text-blue-600 hover:underline font-medium">
              View All Jobs →
            </Link>
          </div>

          {jobList.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {jobList.map((job: any) => (
                <div key={job.id} className="bg-white rounded-xl border p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600 flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {job.company}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {job.job_type || 'Full-time'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location || 'Remote'}
                    </span>
                    {job.salary_range && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary_range}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/career-services/jobs/${job.id}`}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-12 text-center">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Job listings coming soon</h3>
              <p className="text-gray-600">Check back for new opportunities from our employer partners.</p>
            </div>
          )}
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-blue-200">Job Placements</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">95%</p>
              <p className="text-blue-200">Placement Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">100+</p>
              <p className="text-blue-200">Employer Partners</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">$45K</p>
              <p className="text-blue-200">Avg Starting Salary</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Launch Your Career?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our career services team is ready to help you take the next step. Schedule a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/career-services/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Schedule Consultation
            </Link>
            <Link
              href="/career-services/resources"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
            >
              Free Resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
