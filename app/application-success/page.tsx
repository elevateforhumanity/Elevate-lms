import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { generateMetadata } from '@/lib/seo/metadata';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = generateMetadata({
  title: 'Application-Success',
  description: 'Application-Success - Elevate for Humanity workforce training and career development programs in Indianapolis.',
  path: '/application-success',
});

import Link from 'next/link';
import { PartyPopper } from 'lucide-react';

export default async function ApplicationSuccessPage() {
  const supabase = await createClient();
  
  // Log success page visit
  await supabase.from('page_views').insert({ page: 'application_success' }).select();
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-2xl border bg-white p-8 shadow-sm text-center">
        <div className="text-5xl mb-4">
          <PartyPopper className="w-5 h-5 inline-block" />
        </div>
        <h1 className="text-3xl font-bold text-black mb-4">
          Application Received
        </h1>
        <p className="text-lg text-black mb-8">
          Thank you for applying to Elevate for Humanity. A real advisor will
          contact you within 1–2 business days.
        </p>

        <div className="rounded-xl border bg-gray-50 p-6 text-left mb-8">
          <h2 className="text-lg font-semibold text-black mb-4">
            What to do now:
          </h2>
          <ol className="space-y-3 text-black">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-brand-blue-600 text-white text-sm font-semibold">
                1
              </span>
              <span>
                Create an account at{' '}
                <a
                  href="https://www.indianacareerconnect.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline"
                >
                  www.indianacareerconnect.com
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-brand-blue-600 text-white text-sm font-semibold">
                2
              </span>
              <span>Schedule a WorkOne appointment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-brand-blue-600 text-white text-sm font-semibold">
                3
              </span>
              <span>
                Tell them you are enrolling with{' '}
                <strong>Elevate for Humanity</strong>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-brand-blue-600 text-white text-sm font-semibold">
                4
              </span>
              <span>
                Once scheduled, call us back so we can track your progress
              </span>
            </li>
          </ol>
        </div>

        <div className="space-y-3">
          <a
            href="tel:13173143757"
            className="block w-full rounded-xl bg-brand-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-brand-blue-700 transition-colors"
          >
            Need help now? Call 317-314-3757
          </a>
          <Link
            href="/"
            className="block w-full rounded-xl border px-6 py-3 text-center font-semibold text-black hover:bg-gray-50"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
