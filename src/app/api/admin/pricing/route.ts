import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { DEFAULT_PRICING, type PricingTable } from '@/lib/pricing';
import { loadPricing, pricingToRows } from '@/lib/pricingStore';

// Admin: read the current pricing table (DB values merged over defaults).
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const pricing = await loadPricing();
  return NextResponse.json({ pricing });
}

// Coerces an arbitrary incoming value to a non-negative number, or falls back.
function num(v: unknown, fallback: number): number {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

// Builds a fully-validated PricingTable from the request body, defaulting any
// missing/invalid field to DEFAULT_PRICING so persisted data is always sane.
function sanitize(body: Partial<PricingTable> | undefined): PricingTable {
  const b = body ?? {};
  const d = DEFAULT_PRICING;
  const map = <T extends Record<string, number>>(
    incoming: Partial<T> | undefined,
    base: T,
  ): T => {
    const out = { ...base };
    (Object.keys(base) as (keyof T)[]).forEach((k) => {
      out[k] = num(incoming?.[k], base[k]) as T[keyof T];
    });
    return out;
  };
  return {
    base: num(b.base, d.base),
    tierSurcharge: num(b.tierSurcharge, d.tierSurcharge),
    size: map(b.size, d.size),
    flavor: map(b.flavor, d.flavor),
    frosting: map(b.frosting, d.frosting),
    decoration: map(b.decoration, d.decoration),
    sprinkles: num(b.sprinkles, d.sprinkles),
    candlePerUnit: num(b.candlePerUnit, d.candlePerUnit),
    message: num(b.message, d.message),
  };
}

// Admin: persist the pricing table to CakeOption (upsert per category+key).
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const table = sanitize(body?.pricing ?? body);
    const rows = pricingToRows(table);

    await prisma.$transaction(
      rows.map((r) =>
        prisma.cakeOption.upsert({
          where: { category_key: { category: r.category, key: r.key } },
          create: {
            category: r.category,
            key: r.key,
            nameTr: `${r.category}:${r.key}`,
            nameEn: `${r.category}:${r.key}`,
            priceModifier: r.value,
          },
          update: { priceModifier: r.value },
        }),
      ),
    );

    return NextResponse.json({ pricing: table });
  } catch (e) {
    console.error('[admin/pricing] PUT error', e);
    return NextResponse.json({ error: 'server' }, { status: 500 });
  }
}
