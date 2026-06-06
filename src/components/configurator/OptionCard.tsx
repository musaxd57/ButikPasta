'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/pricing';
import { useLocale } from 'next-intl';

export default function OptionCard({
  label,
  sublabel,
  price,
  active,
  onClick,
  swatch,
}: {
  label: string;
  sublabel?: string;
  price?: number;
  active: boolean;
  onClick: () => void;
  swatch?: string;
}) {
  const locale = useLocale();
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'relative flex items-center justify-between gap-3 rounded-xl border p-4 text-left transition-all',
        active
          ? 'border-gold bg-gold/10 shadow-[0_4px_20px_rgba(201,168,76,0.18)]'
          : 'border-charcoal/12 bg-white hover:border-gold/50',
      )}
    >
      <div className="flex items-center gap-3">
        {swatch && (
          <span
            className="h-7 w-7 shrink-0 rounded-full border border-charcoal/10 shadow-inner"
            style={{ background: swatch }}
          />
        )}
        <div>
          <p className="text-sm font-medium text-charcoal">{label}</p>
          {sublabel && (
            <p className="text-xs text-charcoal/45">{sublabel}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {typeof price === 'number' && price > 0 && (
          <span className="text-xs font-medium text-gold-dark">
            +{formatPrice(price, locale)}
          </span>
        )}
        {active && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-charcoal">
            <Check size={13} />
          </span>
        )}
      </div>
    </motion.button>
  );
}
