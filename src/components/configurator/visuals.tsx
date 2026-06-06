'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from 'next-intl';
import { formatPrice } from '@/lib/pricing';
import type {
  DecorationKey,
  FlavorKey,
  FontKey,
  FrostingKey,
  SizeKey,
} from '@/types/cake';

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&q=70`;

// ── Visual metadata ────────────────────────────────────────────────────────

// Flavor sponge colours rendered as edible-looking radial swatches.
export const FLAVOR_VISUAL: Record<FlavorKey, string> = {
  vanilla: 'radial-gradient(circle at 35% 30%, #fbf1da, #e8d3a8 70%)',
  chocolate: 'radial-gradient(circle at 35% 30%, #7a4a2e, #3f2417 70%)',
  redvelvet: 'radial-gradient(circle at 35% 30%, #b23a3a, #6f1d1d 70%)',
  pistachio: 'radial-gradient(circle at 35% 30%, #cfe1ab, #9cbf72 70%)',
  lemon: 'radial-gradient(circle at 35% 30%, #fbec8f, #ecc94b 70%)',
};

// Frosting finishes — gradient/sheen conveys the texture of each.
export const FROSTING_VISUAL: Record<FrostingKey, string> = {
  buttercream:
    'linear-gradient(135deg, #fbf7ef 0%, #efe4cf 50%, #f7f0e2 100%)',
  whipped:
    'radial-gradient(circle at 30% 25%, #ffffff, #ece7df 80%)',
  ganache:
    'linear-gradient(135deg, #5b4232 0%, #2f2018 55%, #6b4d39 100%)',
  fondant:
    'linear-gradient(135deg, #f3ece1 0%, #e3d8c6 100%)',
};

// Decorations shown as real photo tiles (premium, tactile feel).
export const DECORATION_VISUAL: Record<
  DecorationKey,
  { type: 'image'; src: string } | { type: 'css'; bg: string }
> = {
  flowers: { type: 'image', src: unsplash('photo-1518895949257-7621c3c786d7') },
  macarons: { type: 'image', src: unsplash('photo-1569864358642-9d1684040f43') },
  berries: { type: 'image', src: unsplash('photo-1577003833619-76bbd7f82948') },
  drip: {
    type: 'css',
    bg: 'linear-gradient(180deg, #1a1a1a 0%, #1a1a1a 35%, #C9A84C 36%, #C9A84C 60%, #b8923a 100%)',
  },
  topper: {
    type: 'css',
    bg: 'radial-gradient(circle at 50% 40%, #f5e6b8, #C9A84C 60%, #a88a38)',
  },
};

// ── Components ──────────────────────────────────────────────────────────────

/** Circular swatch showing an actual colour/texture. Gold ring when selected. */
export function Swatch({
  background,
  label,
  price,
  selected,
  onClick,
  large,
}: {
  background: string;
  label?: string;
  price?: number;
  selected: boolean;
  onClick: () => void;
  large?: boolean;
}) {
  const locale = useLocale();
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex shrink-0 flex-col items-center gap-2"
    >
      <motion.span
        whileTap={{ scale: 0.9 }}
        className={cn(
          'relative flex items-center justify-center rounded-full shadow-inner transition-all duration-200',
          large ? 'h-16 w-16' : 'h-11 w-11',
          selected
            ? 'ring-2 ring-gold ring-offset-2 ring-offset-white scale-105'
            : 'ring-1 ring-charcoal/15 group-hover:ring-gold/60',
        )}
        style={{ background }}
      >
        {selected && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-charcoal shadow">
            <Check size={12} strokeWidth={3} />
          </span>
        )}
      </motion.span>
      {label && (
        <span
          className={cn(
            'text-center text-[0.7rem] leading-tight transition-colors',
            selected ? 'font-medium text-charcoal' : 'text-charcoal/55',
          )}
        >
          {label}
        </span>
      )}
      {typeof price === 'number' && price > 0 && (
        <span className="-mt-1 text-[0.6rem] font-medium text-gold-dark">
          +{formatPrice(price, locale)}
        </span>
      )}
    </button>
  );
}

/** Image/graphic tile with caption. Used for presets, decorations, fonts. */
export function VisualTile({
  visual,
  label,
  sublabel,
  price,
  selected,
  onClick,
  ratio = 'aspect-[4/3]',
}: {
  visual: React.ReactNode;
  label: string;
  sublabel?: string;
  price?: number;
  selected: boolean;
  onClick: () => void;
  ratio?: string;
}) {
  const locale = useLocale();
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border-2 bg-white text-left transition-all duration-200',
        selected
          ? 'border-gold shadow-[0_8px_30px_rgba(201,168,76,0.25)]'
          : 'border-transparent ring-1 ring-charcoal/10 hover:ring-gold/50',
      )}
    >
      <div className={cn('relative w-full overflow-hidden', ratio)}>
        {visual}
        {selected && (
          <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-charcoal shadow">
            <Check size={14} strokeWidth={3} />
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <div>
          <p className="text-sm font-medium leading-tight text-charcoal">
            {label}
          </p>
          {sublabel && (
            <p className="text-[0.7rem] text-charcoal/45">{sublabel}</p>
          )}
        </div>
        {typeof price === 'number' && price > 0 && (
          <span className="shrink-0 text-xs font-medium text-gold-dark">
            +{formatPrice(price, locale)}
          </span>
        )}
      </div>
    </motion.button>
  );
}

/** Photo / CSS visual block for a decoration. */
export function DecorationVisual({ deco }: { deco: DecorationKey }) {
  const v = DECORATION_VISUAL[deco];
  if (v.type === 'image') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={v.src}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    );
  }
  return <div className="h-full w-full" style={{ background: v.bg }} />;
}

/** Scaled cake silhouette for the size comparison. */
export function SizeSilhouette({
  size,
  selected,
}: {
  size: SizeKey;
  selected: boolean;
}) {
  const scale = size === 'small' ? 0.55 : size === 'medium' ? 0.78 : 1;
  return (
    <div className="flex h-full w-full items-end justify-center bg-gradient-to-b from-ivory to-ivory-dark pb-2">
      <div
        className="origin-bottom transition-transform"
        style={{ transform: `scale(${scale})` }}
      >
        <div
          className={cn(
            'relative rounded-t-md rounded-b-sm transition-colors',
            selected ? 'bg-gold' : 'bg-charcoal/25 group-hover:bg-gold/60',
          )}
          style={{ width: 72, height: 56 }}
        >
          <div
            className={cn(
              'absolute -top-2 left-1/2 h-3 w-10 -translate-x-1/2 rounded-full',
              selected ? 'bg-gold-light' : 'bg-charcoal/15',
            )}
          />
        </div>
        <div className="mx-auto h-1.5 w-24 rounded-full bg-charcoal/15" />
      </div>
    </div>
  );
}

/** Stacked-tier silhouette (1/2/3 tiers). */
export function TierSilhouette({
  count,
  selected,
}: {
  count: number;
  selected: boolean;
}) {
  const widths = [64, 48, 34];
  const color = selected ? 'bg-gold' : 'bg-charcoal/25 group-hover:bg-gold/60';
  return (
    <div className="flex h-full w-full flex-col items-center justify-end bg-gradient-to-b from-ivory to-ivory-dark pb-2">
      {Array.from({ length: count })
        .map((_, i) => count - 1 - i) // render top-to-bottom, widest at base
        .map((layer) => (
          <div
            key={layer}
            className={cn('rounded-sm transition-colors', color)}
            style={{ width: widths[layer], height: 18, marginTop: 2 }}
          />
        ))}
      <div className="mt-0.5 h-1.5 w-20 rounded-full bg-charcoal/15" />
    </div>
  );
}

/** Mini cake graphic with the live message rendered in the chosen font. */
export function FontPreview({
  font,
  text,
  selected,
}: {
  font: FontKey;
  text: string;
  selected: boolean;
}) {
  const fontClass =
    font === 'script'
      ? 'font-script text-2xl'
      : font === 'serif'
        ? 'font-serif italic text-lg'
        : 'font-sans uppercase tracking-widest text-sm';
  const sample = text.trim() || 'Aa';
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#fbf6ec] to-[#f1e7d4] px-3">
      <span
        className={cn(
          'max-w-full truncate transition-colors',
          fontClass,
          selected ? 'text-gold-dark' : 'text-charcoal/70',
        )}
      >
        {sample}
      </span>
    </div>
  );
}
