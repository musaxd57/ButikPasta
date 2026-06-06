import { NextResponse } from 'next/server';
import { evaluateCoupon } from '@/lib/coupons';

// Public coupon validation used by the checkout form.
export async function POST(req: Request) {
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
