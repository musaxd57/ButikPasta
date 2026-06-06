import { z } from 'zod';
import { minDeliveryDate } from './utils';

// Turkish phone numbers: accepts +90 / 0 prefixes and 10-digit core.
const phoneRegex = /^(\+90|0)?\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;

export const orderSchema = z.object({
  customerName: z.string().min(2, 'name.short').max(80),
  customerEmail: z.string().email('email.invalid'),
  customerPhone: z
    .string()
    .regex(phoneRegex, 'phone.invalid'),
  address: z.string().min(10, 'address.short').max(400),
  deliveryDate: z
    .string()
    .refine((val) => {
      const d = new Date(val);
      return !Number.isNaN(d.getTime()) && d >= minDeliveryDate();
    }, 'date.tooSoon'),
  deliverySlot: z.string().min(1, 'slot.required'),
  notes: z.string().max(500).optional().or(z.literal('')),
  paymentType: z.enum(['full', 'deposit']),
  locale: z.enum(['tr', 'en']).default('tr'),
  cakeConfig: z.string().min(2),
  totalPrice: z.number().positive(),
  couponCode: z.string().max(40).optional().or(z.literal('')),
});

export type OrderInput = z.infer<typeof orderSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
