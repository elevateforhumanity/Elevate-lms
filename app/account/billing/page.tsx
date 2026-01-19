'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Calendar,
  ExternalLink,
  Check,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { PLANS, LicenseStatus } from '@/lib/license/types';

// Mock license data - in production, fetch from API/database
const mockLicense = {
  status: 'trial' as LicenseStatus,
  planId: 'annual' as const,
  trialEndsAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
  currentPeriodEnd: null as Date | null,
  stripeCustomerId: 'cus_mock123',
};

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const license = mockLicense;
  const plan = PLANS[license.planId];

  const handleManageBilling = async () => {
    if (!license.stripeCustomerId) {
      alert('No billing account found');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/license/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: license.stripeCustomerId }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to open billing portal');
      }
    } catch (error) {
      console.error('Portal error:', error);
      alert('Failed to open billing portal');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusDisplay = () => {
    switch (license.status) {
      case 'trial':
        const daysLeft = license.trialEndsAt
          ? Math.ceil((license.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          : 0;
        return {
          label: 'Trial',
          color: 'blue',
          icon: Clock,
          message: `${daysLeft} days remaining`,
        };
      case 'active':
        return {
          label: 'Active',
          color: 'green',
          icon: Check,
          message: 'Your subscription is active',
        };
      case 'past_due':
        return {
          label: 'Past Due',
          color: 'amber',
          icon: AlertTriangle,
          message: 'Payment failed - please update your card',
        };
      case 'suspended':
        return {
          label: 'Suspended',
          color: 'red',
          icon: AlertTriangle,
          message: 'Access suspended - payment required',
        };
      case 'canceled':
        return {
          label: 'Canceled',
          color: 'gray',
          icon: AlertTriangle,
          message: license.currentPeriodEnd
            ? `Access until ${license.currentPeriodEnd.toLocaleDateString()}`
            : 'Subscription canceled',
        };
      default:
        return {
          label: 'Unknown',
          color: 'gray',
          icon: AlertTriangle,
          message: '',
        };
    }
  };

  const status = getStatusDisplay();
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Billing</h1>
          <p className="text-gray-600">Manage your subscription and payment methods</p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                Subscription Status
              </h2>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 bg-${status.color}-100 text-${status.color}-700 text-sm font-medium rounded-full`}>
                  <StatusIcon className="w-4 h-4" />
                  {status.label}
                </span>
                <span className="text-gray-600 text-sm">{status.message}</span>
              </div>
            </div>
          </div>

          {license.status === 'trial' && license.trialEndsAt && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">
                    Trial ends {license.trialEndsAt.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-blue-700">
                    Your card will be charged ${plan.price}/{plan.interval} automatically.
                  </p>
                </div>
              </div>
            </div>
          )}

          {license.status === 'past_due' && (
            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
              <p className="text-amber-900">
                Your last payment failed. Please update your payment method to avoid service interruption.
              </p>
            </div>
          )}
        </div>

        {/* Plan Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Current Plan</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-bold text-gray-900">{plan.name} Plan</p>
              <p className="text-gray-600">
                ${plan.price}/{plan.interval}
              </p>
            </div>
            <button
              onClick={handleManageBilling}
              disabled={isLoading}
              className="text-blue-600 font-medium hover:underline disabled:opacity-50"
            >
              Change Plan
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Included:</h3>
            <ul className="space-y-1">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/25</p>
              </div>
            </div>
            <button
              onClick={handleManageBilling}
              disabled={isLoading}
              className="text-blue-600 font-medium hover:underline disabled:opacity-50"
            >
              Update
            </button>
          </div>
        </div>

        {/* Manage Billing Button */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Billing Portal</h2>
          <p className="text-gray-600 mb-4">
            View invoices, update payment methods, change plans, or cancel your subscription.
          </p>
          <button
            onClick={handleManageBilling}
            disabled={isLoading}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              'Loading...'
            ) : (
              <>
                Manage Billing
                <ExternalLink className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Opens Stripe's secure billing portal
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/account" className="text-gray-600 hover:text-gray-900">
            ← Back to Account
          </Link>
        </div>
      </div>
    </div>
  );
}
