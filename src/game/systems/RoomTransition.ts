export type RoomExitDirection = "previous" | "next" | null;

export const EXIT_ZONE_WIDTH = 22;
export const ENTRY_OFFSET = 140;
export const SAFE_AREA_MARGIN = 29;

export function resolveRoomExit(
  playerX: number,
  roomWidth: number,
  exitZoneWidth = EXIT_ZONE_WIDTH,
): RoomExitDirection {
  if (playerX <= exitZoneWidth) {
    return "previous";
  }

  if (playerX >= roomWidth - exitZoneWidth) {
    return "next";
  }

  return null;
}

export function getEntryX(
  direction: Exclude<RoomExitDirection, null>,
  roomWidth: number,
  entryOffset = ENTRY_OFFSET,
): number {
  return direction === "next" ? entryOffset : roomWidth - entryOffset;
}
