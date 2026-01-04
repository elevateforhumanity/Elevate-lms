import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/utils/supabase/server';
import ProductApprovalActions from './ProductApprovalActions';


export default async function AdminProductsPage() {
  await requireAdmin();

  const supabase = await createClient();

  // Fetch all products with creator info
  const { data: products } = await supabase
    .from('marketplace_products')
    .select(
      `
      *,
      creator:marketplace_creators(display_name, payout_email)
    `
    )
    .order('created_at', { ascending: false });

  const pendingProducts =
    products?.filter(
      (p) => p.status === 'pending_review' || p.status === 'draft'
    ) || [];
  const approvedProducts =
    products?.filter((p) => p.status === 'approved') || [];
  const rejectedProducts =
    products?.filter((p) => p.status === 'rejected') || [];

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manage Products</h1>
        <p className="text-gray-600">
          Review and approve creator products before they go live
        </p>
      </div>

      {/* Pending Products */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Pending Review ({pendingProducts.length})
        </h2>

        {pendingProducts.length === 0 ? (
          <p className="text-gray-600">No products pending review.</p>
        ) : (
          <div className="space-y-4">
            {pendingProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 flex justify-between items-start"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by {product.creator?.display_name || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    {product.description || 'No description'}
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">
                      Price:{' '}
                      <strong>${(product.price_cents / 100).toFixed(2)}</strong>
                    </span>
                    {product.category && (
                      <span className="text-gray-600">
                        Category: <strong>{product.category}</strong>
                      </span>
                    )}
                    <span className="text-gray-600">
                      Status:{' '}
                      <strong className="text-yellow-600">
                        {product.status}
                      </strong>
                    </span>
                  </div>
                  {product.file_url && (
                    <div className="mt-2">
                      <a
                        href={product.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-blue-600 hover:underline text-sm"
                      >
                        View Product File →
                      </a>
                    </div>
                  )}
                </div>
                <ProductApprovalActions productId={product.id} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Products */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Approved Products ({approvedProducts.length})
        </h2>

        {approvedProducts.length === 0 ? (
          <p className="text-gray-600">No approved products yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approvedProducts.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 hover:shadow-md transition"
              >
                <h3 className="font-semibold mb-1">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  by {product.creator?.display_name || 'Unknown'}
                </p>
                <p className="text-lg font-bold text-brand-blue-600">
                  ${(product.price_cents / 100).toFixed(2)}
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="text-sm text-brand-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-sm text-brand-orange-600 hover:underline">
                    Archive
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rejected Products */}
      {rejectedProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">
            Rejected Products ({rejectedProducts.length})
          </h2>
          <div className="space-y-4">
            {rejectedProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 bg-red-50">
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">
                  by {product.creator?.display_name || 'Unknown'}
                </p>
                {product.rejection_reason && (
                  <p className="text-sm text-red-700 mt-2">
                    Reason: {product.rejection_reason}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
