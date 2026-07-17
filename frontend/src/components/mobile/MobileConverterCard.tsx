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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: "easeOut" }}
    >
      <Link
        to={converter.route}
        className={cn("block", className)}
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-primary-500)]/30 transition-all duration-200 active:scale-[0.98]">
          {/* Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] flex-shrink-0">
            <Icon size={20} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[var(--color-text)] truncate">
              {converter.title}
            </h3>
            <p className="text-xs text-[var(--color-text-tertiary)] truncate leading-relaxed mt-0.5">
              {converter.description}
            </p>
          </div>

          {/* Arrow */}
          <ChevronRight
            size={18}
            className="flex-shrink-0 text-[var(--color-text-tertiary)]"
          />
        </div>
      </Link>
    </motion.div>
  );
}
