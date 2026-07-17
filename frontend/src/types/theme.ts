export type ThemeMode = "light" | "dark";

export type ThemeColor =
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "cyan";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export interface ThemeConfiguration {
  mode: ThemeMode;
  color: ThemeColor;
  glassmorphism: boolean;
  reducedMotion: boolean;
}

export interface ThemeContextValue {
  theme: ThemeConfiguration;
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
  toggleGlassmorphism: () => void;
  toggleReducedMotion: () => void;
}
