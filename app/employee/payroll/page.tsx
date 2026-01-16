import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { DollarSign, Download, FileText, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Payroll | Employee Portal',
  description: 'View your pay stubs and payroll information.',
};

export const dynamic = 'force-dynamic';

export default async function PayrollPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/employee/payroll');
  }

  // Get pay stubs
  const { data: payStubs } = await supabase
    .from('pay_stubs')
    .select('*')
    .eq('user_id', user.id)
    .order('pay_date', { ascending: false })
    .limit(12);

  // Get YTD summary
  const { data: ytdSummary } = await supabase
    .from('payroll_ytd')
    .select('*')
    .eq('user_id', user.id)
    .eq('year', new Date().getFullYear())
    .single();

  const defaultYtd = {
    gross_pay: 45000,
    net_pay: 35000,
    taxes_withheld: 8000,
    deductions: 2000,
  };

  const displayYtd = ytdSummary || defaultYtd;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Payroll</h1>
          <p className="text-gray-600">View your pay stubs and payroll information</p>
        </div>

        {/* YTD Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-gray-600">YTD Gross Pay</span>
            </div>
            <div className="text-2xl font-bold">${displayYtd.gross_pay?.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <span className="text-gray-600">YTD Net Pay</span>
            </div>
            <div className="text-2xl font-bold">${displayYtd.net_pay?.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-red-600" />
              <span className="text-gray-600">YTD Taxes</span>
            </div>
            <div className="text-2xl font-bold">${displayYtd.taxes_withheld?.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-orange-600" />
              <span className="text-gray-600">YTD Deductions</span>
            </div>
            <div className="text-2xl font-bold">${displayYtd.deductions?.toLocaleString()}</div>
          </div>
        </div>

        {/* Pay Stubs */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pay Stubs</h2>
            <Link
              href="/employee/payroll/history"
              className="text-blue-600 font-medium hover:underline"
            >
              View All
            </Link>
          </div>
          {payStubs && payStubs.length > 0 ? (
            <div className="divide-y">
              {payStubs.map((stub: any) => (
                <div key={stub.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <FileText className="w-10 h-10 text-blue-500" />
                    <div>
                      <h3 className="font-medium">
                        Pay Period: {new Date(stub.period_start).toLocaleDateString()} - {new Date(stub.period_end).toLocaleDateString()}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Pay Date: {new Date(stub.pay_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Net Pay</div>
                      <div className="font-bold text-lg">${stub.net_pay?.toLocaleString()}</div>
                    </div>
                    <a
                      href={stub.pdf_url || '#'}
                      download
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No pay stubs available</p>
            </div>
          )}
        </div>

        {/* Tax Documents */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4">Tax Documents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/employee/documents?category=tax"
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <FileText className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-medium">W-2 Forms</h3>
                <p className="text-sm text-gray-500">Annual wage and tax statements</p>
              </div>
            </Link>
            <Link
              href="/employee/documents?category=tax"
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
            >
              <FileText className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-medium">W-4 Form</h3>
                <p className="text-sm text-gray-500">Update your tax withholding</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
