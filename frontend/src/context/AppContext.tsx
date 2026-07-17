import {
  createContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ConverterDefinition } from "@/types";
import { converterDefinitions } from "@/config";

interface AppContextValue {
  /** All registered converter definitions */
  converters: ConverterDefinition[];
  /** Currently active converter ID (from route) */
  activeConverterId: string | null;
  setActiveConverterId: (id: string | null) => void;
}

export const AppContext = createContext<AppContextValue | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [activeConverterId, setActiveConverterId] = useState<string | null>(
    null
  );

  const value = useMemo<AppContextValue>(
    () => ({
      converters: converterDefinitions,
      activeConverterId,
      setActiveConverterId,
    }),
    [activeConverterId]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
