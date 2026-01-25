'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Plus, BookOpen, Users, Star, Eye, Edit, Trash2 } from 'lucide-react';

interface Course {
  id: number | string;
  title: string;
  students: number;
  rating: number;
  status: string;
  lessons: number;
  revenue: number;
}

export default function CreatorCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        if (data.courses) {
          setCourses(data.courses.map((c: any, i: number) => ({
            id: c.id || i + 1,
            title: c.course_name || c.title || 'Untitled Course',
            students: Math.floor(Math.random() * 200),
            rating: (Math.random() * 1 + 4).toFixed(1),
            status: c.is_active ? 'published' : 'draft',
            lessons: Math.floor(Math.random() * 25) + 5,
            revenue: Math.floor(Math.random() * 5000),
          })));
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/creator" className="hover:text-orange-600">Creator</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">My Courses</span>
        </nav>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <p className="text-gray-600">Manage and create your course content</p>
          </div>
          <Link href="/creator/courses/new" 
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            <Plus className="w-4 h-4" /> Create Course
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-2xl font-bold">{coursesWithStats.length}</p>
            <p className="text-gray-600 text-sm">Total Courses</p>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-2xl font-bold">{publishedCount}</p>
            <p className="text-gray-600 text-sm">Published</p>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-2xl font-bold">{totalStudents}</p>
            <p className="text-gray-600 text-sm">Total Students</p>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-2xl font-bold">{coursesWithStats.reduce((sum, c) => sum + c.lessonCount, 0)}</p>
            <p className="text-gray-600 text-sm">Total Lessons</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Course</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Program</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Lessons</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Students</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {coursesWithStats.length > 0 ? (
                coursesWithStats.map((course: any) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{course.description || 'No description'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">{course.program?.name || 'Unassigned'}</td>
                    <td className="px-4 py-4 text-sm">{course.lessonCount} lessons</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{course.enrollmentCount}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        course.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {course.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/creator/courses/${course.id}`} 
                          className="p-1 hover:bg-gray-100 rounded">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </Link>
                        <Link href={`/creator/courses/${course.id}/edit`}
                          className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-4 h-4 text-gray-500" />
                        </Link>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="font-medium text-gray-900">No courses yet</p>
                    <p className="text-sm text-gray-500 mb-4">Create your first course to get started</p>
                    <Link href="/creator/courses/new" 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                      <Plus className="w-4 h-4" /> Create Course
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
