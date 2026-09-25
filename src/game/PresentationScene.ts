import Phaser from "phaser";

import { GAME_HEIGHT, GAME_WIDTH } from "./config";

export class PresentationScene extends Phaser.Scene {
  public constructor() {
    super({ key: "presentation" });
  }

  public create(): void {
    const centerX = GAME_WIDTH / 2;
    const centerY = GAME_HEIGHT / 2;

    this.add
      .text(centerX, centerY - 36, "DO ZERO AO JOGO", {
        fontFamily: "monospace",
        fontSize: "42px",
        color: "#f7f3e8",
        align: "center",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY + 24, "Foundation ready: Vite + TypeScript + Phaser", {
        fontFamily: "monospace",
        fontSize: "18px",
        color: "#8be9fd",
        align: "center",
      })
      .setOrigin(0.5);

    this.add
      .rectangle(centerX, centerY + 110, 280, 72, 0x1e293b)
      .setStrokeStyle(2, 0xfacc15);

    this.add
      .text(centerX, centerY + 110, "PresentationScene placeholder", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#facc15",
      })
      .setOrigin(0.5);
  }
}
