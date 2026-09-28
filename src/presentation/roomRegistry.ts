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
    title: "Interaction Test Room",
    width: 1920,
    objectives: [],
    hotspots: [
      {
        id: "hotspot-alpha",
        x: 620,
        y: 520,
        radius: 150,
        revealId: "test-alpha",
      },
      {
        id: "hotspot-beta",
        x: 980,
        y: 430,
        radius: 110,
        revealId: "test-beta",
      },
      {
        id: "hotspot-gamma",
        x: 1320,
        y: 560,
        radius: 180,
        revealId: "test-gamma",
      },
      {
        id: "hotspot-locked",
        x: 1580,
        y: 390,
        radius: 130,
        revealId: "test-locked",
        requiredRevealIds: ["test-alpha"],
      },
    ],
  },
];

export function getRoomById(roomId: RoomId): RoomDefinition | undefined {
  return roomRegistry.find((room) => room.id === roomId);
}

export function getRoomIndex(roomId: RoomId): number {
  return roomRegistry.findIndex((room) => room.id === roomId);
}
