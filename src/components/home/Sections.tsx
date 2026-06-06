'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Quote } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { FEATURED, GALLERY, TESTIMONIALS } from '@/lib/data';

export function BrandStory() {
  const t = useTranslations('home');
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-20">
        <Reveal>
          <div
            className="aspect-[4/5] rounded-3xl bg-cover bg-center shadow-2xl"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=80')",
            }}
          />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="eyebrow">{t('storyLead')}</p>
          <h2 className="section-title mt-4">{t('storyTitle')}</h2>
          <div className="hairline my-6" />
          <p className="max-w-md text-base leading-relaxed text-charcoal/70">
            {t('storyBody')}
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold"
          >
            {t('readStory')}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function FeaturedCarousel() {
  const t = useTranslations('home');
  const tCat = useTranslations('gallery');
  const locale = useLocale();
  return (
    <section className="bg-charcoal py-24 text-ivory md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow">{t('featuredSub')}</p>
          <h2 className="section-title mt-3 text-ivory">
            {t('featuredTitle')}
          </h2>
          <div className="hairline mx-auto my-6" />
        </Reveal>

        <div className="mt-12 flex snap-x gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible">
          {FEATURED.map((cake, i) => (
            <Reveal
              key={cake.id}
              delay={i * 0.1}
              className="w-[80vw] shrink-0 snap-center sm:w-[60vw] md:w-auto"
            >
              <motion.div
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-2xl bg-charcoal-light"
              >
               <Link href={`/gallery/${cake.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${cake.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">
                    {tCat(cake.category)}
                  </p>
                  <h3 className="mt-2 font-serif text-xl">
                    {locale === 'tr' ? cake.titleTr : cake.titleEn}
                  </h3>
                  <p className="mt-1 text-sm text-ivory/50">{cake.priceRange}</p>
                </div>
               </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="btn-outline border-gold/50 text-gold"
          >
            {t('ctaGallery')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function InstaGrid() {
  const t = useTranslations('home');
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow">@ateliercake</p>
          <h2 className="section-title mt-3">{t('instaTitle')}</h2>
          <p className="mt-3 text-sm text-charcoal/55">{t('instaSub')}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {GALLERY.slice(0, 6).map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                className="group relative block aspect-square overflow-hidden rounded-xl"
              >
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.imageUrl}')` }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Star className="text-gold" size={22} />
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const t = useTranslations('home');
  const locale = useLocale();
  return (
    <section className="bg-charcoal-dark py-24 text-ivory md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <Quote className="mx-auto text-gold" size={36} />
          <h2 className="section-title mt-4 text-ivory">
            {t('testimonialsTitle')}
          </h2>
          <div className="hairline mx-auto my-6" />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.12}>
              <div className="flex h-full flex-col rounded-2xl border border-ivory/10 bg-charcoal-light/40 p-8">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: item.rating }).map((_, s) => (
                    <Star key={s} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 flex-1 text-sm leading-relaxed text-ivory/75">
                  “{locale === 'tr' ? item.textTr : item.textEn}”
                </p>
                <p className="mt-6 font-serif text-lg text-gold">
                  {item.author}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
