import type { PlanetGravityUnitId } from "../types";
import { GRAVITY_FACTORS } from "../constants";

export function getGravityFactor(planet: PlanetGravityUnitId): number {
  const factor = GRAVITY_FACTORS[planet];
  if (factor === undefined) {
    throw new Error(`Unknown planet: ${planet}`);
  }
  return factor;
}

/**
 * Convert a weight from one celestial body to another.
 *
 * Formula: weightOnTarget = weightOnSource × (gravityTarget / gravitySource)
 *
 * If the source is Earth (gravity=1.0), this simplifies to:
 *   weightOnTarget = weightOnEarth × gravityTarget
 */
export function convertPlanetGravity(
  weightOnSource: number,
  sourcePlanet: PlanetGravityUnitId,
  targetPlanet: PlanetGravityUnitId
): number {
  const sourceGravity = getGravityFactor(sourcePlanet);
  const targetGravity = getGravityFactor(targetPlanet);

  // Convert source weight → equivalent Earth weight → target weight
  const earthEquivalent = weightOnSource / sourceGravity;
  return earthEquivalent * targetGravity;
}
