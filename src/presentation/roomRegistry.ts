import type { RoomDefinition, RoomId } from "./types";

export const roomRegistry: readonly RoomDefinition[] = [
  {
    id: "room-01",
    title: "Room 01",
    width: 1920,
    objectives: [],
    hotspots: [],
  },
  {
    id: "room-02",
    title: "Room 02",
    width: 1920,
    objectives: [],
    hotspots: [],
  },
];

export function getRoomById(roomId: RoomId): RoomDefinition | undefined {
  return roomRegistry.find((room) => room.id === roomId);
}

export function getRoomIndex(roomId: RoomId): number {
  return roomRegistry.findIndex((room) => room.id === roomId);
}
