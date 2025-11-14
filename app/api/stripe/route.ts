import Stripe from 'stripe';

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2025-10-29.clover',
  });
  const body = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: body.items,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
  });

  return new Response(JSON.stringify({ id: session.id }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
