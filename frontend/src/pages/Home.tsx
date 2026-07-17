import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ConverterCard } from "@/components/common";
import { SEOHead } from "@/components/common";
import { Button, GlassPanel } from "@/components/ui";
import { MobileSearchBar, MobileConverterCard } from "@/components/mobile";
import { useApp } from "@/hooks";

const floatingCircles = [
  { size: 300, x: "10%", y: "20%", color: "from-[var(--color-primary-500)]/20", delay: 0 },
  { size: 200, x: "80%", y: "30%", color: "from-[var(--color-secondary-500)]/15", delay: 2 },
  { size: 250, x: "60%", y: "60%", color: "from-[var(--color-accent-500)]/10", delay: 4 },
  { size: 150, x: "30%", y: "70%", color: "from-[var(--color-primary-500)]/10", delay: 1 },
];

export function HomePage() {
  const { converters } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  const categorizedConverters = useMemo(() => ({
    common: converters.filter((c) => c.category === "common"),
    financial: converters.filter((c) => c.category === "financial"),
    specialized: converters.filter((c) => c.category === "specialized"),
  }), [converters]);

  const filteredConverters = useMemo(() => {
    if (!searchQuery) return categorizedConverters;
    const q = searchQuery.toLowerCase();
    const filter = (arr: typeof converters) =>
      arr.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    return {
      common: filter(categorizedConverters.common),
      financial: filter(categorizedConverters.financial),
      specialized: filter(categorizedConverters.specialized),
    };
  }, [categorizedConverters, searchQuery]);

  const allFiltered = useMemo(
    () => [
      ...filteredConverters.common,
      ...filteredConverters.financial,
      ...filteredConverters.specialized,
    ],
    [filteredConverters]
  );

  return (
    <>
      <SEOHead />

      {/* ===== DESKTOP HERO ===== */}
      <section className="hidden sm:block relative overflow-hidden rounded-2xl sm:rounded-3xl mb-8 sm:mb-10 md:mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-500)]/5 via-[var(--color-secondary-500)]/5 to-[var(--color-accent-500)]/5 animate-gradient" />
        {floatingCircles.map((circle, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br ${circle.color} to-transparent blur-2xl sm:blur-3xl`}
            style={{
              width: `clamp(${circle.size * 0.4}px, ${circle.size * 0.7}px, ${circle.size}px)`,
              height: `clamp(${circle.size * 0.4}px, ${circle.size * 0.7}px, ${circle.size}px)`,
              left: circle.x,
              top: circle.y,
            }}
            animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, delay: circle.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto space-y-4 sm:space-y-5 md:space-y-6"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-[0.65rem] sm:text-xs font-medium rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] border border-[var(--color-primary-500)]/20"
            >
              Free &amp; Open Source
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-text)] tracking-tight leading-tight"
            >
              Universal Unit <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)]">
                Converter
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto px-2"
            >
              Convert measurements instantly with speed and precision.
              Height, weight, volume, currency, and planetary gravity — all in one place.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
            >
              <a href="#converters" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" icon={<ArrowRight size={18} />} iconPosition="right" className="w-full sm:w-auto">
                  Explore Converters
                </Button>
              </a>
              <a href="#about" className="w-full sm:w-auto">
                <Button variant="glass" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== MOBILE SEARCH BAR ===== */}
      <div className="sm:hidden mb-4">
        <MobileSearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* ===== MOBILE CONVERTER LIST ===== */}
      <div className="sm:hidden space-y-2">
        {allFiltered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-[var(--color-text-tertiary)]">
              No converters found
            </p>
          </div>
        ) : (
          allFiltered.map((converter, index) => (
            <MobileConverterCard
              key={converter.id}
              converter={converter}
              index={index}
            />
          ))
        )}
      </div>

      {/* ===== DESKTOP CONVERTER GRID ===== */}
      <section id="converters" className="hidden sm:block space-y-4 sm:space-y-5 md:space-y-6 mb-8 sm:mb-10 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">Converters</h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-0.5 sm:mt-1">
            Choose a converter below to get started
          </p>
        </motion.div>

        {filteredConverters.common.length > 0 && (
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredConverters.common.map((converter, index) => (
              <ConverterCard key={converter.id} converter={converter} index={index} />
            ))}
          </div>
        )}

        {(filteredConverters.financial.length > 0 || filteredConverters.specialized.length > 0) && (
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 mt-4 sm:mt-5 md:mt-6">
            {[...filteredConverters.financial, ...filteredConverters.specialized].map(
              (converter, index) => (
                <ConverterCard key={converter.id} converter={converter} index={index + 3} />
              )
            )}
          </div>
        )}
      </section>

      {/* ===== ABOUT SECTION (desktop only) ===== */}
      <section id="about" className="hidden sm:block py-8 sm:py-10 md:py-12">
        <GlassPanel intensity="medium" padding="lg" className="max-w-2xl mx-auto text-center">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text)] mb-3">About</h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
            The Universal Unit Converter is a modern, open-source tool for quick and accurate
            unit conversions. Built with React, TypeScript, and Tailwind CSS, it delivers a
            smooth, responsive experience across all devices.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-xs text-[var(--color-text-tertiary)]">v1.0.0</span>
            <span className="text-xs text-[var(--color-text-tertiary)]">&middot;</span>
            <span className="text-xs text-[var(--color-text-tertiary)]">MIT License</span>
          </div>
        </GlassPanel>
      </section>
    </>
  );
}
