import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Public: list approved reviews.
export async function GET() {
  const reviews = await prisma.review.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  return NextResponse.json({ reviews });
}

const schema = z.object({
  author: z.string().min(2).max(80),
  email: z.string().email(),
  rating: z.number().min(1).max(5),
  body: z.string().min(10).max(1000),
});

// Public: submit a review (held for moderation).
export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }
    await prisma.review.create({
      data: {
        author: parsed.data.author,
        email: parsed.data.email.toLowerCase(),
        rating: parsed.data.rating,
        body: parsed.data.body,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[reviews] error', e);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
