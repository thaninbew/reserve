const ratelimit = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(key: string, limit = 5, window = 10000) {
  const now = Date.now();
  const record = ratelimit.get(key);

  if (!record) {
    ratelimit.set(key, { count: 1, expiresAt: now + window });
    return true;
  }

  if (now > record.expiresAt) {
    ratelimit.set(key, { count: 1, expiresAt: now + window });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}
