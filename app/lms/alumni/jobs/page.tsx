import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ChevronRight,
  Search,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Building,
  ExternalLink,
  Filter,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Alumni Jobs | Elevate LMS',
  description: 'Exclusive job opportunities for Elevate program alumni.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  salary_range: string | null;
  description: string;
  requirements: string[];
  posted_at: string;
  is_alumni_exclusive: boolean;
  application_url: string | null;
}

export default async function AlumniJobsPage() {
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
  if (!user) redirect('/login?next=/lms/alumni/jobs');

  // Fetch job postings
  const { data: jobs } = await supabase
    .from('job_postings')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(20);

  // Sample jobs if none exist
  const sampleJobs: JobPosting[] = [
    {
      id: '1',
      title: 'Licensed Barber',
      company: 'Premier Barbershop',
      location: 'Indianapolis, IN',
      job_type: 'Full-time',
      salary_range: '$40,000 - $60,000',
      description: 'Seeking a licensed barber to join our growing team.',
      requirements: ['Valid barber license', '2+ years experience', 'Strong client skills'],
      posted_at: new Date().toISOString(),
      is_alumni_exclusive: true,
      application_url: null,
    },
    {
      id: '2',
      title: 'HVAC Technician',
      company: 'Comfort Systems Inc',
      location: 'Carmel, IN',
      job_type: 'Full-time',
      salary_range: '$45,000 - $65,000',
      description: 'Join our team of skilled HVAC technicians.',
      requirements: ['EPA certification', 'Valid driver\'s license', 'Physical ability to lift 50lbs'],
      posted_at: new Date().toISOString(),
      is_alumni_exclusive: false,
      application_url: null,
    },
    {
      id: '3',
      title: 'Medical Assistant',
      company: 'Community Health Network',
      location: 'Indianapolis, IN',
      job_type: 'Full-time',
      salary_range: '$35,000 - $45,000',
      description: 'Medical assistant position in busy primary care clinic.',
      requirements: ['CMA certification', 'EHR experience', 'Bilingual preferred'],
      posted_at: new Date().toISOString(),
      is_alumni_exclusive: true,
      application_url: null,
    },
  ];

  const displayJobs = jobs && jobs.length > 0 ? jobs : sampleJobs;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/lms" className="hover:text-gray-700">LMS</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/lms/alumni" className="hover:text-gray-700">Alumni</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Jobs</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Alumni Job Board</h1>
              <p className="text-gray-600 mt-1">Exclusive opportunities for program graduates</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <button className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{displayJobs.length}</p>
                <p className="text-sm text-gray-500">Open Positions</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {displayJobs.filter((j: JobPosting) => j.is_alumni_exclusive).length}
                </p>
                <p className="text-sm text-gray-500">Alumni Exclusive</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">25+</p>
                <p className="text-sm text-gray-500">Partner Employers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {displayJobs.map((job: JobPosting) => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    {job.is_alumni_exclusive && (
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                        Alumni Exclusive
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.job_type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{job.description}</p>
                  {job.salary_range && (
                    <div className="flex items-center gap-1 text-green-600 font-medium">
                      <DollarSign className="w-4 h-4" />
                      {job.salary_range}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <span className="text-sm text-gray-500">{formatDate(job.posted_at)}</span>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Apply Now
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {job.requirements && job.requirements.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Employer CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Are you an employer?</h2>
              <p className="text-blue-100">Post jobs and connect with skilled program graduates.</p>
            </div>
            <Link
              href="/employers/post-job"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
