import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public order-status lookup by order number. Returns only non-sensitive
// fields so anyone with their order number can check progress.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderNumber = (searchParams.get('orderNumber') || '').trim().toUpperCase();

  if (!orderNumber) {
    return NextResponse.json({ error: 'missing' }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    select: {
      orderNumber: true,
      status: true,
      paymentStatus: true,
      deliveryDate: true,
      deliverySlot: true,
      totalPrice: true,
      createdAt: true,
    },
  });

  if (!order) {
    return NextResponse.json({ found: false }, { status: 404 });
  }

  return NextResponse.json({ found: true, order });
}
