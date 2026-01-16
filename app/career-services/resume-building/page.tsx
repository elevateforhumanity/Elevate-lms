import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  FileText,
  CheckCircle,
  Download,
  Upload,
  Calendar,
  ArrowRight,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resume Building | Career Services | Elevate for Humanity',
  description: 'Professional resume writing, review, and optimization services.',
};

export const dynamic = 'force-dynamic';

export default async function ResumeBuildingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get resume templates
  const { data: templates } = await supabase
    .from('resume_templates')
    .select('*')
    .eq('is_active', true)
    .order('downloads', { ascending: false })
    .limit(6);

  // Get user's resumes if logged in
  let userResumes = null;
  let resumeReviews = null;
  if (user) {
    const { data: resumes } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });
    userResumes = resumes;

    const { data: reviews } = await supabase
      .from('resume_reviews')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    resumeReviews = reviews;
  }

  // Get stats
  const { count: resumesCreated } = await supabase
    .from('resumes')
    .select('*', { count: 'exact', head: true });

  const features = [
    'Professional formatting and layout',
    'ATS-optimized for applicant tracking systems',
    'Industry-specific keywords',
    'Achievement-focused bullet points',
    'Clean, modern design templates',
    'Expert review and feedback',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resume Building</h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-8">
            Create a professional resume that gets you noticed by employers.
          </p>
          {user ? (
            <Link
              href="/career-services/resume-building/create"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Create New Resume <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href="/login?redirect=/career-services/resume-building"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Sign In to Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* User's Resumes */}
            {user && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">My Resumes</h2>
                  <Link
                    href="/career-services/resume-building/create"
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    + New Resume
                  </Link>
                </div>
                {userResumes && userResumes.length > 0 ? (
                  <div className="space-y-3">
                    {userResumes.map((resume: any) => (
                      <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-blue-600" />
                          <div>
                            <h3 className="font-medium">{resume.title || 'Untitled Resume'}</h3>
                            <p className="text-sm text-gray-500">
                              Updated {new Date(resume.updated_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/career-services/resume-building/edit/${resume.id}`}
                            className="text-blue-600 text-sm font-medium"
                          >
                            Edit
                          </Link>
                          {resume.file_url && (
                            <a
                              href={resume.file_url}
                              className="flex items-center gap-1 text-green-600 text-sm font-medium"
                            >
                              <Download className="w-4 h-4" /> Download
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500 mb-3">No resumes yet</p>
                    <Link
                      href="/career-services/resume-building/create"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Create your first resume
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Templates */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Resume Templates</h2>
              {templates && templates.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {templates.map((template: any) => (
                    <div key={template.id} className="border rounded-lg p-4 hover:border-blue-300 transition">
                      <div className="h-32 bg-gray-100 rounded mb-3 flex items-center justify-center">
                        {template.preview_url ? (
                          <img src={template.preview_url} alt={template.name} className="h-full object-contain" />
                        ) : (
                          <FileText className="w-10 h-10 text-gray-400" />
                        )}
                      </div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{template.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{template.downloads || 0} downloads</span>
                        <Link
                          href={`/career-services/resume-building/create?template=${template.id}`}
                          className="text-blue-600 text-sm font-medium"
                        >
                          Use Template
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {['Professional', 'Modern', 'Creative', 'Executive'].map((name) => (
                    <div key={name} className="border rounded-lg p-4 hover:border-blue-300 transition">
                      <div className="h-32 bg-gray-100 rounded mb-3 flex items-center justify-center">
                        <FileText className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="font-medium">{name} Template</h3>
                      <p className="text-sm text-gray-500 mb-3">Clean and professional</p>
                      <Link
                        href={`/career-services/resume-building/create?template=${name.toLowerCase()}`}
                        className="text-blue-600 text-sm font-medium"
                      >
                        Use Template
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">What You Get</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <FileText className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-600">{resumesCreated || 500}+</div>
              <div className="text-gray-600">Resumes Created</div>
            </div>

            {/* Request Review */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold mb-3">Get Expert Review</h3>
              <p className="text-sm text-gray-600 mb-4">
                Have a career advisor review your resume and provide personalized feedback.
              </p>
              {user ? (
                <Link
                  href="/career-services/resume-building/review"
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
                >
                  Request Review
                </Link>
              ) : (
                <Link
                  href="/login?redirect=/career-services/resume-building"
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Upload Existing */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold mb-3">Have a Resume?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload your existing resume for review and optimization.
              </p>
              <Link
                href="/career-services/resume-building/upload"
                className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-300 text-gray-600 py-3 rounded-lg hover:border-blue-400 hover:text-blue-600"
              >
                <Upload className="w-5 h-5" /> Upload Resume
              </Link>
            </div>

            {/* Related Services */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Related Services</h3>
              <div className="space-y-2 text-sm">
                <Link href="/career-services/interview-prep" className="block text-blue-600 hover:underline">
                  Interview Preparation
                </Link>
                <Link href="/career-services/job-placement" className="block text-blue-600 hover:underline">
                  Job Placement
                </Link>
                <Link href="/career-services/career-counseling" className="block text-blue-600 hover:underline">
                  Career Counseling
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
