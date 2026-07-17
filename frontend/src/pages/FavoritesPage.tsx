import { Star, ArrowLeft, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/common";
import { useFavorites, useApp } from "@/hooks";
import { ROUTES } from "@/constants";

export function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const { converters } = useApp();

  const favoriteConverters = converters.filter((c) =>
    favorites.includes(c.id)
  );

  return (
    <>
      <SEOHead title="Favorites" />

      {/* Mobile Header */}
      <div className="flex sm:hidden items-center gap-2 mb-4">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="rounded-full p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-[var(--color-text)]">Favorites</h1>
        {favoriteConverters.length > 0 && (
          <span className="text-xs text-[var(--color-text-tertiary)] ml-1">
            ({favoriteConverters.length})
          </span>
        )}
      </div>

      {/* Desktop title */}
      <h1 className="hidden sm:block text-2xl font-bold text-[var(--color-text)] mb-6">
        Favorites
        {favoriteConverters.length > 0 && (
          <span className="text-base font-normal text-[var(--color-text-tertiary)] ml-2">
            ({favoriteConverters.length})
          </span>
        )}
      </h1>

      {favoriteConverters.length === 0 ? (
        /* ===== Empty state ===== */
        <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] mb-4">
            <Star size={28} />
          </div>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-1">
            No favorites yet
          </h2>
          <p className="text-sm text-[var(--color-text-tertiary)] text-center max-w-xs">
            Star your most-used converters to access them quickly from here.
          </p>
          <button
            onClick={() => navigate(ROUTES.HOME)}
            className="mt-6 px-6 py-2.5 rounded-xl text-sm font-semibold bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)] transition-colors active:scale-[0.97]"
          >
            Browse Converters
          </button>
        </div>
      ) : (
        /* ===== Favorites list ===== */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {favoriteConverters.map((converter, index) => {
            const Icon = converter.icon;
            return (
              <motion.div
                key={converter.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <div className="relative group">
                  <Link
                    to={converter.route}
                    className="block"
                  >
                    <div className="relative flex items-center gap-3 px-4 py-3.5 rounded-[20px] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-200 hover:border-[var(--color-primary-500)]/30 active:scale-[0.97]">
                      {/* Glass overlay */}
                      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

                      {/* Icon */}
                      <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)]/15 to-[var(--color-secondary-500)]/10 text-[var(--color-primary-500)] flex-shrink-0 shadow-sm">
                        <Icon size={22} />
                      </div>

                      {/* Content */}
                      <div className="relative flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[var(--color-text)] truncate leading-tight">
                          {converter.title}
                        </h3>
                        <p className="text-[11px] text-[var(--color-text-tertiary)] truncate leading-relaxed mt-0.5">
                          {converter.description}
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Remove from favorites button */}
                  <button
                    onClick={() => toggleFavorite(converter.id)}
                    className="absolute top-2 right-2 z-10 flex items-center justify-center w-8 h-8 rounded-full text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label={`Remove ${converter.title} from favorites`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
}
