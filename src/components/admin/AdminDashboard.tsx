'use client';

import { useEffect, useMemo, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import {
  LayoutDashboard,
  ShoppingBag,
  ImageIcon,
  Settings,
  LogOut,
  Loader2,
  TrendingUp,
  Clock,
  CheckCircle,
  BarChart3,
  Inbox,
  Star,
  CalendarDays,
} from 'lucide-react';
import { formatPrice } from '@/lib/pricing';
import {
  BASE_PRICE,
  DECORATION_PRICE,
  FLAVOR_PRICE,
  FROSTING_PRICE,
} from '@/lib/pricing';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';
import AdminGallery from './AdminGallery';
import AdminMessages from './AdminMessages';
import AdminAnalytics from './AdminAnalytics';
import AdminReviews from './AdminReviews';
import AdminAppointments from './AdminAppointments';
import OrderDrawer from './OrderDrawer';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address?: string;
  cakeConfig?: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  deliverySlot?: string;
  notes?: string | null;
  deliveryDate: string;
  createdAt: string;
}

const STATUSES = ['PENDING', 'IN_PROGRESS', 'READY', 'DELIVERED', 'CANCELLED'];
const STATUS_COLOR: Record<string, string> = {
  PENDING: 'bg-amber-500/15 text-amber-400',
  IN_PROGRESS: 'bg-blue-500/15 text-blue-400',
  READY: 'bg-violet-500/15 text-violet-400',
  DELIVERED: 'bg-emerald-500/15 text-emerald-400',
  CANCELLED: 'bg-rose-500/15 text-rose-400',
};

type Tab =
  | 'dashboard'
  | 'orders'
  | 'analytics'
  | 'gallery'
  | 'reviews'
  | 'appointments'
  | 'messages'
  | 'menu';

export default function AdminDashboard() {
  const t = useTranslations('admin');
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('dashboard');
  const [selected, setSelected] = useState<Order | null>(null);

  useEffect(() => {
    fetch('/api/orders')
      .then((r) => r.json())
      .then((d) => setOrders(d.orders ?? []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const revenue = orders
      .filter((o) => o.status !== 'CANCELLED')
      .reduce((s, o) => s + o.totalPrice, 0);
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === 'PENDING').length,
      completed: orders.filter((o) => o.status === 'DELIVERED').length,
      revenue,
    };
  }, [orders]);

  const updateStatus = async (id: string, status: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o)),
    );
    const res = await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    toast(res.ok ? 'Updated' : 'Error', res.ok ? 'success' : 'error');
  };

  const nav = [
    { id: 'dashboard' as Tab, icon: LayoutDashboard, label: t('dashboard') },
    { id: 'orders' as Tab, icon: ShoppingBag, label: t('orders') },
    { id: 'analytics' as Tab, icon: BarChart3, label: t('analytics') },
    { id: 'gallery' as Tab, icon: ImageIcon, label: t('galleryMgmt') },
    { id: 'reviews' as Tab, icon: Star, label: t('reviewsMod') },
    { id: 'appointments' as Tab, icon: CalendarDays, label: t('appointments') },
    { id: 'messages' as Tab, icon: Inbox, label: t('inbox') },
    { id: 'menu' as Tab, icon: Settings, label: t('menuMgmt') },
  ];

  return (
    <div className="flex min-h-screen bg-charcoal-dark text-ivory">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-ivory/10 bg-charcoal p-5 md:flex">
        <h1 className="font-serif text-xl text-gold">Atelier Cake</h1>
        <p className="text-[0.6rem] uppercase tracking-[0.25em] text-ivory/40">
          Admin
        </p>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                tab === n.id
                  ? 'bg-gold/15 text-gold'
                  : 'text-ivory/60 hover:bg-ivory/5 hover:text-ivory',
              )}
            >
              <n.icon size={17} />
              {n.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ivory/60 hover:text-rose"
        >
          <LogOut size={17} />
          {t('logout')}
        </button>
      </aside>

      <main className="flex-1 overflow-x-auto p-6 md:p-10">
        {/* Mobile tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto md:hidden">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-xs',
                tab === n.id ? 'bg-gold text-charcoal' : 'bg-ivory/5',
              )}
            >
              {n.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="animate-spin text-gold" size={28} />
          </div>
        ) : (
          <>
            {tab === 'dashboard' && (
              <Dashboard stats={stats} t={t} orders={orders} />
            )}
            {tab === 'orders' && (
              <OrdersTable
                orders={orders}
                t={t}
                onUpdate={updateStatus}
                onSelect={setSelected}
              />
            )}
            {tab === 'analytics' && <AdminAnalytics orders={orders} t={t} />}
            {tab === 'gallery' && <AdminGallery t={t} />}
            {tab === 'reviews' && <AdminReviews t={t} />}
            {tab === 'appointments' && <AdminAppointments t={t} />}
            {tab === 'messages' && <AdminMessages t={t} />}
            {tab === 'menu' && <MenuMgmt t={t} />}
          </>
        )}
      </main>

      <OrderDrawer order={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof TrendingUp;
}) {
  return (
    <div className="rounded-2xl border border-ivory/10 bg-charcoal p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-ivory/45">
          {label}
        </span>
        <Icon size={18} className="text-gold" />
      </div>
      <p className="mt-3 font-serif text-3xl">{value}</p>
    </div>
  );
}

function Dashboard({
  stats,
  t,
  orders,
}: {
  stats: { total: number; pending: number; completed: number; revenue: number };
  t: (k: string) => string;
  orders: Order[];
}) {
  return (
    <div>
      <h2 className="font-serif text-3xl">{t('dashboard')}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={t('totalOrders')}
          value={String(stats.total)}
          icon={ShoppingBag}
        />
        <StatCard
          label={t('pending')}
          value={String(stats.pending)}
          icon={Clock}
        />
        <StatCard
          label={t('completed')}
          value={String(stats.completed)}
          icon={CheckCircle}
        />
        <StatCard
          label={t('revenue')}
          value={formatPrice(stats.revenue, 'tr')}
          icon={TrendingUp}
        />
      </div>

      <h3 className="mt-10 font-serif text-xl">{t('orders')}</h3>
      <div className="mt-4 space-y-2">
        {orders.slice(0, 5).map((o) => (
          <div
            key={o.id}
            className="flex items-center justify-between rounded-xl border border-ivory/10 bg-charcoal px-4 py-3 text-sm"
          >
            <span className="font-mono text-gold">{o.orderNumber}</span>
            <span className="text-ivory/70">{o.customerName}</span>
            <span>{formatPrice(o.totalPrice, 'tr')}</span>
          </div>
        ))}
        {orders.length === 0 && (
          <p className="text-sm text-ivory/40">{t('noOrders')}</p>
        )}
      </div>
    </div>
  );
}

function OrdersTable({
  orders,
  t,
  onUpdate,
  onSelect,
}: {
  orders: Order[];
  t: (k: string) => string;
  onUpdate: (id: string, status: string) => void;
  onSelect: (o: Order) => void;
}) {
  if (orders.length === 0) {
    return <p className="text-sm text-ivory/40">{t('noOrders')}</p>;
  }
  return (
    <div>
      <h2 className="mb-6 font-serif text-3xl">{t('orders')}</h2>
      <div className="overflow-x-auto rounded-2xl border border-ivory/10">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-charcoal text-left text-xs uppercase tracking-wider text-ivory/40">
            <tr>
              <th className="px-4 py-3">{t('orderNumber')}</th>
              <th className="px-4 py-3">{t('customer')}</th>
              <th className="px-4 py-3">{t('date')}</th>
              <th className="px-4 py-3">{t('amount')}</th>
              <th className="px-4 py-3">{t('status')}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                className="border-t border-ivory/5 hover:bg-ivory/5"
              >
                <td className="px-4 py-3 font-mono text-gold">
                  <button
                    onClick={() => onSelect(o)}
                    className="underline-offset-2 hover:underline"
                  >
                    {o.orderNumber}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <p>{o.customerName}</p>
                  <p className="text-xs text-ivory/40">{o.customerEmail}</p>
                </td>
                <td className="px-4 py-3 text-ivory/60">
                  {new Date(o.deliveryDate).toLocaleDateString('tr-TR')}
                </td>
                <td className="px-4 py-3">{formatPrice(o.totalPrice, 'tr')}</td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => onUpdate(o.id, e.target.value)}
                    className={cn(
                      'rounded-full border-0 px-3 py-1 text-xs font-medium outline-none',
                      STATUS_COLOR[o.status],
                    )}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-charcoal text-ivory">
                        {t(`status${s}`)}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MenuMgmt({ t }: { t: (k: string) => string }) {
  const rows = [
    { label: 'Base price', value: BASE_PRICE },
    ...Object.entries(FLAVOR_PRICE).map(([k, v]) => ({
      label: `Flavor · ${k}`,
      value: v,
    })),
    ...Object.entries(FROSTING_PRICE).map(([k, v]) => ({
      label: `Frosting · ${k}`,
      value: v,
    })),
    ...Object.entries(DECORATION_PRICE).map(([k, v]) => ({
      label: `Decoration · ${k}`,
      value: v,
    })),
  ];
  return (
    <div>
      <h2 className="mb-6 font-serif text-3xl">{t('menuMgmt')}</h2>
      <div className="max-w-lg space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between rounded-xl border border-ivory/10 bg-charcoal px-4 py-3 text-sm"
          >
            <span className="capitalize text-ivory/70">{r.label}</span>
            <input
              type="number"
              defaultValue={r.value}
              className="w-24 rounded-lg border border-ivory/15 bg-charcoal-dark px-3 py-1.5 text-right text-gold focus:border-gold focus:outline-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
