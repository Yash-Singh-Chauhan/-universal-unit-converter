import type { WeightUnitId } from "../types";

const TO_KILOGRAMS: Record<string, number> = {
  kilograms: 1,
  grams: 0.001,
  milligrams: 0.000001,
  metricTons: 1000,
  pounds: 0.453592,
  ounces: 0.0283495,
  stones: 6.35029,
};

export function convertWeight(
  value: number,
  fromUnit: WeightUnitId,
  toUnit: WeightUnitId
): number {
  const fromFactor = TO_KILOGRAMS[fromUnit];
  const toFactor = TO_KILOGRAMS[toUnit];

  if (!fromFactor || !toFactor) {
    throw new Error(`Unknown weight unit: ${fromUnit} or ${toUnit}`);
  }

  const inKilograms = value * fromFactor;
  return inKilograms / toFactor;
}
