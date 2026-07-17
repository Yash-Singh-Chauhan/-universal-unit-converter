import { Heart, ArrowLeft, Trash2, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/common";
import { useFavorites, useApp, useMediaQuery } from "@/hooks";
import { ROUTES } from "@/constants";

export function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const { converters } = useApp();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const favoriteConverters = converters.filter((c) =>
    favorites.includes(c.id)
  );

  return (
    <>
      <SEOHead title="Favorites" />

      {/* Title — separate for mobile and desktop */}
      {isDesktop ? (
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">
          Favorites
          {favoriteConverters.length > 0 && (
            <span className="text-base font-normal text-[var(--color-text-tertiary)] ml-2">
              ({favoriteConverters.length})
            </span>
          )}
        </h1>
      ) : (
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => navigate(ROUTES.HOME)}
            className="rounded-full p-2 min-h-[48px] min-w-[48px] flex items-center justify-center text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors active:scale-[0.95]"
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
      )}

      {favoriteConverters.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-error)]/15 to-[var(--color-error)]/5 text-[var(--color-error)] mb-5 shadow-lg shadow-[var(--color-error)]/5"
          >
            <Heart size={32} fill="currentColor" />
          </motion.div>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">
            No favorites yet
          </h2>
          <p className="text-sm text-[var(--color-text-tertiary)] text-center max-w-xs leading-relaxed">
            Tap the heart icon on a converter to save it here.
          </p>
          <button
            onClick={() => navigate(ROUTES.HOME)}
            className="mt-6 px-6 py-3 min-h-[48px] rounded-xl text-sm font-semibold bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)] transition-colors active:scale-[0.97] shadow-lg shadow-[var(--color-primary-500)]/20"
          >
            Browse Converters
          </button>
        </div>
      ) : (
        /* Favorites list */
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
                <Link
                  to={converter.route}
                  className="block group relative"
                >
                  <div className="relative flex items-center gap-3 px-4 py-3.5 rounded-[20px] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-200 hover:border-[var(--color-primary-500)]/30 active:scale-[0.97]">
                    {/* Glass overlay */}
                    <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(converter.id);
                      }}
                      className="absolute top-2 right-2 z-10 flex items-center justify-center w-8 h-8 min-h-[44px] min-w-[44px] rounded-full text-[var(--color-text-tertiary)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      aria-label={`Remove ${converter.title} from favorites`}
                    >
                      <Trash2 size={14} />
                    </button>

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

                    {/* Arrow */}
                    <ChevronRight
                      size={18}
                      className="relative flex-shrink-0 text-[var(--color-text-tertiary)] transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
}
