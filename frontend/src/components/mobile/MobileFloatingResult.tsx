import { useState } from "react";
import { Copy, Check, Share2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

interface MobileFloatingResultProps {
  value: string;
  unit: string;
  fromUnit: string;
  formula?: string;
  className?: string;
}

export function MobileFloatingResult({
  value,
  unit,
  fromUnit,
  formula,
  className,
}: MobileFloatingResultProps) {
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);

  if (!value) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${value} ${unit}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Conversion Result",
        text: `${value} ${unit} (from ${fromUnit})`,
      });
    } else {
      await handleCopy();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-primary-500)]/8 to-[var(--color-secondary-500)]/5 border border-[var(--color-primary-500)]/15 shadow-lg",
        className
      )}
    >
      {/* Glass shimmer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />

      <div className="relative p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-[var(--color-primary-500)] uppercase tracking-[0.15em]">
            Result
          </span>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setFavorited(!favorited)}
            className={cn(
              "rounded-full p-1.5 transition-colors",
              favorited
                ? "text-[var(--color-error)]"
                : "text-[var(--color-text-tertiary)]"
            )}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={16} fill={favorited ? "currentColor" : "none"} />
          </motion.button>
        </div>

        {/* Animated Value */}
        <div className="flex items-baseline gap-2 min-h-[48px]">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={value}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl font-extrabold text-[var(--color-text)] font-mono tracking-tight break-words"
            >
              {value}
            </motion.span>
          </AnimatePresence>
          <span className="text-lg font-semibold text-[var(--color-text-secondary)] whitespace-nowrap">
            {unit}
          </span>
        </div>

        {/* Formula */}
        {formula && (
          <p className="text-[11px] text-[var(--color-text-tertiary)] font-mono bg-[var(--color-background)]/40 rounded-xl px-3 py-2 border border-[var(--color-border)]/50">
            {formula}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 text-[11px] text-[var(--color-text-tertiary)]">
          <span>From: {fromUnit}</span>
          <span aria-hidden="true" className="opacity-40">&middot;</span>
          <span>To: {unit}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all min-h-[44px]",
              copied
                ? "bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] shadow-sm"
            )}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] shadow-sm min-h-[44px]"
          >
            <Share2 size={14} />
            Share
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
