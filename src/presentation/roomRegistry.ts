import { workshopRooms } from "../rooms/workshopRooms";
import type { RoomId, StoryboardRoomDefinition } from "./types";

/** Eleven audience-facing rooms. The former two-room interaction lab is retired. */
export const roomRegistry: readonly StoryboardRoomDefinition[] = workshopRooms;

export function getRoomById(roomId: RoomId): StoryboardRoomDefinition | undefined {
  return roomRegistry.find((room) => room.id === roomId);
}

export function getRoomIndex(roomId: RoomId): number {
  return roomRegistry.findIndex((room) => room.id === roomId);
}
