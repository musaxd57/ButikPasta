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
  toggleDecoration: (deco: DecorationKey) => void;
  setMessage: (message: string) => void;
  setFont: (font: FontKey) => void;
  setDelivery: (date: string | null, slot: string | null) => void;
  reset: () => void;
}

function buildTiers(count: number, existing: TierConfig[]): TierConfig[] {
  const tiers: TierConfig[] = [];
  for (let i = 0; i < count; i++) {
    tiers.push(
      existing[i] ?? { size: i === 0 ? 'medium' : 'small', flavor: 'vanilla' },
    );
  }
  return tiers;
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
          const tiers = s.config.tiers.map((t, i) =>
            i === index ? { ...t, ...patch } : t,
          );
          return { config: { ...s.config, tiers } };
        }),
      setFrosting: (frosting) =>
        set((s) => ({ config: { ...s.config, frosting } })),
      setFrostingColor: (frostingColor) =>
        set((s) => ({ config: { ...s.config, frostingColor } })),
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
    { name: 'atelier-cake-config' },
  ),
);

export type { SizeKey, FlavorKey };
