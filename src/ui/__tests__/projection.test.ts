import { describe, expect, it } from "vitest";

import { getOverlayPlacement } from "../projection";

describe("projector overlay placement", () => {
  const parent = { left: 0, top: 0, width: 1280, height: 800 };

  it("fits 1280x720 with correct vertical letterboxing in 16:10", () => {
    expect(
      getOverlayPlacement(
        { left: 0, top: 40, width: 1280, height: 720 },
        parent,
        1920,
        1080,
      ),
    ).toEqual({ left: 0, top: 40, scaleX: 2 / 3, scaleY: 2 / 3 });
  });

  it("tracks canvas offsets when the parent is not at viewport origin", () => {
    const placement = getOverlayPlacement(
      { left: 140, top: 85, width: 960, height: 540 },
      { left: 100, top: 50, width: 1280, height: 720 },
      1920,
      1080,
    );

    expect(placement).toEqual({ left: 40, top: 35, scaleX: 0.5, scaleY: 0.5 });
  });

  it("uses a one-to-one mapping at 1920x1080", () => {
    expect(
      getOverlayPlacement(
        { left: 0, top: 0, width: 1920, height: 1080 },
        { left: 0, top: 0, width: 1920, height: 1080 },
        1920,
        1080,
      ),
    ).toEqual({ left: 0, top: 0, scaleX: 1, scaleY: 1 });
  });
});
