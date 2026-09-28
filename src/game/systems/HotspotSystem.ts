import type {
  HotspotDefinition,
  HotspotState,
  PresentationState,
  RevealId,
} from "../../presentation/types";

export interface HotspotTarget {
  hotspot: HotspotDefinition;
  state: HotspotState;
  distance: number;
}

export function getHotspotState(
  hotspot: HotspotDefinition,
  presentationState: PresentationState,
): HotspotState {
  if (presentationState.revealed.has(hotspot.revealId)) {
    return "revealed";
  }

  const requirements = hotspot.requiredRevealIds ?? [];
  const unlocked = requirements.every((revealId) =>
    presentationState.revealed.has(revealId),
  );

  return unlocked ? "available" : "locked";
}

export function resolveHotspotTarget(
  hotspots: readonly HotspotDefinition[],
  pointerX: number,
  pointerY: number,
  presentationState: PresentationState,
): HotspotTarget | null {
  let bestTarget: HotspotTarget | null = null;

  for (const hotspot of hotspots) {
    const state = getHotspotState(hotspot, presentationState);

    if (state !== "available") {
      continue;
    }

    const distance = Math.hypot(pointerX - hotspot.x, pointerY - hotspot.y);

    if (distance > hotspot.radius) {
      continue;
    }

    if (!bestTarget || distance < bestTarget.distance) {
      bestTarget = { hotspot, state, distance };
    }
  }

  return bestTarget;
}

export function areRevealRequirementsMet(
  requiredRevealIds: readonly RevealId[] | undefined,
  revealed: ReadonlySet<RevealId>,
): boolean {
  return (requiredRevealIds ?? []).every((revealId) => revealed.has(revealId));
}
