import { NextResponse } from 'next/server';
import { loadPricing } from '@/lib/pricingStore';

export const dynamic = 'force-dynamic';

// Public: current pricing table for the live configurator estimate.
export async function GET() {
  const pricing = await loadPricing();
  return NextResponse.json(
    { pricing },
    { headers: { 'Cache-Control': 'public, max-age=60' } },
  );
}
