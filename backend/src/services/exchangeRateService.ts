import { exchangeRateCache } from "../utils/cache.js";
import type { FrankfurterResponse } from "../types/currency.js";

const FRANKFURTER_API = "https://api.frankfurter.dev/v2";

export class ExchangeRateService {
  private async fetchRates(baseCurrency: string): Promise<{
    rates: Record<string, number>;
    date: string;
  }> {
    const cacheKey = `rates:${baseCurrency}`;
    const cached = exchangeRateCache.get<{
      rates: Record<string, number>;
      date: string;
    }>(cacheKey);
    if (cached) return cached;

    const url = `${FRANKFURTER_API}/rates?base=${baseCurrency}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch exchange rates: ${response.statusText}`
      );
    }

    const data = (await response.json()) as FrankfurterResponse;

    // v2 returns an array: [{date, base, quote, rate}, ...]
    // Convert to { rates: {EUR: 0.925, ...}, date: "2026-07-17" }
    const rates: Record<string, number> = {};
    let dateStr = "";

    if (Array.isArray(data)) {
      for (const item of data) {
        rates[item.quote] = item.rate;
        if (!dateStr) dateStr = item.date;
      }
    }

    const result = { rates, date: dateStr };
    exchangeRateCache.set(cacheKey, result);
    return result;
  }

  async convert(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): Promise<{
    rate: number;
    convertedAmount: number;
    lastUpdated: string;
  }> {
    if (amount < 0) {
      throw new Error("Amount cannot be negative");
    }

    if (fromCurrency === toCurrency) {
      return {
        rate: 1,
        convertedAmount: amount,
        lastUpdated: new Date().toISOString(),
      };
    }

    const data = await this.fetchRates(fromCurrency);
    const rate = data.rates[toCurrency];

    if (!rate) {
      throw new Error(`Currency not supported: ${toCurrency}`);
    }

    return {
      rate,
      convertedAmount: Number.parseFloat((amount * rate).toFixed(2)),
      lastUpdated: new Date(`${data.date}T00:00:00Z`).toISOString(),
    };
  }

  async getRates(
    baseCurrency: string
  ): Promise<{ base: string; rates: Record<string, number>; date: string }> {
    const data = await this.fetchRates(baseCurrency);
    return {
      base: baseCurrency,
      rates: data.rates,
      date: data.date,
    };
  }
}

export const exchangeRateService = new ExchangeRateService();
