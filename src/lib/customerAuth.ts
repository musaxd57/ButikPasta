import crypto from 'crypto';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

// Lightweight, dependency-free customer auth. We sign the customer id with an
// HMAC (keyed by NEXTAUTH_SECRET) and store it in an httpOnly cookie — stateless
// and separate from the NextAuth-based admin session.

const COOKIE = 'ac_customer';
const secret = () => process.env.NEXTAUTH_SECRET ?? 'dev-customer-secret';

function sign(value: string): string {
  const sig = crypto
    .createHmac('sha256', secret())
    .update(value)
    .digest('base64url');
  return `${value}.${sig}`;
}

function verify(token: string | undefined): string | null {
  if (!token) return null;
  const idx = token.lastIndexOf('.');
  if (idx < 0) return null;
  const value = token.slice(0, idx);
  const expected = sign(value);
  // Constant-time compare
  if (
    expected.length === token.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(token))
  ) {
    return value;
  }
  return null;
}

export function setCustomerCookie(customerId: string) {
  cookies().set(COOKIE, sign(customerId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export function clearCustomerCookie() {
  cookies().set(COOKIE, '', { path: '/', maxAge: 0 });
}

export function getCustomerId(): string | null {
  return verify(cookies().get(COOKIE)?.value);
}

export async function getCurrentCustomer() {
  const id = getCustomerId();
  if (!id) return null;
  return prisma.customer.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, phone: true, createdAt: true },
  });
}
