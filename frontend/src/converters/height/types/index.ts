export type HeightUnitId =
  | "meters"
  | "centimeters"
  | "millimeters"
  | "kilometers"
  | "feet"
  | "inches"
  | "yards"
  | "miles";

export interface HeightConversionFactors {
  [key: string]: number; // conversion factor relative to meters
}
