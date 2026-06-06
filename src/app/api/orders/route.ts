import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { orderSchema } from '@/lib/validation';
import { generateOrderNumber } from '@/lib/utils';
import { sendOrderConfirmation } from '@/lib/email';

// Create a new order from the configurator/checkout flow.
export async function POST(req: Request) {
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

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail.toLowerCase(),
        customerPhone: data.customerPhone,
        address: data.address,
        cakeConfig: data.cakeConfig,
        totalPrice: data.totalPrice,
        depositPaid: data.paymentType === 'deposit',
        paymentStatus: data.paymentType === 'deposit' ? 'DEPOSIT_PAID' : 'PAID',
        deliveryDate: new Date(data.deliveryDate),
        deliverySlot: data.deliverySlot,
        locale: data.locale,
        notes: data.notes || null,
      },
    });

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

    return NextResponse.json({ orderNumber: order.orderNumber });
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
