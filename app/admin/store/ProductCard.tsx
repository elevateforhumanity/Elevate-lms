"use client";

import React from 'react';
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  repo: string;
  stripe_product_id?: string;
  created_at?: string;
}

export default function ProductCard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cloning, setCloning] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await fetch('/api/store/products');
      const data = await res.json();
      setProducts(data || []);
    } catch (error: unknown) {
    // Error handled
  } finally {
      setLoading(false);
    }
  }

  async function cloneCodebase(productId: string) {
    setCloning(productId);
    try {
      const res = await fetch('/api/store/clone-codebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (data.ok) {
        alert(`Repository cloned successfully!\n\nNew repo: ${data.repo}`);
      } else {
        alert('Error: ' + (data.error || 'Failed to clone repository'));
      }
    } catch (error: unknown) {
      alert('Failed to clone repository');
    } finally {
      setCloning(null);
    }
  }

  if (loading) {
    return <div className="text-gray-500">Loading products...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-12 text-gray-500">
        No products yet. Create your first product above!
      </div>
    );
  }

  return (
    <>
      {products.map((p) => (
        <div
          key={p.id}
          className="border border-gray-200 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow space-y-3"
        >
          <h3 className="font-bold text-lg text-gray-900">{p.title}</h3>

          {p.description && (
            <p className="text-sm text-gray-600">{p.description}</p>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ${(p.price / 100).toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">USD</span>
          </div>

          <div className="text-xs text-gray-500">
            <span className="font-medium">Repo:</span> {p.repo}
          </div>

          <button
            onClick={() => cloneCodebase(p.id)}
            disabled={cloning === p.id}
            className="w-full p-2 bg-brand-blue-600 text-white rounded hover:bg-brand-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {cloning === p.id ? 'Cloning...' : 'Clone Codebase'}
          </button>
        </div>
      ))}
    </>
  );
}
