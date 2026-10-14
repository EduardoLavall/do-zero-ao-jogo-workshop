import { describe, expect, it } from "vitest";

import { createInitialPresentationState } from "../PresentationState";
import { roomRegistry } from "../roomRegistry";
import { STORYBOARD_BUFFER_SECONDS, STORYBOARD_MENU_SECONDS, STORYBOARD_TOTAL_CONTENT_SECONDS } from "../roomStoryboards";

describe("presentation data model", () => {
  it("initializes room state without reveals", () => {
    const state = createInitialPresentationState("room-01");
    expect(state.roomId).toBe("room-01");
    expect(state.started).toBe(false);
    expect(state.revealed.size).toBe(0);
    expect(state.completedObjectives.size).toBe(0);
  });

  it("defines 11 executable storyboard rooms (not the development room)", () => {
    expect(roomRegistry).toHaveLength(11);
    expect(roomRegistry.map((room) => room.id)).toEqual([
      "room-01", "room-02", "room-03", "room-04", "room-05",
      "room-06", "room-07", "room-08", "room-09", "room-10", "room-final",
    ]);

    for (const room of roomRegistry) {
      expect(room.width).toBe(1920);
      expect(room.storyboard.productionStatus).toBe("storyboard");
      expect(room.storyboard.learningGoal.length).toBeGreaterThan(10);
      expect(room.storyboard.question.length).toBeGreaterThan(5);
      expect(room.storyboard.presenterCue.length).toBeGreaterThan(10);
      expect(room.storyboard.takeaway.length).toBeGreaterThan(8);
      expect(room.storyboard.objects.length).toBeGreaterThan(0);
      expect(room.storyboard.assets.length).toBeGreaterThan(0);
      expect(room.storyboard.audio.length).toBeGreaterThan(0);
      expect(room.storyboard.sources.length).toBeGreaterThan(0);
      expect(room.storyboard.transition.prompt.length).toBeGreaterThan(5);
      expect(room.hotspots.length).toBe(room.storyboard.reveals.length);
      expect(room.objectives).toHaveLength(1);
      expect(room.objectives[0]?.requiredRevealIds).toEqual(room.hotspots.map((hotspot) => hotspot.revealId));
      expect(new Set(room.hotspots.map((item) => item.revealId)).size).toBe(room.hotspots.length);

      for (const reveal of room.storyboard.reveals) {
        expect(reveal.content.title).not.toBe("");
        expect(reveal.content.body).not.toBe("");
        expect(reveal.presenterCue.length).toBeGreaterThan(8);
        expect(reveal.hotspot.x).toBeGreaterThan(96);
        expect(reveal.hotspot.x).toBeLessThan(1824);
        expect(reveal.hotspot.y).toBeGreaterThan(300);
        expect(reveal.hotspot.y).toBeLessThan(940);
        expect((reveal.requiredRevealIds ?? []).every((id) => room.hotspots.some((item) => item.revealId === id))).toBe(true);
      }
    }
  });

  it("reserves exactly 13m30s including the menu and 90s of contingency", () => {
    expect(STORYBOARD_MENU_SECONDS).toBe(20);
    expect(STORYBOARD_TOTAL_CONTENT_SECONDS).toBe(790);
    expect(STORYBOARD_MENU_SECONDS + STORYBOARD_TOTAL_CONTENT_SECONDS).toBe(810);
    expect(STORYBOARD_BUFFER_SECONDS).toBe(90);
    expect(STORYBOARD_MENU_SECONDS + STORYBOARD_TOTAL_CONTENT_SECONDS + STORYBOARD_BUFFER_SECONDS).toBe(900);
  });

  it("provides Game Loop, MonoBehaviour and Rigidbody2D code examples for Room 6", () => {
    const room = roomRegistry.find((item) => item.id === "room-06");
    expect(room?.storyboard.reveals).toHaveLength(5);
    const contents = room!.storyboard.reveals.map((item) => item.content);
    expect(contents.some((copy) => copy.code?.includes("while (running)"))).toBe(true);
    expect(contents.some((copy) => copy.code?.includes("FixedUpdate"))).toBe(true);
    expect(contents.some((copy) => copy.title.includes("MonoBehaviour"))).toBe(true);
  });
});
