import { appConfig } from "@/config";
import type { CurrencyUnitId } from "../types";

interface ConvertApiResponse {
  success: boolean;
  amount: number;
  from: string;
  to: string;
  rate: number;
  convertedAmount: number;
  lastUpdated: string;
}

export async function convertCurrencyApi(
  amount: number,
  fromCurrency: CurrencyUnitId,
  toCurrency: CurrencyUnitId,
  signal?: AbortSignal
): Promise<ConvertApiResponse> {
  const url = `${appConfig.api.baseUrl}/currency/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      (errorBody as { error?: string }).error ?? "Failed to convert currency"
    );
  }

  return response.json() as Promise<ConvertApiResponse>;
}
