import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

// Stripe needs the raw, unparsed body to verify the signature, so this route
// must not run through any body parsing. The App Router gives us the raw text
// via req.text().
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Receives verified payment events from Stripe and reconciles order state.
// Configure the endpoint in the Stripe Dashboard → Developers → Webhooks,
// pointing at https://<your-domain>/api/webhooks/stripe and listening for
// `checkout.session.completed`. Copy the signing secret into
// STRIPE_WEBHOOK_SECRET.
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !secret) {
    return NextResponse.json(
      { error: 'stripe_not_configured' },
      { status: 400 },
    );
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'missing_signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (err) {
    console.error('[stripe webhook] signature verification failed', err);
    return NextResponse.json({ error: 'invalid_signature' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderNumber = session.metadata?.orderNumber;
      const paymentType = session.metadata?.paymentType;

      if (orderNumber && session.payment_status === 'paid') {
        await prisma.order.updateMany({
          where: { orderNumber },
          data: {
            paymentStatus: paymentType === 'deposit' ? 'DEPOSIT_PAID' : 'PAID',
            depositPaid: true,
          },
        });
      }
    }
  } catch (err) {
    console.error('[stripe webhook] handler error', err);
    // Return 200 anyway so Stripe doesn't retry indefinitely on a persistent
    // application error; the failure is logged for manual reconciliation.
  }

  return NextResponse.json({ received: true });
}
