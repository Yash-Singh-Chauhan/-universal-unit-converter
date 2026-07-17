import { SEOHead } from "@/components/common";
import { CurrencyConverter } from "@/converters/currency";

export function CurrencyConverterPage() {
  return (
    <>
      <SEOHead title="Currency Converter" />
      <CurrencyConverter />
    </>
  );
}
