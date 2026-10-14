import type Phaser from "phaser";

import type {
  HotspotDefinition,
  PresentationState,
  RoomDefinition,
  StageProp,
} from "../../presentation/types";
import { getHotspotState } from "./HotspotSystem";

/**
 * Owns the placeholder room world. Gameplay coordinates and room text live in
 * roomRegistry, not in PresentationScene. #9/#25 will replace shapes with art.
 */
export class RoomRenderer {
  private readonly scene: Phaser.Scene;
  private readonly backdrop: Phaser.GameObjects.Rectangle;
  private readonly decorations: Phaser.GameObjects.GameObject[] = [];
  private readonly targets = new Map<string, Phaser.GameObjects.Arc>();

  public constructor(scene: Phaser.Scene, backdrop: Phaser.GameObjects.Rectangle) {
    this.scene = scene;
    this.backdrop = backdrop;
  }

  public render(room: RoomDefinition, state: PresentationState): void {
    this.clear();

    const visual = room.storyboard?.visual;
    const accent = visual?.accentColor ?? 0x8be9fd;
    this.backdrop.setFillStyle(visual?.backgroundColor ?? 0x0b1020);

    if (visual) {
      for (const prop of visual.props) {
        this.renderProp(prop, accent);
      }
    }

    for (const hotspot of room.hotspots) {
      this.renderHotspot(hotspot, state, accent);
    }
  }

  public highlight(hotspotId: string): void {
    this.targets.get(hotspotId)?.setStrokeStyle(8, 0xfaf2ae, 1);
  }

  public destroy(): void {
    this.clear();
  }

  private renderProp(prop: StageProp, accent: number): void {
    // Abstract shapes are intentionally disposable placeholders.
    const isRound = prop.kind === "speaker" || prop.kind === "tree";
    const shape = isRound
      ? this.scene.add.circle(prop.x, prop.y, 52, accent, 0.10)
      : this.scene.add.rectangle(prop.x, prop.y, 120, 84, accent, 0.09);

    shape.setStrokeStyle(3, accent, 0.22).setDepth(0);
    this.decorations.push(shape);
  }

  private renderHotspot(
    hotspot: HotspotDefinition,
    state: PresentationState,
    accent: number,
  ): void {
    const current = getHotspotState(hotspot, state);
    const color =
      current === "locked" ? 0x64748b : current === "revealed" ? 0x86efac : accent;
    const fill =
      current === "locked" ? 0x334155 : current === "revealed" ? 0x14532d : 0x1e293b;

    const ring = this.scene.add
      .circle(hotspot.x, hotspot.y, hotspot.radius, fill, 0.24)
      .setStrokeStyle(4, color, 0.85)
      .setDepth(1);

    const marker = this.scene.add.circle(hotspot.x, hotspot.y, 15, color).setDepth(1);

    const title = this.scene.add
      .text(
        hotspot.x,
        hotspot.y - hotspot.radius - 37,
        `${hotspot.label ?? hotspot.id}  ·  ${current.toUpperCase()}`,
        {
          fontFamily: "monospace",
          fontSize: "26px",
          color: current === "locked" ? "#cbd5e1" : "#f7f3e8",
          backgroundColor: "#0b1020",
          padding: { x: 8, y: 8 },
        },
      )
      .setOrigin(0.5)
      .setDepth(2);

    this.targets.set(hotspot.id, ring);
    this.decorations.push(ring, marker, title);
  }

  private clear(): void {
    for (const item of this.decorations) {
      item.destroy();
    }
    this.decorations.length = 0;
    this.targets.clear();
  }
}
