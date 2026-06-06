'use client';

import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminPanel() {
  const { status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-charcoal-dark">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
