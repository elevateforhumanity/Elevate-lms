'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft, Plus, Minus } from 'lucide-react';
import { 
  getCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  type Cart,
  type CartItem 
} from '@/lib/store/cart';

export default function CartPage() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCart(getCart());
    setIsLoading(false);

    // Listen for cart updates from other components
    const handleCartUpdate = (e: CustomEvent<Cart>) => {
      setCart(e.detail);
    };

    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
    };
  }, []);

  const handleRemoveItem = (productId: string) => {
    const updatedCart = removeFromCart(productId);
    setCart(updatedCart);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    const updatedCart = updateQuantity(productId, newQuantity);
    setCart(updatedCart);
  };

  const handleClearCart = () => {
    const emptyCart = clearCart();
    setCart(emptyCart);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-48 mb-8" />
            <div className="space-y-4">
              <div className="h-24 bg-gray-200 rounded" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-orange-600" />
            <h1 className="text-4xl font-black text-black">Shopping Cart</h1>
          </div>
          {cart.items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-sm text-red-600 hover:text-red-700 underline"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.items.length === 0 ? (
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
              {cart.items.map((item: CartItem) => (
                <div
                  key={item.product.id}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center gap-4"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-black mb-1 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.product.digital ? 'Digital Download' : 'Physical Product'}
                    </p>
                    <div className="flex items-center gap-2">
                      {item.product.salePrice ? (
                        <>
                          <span className="text-orange-600 font-bold">
                            ${item.product.salePrice.toFixed(2)}
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            ${item.product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-black font-bold">
                          ${item.product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right min-w-[80px]">
                    <p className="text-lg font-bold text-black">
                      ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.product.id)}
                    className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Subtotal ({cart.itemCount} items)</span>
                <span className="text-black font-medium">
                  ${cart.total.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <span className="text-gray-600">Shipping</span>
                <span className="text-black font-medium">Calculated at checkout</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-black">Total:</span>
                <span className="text-3xl font-black text-orange-600">
                  ${cart.total.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-4">
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
