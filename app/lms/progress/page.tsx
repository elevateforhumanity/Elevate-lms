'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  Video
} from 'lucide-react';

const progressData = {
  overallStats: {
    totalCourses: 4,
    completedCourses: 1,
    inProgressCourses: 2,
    totalHours: 156,
    completedHours: 42,
    certificatesEarned: 1,
    averageScore: 87,
  },
  courses: [
    {
      id: 1,
      title: 'Barber Fundamentals',
      status: 'completed',
      progress: 100,
      completedLessons: 24,
      totalLessons: 24,
      hoursSpent: 32,
      totalHours: 32,
      lastAccessed: '2024-11-01',
      grade: 92,
      modules: [
        { id: 1, title: 'Introduction to Barbering', completed: 5, total: 5 },
        { id: 2, title: 'Hair Cutting Techniques', completed: 8, total: 8 },
        { id: 3, title: 'Styling and Finishing', completed: 6, total: 6 },
        { id: 4, title: 'Business Skills', completed: 5, total: 5 },
      ],
    },
    {
      id: 2,
      title: 'CNA Certification Prep',
      status: 'in-progress',
      progress: 65,
      completedLessons: 19,
      totalLessons: 30,
      hoursSpent: 28,
      totalHours: 45,
      lastAccessed: '2024-11-12',
      grade: 85,
      modules: [
        { id: 1, title: 'Patient Care Basics', completed: 6, total: 6 },
        { id: 2, title: 'Vital Signs & Measurements', completed: 5, total: 5 },
        { id: 3, title: 'Infection Control', completed: 4, total: 7 },
        { id: 4, title: 'Emergency Procedures', completed: 4, total: 12 },
      ],
    },
    {
      id: 3,
      title: 'HVAC Technician Training',
      status: 'in-progress',
      progress: 23,
      completedLessons: 7,
      totalLessons: 28,
      hoursSpent: 12,
      totalHours: 48,
      lastAccessed: '2024-11-10',
      grade: 88,
      modules: [
        { id: 1, title: 'HVAC Fundamentals', completed: 5, total: 5 },
        { id: 2, title: 'Heating Systems', completed: 2, total: 8 },
        { id: 3, title: 'Cooling Systems', completed: 0, total: 8 },
        { id: 4, title: 'Troubleshooting', completed: 0, total: 7 },
      ],
    },
    {
      id: 4,
      title: 'Building Services Maintenance',
      status: 'not-started',
      progress: 0,
      completedLessons: 0,
      totalLessons: 26,
      hoursSpent: 0,
      totalHours: 38,
      lastAccessed: null,
      grade: null,
      modules: [
        { id: 1, title: 'Safety & Compliance', completed: 0, total: 6 },
        { id: 2, title: 'Electrical Systems', completed: 0, total: 8 },
        { id: 3, title: 'Plumbing Basics', completed: 0, total: 7 },
        { id: 4, title: 'Facility Management', completed: 0, total: 5 },
      ],
    },
  ],
  recentActivity: [
    { date: '2024-11-12', course: 'CNA Certification Prep', lesson: 'Emergency Response Protocols', type: 'video' },
    { date: '2024-11-11', course: 'CNA Certification Prep', lesson: 'Module 3 Quiz', type: 'quiz', score: 90 },
    { date: '2024-11-10', course: 'HVAC Technician Training', lesson: 'Furnace Components', type: 'video' },
    { date: '2024-11-09', course: 'CNA Certification Prep', lesson: 'Infection Control Procedures', type: 'video' },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-blue-500';
    default:
      return 'bg-gray-300';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-600">Completed</Badge>;
    case 'in-progress':
      return <Badge className="bg-blue-600">In Progress</Badge>;
    default:
      return <Badge variant="secondary">Not Started</Badge>;
  }
};

const getLessonIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Video className="h-4 w-4" />;
    case 'quiz':
      return <FileText className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};

export default function ProgressPage() {
  const { overallStats, courses, recentActivity } = progressData;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Progress</h1>
              <p className="text-muted-foreground mt-1">
                Track your learning journey and achievements
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/lms/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Overall Stats */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Overall Statistics</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overallStats.completedCourses}/{overallStats.totalCourses}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((overallStats.completedCourses / overallStats.totalCourses) * 100)}% completion rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overallStats.completedHours}h
                </div>
                <p className="text-xs text-muted-foreground">
                  of {overallStats.totalHours}h total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallStats.certificatesEarned}</div>
                <p className="text-xs text-muted-foreground">
                  Professional credentials
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overallStats.averageScore}%</div>
                <p className="text-xs text-muted-foreground">
                  Across all assessments
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Course Progress */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Course Progress</h2>
          <div className="space-y-6">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle>{course.title}</CardTitle>
                        {getStatusBadge(course.status)}
                      </div>
                      <CardDescription>
                        {course.completedLessons} of {course.totalLessons} lessons completed
                        {course.lastAccessed && (
                          <span className="ml-4">
                            Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    {course.grade && (
                      <div className="text-right">
                        <div className="text-2xl font-bold">{course.grade}%</div>
                        <div className="text-xs text-muted-foreground">Current Grade</div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Overall Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getStatusColor(course.status)} transition-all`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Time Stats */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {course.hoursSpent}h / {course.totalHours}h
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {course.completedLessons} / {course.totalLessons} lessons
                      </span>
                    </div>
                  </div>

                  {/* Module Breakdown */}
                  <div>
                    <h4 className="font-semibold mb-3">Module Breakdown</h4>
                    <div className="space-y-3">
                      {course.modules.map((module) => (
                        <div key={module.id} className="flex items-center gap-3">
                          {module.completed === module.total ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                          ) : module.completed > 0 ? (
                            <PlayCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-300 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">{module.title}</span>
                              <span className="text-xs text-muted-foreground">
                                {module.completed}/{module.total}
                              </span>
                            </div>
                            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${(module.completed / module.total) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    {course.status === 'not-started' ? (
                      <Button className="w-full" asChild>
                        <Link href={`/lms/courses/${course.id}`}>Start Course</Link>
                      </Button>
                    ) : (
                      <Button className="w-full" asChild>
                        <Link href={`/lms/courses/${course.id}`}>
                          {course.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex-shrink-0 mt-1">
                      {getLessonIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{activity.lesson}</p>
                      <p className="text-sm text-muted-foreground">{activity.course}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      {activity.score && (
                        <div className="text-sm font-medium text-green-600 mb-1">
                          Score: {activity.score}%
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(activity.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
