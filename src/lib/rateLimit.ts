// Lightweight in-memory rate limiter for public API routes (defence against
// spam / brute-force / bot abuse). Uses a fixed-window counter keyed by client
// IP + bucket name. This is per-instance (resets on redeploy and isn't shared
// across serverless cold starts), which is fine as a first line of defence; for
// hardened multi-instance limiting, back this with Upstash Redis later.

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

// Periodically evict expired buckets so the map can't grow unbounded.
let lastSweep = Date.now();
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  store.forEach((b, key) => {
    if (b.resetAt <= now) store.delete(key);
  });
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfter: number; // seconds until the window resets
}

/**
 * Fixed-window rate limit.
 * @param key    Unique caller key (e.g. `orders:1.2.3.4`).
 * @param limit  Max requests allowed per window.
 * @param windowMs Window length in milliseconds.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = store.get(key);
  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (existing.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return {
    ok: true,
    remaining: limit - existing.count,
    retryAfter: 0,
  };
}

/** Best-effort client IP extraction from proxy headers (Vercel / generic). */
export function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return (
    req.headers.get('x-real-ip') ??
    req.headers.get('cf-connecting-ip') ??
    'unknown'
  );
}

/**
 * Convenience guard: returns a 429 Response when the caller is over the limit,
 * or null when the request may proceed.
 */
export function enforceRateLimit(
  req: Request,
  bucket: string,
  limit: number,
  windowMs: number,
): Response | null {
  const { ok, retryAfter } = rateLimit(
    `${bucket}:${clientIp(req)}`,
    limit,
    windowMs,
  );
  if (ok) return null;
  return new Response(
    JSON.stringify({ error: 'rate_limited', retryAfter }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter),
      },
    },
  );
}
