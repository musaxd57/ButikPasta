'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { MENU, MenuCategory } from '@/lib/content/menu';
import { pick } from '@/lib/i18nContent';
import { formatPrice } from '@/lib/pricing';
import { cn } from '@/lib/utils';

const CATEGORIES: (MenuCategory | 'all')[] = [
  'all',
  'signature',
  'seasonal',
  'classic',
];

export default function MenuClient() {
  const t = useTranslations('menu');
  const locale = useLocale();
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('all');

  const items = filter === 'all' ? MENU : MENU.filter((i) => i.category === filter);

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
              className="group overflow-hidden rounded-2xl bg-white shadow-[0_4px_30px_rgba(26,26,26,0.05)]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={pick(item.name, locale)}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={`/menu/${item.id}`}
                    className="font-serif text-xl transition-colors hover:text-gold-dark"
                  >
                    {pick(item.name, locale)}
                  </Link>
                  <span className="shrink-0 font-serif text-lg text-gold-dark">
                    {formatPrice(item.price, locale)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-charcoal/60">
                  {pick(item.description, locale)}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[0.65rem] uppercase tracking-wider text-gold-dark"
                    >
                      {pick(tag, locale)}
                    </span>
                  ))}
                </div>
                <Link
                  href="/order"
                  className="mt-4 inline-block text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-dark"
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
