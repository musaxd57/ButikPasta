'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

// Localized 404 rendered within the public chrome (navbar/footer).
export default function LocaleNotFound() {
  const t = useTranslations('notFound');
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-ivory px-6 pt-24 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-gold">404</p>
      <h1 className="mt-4 font-serif text-4xl text-charcoal md:text-5xl">
        {t('title')}
      </h1>
      <p className="mt-3 max-w-md text-charcoal/60">{t('lead')}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-gold">
          {t('home')}
        </Link>
        <Link href="/gallery" className="btn-outline">
          {t('gallery')}
        </Link>
      </div>
    </section>
  );
}
