import type { HeightUnitId } from "../types";

/**
 * Conversion factors relative to 1 meter.
 */
const TO_METERS: Record<string, number> = {
  meters: 1,
  centimeters: 0.01,
  millimeters: 0.001,
  kilometers: 1000,
  feet: 0.3048,
  inches: 0.0254,
  yards: 0.9144,
  miles: 1609.344,
};

export function convertHeight(
  value: number,
  fromUnit: HeightUnitId,
  toUnit: HeightUnitId
): number {
  const fromFactor = TO_METERS[fromUnit];
  const toFactor = TO_METERS[toUnit];

  if (!fromFactor || !toFactor) {
    throw new Error(`Unknown height unit: ${fromUnit} or ${toUnit}`);
  }

  // Convert to meters first, then to target unit
  const inMeters = value * fromFactor;
  return inMeters / toFactor;
}

export function getHeightConversionFormula(
  fromUnit: HeightUnitId,
  toUnit: HeightUnitId
): string {
  return `Multiply ${fromUnit} by the conversion factor to get ${toUnit}`;
}
