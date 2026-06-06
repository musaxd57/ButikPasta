import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

async function guard() {
  return !!(await getServerSession(authOptions));
}

export async function GET() {
  if (!(await guard())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ coupons });
}

const schema = z.object({
  code: z.string().min(2).max(40),
  type: z.enum(['percent', 'fixed']),
  value: z.number().positive(),
  minTotal: z.number().min(0).default(0),
});

export async function POST(req: Request) {
  if (!(await guard())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: 'invalid' }, { status: 400 });
  try {
    const coupon = await prisma.coupon.create({
      data: {
        code: parsed.data.code.trim().toUpperCase(),
        type: parsed.data.type,
        value: parsed.data.value,
        minTotal: parsed.data.minTotal,
      },
    });
    return NextResponse.json({ coupon });
  } catch {
    return NextResponse.json({ error: 'exists' }, { status: 409 });
  }
}

export async function PATCH(req: Request) {
  if (!(await guard())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id, active } = await req.json();
  const coupon = await prisma.coupon.update({ where: { id }, data: { active: !!active } });
  return NextResponse.json({ coupon });
}

export async function DELETE(req: Request) {
  if (!(await guard())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await req.json();
  await prisma.coupon.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
