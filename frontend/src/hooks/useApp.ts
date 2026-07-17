import { useContext } from "react";
import { AppContext } from "@/context";
import type { ConverterDefinition } from "@/types";

interface AppContextValue {
  converters: ConverterDefinition[];
  activeConverterId: string | null;
  setActiveConverterId: (id: string | null) => void;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
