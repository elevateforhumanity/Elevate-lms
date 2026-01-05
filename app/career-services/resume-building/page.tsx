import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Home,
  FileText,
  CheckCircle,
  Download,
  Calendar,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resume Building Services | Elevate For Humanity',
  description:
    'Professional resume writing and review services. Get expert help creating a resume that showcases your skills and gets you hired.',
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
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/career-services"
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Career Services
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-black font-semibold">Resume Building</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="h-20 w-20 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              Resume Building Services
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-8">
              Professional resume writing and review to help you stand out and
              get hired
            </p>
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              <Calendar className="h-5 w-5" />
              Schedule Resume Review
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-12 text-center">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border-2 border-blue-600 rounded-xl p-8">
              <CheckCircle className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Resume Writing
              </h3>
              <p className="text-black mb-4">
                Work one-on-one with our career specialists to create a
                professional resume from scratch.
              </p>
              <ul className="space-y-2 text-black">
                <li>• Professional formatting and layout</li>
                <li>• Industry-specific keywords</li>
                <li>• Achievement-focused content</li>
                <li>• ATS-optimized structure</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-green-600 rounded-xl p-8">
              <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Resume Review
              </h3>
              <p className="text-black mb-4">
                Get expert feedback on your existing resume with actionable
                suggestions for improvement.
              </p>
              <ul className="space-y-2 text-black">
                <li>• Content and structure review</li>
                <li>• Grammar and formatting check</li>
                <li>• Keyword optimization</li>
                <li>• Industry best practices</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-purple-600 rounded-xl p-8">
              <CheckCircle className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                Cover Letters
              </h3>
              <p className="text-black mb-4">
                Create compelling cover letters tailored to specific job
                applications.
              </p>
              <ul className="space-y-2 text-black">
                <li>• Customized for each position</li>
                <li>• Highlight relevant experience</li>
                <li>• Professional tone and style</li>
                <li>• Employer-focused messaging</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-orange-600 rounded-xl p-8">
              <CheckCircle className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold text-black mb-3">
                LinkedIn Profiles
              </h3>
              <p className="text-black mb-4">
                Optimize your LinkedIn profile to attract recruiters and
                showcase your professional brand.
              </p>
              <ul className="space-y-2 text-black">
                <li>• Professional headline and summary</li>
                <li>• Experience optimization</li>
                <li>• Skills and endorsements</li>
                <li>• Recruiter-friendly formatting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Tips */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-12 text-center">
            Resume Best Practices
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-black mb-2">
                Keep It Concise
              </h3>
              <p className="text-black">
                Aim for 1-2 pages maximum. Focus on relevant experience and
                achievements from the last 10-15 years.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-black mb-2">
                Use Action Verbs
              </h3>
              <p className="text-black">
                Start bullet points with strong action verbs like "managed,"
                "developed," "increased," or "implemented."
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-black mb-2">
                Quantify Achievements
              </h3>
              <p className="text-black">
                Include numbers, percentages, and metrics to demonstrate your
                impact (e.g., "Increased sales by 25%").
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-orange-600">
              <h3 className="text-xl font-bold text-black mb-2">
                Tailor to Each Job
              </h3>
              <p className="text-black">
                Customize your resume for each application by highlighting
                relevant skills and experience.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border-l-4 border-teal-600">
              <h3 className="text-xl font-bold text-black mb-2">
                Proofread Carefully
              </h3>
              <p className="text-black">
                Eliminate typos and grammatical errors. Have someone else review
                your resume before submitting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-black mb-12 text-center">
            How It Works
          </h2>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Schedule Appointment
                </h3>
                <p className="text-black">
                  Book a free consultation with one of our career specialists.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Share Your Information
                </h3>
                <p className="text-black">
                  Provide your work history, education, skills, and career
                  goals.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Collaborate on Draft
                </h3>
                <p className="text-black">
                  Work together to create or refine your resume with expert
                  guidance.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Receive Final Resume
                </h3>
                <p className="text-black">
                  Get your polished, professional resume in multiple formats
                  (PDF, Word).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl text-white mb-8">
            Schedule a free consultation with our career specialists today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              <Calendar className="h-5 w-5" />
              Schedule Appointment
            </Link>
            <Link
              href="/career-services"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Career Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
