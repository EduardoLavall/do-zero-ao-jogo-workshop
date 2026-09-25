import { describe, expect, it, vi } from "vitest";

import { PresentationController } from "../PresentationController";

describe("PresentationController", () => {
  it("starts in the first placeholder room by default", () => {
    const controller = new PresentationController();

    expect(controller.getState().roomId).toBe("room-01");
    expect(controller.getCurrentRoom().title).toBe("Room 01");
  });

  it("navigates to the next and previous rooms", () => {
    const controller = new PresentationController();

    expect(controller.nextRoom()).toBe(true);
    expect(controller.getState().roomId).toBe("room-02");

    expect(controller.nextRoom()).toBe(false);
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

  it("supports unsubscribing from events", () => {
    const controller = new PresentationController();
    const listener = vi.fn();
    const unsubscribe = controller.subscribe(listener);

    unsubscribe();
    controller.reveal("reveal-a");

    expect(listener).not.toHaveBeenCalled();
  });
});
