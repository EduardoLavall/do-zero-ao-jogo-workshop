import { describe, expect, it } from "vitest";

import { createInitialPresentationState } from "../../presentation/PresentationState";
import type { HotspotDefinition } from "../../presentation/types";
import {
  getHotspotState,
  resolveHotspotTarget,
} from "../systems/HotspotSystem";

const hotspots: readonly HotspotDefinition[] = [
  {
    id: "near",
    x: 100,
    y: 100,
    radius: 80,
    revealId: "reveal-near",
  },
  {
    id: "far",
    x: 150,
    y: 100,
    radius: 120,
    revealId: "reveal-far",
  },
  {
    id: "locked",
    x: 300,
    y: 100,
    radius: 80,
    revealId: "reveal-locked",
    requiredRevealIds: ["unlock-token"],
  },
];

describe("HotspotSystem", () => {
  it("selects the nearest available hotspot inside tolerance", () => {
    const state = createInitialPresentationState("room-01");
    const target = resolveHotspotTarget(hotspots, 110, 100, state);

    expect(target?.hotspot.id).toBe("near");
  });

  it("returns null outside every hotspot radius", () => {
    const state = createInitialPresentationState("room-01");

    expect(resolveHotspotTarget(hotspots, 1000, 1000, state)).toBeNull();
  });

  it("does not select locked hotspots", () => {
    const state = createInitialPresentationState("room-01");

    expect(getHotspotState(hotspots[2]!, state)).toBe("locked");
    expect(resolveHotspotTarget(hotspots, 300, 100, state)).toBeNull();
  });

  it("unlocks hotspots when reveal requirements are met", () => {
    const state = {
      ...createInitialPresentationState("room-01"),
      revealed: new Set(["unlock-token"]),
    };

    expect(getHotspotState(hotspots[2]!, state)).toBe("available");
  });

  it("ignores already revealed hotspots", () => {
    const state = {
      ...createInitialPresentationState("room-01"),
      revealed: new Set(["reveal-near"]),
    };

    expect(getHotspotState(hotspots[0]!, state)).toBe("revealed");
    expect(resolveHotspotTarget(hotspots, 100, 100, state)?.hotspot.id).toBe("far");
  });
});
