import Link from 'next/link';

export default function DIYInterviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">DIY Tax Interview</h1>
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <p className="text-gray-700 mb-6">
            This feature is coming soon. For now, please book an appointment with one of our tax professionals.
          </p>
          <Link
            href="/supersonic-fast-cash/book-appointment"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
