import type Phaser from "phaser";

import { gameplayConfig } from "../../config/gameplayConfig";
import type { PlayerInputState } from "../types";

export class Player {
  public readonly body: Phaser.Physics.Arcade.Body;
  public readonly view: Phaser.GameObjects.Rectangle;

  public constructor(scene: Phaser.Scene, x: number, y: number) {
    const { width, height } = gameplayConfig.player;

    this.view = scene.add
      .rectangle(x, y, width, height, 0x8be9fd)
      .setStrokeStyle(4, 0xf7f3e8);

    scene.physics.add.existing(this.view);

    this.body = this.view.body as Phaser.Physics.Arcade.Body;
    this.body.setCollideWorldBounds(false);
    this.body.setSize(width, height);
  }

  public update(input: PlayerInputState): void {
    this.body.setVelocityX(
      input.horizontalDirection * gameplayConfig.player.moveSpeed,
    );

    if (input.horizontalDirection < 0) {
      this.view.setScale(-1, 1);
    } else if (input.horizontalDirection > 0) {
      this.view.setScale(1, 1);
    }

    if (input.jumpRequested && this.body.blocked.down) {
      this.body.setVelocityY(gameplayConfig.player.jumpVelocity);
    }

    this.view.setFillStyle(input.controlEnabled ? 0x8be9fd : 0x64748b);
  }

  public setPosition(x: number, y: number): void {
    this.view.setPosition(x, y);
    this.body.reset(x, y);
  }

  public stopHorizontal(): void {
    this.body.setVelocityX(0);
  }

  public get x(): number {
    return this.view.x;
  }

  public get y(): number {
    return this.view.y;
  }
}
