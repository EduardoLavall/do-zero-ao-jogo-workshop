export type HorizontalDirection = -1 | 0 | 1;

export interface PlayerInputState {
  targetWorldX: number;
  horizontalDirection: HorizontalDirection;
  jumpRequested: boolean;
  shootRequested: boolean;
  controlEnabled: boolean;
}

export function resolveHorizontalDirection(
  playerX: number,
  targetX: number,
  deadZone: number,
): HorizontalDirection {
  const delta = targetX - playerX;

  if (Math.abs(delta) <= deadZone) {
    return 0;
  }

  return delta > 0 ? 1 : -1;
}
