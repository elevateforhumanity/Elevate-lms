'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import LMSNav from '@/components/lms/LMSNav';
import { 
  TrendingUp,
  TrendingDown,
  Award,
  FileText,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

// Mock grades data
const gradesData = {
  overallGPA: 3.7,
  overallPercentage: 87,
  trend: 'up',
  courses: [
    {
      id: 1,
      name: 'Barber Fundamentals',
      status: 'completed',
      finalGrade: 92,
      letterGrade: 'A',
      credits: 4,
      assignments: [
        { name: 'Module 1 Quiz', score: 95, maxScore: 100, weight: 10, date: '2024-09-15' },
        { name: 'Practical Exam 1', score: 88, maxScore: 100, weight: 20, date: '2024-09-22' },
        { name: 'Module 2 Quiz', score: 92, maxScore: 100, weight: 10, date: '2024-10-01' },
        { name: 'Mid-term Exam', score: 90, maxScore: 100, weight: 25, date: '2024-10-15' },
        { name: 'Final Practical', score: 94, maxScore: 100, weight: 35, date: '2024-11-01' },
      ],
    },
    {
      id: 2,
      name: 'CNA Certification Prep',
      status: 'in-progress',
      currentGrade: 85,
      letterGrade: 'B',
      credits: 5,
      assignments: [
        { name: 'Module 1 Quiz', score: 90, maxScore: 100, weight: 10, date: '2024-10-20' },
        { name: 'Patient Care Assignment', score: 88, maxScore: 100, weight: 15, date: '2024-10-27' },
        { name: 'Module 2 Quiz', score: 82, maxScore: 100, weight: 10, date: '2024-11-05' },
        { name: 'Module 3 Quiz', score: null, maxScore: 100, weight: 10, date: '2024-11-15', status: 'pending' },
        { name: 'Final Exam', score: null, maxScore: 100, weight: 40, date: '2024-12-01', status: 'upcoming' },
      ],
    },
    {
      id: 3,
      name: 'HVAC Technician Training',
      status: 'in-progress',
      currentGrade: 88,
      letterGrade: 'B+',
      credits: 4,
      assignments: [
        { name: 'Safety Quiz', score: 95, maxScore: 100, weight: 10, date: '2024-11-05' },
        { name: 'Module 1 Practical', score: 85, maxScore: 100, weight: 20, date: '2024-11-10' },
        { name: 'Safety Assessment', score: null, maxScore: 100, weight: 15, date: '2024-11-18', status: 'pending' },
      ],
    },
  ],
};

const getGradeColor = (grade: number) => {
  if (grade >= 90) return 'text-green-600';
  if (grade >= 80) return 'text-blue-600';
  if (grade >= 70) return 'text-yellow-600';
  return 'text-red-600';
};

const getLetterGradeColor = (letter: string) => {
  if (letter.startsWith('A')) return 'bg-green-600';
  if (letter.startsWith('B')) return 'bg-blue-600';
  if (letter.startsWith('C')) return 'bg-yellow-600';
  return 'bg-red-600';
};

export default function GradesPage() {
  const { overallGPA, overallPercentage, trend, courses } = gradesData;

  return (
    <div className="min-h-screen bg-background">
      <LMSNav />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Grades</h1>
          <p className="text-muted-foreground">
            Track your academic performance across all courses
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Average</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${getGradeColor(overallPercentage)}`}>
                {overallPercentage}%
              </div>
              <div className="flex items-center gap-2 mt-2">
                {trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className="text-xs text-muted-foreground">
                  {trend === 'up' ? '+5%' : '-2%'} from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GPA</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{overallGPA}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Out of 4.0 scale
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{courses.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                {courses.filter(c => c.status === 'completed').length} completed, {courses.filter(c => c.status === 'in-progress').length} in progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Course Grades */}
        <div className="space-y-6">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle>{course.name}</CardTitle>
                      <Badge 
                        className={getLetterGradeColor(course.letterGrade)}
                      >
                        {course.letterGrade}
                      </Badge>
                      {course.status === 'completed' && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      {course.credits} credits • {course.status === 'completed' ? 'Final' : 'Current'} Grade: {course.status === 'completed' ? course.finalGrade : course.currentGrade}%
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${getGradeColor(course.status === 'completed' ? course.finalGrade! : course.currentGrade!)}`}>
                      {course.status === 'completed' ? course.finalGrade : course.currentGrade}%
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Course Progress</span>
                    <span className="font-medium">
                      {course.assignments.filter(a => a.score !== null).length}/{course.assignments.length} assignments graded
                    </span>
                  </div>
                  <Progress 
                    value={(course.assignments.filter(a => a.score !== null).length / course.assignments.length) * 100} 
                  />
                </div>

                {/* Assignments */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Assignments & Assessments</h4>
                  {course.assignments.map((assignment, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {assignment.score !== null ? (
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        ) : assignment.status === 'pending' ? (
                          <Clock className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                        ) : (
                          <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{assignment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Weight: {assignment.weight}% • Due: {new Date(assignment.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {assignment.score !== null ? (
                          <div>
                            <div className={`text-lg font-bold ${getGradeColor((assignment.score / assignment.maxScore) * 100)}`}>
                              {assignment.score}/{assignment.maxScore}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {Math.round((assignment.score / assignment.maxScore) * 100)}%
                            </div>
                          </div>
                        ) : assignment.status === 'pending' ? (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            Pending
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            Not Submitted
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* View Course Button */}
                <div className="mt-6">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/lms/courses/${course.id}`}>
                      View Course Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Grade Scale Reference */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Grading Scale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="font-bold text-lg mb-1">A</div>
                <div className="text-sm text-muted-foreground">90-100%</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg mb-1">B</div>
                <div className="text-sm text-muted-foreground">80-89%</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg mb-1">C</div>
                <div className="text-sm text-muted-foreground">70-79%</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg mb-1">D</div>
                <div className="text-sm text-muted-foreground">60-69%</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg mb-1">F</div>
                <div className="text-sm text-muted-foreground">Below 60%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
