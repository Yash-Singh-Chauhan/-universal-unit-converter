import { ThemeProvider, AppProvider, SettingsProvider } from "@/context";
import { AppRouter } from "@/routes";
import { SpeedInsights } from "@vercel/speed-insights/react";

export function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <SettingsProvider>
          <AppRouter />
          <SpeedInsights />
        </SettingsProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
