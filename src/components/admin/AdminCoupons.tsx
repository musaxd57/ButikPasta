'use client';

import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

interface Coupon {
  id: string;
  code: string;
  type: string;
  value: number;
  active: boolean;
  minTotal: number;
  usageCount: number;
}

export default function AdminCoupons({ t }: { t: (k: string) => string }) {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ code: '', type: 'percent', value: 10, minTotal: 0 });

  const load = () => {
    fetch('/api/admin/coupons')
      .then((r) => r.json())
      .then((d) => setCoupons(d.coupons ?? []))
      .catch(() => setCoupons([]))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          // Clamp: percent coupons can't exceed 100%, nothing can be negative.
          value:
            form.type === 'percent'
              ? Math.min(100, Math.max(0, Number(form.value)))
              : Math.max(0, Number(form.value)),
          minTotal: Math.max(0, Number(form.minTotal)),
        }),
      });
      if (!res.ok) throw new Error();
      toast('Eklendi', 'success');
      setForm({ code: '', type: 'percent', value: 10, minTotal: 0 });
      load();
    } catch {
      toast('Hata / kod mevcut', 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (id: string, active: boolean) => {
    setCoupons((p) => p.map((c) => (c.id === id ? { ...c, active } : c)));
    await fetch('/api/admin/coupons', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, active }),
    });
  };

  const remove = async (id: string) => {
    if (!window.confirm('Silmek istediğinize emin misiniz?')) return;
    setCoupons((p) => p.filter((c) => c.id !== id));
    await fetch('/api/admin/coupons', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <div>
      <h2 className="mb-6 font-serif text-3xl">{t('coupons')}</h2>

      <form
        onSubmit={add}
        className="mb-8 grid gap-3 rounded-2xl border border-ivory/10 bg-charcoal p-5 sm:grid-cols-2 lg:grid-cols-5"
      >
        <input
          required
          placeholder="KOD"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
          className="admin-input uppercase"
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="admin-input"
        >
          <option value="percent">% indirim</option>
          <option value="fixed">₺ indirim</option>
        </select>
        <input
          type="number"
          placeholder="Değer"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
          className="admin-input"
        />
        <input
          type="number"
          placeholder="Min. tutar"
          value={form.minTotal}
          onChange={(e) => setForm({ ...form, minTotal: Number(e.target.value) })}
          className="admin-input"
        />
        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-charcoal disabled:opacity-60"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
          Ekle
        </button>
      </form>

      {loading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="animate-spin text-gold" size={26} />
        </div>
      ) : (
        <div className="space-y-2">
          {coupons.length === 0 && <p className="text-sm text-ivory/40">—</p>}
          {coupons.map((c) => (
            <div
              key={c.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ivory/10 bg-charcoal px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-gold">{c.code}</span>
                <span className="text-sm text-ivory/60">
                  {c.type === 'percent' ? `%${c.value}` : `₺${c.value}`}
                </span>
                {c.minTotal > 0 && (
                  <span className="text-xs text-ivory/40">min ₺{c.minTotal}</span>
                )}
                <span className="text-xs text-ivory/40">· {c.usageCount}x</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggle(c.id, !c.active)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium',
                    c.active
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-ivory/10 text-ivory/40',
                  )}
                >
                  {c.active ? t('active') : t('inactive')}
                </button>
                <button
                  onClick={() => remove(c.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/10 text-rose"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
