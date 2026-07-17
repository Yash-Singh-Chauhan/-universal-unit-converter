import type { ConverterUnit } from "@/types";

export const CURRENCY_UNITS: ConverterUnit[] = [
  { id: "USD", name: "US Dollar", symbol: "$", category: "metric" },
  { id: "EUR", name: "Euro", symbol: "€", category: "metric" },
  { id: "GBP", name: "British Pound", symbol: "£", category: "metric" },
  { id: "JPY", name: "Japanese Yen", symbol: "¥", category: "metric" },
  { id: "AUD", name: "Australian Dollar", symbol: "A$", category: "metric" },
  { id: "CAD", name: "Canadian Dollar", symbol: "CA$", category: "metric" },
  { id: "CHF", name: "Swiss Franc", symbol: "CHF", category: "metric" },
  { id: "CNY", name: "Chinese Yuan", symbol: "¥", category: "metric" },
  { id: "INR", name: "Indian Rupee", symbol: "₹", category: "metric" },
  { id: "SGD", name: "Singapore Dollar", symbol: "S$", category: "metric" },
  { id: "NZD", name: "New Zealand Dollar", symbol: "NZ$", category: "metric" },
  { id: "KRW", name: "South Korean Won", symbol: "₩", category: "metric" },
  { id: "BRL", name: "Brazilian Real", symbol: "R$", category: "metric" },
  { id: "MXN", name: "Mexican Peso", symbol: "Mex$", category: "metric" },
  { id: "AED", name: "UAE Dirham", symbol: "د.إ", category: "metric" },
  { id: "SAR", name: "Saudi Riyal", symbol: "﷼", category: "metric" },
  { id: "ZAR", name: "South African Rand", symbol: "R", category: "metric" },
  { id: "RUB", name: "Russian Ruble", symbol: "₽", category: "metric" },
];

export const CURRENCY_CONVERTER_ID = "currency";
export const CURRENCY_CONVERTER_TITLE = "Currency Converter";
