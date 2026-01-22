'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight,
  CreditCard,
  DollarSign,
  Download,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand?: string;
  expiry?: string;
  is_default: boolean;
}

interface Invoice {
  id: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  date: string;
  description: string;
}

export default function BillingSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/login?next=/lms/settings/billing');
      return;
    }

    // Sample data - in production, fetch from Stripe or payment provider
    setPaymentMethods([
      {
        id: '1',
        type: 'card',
        last4: '4242',
        brand: 'Visa',
        expiry: '12/26',
        is_default: true,
      },
    ]);

    setInvoices([
      {
        id: 'INV-001',
        amount: 299,
        status: 'paid',
        date: '2026-01-15',
        description: 'Barbering Program - Monthly Payment',
      },
      {
        id: 'INV-002',
        amount: 299,
        status: 'paid',
        date: '2025-12-15',
        description: 'Barbering Program - Monthly Payment',
      },
      {
        id: 'INV-003',
        amount: 299,
        status: 'paid',
        date: '2025-11-15',
        description: 'Barbering Program - Monthly Payment',
      },
    ]);

    setBalance(0);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/lms" className="hover:text-gray-700">LMS</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/lms/settings" className="hover:text-gray-700">Settings</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Billing</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
          <p className="text-gray-600 mt-1">Manage payment methods and view invoices</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Account Balance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="text-3xl font-bold text-gray-900">${balance.toFixed(2)}</p>
            </div>
            {balance > 0 ? (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Pay Now
              </button>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">All Paid</span>
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
              <Plus className="w-4 h-4" />
              Add Method
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {paymentMethods.map((method) => (
              <div key={method.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {method.brand} •••• {method.last4}
                    </p>
                    <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                  </div>
                  {method.is_default && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!method.is_default && (
                    <button className="text-sm text-gray-600 hover:text-gray-900">
                      Set Default
                    </button>
                  )}
                  <button className="p-2 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {paymentMethods.length === 0 && (
              <div className="px-6 py-8 text-center">
                <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No payment methods on file</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    invoice.status === 'paid' ? 'bg-green-100' : 
                    invoice.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    {invoice.status === 'paid' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : invoice.status === 'pending' ? (
                      <DollarSign className="w-5 h-5 text-yellow-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{invoice.description}</p>
                    <p className="text-sm text-gray-500">
                      {invoice.id} • {new Date(invoice.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-900">${invoice.amount.toFixed(2)}</span>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {invoices.length === 0 && (
              <div className="px-6 py-8 text-center">
                <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No payment history</p>
              </div>
            )}
          </div>
        </div>

        {/* Help */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">Need Help with Billing?</h3>
              <p className="text-sm text-blue-700 mt-1">
                Contact our billing department at billing@elevateforhumanity.org or call (317) 555-1234.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
