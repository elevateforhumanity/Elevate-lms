'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const removeItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const total = cartItems.reduce((sum: any, item: any) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-orange-600" />
          <h1 className="text-4xl font-black text-black">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-black mb-4">
              Your cart is empty
            </h2>
            <p className="text-black mb-8">
              Add items from the store to get started
            </p>
            <Link
              href="/store"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      {item.name}
                    </h3>
                    <p className="text-black">${item.price}</p>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-black">Total:</span>
                <span className="text-3xl font-black text-orange-600">
                  ${total}
                </span>
              </div>
              <p className="text-sm text-black">
                100% of proceeds support free training programs
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/store"
                className="inline-flex items-center justify-center gap-2 bg-gray-200 text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-300 transition"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </Link>
              <Link
                href="/store/checkout"
                className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition flex-1"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
