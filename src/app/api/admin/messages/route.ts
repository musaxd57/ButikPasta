import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const [messages, subscribers] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);
  return NextResponse.json({ messages, subscribers });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { id, handled } = await req.json();
  const message = await prisma.contactMessage.update({
    where: { id },
    data: { handled: !!handled },
  });
  return NextResponse.json({ message });
}
