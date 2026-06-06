import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { setCustomerCookie } from '@/lib/customerAuth';

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  phone: z.string().max(40).optional().or(z.literal('')),
});

export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }
    const email = parsed.data.email.toLowerCase();

    const existing = await prisma.customer.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'exists' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    const customer = await prisma.customer.create({
      data: {
        email,
        passwordHash,
        name: parsed.data.name,
        phone: parsed.data.phone || null,
      },
    });

    setCustomerCookie(customer.id);
    return NextResponse.json({
      customer: { id: customer.id, email: customer.email, name: customer.name },
    });
  } catch (e) {
    console.error('[account/register]', e);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
