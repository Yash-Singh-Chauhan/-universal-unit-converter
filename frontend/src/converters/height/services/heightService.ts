import { convertHeight } from "../utils";
import type { HeightUnitId } from "../types";

export interface HeightConversionRequest {
  value: number;
  fromUnit: HeightUnitId;
  toUnit: HeightUnitId;
}

export interface HeightConversionResult {
  value: number;
  fromUnit: HeightUnitId;
  toUnit: HeightUnitId;
  formula: string;
}

export function performHeightConversion(
  request: HeightConversionRequest
): HeightConversionResult {
  const { value, fromUnit, toUnit } = request;

  if (value < 0) {
    throw new Error("Height value cannot be negative");
  }

  const result = convertHeight(value, fromUnit, toUnit);

  return {
    value: result,
    fromUnit,
    toUnit,
    formula: `${value} ${fromUnit} = ${result} ${toUnit}`,
  };
}
