import type {
  CakeConfig,
  DecorationKey,
  FlavorKey,
  FrostingKey,
  PriceResult,
  SizeKey,
} from '@/types/cake';

// All prices in Turkish Lira (₺). The DEFAULT_PRICING table below is the
// fallback / seed; the admin "Menu & Pricing" panel can override every value
// in the database (CakeOption), and both the server (authoritative order total)
// and the client configurator (live estimate) read from that table.

export interface PricingTable {
  base: number;
  tierSurcharge: number; // per extra tier above the first
  size: Record<SizeKey, number>;
  flavor: Record<FlavorKey, number>;
  frosting: Record<FrostingKey, number>;
  decoration: Record<DecorationKey, number>;
  sprinkles: number;
  candlePerUnit: number;
  message: number;
}

export const DEFAULT_PRICING: PricingTable = {
  base: 850,
  tierSurcharge: 600,
  size: { small: 0, medium: 350, large: 750 },
  flavor: { vanilla: 0, chocolate: 120, lemon: 120, redvelvet: 200, pistachio: 320 },
  frosting: { buttercream: 0, whipped: 80, ganache: 180, fondant: 260 },
  decoration: { berries: 150, drip: 180, macarons: 260, flowers: 320, topper: 220 },
  sprinkles: 60,
  candlePerUnit: 15,
  message: 90,
};

// Backwards-compatible named exports (used for default price tags where a live
// table isn't threaded through). Prefer passing a PricingTable explicitly.
export const BASE_PRICE = DEFAULT_PRICING.base;
export const SIZE_PRICE = DEFAULT_PRICING.size;
export const FLAVOR_PRICE = DEFAULT_PRICING.flavor;
export const FROSTING_PRICE = DEFAULT_PRICING.frosting;
export const DECORATION_PRICE = DEFAULT_PRICING.decoration;

// Rough serving estimate per tier size (typical dessert-portion slices). Used
// to answer the question every cake customer asks: "how many people does it
// serve?" Summed across all tiers.
const SERVINGS_BY_SIZE: Record<SizeKey, number> = {
  small: 8,
  medium: 16,
  large: 30,
};

export function estimateServings(config: CakeConfig): number {
  return config.tiers.reduce(
    (sum, tier) => sum + SERVINGS_BY_SIZE[tier.size],
    0,
  );
}

export function calculatePrice(
  config: CakeConfig,
  pricing: PricingTable = DEFAULT_PRICING,
): PriceResult {
  const lines: PriceResult['lines'] = [];

  lines.push({ labelKey: 'price.base', amount: pricing.base });

  config.tiers.forEach((tier, index) => {
    const tierTotal = pricing.size[tier.size] + pricing.flavor[tier.flavor];
    if (tierTotal > 0) {
      lines.push({ labelKey: 'price.tier', amount: tierTotal });
    }
    if (index > 0) {
      lines.push({ labelKey: 'price.extraTier', amount: pricing.tierSurcharge });
    }
  });

  if (pricing.frosting[config.frosting] > 0) {
    lines.push({
      labelKey: 'price.frosting',
      amount: pricing.frosting[config.frosting],
    });
  }

  config.decorations.forEach((deco) => {
    lines.push({
      labelKey: `decoration.${deco}`,
      amount: pricing.decoration[deco],
    });
  });

  if (config.sprinkles) {
    lines.push({ labelKey: 'price.sprinkles', amount: pricing.sprinkles });
  }

  if (config.candles > 0) {
    lines.push({
      labelKey: 'price.candles',
      amount: config.candles * pricing.candlePerUnit,
    });
  }

  if (config.message.trim().length > 0) {
    lines.push({ labelKey: 'price.message', amount: pricing.message });
  }

  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  return { lines, total };
}

export function formatPrice(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(amount);
}
