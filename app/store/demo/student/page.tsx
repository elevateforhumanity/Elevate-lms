import Link from 'next/link';

export default function StudentDemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Redirecting to Student LMS...</h1>
        <Link href="/lms" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-xl">Click Here if Not Redirected</Link>
        <meta httpEquiv="refresh" content="0;url=/lms" />
      </div>
    </div>
  );
}
