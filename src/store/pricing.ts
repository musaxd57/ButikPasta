'use client';

import { create } from 'zustand';
import { DEFAULT_PRICING, type PricingTable } from '@/lib/pricing';

// Client-side cache of the admin-managed pricing table. Defaults to the static
// table and upgrades to the live DB values once /api/pricing responds, so the
// configurator estimate matches what the server will actually charge.
interface PricingState {
  pricing: PricingTable;
  loaded: boolean;
  fetchPricing: () => void;
}

let inflight = false;

export const usePricing = create<PricingState>((set, get) => ({
  pricing: DEFAULT_PRICING,
  loaded: false,
  fetchPricing: () => {
    if (inflight || get().loaded) return;
    inflight = true;
    fetch('/api/pricing')
      .then((r) => r.json())
      .then((d) => {
        if (d?.pricing) set({ pricing: d.pricing, loaded: true });
      })
      .catch(() => {})
      .finally(() => {
        inflight = false;
      });
  },
}));
