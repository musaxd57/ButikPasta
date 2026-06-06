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

// Update an order's status (admin only).
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  if (!VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: 'invalid-status' }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id: params.id },
    data: { status: body.status },
  });

  // Notify the customer of the status change (no-op if email isn't configured).
  await sendStatusUpdate({
    orderNumber: order.orderNumber,
    customerEmail: order.customerEmail,
    customerName: order.customerName,
    status: order.status,
    locale: (order.locale as 'tr' | 'en') ?? 'tr',
  });

  return NextResponse.json({ order });
}
