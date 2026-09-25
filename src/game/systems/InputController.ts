import Phaser from "phaser";

import { resolveHorizontalDirection } from "../types";
import type { PlayerInputState } from "../types";

const LEFT_BUTTON = 0;
const MIDDLE_BUTTON = 1;
const RIGHT_BUTTON = 2;

export class InputController {
  private readonly scene: Phaser.Scene;
  private readonly deadZone: number;
  private controlEnabled = true;
  private jumpRequested = false;
  private shootRequested = false;

  public constructor(scene: Phaser.Scene, deadZone = 18) {
    this.scene = scene;
    this.deadZone = deadZone;

    this.scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this);
    this.scene.game.canvas.addEventListener("contextmenu", this.preventContextMenu);
  }

  public getState(playerX: number): PlayerInputState {
    const pointer = this.scene.input.activePointer;
    const worldPoint = pointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;
    const targetWorldX = worldPoint.x;

    return {
      targetWorldX,
      horizontalDirection: this.controlEnabled
        ? resolveHorizontalDirection(playerX, targetWorldX, this.deadZone)
        : 0,
      jumpRequested: this.consumeJumpRequested(),
      shootRequested: this.consumeShootRequested(),
      controlEnabled: this.controlEnabled,
    };
  }

  public destroy(): void {
    this.scene.input.off(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this);
    this.scene.game.canvas.removeEventListener("contextmenu", this.preventContextMenu);
  }

  private readonly preventContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
  };

  private handlePointerDown(pointer: Phaser.Input.Pointer): void {
    pointer.event.preventDefault();

    if (pointer.button === MIDDLE_BUTTON) {
      this.controlEnabled = !this.controlEnabled;
      return;
    }

    if (!this.controlEnabled) {
      return;
    }

    if (pointer.button === LEFT_BUTTON) {
      this.shootRequested = true;
    }

    if (pointer.button === RIGHT_BUTTON) {
      this.jumpRequested = true;
    }
  }

  private consumeJumpRequested(): boolean {
    const requested = this.jumpRequested;
    this.jumpRequested = false;
    return requested;
  }

  private consumeShootRequested(): boolean {
    const requested = this.shootRequested;
    this.shootRequested = false;
    return requested;
  }
}
