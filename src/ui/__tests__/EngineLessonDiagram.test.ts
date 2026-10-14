import { describe, expect, it } from "vitest";

import { getEngineLessonDiagram } from "../EngineLessonDiagram";
import { getRoomById } from "../../presentation/roomRegistry";

describe("Engine Lab teaching panels", () => {
  const room = getRoomById("room-06")!;

  it("provides a diagram for every Room 6 reveal and no other room", () => {
    expect(room.hotspots).toHaveLength(6);

    for (const hotspot of room.hotspots) {
      const diagram = getEngineLessonDiagram(hotspot.revealId);
      expect(diagram?.caption.length).toBeGreaterThan(12);
      expect(diagram?.steps).toHaveLength(3);
      expect(diagram?.hint.length).toBeGreaterThan(25);
      expect(hotspot.content?.body.length).toBeGreaterThan(45);
      expect(hotspot.content?.code).toBeTruthy();
    }

    expect(getEngineLessonDiagram("room-01-regras")).toBeNull();
  });

  it("keeps didactic examples technically distinguishable", () => {
    const byId = new Map(room.hotspots.map((hotspot) => [hotspot.revealId, hotspot]));
    expect(byId.get("room-06-game-loop")?.content?.code).toContain("while (running)");
    expect(byId.get("room-06-lifecycle")?.content?.code).toContain("Update");
    expect(byId.get("room-06-fixedupdate")?.content?.code).toContain("FixedUpdate");
    expect(byId.get("room-06-components")?.content?.code).toContain("GetComponent");
    expect(byId.get("room-06-input")?.content?.code).toContain("UnityEngine.InputSystem");
    expect(byId.get("room-06-physics")?.content?.code).toContain("ForceMode2D.Impulse");
    expect(room.storyboard.durationSeconds).toBe(165);
  });

  it("requires components and fixed update before physics reveal", () => {
    const physics = room.hotspots.find((hotspot) => hotspot.id === "room-06-physics");
    expect(physics?.requiredRevealIds).toEqual([
      "room-06-components",
      "room-06-fixedupdate",
    ]);
  });
});
