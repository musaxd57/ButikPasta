'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { JOURNAL, JournalCategory } from '@/lib/content/journal';
import { pick } from '@/lib/i18nContent';
import { cn } from '@/lib/utils';

const CATEGORIES: (JournalCategory | 'all')[] = [
  'all',
  'trends',
  'guides',
  'behindscenes',
  'recipes',
];

export default function JournalList() {
  const t = useTranslations('journal');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('all');

  const posts =
    filter === 'all' ? JOURNAL : JOURNAL.filter((p) => p.category === filter);

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

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
            {t(`categories.${cat}`)}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ delay: (i % 3) * 0.06, duration: 0.45 }}
            >
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.cover}
                    alt={pick(post.title, locale)}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.15em] text-gold">
                    <span>{t(`categories.${post.category}`)}</span>
                    <span className="flex items-center gap-1 text-charcoal/40">
                      <Clock size={12} /> {post.readingMinutes} {tCommon('minRead')}
                    </span>
                  </div>
                  <h2 className="mt-2 font-serif text-xl leading-snug transition-colors group-hover:text-gold-dark">
                    {pick(post.title, locale)}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-charcoal/60">
                    {pick(post.excerpt, locale)}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-charcoal/40">
                    <span>{fmtDate(post.date)}</span>
                    <ArrowRight
                      size={15}
                      className="text-gold transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
