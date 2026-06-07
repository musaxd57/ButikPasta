import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { sendStatusUpdate } from '@/lib/email';

const VALID_STATUSES = [
  'PENDING',
  'IN_PROGRESS',
  'READY',
  'DELIVERED',
  'CANCELLED',
];

const VALID_PAYMENT_STATUSES = [
  'UNPAID',
  'DEPOSIT_PAID',
  'PAID',
  'REFUNDED',
];

// Update an order's fulfilment status and/or payment status (admin only).
// Payment status can be set here so manual payments (bank transfer, cash,
// WhatsApp) can be reconciled — Stripe orders are reconciled automatically by
// the webhook.
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  const data: { status?: string; paymentStatus?: string; depositPaid?: boolean } =
    {};

  if (body.status !== undefined) {
    if (!VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: 'invalid-status' }, { status: 400 });
    }
    data.status = body.status;
  }

  if (body.paymentStatus !== undefined) {
    if (!VALID_PAYMENT_STATUSES.includes(body.paymentStatus)) {
      return NextResponse.json(
        { error: 'invalid-payment-status' },
        { status: 400 },
      );
    }
    data.paymentStatus = body.paymentStatus;
    data.depositPaid =
      body.paymentStatus === 'PAID' || body.paymentStatus === 'DEPOSIT_PAID';
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: 'nothing-to-update' }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id: params.id },
    data,
  });

  // Notify the customer only when the fulfilment status actually changed.
  if (data.status) {
    await sendStatusUpdate({
      orderNumber: order.orderNumber,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      status: order.status,
      locale: (order.locale as 'tr' | 'en') ?? 'tr',
    });
  }

  return NextResponse.json({ order });
}
