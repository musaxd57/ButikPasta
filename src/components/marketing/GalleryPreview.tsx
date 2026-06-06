'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { GALLERY } from '@/lib/data';

/** Compact gallery grid filtered by category, linking through to /gallery. */
export default function GalleryPreview({
  category,
  limit = 6,
}: {
  category?: string;
  limit?: number;
}) {
  const locale = useLocale();
  const items = (category
    ? GALLERY.filter((g) => g.category === category)
    : GALLERY
  ).slice(0, limit);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
        >
          <Link
            href="/gallery"
            className="group relative block overflow-hidden rounded-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={locale === 'tr' ? item.titleTr : item.titleEn}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/80 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="font-serif text-base text-ivory">
                {locale === 'tr' ? item.titleTr : item.titleEn}
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
