import { describe, expect, it } from "vitest";

import { getRevealCopy, getRoomIntroduction } from "../../ui/presentationCopy";
import { getRoomById, roomRegistry } from "../roomRegistry";

describe("authorable workshop storyboards", () => {
  it("has ten teaching rooms plus finale with 13:10 of room time", () => {
    expect(roomRegistry).toHaveLength(11);
    expect(roomRegistry.map((room) => room.id)).toEqual([
      "room-01", "room-02", "room-03", "room-04", "room-05",
      "room-06", "room-07", "room-08", "room-09", "room-10",
      "room-final",
    ]);

    const roomTime = roomRegistry.reduce(
      (seconds, room) => seconds + room.storyboard.durationSeconds,
      0,
    );

    expect(roomTime).toBe(790);
    // 20 s menu + 790 s rooms + 90 s contingency = 15 min.
    expect(20 + roomTime + 90).toBe(900);
  });

  it("keeps all teaching copy, assets and placeholder spatial data in the registry", () => {
    const roomIds = new Set<string>();
    const revealIds = new Set<string>();
    const hotspotIds = new Set<string>();

    for (const room of roomRegistry) {
      expect(roomIds.has(room.id)).toBe(false);
      roomIds.add(room.id);
      expect(room.width).toBe(1920);
      expect(room.hotspots.length).toBeGreaterThan(0);
      expect(room.storyboard.durationSeconds).toBeGreaterThan(0);

      const sb = room.storyboard;
      for (const text of [
        sb.learningGoal, sb.thesis, sb.takeaway,
        sb.presenterCue, sb.transitionCue,
        sb.introduction.title, sb.introduction.body,
      ]) {
        expect(text.trim().length).toBeGreaterThan(8);
      }

      expect(sb.visual.props.length).toBeGreaterThan(0);
      expect(sb.plannedAssets.sprites.length).toBeGreaterThan(0);
      expect(sb.plannedAssets.audio.length).toBeGreaterThan(0);
      expect(getRoomIntroduction(room.id)).toEqual(sb.introduction);

      const withinRoom = new Set(room.hotspots.map((hotspot) => hotspot.revealId));
      for (const hotspot of room.hotspots) {
        expect(hotspot.x).toBeGreaterThanOrEqual(96);
        expect(hotspot.x).toBeLessThanOrEqual(1824);
        expect(hotspot.y).toBeGreaterThanOrEqual(350);
        expect(hotspot.y).toBeLessThanOrEqual(900);
        expect(hotspot.radius).toBeGreaterThan(0);
        expect(hotspot.content?.title).toBeTruthy();
        expect(hotspot.content?.body).toBeTruthy();
        expect(getRevealCopy(hotspot.revealId)).toEqual(hotspot.content);
        expect(hotspotIds.has(hotspot.id)).toBe(false);
        expect(revealIds.has(hotspot.revealId)).toBe(false);
        hotspotIds.add(hotspot.id);
        revealIds.add(hotspot.revealId);

        for (const dependency of hotspot.requiredRevealIds ?? []) {
          expect(withinRoom.has(dependency)).toBe(true);
          expect(dependency).not.toBe(hotspot.revealId);
        }
      }

      for (const objective of room.objectives) {
        for (const requirement of objective.requiredRevealIds) {
          expect(withinRoom.has(requirement)).toBe(true);
        }
      }
    }
  });

  it("makes every room completable via deterministic presenter reveal order", () => {
    for (const room of roomRegistry) {
      const done = new Set<string>();
      for (let step = 0; step < room.hotspots.length; step++) {
        const next = room.hotspots.find(
          (hotspot) =>
            !done.has(hotspot.revealId) &&
            (hotspot.requiredRevealIds ?? []).every((id) => done.has(id)),
        );

        expect(next, `Blocked reveal chain in ${room.id}`).toBeDefined();
        done.add(next!.revealId);
      }

      expect(done.size).toBe(room.hotspots.length);
      expect(room.objectives.every((obj) =>
        obj.requiredRevealIds.every((id) => done.has(id)),
      )).toBe(true);
    }
  });

  it("provides a programming room with engine and physics learning milestones", () => {
    const room = getRoomById("room-06");
    expect(room).toBeDefined();
    expect(room?.hotspots.map((h) => h.label)).toEqual([
      "Game Loop", "MonoBehaviour", "FixedUpdate",
      "Componentes", "Input System", "Rigidbody2D",
    ]);
    expect(room?.storyboard.durationSeconds).toBe(165);
  });
});
