'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { formatPrice } from '@/lib/pricing';
import type { CakeConfig } from '@/types/cake';

interface Order {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  address?: string;
  cakeConfig?: string;
  totalPrice: number;
  status: string;
  paymentStatus?: string;
  deliveryDate: string;
  deliverySlot?: string;
  notes?: string | null;
  createdAt: string;
}

function parseConfig(raw?: string): Partial<CakeConfig> | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function OrderDrawer({
  order,
  onClose,
}: {
  order: Order | null;
  onClose: () => void;
}) {
  const config = parseConfig(order?.cakeConfig);

  return (
    <AnimatePresence>
      {order && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-charcoal-dark/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 z-[71] h-full w-full max-w-md overflow-y-auto border-l border-ivory/10 bg-charcoal p-6 text-ivory"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-lg text-gold">{order.orderNumber}</h3>
              <button onClick={onClose} className="text-ivory/60 hover:text-ivory">
                <X size={20} />
              </button>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <Row label="Müşteri" value={order.customerName} />
              <Row label="E-posta" value={order.customerEmail} />
              {order.customerPhone && <Row label="Telefon" value={order.customerPhone} />}
              {order.address && <Row label="Adres" value={order.address} />}
              <Row
                label="Teslimat"
                value={`${new Date(order.deliveryDate).toLocaleDateString('tr-TR')}${
                  order.deliverySlot ? ` · ${order.deliverySlot}` : ''
                }`}
              />
              <Row label="Tutar" value={formatPrice(order.totalPrice, 'tr')} />
              {order.paymentStatus && <Row label="Ödeme" value={order.paymentStatus} />}
              <Row label="Durum" value={order.status} />
              {order.notes && <Row label="Not" value={order.notes} />}
            </dl>

            {config && (
              <div className="mt-6 rounded-xl border border-ivory/10 bg-charcoal-dark p-4">
                <p className="mb-3 text-xs uppercase tracking-wider text-ivory/40">
                  Pasta Tasarımı
                </p>
                <dl className="space-y-2 text-sm">
                  {config.tierCount != null && (
                    <Row label="Kat" value={String(config.tierCount)} dark />
                  )}
                  {config.tiers?.map((tier, i) => (
                    <Row
                      key={i}
                      label={`Kat ${i + 1}`}
                      value={`${tier.size} · ${tier.flavor}`}
                      dark
                    />
                  ))}
                  {config.frosting && <Row label="Kaplama" value={config.frosting} dark />}
                  {config.decorations && config.decorations.length > 0 && (
                    <Row label="Süsleme" value={config.decorations.join(', ')} dark />
                  )}
                  {config.message && <Row label="Mesaj" value={`“${config.message}”`} dark />}
                </dl>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  value,
  dark,
}: {
  label: string;
  value: string;
  dark?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className={dark ? 'text-ivory/40' : 'text-ivory/45'}>{label}</dt>
      <dd className="text-right text-ivory/85">{value}</dd>
    </div>
  );
}
