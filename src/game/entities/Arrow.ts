import Phaser from "phaser";

import { gameplayConfig } from "../../config/gameplayConfig";

const ARROW_LENGTH = 46;
const ARROW_THICKNESS = 8;

export function getProjectileTravelDurationMs(
  startX: number,
  startY: number,
  targetX: number,
  targetY: number,
  speed = gameplayConfig.projectile.speed,
): number {
  const distance = Math.hypot(targetX - startX, targetY - startY);
  return (distance / speed) * 1000;
}

export class Arrow {
  public readonly view: Phaser.GameObjects.Rectangle;

  private readonly tween: Phaser.Tweens.Tween;
  private destroyed = false;

  public constructor(
    scene: Phaser.Scene,
    startX: number,
    startY: number,
    targetX: number,
    targetY: number,
    onHit: () => void,
  ) {
    const angle = Phaser.Math.Angle.Between(startX, startY, targetX, targetY);

    this.view = scene.add
      .rectangle(startX, startY, ARROW_LENGTH, ARROW_THICKNESS, 0xf7f3e8)
      .setOrigin(0.8, 0.5)
      .setRotation(angle)
      .setDepth(4);

    this.tween = scene.tweens.add({
      targets: this.view,
      x: targetX,
      y: targetY,
      duration: getProjectileTravelDurationMs(startX, startY, targetX, targetY),
      ease: "Linear",
      onComplete: () => {
        if (this.destroyed) {
          return;
        }

        onHit();
        this.destroy();
      },
    });
  }

  public destroy(): void {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;
    this.tween.stop();
    this.view.destroy();
  }
}
