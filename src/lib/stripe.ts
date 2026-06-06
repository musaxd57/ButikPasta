import Stripe from 'stripe';

// Lazily instantiate so the app builds without a key configured. Returns null
// when Stripe is not set up, letting callers gracefully fall back.
let stripeClient: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.startsWith('sk_test_xxx')) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(key, { apiVersion: '2025-02-24.acacia' });
  }
  return stripeClient;
}
