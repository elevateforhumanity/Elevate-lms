import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
export const metadata: Metadata = {
  title: 'Admin | Elevate For Humanity',
  description: 'Admin dashboard',
};

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  const { data: users, count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  const { count: activeUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  // Calculate stats by role
  const adminCount =
    users?.filter((u) => u.role === 'admin' || u.role === 'super_admin')
      .length || 0;
  const studentCount = users?.filter((u) => u.role === 'student').length || 0;
  const instructorCount =
    users?.filter((u) => u.role === 'instructor').length || 0;
  const employerCount = users?.filter((u) => u.role === 'employer').length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Users"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            Users
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-brand-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-2xl md:text-3xl lg:text-4xl">
              User Management
            </h1>
            <p className="text-base md:text-lg text-blue-100">
              Manage all users in the Elevate For Humanity platform
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-black">
                  Total Users
                </h3>
                <svg
                  className="w-8 h-8 text-brand-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <p className="text-3xl font-bold text-black">{count || 0}</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-black mb-2">
                Students
              </h3>
              <p className="text-3xl font-bold text-brand-green-600">
                {studentCount}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-black mb-2">
                Instructors
              </h3>
              <p className="text-3xl font-bold text-purple-600">
                {instructorCount}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-black mb-2">
                Employers
              </h3>
              <p className="text-3xl font-bold text-brand-orange-600">
                {employerCount}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-sm font-medium text-black mb-2">Admins</h3>
              <p className="text-3xl font-bold text-brand-blue-600">
                {adminCount}
              </p>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">All Users</h2>
                <p className="text-sm text-black mt-1">
                  Manage user accounts and permissions
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="search"
                  placeholder="Search users..."
                  className="px-4 py-2 border rounded-lg text-sm"
                />
                <Link
                  href="/admin/users/new"
                  className="px-4 py-2 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 text-sm font-medium"
                >
                  Add User
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-black uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users && users.length > 0 ? (
                    users.map((user: Record<string, unknown>) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue-600 font-semibold">
                              {user.full_name?.charAt(0) ||
                                user.email?.charAt(0) ||
                                '?'}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-black">
                                {user.full_name || 'No name'}
                              </p>
                              <p className="text-xs text-black">
                                {user.id.slice(0, 8)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-black">
                          {user.email || 'No email'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.role === 'admin' ||
                              user.role === 'super_admin'
                                ? 'bg-blue-100 text-blue-700'
                                : user.role === 'instructor'
                                  ? 'bg-blue-100 text-purple-700'
                                  : user.role === 'employer'
                                    ? 'bg-blue-100 text-orange-700'
                                    : 'bg-blue-100 text-green-700'
                            }`}
                          >
                            {user.role || 'student'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-black">
                          {user.phone || '—'}
                        </td>
                        <td className="px-6 py-4 text-sm text-black">
                          {user.created_at
                            ? new Date(user.created_at).toLocaleDateString()
                            : '—'}
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          <Link
                            href={`/admin/users/${user.id}`}
                            className="text-brand-blue-600 hover:text-brand-blue-700 mr-3"
                          >
                            View
                          </Link>
                          <Link
                            href={`/admin/users/${user.id}/edit`}
                            className="text-black hover:text-black mr-3"
                          >
                            Edit
                          </Link>
                          <button className="text-brand-orange-600 hover:text-red-700" aria-label="Action button">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-12 text-center text-black"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {users && users.length > 0 && (
              <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
                <p className="text-sm text-black">
                  Showing {users.length} of {count || 0} users
                </p>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 border rounded text-sm hover:bg-white"
                    disabled
                  >
                    Previous
                  </button>
                  <button className="px-3 py-1 border rounded text-sm hover:bg-white" aria-label="Action button">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Storytelling Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
                    Your Journey Starts Here
                  </h2>
                  <p className="text-lg text-black mb-6 leading-relaxed">
                    Every great career begins with a single step. Whether you're
                    looking to change careers, upgrade your skills, or enter the
                    workforce for the first time, we're here to help you
                    succeed. Our programs are 100% free, government-funded, and
                    designed to get you hired fast.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-black">
                        100% free training - no tuition, no hidden costs
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-black">
                        Industry-recognized certifications that employers value
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-black">
                        Job placement assistance and career support
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-black">
                        Flexible scheduling for working adults
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/artlist/hero-training-2.jpg"
                    alt="Students learning"
                    fill
                    className="object-cover"
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16    text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="text-base md:text-lg mb-8 text-blue-100">
                Join thousands who have launched successful careers through our
                free training programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 text-lg shadow-2xl transition-all"
                >
                  Apply Now - It's Free
                </Link>
                <Link
                  href="/programs"
                  className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-600 border-2 border-white text-lg shadow-2xl transition-all"
                >
                  Browse All Programs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
