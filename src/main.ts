import Phaser from "phaser";

import { createGameConfig } from "./game/config";
import "./styles/base.css";

const game = new Phaser.Game(createGameConfig("game-root"));

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    game.destroy(true);
  });
}
