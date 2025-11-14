'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LMSNav from '@/components/lms/LMSNav';
import { 
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Upload,
  Loader2
} from 'lucide-react';

type Assignment = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  points_possible: number;
  submission_type: string;
  courses: {
    id: string;
    title: string;
  };
  assignment_submissions: Array<{
    id: string;
    status: string;
    score: number | null;
    submitted_at: string;
  }>;
};

// Mock assignments data (fallback)
const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Module 3 Quiz',
    description: 'Complete the Module 3 assessment covering infection control procedures',
    due_date: '2024-11-15',
    points_possible: 100,
    submission_type: 'text',
    courses: { id: '1', title: 'CNA Certification Prep' },
    assignment_submissions: [],
  },
  {
    id: '2',
    title: 'Safety Procedures Report',
    description: 'Write a 2-page report on HVAC safety procedures and best practices',
    due_date: '2024-11-18',
    points_possible: 50,
    submission_type: 'text',
    courses: { id: '2', title: 'HVAC Technician Training' },
    assignment_submissions: [],
  },
  {
    id: '3',
    title: 'Practical Skills Video',
    description: 'Record and submit a video demonstrating 3 cutting techniques',
    due_date: '2024-11-20',
    points_possible: 150,
    submission_type: 'file',
    courses: { id: '3', title: 'Barber Fundamentals' },
    assignment_submissions: [],
  },
  {
    id: '4',
    title: 'Patient Care Assignment',
    description: 'Case study analysis on patient care scenarios',
    due_date: '2024-11-10',
    points_possible: 75,
    submission_type: 'text',
    courses: { id: '1', title: 'CNA Certification Prep' },
    assignment_submissions: [{ id: '4', status: 'submitted', score: 88, submitted_at: '2024-11-09' }],
  },
  {
    id: '5',
    title: 'Module 2 Quiz',
    description: 'Assessment on vital signs and measurements',
    due_date: '2024-11-05',
    points_possible: 100,
    submission_type: 'text',
    courses: { id: '1', title: 'CNA Certification Prep' },
    assignment_submissions: [{ id: '5', status: 'graded', score: 90, submitted_at: '2024-11-04' }],
  },
  {
    id: '6',
    title: 'Safety Quiz',
    description: 'HVAC safety assessment',
    due_date: '2024-11-08',
    points_possible: 100,
    submission_type: 'text',
    courses: { id: '2', title: 'HVAC Technician Training' },
    assignment_submissions: [{ id: '6', status: 'graded', score: 95, submitted_at: '2024-11-07' }],
  },
];

const getStatusBadge = (status: string, dueDate: string) => {
  const isOverdue = new Date(dueDate) < new Date() && status === 'pending';
  
  if (isOverdue) {
    return <Badge variant="destructive">Overdue</Badge>;
  }
  
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
    case 'submitted':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Submitted</Badge>;
    case 'graded':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Graded</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'quiz':
      return <CheckCircle className="h-5 w-5" />;
    case 'project':
      return <Upload className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getDaysUntil = (dateStr: string) => {
  const dueDate = new Date(dateStr);
  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  return `Due in ${diffDays} days`;
};

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await fetch('/api/assignments');
      const data = await res.json();
      setAssignments(data.assignments || mockAssignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setAssignments(mockAssignments);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <LMSNav />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        </div>
      </div>
    );
  }

  const pendingAssignments = assignments.filter(a => {
    const submission = a.assignment_submissions?.[0];
    return !submission || submission.status === 'draft';
  });
  
  const submittedAssignments = assignments.filter(a => {
    const submission = a.assignment_submissions?.[0];
    return submission?.status === 'submitted';
  });
  
  const gradedAssignments = assignments.filter(a => {
    const submission = a.assignment_submissions?.[0];
    return submission?.status === 'graded';
  });

  return (
    <div className="min-h-screen bg-background">
      <LMSNav />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Assignments</h1>
          <p className="text-muted-foreground">
            View and submit your course assignments and assessments
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingAssignments.length}</div>
              <p className="text-xs text-muted-foreground">
                Assignments to complete
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submitted</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submittedAssignments.length}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting grading
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Graded</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{gradedAssignments.length}</div>
              <p className="text-xs text-muted-foreground">
                Completed assignments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({pendingAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="submitted">
              Submitted ({submittedAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="graded">
              Graded ({gradedAssignments.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Tab */}
          <TabsContent value="pending" className="space-y-4">
            {pendingAssignments.length > 0 ? (
              pendingAssignments.map((assignment) => {
                const submission = assignment.assignment_submissions?.[0];
                const status = submission?.status || 'pending';
                const isOverdue = new Date(assignment.due_date) < new Date();
                return (
                  <Card key={assignment.id} className={isOverdue ? 'border-l-4 border-l-red-500' : ''}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="p-2 bg-secondary rounded-lg">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-lg">{assignment.title}</CardTitle>
                              {getStatusBadge(status, assignment.due_date)}
                            </div>
                            <CardDescription>{assignment.courses?.title}</CardDescription>
                            <p className="text-sm mt-2">{assignment.description}</p>
                            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(assignment.due_date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                              <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                                {getDaysUntil(assignment.due_date)}
                              </span>
                              <span>{assignment.points_possible} points</span>
                            </div>
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={`/lms/assignments/${assignment.id}`}>
                            {isOverdue ? 'Submit Now' : 'Start Assignment'}
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">
                    You don't have any pending assignments
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Submitted Tab */}
          <TabsContent value="submitted" className="space-y-4">
            {submittedAssignments.length > 0 ? (
              submittedAssignments.map((assignment) => {
                const submission = assignment.assignment_submissions?.[0];
                return (
                <Card key={assignment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg">{assignment.title}</CardTitle>
                            {getStatusBadge(submission?.status || 'submitted', assignment.due_date)}
                          </div>
                          <CardDescription>{assignment.courses?.title}</CardDescription>
                          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                            <span>Submitted: {submission?.submitted_at ? new Date(submission.submitted_at).toLocaleDateString() : 'N/A'}</span>
                            <span>{assignment.points_possible} points</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href={`/lms/assignments/${assignment.id}`}>
                          View Submission
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              )})
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No submitted assignments</h3>
                  <p className="text-muted-foreground">
                    Assignments you submit will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Graded Tab */}
          <TabsContent value="graded" className="space-y-4">
            {gradedAssignments.length > 0 ? (
              gradedAssignments.map((assignment) => {
                const submission = assignment.assignment_submissions?.[0];
                const score = submission?.score || 0;
                const percentage = assignment.points_possible > 0 ? Math.round((score / assignment.points_possible) * 100) : 0;
                return (
                <Card key={assignment.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg">{assignment.title}</CardTitle>
                            {getStatusBadge(submission?.status || 'graded', assignment.due_date)}
                          </div>
                          <CardDescription>{assignment.courses?.title}</CardDescription>
                          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                            <span>Submitted: {submission?.submitted_at ? new Date(submission.submitted_at).toLocaleDateString() : 'N/A'}</span>
                            <span className="font-semibold text-foreground">
                              Grade: {score}/{assignment.points_possible} ({percentage}%)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {score}
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/lms/assignments/${assignment.id}`}>
                            View Feedback
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )})
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No graded assignments yet</h3>
                  <p className="text-muted-foreground">
                    Completed assignments will appear here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
