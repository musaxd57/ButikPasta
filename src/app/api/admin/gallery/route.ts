import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ items });
}

const createSchema = z.object({
  imageUrl: z.string().url(),
  titleTr: z.string().min(1),
  titleEn: z.string().min(1),
  category: z.enum(['wedding', 'birthday', 'corporate', 'baby', 'custom']),
  priceRange: z.string().optional().or(z.literal('')),
  featured: z.boolean().optional(),
});

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const parsed = createSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
  const item = await prisma.galleryItem.create({
    data: {
      imageUrl: parsed.data.imageUrl,
      titleTr: parsed.data.titleTr,
      titleEn: parsed.data.titleEn,
      category: parsed.data.category,
      priceRange: parsed.data.priceRange || null,
      featured: parsed.data.featured ?? false,
    },
  });
  return NextResponse.json({ item });
}
