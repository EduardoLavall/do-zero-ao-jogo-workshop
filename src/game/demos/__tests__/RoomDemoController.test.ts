import { describe, expect, it, vi } from "vitest";

import { RoomDemoController } from "../RoomDemoController";
import type { RoomDemo } from "../RoomDemoController";

function fixture() {
  const demos: RoomDemo[] = [];
  const factory = (): RoomDemo => {
    const instance: RoomDemo = {
      mount: vi.fn(),
      activate: vi.fn(),
      update: vi.fn(),
      reset: vi.fn(),
      dispose: vi.fn(),
    };
    demos.push(instance);
    return instance;
  };

  const controller = new RoomDemoController({ "room-06": factory, "room-09": factory });
  const host = {} as HTMLElement;
  return { demos, controller, host };
}

describe("RoomDemoController", () => {
  it("mounts only registered rooms and disposes before switching", () => {
    const { demos, controller, host } = fixture();
    expect(controller.canOpen("room-01")).toBe(false);
    expect(controller.open("room-01", host)).toBe(false);
    expect(controller.open("room-06", host)).toBe(true);
    expect(controller.roomId).toBe("room-06");
    expect(demos[0]?.mount).toHaveBeenCalledWith(host);
    expect(demos[0]?.activate).toHaveBeenCalledTimes(1);

    expect(controller.open("room-09", host)).toBe(true);
    expect(demos[0]?.dispose).toHaveBeenCalledTimes(1);
    expect(controller.roomId).toBe("room-09");
    controller.close();
    controller.close();
    expect(demos[1]?.dispose).toHaveBeenCalledTimes(1);
    expect(controller.isActive).toBe(false);
  });

  it("resets active demo and bounds frame delta without timers", () => {
    const { demos, controller, host } = fixture();
    controller.update(1000);
    controller.reset();
    controller.open("room-06", host);
    controller.update(120);
    controller.update(-50);
    controller.update(Number.NaN);
    controller.reset();

    expect(demos[0]?.update).toHaveBeenNthCalledWith(1, 50);
    expect(demos[0]?.update).toHaveBeenNthCalledWith(2, 0);
    expect(demos[0]?.update).toHaveBeenNthCalledWith(3, 0);
    expect(demos[0]?.reset).toHaveBeenCalledTimes(1);
    controller.close();
    controller.update(16);
    expect(demos[0]?.update).toHaveBeenCalledTimes(3);
  });

  it("cleans up a demo that fails during mount", () => {
    const dispose = vi.fn();
    const broken: RoomDemo = {
      mount: () => { throw new Error("mount failed"); },
      activate: vi.fn(),
      update: vi.fn(),
      reset: vi.fn(),
      dispose,
    };
    const controller = new RoomDemoController({ "room-06": () => broken });
    expect(() => controller.open("room-06", {} as HTMLElement)).toThrow("mount failed");
    expect(dispose).toHaveBeenCalledTimes(1);
    expect(controller.isActive).toBe(false);
  });
});
