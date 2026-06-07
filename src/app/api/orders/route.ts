import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { orderSchema } from '@/lib/validation';
import { generateOrderNumber } from '@/lib/utils';
import { sendOrderConfirmation } from '@/lib/email';
import { evaluateCoupon } from '@/lib/coupons';
import { getCustomerId } from '@/lib/customerAuth';
import { enforceRateLimit } from '@/lib/rateLimit';
import { calculatePrice } from '@/lib/pricing';
import { loadPricing } from '@/lib/pricingStore';
import { DEFAULT_CONFIG, type CakeConfig } from '@/types/cake';

// Create a new order from the configurator/checkout flow.
export async function POST(req: Request) {
  const limited = enforceRateLimit(req, 'orders', 10, 60_000);
  if (limited) return limited;
  try {
    const body = await req.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'validation', issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const orderNumber = generateOrderNumber();

    // Recompute the price on the server from the submitted cake config using the
    // current (DB-backed) pricing table. Never trust the client's totalPrice —
    // this is the authoritative amount the customer is charged.
    let serverTotal = data.totalPrice;
    try {
      const config = { ...DEFAULT_CONFIG, ...(JSON.parse(data.cakeConfig) as CakeConfig) };
      const pricing = await loadPricing();
      serverTotal = calculatePrice(config, pricing).total;
    } catch {
      // Malformed config → fall back to the client total (still coupon-checked).
    }

    // Re-evaluate any coupon server-side so the discount can't be tampered with.
    let discount = 0;
    let appliedCode: string | null = null;
    if (data.couponCode) {
      const result = await evaluateCoupon(data.couponCode, serverTotal);
      if (result.valid && result.discount) {
        discount = result.discount;
        appliedCode = result.code ?? null;
      }
    }
    const finalTotal = Math.max(0, serverTotal - discount);
    const customerId = getCustomerId();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail.toLowerCase(),
        customerPhone: data.customerPhone,
        address: data.address,
        cakeConfig: data.cakeConfig,
        totalPrice: finalTotal,
        couponCode: appliedCode,
        discount,
        customerId,
        // Payment is NOT confirmed yet. It is marked paid only when Stripe
        // sends a verified `checkout.session.completed` webhook (see
        // /api/webhooks/stripe). This prevents an order being recorded as paid
        // when the customer abandons the Stripe page or pays nothing.
        depositPaid: false,
        paymentStatus: 'UNPAID',
        deliveryDate: new Date(data.deliveryDate),
        deliverySlot: data.deliverySlot,
        locale: data.locale,
        notes: data.notes || null,
      },
    });

    // Increment coupon usage after a successful order.
    if (appliedCode) {
      await prisma.coupon
        .update({
          where: { code: appliedCode },
          data: { usageCount: { increment: 1 } },
        })
        .catch(() => undefined);
    }

    // Fire-and-forget confirmation email.
    await sendOrderConfirmation({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      totalPrice: order.totalPrice,
      deliveryDate: new Date(order.deliveryDate).toLocaleDateString(
        data.locale === 'tr' ? 'tr-TR' : 'en-US',
      ),
      locale: data.locale,
    });

    // Return the server-authoritative total so the checkout charge can't be
    // tampered with on the client.
    return NextResponse.json({
      orderNumber: order.orderNumber,
      totalPrice: order.totalPrice,
    });
  } catch (e) {
    console.error('[orders] POST error', e);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}

// List orders (admin only).
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ orders });
}
