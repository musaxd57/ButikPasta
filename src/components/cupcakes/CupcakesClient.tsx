'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { CUPCAKES, CupcakeCategory } from '@/lib/content/cupcakes';
import { pick } from '@/lib/i18nContent';
import { formatPrice } from '@/lib/pricing';
import { cn } from '@/lib/utils';
import FavoriteButton from '@/components/ui/FavoriteButton';

const CATEGORIES: (CupcakeCategory | 'all')[] = [
  'all',
  'cupcake',
  'macaron',
  'cookie',
  'bite',
];

export default function CupcakesClient() {
  const t = useTranslations('cupcakes');
  const locale = useLocale();
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('all');

  const items =
    filter === 'all' ? CUPCAKES : CUPCAKES.filter((c) => c.category === filter);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              'rounded-full px-5 py-2 text-xs uppercase tracking-[0.15em] transition-all',
              filter === cat
                ? 'bg-charcoal text-ivory'
                : 'bg-white text-charcoal/60 hover:text-charcoal',
            )}
          >
            {t(cat)}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: (i % 3) * 0.05 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_4px_30px_rgba(26,26,26,0.05)]"
            >
              <FavoriteButton id={item.id} className="absolute right-3 top-3 z-10" />
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={pick(item.name, locale)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                  {t(item.category)}
                </p>
                <Link
                  href={`/cupcakes/${item.id}`}
                  className="mt-1 block font-serif text-lg transition-colors hover:text-gold-dark"
                >
                  {pick(item.name, locale)}
                </Link>
                <p className="mt-1.5 text-sm text-charcoal/60">
                  {pick(item.description, locale)}
                </p>
                <div className="mt-3 flex items-end justify-between">
                  <span className="text-xs text-charcoal/45">
                    {item.boxSize} {t('pieces')} / {t('perBox')}
                  </span>
                  <span className="font-serif text-lg text-gold-dark">
                    {formatPrice(item.pricePerBox, locale)}
                  </span>
                </div>
                <Link
                  href="/order"
                  className="mt-3 inline-block text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-dark"
                >
                  {t('order')} →
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
