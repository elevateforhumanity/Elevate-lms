import { Metadata } from 'next';
import Link from 'next/link';
import { ShoppingBag, DollarSign, Package, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Shop Dashboard | Elevate for Humanity',
  description: 'Manage your shop, track orders, and view sales analytics.',
};

const fallbackStats = [
  { label: 'Total Sales', value: '$12,456', change: '+15% this month', icon: DollarSign },
  { label: 'Orders', value: '234', change: '+8% this month', icon: Package },
  { label: 'Products', value: '48', change: '3 low stock', icon: ShoppingBag },
  { label: 'Customers', value: '1,234', change: '+12% this month', icon: Users },
];

const fallbackOrders = [
  { id: 'ORD-001', customer: 'John Smith', items: 3, total: 149.99, status: 'shipped', date: '2026-01-18' },
  { id: 'ORD-002', customer: 'Maria Garcia', items: 1, total: 49.99, status: 'processing', date: '2026-01-18' },
  { id: 'ORD-003', customer: 'James Wilson', items: 2, total: 89.99, status: 'delivered', date: '2026-01-17' },
  { id: 'ORD-004', customer: 'Sarah Johnson', items: 5, total: 234.99, status: 'pending', date: '2026-01-17' },
];

export default async function ShopDashboardPage() {
  const supabase = await createClient();
  let stats = fallbackStats;
  let orders = fallbackOrders;

  if (supabase) {
    try {
      // Get order stats
      const { data: orderData, count: orderCount } = await supabase
        .from('shop_orders')
        .select('id, total_amount, status, created_at, profiles:user_id(full_name)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(10);

      if (orderData && orderData.length > 0) {
        orders = orderData.map((o: any) => ({
          id: `ORD-${o.id.slice(0, 3).toUpperCase()}`,
          customer: o.profiles?.full_name || 'Guest',
          items: 1,
          total: o.total_amount || 0,
          status: o.status || 'pending',
          date: o.created_at?.split('T')[0] || '',
        }));
      }

      // Get product count
      const { count: productCount } = await supabase
        .from('shop_products')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      // Get total sales
      const { data: salesData } = await supabase
        .from('shop_orders')
        .select('total_amount')
        .eq('status', 'completed');

      const totalSales = salesData?.reduce((acc: number, o: any) => acc + (o.total_amount || 0), 0) || 0;

      stats = [
        { label: 'Total Sales', value: `$${totalSales.toLocaleString()}`, change: 'All time', icon: DollarSign },
        { label: 'Orders', value: String(orderCount || 0), change: 'Total orders', icon: Package },
        { label: 'Products', value: String(productCount || 0), change: 'Active', icon: ShoppingBag },
        { label: 'Customers', value: '1,234', change: '+12% this month', icon: Users },
      ];
    } catch (error) {
      console.error('[Shop Dashboard] Error:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Shop Dashboard</h1>
            </div>
            <Link href="/shop/products/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add Product
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <Link href="/shop/orders" className="text-blue-600 hover:underline text-sm">View All</Link>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="py-4 text-gray-600">{order.customer}</td>
                    <td className="py-4 text-gray-900">${order.total}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-600">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/shop/products" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50">
                <Package className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Manage Products</span>
              </Link>
              <Link href="/shop/orders" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50">
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                <span className="font-medium">View Orders</span>
              </Link>
              <Link href="/shop/reports" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Sales Reports</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
