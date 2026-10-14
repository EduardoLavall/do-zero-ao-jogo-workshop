import type Phaser from "phaser";

import type { PresentationState, RoomDefinition } from "../../presentation/types";
import { getHotspotState } from "./HotspotSystem";

const THEME_COLORS = [
  0x22d3ee, 0xfbbf24, 0xa78bfa, 0x34d399, 0xfb7185,
  0x67e8f9, 0xfda4af, 0x86efac, 0xc4b5fd, 0xfed7aa, 0xfacc15,
];

export class RoomWorldRenderer {
  private readonly decorations: Phaser.GameObjects.GameObject[] = [];
  private readonly rings = new Map<string, Phaser.GameObjects.Arc>();

  public render(scene: Phaser.Scene, room: RoomDefinition, state: PresentationState): void {
    this.clear();

    const index = Number(room.id.replace("room-", ""));
    const color = THEME_COLORS[Number.isInteger(index) ? (index - 1) % 10 : 10] ?? 0x22d3ee;

    for (const object of room.storyboard.objects) {
      const baseColor = object.kind === "door" ? 0x0e4155 : 0x1b3445;
      const objectView = scene.add
        .rectangle(object.x, object.y, object.width, object.height, baseColor, 0.76)
        .setStrokeStyle(3, color, 0.63)
        .setDepth(0.5);
      this.decorations.push(objectView);
      if (object.label && object.kind === "door") {
        const caption = scene.add
          .text(object.x, object.y, object.label, {
            fontFamily: "monospace",
            fontSize: "24px",
            color: "#d7f7ff",
          })
          .setOrigin(0.5)
          .setDepth(1);
        this.decorations.push(caption);
      }
    }

    for (const hotspot of room.hotspots) {
      const hotspotState = getHotspotState(hotspot, state);
      const stroke =
        hotspotState === "locked"
          ? 0x64748b
          : hotspotState === "revealed"
            ? 0x86efac
            : color;
      const fill =
        hotspotState === "locked" ? 0x334155 : hotspotState === "revealed" ? 0x14532d : 0x1e293b;

      const ring = scene.add
        .circle(hotspot.x, hotspot.y, hotspot.radius, fill, 0.23)
        .setStrokeStyle(4, stroke, 0.88)
        .setDepth(1);
      const dot = scene.add.circle(hotspot.x, hotspot.y, 15, stroke).setDepth(1);
      const reveal = room.storyboard.reveals.find((item) => item.id === hotspot.revealId);
      const label = scene.add
        .text(
          hotspot.x,
          hotspot.y - hotspot.radius - 29,
          `${reveal?.content.title ?? hotspot.id} · ${hotspotState.toUpperCase()}`,
          {
            fontFamily: "monospace",
            fontSize: "23px",
            color: hotspotState === "locked" ? "#a6b6c6" : "#f4f8ff",
            backgroundColor: "#0b1020",
            padding: { x: 8, y: 5 },
          },
        )
        .setOrigin(0.5)
        .setDepth(2);

      this.decorations.push(ring, dot, label);
      this.rings.set(hotspot.id, ring);
    }
  }

  public highlight(hotspotId: string): void {
    this.rings.get(hotspotId)?.setStrokeStyle(8, 0x86efac, 1);
  }

  public clear(): void {
    for (const item of this.decorations) {
      item.destroy();
    }
    this.decorations.length = 0;
    this.rings.clear();
  }
}
