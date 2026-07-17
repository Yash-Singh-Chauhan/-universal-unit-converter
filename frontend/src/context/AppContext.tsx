import {
  createContext,
  useCallback,
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
  /** Whether the sidebar is open on mobile */
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const AppContext = createContext<AppContextValue | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [activeConverterId, setActiveConverterId] = useState<string | null>(
    null
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      converters: converterDefinitions,
      activeConverterId,
      setActiveConverterId,
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar,
    }),
    [activeConverterId, sidebarOpen, toggleSidebar]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
