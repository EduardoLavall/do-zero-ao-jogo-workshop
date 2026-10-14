import { describe, expect, it } from "vitest";

import { InputTraceModel } from "../models/InputTraceModel";

describe("InputTraceModel", () => {
  it("produces different observable state from MOVE vs JUMP", () => {
    const left = new InputTraceModel();
    const right = new InputTraceModel();
    expect(left.dispatch("move")).toMatchObject({ x: 1, height: 0, commands: 1 });
    expect(right.dispatch("jump")).toMatchObject({ x: 0, height: 1, commands: 1 });
    expect(left.getState()).not.toEqual(right.getState());
  });

  it("limits travel and reset returns to initial state", () => {
    const model = new InputTraceModel();
    for (let i = 0; i < 20; i += 1) model.dispatch("move");
    expect(model.getState().x).toBe(6);
    model.dispatch("jump");
    expect(model.getState().height).toBe(1);
    model.dispatch("jump");
    expect(model.getState().height).toBe(0);
    model.reset();
    expect(model.getState()).toEqual({ x: 0, height: 0, commands: 0, lastCommand: null });
  });

  it("returns an immutable snapshot of its state", () => {
    const model = new InputTraceModel();
    const copy = model.getState() as { x: number };
    copy.x = 1000;
    expect(model.getState().x).toBe(0);
  });
});
