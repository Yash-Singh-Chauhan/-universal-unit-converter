import { useContext } from "react";
import { SettingsContext } from "@/context";

interface SettingsContextValue {
  settings: {
    decimalPlaces: number;
    autoConvert: boolean;
    autoSwap: boolean;
    soundEnabled: boolean;
  };
  updateSettings: (partial: Partial<SettingsContextValue["settings"]>) => void;
  resetSettings: () => void;
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
