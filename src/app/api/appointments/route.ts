import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  phone: z.string().min(7).max(40),
  date: z.string(),
  guests: z.number().min(1).max(20),
  occasion: z.string().max(120).optional().or(z.literal('')),
  note: z.string().max(1000).optional().or(z.literal('')),
});

// Public: request a tasting / consultation appointment.
export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }
    const d = parsed.data;
    await prisma.appointment.create({
      data: {
        name: d.name,
        email: d.email.toLowerCase(),
        phone: d.phone,
        date: new Date(d.date),
        guests: d.guests,
        occasion: d.occasion || null,
        note: d.note || null,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[appointments] error', e);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
