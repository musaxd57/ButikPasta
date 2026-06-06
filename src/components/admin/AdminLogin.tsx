'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Loader2, Lock } from 'lucide-react';

export default function AdminLogin() {
  const t = useTranslations('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) setError(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal-dark px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-ivory/10 bg-charcoal-light p-8"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
            <Lock size={20} />
          </div>
          <h1 className="mt-4 font-serif text-2xl text-ivory">
            {t('loginTitle')}
          </h1>
        </div>

        <label className="mb-1.5 block text-xs uppercase tracking-wider text-ivory/50">
          {t('email')}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full rounded-xl border border-ivory/15 bg-charcoal px-4 py-3 text-sm text-ivory focus:border-gold focus:outline-none"
        />

        <label className="mb-1.5 block text-xs uppercase tracking-wider text-ivory/50">
          {t('password')}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-2 w-full rounded-xl border border-ivory/15 bg-charcoal px-4 py-3 text-sm text-ivory focus:border-gold focus:outline-none"
        />

        {error && (
          <p className="mb-2 text-xs text-rose">{t('loginError')}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-gold mt-4 w-full disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            t('login')
          )}
        </button>

        <p className="mt-4 text-center text-[0.65rem] text-ivory/30">
          demo · admin@ateliercake.com / atelier2024
        </p>
      </form>
    </div>
  );
}
