export const appConfig = {
  name: "Universal Unit Converter",
  version: "1.0.0",
  description: "Convert between different units of measurement with ease",

  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? "/api",
    timeout: 10_000,
    retryAttempts: 3,
  },

  defaults: {
    theme: "dark" as const,
    accentColor: "indigo" as const,
    decimalPlaces: 4,
    currencyBase: "USD",
  },

  features: {
    glassmorphism: true,
    animations: true,
    keyboardShortcuts: true,
    autoConvert: true,
  },

  limits: {
    maxInputLength: 20,
    maxDecimalPlaces: 12,
    cacheDurationMs: 300_000, // 5 minutes
  },
} as const;

export type AppConfig = typeof appConfig;
