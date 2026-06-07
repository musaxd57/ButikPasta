'use client';

import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2, Star } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface GalleryItem {
  id: string;
  imageUrl: string;
  titleTr: string;
  titleEn: string;
  category: string;
  priceRange: string | null;
  featured: boolean;
}

const CATEGORIES = ['wedding', 'birthday', 'corporate', 'baby', 'custom'];

const EMPTY = {
  imageUrl: '',
  titleTr: '',
  titleEn: '',
  category: 'wedding',
  priceRange: '',
  featured: false,
};

export default function AdminGallery({ t }: { t: (k: string) => string }) {
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ ...EMPTY });

  const load = () => {
    fetch('/api/admin/gallery')
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast('Eklendi', 'success');
      setForm({ ...EMPTY });
      load();
    } catch {
      toast('Hata', 'error');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm('Silmek istediğinize emin misiniz?')) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
    const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    toast(res.ok ? 'Silindi' : 'Hata', res.ok ? 'success' : 'error');
  };

  return (
    <div>
      <h2 className="mb-6 font-serif text-3xl">{t('galleryMgmt')}</h2>

      {/* Add form */}
      <form
        onSubmit={add}
        className="mb-8 grid gap-3 rounded-2xl border border-ivory/10 bg-charcoal p-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <input
          required
          placeholder="Görsel URL (https://...)"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="admin-input lg:col-span-3"
        />
        <input
          required
          placeholder="Başlık (TR)"
          value={form.titleTr}
          onChange={(e) => setForm({ ...form, titleTr: e.target.value })}
          className="admin-input"
        />
        <input
          required
          placeholder="Title (EN)"
          value={form.titleEn}
          onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
          className="admin-input"
        />
        <input
          placeholder="Fiyat aralığı (₺...)"
          value={form.priceRange}
          onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
          className="admin-input"
        />
        <div className="flex gap-2">
          {CATEGORIES.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setForm({ ...form, category: c })}
              className={`rounded-full px-3 py-1 text-xs ${
                form.category === c ? 'bg-gold text-charcoal' : 'bg-ivory/10 text-ivory/60'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-ivory/70">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="accent-gold"
          />
          Öne çıkar
        </label>
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
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="animate-spin text-gold" size={26} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((g) => (
            <div
              key={g.id}
              className="group relative overflow-hidden rounded-xl border border-ivory/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.imageUrl} alt={g.titleEn} className="aspect-square w-full object-cover" />
              {g.featured && (
                <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-charcoal">
                  <Star size={12} fill="currentColor" />
                </span>
              )}
              <button
                onClick={() => remove(g.id)}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-charcoal/70 text-rose opacity-0 transition group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </button>
              <div className="p-2 text-xs">
                <p className="truncate text-ivory/80">{g.titleTr}</p>
                <p className="text-ivory/40">{g.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
