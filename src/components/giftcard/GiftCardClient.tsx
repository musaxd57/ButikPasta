'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Gift, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { formatPrice } from '@/lib/pricing';
import { cn } from '@/lib/utils';

const AMOUNTS = [1000, 2500, 5000];

export default function GiftCardClient() {
  const t = useTranslations('giftcard');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const { toast } = useToast();
  const [amount, setAmount] = useState(2500);
  const [custom, setCustom] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    recipient: '',
    recipientEmail: '',
    from: '',
    message: '',
    email: '',
  });

  const finalAmount = custom ? Number(custom) : amount;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Number.isFinite(finalAmount) || finalAmount < 250) {
      toast(t('invalidAmount'), 'error');
      return;
    }
    setLoading(true);
    try {
      const composed = `[Gift Card] ${formatPrice(
        finalAmount,
        locale,
      )} → ${form.recipient} (${form.recipientEmail})\nFrom: ${form.from} (${form.email})\nMessage: ${form.message}`;
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.from || 'Gift Card',
          email: form.email,
          subject: 'Gift Card',
          message: composed,
        }),
      });
      if (res.status === 429) {
        toast(tCommon('rateLimited'), 'error');
        return;
      }
      if (!res.ok) throw new Error();
      toast(t('success'), 'success');
      setForm({ recipient: '', recipientEmail: '', from: '', message: '', email: '' });
      setCustom('');
    } catch {
      toast(t('error'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Preview card */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal to-charcoal-dark p-8 text-ivory shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />
          <Gift className="text-gold" size={32} />
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold">
            Atelier Cake
          </p>
          <p className="mt-1 font-serif text-2xl">{t('title')}</p>
          <p className="mt-8 font-serif text-5xl font-semibold text-gold">
            {formatPrice(finalAmount || 0, locale)}
          </p>
          {form.recipient && (
            <p className="mt-6 text-sm text-ivory/70">→ {form.recipient}</p>
          )}
          {form.message && (
            <p className="mt-1 text-sm italic text-ivory/50">“{form.message}”</p>
          )}
        </div>
        <p className="mt-4 text-center text-xs text-charcoal/45">{t('note')}</p>
      </div>

      {/* Form */}
      <form onSubmit={submit} className="card-lux space-y-5 p-6 md:p-8">
        <p className="text-sm text-charcoal/65">{t('lead')}</p>

        <div>
          <label className="label-lux">{t('amount')}</label>
          <div className="flex flex-wrap gap-2">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => {
                  setAmount(a);
                  setCustom('');
                }}
                className={cn(
                  'rounded-full border-2 px-5 py-2 text-sm transition',
                  !custom && amount === a
                    ? 'border-gold bg-gold/10 text-charcoal'
                    : 'border-charcoal/15 text-charcoal/60',
                )}
              >
                {formatPrice(a, locale)}
              </button>
            ))}
            <input
              type="number"
              min={250}
              step={50}
              placeholder={t('custom')}
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="w-32 rounded-full border-2 border-charcoal/15 px-4 py-2 text-sm focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-lux">{t('recipient')}</label>
            <input
              required
              value={form.recipient}
              onChange={(e) => setForm({ ...form, recipient: e.target.value })}
              className="input-lux"
            />
          </div>
          <div>
            <label className="label-lux">{t('recipientEmail')}</label>
            <input
              required
              type="email"
              value={form.recipientEmail}
              onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })}
              className="input-lux"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-lux">{t('from')}</label>
            <input
              required
              value={form.from}
              onChange={(e) => setForm({ ...form, from: e.target.value })}
              className="input-lux"
            />
          </div>
          <div>
            <label className="label-lux">{t('fromEmail')}</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-lux"
            />
          </div>
        </div>

        <div>
          <label className="label-lux">{t('messageLabel')}</label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="input-lux resize-none"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-60">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Gift size={16} />}
          {t('buy')}
        </button>
      </form>
    </div>
  );
}
