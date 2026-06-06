'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from '@/i18n/routing';

export default function LogoutButton({ label }: { label: string }) {
  const router = useRouter();
  const logout = async () => {
    await fetch('/api/account/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };
  return (
    <button
      onClick={logout}
      className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-5 py-2 text-xs uppercase tracking-wider text-charcoal/60 transition hover:border-rose hover:text-rose"
    >
      <LogOut size={14} /> {label}
    </button>
  );
}
