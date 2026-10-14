import { describe, expect, it, vi } from "vitest";

import { PresentationController } from "../PresentationController";

describe("PresentationController", () => {
  it("starts in the first authored workshop room by default", () => {
    const controller = new PresentationController();

    expect(controller.getState().roomId).toBe("room-01");
    expect(controller.getCurrentRoom().title).toBe("O que é um jogo?");
  });

  it("starts exactly once and preserves started across room changes and reset", () => {
    const controller = new PresentationController();
    const listener = vi.fn();
    controller.subscribe(listener);

    expect(controller.getState().started).toBe(false);
    expect(controller.start()).toBe(true);
    expect(controller.start()).toBe(false);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({
      type: "presentation:started",
      roomId: "room-01",
    });

    controller.nextRoom();
    expect(controller.getState().started).toBe(true);
    controller.resetRoom();
    expect(controller.getState().started).toBe(true);
    controller.previousRoom();
    expect(controller.getState().started).toBe(true);
  });

  it("navigates to the next and previous rooms", () => {
    const controller = new PresentationController();

    expect(controller.nextRoom()).toBe(true);
    expect(controller.getState().roomId).toBe("room-02");

    // The eleven authored rooms replace the old two-room interaction lab.
    for (let i = 0; i < 9; i++) {
      expect(controller.nextRoom()).toBe(true);
    }

    expect(controller.getState().roomId).toBe("room-final");
    expect(controller.getState().credits).toBe(true);
    expect(controller.nextRoom()).toBe(false);

    for (let i = 0; i < 9; i++) {
      expect(controller.previousRoom()).toBe(true);
    }

    expect(controller.getState().roomId).toBe("room-02");
    expect(controller.previousRoom()).toBe(true);
    expect(controller.getState().roomId).toBe("room-01");

    expect(controller.previousRoom()).toBe(false);
  });

  it("enters a known room and rejects an unknown room", () => {
    const controller = new PresentationController();

    expect(controller.enterRoom("room-02")).toBe(true);
    expect(controller.getState().roomId).toBe("room-02");

    expect(controller.enterRoom("room-404")).toBe(false);
    expect(controller.getState().roomId).toBe("room-02");
  });

  it("resets room-local progress without changing the current room", () => {
    const controller = new PresentationController("room-02");

    controller.reveal("reveal-a");
    controller.completeObjective("objective-a");

    expect(controller.getState().revealed.has("reveal-a")).toBe(true);
    expect(controller.getState().completedObjectives.has("objective-a")).toBe(true);

    controller.resetRoom();

    expect(controller.getState().roomId).toBe("room-02");
    expect(controller.getState().revealed.size).toBe(0);
    expect(controller.getState().completedObjectives.size).toBe(0);
  });

  it("emits explicit events for presentation consumers", () => {
    const controller = new PresentationController();
    const listener = vi.fn();
    controller.subscribe(listener);

    controller.reveal("reveal-a");
    controller.completeObjective("objective-a");
    controller.nextRoom();
    controller.resetRoom();

    expect(listener).toHaveBeenCalledWith({
      type: "hotspot:revealed",
      revealId: "reveal-a",
    });
    expect(listener).toHaveBeenCalledWith({
      type: "objective:completed",
      objectiveId: "objective-a",
    });
    expect(listener).toHaveBeenCalledWith({
      type: "presentation:next",
      roomId: "room-02",
    });
    expect(listener).toHaveBeenCalledWith({
      type: "room:entered",
      roomId: "room-02",
    });
    expect(listener).toHaveBeenCalledWith({
      type: "presentation:reset",
      roomId: "room-02",
    });
  });

  it("retains reveals when revisiting a room and resets only the current room", () => {
    const controller = new PresentationController("room-06");
    controller.start();

    const roomSix = controller.getCurrentRoom();
    const first = roomSix.hotspots[0]!;
    controller.reveal(first.revealId);

    controller.nextRoom();
    const roomSeven = controller.getCurrentRoom();
    const roomSevenReveal = roomSeven.hotspots[0]!.revealId;
    controller.reveal(roomSevenReveal);

    controller.previousRoom();
    expect(controller.getState().started).toBe(true);
    expect(controller.getState().revealed.has(first.revealId)).toBe(true);
    expect(controller.getState().revealed.has(roomSevenReveal)).toBe(false);

    controller.resetRoom();
    expect(controller.getState().revealed.size).toBe(0);
    controller.nextRoom();
    expect(controller.getState().revealed.has(roomSevenReveal)).toBe(true);
  });

  it("auto-completes a room objective when all required reveals are present", () => {
    const controller = new PresentationController("room-01");
    const room = controller.getCurrentRoom();
    const objective = room.objectives[0]!;

    for (const id of objective.requiredRevealIds) {
      expect(controller.reveal(id)).toBe(true);
    }

    expect(controller.getState().completedObjectives.has(objective.id)).toBe(true);
    expect(controller.reveal(objective.requiredRevealIds[0]!)).toBe(false);
  });

  it("supports unsubscribing from events", () => {
    const controller = new PresentationController();
    const listener = vi.fn();
    const unsubscribe = controller.subscribe(listener);

    unsubscribe();
    controller.reveal("reveal-a");

    expect(listener).not.toHaveBeenCalled();
  });
});
