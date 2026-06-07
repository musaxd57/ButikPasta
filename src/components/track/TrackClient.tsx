'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Loader2, Search } from 'lucide-react';
import { formatPrice } from '@/lib/pricing';
import { cn } from '@/lib/utils';

const STEPS = ['PENDING', 'IN_PROGRESS', 'READY', 'DELIVERED'] as const;

const PAYMENT_LABEL: Record<string, { tr: string; en: string; cls: string }> = {
  UNPAID: { tr: 'Ödenmedi', en: 'Unpaid', cls: 'bg-rose/10 text-rose' },
  DEPOSIT_PAID: {
    tr: 'Kapora Alındı',
    en: 'Deposit Paid',
    cls: 'bg-amber-500/15 text-amber-600',
  },
  PAID: { tr: 'Ödendi', en: 'Paid', cls: 'bg-emerald-500/15 text-emerald-600' },
  REFUNDED: {
    tr: 'İade Edildi',
    en: 'Refunded',
    cls: 'bg-charcoal/10 text-charcoal/60',
  },
};

interface OrderStatus {
  orderNumber: string;
  status: string;
  paymentStatus?: string;
  deliveryDate: string;
  deliverySlot: string;
  totalPrice: number;
}

export default function TrackClient() {
  const t = useTranslations('track');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [notFound, setNotFound] = useState(false);

  const runSearch = useCallback(async (raw: string) => {
    const q = raw.trim();
    if (!q) return;
    setLoading(true);
    setNotFound(false);
    setOrder(null);
    try {
      const res = await fetch(
        `/api/track?orderNumber=${encodeURIComponent(q)}`,
      );
      if (!res.ok) {
        setNotFound(true);
        return;
      }
      const data = await res.json();
      if (data.found) setOrder(data.order);
      else setNotFound(true);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-search when arriving with ?order=NUMBER (e.g. from the account page).
  useEffect(() => {
    const prefill = searchParams.get('order');
    if (prefill) {
      setValue(prefill.toUpperCase());
      runSearch(prefill);
    }
  }, [searchParams, runSearch]);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(value);
  };

  const currentIndex = order
    ? STEPS.indexOf(order.status as (typeof STEPS)[number])
    : -1;
  const cancelled = order?.status === 'CANCELLED';

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={search} className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          placeholder={t('placeholder')}
          className="input-lux flex-1 font-mono uppercase tracking-wider"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-gold shrink-0 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Search size={16} />
          )}
          {loading ? t('searching') : t('button')}
        </button>
      </form>

      {notFound && (
        <p className="mt-6 rounded-xl bg-rose/10 px-4 py-3 text-center text-sm text-rose">
          {t('notFound')}
        </p>
      )}

      {order && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-lux mt-8 p-6 md:p-8"
        >
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-charcoal/10 pb-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-charcoal/45">
                {t('orderNumber')}
              </p>
              <p className="font-mono text-lg text-gold-dark">{order.orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-charcoal/45">
                {t('amount')}
              </p>
              <p className="font-serif text-lg">
                {formatPrice(order.totalPrice, locale)}
              </p>
              {order.paymentStatus && PAYMENT_LABEL[order.paymentStatus] && (
                <span
                  className={cn(
                    'mt-1 inline-block rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium',
                    PAYMENT_LABEL[order.paymentStatus].cls,
                  )}
                >
                  {locale === 'tr'
                    ? PAYMENT_LABEL[order.paymentStatus].tr
                    : PAYMENT_LABEL[order.paymentStatus].en}
                </span>
              )}
            </div>
          </div>

          <p className="mt-5 text-sm text-charcoal/60">
            {t('deliveryDate')}:{' '}
            <span className="text-charcoal">
              {new Date(order.deliveryDate).toLocaleDateString(
                locale === 'tr' ? 'tr-TR' : 'en-US',
              )}{' '}
              · {order.deliverySlot}
            </span>
          </p>

          {/* Timeline */}
          {cancelled ? (
            <p className="mt-6 rounded-xl bg-rose/10 px-4 py-3 text-center text-sm text-rose">
              {t('timeline.CANCELLED')}
            </p>
          ) : (
            <div className="mt-8 flex items-center justify-between">
              {STEPS.map((step, i) => {
                const done = i <= currentIndex;
                const active = i === currentIndex;
                return (
                  <div key={step} className="flex flex-1 flex-col items-center">
                    <div className="flex w-full items-center">
                      {i > 0 && (
                        <div
                          className={cn(
                            'h-0.5 flex-1',
                            i <= currentIndex ? 'bg-gold' : 'bg-charcoal/15',
                          )}
                        />
                      )}
                      <div
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all',
                          done
                            ? 'border-gold bg-gold text-charcoal'
                            : 'border-charcoal/20 text-charcoal/30',
                          active && 'scale-110 shadow-[0_0_0_4px_rgba(201,168,76,0.2)]',
                        )}
                      >
                        {done ? <Check size={15} /> : i + 1}
                      </div>
                      {i < STEPS.length - 1 && (
                        <div
                          className={cn(
                            'h-0.5 flex-1',
                            i < currentIndex ? 'bg-gold' : 'bg-charcoal/15',
                          )}
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        'mt-2 text-center text-[0.65rem] uppercase tracking-wider',
                        active ? 'text-gold-dark' : 'text-charcoal/45',
                      )}
                    >
                      {t(`timeline.${step}`)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
