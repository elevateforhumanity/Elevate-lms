'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, Users, Award } from 'lucide-react';

const availableCourses = [
  {
    id: 1,
    title: 'Barber Fundamentals',
    description: 'Master the basics of barbering including cutting, styling, and customer service',
    duration: '8 weeks',
    lessons: 12,
    students: 45,
    level: 'Beginner',
    prerequisites: 'None',
  },
  {
    id: 2,
    title: 'CNA Certification Prep',
    description: 'Complete preparation for Certified Nursing Assistant certification exam',
    duration: '6 weeks',
    lessons: 15,
    students: 67,
    level: 'Beginner',
    prerequisites: 'None',
  },
  {
    id: 3,
    title: 'HVAC Fundamentals',
    description: 'Learn heating, ventilation, and air conditioning system basics',
    duration: '10 weeks',
    lessons: 18,
    students: 32,
    level: 'Beginner',
    prerequisites: 'None',
  },
];

export default function EnrollPage() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [step, setStep] = useState(1);

  const handleEnroll = (courseId: number) => {
    setSelectedCourse(courseId);
    setStep(2);
  };

  const handleConfirmEnrollment = () => {
    // Handle enrollment logic here
    alert('Enrollment successful! Redirecting to course...');
    window.location.href = `/lms/courses/${selectedCourse}`;
  };

  if (step === 2 && selectedCourse) {
    const course = availableCourses.find(c => c.id === selectedCourse);
    
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">Confirm Enrollment</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>{course?.title}</CardTitle>
              <CardDescription>{course?.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course?.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course?.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course?.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course?.lessons} lessons</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Student Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <Input placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <Input type="tel" placeholder="(555) 123-4567" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">Enrollment Details</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Course Fee:</span>
                      <span className="font-semibold">$0 (100% Funded)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Start Date:</span>
                      <span>Next Monday</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Access:</span>
                      <span>Immediate</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleConfirmEnrollment} className="flex-1">
                    Confirm Enrollment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Enroll in a Course</h1>
              <p className="text-muted-foreground mt-1">
                Choose a program to begin your training
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/lms/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableCourses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500" />
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  {course.level}
                </Badge>
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
                    Prerequisites: {course.prerequisites}
                  </div>
                </div>
                <Button className="w-full" onClick={() => handleEnroll(course.id)}>
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
