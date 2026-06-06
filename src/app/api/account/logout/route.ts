import { NextResponse } from 'next/server';
import { clearCustomerCookie } from '@/lib/customerAuth';

export async function POST() {
  clearCustomerCookie();
  return NextResponse.json({ ok: true });
}
