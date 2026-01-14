import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Clock, DollarSign, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse Courses | Student Portal',
  description: 'Browse and enroll in partner courses',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/lms/courses',
  },
};

export const dynamic = 'force-dynamic';

export default async function BrowseCoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get all active partner courses with provider info
  const { data: courses, error } = await supabase
    .from('partner_lms_courses')
    .select(`
      *,
      partner_lms_providers (
        provider_name,
        provider_type,
        website_url
      )
    `)
    .eq('active', true)
    .order('course_name');

  // Get student's existing enrollments
  const { data: enrollments } = await supabase
    .from('partner_lms_enrollments')
    .select('course_id')
    .eq('student_id', user.id);

  const enrolledCourseIds = new Set(enrollments?.map(e => e.course_id) || []);

  // Group courses by provider
  const coursesByProvider = courses?.reduce((acc: any, course: any) => {
    const providerName = course.partner_lms_providers?.provider_name || 'Other';
    if (!acc[providerName]) {
      acc[providerName] = [];
    }
    acc[providerName].push(course);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Browse Courses</h1>
          <p className="text-black">
            Choose from {courses?.length || 0} partner courses across {Object.keys(coursesByProvider || {}).length} providers
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">Error loading courses. Please try again.</p>
          </div>
        )}

        {!courses || courses.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <BookOpen className="w-16 h-16 text-black mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-black mb-2">No Courses Available</h2>
            <p className="text-black">Check back soon for new courses.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(coursesByProvider || {}).map(([providerName, providerCourses]: [string, any]) => (
              <div key={providerName} className="bg-white rounded-lg shadow-sm border">
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <h2 className="text-xl font-bold text-black">{providerName}</h2>
                  <p className="text-sm text-black">{providerCourses.length} courses available</p>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {providerCourses.map((course: any) => {
                      const isEnrolled = enrolledCourseIds.has(course.id);
                      const price = course.price || course.metadata?.retail || 0;
                      
                      return (
                        <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="mb-3">
                            <h3 className="font-semibold text-black mb-1">{course.course_name}</h3>
                            {course.description && (
                              <p className="text-sm text-black line-clamp-2">{course.description}</p>
                            )}
                          </div>

                          <div className="space-y-2 mb-4">
                            {course.hours && (
                              <div className="flex items-center gap-2 text-sm text-black">
                                <Clock className="w-4 h-4" />
                                <span>{course.hours} hours</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-2 text-sm text-black">
                              <DollarSign className="w-4 h-4" />
                              <span>${price}</span>
                            </div>
                          </div>

                          {isEnrolled ? (
                            <div className="bg-green-50 text-green-700 px-4 py-2 rounded text-sm font-medium text-center">
                              ✓ Enrolled
                            </div>
                          ) : course.enrollment_link ? (
                            <a
                              href={course.enrollment_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              Enroll Now
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          ) : (
                            <Link
                              href={`/lms/courses/${course.id}/enroll`}
                              className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm font-medium text-center"
                            >
                              Enroll Now
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
