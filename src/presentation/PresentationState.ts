import type { PresentationState, RoomId } from "./types";

export function createInitialPresentationState(roomId: RoomId): PresentationState {
  return {
    roomId,
    revealed: new Set(),
    completedObjectives: new Set(),
    started: false,
    credits: false,
  };
}
