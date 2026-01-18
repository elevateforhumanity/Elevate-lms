import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  FileText,
  Calendar,
  BarChart3,
  MessageSquare,
  Settings,
  Building2,
  UserPlus,
  ClipboardList,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Employer Portal | Elevate For Humanity',
  description: 'Manage job postings, view candidates, and track hiring progress.',
};

export const dynamic = 'force-dynamic';

export default async function EmployerPortalPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/employer-portal');
  }

  // Get employer profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get employer's company info
  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('owner_id', user.id)
    .single();

  // Get active job postings
  const { data: jobPostings } = await supabase
    .from('job_listings')
    .select('*')
    .eq('employer_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  // Get candidate applications
  const { data: applications } = await supabase
    .from('job_applications')
    .select(`
      id,
      status,
      created_at,
      job:job_listings(title),
      applicant:profiles(full_name, email)
    `)
    .in('job_id', jobPostings?.map(j => j.id) || [])
    .order('created_at', { ascending: false })
    .limit(10);

  // Get upcoming interviews
  const { data: interviews } = await supabase
    .from('interviews')
    .select(`
      id,
      scheduled_at,
      status,
      candidate:profiles(full_name),
      job:job_listings(title)
    `)
    .eq('employer_id', user.id)
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })
    .limit(5);

  // Get placement stats
  const { count: totalHires } = await supabase
    .from('placements')
    .select('*', { count: 'exact', head: true })
    .eq('employer_id', user.id);

  const { count: activePostings } = await supabase
    .from('job_listings')
    .select('*', { count: 'exact', head: true })
    .eq('employer_id', user.id)
    .eq('is_active', true);

  const { count: pendingApplications } = await supabase
    .from('job_applications')
    .select('*', { count: 'exact', head: true })
    .in('job_id', jobPostings?.map(j => j.id) || [])
    .eq('status', 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{company?.name || 'Employer Portal'}</h1>
                <p className="text-blue-200">Welcome back, {profile?.full_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/employer-portal/messages" className="p-2 bg-blue-600 rounded-lg hover:bg-blue-500">
                <MessageSquare className="w-5 h-5" />
              </Link>
              <Link href="/employer-portal/settings" className="p-2 bg-blue-600 rounded-lg hover:bg-blue-500">
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <Briefcase className="w-8 h-8 text-blue-600 mb-2" />
            <div className="text-2xl font-bold">{activePostings || 0}</div>
            <div className="text-gray-600 text-sm">Active Postings</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <FileText className="w-8 h-8 text-orange-500 mb-2" />
            <div className="text-2xl font-bold">{pendingApplications || 0}</div>
            <div className="text-gray-600 text-sm">Pending Applications</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <Calendar className="w-8 h-8 text-purple-600 mb-2" />
            <div className="text-2xl font-bold">{interviews?.length || 0}</div>
            <div className="text-gray-600 text-sm">Upcoming Interviews</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
            <div className="text-2xl font-bold">{totalHires || 0}</div>
            <div className="text-gray-600 text-sm">Total Hires</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/employer-portal/jobs/new" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                  <UserPlus className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-center">Post a Job</span>
                </Link>
                <Link href="/employer-portal/candidates" className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
                  <Users className="w-6 h-6 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-center">Browse Candidates</span>
                </Link>
                <Link href="/employer-portal/interviews" className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
                  <Calendar className="w-6 h-6 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-center">Schedule Interview</span>
                </Link>
                <Link href="/employer-portal/analytics" className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
                  <BarChart3 className="w-6 h-6 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-center">View Analytics</span>
                </Link>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Applications</h2>
                <Link href="/employer-portal/applications" className="text-blue-600 text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              {applications && applications.length > 0 ? (
                <div className="space-y-3">
                  {applications.map((app: any) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{app.applicant?.full_name}</p>
                          <p className="text-sm text-gray-500">{app.job?.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          app.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                          app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {app.status}
                        </span>
                        <Link href={`/employer-portal/applications/${app.id}`} className="text-blue-600 text-sm font-medium">
                          Review
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <p>No applications yet</p>
                  <Link href="/employer-portal/jobs/new" className="text-blue-600 font-medium hover:underline">
                    Post a job to start receiving applications
                  </Link>
                </div>
              )}
            </div>

            {/* Active Job Postings */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your Job Postings</h2>
                <Link href="/employer-portal/jobs" className="text-blue-600 text-sm font-medium hover:underline">
                  Manage All
                </Link>
              </div>
              {jobPostings && jobPostings.length > 0 ? (
                <div className="space-y-3">
                  {jobPostings.map((job: any) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.location} • {job.employment_type}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          job.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {job.is_active ? 'Active' : 'Inactive'}
                        </span>
                        <Link href={`/employer-portal/jobs/${job.id}`} className="text-blue-600 text-sm font-medium">
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Briefcase className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <p>No job postings yet</p>
                  <Link href="/employer-portal/jobs/new" className="text-blue-600 font-medium hover:underline">
                    Create your first job posting
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Interviews */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Upcoming Interviews</h2>
              {interviews && interviews.length > 0 ? (
                <div className="space-y-3">
                  {interviews.map((interview: any) => (
                    <div key={interview.id} className="p-3 bg-purple-50 rounded-lg">
                      <p className="font-medium text-sm">{interview.candidate?.full_name}</p>
                      <p className="text-xs text-gray-500">{interview.job?.title}</p>
                      <p className="text-xs text-purple-600 mt-1">
                        {new Date(interview.scheduled_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No upcoming interviews</p>
                </div>
              )}
            </div>

            {/* Company Profile */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Company Profile</h2>
              {company ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Company Name</p>
                    <p className="font-medium">{company.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="font-medium">{company.industry || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{company.location || 'Not specified'}</p>
                  </div>
                  <Link href="/employer-portal/company" className="block text-blue-600 text-sm font-medium hover:underline mt-4">
                    Edit Company Profile
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Building2 className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm text-gray-500 mb-3">Complete your company profile</p>
                  <Link href="/employer-portal/company/setup" className="text-blue-600 text-sm font-medium hover:underline">
                    Set Up Profile
                  </Link>
                </div>
              )}
            </div>

            {/* Resources */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Employer Resources</h3>
              <div className="space-y-2 text-sm">
                <Link href="/employer-portal/hiring-guide" className="block text-blue-600 hover:underline">
                  Hiring Best Practices
                </Link>
                <Link href="/employer-portal/programs" className="block text-blue-600 hover:underline">
                  Training Programs
                </Link>
                <Link href="/support" className="block text-blue-600 hover:underline">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
