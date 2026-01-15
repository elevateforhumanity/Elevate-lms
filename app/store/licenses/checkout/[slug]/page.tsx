'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductBySlug } from '@/app/data/store-products';
import { ArrowLeft, Lock, CheckCircle, AlertCircle, CreditCard, Building2, User, Mail, Phone, Shield } from 'lucide-react';
import Link from 'next/link';

// Check if Stripe is configured
const isStripeConfigured = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// Demo mode checkout form (no Stripe required)
function DemoCheckoutForm({
  product,
  customerInfo,
  onSuccess,
}: {
  product: any;
  customerInfo: any;
  onSuccess: () => void;
}) {
  const [processing, setProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Always succeed in demo mode
    onSuccess();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Demo Mode Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900">Demo Mode</p>
            <p className="text-sm text-blue-700">This is a demonstration. No real payment will be processed. Use any card details.</p>
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
              placeholder="123"
              maxLength={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={processing}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Complete Purchase - ${(product.price / 100).toLocaleString()}
          </>
        )}
      </button>

      <p className="text-xs text-center text-gray-500">
        Demo mode - no real charges. In production, payments are securely processed by Stripe.
      </p>
    </form>
  );
}

export default function LicenseCheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
  });
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');

  useEffect(() => {
    const slug = params.slug as string;
    const foundProduct = getProductBySlug(slug);

    if (!foundProduct) {
      router.push('/store/licenses');
      return;
    }

    setProduct(foundProduct);
    setLoading(false);
  }, [params.slug, router]);

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSuccess = () => {
    setStep('success');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // Success State
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase, {customerInfo.contactName || 'valued customer'}!
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <h2 className="font-bold text-gray-900 mb-4">Order Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product</span>
                  <span className="font-medium">{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Organization</span>
                  <span className="font-medium">{customerInfo.organizationName || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{customerInfo.email}</span>
                </div>
                <div className="flex justify-between border-t pt-3 mt-3">
                  <span className="text-gray-900 font-bold">Total Paid</span>
                  <span className="text-green-600 font-bold text-xl">${(product.price / 100).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-bold text-blue-900 mb-2">What&apos;s Next?</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>You&apos;ll receive a confirmation email with your license key</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Our team will contact you within 24 hours for onboarding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Access to documentation and support portal</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/store"
                className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
              >
                Back to Store
              </Link>
              <Link
                href="/lms/dashboard"
                className="px-6 py-3 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50 transition"
              >
                Go to Dashboard
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-8">
              Order ID: DEMO-{Date.now().toString(36).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/store/licenses"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Licenses
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="border-b pb-6 mb-6">
              <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="font-medium text-gray-900">Includes:</h4>
              <ul className="space-y-2">
                {product.features?.slice(0, 5).map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${(product.price / 100).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total</span>
                <span className="text-green-600">${(product.price / 100).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            {step === 'info' ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Your Information
                </h2>

                <form onSubmit={handleInfoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={customerInfo.organizationName}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            organizationName: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Your School or Organization"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={customerInfo.contactName}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            contactName: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="John Smith"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            email: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="john@organization.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            phone: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2 mt-6"
                  >
                    Continue to Payment
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
                  <button
                    onClick={() => setStep('info')}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Edit Info
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600">
                    <strong>{customerInfo.contactName}</strong> • {customerInfo.email}
                  </p>
                  <p className="text-sm text-gray-600">{customerInfo.organizationName}</p>
                </div>

                <DemoCheckoutForm
                  product={product}
                  customerInfo={customerInfo}
                  onSuccess={handlePaymentSuccess}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
