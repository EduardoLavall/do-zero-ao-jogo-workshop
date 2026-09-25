import Phaser from "phaser";

import { PresentationScene } from "./PresentationScene";

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;
export const WORLD_WIDTH = 2400;
export const WORLD_HEIGHT = 720;

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
        gravity: { x: 0, y: 1200 },
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
