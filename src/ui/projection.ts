export interface RectBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface OverlayPlacement {
  left: number;
  top: number;
  scaleX: number;
  scaleY: number;
}

export function getOverlayPlacement(
  canvas: RectBounds,
  parent: RectBounds,
  logicalWidth: number,
  logicalHeight: number,
): OverlayPlacement {
  return {
    left: canvas.left - parent.left,
    top: canvas.top - parent.top,
    scaleX: canvas.width / logicalWidth,
    scaleY: canvas.height / logicalHeight,
  };
}
