import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Management | Admin',
  description: 'Manage blog posts and content',
};

export default function BlogAdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Management</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Editorial Workflow</h2>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold">Draft Posts</h3>
            <p className="text-sm text-gray-600">Posts in progress</p>
          </div>

          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-semibold">Pending Review</h3>
            <p className="text-sm text-gray-600">Posts awaiting approval</p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold">Published</h3>
            <p className="text-sm text-gray-600">Live blog posts</p>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-semibold">Archived</h3>
            <p className="text-sm text-gray-600">Removed from public view</p>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Create New Post
          </button>
        </div>
      </div>
    </div>
  );
}
