'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { Link, useRouter } from '@/i18n/routing';

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const t = useTranslations('account');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/account/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.error === 'credentials') setError(t('loginError'));
        else if (data.error === 'exists') setError(t('existsError'));
        else setError(t('genericError'));
        return;
      }
      router.push('/account');
      router.refresh();
    } catch {
      setError(t('genericError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="card-lux mx-auto w-full max-w-md space-y-4 p-8">
      <h1 className="text-center font-serif text-2xl">
        {mode === 'login' ? t('loginTitle') : t('registerTitle')}
      </h1>
      <p className="text-center text-sm text-charcoal/55">{t('subtitle')}</p>

      {mode === 'register' && (
        <div>
          <label className="label-lux">{t('name')}</label>
          <input required value={form.name} onChange={set('name')} className="input-lux" />
        </div>
      )}
      <div>
        <label className="label-lux">{t('email')}</label>
        <input required type="email" value={form.email} onChange={set('email')} className="input-lux" />
      </div>
      {mode === 'register' && (
        <div>
          <label className="label-lux">{t('phone')}</label>
          <input value={form.phone} onChange={set('phone')} className="input-lux" />
        </div>
      )}
      <div>
        <label className="label-lux">{t('password')}</label>
        <input
          required
          type="password"
          minLength={mode === 'register' ? 6 : undefined}
          value={form.password}
          onChange={set('password')}
          className="input-lux"
        />
      </div>

      {error && <p className="text-sm text-rose">{error}</p>}

      <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-60">
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {mode === 'login' ? t('loggingIn') : t('registering')}
          </>
        ) : mode === 'login' ? (
          t('login')
        ) : (
          t('register')
        )}
      </button>

      <p className="text-center text-sm text-charcoal/55">
        {mode === 'login' ? t('noAccount') : t('haveAccount')}{' '}
        <Link
          href={mode === 'login' ? '/account/register' : '/account/login'}
          className="font-medium text-gold-dark hover:underline"
        >
          {mode === 'login' ? t('createOne') : t('signIn')}
        </Link>
      </p>
    </form>
  );
}
