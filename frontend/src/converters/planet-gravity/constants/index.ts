import type { ConverterUnit } from "@/types";

/**
 * Surface gravity relative to Earth (1.0 = Earth gravity).
 * Scientifically accurate multipliers based on NASA/JPL data.
 */
export const GRAVITY_FACTORS: Record<string, number> = {
  mercury: 0.38,
  venus: 0.91,
  earth: 1.0,
  mars: 0.38,
  jupiter: 2.34,
  saturn: 1.06,
  uranus: 0.89,
  neptune: 1.14,
  moon: 0.166,
  sun: 27.9,
};

export const PLANET_GRAVITY_UNITS: ConverterUnit[] = [
  { id: "mercury", name: "Mercury", symbol: "☿", category: "scientific" },
  { id: "venus", name: "Venus", symbol: "♀", category: "scientific" },
  { id: "earth", name: "Earth", symbol: "🌍", category: "scientific" },
  { id: "mars", name: "Mars", symbol: "♂", category: "scientific" },
  { id: "jupiter", name: "Jupiter", symbol: "♃", category: "scientific" },
  { id: "saturn", name: "Saturn", symbol: "♄", category: "scientific" },
  { id: "uranus", name: "Uranus", symbol: "⛢", category: "scientific" },
  { id: "neptune", name: "Neptune", symbol: "♆", category: "scientific" },
  { id: "moon", name: "Moon", symbol: "☾", category: "scientific" },
  { id: "sun", name: "Sun", symbol: "☀", category: "scientific" },
];

export const PLANET_GRAVITY_CONVERTER_ID = "planet-gravity";
export const PLANET_GRAVITY_CONVERTER_TITLE = "Planet Weight Converter";
