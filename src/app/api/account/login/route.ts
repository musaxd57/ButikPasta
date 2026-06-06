import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { setCustomerCookie } from '@/lib/customerAuth';
import { enforceRateLimit } from '@/lib/rateLimit';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  // Throttle login attempts to slow down credential brute-forcing.
  const limited = enforceRateLimit(req, 'login', 8, 60_000);
  if (limited) return limited;
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }
    const email = parsed.data.email.toLowerCase();
    const customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer) {
      return NextResponse.json({ error: 'credentials' }, { status: 401 });
    }
    const valid = await bcrypt.compare(parsed.data.password, customer.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'credentials' }, { status: 401 });
    }

    setCustomerCookie(customer.id);
    return NextResponse.json({
      customer: { id: customer.id, email: customer.email, name: customer.name },
    });
  } catch (e) {
    console.error('[account/login]', e);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
