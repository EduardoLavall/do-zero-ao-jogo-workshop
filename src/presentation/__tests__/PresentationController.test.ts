import { describe, expect, it, vi } from "vitest";

import { PresentationController } from "../PresentationController";
import { developmentRoom, roomRegistry } from "../roomRegistry";

describe("PresentationController", () => {
  it("starts in the first narrative room and supports start once", () => {
    const controller = new PresentationController();
    const listener = vi.fn();
    controller.subscribe(listener);

    expect(controller.getState().roomId).toBe("room-01");
    expect(controller.getCurrentRoom().title).toBe("O que é um jogo?");
    expect(controller.getState().started).toBe(false);
    expect(controller.start()).toBe(true);
    expect(controller.start()).toBe(false);
    expect(listener).toHaveBeenCalledWith({ type: "presentation:started", roomId: "room-01" });
  });

  it("navigates across exactly 11 narrative rooms and stops at the ends", () => {
    const controller = new PresentationController();
    expect(controller.previousRoom()).toBe(false);
    for (let i = 1; i < roomRegistry.length; i += 1) {
      expect(controller.nextRoom()).toBe(true);
      expect(controller.getState().roomId).toBe(roomRegistry[i]?.id);
    }
    expect(controller.nextRoom()).toBe(false);
    expect(controller.getState().roomId).toBe("room-final");
    expect(controller.previousRoom()).toBe(true);
    expect(controller.getState().roomId).toBe("room-10");
  });

  it("rejects unknown rooms, but accepts the isolated development lab", () => {
    const controller = new PresentationController();
    expect(controller.enterRoom("room-404")).toBe(false);
    expect(controller.enterRoom(developmentRoom.id)).toBe(true);
    expect(controller.getCurrentRoom().id).toBe("dev-interactions");
    expect(roomRegistry.some((room) => room.id === "dev-interactions")).toBe(false);
  });

  it("persists reveals and automatic objectives independently in each room", () => {
    const controller = new PresentationController();
    controller.start();
    const roomOne = controller.getCurrentRoom();
    for (const target of roomOne.hotspots) {
      expect(controller.reveal(target.revealId)).toBe(true);
    }
    expect(controller.getState().completedObjectives.has(roomOne.objectives[0]!.id)).toBe(true);

    expect(controller.nextRoom()).toBe(true);
    const roomTwo = controller.getCurrentRoom();
    expect(controller.getState().revealed.size).toBe(0);
    expect(controller.reveal(roomTwo.hotspots[0]!.revealId)).toBe(true);

    expect(controller.previousRoom()).toBe(true);
    expect(controller.getState().started).toBe(true);
    expect(controller.getState().revealed.size).toBe(roomOne.hotspots.length);
    expect(controller.getState().completedObjectives.has(roomOne.objectives[0]!.id)).toBe(true);

    controller.resetRoom();
    expect(controller.getState().revealed.size).toBe(0);
    expect(controller.getState().completedObjectives.size).toBe(0);
    expect(controller.getState().started).toBe(true);

    expect(controller.nextRoom()).toBe(true);
    expect(controller.getState().revealed.has(roomTwo.hotspots[0]!.revealId)).toBe(true);
  });

  it("does not reveal unknown, locked or already revealed targets", () => {
    const controller = new PresentationController(developmentRoom.id);
    expect(controller.reveal("unknown-reveal")).toBe(false);
    expect(controller.reveal("test-locked")).toBe(false);
    expect(controller.reveal("test-alpha")).toBe(true);
    expect(controller.reveal("test-alpha")).toBe(false);
    expect(controller.reveal("test-locked")).toBe(true);
  });

  it("derives objective completion exactly once from requirements", () => {
    const controller = new PresentationController(developmentRoom.id);
    const events = vi.fn();
    controller.subscribe(events);

    expect(controller.completeObjective("dev-complete")).toBe(false);
    for (const target of developmentRoom.hotspots) {
      expect(controller.reveal(target.revealId)).toBe(true);
    }

    expect(controller.getState().completedObjectives.has("dev-complete")).toBe(true);
    expect(controller.completeObjective("dev-complete")).toBe(false);
    expect(events.mock.calls.filter(([event]) => event.type === "objective:completed")).toHaveLength(1);
  });

  it("notifies on navigation/reveal/reset and supports unsubscribe", () => {
    const controller = new PresentationController();
    const listener = vi.fn();
    const unsubscribe = controller.subscribe(listener);
    const revealId = roomRegistry[0]!.hotspots[0]!.revealId;

    expect(controller.reveal(revealId)).toBe(true);
    expect(controller.nextRoom()).toBe(true);
    controller.resetRoom();
    expect(listener).toHaveBeenCalledWith({ type: "hotspot:revealed", revealId });
    expect(listener).toHaveBeenCalledWith({ type: "presentation:next", roomId: "room-02" });
    expect(listener).toHaveBeenCalledWith({ type: "room:entered", roomId: "room-02" });
    expect(listener).toHaveBeenCalledWith({ type: "presentation:reset", roomId: "room-02" });

    unsubscribe();
    const callCount = listener.mock.calls.length;
    controller.previousRoom();
    expect(listener).toHaveBeenCalledTimes(callCount);
  });
});
