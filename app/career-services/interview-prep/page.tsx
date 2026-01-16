import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Users, Video, MessageSquare, CheckCircle, Calendar, ArrowRight, Play, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interview Preparation | Career Services | Elevate For Humanity',
  description: 'Master your interview skills with mock interviews, coaching, and expert feedback. Prepare to ace your next job interview.',
};

export const dynamic = 'force-dynamic';

export default async function InterviewPrepPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get user's scheduled mock interviews
  let mockInterviews = null;
  if (user) {
    const { data } = await supabase
      .from('mock_interviews')
      .select('*')
      .eq('user_id', user.id)
      .order('scheduled_at', { ascending: true });
    mockInterviews = data;
  }

  // Get interview resources
  const { data: resources } = await supabase
    .from('resources')
    .select('*')
    .eq('category', 'interview-prep')
    .eq('is_public', true)
    .limit(6);

  // Get stats
  const { count: interviewsCompleted } = await supabase
    .from('mock_interviews')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');

  const services = [
    {
      icon: Video,
      title: 'Mock Interviews',
      description: 'Practice with realistic interview simulations. Get recorded for self-review.',
      features: ['30-minute sessions', 'Industry-specific questions', 'Video recording', 'Written feedback'],
    },
    {
      icon: Users,
      title: 'One-on-One Coaching',
      description: 'Work directly with a career coach to refine your interview technique.',
      features: ['Personalized feedback', 'Body language tips', 'Answer refinement', 'Confidence building'],
    },
    {
      icon: MessageSquare,
      title: 'Question Preparation',
      description: 'Learn to answer common and behavioral interview questions effectively.',
      features: ['STAR method training', 'Industry questions', 'Salary negotiation', 'Questions to ask'],
    },
  ];

  const tips = [
    'Research the company thoroughly before your interview',
    'Prepare specific examples using the STAR method',
    'Practice your answers out loud, not just in your head',
    'Dress professionally and arrive 10-15 minutes early',
    'Bring copies of your resume and a notepad',
    'Follow up with a thank-you email within 24 hours',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-[400px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 text-white">
          <Link href="/career-services" className="text-green-200 hover:text-white mb-4 inline-block">
            ← Career Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Interview Preparation</h1>
          <p className="text-xl text-green-100 max-w-2xl mb-8">
            Master your interview skills with mock interviews, personalized coaching, and expert feedback.
          </p>
          {user ? (
            <Link
              href="/career-services/interview-prep/schedule"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Schedule Mock Interview <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href="/login?redirect=/career-services/interview-prep"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Sign In to Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">{interviewsCompleted || 200}+</div>
              <div className="text-gray-600">Mock Interviews Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">90%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">Free</div>
              <div className="text-gray-600">For All Students</div>
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
              <h2 className="text-2xl font-bold mb-6">Our Services</h2>
              <div className="space-y-6">
                {services.map((service) => (
                  <div key={service.title} className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User's Scheduled Interviews */}
            {user && mockInterviews && mockInterviews.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Your Scheduled Interviews</h2>
                <div className="space-y-3">
                  {mockInterviews.map((interview: any) => (
                    <div key={interview.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium">{interview.type} Interview</p>
                          <p className="text-sm text-gray-500">
                            {new Date(interview.scheduled_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        interview.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                        interview.status === 'completed' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {interview.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interview Tips */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Interview Tips</h2>
              <div className="space-y-3">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-600">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Schedule CTA */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Ready to Practice?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Schedule a mock interview with one of our career coaches.
              </p>
              <Link
                href="/career-services/interview-prep/schedule"
                className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700"
              >
                Schedule Now
              </Link>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Resources</h3>
              {resources && resources.length > 0 ? (
                <div className="space-y-3">
                  {resources.map((resource: any) => (
                    <Link
                      key={resource.id}
                      href={resource.url || `/resources/${resource.id}`}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
                    >
                      {resource.type === 'video' ? (
                        <Play className="w-5 h-5 text-green-600" />
                      ) : (
                        <FileText className="w-5 h-5 text-green-600" />
                      )}
                      <span className="text-sm">{resource.title}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href="/resources/common-questions" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Common Interview Questions</span>
                  </Link>
                  <Link href="/resources/star-method" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-sm">STAR Method Guide</span>
                  </Link>
                  <Link href="/resources/dress-code" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Professional Dress Guide</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Related Services */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Related Services</h3>
              <div className="space-y-2 text-sm">
                <Link href="/career-services/resume-building" className="block text-green-600 hover:underline">
                  Resume Building
                </Link>
                <Link href="/career-services/job-placement" className="block text-green-600 hover:underline">
                  Job Placement
                </Link>
                <Link href="/career-services/career-counseling" className="block text-green-600 hover:underline">
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
