import { Link } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import { useFavorites } from "@/hooks";
import type { ConverterDefinition } from "@/types";

interface MobileConverterCardProps {
  converter: ConverterDefinition;
  index?: number;
  className?: string;
}

export function MobileConverterCard({
  converter,
  index = 0,
  className,
}: MobileConverterCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const Icon = converter.icon;
  const favorited = isFavorite(converter.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <div className="group relative flex items-center gap-3 px-4 py-3.5 rounded-[20px] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-200 active:scale-[0.97]">
        {/* Glass overlay */}
        <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

        {/* Star button — stops propagation so card click still navigates */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(converter.id);
          }}
          className={cn(
            "absolute top-2 right-2 z-10 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200",
            favorited
              ? "text-[var(--color-warning)] opacity-100"
              : "text-[var(--color-text-tertiary)] opacity-0 group-hover:opacity-70"
          )}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <Star size={13} fill={favorited ? "currentColor" : "none"} />
        </button>

        {/* Link wraps icon + content + arrow */}
        <Link
          to={converter.route}
          className="flex items-center gap-3 flex-1 min-w-0"
        >
          {/* Icon container */}
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

          {/* Arrow with group animation */}
          <ChevronRight
            size={18}
            className="relative flex-shrink-0 text-[var(--color-text-tertiary)] transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </motion.div>
  );
}
