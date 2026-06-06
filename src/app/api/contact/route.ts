import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal('')),
  subject: z.string().max(120).optional().or(z.literal('')),
  message: z.string().min(5).max(2000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }
    const d = parsed.data;

    await prisma.contactMessage.create({
      data: {
        name: d.name,
        email: d.email.toLowerCase(),
        phone: d.phone || null,
        subject: d.subject || null,
        message: d.message,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[contact] error', e);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
