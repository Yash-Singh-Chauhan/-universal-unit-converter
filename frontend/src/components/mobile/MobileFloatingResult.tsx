import { useState } from "react";
import { Copy, Check, Share2, Heart, HeartOff } from "lucide-react";
import { motion } from "framer-motion";
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
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut", type: "spring", stiffness: 200, damping: 25 }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)]/10 to-[var(--color-secondary-500)]/10 border border-[var(--color-primary-500)]/20 shadow-lg shadow-[var(--color-primary-500)]/5",
        className
      )}
    >
      {/* Glass shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      <div className="relative p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[var(--color-primary-500)] uppercase tracking-wider">
            Result
          </span>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setFavorited(!favorited)}
            className={cn(
              "rounded-full p-2 transition-colors",
              favorited
                ? "text-[var(--color-error)]"
                : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text)]"
            )}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            {favorited ? <Heart size={16} fill="currentColor" /> : <HeartOff size={16} />}
          </motion.button>
        </div>

        {/* Value */}
        <div>
          <span className="text-3xl font-extrabold text-[var(--color-text)] font-mono tracking-tight break-words">
            {value}
          </span>
          <span className="ml-2 text-lg font-semibold text-[var(--color-text-secondary)]">
            {unit}
          </span>
        </div>

        {/* Formula */}
        {formula && (
          <p className="text-xs text-[var(--color-text-tertiary)] font-mono bg-[var(--color-background)]/50 rounded-lg px-3 py-2">
            {formula}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-tertiary)]">
          <span>From: {fromUnit}</span>
          <span aria-hidden="true">&middot;</span>
          <span>To: {unit}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all min-h-[44px]",
              copied
                ? "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]"
            )}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)] transition-all min-h-[44px]"
          >
            <Share2 size={14} />
            Share
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
