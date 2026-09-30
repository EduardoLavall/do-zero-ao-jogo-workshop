export function getProjectileTravelDurationMs(
  startX: number,
  startY: number,
  targetX: number,
  targetY: number,
  speed: number,
): number {
  const distance = Math.hypot(targetX - startX, targetY - startY);
  return (distance / speed) * 1000;
}
