import { prisma } from '@/lib/prisma';
import { DEFAULT_PRICING, type PricingTable } from '@/lib/pricing';
import type {
  DecorationKey,
  FlavorKey,
  FrostingKey,
  SizeKey,
} from '@/types/cake';

// Maps the flat CakeOption rows (category + key + priceModifier) onto the
// structured PricingTable, falling back to DEFAULT_PRICING for anything not
// overridden in the database.

function clone(table: PricingTable): PricingTable {
  return {
    base: table.base,
    tierSurcharge: table.tierSurcharge,
    size: { ...table.size },
    flavor: { ...table.flavor },
    frosting: { ...table.frosting },
    decoration: { ...table.decoration },
    sprinkles: table.sprinkles,
    candlePerUnit: table.candlePerUnit,
    message: table.message,
  };
}

export async function loadPricing(): Promise<PricingTable> {
  const table = clone(DEFAULT_PRICING);
  let rows: { category: string; key: string; priceModifier: number }[] = [];
  try {
    rows = await prisma.cakeOption.findMany({
      select: { category: true, key: true, priceModifier: true },
    });
  } catch {
    return table; // DB not ready → safe defaults
  }

  for (const row of rows) {
    const v = row.priceModifier;
    switch (row.category) {
      case 'base':
        table.base = v;
        break;
      case 'tier':
        table.tierSurcharge = v;
        break;
      case 'size':
        if (row.key in table.size) table.size[row.key as SizeKey] = v;
        break;
      case 'flavor':
        if (row.key in table.flavor) table.flavor[row.key as FlavorKey] = v;
        break;
      case 'frosting':
        if (row.key in table.frosting) table.frosting[row.key as FrostingKey] = v;
        break;
      case 'decoration':
        if (row.key in table.decoration)
          table.decoration[row.key as DecorationKey] = v;
        break;
      case 'extra':
        if (row.key === 'sprinkles') table.sprinkles = v;
        else if (row.key === 'candle') table.candlePerUnit = v;
        else if (row.key === 'message') table.message = v;
        break;
    }
  }
  return table;
}

// Flattens a PricingTable into [category, key, value] tuples for persistence.
export function pricingToRows(
  table: PricingTable,
): { category: string; key: string; value: number }[] {
  const rows: { category: string; key: string; value: number }[] = [
    { category: 'base', key: 'base', value: table.base },
    { category: 'tier', key: 'surcharge', value: table.tierSurcharge },
    { category: 'extra', key: 'sprinkles', value: table.sprinkles },
    { category: 'extra', key: 'candle', value: table.candlePerUnit },
    { category: 'extra', key: 'message', value: table.message },
  ];
  (Object.keys(table.size) as SizeKey[]).forEach((k) =>
    rows.push({ category: 'size', key: k, value: table.size[k] }),
  );
  (Object.keys(table.flavor) as FlavorKey[]).forEach((k) =>
    rows.push({ category: 'flavor', key: k, value: table.flavor[k] }),
  );
  (Object.keys(table.frosting) as FrostingKey[]).forEach((k) =>
    rows.push({ category: 'frosting', key: k, value: table.frosting[k] }),
  );
  (Object.keys(table.decoration) as DecorationKey[]).forEach((k) =>
    rows.push({ category: 'decoration', key: k, value: table.decoration[k] }),
  );
  return rows;
}
