import { NextResponse } from 'next/server';
import { evaluateCoupon } from '@/lib/coupons';
import { enforceRateLimit } from '@/lib/rateLimit';

// Public coupon validation used by the checkout form.
export async function POST(req: Request) {
  // Throttle to stop attackers enumerating valid coupon codes.
  const limited = enforceRateLimit(req, 'coupon', 20, 60_000);
  if (limited) return limited;
  try {
    const { code, total } = await req.json();
    if (typeof code !== 'string' || typeof total !== 'number') {
      return NextResponse.json({ valid: false, reason: 'notfound' }, { status: 400 });
    }
    const result = await evaluateCoupon(code, total);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ valid: false, reason: 'notfound' }, { status: 500 });
  }
}
