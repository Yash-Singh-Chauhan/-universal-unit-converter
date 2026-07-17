import { SEOHead } from "@/components/common";
import { PlanetGravityConverter } from "@/converters/planet-gravity";

export function PlanetGravityConverterPage() {
  return (
    <>
      <SEOHead title="Planet Weight Converter" />
      <PlanetGravityConverter />
    </>
  );
}
