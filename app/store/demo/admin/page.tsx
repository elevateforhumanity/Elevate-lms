import Link from 'next/link';

export default function AdminDemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-700">
      <div className="text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Redirecting to Admin Dashboard...</h1>
        <Link href="/admin" className="bg-white text-purple-700 px-8 py-4 rounded-lg font-bold text-xl">Click Here if Not Redirected</Link>
        <meta httpEquiv="refresh" content="0;url=/admin" />
      </div>
    </div>
  );
}
