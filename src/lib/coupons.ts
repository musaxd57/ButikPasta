import { prisma } from './prisma';

export interface CouponResult {
  valid: boolean;
  reason?: 'notfound' | 'inactive' | 'expired' | 'min';
  code?: string;
  discount?: number;
  minTotal?: number;
}

/**
 * Validates a coupon code against an order total and returns the computed
 * discount (never more than the total). Shared by the public validate endpoint
 * and the order-creation flow so the discount can't be tampered with.
 */
export async function evaluateCoupon(
  rawCode: string,
  total: number,
): Promise<CouponResult> {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { valid: false, reason: 'notfound' };

  const coupon = await prisma.coupon.findUnique({ where: { code } });
  if (!coupon) return { valid: false, reason: 'notfound' };
  if (!coupon.active) return { valid: false, reason: 'inactive' };
  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    return { valid: false, reason: 'expired' };
  }
  if (total < coupon.minTotal) {
    return { valid: false, reason: 'min', minTotal: coupon.minTotal };
  }

  const raw =
    coupon.type === 'percent' ? (total * coupon.value) / 100 : coupon.value;
  const discount = Math.min(Math.round(raw), total);

  return { valid: true, code: coupon.code, discount, minTotal: coupon.minTotal };
}
