import { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, BookOpen, Users, BarChart3, FileText, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instructor Portal | Elevate For Humanity',
  description: 'Manage courses, track student progress, and access teaching tools.',
};

export default function InstructorPortalLanding() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-10 h-10" />
            <span className="text-indigo-200 font-medium">Instructor Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Instructor Portal</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mb-8">
            Manage your courses, track student progress, grade assignments, and communicate with learners.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/login?redirect=/instructor/dashboard" className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50">
              Sign In
            </Link>
            <Link href="/apply?role=instructor" className="px-8 py-4 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-400">
              Become an Instructor
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Portal Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Course Management</h3>
              <p className="text-slate-600">Create and manage your course content and materials.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Student Roster</h3>
              <p className="text-slate-600">View enrolled students and their information.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Progress Tracking</h3>
              <p className="text-slate-600">Monitor student progress and completion rates.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Grading</h3>
              <p className="text-slate-600">Grade assignments and provide feedback.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Communication</h3>
              <p className="text-slate-600">Message students and make announcements.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Certifications</h3>
              <p className="text-slate-600">Issue certificates to completing students.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Start Teaching</h2>
          <p className="text-lg text-slate-600 mb-8">Already an instructor? Sign in. Want to teach? Apply today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login?redirect=/instructor/dashboard" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Sign In</Link>
            <Link href="/apply?role=instructor" className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-lg hover:bg-slate-200">Become an Instructor</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
