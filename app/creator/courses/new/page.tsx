import { Metadata } from 'next';
import { requireRole } from '@/lib/auth/require-role';

export const metadata: Metadata = {
  title: 'Create Course | Elevate for Humanity',
  description: 'Create a new course',
};

export default async function CreatorNewCoursePage() {
  await requireRole(['creator', 'admin']);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6 max-w-3xl">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Course Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Introduction to..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Course description..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Duration (hours)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="299.00"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Course
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
          Note: Course creation is coming soon. Contact support for assistance.
        </p>
      </div>
    </div>
  );
}
