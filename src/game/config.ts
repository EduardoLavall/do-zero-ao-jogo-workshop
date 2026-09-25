import Phaser from "phaser";

import { PresentationScene } from "./PresentationScene";

export const GAME_WIDTH = 1920;
export const GAME_HEIGHT = 1080;
export const WORLD_WIDTH = GAME_WIDTH;
export const WORLD_HEIGHT = GAME_HEIGHT;

export function createGameConfig(parent: string): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: "#0b1020",
    pixelArt: true,
    roundPixels: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 1500 },
        debug: false,
      },
    },
    scene: [PresentationScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    render: {
      antialias: false,
      pixelArt: true,
    },
  };
}
