import { InputTraceDemo } from "./InputTraceDemo";
import type { RoomDemoFactory } from "./RoomDemoController";

/** Only opted-in rooms have a demo; all others keep existing storyboard flow. */
export const demoRegistry: Readonly<Record<string, RoomDemoFactory>> = {
  "room-06": () => new InputTraceDemo(),
};
