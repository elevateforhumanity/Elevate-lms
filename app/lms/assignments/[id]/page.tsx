'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import LMSNav from '@/components/lms/LMSNav';
import { 
  FileText,
  Clock,
  CheckCircle,
  Upload,
  Calendar,
  AlertCircle,
  Download,
  Send
} from 'lucide-react';

// Mock assignment data
const assignmentData: Record<string, any> = {
  '1': {
    id: 1,
    title: 'Module 3 Quiz',
    course: 'CNA Certification Prep',
    courseId: 2,
    dueDate: '2024-11-15',
    type: 'quiz',
    points: 100,
    description: 'Complete the Module 3 assessment covering infection control procedures',
    instructions: `
      <h3>Instructions:</h3>
      <ul>
        <li>This quiz consists of 20 multiple-choice questions</li>
        <li>You have 30 minutes to complete the quiz</li>
        <li>You must score at least 70% to pass</li>
        <li>You have 3 attempts available</li>
        <li>Your highest score will be recorded</li>
      </ul>
    `,
    status: 'pending',
    attemptsAllowed: 3,
    attemptsUsed: 0,
  },
  '2': {
    id: 2,
    title: 'Safety Procedures Report',
    course: 'HVAC Technician Training',
    courseId: 3,
    dueDate: '2024-11-18',
    type: 'assignment',
    points: 50,
    description: 'Write a 2-page report on HVAC safety procedures and best practices',
    instructions: `
      <h3>Assignment Requirements:</h3>
      <ul>
        <li>Minimum 2 pages, maximum 4 pages</li>
        <li>Include at least 3 references</li>
        <li>Cover personal protective equipment (PPE)</li>
        <li>Discuss electrical safety</li>
        <li>Address refrigerant handling</li>
        <li>Submit as PDF or Word document</li>
      </ul>
      <h3>Grading Rubric:</h3>
      <ul>
        <li>Content accuracy: 20 points</li>
        <li>Organization: 10 points</li>
        <li>References: 10 points</li>
        <li>Writing quality: 10 points</li>
      </ul>
    `,
    status: 'pending',
    submissionType: 'file',
  },
  '4': {
    id: 4,
    title: 'Patient Care Assignment',
    course: 'CNA Certification Prep',
    courseId: 2,
    dueDate: '2024-11-10',
    type: 'assignment',
    points: 75,
    description: 'Case study analysis on patient care scenarios',
    instructions: `
      <h3>Case Study:</h3>
      <p>Review the provided patient care scenarios and answer the following questions...</p>
    `,
    status: 'submitted',
    submissionType: 'text',
    submittedDate: '2024-11-09',
    submittedContent: 'My analysis of the patient care scenarios...',
  },
  '5': {
    id: 5,
    title: 'Module 2 Quiz',
    course: 'CNA Certification Prep',
    courseId: 2,
    dueDate: '2024-11-05',
    type: 'quiz',
    points: 100,
    description: 'Assessment on vital signs and measurements',
    status: 'graded',
    submittedDate: '2024-11-04',
    grade: 90,
    feedback: 'Excellent work! You demonstrated a strong understanding of vital signs measurement techniques. Minor improvement needed on blood pressure reading interpretation.',
  },
};

export default function AssignmentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const assignment = assignmentData[params.id];
  
  const [submissionText, setSubmissionText] = useState('');
  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!assignment) {
    return (
      <div className="min-h-screen bg-background">
        <LMSNav />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Assignment Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The assignment you're looking for doesn't exist.
              </p>
              <Button asChild>
                <Link href="/lms/assignments">Back to Assignments</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const isOverdue = new Date(assignment.dueDate) < new Date() && assignment.status === 'pending';
  const daysUntil = Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSubmissionFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert('Assignment submitted successfully!');
    router.push('/lms/assignments');
  };

  const handleStartQuiz = () => {
    router.push(`/lms/quiz/${assignment.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <LMSNav />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="outline" asChild className="mb-4">
            <Link href="/lms/assignments">← Back to Assignments</Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assignment Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-2xl">{assignment.title}</CardTitle>
                      {assignment.status === 'pending' && (
                        <Badge variant={isOverdue ? 'destructive' : 'outline'} className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          {isOverdue ? 'Overdue' : 'Pending'}
                        </Badge>
                      )}
                      {assignment.status === 'submitted' && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Submitted
                        </Badge>
                      )}
                      {assignment.status === 'graded' && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Graded
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      <Link href={`/lms/courses/${assignment.courseId}`} className="hover:underline">
                        {assignment.course}
                      </Link>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{assignment.description}</p>
                </div>

                {assignment.instructions && (
                  <div>
                    <h3 className="font-semibold mb-2">Instructions</h3>
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: assignment.instructions }}
                    />
                  </div>
                )}

                {/* Graded View */}
                {assignment.status === 'graded' && (
                  <div className="space-y-4">
                    <div className="p-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">Your Grade</h3>
                        <div className="text-3xl font-bold text-green-600">
                          {assignment.grade}/{assignment.points}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Score: {Math.round((assignment.grade / assignment.points) * 100)}%
                      </div>
                    </div>

                    {assignment.feedback && (
                      <div>
                        <h3 className="font-semibold mb-2">Instructor Feedback</h3>
                        <div className="p-4 bg-secondary rounded-lg">
                          <p className="text-sm">{assignment.feedback}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold mb-2">Your Submission</h3>
                      <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-sm">{assignment.submittedContent || 'File submission'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submitted View */}
                {assignment.status === 'submitted' && (
                  <div className="space-y-4">
                    <div className="p-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                        <h3 className="font-semibold text-lg">Submission Received</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Submitted on {new Date(assignment.submittedDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Your instructor will review and grade your submission soon.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Your Submission</h3>
                      <div className="p-4 bg-secondary rounded-lg">
                        <p className="text-sm">{assignment.submittedContent || 'File submission'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pending - Submission Form */}
                {assignment.status === 'pending' && (
                  <div className="space-y-6">
                    {assignment.type === 'quiz' ? (
                      <div className="p-6 bg-secondary rounded-lg text-center">
                        <h3 className="font-semibold text-lg mb-2">Ready to Start?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          You have {assignment.attemptsAllowed - assignment.attemptsUsed} attempt(s) remaining
                        </p>
                        <Button onClick={handleStartQuiz} size="lg">
                          Start Quiz
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="font-semibold">Submit Your Work</h3>
                        
                        {assignment.submissionType === 'text' ? (
                          <div className="space-y-2">
                            <Label htmlFor="submission">Your Answer</Label>
                            <Textarea
                              id="submission"
                              rows={10}
                              value={submissionText}
                              onChange={(e) => setSubmissionText(e.target.value)}
                              placeholder="Type your answer here..."
                            />
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Label htmlFor="file">Upload File</Label>
                            <div className="border-2 border-dashed rounded-lg p-8 text-center">
                              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                              <Input
                                id="file"
                                type="file"
                                onChange={handleFileChange}
                                className="max-w-xs mx-auto"
                                accept=".pdf,.doc,.docx"
                              />
                              {submissionFile && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  Selected: {submissionFile.name}
                                </p>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Accepted formats: PDF, DOC, DOCX (Max 10MB)
                            </p>
                          </div>
                        )}

                        <Button 
                          onClick={handleSubmit} 
                          disabled={isSubmitting || (!submissionText && !submissionFile)}
                          className="w-full"
                          size="lg"
                        >
                          {isSubmitting ? (
                            'Submitting...'
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Submit Assignment
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assignment Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    {assignment.status === 'pending' && (
                      <p className={`text-xs mt-1 ${isOverdue ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>
                        {isOverdue ? `${Math.abs(daysUntil)} days overdue` : daysUntil === 0 ? 'Due today' : `Due in ${daysUntil} days`}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Points</p>
                    <p className="text-sm text-muted-foreground">{assignment.points} points</p>
                  </div>
                </div>

                {assignment.type === 'quiz' && assignment.attemptsAllowed && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Attempts</p>
                      <p className="text-sm text-muted-foreground">
                        {assignment.attemptsUsed}/{assignment.attemptsAllowed} used
                      </p>
                    </div>
                  </div>
                )}

                {assignment.status === 'submitted' && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Submitted</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(assignment.submittedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Course Link */}
            <Card>
              <CardContent className="pt-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/lms/courses/${assignment.courseId}`}>
                    View Course
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
