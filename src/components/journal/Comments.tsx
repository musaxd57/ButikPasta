'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Loader2, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface Comment {
  id: string;
  author: string;
  body: string;
  createdAt: string;
}

export default function Comments({ slug }: { slug: string }) {
  const t = useTranslations('journal');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ author: '', email: '', body: '' });

  useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => setComments(d.comments ?? []))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [slug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, postSlug: slug }),
      });
      if (res.status === 429) {
        toast(tCommon('rateLimited'), 'error');
        return;
      }
      if (!res.ok) throw new Error();
      toast(t('commentSuccess'), 'success');
      setForm({ author: '', email: '', body: '' });
    } catch {
      toast(t('commentError'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US');

  return (
    <div className="mx-auto mt-16 max-w-2xl border-t border-charcoal/10 pt-12">
      <h2 className="flex items-center gap-2 font-serif text-2xl">
        <MessageSquare className="text-gold" size={22} />
        {t('commentsTitle')}
        {comments.length > 0 && (
          <span className="text-base text-charcoal/40">({comments.length})</span>
        )}
      </h2>

      {/* List */}
      <div className="mt-6 space-y-5">
        {loading ? (
          <Loader2 className="animate-spin text-gold" size={22} />
        ) : comments.length === 0 ? (
          <p className="text-sm text-charcoal/50">{t('commentEmpty')}</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="rounded-2xl bg-ivory-dark/60 p-5">
              <div className="flex items-center justify-between">
                <p className="font-serif text-lg text-charcoal">{c.author}</p>
                <span className="text-xs text-charcoal/40">{fmtDate(c.createdAt)}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{c.body}</p>
            </div>
          ))
        )}
      </div>

      {/* Form */}
      <form onSubmit={submit} className="card-lux mt-8 space-y-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label-lux">{t('commentName')}</label>
            <input
              required
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="input-lux"
            />
          </div>
          <div>
            <label className="label-lux">{t('commentEmail')}</label>
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
          <label className="label-lux">{t('commentBody')}</label>
          <textarea
            required
            rows={3}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className="input-lux resize-none"
          />
        </div>
        <button type="submit" disabled={submitting} className="btn-gold disabled:opacity-60">
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> {t('commentSubmitting')}
            </>
          ) : (
            t('commentSubmit')
          )}
        </button>
        <p className="text-xs text-charcoal/40">{t('commentModeration')}</p>
      </form>
    </div>
  );
}
