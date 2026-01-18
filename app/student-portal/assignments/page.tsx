import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ChevronRight,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  Calendar,
  Filter,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Assignments | Student Portal',
  description: 'View and submit your assignments.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface Assignment {
  id: string;
  title: string;
  course: string;
  due_date: string;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  grade?: number;
  max_grade: number;
  description: string;
}

export default async function AssignmentsPage() {
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
  if (!user) redirect('/login?next=/student-portal/assignments');

  // Sample assignments
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Week 4 Practical Assessment',
      course: 'Barbering Fundamentals',
      due_date: '2026-01-25T23:59:00Z',
      status: 'pending',
      max_grade: 100,
      description: 'Complete the practical cutting assessment with a live model.',
    },
    {
      id: '2',
      title: 'Business Plan Draft',
      course: 'Business Management',
      due_date: '2026-01-22T23:59:00Z',
      status: 'pending',
      max_grade: 100,
      description: 'Submit the first draft of your barbershop business plan.',
    },
    {
      id: '3',
      title: 'Week 3 Quiz',
      course: 'Barbering Fundamentals',
      due_date: '2026-01-18T23:59:00Z',
      status: 'graded',
      grade: 92,
      max_grade: 100,
      description: 'Multiple choice quiz on hair cutting techniques.',
    },
    {
      id: '4',
      title: 'Safety Certification Test',
      course: 'Barbering Fundamentals',
      due_date: '2026-01-15T23:59:00Z',
      status: 'graded',
      grade: 100,
      max_grade: 100,
      description: 'Complete the safety and sanitation certification test.',
    },
    {
      id: '5',
      title: 'Client Consultation Practice',
      course: 'Barbering Fundamentals',
      due_date: '2026-01-10T23:59:00Z',
      status: 'late',
      max_grade: 100,
      description: 'Record a mock client consultation video.',
    },
  ];

  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;
  const gradedCount = assignments.filter(a => a.status === 'graded').length;

  const getStatusBadge = (status: string, dueDate: string) => {
    const isPastDue = new Date(dueDate) < new Date();
    
    if (status === 'graded') {
      return <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">Graded</span>;
    }
    if (status === 'submitted') {
      return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">Submitted</span>;
    }
    if (status === 'late') {
      return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">Late</span>;
    }
    if (isPastDue) {
      return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">Overdue</span>;
    }
    return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">Pending</span>;
  };

  const formatDueDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays <= 7) return `Due in ${diffDays} days`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/student-portal" className="hover:text-gray-700">Student Portal</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Assignments</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600 mt-1">View and submit your coursework</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{submittedCount}</p>
            <p className="text-sm text-gray-500">Submitted</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{gradedCount}</p>
            <p className="text-sm text-gray-500">Graded</p>
          </div>
        </div>

        {/* Assignments List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All Assignments</h2>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      assignment.status === 'graded' ? 'bg-green-100' :
                      assignment.status === 'late' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      <FileText className={`w-5 h-5 ${
                        assignment.status === 'graded' ? 'text-green-600' :
                        assignment.status === 'late' ? 'text-red-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{assignment.title}</h3>
                        {getStatusBadge(assignment.status, assignment.due_date)}
                      </div>
                      <p className="text-sm text-gray-500">{assignment.course}</p>
                      <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {assignment.status === 'graded' && assignment.grade !== undefined ? (
                      <div>
                        <p className="text-lg font-bold text-green-600">
                          {assignment.grade}/{assignment.max_grade}
                        </p>
                        <p className="text-xs text-gray-500">Grade</p>
                      </div>
                    ) : (
                      <div>
                        <p className={`text-sm font-medium ${
                          new Date(assignment.due_date) < new Date() ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {formatDueDate(assignment.due_date)}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 justify-end mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(assignment.due_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {assignment.status === 'pending' && (
                  <div className="mt-4 flex justify-end">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                      <Upload className="w-4 h-4" />
                      Submit Assignment
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
