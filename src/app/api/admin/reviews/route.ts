import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

async function guard() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET() {
  if (!(await guard())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ reviews });
}

export async function PATCH(req: Request) {
  if (!(await guard())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { id, approved } = await req.json();
  const review = await prisma.review.update({
    where: { id },
    data: { approved: !!approved },
  });
  return NextResponse.json({ review });
}

export async function DELETE(req: Request) {
  if (!(await guard())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { id } = await req.json();
  await prisma.review.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
