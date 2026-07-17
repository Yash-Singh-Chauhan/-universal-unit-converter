import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils";
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
  const Icon = converter.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={converter.route}
        className={cn("block group", className)}
      >
        <div className="relative flex items-center gap-3 px-4 py-3.5 rounded-[20px] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-200 active:scale-[0.97]">
          {/* Glass overlay */}
          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

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
        </div>
      </Link>
    </motion.div>
  );
}
