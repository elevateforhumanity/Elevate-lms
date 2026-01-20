import { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, BookOpen, BarChart3, Award, Calendar, FileText, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Portal | Elevate For Humanity',
  description: 'Access your courses, track progress, view grades, and manage your learning journey.',
};

export default function StudentPortalLanding() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-10 h-10" />
            <span className="text-blue-200 font-medium">Student Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Learning Journey Starts Here</h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-8">
            Access your courses, track your progress, earn certificates, and connect with instructors.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/login?redirect=/student-portal/dashboard" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50">
              Sign In
            </Link>
            <Link href="/apply" className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Portal Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">My Courses</h3>
              <p className="text-slate-600">Access all your enrolled courses and learning materials.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Progress Tracking</h3>
              <p className="text-slate-600">Monitor your learning progress with detailed analytics.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Certificates</h3>
              <p className="text-slate-600">Earn and download certificates upon completion.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Schedule</h3>
              <p className="text-slate-600">View your class schedule and important dates.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Assignments</h3>
              <p className="text-slate-600">Submit assignments and track your grades.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Messages</h3>
              <p className="text-slate-600">Communicate with instructors and peers.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Start?</h2>
          <p className="text-lg text-slate-600 mb-8">Already enrolled? Sign in. New here? Apply today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login?redirect=/student-portal/dashboard" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Sign In</Link>
            <Link href="/apply" className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-lg hover:bg-slate-200">Apply Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
