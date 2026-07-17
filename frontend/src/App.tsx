import { ThemeProvider, AppProvider, SettingsProvider } from "@/context";
import { AppRouter } from "@/routes";

export function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <SettingsProvider>
          <AppRouter />
        </SettingsProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
