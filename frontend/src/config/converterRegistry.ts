import {
  Ruler,
  Weight,
  FlaskConical,
  Coins,
  Globe,
  type LucideIcon,
} from "lucide-react";
import type { ConverterDefinition } from "@/types";

/**
 * Converter Registry
 *
 * All converters register themselves here.
 * To add a new converter:
 * 1. Import its icon and create a ConverterDefinition
 * 2. Add it to the `converters` array
 * 3. Create the converter module in src/converters/<name>/
 * 4. Add the route in src/routes/routeConfig.ts
 * 5. Add the page in src/pages/converters/
 */

export const converterDefinitions: ConverterDefinition[] = [
  {
    id: "height",
    title: "Height Converter",
    description: "Convert between meters, feet, inches, centimeters, and more",
    icon: Ruler as LucideIcon,
    route: "/height",
    category: "common",
    supportedUnits: [
      { id: "meters", name: "Meters", symbol: "m", category: "metric" },
      {
        id: "centimeters",
        name: "Centimeters",
        symbol: "cm",
        category: "metric",
      },
      {
        id: "millimeters",
        name: "Millimeters",
        symbol: "mm",
        category: "metric",
      },
      { id: "kilometers", name: "Kilometers", symbol: "km", category: "metric" },
      { id: "feet", name: "Feet", symbol: "ft", category: "imperial" },
      { id: "inches", name: "Inches", symbol: "in", category: "imperial" },
      { id: "yards", name: "Yards", symbol: "yd", category: "imperial" },
      { id: "miles", name: "Miles", symbol: "mi", category: "imperial" },
    ],
  },
  {
    id: "weight",
    title: "Weight Converter",
    description: "Convert between kilograms, pounds, ounces, grams, and more",
    icon: Weight as LucideIcon,
    route: "/weight",
    category: "common",
    supportedUnits: [
      { id: "kilograms", name: "Kilograms", symbol: "kg", category: "metric" },
      { id: "grams", name: "Grams", symbol: "g", category: "metric" },
      { id: "milligrams", name: "Milligrams", symbol: "mg", category: "metric" },
      {
        id: "metricTons",
        name: "Metric Tons",
        symbol: "t",
        category: "metric",
      },
      { id: "pounds", name: "Pounds", symbol: "lb", category: "imperial" },
      { id: "ounces", name: "Ounces", symbol: "oz", category: "imperial" },
      { id: "stones", name: "Stones", symbol: "st", category: "imperial" },
    ],
  },
  {
    id: "volume",
    title: "Volume Converter",
    description: "Convert between liters, gallons, cups, milliliters, and more",
    icon: FlaskConical as LucideIcon,
    route: "/volume",
    category: "common",
    supportedUnits: [
      { id: "liters", name: "Liters", symbol: "L", category: "metric" },
      {
        id: "milliliters",
        name: "Milliliters",
        symbol: "mL",
        category: "metric",
      },
      {
        id: "cubicMeters",
        name: "Cubic Meters",
        symbol: "m³",
        category: "metric",
      },
      { id: "gallons", name: "Gallons", symbol: "gal", category: "us_customary" },
      { id: "quarts", name: "Quarts", symbol: "qt", category: "us_customary" },
      { id: "pints", name: "Pints", symbol: "pt", category: "us_customary" },
      { id: "cups", name: "Cups", symbol: "cup", category: "us_customary" },
      {
        id: "fluidOunces",
        name: "Fluid Ounces",
        symbol: "fl oz",
        category: "us_customary",
      },
      {
        id: "tablespoons",
        name: "Tablespoons",
        symbol: "tbsp",
        category: "us_customary",
      },
      {
        id: "teaspoons",
        name: "Teaspoons",
        symbol: "tsp",
        category: "us_customary",
      },
    ],
  },
  {
    id: "currency",
    title: "Currency Converter",
    description: "Live currency conversion with up-to-date exchange rates",
    icon: Coins as LucideIcon,
    route: "/currency",
    category: "financial",
    supportedUnits: [
      { id: "USD", name: "US Dollar", symbol: "$", category: "metric" },
      { id: "EUR", name: "Euro", symbol: "€", category: "metric" },
      { id: "GBP", name: "British Pound", symbol: "£", category: "metric" },
      { id: "JPY", name: "Japanese Yen", symbol: "¥", category: "metric" },
      { id: "CAD", name: "Canadian Dollar", symbol: "CA$", category: "metric" },
      { id: "AUD", name: "Australian Dollar", symbol: "A$", category: "metric" },
      { id: "CHF", name: "Swiss Franc", symbol: "CHF", category: "metric" },
      { id: "CNY", name: "Chinese Yuan", symbol: "¥", category: "metric" },
      { id: "INR", name: "Indian Rupee", symbol: "₹", category: "metric" },
      { id: "MXN", name: "Mexican Peso", symbol: "Mex$", category: "metric" },
      { id: "BRL", name: "Brazilian Real", symbol: "R$", category: "metric" },
      { id: "KRW", name: "South Korean Won", symbol: "₩", category: "metric" },
    ],
  },
  {
    id: "planet-gravity",
    title: "Planet Weight Converter",
    description: "Calculate your weight on other planets and celestial bodies",
    icon: Globe as LucideIcon,
    route: "/planet-gravity",
    category: "specialized",
    supportedUnits: [
      { id: "mercury", name: "Mercury", symbol: "☿", category: "scientific" },
      { id: "venus", name: "Venus", symbol: "♀", category: "scientific" },
      { id: "earth", name: "Earth", symbol: "🌍", category: "scientific" },
      { id: "mars", name: "Mars", symbol: "♂", category: "scientific" },
      { id: "jupiter", name: "Jupiter", symbol: "♃", category: "scientific" },
      { id: "saturn", name: "Saturn", symbol: "♄", category: "scientific" },
      { id: "uranus", name: "Uranus", symbol: "⛢", category: "scientific" },
      { id: "neptune", name: "Neptune", symbol: "♆", category: "scientific" },
      { id: "moon", name: "Moon", symbol: "☾", category: "scientific" },
      { id: "sun", name: "Sun", symbol: "☀", category: "scientific" },
    ],
  },
];

export const converterMap = new Map(
  converterDefinitions.map((def) => [def.id, def])
);

export const converterRoutes = converterDefinitions.map((def) => ({
  path: def.route,
  id: def.id,
  title: def.title,
  icon: def.icon,
}));

export function getConverterById(id: string): ConverterDefinition | undefined {
  return converterMap.get(id);
}

export function getConverterByRoute(route: string): ConverterDefinition | undefined {
  return converterDefinitions.find((def) => def.route === route);
}
