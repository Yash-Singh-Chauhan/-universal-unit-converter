import { SEOHead } from "@/components/common";
import { VolumeConverter } from "@/converters/volume";

export function VolumeConverterPage() {
  return (
    <>
      <SEOHead title="Volume Converter" />
      <VolumeConverter />
    </>
  );
}
