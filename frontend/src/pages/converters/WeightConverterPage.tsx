import { SEOHead } from "@/components/common";
import { WeightConverter } from "@/converters/weight";

export function WeightConverterPage() {
  return (
    <>
      <SEOHead title="Weight Converter" />
      <WeightConverter />
    </>
  );
}
