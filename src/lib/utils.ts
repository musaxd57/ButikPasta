import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `AC-${ts}${rand}`;
}

// Minimum advance notice for orders: 5 days.
export const MIN_ADVANCE_DAYS = 5;

export function minDeliveryDate(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + MIN_ADVANCE_DAYS);
  return d;
}

/** Builds a CSV string from rows of objects and triggers a browser download. */
export function downloadCsv(
  filename: string,
  rows: Record<string, unknown>[],
): void {
  if (rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    const s = v == null ? '' : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };
  const csv = [
    headers.join(','),
    ...rows.map((row) => headers.map((h) => escape(row[h])).join(',')),
  ].join('\n');

  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export const DELIVERY_SLOTS = [
  '10:00 - 12:00',
  '12:00 - 14:00',
  '14:00 - 16:00',
  '16:00 - 18:00',
  '18:00 - 20:00',
];

// Builds a WhatsApp deep link with a prefilled message. Catalog items (cupcakes,
// menu) use this to start a real order conversation, since they have no cart.
export function whatsappHref(message: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '905555555555';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
