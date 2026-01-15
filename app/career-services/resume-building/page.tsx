import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Home,
  Calendar,
  FileText,
  CheckCircle,
  Users,
  Briefcase,
  Award,
  Clock,
  Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resume Building Services | Elevate For Humanity',
  description:
    'Free professional resume writing and review services in Indianapolis. Get expert help creating a resume that showcases your skills and gets you hired.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/career-services/resume-building',
  },
};

export default function ResumeBuildingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/career-services"
              className="text-orange-600 hover:text-orange-700"
            >
              Career Services
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Resume Building</span>
          </div>
        </div>
      </nav>

      {/* Hero - No Gradient */}
      <section className="relative bg-slate-900 py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-career-services.jpg"
            alt="Professional resume building services"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-600 p-3 rounded-xl">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <span className="text-orange-400 font-semibold text-lg">100% Free Service</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Professional Resume Building
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Our career specialists help you create a resume that gets noticed by employers. 
              Whether you&apos;re starting fresh or updating an existing resume, we&apos;re here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-700 transition-colors"
              >
                <Calendar className="h-5 w-5" />
                Schedule Free Session
              </Link>
              <a
                href="tel:317-314-3757"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Call 317-314-3757
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold">500+</div>
              <div className="text-orange-200">Resumes Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold">85%</div>
              <div className="text-orange-200">Interview Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold">100%</div>
              <div className="text-orange-200">Free Service</div>
            </div>
            <div>
              <div className="text-4xl font-bold">24hr</div>
              <div className="text-orange-200">Turnaround</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Resume Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support to help you present your best professional self
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <FileText className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Resume Writing
              </h3>
              <p className="text-gray-600 mb-6">
                Work one-on-one with our career specialists to create a professional 
                resume from scratch, tailored to your target industry.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Professional formatting and layout</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Industry-specific keywords for ATS systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Achievement-focused bullet points</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Multiple format delivery (PDF, Word, plain text)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Resume Review & Optimization
              </h3>
              <p className="text-gray-600 mb-6">
                Already have a resume? Get expert feedback with actionable suggestions 
                to improve your chances of landing interviews.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Content and structure analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Grammar and formatting corrections</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Keyword optimization for job postings</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Personalized improvement recommendations</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Cover Letter Writing
              </h3>
              <p className="text-gray-600 mb-6">
                Compelling cover letters customized for specific job applications 
                that complement your resume and highlight your fit.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Tailored to each position you apply for</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Highlights relevant skills and experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Professional tone that matches company culture</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Strong opening and call-to-action</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                LinkedIn Profile Optimization
              </h3>
              <p className="text-gray-600 mb-6">
                Optimize your LinkedIn presence to attract recruiters and expand 
                your professional network.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Compelling headline and summary</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Experience section optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Skills and endorsements strategy</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Profile visibility and searchability tips</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Four simple steps to your professional resume
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Schedule Your Session</h3>
                </div>
                <p className="text-gray-600 ml-14">
                  Book a free 30-minute consultation online or call us at 317-314-3757. 
                  Choose a time that works for your schedule.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Share Your Background</h3>
                </div>
                <p className="text-gray-600 ml-14">
                  Tell us about your work history, education, skills, and career goals. 
                  Bring any existing resume or job descriptions you&apos;re targeting.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Collaborate on Your Resume</h3>
                </div>
                <p className="text-gray-600 ml-14">
                  Work with our specialist to craft compelling content. We&apos;ll help you 
                  highlight achievements and use the right keywords.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Receive Your Resume</h3>
                </div>
                <p className="text-gray-600 ml-14">
                  Get your polished resume within 24 hours in PDF, Word, and plain text 
                  formats—ready to submit to employers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Tips */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Resume Best Practices
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Whether you work with us or create your own resume, keep these 
                proven tips in mind to maximize your chances of success.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Keep It Concise</h4>
                    <p className="text-gray-600">1-2 pages max. Focus on the last 10-15 years of relevant experience.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                    <Award className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Quantify Achievements</h4>
                    <p className="text-gray-600">Use numbers and metrics: &quot;Increased sales by 25%&quot; beats &quot;Improved sales.&quot;</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                    <Briefcase className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Use Action Verbs</h4>
                    <p className="text-gray-600">Start bullets with &quot;managed,&quot; &quot;developed,&quot; &quot;increased,&quot; or &quot;implemented.&quot;</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Tailor Each Application</h4>
                    <p className="text-gray-600">Customize your resume for each job by matching keywords from the posting.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/hero/hero-hands-on-training.jpg"
                alt="Career specialist helping with resume"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA - No Gradient */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Professional Resume?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule your free session today. Our career specialists are ready to help 
            you create a resume that opens doors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-700 transition-colors"
            >
              <Calendar className="h-5 w-5" />
              Schedule Free Session
            </Link>
            <Link
              href="/career-services"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              All Career Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
