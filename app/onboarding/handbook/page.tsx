import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, CheckCircle, Download, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Employee Handbook | Elevate For Humanity',
  description: 'Review and acknowledge the employee handbook.',
};

export const dynamic = 'force-dynamic';

export default async function HandbookPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/onboarding/handbook');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: handbook } = await supabase
    .from('documents')
    .select('*')
    .eq('type', 'handbook')
    .eq('is_active', true)
    .single();

  const { data: acknowledgment } = await supabase
    .from('handbook_acknowledgments')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const sections = [
    'Welcome & Mission',
    'Employment Policies',
    'Code of Conduct',
    'Benefits & Compensation',
    'Time Off & Leave',
    'Safety & Security',
    'Technology & Data',
    'Grievance Procedures',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Employee Handbook</h1>
          <p className="text-indigo-100">Please review and acknowledge the handbook to continue.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {acknowledgment ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h2 className="font-semibold text-green-800">Handbook Acknowledged</h2>
                <p className="text-sm text-green-700">
                  Acknowledged on {new Date(acknowledgment.acknowledged_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <div>
                <h2 className="font-semibold text-lg">Elevate For Humanity Employee Handbook</h2>
                <p className="text-sm text-gray-500">Last updated: {handbook?.updated_at ? new Date(handbook.updated_at).toLocaleDateString() : 'January 2024'}</p>
              </div>
            </div>
            {handbook?.file_url && (
              <a
                href={handbook.file_url}
                className="flex items-center gap-2 text-indigo-600 hover:underline"
              >
                <Download className="w-4 h-4" /> Download PDF
              </a>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium mb-4">Table of Contents</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {sections.map((section, i) => (
                <div key={section} className="flex items-center gap-2 text-gray-600">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  {section}
                </div>
              ))}
            </div>
          </div>
        </div>

        {!acknowledgment && (
          <form action="/api/onboarding/acknowledge-handbook" method="POST">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold mb-4">Acknowledgment</h3>
              <div className="space-y-4">
                <label className="flex items-start gap-3">
                  <input type="checkbox" name="confirm" required className="mt-1" />
                  <span className="text-sm text-gray-600">
                    I confirm that I have read and understand the Employee Handbook. I agree to comply with all policies and procedures outlined in this document.
                  </span>
                </label>
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name (as signature)</label>
                  <input
                    type="text"
                    name="signature"
                    required
                    defaultValue={profile?.full_name || ''}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Acknowledge Handbook
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link href="/onboarding/staff" className="text-indigo-600 hover:underline">
            Back to Onboarding
          </Link>
        </div>
      </div>
    </div>
  );
}
