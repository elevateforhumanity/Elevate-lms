import { redirect } from 'next/navigation';

// Redirect to cart if no product specified
// Checkout requires a product slug: /store/checkout/[slug]
export default function CheckoutRedirect() {
  redirect('/store/cart');
}
