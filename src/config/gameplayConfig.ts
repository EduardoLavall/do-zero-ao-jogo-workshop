export interface GameplayConfig {
  player: {
    width: number;
    height: number;
    moveSpeed: number;
    jumpVelocity: number;
    mouseDeadZone: number;
  };
  projectile: {
    speed: number;
  };
  room: {
    groundHeight: number;
    entryOffset: number;
    exitZoneWidth: number;
    safeAreaMargin: number;
    transitionDuration: number;
  };
}

export const gameplayConfig: Readonly<GameplayConfig> = {
  player: {
    width: 66,
    height: 108,
    moveSpeed: 520,
    jumpVelocity: -760,
    mouseDeadZone: 18,
  },
  projectile: {
    speed: 900,
  },
  room: {
    groundHeight: 45,
    entryOffset: 140,
    exitZoneWidth: 22,
    safeAreaMargin: 29,
    transitionDuration: 180,
  },
};
