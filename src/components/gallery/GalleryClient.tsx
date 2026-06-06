'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { GALLERY, GALLERY_CATEGORIES, GalleryItemData } from '@/lib/data';
import { cn } from '@/lib/utils';
import FavoriteButton from '@/components/ui/FavoriteButton';

export default function GalleryClient() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const [filter, setFilter] = useState<string>('all');
  const [active, setActive] = useState<GalleryItemData | null>(null);

  const items =
    filter === 'all' ? GALLERY : GALLERY.filter((g) => g.category === filter);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32">
      <div className="text-center">
        <p className="eyebrow">Atelier Cake</p>
        <h1 className="section-title mt-2">{t('title')}</h1>
        <p className="mt-3 text-sm text-charcoal/55">{t('subtitle')}</p>
      </div>

      {/* Filters */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {GALLERY_CATEGORIES.map((cat) => (
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

      {/* Masonry */}
      {items.length === 0 ? (
        <p className="mt-20 text-center text-charcoal/50">{t('empty')}</p>
      ) : (
        <div className="masonry mt-12">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                onClick={() => setActive(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl"
              >
                <img
                  src={item.imageUrl}
                  alt={locale === 'tr' ? item.titleTr : item.titleEn}
                  loading="lazy"
                  className="w-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                    {t(item.category)}
                  </span>
                  <h3 className="font-serif text-lg text-ivory">
                    {locale === 'tr' ? item.titleTr : item.titleEn}
                  </h3>
                  <p className="text-xs text-ivory/70">{item.priceRange}</p>
                </div>
                <FavoriteButton id={item.id} className="absolute right-3 top-3" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Lightbox / detail */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-ivory md:grid-cols-2"
            >
              <img
                src={active.imageUrl}
                alt=""
                className="h-64 w-full object-cover md:h-full"
              />
              <div className="flex flex-col justify-center p-8">
                <span className="text-xs uppercase tracking-[0.2em] text-gold">
                  {t(active.category)}
                </span>
                <h2 className="mt-2 font-serif text-3xl">
                  {locale === 'tr' ? active.titleTr : active.titleEn}
                </h2>
                <div className="hairline my-5" />
                <p className="text-sm text-charcoal/60">{active.priceRange}</p>
                <Link
                  href="/configure"
                  className="btn-gold mt-8 w-fit"
                  onClick={() => setActive(null)}
                >
                  {t('orderSimilar')}
                </Link>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 rounded-full bg-charcoal/10 p-2 text-charcoal transition hover:bg-charcoal hover:text-ivory"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
