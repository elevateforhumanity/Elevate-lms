import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, CheckCircle, Video, Users, FileText, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interview Preparation | Career Services | Elevate for Humanity',
  description:
    'Professional interview coaching and preparation services. Mock interviews, feedback, industry-specific strategies, and salary negotiation techniques to help you land your dream job.',
  keywords: ['interview preparation', 'interview coaching', 'mock interviews', 'job interview tips', 'salary negotiation', 'career coaching', 'interview skills'],
  alternates: {
    canonical: 'https://elevateforhumanity.institute/career-services/interview-prep',
  },
};

export default function InterviewPrepPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-brand-blue-600 to-brand-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-black mb-6">Interview Preparation</h1>
          <p className="text-xl text-white/90 max-w-3xl mb-8">
            Professional coaching to help you ace your interviews and land the
            job. One-on-one sessions, mock interviews, and personalized feedback.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-brand-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
            >
              Schedule Session
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition border border-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-brand-blue-600 mb-2">1-on-1</div>
            <div className="text-gray-600">Personalized Coaching</div>
          </div>
          <div>
            <div className="text-4xl font-black text-brand-blue-600 mb-2">Mock</div>
            <div className="text-gray-600">Practice Interviews</div>
          </div>
          <div>
            <div className="text-4xl font-black text-brand-blue-600 mb-2">Video</div>
            <div className="text-gray-600">Review & Feedback</div>
          </div>
          <div>
            <div className="text-4xl font-black text-brand-blue-600 mb-2">Free</div>
            <div className="text-gray-600">For All Students</div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-black text-black mb-4 text-center">
          Master Every Interview
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Our interview preparation program gives you the skills, confidence, and strategies 
          to excel in any interview situation.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-brand-blue-600 transition">
            <div className="w-12 h-12 bg-brand-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-brand-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Mock Interviews</h3>
            <p className="text-gray-600 mb-4">
              Practice with realistic interview scenarios tailored to your target industry and role.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Video recorded sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Industry-specific questions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Behavioral and technical prep</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-brand-blue-600 transition">
            <div className="w-12 h-12 bg-brand-purple-100 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-brand-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Detailed Feedback</h3>
            <p className="text-gray-600 mb-4">
              Receive comprehensive feedback on your performance with actionable improvement strategies.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Answer quality assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Body language analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Communication tips</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-brand-blue-600 transition">
            <div className="w-12 h-12 bg-brand-green-100 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-brand-green-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">Strategy Sessions</h3>
            <p className="text-gray-600 mb-4">
              Learn proven strategies for answering tough questions and negotiating offers.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>STAR method training</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Salary negotiation tactics</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Follow-up best practices</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">
                What We Cover
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-black mb-1">Common Interview Questions</div>
                    <div className="text-sm text-gray-600">Master responses to "Tell me about yourself," "Why should we hire you," and more</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-black mb-1">Behavioral Questions</div>
                    <div className="text-sm text-gray-600">Use the STAR method to showcase your experience and achievements</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-black mb-1">Technical Interviews</div>
                    <div className="text-sm text-gray-600">Industry-specific technical questions and problem-solving approaches</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-black mb-1">Body Language & Presence</div>
                    <div className="text-sm text-gray-600">Project confidence through posture, eye contact, and professional demeanor</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-black mb-1">Salary Negotiation</div>
                    <div className="text-sm text-gray-600">Research market rates, know your worth, and negotiate effectively</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-brand-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-black mb-1">Virtual Interviews</div>
                    <div className="text-sm text-gray-600">Master video interview platforms, lighting, and remote communication</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-4">
                Schedule Your Session
              </h3>
              <p className="text-gray-600 mb-6">
                One-on-one interview coaching sessions available for all students
                and alumni. Sessions are 60 minutes and can be scheduled in-person or virtually.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-brand-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-black">Expert Coaches</div>
                    <div className="text-sm text-gray-600">Industry professionals with hiring experience</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-blue-100 rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-brand-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-black">Flexible Format</div>
                    <div className="text-sm text-gray-600">In-person or virtual sessions available</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-brand-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-black">Always Free</div>
                    <div className="text-sm text-gray-600">No cost for students and alumni</div>
                  </div>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue-700 transition w-full"
              >
                Book Your Session
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black text-black mb-4 text-center">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our structured approach ensures you're fully prepared for every interview opportunity.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Schedule</h3>
              <p className="text-gray-600">
                Book a session through our career services portal or contact us directly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Prepare</h3>
              <p className="text-gray-600">
                Share your target role and company. We'll customize the session to your needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Practice</h3>
              <p className="text-gray-600">
                Participate in mock interviews with video recording and real-time feedback.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Improve</h3>
              <p className="text-gray-600">
                Review feedback, refine your approach, and schedule follow-up sessions as needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-black text-black mb-12 text-center">
          Interview Types We Cover
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">Phone & Video Interviews</h3>
            <p className="text-gray-600 mb-4">
              Master remote interview formats with proper setup, communication techniques, and technical troubleshooting.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Camera positioning and lighting</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Background and environment setup</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Platform familiarity (Zoom, Teams, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Managing technical issues gracefully</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">In-Person Interviews</h3>
            <p className="text-gray-600 mb-4">
              Prepare for face-to-face interviews with professional presence, body language, and interpersonal skills.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Professional attire and grooming</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Handshakes and first impressions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Eye contact and body language</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Building rapport with interviewers</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">Panel Interviews</h3>
            <p className="text-gray-600 mb-4">
              Navigate multi-interviewer scenarios with strategies for engaging everyone and managing group dynamics.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Addressing all panel members</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Managing multiple question styles</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Reading group dynamics</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Following up with multiple interviewers</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-4">Technical Interviews</h3>
            <p className="text-gray-600 mb-4">
              Prepare for skills assessments, coding challenges, and industry-specific technical evaluations.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Problem-solving approaches</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Explaining your thought process</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Handling questions you don't know</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Demonstrating practical skills</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-brand-blue-600 to-brand-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-6">
            Common Interview Questions We Practice
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h3 className="font-bold mb-3">About You</h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li>• Tell me about yourself</li>
                <li>• What are your strengths and weaknesses?</li>
                <li>• Where do you see yourself in 5 years?</li>
                <li>• Why are you leaving your current job?</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h3 className="font-bold mb-3">About the Role</h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li>• Why do you want this job?</li>
                <li>• What makes you qualified for this position?</li>
                <li>• What interests you about our company?</li>
                <li>• What can you bring to our team?</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h3 className="font-bold mb-3">Behavioral</h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li>• Tell me about a time you faced a challenge</li>
                <li>• Describe a conflict with a coworker</li>
                <li>• Give an example of leadership</li>
                <li>• How do you handle stress and pressure?</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <h3 className="font-bold mb-3">Situational</h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li>• How would you handle [specific scenario]?</li>
                <li>• What would you do if you disagreed with your manager?</li>
                <li>• How do you prioritize competing deadlines?</li>
                <li>• What would you do in your first 90 days?</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-black text-black mb-12 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-black mb-3">How long are interview prep sessions?</h3>
            <p className="text-gray-600">
              Standard sessions are 60 minutes. This includes a brief consultation, mock interview practice, 
              and detailed feedback. Extended 90-minute sessions are available for technical interview preparation.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-black mb-3">Can I schedule multiple sessions?</h3>
            <p className="text-gray-600">
              Absolutely! We encourage multiple sessions, especially if you're preparing for different types of 
              interviews or want to practice with different coaches. There's no limit to the number of sessions you can book.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-black mb-3">Do you provide industry-specific preparation?</h3>
            <p className="text-gray-600">
              Yes! Our coaches have experience across multiple industries including technology, healthcare, 
              business services, and trades. We tailor mock interviews to match your target industry and role.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-black mb-3">Will my mock interview be recorded?</h3>
            <p className="text-gray-600">
              Yes, with your permission. Video recordings allow you to review your performance and track improvement 
              over time. Recordings are confidential and only shared with you and your coach.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-black mb-3">Can you help with salary negotiation?</h3>
            <p className="text-gray-600">
              Yes! We provide guidance on researching market rates, determining your worth, timing your negotiation, 
              and communicating your value. We can role-play negotiation scenarios to build your confidence.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-black mb-3">Is this service available to alumni?</h3>
            <p className="text-gray-600">
              Yes! Interview preparation is available to all current students and alumni at no cost. 
              We're committed to supporting your career success long after graduation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">
            More Career Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/career-services/resume-building"
              className="bg-white rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-black mb-2">
                Resume Building
              </h3>
              <p className="text-black">
                Professional resume writing and review
              </p>
            </Link>
            <Link
              href="/career-services/job-placement"
              className="bg-white rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-black mb-2">
                Job Placement
              </h3>
              <p className="text-black">
                Direct connections to hiring employers
              </p>
            </Link>
            <Link
              href="/career-services/career-counseling"
              className="bg-white rounded-xl p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-black mb-2">
                Career Counseling
              </h3>
              <p className="text-black">
                Long-term career planning and guidance
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
