import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ThemeConfiguration, ThemeContextValue, ThemeMode, ThemeColor } from "@/types";
import { THEME_STORAGE_KEY } from "@/constants";

const DEFAULT_THEME: ThemeConfiguration = {
  mode: "dark",
  color: "indigo",
  glassmorphism: true,
  reducedMotion: false,
};

function loadTheme(): ThemeConfiguration {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<ThemeConfiguration>;
      return {
        ...DEFAULT_THEME,
        ...parsed,
      };
    }
  } catch {
    // Invalid stored theme — fall back to default
  }

  // Check system preference
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return {
    ...DEFAULT_THEME,
    mode: prefersDark ? "dark" : "light",
  };
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeConfiguration>(loadTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme.mode);

    if (theme.mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  }, [theme]);

  const setMode = useCallback((mode: ThemeMode) => {
    setTheme((prev) => ({ ...prev, mode }));
  }, []);

  const setColor = useCallback((color: ThemeColor) => {
    setTheme((prev) => ({ ...prev, color }));
  }, []);

  const toggleGlassmorphism = useCallback(() => {
    setTheme((prev) => ({ ...prev, glassmorphism: !prev.glassmorphism }));
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setTheme((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setMode,
      setColor,
      toggleGlassmorphism,
      toggleReducedMotion,
    }),
    [theme, setMode, setColor, toggleGlassmorphism, toggleReducedMotion]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
