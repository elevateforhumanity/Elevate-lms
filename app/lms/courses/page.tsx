import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Award } from 'lucide-react';

export const metadata = {
  title: 'Courses | Elevate LMS',
  description: 'Browse available courses',
};

const courses = [
  {
    id: 1,
    title: 'Barber Fundamentals',
    description: 'Master the basics of barbering including cutting, styling, and customer service',
    instructor: 'Master Barber Johnson',
    duration: '8 weeks',
    lessons: 12,
    students: 45,
    level: 'Beginner',
    enrolled: true,
  },
  {
    id: 2,
    title: 'CNA Certification Prep',
    description: 'Complete preparation for Certified Nursing Assistant certification exam',
    instructor: 'RN Sarah Williams',
    duration: '6 weeks',
    lessons: 15,
    students: 67,
    level: 'Beginner',
    enrolled: true,
  },
  {
    id: 3,
    title: 'HVAC Fundamentals',
    description: 'Learn heating, ventilation, and air conditioning system basics',
    instructor: 'Tech Mike Rodriguez',
    duration: '10 weeks',
    lessons: 18,
    students: 32,
    level: 'Beginner',
    enrolled: false,
  },
  {
    id: 4,
    title: 'Building Services Technician',
    description: 'Comprehensive building maintenance and systems training',
    instructor: 'Facilities Manager Davis',
    duration: '12 weeks',
    lessons: 20,
    students: 28,
    level: 'Intermediate',
    enrolled: false,
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Course Catalog</h1>
              <p className="text-muted-foreground mt-1">
                Explore our training programs
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/lms/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Badge variant="outline" className="cursor-pointer">All Courses</Badge>
          <Badge variant="outline" className="cursor-pointer">My Courses</Badge>
          <Badge variant="outline" className="cursor-pointer">Beginner</Badge>
          <Badge variant="outline" className="cursor-pointer">Intermediate</Badge>
          <Badge variant="outline" className="cursor-pointer">Advanced</Badge>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500" />
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={course.enrolled ? 'default' : 'secondary'}>
                    {course.enrolled ? 'Enrolled' : course.level}
                  </Badge>
                </div>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {course.duration} • {course.lessons} lessons
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {course.students} students enrolled
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Award className="h-4 w-4 mr-2" />
                    {course.instructor}
                  </div>
                </div>
                {course.enrolled ? (
                  <Button className="w-full" asChild>
                    <Link href={`/lms/courses/${course.id}`}>
                      Continue Learning
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/lms/courses/${course.id}`}>
                      View Course
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
