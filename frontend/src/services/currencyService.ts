import { apiGet, apiPost } from "./api";
import { cacheService } from "./cacheService";
import { API_ENDPOINTS } from "@/constants";
import type { ConversionResult } from "@/types";

interface ExchangeRatesResponse {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

interface ConversionResponse {
  result: ConversionResult;
}

const CACHE_TTL_MS = 300_000; // 5 minutes

/**
 * Fetches latest exchange rates for a given base currency.
 * Results are cached client-side to reduce API calls.
 */
export async function getExchangeRates(
  baseCurrency: string
): Promise<ExchangeRatesResponse> {
  const cacheKey = `rates:${baseCurrency}`;
  const cached = cacheService.get<ExchangeRatesResponse>(cacheKey);
  if (cached) return cached;

  const response = await apiGet<ExchangeRatesResponse>(
    `${API_ENDPOINTS.CURRENCY_RATES}?base=${baseCurrency}`
  );

  cacheService.set(cacheKey, response, CACHE_TTL_MS);
  return response;
}

/**
 * Converts an amount from one currency to another via the backend API.
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): Promise<ConversionResult> {
  const cacheKey = `convert:${fromCurrency}:${toCurrency}:${amount}`;
  const cached = cacheService.get<ConversionResult>(cacheKey);
  if (cached) return cached;

  const response = await apiPost<ConversionResponse>(
    API_ENDPOINTS.CURRENCY_CONVERT,
    {
      value: amount,
      fromUnit: fromCurrency,
      toUnit: toCurrency,
    }
  );

  cacheService.set(cacheKey, response.result, CACHE_TTL_MS);
  return response.result;
}

/**
 * Returns a list of supported currency codes.
 */
export async function getSupportedCurrencies(): Promise<string[]> {
  const cacheKey = "supported-currencies";
  const cached = cacheService.get<string[]>(cacheKey);
  if (cached) return cached;

  const rates = await getExchangeRates("USD");
  const currencies = Object.keys(rates.rates);
  currencies.unshift(rates.base);

  cacheService.set(cacheKey, currencies, CACHE_TTL_MS);
  return currencies;
}
