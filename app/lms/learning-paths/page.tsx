'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import LMSNav from '@/components/lms/LMSNav';
import { 
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  Lock,
  TrendingUp
} from 'lucide-react';

// Mock learning paths data
const learningPaths = [
  {
    id: 1,
    title: 'Healthcare Professional Track',
    description: 'Complete pathway to becoming a certified healthcare professional',
    courses: [
      { id: 2, title: 'CNA Certification Prep', status: 'in-progress', progress: 65 },
      { id: 4, title: 'Medical Terminology', status: 'locked', progress: 0 },
      { id: 5, title: 'Patient Care Advanced', status: 'locked', progress: 0 },
    ],
    totalCourses: 3,
    completedCourses: 0,
    estimatedHours: 120,
    enrolled: true,
    certificate: true,
  },
  {
    id: 2,
    title: 'Skilled Trades Mastery',
    description: 'Master essential skills for a career in skilled trades',
    courses: [
      { id: 3, title: 'HVAC Technician Training', status: 'in-progress', progress: 23 },
      { id: 6, title: 'Electrical Basics', status: 'locked', progress: 0 },
      { id: 7, title: 'Plumbing Fundamentals', status: 'locked', progress: 0 },
      { id: 8, title: 'Building Maintenance', status: 'locked', progress: 0 },
    ],
    totalCourses: 4,
    completedCourses: 0,
    estimatedHours: 180,
    enrolled: true,
    certificate: true,
  },
  {
    id: 3,
    title: 'Beauty & Wellness Professional',
    description: 'Complete training for beauty and wellness careers',
    courses: [
      { id: 1, title: 'Barber Fundamentals', status: 'completed', progress: 100 },
      { id: 9, title: 'Advanced Styling Techniques', status: 'available', progress: 0 },
      { id: 10, title: 'Salon Management', status: 'locked', progress: 0 },
    ],
    totalCourses: 3,
    completedCourses: 1,
    estimatedHours: 90,
    enrolled: true,
    certificate: true,
  },
  {
    id: 4,
    title: 'Business & Entrepreneurship',
    description: 'Build skills to start and grow your own business',
    courses: [
      { id: 11, title: 'Small Business Basics', status: 'available', progress: 0 },
      { id: 12, title: 'Marketing Fundamentals', status: 'locked', progress: 0 },
      { id: 13, title: 'Financial Management', status: 'locked', progress: 0 },
    ],
    totalCourses: 3,
    completedCourses: 0,
    estimatedHours: 60,
    enrolled: false,
    certificate: true,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-600">Completed</Badge>;
    case 'in-progress':
      return <Badge className="bg-blue-600">In Progress</Badge>;
    case 'available':
      return <Badge variant="outline">Available</Badge>;
    case 'locked':
      return <Badge variant="secondary">Locked</Badge>;
    default:
      return null;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'in-progress':
      return <TrendingUp className="h-5 w-5 text-blue-600" />;
    case 'available':
      return <BookOpen className="h-5 w-5 text-primary" />;
    case 'locked':
      return <Lock className="h-5 w-5 text-muted-foreground" />;
    default:
      return null;
  }
};

export default function LearningPathsPage() {
  const enrolledPaths = learningPaths.filter(p => p.enrolled);
  const availablePaths = learningPaths.filter(p => !p.enrolled);

  return (
    <div className="min-h-screen bg-background">
      <LMSNav />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Learning Paths</h1>
          <p className="text-muted-foreground">
            Follow structured learning journeys to achieve your career goals
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Paths</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolledPaths.length}</div>
              <p className="text-xs text-muted-foreground">
                Active learning paths
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enrolledPaths.reduce((sum, p) => sum + p.completedCourses, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all paths
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates Available</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enrolledPaths.filter(p => p.certificate).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Upon completion
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Paths */}
        {enrolledPaths.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">My Learning Paths</h2>
            <div className="space-y-6">
              {enrolledPaths.map((path) => {
                const overallProgress = Math.round(
                  (path.completedCourses / path.totalCourses) * 100
                );

                return (
                  <Card key={path.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl">{path.title}</CardTitle>
                            {path.certificate && (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                <Award className="h-3 w-3 mr-1" />
                                Certificate
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{path.description}</CardDescription>
                        </div>
                        <Button asChild>
                          <Link href={`/lms/learning-paths/${path.id}`}>
                            View Path
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Overall Progress */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Overall Progress</span>
                          <span className="font-medium">
                            {path.completedCourses}/{path.totalCourses} courses completed
                          </span>
                        </div>
                        <Progress value={overallProgress} className="h-3" />
                      </div>

                      {/* Course List */}
                      <div className="space-y-3">
                        {path.courses.map((course, index) => (
                          <div
                            key={course.id}
                            className="flex items-center gap-4 p-3 rounded-lg border"
                          >
                            <div className="flex-shrink-0">
                              {getStatusIcon(course.status)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium">
                                  {index + 1}. {course.title}
                                </span>
                                {getStatusBadge(course.status)}
                              </div>
                              {course.status === 'in-progress' && (
                                <div className="mt-2">
                                  <Progress value={course.progress} className="h-1.5" />
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {course.progress}% complete
                                  </p>
                                </div>
                              )}
                            </div>
                            {course.status !== 'locked' && (
                              <Button
                                variant={course.status === 'completed' ? 'outline' : 'default'}
                                size="sm"
                                asChild
                              >
                                <Link href={`/lms/courses/${course.id}`}>
                                  {course.status === 'completed' ? 'Review' : 'Continue'}
                                </Link>
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Path Info */}
                      <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-t">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {path.estimatedHours} hours
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {path.totalCourses} courses
                        </span>
                        {path.certificate && (
                          <span className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            Certificate included
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Available Paths */}
        {availablePaths.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Explore More Paths</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {availablePaths.map((path) => (
                <Card key={path.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      {path.certificate && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          <Award className="h-3 w-3 mr-1" />
                          Certificate
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Includes:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {path.courses.map((course, index) => (
                          <li key={course.id}>
                            {index + 1}. {course.title}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-t">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {path.estimatedHours} hours
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {path.totalCourses} courses
                      </span>
                    </div>

                    <Button className="w-full" asChild>
                      <Link href={`/lms/learning-paths/${path.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
