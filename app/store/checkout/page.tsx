import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  CreditCard,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Checkout | Elevate for Humanity',
  description: 'Complete your purchase securely.',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/store/checkout');
  }

  // Get cart items
  const { data: cartItems } = await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      product_id,
      product:products(id, name, price, type, slug)
    `)
    .eq('user_id', user.id);

  if (!cartItems || cartItems.length === 0) {
    redirect('/store/cart');
  }

  const subtotal = cartItems.reduce((sum: number, item: any) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/store/cart" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Secure Checkout</h2>
                  <p className="text-sm text-gray-500">Powered by Stripe</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                You will be redirected to Stripe&apos;s secure payment page to complete your purchase. 
                We never store your card details on our servers.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-900 mb-2">Payment Options Available:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Credit/Debit Cards (Visa, Mastercard, Amex)</li>
                  <li>• Buy Now, Pay Later (Klarna, Afterpay, Zip)</li>
                  <li>• Apple Pay / Google Pay</li>
                </ul>
              </div>

              {/* For single product checkout, use form POST to Stripe API */}
              {cartItems.length === 1 && cartItems[0].product?.slug ? (
                <form action="/api/stripe/checkout" method="POST">
                  <input type="hidden" name="productId" value={cartItems[0].product.slug} />
                  <input type="hidden" name="customerEmail" value={user.email || ''} />
                  
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors"
                  >
                    <Lock className="w-5 h-5" />
                    Proceed to Secure Payment - ${total.toFixed(2)}
                  </button>
                </form>
              ) : (
                /* For multiple items, use cart checkout API */
                <form action="/api/store/cart-checkout" method="POST">
                  <input type="hidden" name="customerEmail" value={user.email || ''} />
                  
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors"
                  >
                    <Lock className="w-5 h-5" />
                    Proceed to Secure Payment - ${total.toFixed(2)}
                  </button>
                </form>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                By completing this purchase, you agree to our{' '}
                <Link href="/terms" className="text-orange-600 hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-orange-600 hover:underline">Privacy Policy</Link>.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span className="text-sm">256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm">PCI Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm">Secure Payments</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product?.name || 'Product'} x {item.quantity}
                    </span>
                    <span>${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
