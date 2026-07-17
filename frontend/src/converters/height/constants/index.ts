import type { ConverterUnit } from "@/types";

export const HEIGHT_UNITS: ConverterUnit[] = [
  { id: "meters", name: "Meters", symbol: "m", category: "metric" },
  { id: "centimeters", name: "Centimeters", symbol: "cm", category: "metric" },
  { id: "millimeters", name: "Millimeters", symbol: "mm", category: "metric" },
  { id: "kilometers", name: "Kilometers", symbol: "km", category: "metric" },
  { id: "feet", name: "Feet", symbol: "ft", category: "imperial" },
  { id: "inches", name: "Inches", symbol: "in", category: "imperial" },
  { id: "yards", name: "Yards", symbol: "yd", category: "imperial" },
  { id: "miles", name: "Miles", symbol: "mi", category: "imperial" },
];

export const HEIGHT_CONVERTER_ID = "height";
export const HEIGHT_CONVERTER_TITLE = "Height Converter";
