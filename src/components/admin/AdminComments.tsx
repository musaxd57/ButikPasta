'use client';

import { useEffect, useState } from 'react';
import { Check, Loader2, Trash2, X } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface Comment {
  id: string;
  postSlug: string;
  author: string;
  email: string;
  body: string;
  approved: boolean;
  createdAt: string;
}

export default function AdminComments({ t }: { t: (k: string) => string }) {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch('/api/admin/comments')
      .then((r) => r.json())
      .then((d) => setComments(d.comments ?? []))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const setApproved = async (id: string, approved: boolean) => {
    setComments((p) => p.map((c) => (c.id === id ? { ...c, approved } : c)));
    const res = await fetch('/api/admin/comments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, approved }),
    });
    if (!res.ok) toast('Hata', 'error');
  };

  const remove = async (id: string) => {
    setComments((p) => p.filter((c) => c.id !== id));
    await fetch('/api/admin/comments', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
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
      <h2 className="mb-6 font-serif text-3xl">{t('commentsMod')}</h2>
      <div className="space-y-3">
        {comments.length === 0 && <p className="text-sm text-ivory/40">—</p>}
        {comments.map((c) => (
          <div
            key={c.id}
            className={`rounded-xl border p-4 ${
              c.approved
                ? 'border-emerald-500/20 bg-charcoal'
                : 'border-amber-500/30 bg-charcoal'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-ivory">{c.author}</p>
                <p className="text-xs text-ivory/40">
                  {c.email} · {c.postSlug}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setApproved(c.id, !c.approved)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    c.approved
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-ivory/10 text-ivory/50'
                  }`}
                >
                  {c.approved ? <Check size={15} /> : <X size={15} />}
                </button>
                <button
                  onClick={() => remove(c.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/10 text-rose"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-ivory/70">{c.body}</p>
            <p className="mt-2 text-[0.65rem] text-ivory/30">
              {c.approved ? t('published') : t('pending')} ·{' '}
              {new Date(c.createdAt).toLocaleDateString('tr-TR')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
