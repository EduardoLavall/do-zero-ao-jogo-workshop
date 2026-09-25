import { describe, expect, it } from "vitest";

import { createInitialPresentationState } from "../PresentationState";
import type {
  HotspotDefinition,
  ObjectiveDefinition,
  RoomDefinition,
} from "../types";

describe("presentation core models", () => {
  it("creates an empty initial presentation state", () => {
    const state = createInitialPresentationState("room-01");

    expect(state.roomId).toBe("room-01");
    expect(state.started).toBe(false);
    expect(state.credits).toBe(false);
    expect(state.revealed.size).toBe(0);
    expect(state.completedObjectives.size).toBe(0);
  });

  it("represents a room entirely as data", () => {
    const objective: ObjectiveDefinition = {
      id: "objective-game-loop",
      label: "Reveal Game Loop",
      requiredRevealIds: ["reveal-game-loop"],
    };

    const hotspot: HotspotDefinition = {
      id: "hotspot-game-loop",
      x: 640,
      y: 280,
      radius: 48,
      revealId: "reveal-game-loop",
      objectiveId: objective.id,
    };

    const room: RoomDefinition = {
      id: "room-programming",
      title: "Programação",
      width: 1920,
      objectives: [objective],
      hotspots: [hotspot],
    };

    expect(room.objectives[0]?.id).toBe("objective-game-loop");
    expect(room.hotspots[0]?.revealId).toBe("reveal-game-loop");
    expect(room.width).toBe(1920);
  });
});
