export interface ConvertQuery {
  from: string;
  to: string;
  amount: string;
}

export interface ConvertResponse {
  success: boolean;
  amount: number;
  from: string;
  to: string;
  rate: number;
  convertedAmount: number;
  lastUpdated: string;
}

/** Frankfurter v2 returns an array of rate objects */
export interface FrankfurterRateItem {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

export type FrankfurterResponse = FrankfurterRateItem[];

export interface ApiErrorResponse {
  success: false;
  error: string;
  code?: string;
}
