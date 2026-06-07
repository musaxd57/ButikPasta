'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Loader2, Send } from 'lucide-react';
import { useToast } from './Toast';
import { cn } from '@/lib/utils';

/** Email capture form posting to /api/newsletter. */
export default function Newsletter({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const t = useTranslations('newsletter');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast(t('invalid'), 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });
      if (res.status === 429) {
        toast(tCommon('rateLimited'), 'error');
        return;
      }
      if (!res.ok) throw new Error();
      toast(t('success'), 'success');
      setEmail('');
    } catch {
      toast(t('error'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const dark = tone === 'dark';

  return (
    <form onSubmit={submit} className="mx-auto flex w-full max-w-md gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('placeholder')}
        className={cn(
          'w-full rounded-full px-5 py-3 text-sm outline-none transition',
          dark
            ? 'border border-charcoal/15 bg-white text-charcoal placeholder:text-charcoal/40 focus:border-gold'
            : 'border border-ivory/25 bg-white/5 text-ivory placeholder:text-ivory/40 focus:border-gold',
        )}
      />
      <button
        type="submit"
        disabled={loading}
        className="flex shrink-0 items-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-medium uppercase tracking-wider text-charcoal transition hover:bg-gold-light disabled:opacity-60"
      >
        {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
        <span className="hidden sm:inline">{t('cta')}</span>
      </button>
    </form>
  );
}
