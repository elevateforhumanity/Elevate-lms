import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ChevronRight,
  Package,
  CheckCircle,
  Clock,
  Truck,
  Download,
  Eye,
  ShoppingBag,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Order History | Elevate Shop',
  description: 'View your order history and track shipments.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface Order {
  id: string;
  order_number: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items_count: number;
  created_at: string;
  tracking_number?: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export default async function OrderHistoryPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Database connection failed.</p>
        </div>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/shop/orders');

  // Sample orders
  const orders: Order[] = [
    {
      id: '1',
      order_number: 'ORD-2026-001234',
      status: 'delivered',
      total: 229.98,
      items_count: 2,
      created_at: '2026-01-10T10:30:00Z',
      items: [
        { name: 'Barbering Starter Kit', quantity: 1, price: 149.99 },
        { name: 'HVAC Study Guide Bundle', quantity: 1, price: 79.99 },
      ],
    },
    {
      id: '2',
      order_number: 'ORD-2026-001198',
      status: 'shipped',
      total: 89.99,
      items_count: 1,
      created_at: '2026-01-08T14:15:00Z',
      tracking_number: '1Z999AA10123456784',
      items: [
        { name: 'Professional Clipper Set', quantity: 1, price: 89.99 },
      ],
    },
    {
      id: '3',
      order_number: 'ORD-2025-001156',
      status: 'delivered',
      total: 45.00,
      items_count: 3,
      created_at: '2025-12-20T09:00:00Z',
      items: [
        { name: 'Study Flashcards', quantity: 3, price: 15.00 },
      ],
    },
  ];

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
      pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700', icon: Package },
      shipped: { label: 'Shipped', color: 'bg-purple-100 text-purple-700', icon: Truck },
      delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700', icon: CheckCircle },
      cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: Clock },
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/shop" className="hover:text-gray-700">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Orders</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-1">View and track your orders</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Order Header */}
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">{order.order_number}</p>
                        <p className="text-sm text-gray-500">Placed on {formatDate(order.created_at)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.color}`}>
                          <StatusIcon className="w-4 h-4" />
                          {statusConfig.label}
                        </span>
                        <span className="font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/shop/orders/${order.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-white"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Link>
                      {order.status === 'shipped' && order.tracking_number && (
                        <a
                          href={`https://www.ups.com/track?tracknum=${order.tracking_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
                        >
                          <Truck className="w-4 h-4" />
                          Track Package
                        </a>
                      )}
                      <button className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-white">
                        <Download className="w-4 h-4" />
                        Invoice
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">When you place orders, they will appear here.</p>
            <Link
              href="/shop/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
