'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2, Star, Trash2, X } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface Review {
  id: string;
  author: string;
  email: string;
  rating: number;
  body: string;
  approved: boolean;
  createdAt: string;
}

export default function AdminReviews({ t }: { t: (k: string) => string }) {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch('/api/admin/reviews')
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews ?? []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const setApproved = async (id: string, approved: boolean) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, approved } : r)),
    );
    const res = await fetch('/api/admin/reviews', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, approved }),
    });
    if (!res.ok) toast('Hata', 'error');
  };

  const remove = async (id: string) => {
    if (!window.confirm('Silmek istediğinize emin misiniz?')) return;
    setReviews((prev) => prev.filter((r) => r.id !== id));
    const res = await fetch('/api/admin/reviews', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    toast(res.ok ? 'Silindi' : 'Hata', res.ok ? 'success' : 'error');
  };

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={26} />
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 font-serif text-3xl">{t('reviewsMod')}</h2>
      <div className="space-y-3">
        {reviews.length === 0 && (
          <p className="text-sm text-ivory/40">—</p>
        )}
        {reviews.map((r) => (
          <div
            key={r.id}
            className={`rounded-xl border p-4 ${
              r.approved
                ? 'border-emerald-500/20 bg-charcoal'
                : 'border-amber-500/30 bg-charcoal'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-ivory">{r.author}</p>
                  <span className="flex">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={12} className="text-gold" fill="currentColor" />
                    ))}
                  </span>
                </div>
                <p className="text-xs text-ivory/40">{r.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setApproved(r.id, !r.approved)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    r.approved
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-ivory/10 text-ivory/50'
                  }`}
                  title={r.approved ? t('unpublish') : t('publish')}
                >
                  {r.approved ? <Check size={15} /> : <X size={15} />}
                </button>
                <button
                  onClick={() => remove(r.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/10 text-rose"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-ivory/70">{r.body}</p>
            <p className="mt-2 text-[0.65rem] text-ivory/30">
              {r.approved ? t('published') : t('pending')} ·{' '}
              {new Date(r.createdAt).toLocaleDateString('tr-TR')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
