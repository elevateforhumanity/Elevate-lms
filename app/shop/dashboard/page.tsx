import { Metadata } from 'next';
import Link from 'next/link';
import { ShoppingBag, DollarSign, Package, TrendingUp, Plus } from 'lucide-react';

export const metadata: Metadata = { title: 'Seller Dashboard | Elevate Shop' };

export default function ShopDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
          <Link href="/shop/seller/products/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
            <Plus className="w-4 h-4 mr-2" />Add Product
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <DollarSign className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">$1,234</p>
            <p className="text-gray-600 text-sm">Total Revenue</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Package className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-gray-600 text-sm">Products Listed</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <ShoppingBag className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">45</p>
            <p className="text-gray-600 text-sm">Total Orders</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <TrendingUp className="w-8 h-8 text-orange-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <p className="text-gray-600 text-sm">Avg Rating</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
          <p className="text-gray-600">No recent orders to display.</p>
        </div>
      </div>
    </div>
  );
}
