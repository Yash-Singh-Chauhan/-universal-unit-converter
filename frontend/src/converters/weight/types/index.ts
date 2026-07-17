export type WeightUnitId =
  | "kilograms"
  | "grams"
  | "milligrams"
  | "metricTons"
  | "pounds"
  | "ounces"
  | "stones";

export interface WeightConversionFactors {
  [key: string]: number;
}
