// Stripe Price ID Mapping
// After creating products in Stripe Dashboard, copy the Price IDs here
// Format: StoreProduct.id -> Stripe Price ID

export const STRIPE_PRICE_IDS: Record<string, string> = {
  "efh-core": process.env.STRIPE_PRICE_EFH_CORE || "price_Content_CORE",
  "efh-school-license": process.env.STRIPE_PRICE_SCHOOL || "price_Content_SCHOOL",
  "efh-enterprise": process.env.STRIPE_PRICE_ENTERPRISE || "price_Content_ENTERPRISE",
  "efh-monthly": process.env.STRIPE_PRICE_MONTHLY || "price_Content_MONTHLY",
};

// Helper to check if price IDs are configured
export function isPriceConfigured(productId: string): boolean {
  const priceId = STRIPE_PRICE_IDS[productId];
  return priceId !== undefined && !priceId.startsWith('price_Content');
}
