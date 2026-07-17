import { convertWeight } from "../utils";
import type { WeightUnitId } from "../types";

export function performWeightConversion(
  value: number,
  fromUnit: WeightUnitId,
  toUnit: WeightUnitId
): { value: number; formula: string } {
  const result = convertWeight(value, fromUnit, toUnit);
  return {
    value: result,
    formula: `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`,
  };
}
