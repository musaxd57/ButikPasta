import type {
  CakeConfig,
  DecorationKey,
  FlavorKey,
  FrostingKey,
  PriceResult,
  SizeKey,
} from '@/types/cake';

// All prices in Turkish Lira (₺). Centralised so admin/menu management can
// later override these from the database without touching components.

export const BASE_PRICE = 850;

export const SIZE_PRICE: Record<SizeKey, number> = {
  small: 0,
  medium: 350,
  large: 750,
};

export const FLAVOR_PRICE: Record<FlavorKey, number> = {
  vanilla: 0,
  chocolate: 120,
  lemon: 120,
  redvelvet: 200,
  pistachio: 320,
};

export const FROSTING_PRICE: Record<FrostingKey, number> = {
  buttercream: 0,
  whipped: 80,
  ganache: 180,
  fondant: 260,
};

export const DECORATION_PRICE: Record<DecorationKey, number> = {
  berries: 150,
  drip: 180,
  macarons: 260,
  flowers: 320,
  topper: 220,
};

const TIER_SURCHARGE = 600; // per extra tier above the first

export function calculatePrice(config: CakeConfig): PriceResult {
  const lines: PriceResult['lines'] = [];

  lines.push({ labelKey: 'price.base', amount: BASE_PRICE });

  config.tiers.forEach((tier, index) => {
    const tierTotal = SIZE_PRICE[tier.size] + FLAVOR_PRICE[tier.flavor];
    if (tierTotal > 0) {
      lines.push({
        labelKey: 'price.tier',
        amount: tierTotal,
      });
    }
    if (index > 0) {
      lines.push({ labelKey: 'price.extraTier', amount: TIER_SURCHARGE });
    }
  });

  if (FROSTING_PRICE[config.frosting] > 0) {
    lines.push({
      labelKey: 'price.frosting',
      amount: FROSTING_PRICE[config.frosting],
    });
  }

  config.decorations.forEach((deco) => {
    lines.push({
      labelKey: `decoration.${deco}`,
      amount: DECORATION_PRICE[deco],
    });
  });

  if (config.message.trim().length > 0) {
    lines.push({ labelKey: 'price.message', amount: 90 });
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
