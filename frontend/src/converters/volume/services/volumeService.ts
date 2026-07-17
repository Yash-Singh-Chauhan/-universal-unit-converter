import { convertVolume } from "../utils";
import type { VolumeUnitId } from "../types";

export function performVolumeConversion(
  value: number,
  fromUnit: VolumeUnitId,
  toUnit: VolumeUnitId
): { value: number; formula: string } {
  const result = convertVolume(value, fromUnit, toUnit);
  return {
    value: result,
    formula: `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`,
  };
}
