import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

async function guard() {
  return !!(await getServerSession(authOptions));
}

export async function GET() {
  if (!(await guard())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const comments = await prisma.comment.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ comments });
}

export async function PATCH(req: Request) {
  if (!(await guard())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id, approved } = await req.json();
  const comment = await prisma.comment.update({
    where: { id },
    data: { approved: !!approved },
  });
  return NextResponse.json({ comment });
}

export async function DELETE(req: Request) {
  if (!(await guard())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await req.json();
  await prisma.comment.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
