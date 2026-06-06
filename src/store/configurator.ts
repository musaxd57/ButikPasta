'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CakeConfig,
  DEFAULT_CONFIG,
  DecorationKey,
  FlavorKey,
  FontKey,
  FrostingKey,
  SizeKey,
  TierConfig,
} from '@/types/cake';

interface ConfiguratorState {
  config: CakeConfig;
  step: number;
  setStep: (step: number) => void;
  setPreset: (preset: string | null, tiers?: TierConfig[]) => void;
  setTierCount: (count: 1 | 2 | 3) => void;
  setTier: (index: number, patch: Partial<TierConfig>) => void;
  setFrosting: (frosting: FrostingKey) => void;
  setFrostingColor: (color: string) => void;
  setDripColor: (color: string) => void;
  setSprinkles: (on: boolean) => void;
  setSprinkleColor: (color: string) => void;
  setCandles: (count: number) => void;
  setBoardColor: (color: string) => void;
  toggleDecoration: (deco: DecorationKey) => void;
  setMessage: (message: string) => void;
  setFont: (font: FontKey) => void;
  setDelivery: (date: string | null, slot: string | null) => void;
  reset: () => void;
}

// Graduated default sizes per tier count, so a fresh multi-tier cake always
// looks like a proper tiered cake (wide base → narrow top). Flavours chosen by
// the user are preserved when the tier count changes.
const SIZE_BY_POSITION: Record<number, TierConfig['size'][]> = {
  1: ['medium'],
  2: ['large', 'medium'],
  3: ['large', 'medium', 'small'],
};

function buildTiers(count: number, existing: TierConfig[]): TierConfig[] {
  const sizes = SIZE_BY_POSITION[count] ?? SIZE_BY_POSITION[1];
  return sizes.map((size, i) => ({
    size,
    flavor: existing[i]?.flavor ?? 'vanilla',
  }));
}

const SIZE_RANK: Record<TierConfig['size'], number> = {
  small: 0,
  medium: 1,
  large: 2,
};
const RANK_SIZE: TierConfig['size'][] = ['small', 'medium', 'large'];

// Keeps tiers in a physically valid order: the base (index 0) is the widest and
// each tier above is the same size or smaller. `changed` is the tier the user
// just edited, so we respect their choice and adjust the others around it.
function enforceTierSizes(
  tiers: TierConfig[],
  changed: number,
): TierConfig[] {
  const out = tiers.map((t) => ({ ...t }));
  const target = SIZE_RANK[out[changed].size];

  // Tiers above must not be larger than the changed tier.
  let cap = target;
  for (let i = changed + 1; i < out.length; i++) {
    if (SIZE_RANK[out[i].size] > cap) out[i].size = RANK_SIZE[cap];
    else cap = SIZE_RANK[out[i].size];
  }
  // Tiers below must not be smaller than the changed tier.
  let floor = target;
  for (let i = changed - 1; i >= 0; i--) {
    if (SIZE_RANK[out[i].size] < floor) out[i].size = RANK_SIZE[floor];
    else floor = SIZE_RANK[out[i].size];
  }
  return out;
}

export const useConfigurator = create<ConfiguratorState>()(
  persist(
    (set) => ({
      config: DEFAULT_CONFIG,
      step: 0,
      setStep: (step) => set({ step }),
      setPreset: (preset, tiers) =>
        set((s) => ({
          config: {
            ...s.config,
            preset,
            ...(tiers
              ? { tiers, tierCount: tiers.length as 1 | 2 | 3 }
              : {}),
          },
        })),
      setTierCount: (count) =>
        set((s) => ({
          config: {
            ...s.config,
            tierCount: count,
            tiers: buildTiers(count, s.config.tiers),
          },
        })),
      setTier: (index, patch) =>
        set((s) => {
          let tiers = s.config.tiers.map((t, i) =>
            i === index ? { ...t, ...patch } : t,
          );
          // A real cake must taper upward: no tier may be wider than the tier
          // below it. When a size changes, gently push neighbours into a valid
          // bottom-to-top (large→small) order around the user's latest choice.
          if (patch.size) {
            tiers = enforceTierSizes(tiers, index);
          }
          return { config: { ...s.config, tiers } };
        }),
      setFrosting: (frosting) =>
        set((s) => ({ config: { ...s.config, frosting } })),
      setFrostingColor: (frostingColor) =>
        set((s) => ({ config: { ...s.config, frostingColor } })),
      setDripColor: (dripColor) =>
        set((s) => ({ config: { ...s.config, dripColor } })),
      setSprinkles: (sprinkles) =>
        set((s) => ({ config: { ...s.config, sprinkles } })),
      setSprinkleColor: (sprinkleColor) =>
        set((s) => ({ config: { ...s.config, sprinkleColor } })),
      setCandles: (candles) =>
        set((s) => ({
          config: { ...s.config, candles: Math.max(0, Math.min(12, candles)) },
        })),
      setBoardColor: (boardColor) =>
        set((s) => ({ config: { ...s.config, boardColor } })),
      toggleDecoration: (deco) =>
        set((s) => {
          const has = s.config.decorations.includes(deco);
          const decorations = has
            ? s.config.decorations.filter((d) => d !== deco)
            : [...s.config.decorations, deco];
          return { config: { ...s.config, decorations } };
        }),
      setMessage: (message) =>
        set((s) => ({ config: { ...s.config, message } })),
      setFont: (font) => set((s) => ({ config: { ...s.config, font } })),
      setDelivery: (deliveryDate, deliverySlot) =>
        set((s) => ({ config: { ...s.config, deliveryDate, deliverySlot } })),
      reset: () => set({ config: DEFAULT_CONFIG, step: 0 }),
    }),
    {
      name: 'atelier-cake-config',
      version: 2,
      // Ensure configs persisted before new fields existed get the defaults,
      // avoiding undefined/NaN when older data is rehydrated.
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<ConfiguratorState>;
        return {
          ...current,
          ...p,
          config: { ...DEFAULT_CONFIG, ...(p.config ?? {}) },
        };
      },
    },
  ),
);

export type { SizeKey, FlavorKey };
