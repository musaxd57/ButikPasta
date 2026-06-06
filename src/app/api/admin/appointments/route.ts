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
  const appointments = await prisma.appointment.findMany({
    orderBy: { date: 'asc' },
  });
  return NextResponse.json({ appointments });
}

const VALID = ['REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

export async function PATCH(req: Request) {
  if (!(await guard())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { id, status } = await req.json();
  if (!VALID.includes(status)) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json({ appointment });
}
