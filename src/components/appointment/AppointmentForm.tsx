'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { minDeliveryDate } from '@/lib/utils';

export default function AppointmentForm() {
  const t = useTranslations('appointment');
  const tCommon = useTranslations('common');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 2,
    occasion: '',
    note: '',
  });

  const minDate = minDeliveryDate().toISOString().split('T')[0];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, guests: Number(form.guests) }),
      });
      if (res.status === 429) {
        toast(tCommon('rateLimited'), 'error');
        return;
      }
      if (!res.ok) throw new Error();
      toast(t('success'), 'success');
      setForm({
        name: '',
        email: '',
        phone: '',
        date: '',
        guests: 2,
        occasion: '',
        note: '',
      });
    } catch {
      toast(t('error'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card-lux space-y-4 p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-lux">{t('name')}</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-lux"
          />
        </div>
        <div>
          <label className="label-lux">{t('phone')}</label>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-lux"
          />
        </div>
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label-lux">{t('date')}</label>
          <input
            required
            type="date"
            min={minDate}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="input-lux"
          />
        </div>
        <div>
          <label className="label-lux">{t('guests')}</label>
          <input
            type="number"
            min={1}
            max={6}
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
            className="input-lux"
          />
        </div>
      </div>
      <div>
        <label className="label-lux">{t('occasion')}</label>
        <input
          value={form.occasion}
          onChange={(e) => setForm({ ...form, occasion: e.target.value })}
          className="input-lux"
        />
      </div>
      <div>
        <label className="label-lux">{t('note')}</label>
        <textarea
          rows={3}
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="input-lux resize-none"
        />
      </div>
      <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-60">
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> {t('submitting')}
          </>
        ) : (
          t('submit')
        )}
      </button>
    </form>
  );
}
