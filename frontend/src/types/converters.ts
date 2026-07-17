import type { LucideIcon } from "lucide-react";

export interface ConverterUnit {
  id: string;
  name: string;
  symbol: string;
  category: UnitCategory;
}

export type UnitCategory = "metric" | "imperial" | "us_customary" | "scientific";

export interface ConverterDefinition {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  category: ConverterCategory;
  supportedUnits: ConverterUnit[];
}

export type ConverterCategory =
  | "common"
  | "scientific"
  | "financial"
  | "specialized";

export interface ConverterState {
  inputValue: string;
  inputUnit: string;
  outputValue: string;
  outputUnit: string;
  isConverting: boolean;
  error: string | null;
}

export interface ConversionRequest {
  value: number;
  fromUnit: string;
  toUnit: string;
}

export interface ConversionResult {
  value: number;
  fromUnit: string;
  toUnit: string;
  formula: string;
}
