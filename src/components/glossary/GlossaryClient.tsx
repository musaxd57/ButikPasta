'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { GLOSSARY } from '@/lib/content/glossary';
import { pick } from '@/lib/i18nContent';

export default function GlossaryClient() {
  const t = useTranslations('glossary');
  const locale = useLocale();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(locale === 'tr' ? 'tr' : 'en');
    if (!q) return GLOSSARY;
    return GLOSSARY.filter((entry) => {
      const term = pick(entry.term, locale).toLocaleLowerCase();
      const def = pick(entry.definition, locale).toLocaleLowerCase();
      return term.includes(q) || def.includes(q);
    });
  }, [query, locale]);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative mb-10">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="input-lux pl-11"
        />
      </div>

      <dl className="divide-y divide-charcoal/10">
        {filtered.map((entry, i) => (
          <div key={i} className="py-5">
            <dt className="font-serif text-xl text-charcoal">
              {pick(entry.term, locale)}
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-charcoal/65">
              {pick(entry.definition, locale)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
