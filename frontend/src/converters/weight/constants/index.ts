import type { ConverterUnit } from "@/types";

export const WEIGHT_UNITS: ConverterUnit[] = [
  { id: "kilograms", name: "Kilograms", symbol: "kg", category: "metric" },
  { id: "grams", name: "Grams", symbol: "g", category: "metric" },
  { id: "milligrams", name: "Milligrams", symbol: "mg", category: "metric" },
  { id: "metricTons", name: "Metric Tons", symbol: "t", category: "metric" },
  { id: "pounds", name: "Pounds", symbol: "lb", category: "imperial" },
  { id: "ounces", name: "Ounces", symbol: "oz", category: "imperial" },
  { id: "stones", name: "Stones", symbol: "st", category: "imperial" },
];

export const WEIGHT_CONVERTER_ID = "weight";
export const WEIGHT_CONVERTER_TITLE = "Weight Converter";
