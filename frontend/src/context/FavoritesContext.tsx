import {
  createContext,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useLocalStorage } from "@/hooks";
import { STORAGE_KEYS } from "@/constants";

interface FavoritesContextValue {
  /** Array of favorite converter IDs */
  favorites: string[];
  /** Check if a converter ID is favorited */
  isFavorite: (id: string) => boolean;
  /** Toggle a converter's favorite status */
  toggleFavorite: (id: string) => void;
  /** Add a converter to favorites */
  addFavorite: (id: string) => void;
  /** Remove a converter from favorites */
  removeFavorite: (id: string) => void;
  /** Total number of favorites */
  count: number;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    STORAGE_KEYS.FAVORITES,
    []
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const addFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      });
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => prev.filter((fid) => fid !== id));
    },
    [setFavorites]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        if (prev.includes(id)) {
          return prev.filter((fid) => fid !== id);
        }
        return [...prev, id];
      });
    },
    [setFavorites]
  );

  const count = useMemo(() => favorites.length, [favorites]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      count,
    }),
    [favorites, isFavorite, toggleFavorite, addFavorite, removeFavorite, count]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
