import { gameplayConfig } from "../../config/gameplayConfig";

export type RoomExitDirection = "previous" | "next" | null;

export const EXIT_ZONE_WIDTH = gameplayConfig.room.exitZoneWidth;
export const ENTRY_OFFSET = gameplayConfig.room.entryOffset;
export const SAFE_AREA_MARGIN = gameplayConfig.room.safeAreaMargin;

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
