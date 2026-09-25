import { describe, expect, it } from "vitest";

import { getEntryX, resolveRoomExit } from "../systems/RoomTransition";

describe("fixed Slide Room transitions", () => {
  it("resolves the left exit zone as previous", () => {
    expect(resolveRoomExit(50, 1920)).toBe("previous");
  });

  it("resolves the right exit zone as next", () => {
    expect(resolveRoomExit(1870, 1920)).toBe("next");
  });

  it("returns no transition while player is inside the room", () => {
    expect(resolveRoomExit(960, 1920)).toBeNull();
  });

  it("spawns at the opposite side after a room transition", () => {
    expect(getEntryX("next", 1920)).toBe(140);
    expect(getEntryX("previous", 1920)).toBe(1780);
  });
});
