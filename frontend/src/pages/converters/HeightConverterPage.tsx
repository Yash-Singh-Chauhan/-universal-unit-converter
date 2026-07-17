import { SEOHead } from "@/components/common";
import { HeightConverter } from "@/converters/height";

export function HeightConverterPage() {
  return (
    <>
      <SEOHead title="Height Converter" />
      <HeightConverter />
    </>
  );
}
