import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

// Creates a Stripe Checkout session for a cake order. When Stripe isn't
// configured (no key), responds with a flag so the client can fall back to the
// manual confirmation / WhatsApp flow.
export async function POST(req: Request) {
  const stripe = getStripe();
  const { amount, paymentType, orderNumber, locale } = await req.json();

  if (!stripe) {
    return NextResponse.json({ stripeConfigured: false });
  }

  const chargeAmount =
    paymentType === 'deposit' ? Math.round(amount / 2) : amount;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'try',
          product_data: {
            name: `Atelier Cake · ${orderNumber}`,
          },
          unit_amount: chargeAmount * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/${locale}/order?success=1`,
    cancel_url: `${baseUrl}/${locale}/order?canceled=1`,
  });

  return NextResponse.json({ stripeConfigured: true, url: session.url });
}
