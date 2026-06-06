// Shared domain types for the cake configurator and orders.

export type Locale = 'tr' | 'en';

export type FlavorKey =
  | 'chocolate'
  | 'vanilla'
  | 'redvelvet'
  | 'pistachio'
  | 'lemon';

export type FrostingKey =
  | 'buttercream'
  | 'fondant'
  | 'whipped'
  | 'ganache';

export type DecorationKey =
  | 'flowers'
  | 'macarons'
  | 'berries'
  | 'drip'
  | 'topper';

export type SizeKey = 'small' | 'medium' | 'large';

export type FontKey = 'script' | 'serif' | 'modern';

export interface TierConfig {
  size: SizeKey;
  flavor: FlavorKey;
}

export interface CakeConfig {
  preset: string | null;
  tierCount: 1 | 2 | 3;
  tiers: TierConfig[];
  frosting: FrostingKey;
  frostingColor: string;
  decorations: DecorationKey[];
  dripColor: string;
  sprinkles: boolean;
  sprinkleColor: string;
  candles: number;
  boardColor: string;
  message: string;
  font: FontKey;
  deliveryDate: string | null; // ISO date
  deliverySlot: string | null;
}

export interface PriceBreakdownLine {
  labelKey: string;
  amount: number;
}

export interface PriceResult {
  lines: PriceBreakdownLine[];
  total: number;
}

export const DEFAULT_CONFIG: CakeConfig = {
  preset: null,
  tierCount: 1,
  tiers: [{ size: 'medium', flavor: 'vanilla' }],
  frosting: 'buttercream',
  frostingColor: '#FAF7F2',
  decorations: [],
  dripColor: '#C9A84C',
  sprinkles: false,
  sprinkleColor: '#C4896F',
  candles: 0,
  boardColor: '#e8e0d0',
  message: '',
  font: 'script',
  deliveryDate: null,
  deliverySlot: null,
};
