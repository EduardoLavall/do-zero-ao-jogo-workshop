import { describe, expect, it } from "vitest";

import { getProjectileTravelDurationMs } from "../entities/Arrow";

describe("Arrow", () => {
  it("calculates deterministic travel duration from distance and speed", () => {
    expect(getProjectileTravelDurationMs(0, 0, 900, 0, 900)).toBe(1000);
  });

  it("supports diagonal travel", () => {
    expect(getProjectileTravelDurationMs(0, 0, 300, 400, 500)).toBe(1000);
  });
});
