import type { ConverterUnit } from "@/types";

export const VOLUME_UNITS: ConverterUnit[] = [
  { id: "liters", name: "Liters", symbol: "L", category: "metric" },
  { id: "milliliters", name: "Milliliters", symbol: "mL", category: "metric" },
  { id: "cubicMeters", name: "Cubic Meters", symbol: "m³", category: "metric" },
  { id: "gallons", name: "Gallons", symbol: "gal", category: "us_customary" },
  { id: "quarts", name: "Quarts", symbol: "qt", category: "us_customary" },
  { id: "pints", name: "Pints", symbol: "pt", category: "us_customary" },
  { id: "cups", name: "Cups", symbol: "cup", category: "us_customary" },
  { id: "fluidOunces", name: "Fluid Ounces", symbol: "fl oz", category: "us_customary" },
  { id: "tablespoons", name: "Tablespoons", symbol: "tbsp", category: "us_customary" },
  { id: "teaspoons", name: "Teaspoons", symbol: "tsp", category: "us_customary" },
];

export const VOLUME_CONVERTER_ID = "volume";
export const VOLUME_CONVERTER_TITLE = "Volume Converter";
