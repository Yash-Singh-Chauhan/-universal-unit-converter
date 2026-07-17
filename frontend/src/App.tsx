import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider, AppProvider, SettingsProvider } from "@/context";
import { AppRouter } from "@/routes";

export function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <SettingsProvider>
          <AppRouter />
          <Analytics />
        </SettingsProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
