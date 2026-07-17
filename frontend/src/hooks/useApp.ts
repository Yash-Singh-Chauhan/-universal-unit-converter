import { useContext } from "react";
import { AppContext } from "@/context";

interface AppContextValue {
  converters: import("@/types").ConverterDefinition[];
  activeConverterId: string | null;
  setActiveConverterId: (id: string | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
