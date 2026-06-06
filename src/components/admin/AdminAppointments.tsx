'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  occasion: string | null;
  note: string | null;
  status: string;
}

const STATUSES = ['REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
const COLOR: Record<string, string> = {
  REQUESTED: 'bg-amber-500/15 text-amber-400',
  CONFIRMED: 'bg-blue-500/15 text-blue-400',
  COMPLETED: 'bg-emerald-500/15 text-emerald-400',
  CANCELLED: 'bg-rose-500/15 text-rose-400',
};

export default function AdminAppointments({ t }: { t: (k: string) => string }) {
  const { toast } = useToast();
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/appointments')
      .then((r) => r.json())
      .then((d) => setItems(d.appointments ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const update = async (id: string, status: string) => {
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    const res = await fetch('/api/admin/appointments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) toast('Hata', 'error');
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
      <h2 className="mb-6 font-serif text-3xl">{t('appointments')}</h2>
      {items.length === 0 ? (
        <p className="text-sm text-ivory/40">—</p>
      ) : (
        <div className="space-y-3">
          {items.map((a) => (
            <div key={a.id} className="rounded-xl border border-ivory/10 bg-charcoal p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ivory">{a.name}</p>
                  <p className="text-xs text-ivory/45">
                    {a.email} · {a.phone}
                  </p>
                </div>
                <select
                  value={a.status}
                  onChange={(e) => update(a.id, e.target.value)}
                  className={cn(
                    'rounded-full border-0 px-3 py-1 text-xs font-medium outline-none',
                    COLOR[a.status],
                  )}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s} className="bg-charcoal text-ivory">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ivory/60">
                <span>
                  {new Date(a.date).toLocaleDateString('tr-TR')} · {a.guests} kişi
                </span>
                {a.occasion && <span>{a.occasion}</span>}
              </div>
              {a.note && <p className="mt-2 text-sm text-ivory/70">{a.note}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
