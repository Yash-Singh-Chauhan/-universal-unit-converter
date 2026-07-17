import { ThemeProvider, AppProvider, SettingsProvider, FavoritesProvider } from "@/context";
import { AppRouter } from "@/routes";

export function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <SettingsProvider>
          <FavoritesProvider>
            <AppRouter />
          </FavoritesProvider>
        </SettingsProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
