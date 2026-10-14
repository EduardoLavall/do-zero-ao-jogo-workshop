import type Phaser from "phaser";

import type { PresentationState, RoomDefinition } from "../../presentation/types";

const ROOM_ID = "room-06";
const CYAN = 0x7de6fd;
const GREEN = 0x86efac;
const DIM = 0x365f77;

/**
 * Placeholder art for the first complete teaching room.
 * All props are Phaser primitives so this demo runs offline, without sprites.
 * The player/arrow systems remain independent from this themed renderer.
 */
export function renderEngineRoom(
  scene: Phaser.Scene,
  room: RoomDefinition,
  state: PresentationState,
): Phaser.GameObjects.GameObject[] {
  if (room.id !== ROOM_ID) {
    return [];
  }

  const objects: Phaser.GameObjects.GameObject[] = [];
  const keep = <T extends Phaser.GameObjects.GameObject>(object: T): T => {
    objects.push(object);
    return object;
  };

  const grid = keep(scene.add.graphics().setDepth(0));
  grid.lineStyle(2, 0x25506d, 0.26);
  for (let x = 96; x < 1920; x += 96) {
    grid.lineBetween(x, 310, x, 960);
  }
  for (let y = 314; y < 960; y += 72) {
    grid.lineBetween(96, y, 1824, y);
  }

  keep(
    scene.add
      .rectangle(960, 300, 1290, 70, 0x071b30, 0.95)
      .setStrokeStyle(2, DIM, 0.85)
      .setDepth(0.2),
  );
  keep(
    scene.add
      .text(960, 300, "ENGINE LAB  /  CÓDIGO → SISTEMAS → RESULTADO", {
        fontFamily: "monospace",
        fontSize: "34px",
        color: "#bff6ff",
        fontStyle: "bold",
      })
      .setOrigin(0.5)
      .setDepth(0.4),
  );

  const connections = keep(scene.add.graphics().setDepth(0.3));
  connections.lineStyle(6, CYAN, 0.22);
  for (const y of [495, 780]) {
    connections.lineBetween(440, y, 1480, y);
  }
  for (const x of [440, 960, 1480]) {
    connections.lineBetween(x, 495, x, 780);
  }

  for (const [index, hotspot] of room.hotspots.entries()) {
    const revealed = state.revealed.has(hotspot.revealId);
    const locked = (hotspot.requiredRevealIds ?? []).some((id) => !state.revealed.has(id));
    const accent = revealed ? GREEN : locked ? 0x52687c : CYAN;
    const title = hotspot.label ?? `SISTEMA ${index + 1}`;

    keep(
      scene.add
        .rectangle(hotspot.x, hotspot.y, 360, 210, 0x0a2037, 0.88)
        .setStrokeStyle(revealed ? 6 : 3, accent, revealed ? 0.96 : 0.62)
        .setDepth(0.55),
    );
    keep(
      scene.add
        .rectangle(hotspot.x, hotspot.y - 84, 355, 34, revealed ? 0x1c604c : 0x17465c, 0.9)
        .setDepth(0.6),
    );
    keep(
      scene.add
        .text(hotspot.x - 157, hotspot.y - 84, `SYS / ${String(index + 1).padStart(2, "0")}`, {
          fontFamily: "monospace",
          fontSize: "22px",
          color: revealed ? "#b5ffd0" : "#b8edfa",
        })
        .setOrigin(0, 0.5)
        .setDepth(0.8),
    );
    keep(
      scene.add
        .text(hotspot.x + 155, hotspot.y - 84, revealed ? "ONLINE" : locked ? "LOCK" : "READY", {
          fontFamily: "monospace",
          fontSize: "22px",
          color: revealed ? "#b5ffd0" : locked ? "#a9b8ca" : "#fdf2bd",
        })
        .setOrigin(1, 0.5)
        .setDepth(0.8),
    );
    keep(
      scene.add
        .text(hotspot.x, hotspot.y + 77, title.toUpperCase(), {
          fontFamily: "monospace",
          fontSize: "26px",
          color: revealed ? "#b5ffd0" : "#d7edfa",
          fontStyle: "bold",
        })
        .setOrigin(0.5)
        .setDepth(0.8),
    );
  }

  const complete = room.objectives.every((objective) =>
    state.completedObjectives.has(objective.id),
  );

  keep(
    scene.add
      .rectangle(1805, 856, 80, 210, complete ? 0x1b674d : 0x162a40, 1)
      .setStrokeStyle(5, complete ? GREEN : 0x51738b, 1)
      .setDepth(0.7),
  );
  keep(
    scene.add
      .text(1805, 856, complete ? "✓" : "→", {
        fontFamily: "monospace",
        fontSize: "58px",
        color: complete ? "#b5ffd0" : "#c0d9e9",
      })
      .setOrigin(0.5)
      .setDepth(1),
  );
  keep(
    scene.add
      .text(1805, 725, complete ? "ENGINE\nONLINE" : "SAÍDA", {
        fontFamily: "monospace",
        fontSize: "22px",
        color: complete ? "#b5ffd0" : "#d0e5f5",
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(1),
  );

  if (complete) {
    const pulse = keep(scene.add.circle(1805, 856, 60, GREEN, 0.24).setDepth(0.6));
    scene.tweens.add({
      targets: pulse,
      scale: 1.8,
      alpha: 0,
      duration: 650,
      ease: "Sine.Out",
      onComplete: () => pulse.destroy(),
    });
  }

  return objects;
}
