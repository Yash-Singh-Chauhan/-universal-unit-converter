export const THEME_VARIABLES = {
  colors: {
    primary: {
      "--color-primary-50": "239 246 255",
      "--color-primary-100": "219 234 254",
      "--color-primary-200": "191 219 254",
      "--color-primary-300": "147 197 253",
      "--color-primary-400": "96 165 250",
      "--color-primary-500": "59 130 246",
      "--color-primary-600": "37 99 235",
      "--color-primary-700": "29 78 216",
      "--color-primary-800": "30 64 175",
      "--color-primary-900": "30 58 138",
    },
    surface: {
      "--color-surface-50": "250 250 250",
      "--color-surface-100": "245 245 245",
      "--color-surface-200": "229 229 229",
      "--color-surface-300": "212 212 212",
      "--color-surface-400": "163 163 163",
      "--color-surface-500": "115 115 115",
      "--color-surface-600": "82 82 82",
      "--color-surface-700": "64 64 64",
      "--color-surface-800": "38 38 38",
      "--color-surface-900": "23 23 23",
    },
  },
  typography: {
    "--font-sans": "'Inter', ui-sans-serif, system-ui, sans-serif",
    "--font-mono": "'JetBrains Mono', ui-monospace, monospace",
    "--font-size-xs": "0.75rem",
    "--font-size-sm": "0.875rem",
    "--font-size-base": "1rem",
    "--font-size-lg": "1.125rem",
    "--font-size-xl": "1.25rem",
    "--font-size-2xl": "1.5rem",
    "--font-size-3xl": "1.875rem",
    "--font-size-4xl": "2.25rem",
    "--font-weight-normal": "400",
    "--font-weight-medium": "500",
    "--font-weight-semibold": "600",
    "--font-weight-bold": "700",
    "--line-height-tight": "1.25",
    "--line-height-normal": "1.5",
    "--line-height-relaxed": "1.75",
  },
  radius: {
    "--radius-sm": "0.375rem",
    "--radius-md": "0.5rem",
    "--radius-lg": "0.75rem",
    "--radius-xl": "1rem",
    "--radius-2xl": "1.5rem",
    "--radius-full": "9999px",
  },
  shadows: {
    "--shadow-sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "--shadow-md":
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "--shadow-lg":
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "--shadow-xl":
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  glassmorphism: {
    "--glass-bg": "rgba(255, 255, 255, 0.15)",
    "--glass-border": "rgba(255, 255, 255, 0.2)",
    "--glass-shadow": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    "--glass-backdrop": "blur(12px)",
  },
  animations: {
    "--duration-fast": "150ms",
    "--duration-normal": "250ms",
    "--duration-slow": "400ms",
    "--ease-out": "cubic-bezier(0.16, 1, 0.3, 1)",
    "--ease-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
    "--ease-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

export const THEME_ACCENT_COLORS = [
  { value: "indigo", label: "Indigo", hex: "#6366f1" },
  { value: "emerald", label: "Emerald", hex: "#10b981" },
  { value: "amber", label: "Amber", hex: "#f59e0b" },
  { value: "rose", label: "Rose", hex: "#f43f5e" },
  { value: "violet", label: "Violet", hex: "#8b5cf6" },
  { value: "cyan", label: "Cyan", hex: "#06b6d4" },
] as const;

export const THEME_STORAGE_KEY = "uc-theme";
