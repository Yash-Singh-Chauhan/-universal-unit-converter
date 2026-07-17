import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STORAGE_KEYS } from "@/constants";

interface UserSettings {
  /** Number of decimal places for conversion results */
  decimalPlaces: number;
  /** Whether to auto-convert on input change */
  autoConvert: boolean;
  /** Whether to swap input/output on unit change */
  autoSwap: boolean;
  /** Sound effects enabled */
  soundEnabled: boolean;
}

interface SettingsContextValue {
  settings: UserSettings;
  updateSettings: (partial: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: UserSettings = {
  decimalPlaces: 4,
  autoConvert: true,
  autoSwap: false,
  soundEnabled: false,
};

function loadSettings(): UserSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<UserSettings>;
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch {
    // Invalid stored settings
  }
  return DEFAULT_SETTINGS;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<UserSettings>(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback((partial: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  const value = useMemo<SettingsContextValue>(
    () => ({ settings, updateSettings, resetSettings }),
    [settings, updateSettings, resetSettings]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
