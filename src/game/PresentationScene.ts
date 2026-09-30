import Phaser from "phaser";

import { gameplayConfig } from "../config/gameplayConfig";
import { PresentationController } from "../presentation/PresentationController";
import { getRoomIndex, roomRegistry } from "../presentation/roomRegistry";
import { GAME_HEIGHT, GAME_WIDTH, WORLD_HEIGHT, WORLD_WIDTH } from "./config";
import { Arrow } from "./entities/Arrow";
import { Player } from "./entities/Player";
import { InputController } from "./systems/InputController";
import {
  getHotspotState,
  resolveHotspotTarget,
} from "./systems/HotspotSystem";
import {
  ENTRY_OFFSET,
  EXIT_ZONE_WIDTH,
  SAFE_AREA_MARGIN,
  getEntryX,
  resolveRoomExit,
} from "./systems/RoomTransition";
import type { RoomExitDirection } from "./systems/RoomTransition";

const GROUND_HEIGHT = gameplayConfig.room.groundHeight;
const TRANSITION_DURATION = gameplayConfig.room.transitionDuration;

function getPlayerStartY(): number {
  return GAME_HEIGHT - GROUND_HEIGHT - gameplayConfig.player.height / 2;
}

export class PresentationScene extends Phaser.Scene {
  private readonly presentationController = new PresentationController();

  private inputController?: InputController;
  private player?: Player;
  private ground?: Phaser.GameObjects.Rectangle;
  private roomBackdrop?: Phaser.GameObjects.Rectangle;
  private roomTitleText?: Phaser.GameObjects.Text;
  private roomPositionText?: Phaser.GameObjects.Text;
  private controlStatusText?: Phaser.GameObjects.Text;
  private actionStatusText?: Phaser.GameObjects.Text;
  private previousExitText?: Phaser.GameObjects.Text;
  private nextExitText?: Phaser.GameObjects.Text;
  private readonly hotspotVisuals = new Map<string, Phaser.GameObjects.Arc>();
  private readonly hotspotDecorations: Phaser.GameObjects.GameObject[] = [];
  private readonly activeArrows = new Set<Arrow>();
  private readonly inFlightRevealIds = new Set<string>();
  private selectedHotspotId?: string;
  private nextKey?: Phaser.Input.Keyboard.Key;
  private previousKey?: Phaser.Input.Keyboard.Key;
  private resetKey?: Phaser.Input.Keyboard.Key;
  private transitionLocked = false;
  private blockedExitDirection: Exclude<RoomExitDirection, null> | null = null;

  public constructor() {
    super({ key: "presentation" });
  }

  public create(): void {
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBounds(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.cameras.main.setScroll(0, 0);

    this.roomBackdrop = this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      0x0b1020,
    );

    this.add
      .rectangle(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2,
        GAME_WIDTH - SAFE_AREA_MARGIN * 2,
        GAME_HEIGHT - SAFE_AREA_MARGIN * 2,
      )
      .setStrokeStyle(3, 0x334155, 0.8);

    this.add
      .text(SAFE_AREA_MARGIN, 72, "DO ZERO AO JOGO", {
        fontFamily: "monospace",
        fontSize: "54px",
        color: "#f7f3e8",
      })
      .setDepth(2);

    this.roomTitleText = this.add
      .text(SAFE_AREA_MARGIN, 145, "", {
        fontFamily: "monospace",
        fontSize: "30px",
        color: "#8be9fd",
      })
      .setDepth(2);

    this.roomPositionText = this.add
      .text(SAFE_AREA_MARGIN, 192, "", {
        fontFamily: "monospace",
        fontSize: "20px",
        color: "#94a3b8",
      })
      .setDepth(2);

    this.add
      .text(
        SAFE_AREA_MARGIN,
        240,
        "Mouse move · RMB jump · LMB shoot · MMB control · N/P rooms · R reset",
        {
          fontFamily: "monospace",
          fontSize: "18px",
          color: "#cbd5e1",
        },
      )
      .setDepth(2);

    this.ground = this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT - GROUND_HEIGHT / 2,
      GAME_WIDTH,
      GROUND_HEIGHT,
      0x1e293b,
    );
    this.physics.add.existing(this.ground, true);

    for (let x = 220; x < GAME_WIDTH; x += 360) {
      this.add.rectangle(x, GAME_HEIGHT - GROUND_HEIGHT - 20, 140, 14, 0x334155);
    }

    this.previousExitText = this.add
      .text(16, GAME_HEIGHT / 2, "← PREVIOUS", {
        fontFamily: "monospace",
        fontSize: "14px",
        color: "#64748b",
      })
      .setOrigin(0, 0.5)
      .setAngle(-90);

    this.nextExitText = this.add
      .text(GAME_WIDTH - 16, GAME_HEIGHT / 2, "NEXT →", {
        fontFamily: "monospace",
        fontSize: "14px",
        color: "#64748b",
      })
      .setOrigin(1, 0.5)
      .setAngle(90);

    this.player = new Player(this, ENTRY_OFFSET, getPlayerStartY());
    this.physics.add.collider(this.player.view, this.ground);

    this.inputController = new InputController(this);

    const keyboard = this.input.keyboard;
    if (keyboard) {
      this.nextKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
      this.previousKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
      this.resetKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    this.controlStatusText = this.add
      .text(GAME_WIDTH - SAFE_AREA_MARGIN, 72, "PLAYER CONTROL: ON", {
        fontFamily: "monospace",
        fontSize: "20px",
        color: "#86efac",
        backgroundColor: "#111827",
        padding: { x: 14, y: 10 },
      })
      .setOrigin(1, 0)
      .setDepth(2);

    this.actionStatusText = this.add
      .text(GAME_WIDTH - SAFE_AREA_MARGIN, 128, "", {
        fontFamily: "monospace",
        fontSize: "18px",
        color: "#facc15",
      })
      .setOrigin(1, 0)
      .setDepth(2);

    this.updateRoomVisuals();

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
      this.shootAtHotspot(input.targetWorldX, input.targetWorldY);
    }

    if (!this.transitionLocked) {
      this.handleFallbackNavigation();

      const exitDirection = resolveRoomExit(this.player.x, GAME_WIDTH);

      if (!exitDirection) {
        this.blockedExitDirection = null;
      } else if (this.blockedExitDirection === exitDirection) {
        const boundaryX =
          exitDirection === "next" ? GAME_WIDTH - EXIT_ZONE_WIDTH : EXIT_ZONE_WIDTH;
        this.player.setPosition(boundaryX, this.player.y);
        this.player.stopHorizontal();
      } else {
        this.requestRoomTransition(exitDirection);
      }
    }
  }

  private handleFallbackNavigation(): void {
    if (this.nextKey && Phaser.Input.Keyboard.JustDown(this.nextKey)) {
      this.requestRoomTransition("next");
      return;
    }

    if (this.previousKey && Phaser.Input.Keyboard.JustDown(this.previousKey)) {
      this.requestRoomTransition("previous");
      return;
    }

    if (this.resetKey && Phaser.Input.Keyboard.JustDown(this.resetKey)) {
      this.clearProjectiles();
      this.presentationController.resetRoom();
      this.player?.setPosition(ENTRY_OFFSET, getPlayerStartY());
      this.updateRoomVisuals();
      this.flashAction("ROOM RESET");
    }
  }

  private requestRoomTransition(direction: Exclude<RoomExitDirection, null>): void {
    if (this.transitionLocked || !this.player) {
      return;
    }

    const navigated =
      direction === "next"
        ? this.presentationController.nextRoom()
        : this.presentationController.previousRoom();

    if (!navigated) {
      const boundaryX =
        direction === "next" ? GAME_WIDTH - EXIT_ZONE_WIDTH : EXIT_ZONE_WIDTH;
      this.blockedExitDirection = direction;
      this.player.setPosition(boundaryX, this.player.y);
      this.player.stopHorizontal();
      this.flashAction(direction === "next" ? "LAST ROOM" : "FIRST ROOM");
      return;
    }

    this.transitionLocked = true;
    this.blockedExitDirection = null;
    this.clearProjectiles();
    this.player.stopHorizontal();
    this.cameras.main.fadeOut(TRANSITION_DURATION, 0, 0, 0);

    this.time.delayedCall(TRANSITION_DURATION, () => {
      if (!this.player) {
        return;
      }

      this.updateRoomVisuals();
      this.player.setPosition(getEntryX(direction, GAME_WIDTH), getPlayerStartY());
      this.cameras.main.setScroll(0, 0);
      this.cameras.main.fadeIn(TRANSITION_DURATION, 0, 0, 0);

      this.time.delayedCall(TRANSITION_DURATION, () => {
        this.transitionLocked = false;
      });
    });
  }

  private updateRoomVisuals(): void {
    const room = this.presentationController.getCurrentRoom();
    const roomIndex = getRoomIndex(room.id);

    this.roomTitleText?.setText(room.title.toUpperCase());
    this.roomPositionText?.setText(`SLIDE ROOM ${roomIndex + 1} / ${roomRegistry.length}`);

    this.roomBackdrop?.setFillStyle(roomIndex % 2 === 0 ? 0x0b1020 : 0x111827);

    this.previousExitText
      ?.setText(roomIndex > 0 ? "← PREVIOUS" : "START")
      .setColor(roomIndex > 0 ? "#94a3b8" : "#475569");

    this.nextExitText
      ?.setText(roomIndex < roomRegistry.length - 1 ? "NEXT →" : "END")
      .setColor(roomIndex < roomRegistry.length - 1 ? "#94a3b8" : "#475569");

    this.renderHotspots();
  }

  private renderHotspots(): void {
    for (const decoration of this.hotspotDecorations) {
      decoration.destroy();
    }
    this.hotspotDecorations.length = 0;
    this.hotspotVisuals.clear();
    this.selectedHotspotId = undefined;

    const room = this.presentationController.getCurrentRoom();
    const state = this.presentationController.getState();

    for (const hotspot of room.hotspots) {
      const hotspotState = getHotspotState(hotspot, state);
      const fillColor = hotspotState === "locked" ? 0x334155 : 0x1e293b;
      const strokeColor = hotspotState === "locked" ? 0x64748b : 0xfacc15;

      const circle = this.add
        .circle(hotspot.x, hotspot.y, hotspot.radius, fillColor, 0.22)
        .setStrokeStyle(4, strokeColor, 0.9)
        .setDepth(1);

      const marker = this.add
        .circle(hotspot.x, hotspot.y, 18, strokeColor, 1)
        .setDepth(1);

      const label = this.add
        .text(
          hotspot.x,
          hotspot.y - hotspot.radius - 26,
          `${hotspot.id} · ${hotspotState.toUpperCase()}`,
          {
            fontFamily: "monospace",
            fontSize: "18px",
            color: hotspotState === "locked" ? "#64748b" : "#facc15",
            backgroundColor: "#0b1020",
            padding: { x: 8, y: 5 },
          },
        )
        .setOrigin(0.5)
        .setDepth(2);

      const radiusLabel = this.add
        .text(hotspot.x, hotspot.y + 28, `r=${hotspot.radius}`, {
          fontFamily: "monospace",
          fontSize: "14px",
          color: "#94a3b8",
        })
        .setOrigin(0.5)
        .setDepth(2);

      this.hotspotVisuals.set(hotspot.id, circle);
      this.hotspotDecorations.push(circle, marker, label, radiusLabel);
    }
  }

  private shootAtHotspot(pointerX: number, pointerY: number): void {
    const room = this.presentationController.getCurrentRoom();
    const target = resolveHotspotTarget(
      room.hotspots,
      pointerX,
      pointerY,
      this.presentationController.getState(),
    );

    this.clearHotspotSelection();

    if (!target) {
      this.flashAction(room.hotspots.length > 0 ? "NO VALID TARGET" : "SHOOT REQUEST");
      return;
    }

    this.selectedHotspotId = target.hotspot.id;
    this.hotspotVisuals
      .get(target.hotspot.id)
      ?.setStrokeStyle(8, 0x86efac, 1);

    if (!this.player || this.inFlightRevealIds.has(target.hotspot.revealId)) {
      this.flashAction("TARGET ALREADY IN FLIGHT");
      return;
    }

    this.player.faceTarget(target.hotspot.x);
    this.inFlightRevealIds.add(target.hotspot.revealId);
    this.flashAction(
      `SHOOT → ${target.hotspot.id} · d=${Math.round(target.distance)}`,
    );

    let arrow: Arrow;
    arrow = new Arrow(
      this,
      this.player.x,
      this.player.y - 12,
      target.hotspot.x,
      target.hotspot.y,
      () => {
        this.activeArrows.delete(arrow);
        this.inFlightRevealIds.delete(target.hotspot.revealId);
        this.handleArrowHit(
          target.hotspot.id,
          target.hotspot.revealId,
          target.hotspot.x,
          target.hotspot.y,
        );
      },
    );

    this.activeArrows.add(arrow);
  }

  private handleArrowHit(
    hotspotId: string,
    revealId: string,
    x: number,
    y: number,
  ): void {
    const revealed = this.presentationController.reveal(revealId);

    this.createImpact(x, y);

    if (revealed) {
      this.flashAction(`REVEALED: ${hotspotId}`);
      this.renderHotspots();
      return;
    }

    this.flashAction(`ALREADY REVEALED: ${hotspotId}`);
  }

  private createImpact(x: number, y: number): void {
    const impact = this.add
      .circle(x, y, 16, 0x86efac, 0.9)
      .setStrokeStyle(4, 0xf7f3e8, 1)
      .setDepth(5);

    this.tweens.add({
      targets: impact,
      scale: 3,
      alpha: 0,
      duration: 260,
      ease: "Quad.Out",
      onComplete: () => impact.destroy(),
    });
  }

  private clearProjectiles(): void {
    for (const arrow of this.activeArrows) {
      arrow.destroy();
    }

    this.activeArrows.clear();
    this.inFlightRevealIds.clear();
  }

  private clearHotspotSelection(): void {
    if (!this.selectedHotspotId) {
      return;
    }

    const room = this.presentationController.getCurrentRoom();
    const hotspot = room.hotspots.find((item) => item.id === this.selectedHotspotId);

    if (hotspot) {
      const state = getHotspotState(hotspot, this.presentationController.getState());
      const strokeColor = state === "locked" ? 0x64748b : 0xfacc15;
      this.hotspotVisuals.get(hotspot.id)?.setStrokeStyle(4, strokeColor, 0.9);
    }

    this.selectedHotspotId = undefined;
  }

  private flashAction(label: string): void {
    this.actionStatusText?.setText(label).setAlpha(1);

    if (this.actionStatusText) {
      this.tweens.killTweensOf(this.actionStatusText);
      this.tweens.add({
        targets: this.actionStatusText,
        alpha: 0,
        duration: 600,
        ease: "Quad.Out",
      });
    }
  }
}
