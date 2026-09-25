import { describe, expect, it } from "vitest";

import { resolveHorizontalDirection } from "../types";

describe("resolveHorizontalDirection", () => {
  it("moves right when the cursor is beyond the dead zone", () => {
    expect(resolveHorizontalDirection(100, 150, 18)).toBe(1);
  });

  it("moves left when the cursor is beyond the dead zone", () => {
    expect(resolveHorizontalDirection(100, 50, 18)).toBe(-1);
  });

  it("stays idle while the target is inside the dead zone", () => {
    expect(resolveHorizontalDirection(100, 112, 18)).toBe(0);
    expect(resolveHorizontalDirection(100, 82, 18)).toBe(0);
  });
});
