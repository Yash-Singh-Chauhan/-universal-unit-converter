import type { VolumeUnitId } from "../types";

const TO_LITERS: Record<string, number> = {
  liters: 1,
  milliliters: 0.001,
  cubicMeters: 1000,
  gallons: 3.78541,
  quarts: 0.946353,
  pints: 0.473176,
  cups: 0.236588,
  fluidOunces: 0.0295735,
  tablespoons: 0.0147868,
  teaspoons: 0.00492892,
};

export function convertVolume(
  value: number,
  fromUnit: VolumeUnitId,
  toUnit: VolumeUnitId
): number {
  const fromFactor = TO_LITERS[fromUnit];
  const toFactor = TO_LITERS[toUnit];

  if (!fromFactor || !toFactor) {
    throw new Error(`Unknown volume unit: ${fromUnit} or ${toUnit}`);
  }

  const inLiters = value * fromFactor;
  return inLiters / toFactor;
}
