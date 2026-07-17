import { convertPlanetGravity, getGravityFactor } from "../utils";
import type { PlanetGravityUnitId } from "../types";

export interface PlanetGravityRequest {
  value: number;
  fromUnit: PlanetGravityUnitId;
  toUnit: PlanetGravityUnitId;
}

export function performPlanetGravityConversion(
  request: PlanetGravityRequest
): { value: number; formula: string } {
  const { value, fromUnit, toUnit } = request;

  if (value < 0) {
    throw new Error("Weight cannot be negative");
  }

  const result = convertPlanetGravity(value, fromUnit, toUnit);
  const fromGravity = getGravityFactor(fromUnit);
  const toGravity = getGravityFactor(toUnit);

  const multiplier = toGravity / fromGravity;
  return {
    value: result,
    formula: `${value} kg × ${multiplier.toFixed(4)} = ${result.toFixed(2)} kg on ${toUnit}`,
  };
}
