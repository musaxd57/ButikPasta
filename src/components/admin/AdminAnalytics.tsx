'use client';

import { useMemo } from 'react';
import { formatPrice } from '@/lib/pricing';

interface Order {
  totalPrice: number;
  status: string;
  createdAt: string;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Beklemede',
  IN_PROGRESS: 'Hazırlanıyor',
  READY: 'Hazır',
  DELIVERED: 'Teslim',
  CANCELLED: 'İptal',
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#f59e0b',
  IN_PROGRESS: '#3b82f6',
  READY: '#8b5cf6',
  DELIVERED: '#10b981',
  CANCELLED: '#f43f5e',
};

export default function AdminAnalytics({
  orders,
  t,
}: {
  orders: Order[];
  t: (k: string) => string;
}) {
  // Revenue grouped by the last 6 months.
  const monthly = useMemo(() => {
    const now = new Date();
    const buckets: { label: string; total: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = d.toLocaleDateString('tr-TR', { month: 'short' });
      const total = orders
        .filter((o) => {
          const od = new Date(o.createdAt);
          return (
            od.getFullYear() === d.getFullYear() &&
            od.getMonth() === d.getMonth() &&
            o.status !== 'CANCELLED'
          );
        })
        .reduce((s, o) => s + o.totalPrice, 0);
      buckets.push({ label, total });
    }
    return buckets;
  }, [orders]);

  const maxRevenue = Math.max(1, ...monthly.map((m) => m.total));

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const o of orders) counts[o.status] = (counts[o.status] ?? 0) + 1;
    return counts;
  }, [orders]);

  const totalOrders = orders.length || 1;

  return (
    <div>
      <h2 className="mb-6 font-serif text-3xl">{t('analytics')}</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue bar chart */}
        <div className="rounded-2xl border border-ivory/10 bg-charcoal p-6">
          <h3 className="mb-6 text-sm uppercase tracking-wider text-ivory/50">
            {t('revenue6m')}
          </h3>
          <div className="flex h-48 items-end justify-between gap-3">
            {monthly.map((m, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[0.6rem] text-ivory/40">
                  {m.total > 0 ? `${Math.round(m.total / 1000)}k` : ''}
                </span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-gold-dark to-gold transition-all"
                  style={{
                    height: `${Math.max(4, (m.total / maxRevenue) * 100)}%`,
                  }}
                />
                <span className="text-[0.65rem] uppercase text-ivory/50">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Status distribution */}
        <div className="rounded-2xl border border-ivory/10 bg-charcoal p-6">
          <h3 className="mb-6 text-sm uppercase tracking-wider text-ivory/50">
            {t('statusDist')}
          </h3>
          <div className="space-y-4">
            {Object.keys(STATUS_LABELS).map((status) => {
              const count = statusCounts[status] ?? 0;
              const pct = Math.round((count / totalOrders) * 100);
              return (
                <div key={status}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-ivory/70">{STATUS_LABELS[status]}</span>
                    <span className="text-ivory/40">
                      {count} · %{pct}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-ivory/10">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: STATUS_COLORS[status],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
