import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moderation Queue | Admin',
  description: 'Review and moderate forum posts',
};

export default function ModerationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Moderation Queue</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Flagged Posts</h2>

        <div className="space-y-4">
          <div className="border rounded p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Post Title</h3>
                <p className="text-sm text-gray-600">
                  Posted by User • 2 hours ago
                </p>
                <p className="mt-2">Post content preview...</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                  Approve
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>Review cadence: Check queue every 4 hours</p>
          <p>Response SLA: 24 hours for flagged content</p>
        </div>
      </div>
    </div>
  );
}
