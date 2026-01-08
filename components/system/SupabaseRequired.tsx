import Link from 'next/link';

export function SupabaseRequired() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-sm border text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Configuration Required
        </h1>
        <p className="text-slate-600 mb-4">
          The authentication system is not configured. Please contact your
          administrator to set up Supabase environment variables.
        </p>
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Return Home
          </Link>
          <p className="text-sm text-slate-500">
            Need help? Contact{' '}
            <a
              href="mailto:support@elevateforhumanity.institute"
              className="text-blue-600 hover:underline"
            >
              support@elevateforhumanity.institute
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
