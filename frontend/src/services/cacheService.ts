import { STORAGE_KEYS } from "@/constants";
import { appConfig } from "@/config";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttlMs: number;
}

class CacheService {
  private cache = new Map<string, CacheEntry<unknown>>();
  private readonly defaultTtlMs = appConfig.limits.cacheDurationMs;

  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    if (!entry) {
      return this.getFromStorage<T>(key);
    }

    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set<T>(key: string, data: T, ttlMs?: number): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttlMs: ttlMs ?? this.defaultTtlMs,
    };
    this.cache.set(key, entry);

    try {
      sessionStorage.setItem(
        `${STORAGE_KEYS.CACHE}:${key}`,
        JSON.stringify(entry)
      );
    } catch {
      // Session storage quota exceeded — silently fall back to in-memory only
    }
  }

  invalidate(key: string): void {
    this.cache.delete(key);
    try {
      sessionStorage.removeItem(`${STORAGE_KEYS.CACHE}:${key}`);
    } catch {
      // Ignore storage errors
    }
  }

  clear(): void {
    this.cache.clear();
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key?.startsWith(`${STORAGE_KEYS.CACHE}:`)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => sessionStorage.removeItem(key));
    } catch {
      // Ignore storage errors
    }
  }

  private getFromStorage<T>(key: string): T | null {
    try {
      const raw = sessionStorage.getItem(`${STORAGE_KEYS.CACHE}:${key}`);
      if (!raw) return null;

      const entry = JSON.parse(raw) as CacheEntry<T>;
      if (this.isExpired(entry)) {
        sessionStorage.removeItem(`${STORAGE_KEYS.CACHE}:${key}`);
        return null;
      }

      this.cache.set(key, entry);
      return entry.data;
    } catch {
      return null;
    }
  }

  private isExpired(entry: CacheEntry<unknown>): boolean {
    return Date.now() - entry.timestamp > entry.ttlMs;
  }
}

export const cacheService = new CacheService();
