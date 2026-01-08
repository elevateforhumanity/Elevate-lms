import { Metadata } from 'next';
import { requireRole } from '@/lib/auth/require-role';

export const metadata: Metadata = {
  title: 'Add Student | Elevate for Humanity',
  description: 'Add a new student to your course',
};

export default async function InstructorAddStudentPage() {
  await requireRole(['instructor']);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add Student</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6 max-w-2xl">
        <p className="text-slate-600 mb-6">
          Enroll a student in your course.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Student Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="student@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Course
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Select a course...</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Student
            </button>
            <button
              type="button"
              className="border border-slate-300 px-6 py-2 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
        <p className="text-slate-500 text-sm mt-6">
          Note: This feature is coming soon. Contact support to manually enroll students.
        </p>
      </div>
    </div>
  );
}
