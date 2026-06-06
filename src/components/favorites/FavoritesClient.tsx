'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Heart, Trash2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Button from '@/components/ui/Button';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { useFavorites } from '@/store/favorites';
import { GALLERY } from '@/lib/data';
import { MENU } from '@/lib/content/menu';
import { pick } from '@/lib/i18nContent';
import { formatPrice } from '@/lib/pricing';

export default function FavoritesClient() {
  const t = useTranslations('favorites');
  const locale = useLocale();
  const { ids, clear } = useFavorites();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-64" />;
  }

  const designs = GALLERY.filter((g) => ids.includes(g.id));
  const flavors = MENU.filter((m) => ids.includes(m.id));
  const isEmpty = designs.length === 0 && flavors.length === 0;

  if (isEmpty) {
    return (
      <div className="mx-auto max-w-xl py-10 text-center">
        <Heart className="mx-auto text-rose/40" size={48} />
        <p className="mt-6 text-charcoal/60">{t('empty')}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/gallery" variant="gold">
            {t('browseGallery')}
          </Button>
          <Button href="/menu" variant="outline">
            {t('browseMenu')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-end">
        <button
          onClick={clear}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-charcoal/50 transition hover:text-rose"
        >
          <Trash2 size={14} /> {t('clear')}
        </button>
      </div>

      {designs.length > 0 && (
        <div>
          <h2 className="mb-6 font-serif text-2xl">{t('designs')}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {designs.map((g) => (
              <div key={g.id} className="group relative overflow-hidden rounded-2xl">
                <Link href={`/gallery/${g.id}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.imageUrl}
                    alt={pick({ tr: g.titleTr, en: g.titleEn }, locale)}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/80 to-transparent p-4">
                    <span className="font-serif text-base text-ivory">
                      {locale === 'tr' ? g.titleTr : g.titleEn}
                    </span>
                  </div>
                </Link>
                <FavoriteButton id={g.id} className="absolute right-3 top-3" />
              </div>
            ))}
          </div>
        </div>
      )}

      {flavors.length > 0 && (
        <div>
          <h2 className="mb-6 font-serif text-2xl">{t('flavors')}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {flavors.map((m) => (
              <div
                key={m.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <Link href={`/menu/${m.id}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.image}
                    alt={pick(m.name, locale)}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="font-serif text-lg">{pick(m.name, locale)}</h3>
                    <p className="text-sm text-gold-dark">
                      {formatPrice(m.price, locale)}
                    </p>
                  </div>
                </Link>
                <FavoriteButton id={m.id} className="absolute right-3 top-3" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
