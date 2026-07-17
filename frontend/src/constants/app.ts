export const APP_NAME = "Universal Unit Converter";
export const APP_DESCRIPTION =
  "Convert between different units of measurement with ease";
export const APP_VERSION = "1.0.0";

export const ROUTES = {
  HOME: "/",
  HEIGHT: "/height",
  WEIGHT: "/weight",
  VOLUME: "/volume",
  CURRENCY: "/currency",
  PLANET_GRAVITY: "/planet-gravity",
  NOT_FOUND: "/404",
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

export const STORAGE_KEYS = {
  THEME: "uc-theme",
  SETTINGS: "uc-settings",
  CACHE: "uc-cache",
} as const;

export const API_ENDPOINTS = {
  CURRENCY_RATES: "/api/currency/rates",
  CURRENCY_CONVERT: "/api/currency/convert",
  HEALTH: "/api/health",
} as const;
