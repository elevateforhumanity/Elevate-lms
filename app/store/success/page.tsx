'use client';

import React from 'react';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Download, Mail, ArrowRight } from 'lucide-react';
import { getDigitalProduct } from '@/lib/store/digital-products';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const productSlug = searchParams.get('product');
    if (productSlug) {
      const foundProduct = getDigitalProduct(productSlug);
      setProduct(foundProduct);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h1 className="text-4xl font-bold text-black mb-2">
            Payment Successful!
          </h1>
          <p className="text-xl text-black">Thank you for your purchase</p>
        </div>

        {/* Order Details */}
        {product && (
          <div className="bg-white rounded-lg p-8 border border-slate-200 mb-6">
            <h2 className="text-2xl font-bold text-black mb-4">
              {product.name}
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Mail
                  className="text-brand-orange-600 flex-shrink-0 mt-1"
                  size={20}
                />
                <div>
                  <p className="font-semibold text-black">
                    Check Your Email
                  </p>
                  <p className="text-sm text-black">
                    We've sent your purchase confirmation and download link to
                    your email address.
                  </p>
                </div>
              </div>

              {product.deliveryType === 'download' && product.downloadUrl && (
                <div className="flex items-start gap-3">
                  <Download
                    className="text-brand-orange-600 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-black">Download Now</p>
                    <p className="text-sm text-black mb-2">
                      Your download is ready. Click below to get your files.
                    </p>
                    <a
                      href={product.downloadUrl}
                      className="inline-flex items-center gap-2 bg-brand-orange-600 hover:bg-brand-orange-700 text-white font-bold px-6 py-2 rounded-lg transition"
                    >
                      <Download size={18} />
                      Download {product.name}
                    </a>
                  </div>
                </div>
              )}

              {product.deliveryType === 'access' && (
                <div className="flex items-start gap-3">
                  <ArrowRight
                    className="text-brand-orange-600 flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-black">
                      Access Your Course
                    </p>
                    <p className="text-sm text-black mb-2">
                      Your course access has been activated. Login to get
                      started.
                    </p>
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 bg-brand-orange-600 hover:bg-brand-orange-700 text-white font-bold px-6 py-2 rounded-lg transition"
                    >
                      Login to Access Course
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h3 className="font-semibold text-black mb-3">
                What's Included:
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle
                      className="text-green-600 flex-shrink-0 mt-0.5"
                      size={16}
                    />
                    <span className="text-sm text-black">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-black mb-3">What Happens Next?</h3>
          <ol className="space-y-2 text-sm text-black">
            <li className="flex gap-2">
              <span className="font-bold">1.</span>
              <span>Check your email for the receipt and download link</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">2.</span>
              <span>Download your files or access your course</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">3.</span>
              <span>Need help? Contact support@www.elevateforhumanity.org</span>
            </li>
          </ol>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/store"
            className="flex-1 text-center bg-white hover:bg-slate-50 text-black font-bold px-6 py-3 rounded-lg border-2 border-slate-300 transition"
          >
            Browse More Products
          </Link>
          <Link
            href="/"
            className="flex-1 text-center bg-brand-orange-600 hover:bg-brand-orange-700 text-white font-bold px-6 py-3 rounded-lg transition"
          >
            Return to Homepage
          </Link>
        </div>

        {/* Support */}
        <div className="mt-8 text-center text-sm text-black">
          <p>Questions about your purchase?</p>
          <p>
            Email us at{' '}
            <a
              href="mailto:support@www.elevateforhumanity.org"
              className="text-brand-orange-600 hover:underline"
            >
              support@www.elevateforhumanity.org
            </a>{' '}
            or call{' '}
            <a
              href="tel:3173143757"
              className="text-brand-orange-600 hover:underline"
            >
              (317) 314-3757
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange-600" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
