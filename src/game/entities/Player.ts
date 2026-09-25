import Phaser from "phaser";

import type { PlayerInputState } from "../types";

const PLAYER_WIDTH = 44;
const PLAYER_HEIGHT = 72;
const MOVE_SPEED = 360;
const JUMP_VELOCITY = -560;

export class Player {
  public readonly body: Phaser.Physics.Arcade.Body;
  public readonly view: Phaser.GameObjects.Rectangle;

  public constructor(scene: Phaser.Scene, x: number, y: number) {
    this.view = scene.add
      .rectangle(x, y, PLAYER_WIDTH, PLAYER_HEIGHT, 0x8be9fd)
      .setStrokeStyle(3, 0xf7f3e8);

    scene.physics.add.existing(this.view);

    this.body = this.view.body as Phaser.Physics.Arcade.Body;
    this.body.setCollideWorldBounds(true);
    this.body.setSize(PLAYER_WIDTH, PLAYER_HEIGHT);
  }

  public update(input: PlayerInputState): void {
    this.body.setVelocityX(input.horizontalDirection * MOVE_SPEED);

    if (input.horizontalDirection < 0) {
      this.view.setScale(-1, 1);
    } else if (input.horizontalDirection > 0) {
      this.view.setScale(1, 1);
    }

    if (input.jumpRequested && this.body.blocked.down) {
      this.body.setVelocityY(JUMP_VELOCITY);
    }

    this.view.setFillStyle(input.controlEnabled ? 0x8be9fd : 0x64748b);
  }

  public get x(): number {
    return this.view.x;
  }
}
