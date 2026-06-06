'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Loader2, Star } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

interface Review {
  id: string;
  author: string;
  rating: number;
  body: string;
  createdAt: string;
}

function Stars({
  value,
  onChange,
  size = 16,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          className={cn(onChange && 'cursor-pointer')}
        >
          <Star
            size={size}
            className={n <= value ? 'text-gold' : 'text-charcoal/20'}
            fill={n <= value ? 'currentColor' : 'none'}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewsClient() {
  const t = useTranslations('reviews');
  const locale = useLocale();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ author: '', email: '', rating: 5, body: '' });

  const load = () => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews ?? []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast(t('success'), 'success');
      setForm({ author: '', email: '', rating: 5, body: '' });
    } catch {
      toast(t('error'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-3">
      {/* Reviews list */}
      <div className="lg:col-span-2">
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="animate-spin text-gold" size={26} />
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-charcoal/50">{t('empty')}</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {reviews.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.05 }}
                className="card-lux p-6"
              >
                <Stars value={r.rating} />
                <p className="mt-4 text-sm leading-relaxed text-charcoal/75">
                  “{r.body}”
                </p>
                <p className="mt-4 font-serif text-lg text-gold-dark">
                  {r.author}
                </p>
                <p className="text-xs text-charcoal/40">
                  {new Date(r.createdAt).toLocaleDateString(
                    locale === 'tr' ? 'tr-TR' : 'en-US',
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Submit form */}
      <div>
        <form onSubmit={submit} className="card-lux sticky top-24 space-y-4 p-6">
          <h2 className="font-serif text-xl">{t('writeTitle')}</h2>
          <div>
            <label className="label-lux">{t('rating')}</label>
            <Stars
              value={form.rating}
              onChange={(v) => setForm({ ...form, rating: v })}
              size={24}
            />
          </div>
          <div>
            <label className="label-lux">{t('author')}</label>
            <input
              required
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="input-lux"
            />
          </div>
          <div>
            <label className="label-lux">{t('email')}</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-lux"
            />
          </div>
          <div>
            <label className="label-lux">{t('body')}</label>
            <textarea
              required
              rows={4}
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className="input-lux resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> {t('submitting')}
              </>
            ) : (
              t('submit')
            )}
          </button>
          <p className="text-center text-[0.7rem] text-charcoal/40">
            {t('moderationNote')}
          </p>
        </form>
      </div>
    </div>
  );
}
