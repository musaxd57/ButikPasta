'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function ContactForm() {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.status === 429) {
        toast(tCommon('rateLimited'), 'error');
        return;
      }
      if (!res.ok) throw new Error();
      toast(t('success'), 'success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
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
          <input required value={form.name} onChange={set('name')} className="input-lux" />
        </div>
        <div>
          <label className="label-lux">{t('phone')}</label>
          <input value={form.phone} onChange={set('phone')} className="input-lux" />
        </div>
      </div>
      <div>
        <label className="label-lux">{t('email')}</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={set('email')}
          className="input-lux"
        />
      </div>
      <div>
        <label className="label-lux">{t('subject')}</label>
        <input value={form.subject} onChange={set('subject')} className="input-lux" />
      </div>
      <div>
        <label className="label-lux">{t('message')}</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={set('message')}
          className="input-lux resize-none"
        />
      </div>
      <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-60">
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> {t('sending')}
          </>
        ) : (
          <>
            <Send size={16} /> {t('send')}
          </>
        )}
      </button>
    </form>
  );
}
