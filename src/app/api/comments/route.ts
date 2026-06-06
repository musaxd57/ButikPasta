import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Public: list approved comments for a post.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  if (!slug) return NextResponse.json({ comments: [] });

  const comments = await prisma.comment.findMany({
    where: { postSlug: slug, approved: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, author: true, body: true, createdAt: true },
  });
  return NextResponse.json({ comments });
}

const schema = z.object({
  postSlug: z.string().min(1).max(120),
  author: z.string().min(2).max(80),
  email: z.string().email(),
  body: z.string().min(3).max(1000),
});

// Public: submit a comment (held for moderation).
export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 });
    }
    await prisma.comment.create({
      data: {
        postSlug: parsed.data.postSlug,
        author: parsed.data.author,
        email: parsed.data.email.toLowerCase(),
        body: parsed.data.body,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[comments]', e);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
