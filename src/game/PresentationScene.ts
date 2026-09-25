import Phaser from "phaser";

import { Player } from "./entities/Player";
import { GAME_HEIGHT, GAME_WIDTH, WORLD_HEIGHT, WORLD_WIDTH } from "./config";
import { InputController } from "./systems/InputController";

export class PresentationScene extends Phaser.Scene {
  private inputController?: InputController;
  private player?: Player;
  private controlStatusText?: Phaser.GameObjects.Text;
  private actionStatusText?: Phaser.GameObjects.Text;
  private ground?: Phaser.GameObjects.Rectangle;

  public constructor() {
    super({ key: "presentation" });
  }

  public create(): void {
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    this.add
      .text(80, 70, "DO ZERO AO JOGO", {
        fontFamily: "monospace",
        fontSize: "42px",
        color: "#f7f3e8",
      })
      .setScrollFactor(0);

    this.add
      .text(80, 125, "Mouse-first game shell", {
        fontFamily: "monospace",
        fontSize: "18px",
        color: "#8be9fd",
      })
      .setScrollFactor(0);

    this.add
      .text(80, 165, "Mova o mouse para andar · RMB pula · LMB atira · MMB toggle", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#cbd5e1",
      })
      .setScrollFactor(0);

    this.ground = this.add.rectangle(
      WORLD_WIDTH / 2,
      GAME_HEIGHT - 48,
      WORLD_WIDTH,
      96,
      0x1e293b,
    );

    this.physics.add.existing(this.ground, true);

    for (let x = 200; x < WORLD_WIDTH; x += 320) {
      this.add.rectangle(x, GAME_HEIGHT - 120, 120, 12, 0x334155);
    }

    this.player = new Player(this, 240, GAME_HEIGHT - 140);
    this.physics.add.collider(this.player.view, this.ground);

    this.inputController = new InputController(this);

    this.cameras.main.startFollow(this.player.view, true, 0.08, 0.08);
    this.cameras.main.setDeadzone(GAME_WIDTH * 0.25, GAME_HEIGHT * 0.4);

    this.controlStatusText = this.add
      .text(GAME_WIDTH - 32, 32, "PLAYER CONTROL: ON", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#86efac",
        backgroundColor: "#111827",
        padding: { x: 12, y: 8 },
      })
      .setOrigin(1, 0)
      .setScrollFactor(0);

    this.actionStatusText = this.add
      .text(GAME_WIDTH - 32, 78, "", {
        fontFamily: "monospace",
        fontSize: "14px",
        color: "#facc15",
      })
      .setOrigin(1, 0)
      .setScrollFactor(0);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.inputController?.destroy();
    });
  }

  public update(): void {
    if (!this.player || !this.inputController) {
      return;
    }

    const input = this.inputController.getState(this.player.x);
    this.player.update(input);

    this.controlStatusText
      ?.setText(`PLAYER CONTROL: ${input.controlEnabled ? "ON" : "OFF"}`)
      .setColor(input.controlEnabled ? "#86efac" : "#fca5a5");

    if (input.jumpRequested) {
      this.flashAction("JUMP");
    }

    if (input.shootRequested) {
      this.flashAction("SHOOT REQUEST");
    }
  }

  private flashAction(label: string): void {
    this.actionStatusText?.setText(label).setAlpha(1);

    if (this.actionStatusText) {
      this.tweens.killTweensOf(this.actionStatusText);
      this.tweens.add({
        targets: this.actionStatusText,
        alpha: 0,
        duration: 500,
        ease: "Quad.Out",
      });
    }
  }
}
