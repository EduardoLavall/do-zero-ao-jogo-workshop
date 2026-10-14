import Phaser from "phaser";

import { gameplayConfig } from "../config/gameplayConfig";
import { PresentationController } from "../presentation/PresentationController";
import { getRoomIndex, roomRegistry } from "../presentation/roomRegistry";
import type { HotspotDefinition } from "../presentation/types";
import { PresentationUI } from "../ui/PresentationUI";
import { GAME_HEIGHT, GAME_WIDTH, WORLD_HEIGHT, WORLD_WIDTH } from "./config";
import { Arrow } from "./entities/Arrow";
import { Player } from "./entities/Player";
import { getHotspotState, resolveHotspotTarget } from "./systems/HotspotSystem";
import { InputController } from "./systems/InputController";
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
  private ui?: PresentationUI;
  private player?: Player;
  private ground?: Phaser.GameObjects.Rectangle;
  private roomBackdrop?: Phaser.GameObjects.Rectangle;
  private readonly hotspotDecorations: Phaser.GameObjects.GameObject[] = [];
  private readonly activeArrows = new Set<Arrow>();
  private readonly inFlightRevealIds = new Set<string>();
  private readonly hotspotVisuals = new Map<string, Phaser.GameObjects.Arc>();
  private nextKey?: Phaser.Input.Keyboard.Key;
  private previousKey?: Phaser.Input.Keyboard.Key;
  private resetKey?: Phaser.Input.Keyboard.Key;
  private enterKey?: Phaser.Input.Keyboard.Key;
  private escapeKey?: Phaser.Input.Keyboard.Key;
  private fullscreenKey?: Phaser.Input.Keyboard.Key;
  private revealKey?: Phaser.Input.Keyboard.Key;
  private helpKey?: Phaser.Input.Keyboard.Key;
  private transitionLocked = false;
  private blockedExitDirection: Exclude<RoomExitDirection, null> | null = null;
  private lastControlEnabled = true;

  private readonly syncUiLayout = (): void => {
    requestAnimationFrame(() => {
      this.ui?.syncLayout(this.game.canvas);
    });
  };

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
      .setStrokeStyle(2, 0x334155, 0.45);

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

    this.player = new Player(this, ENTRY_OFFSET, getPlayerStartY());
    this.physics.add.collider(this.player.view, this.ground);
    this.inputController = new InputController(this);

    const keyboard = this.input.keyboard;
    if (keyboard) {
      this.nextKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
      this.previousKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
      this.resetKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
      this.enterKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      this.escapeKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
      this.fullscreenKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      this.revealKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.helpKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    }

    const root = document.getElementById("game-root");
    if (!root) {
      throw new Error("Missing #game-root for PresentationUI");
    }

    this.ui = new PresentationUI(root, () => this.startPresentation());
    this.ui.setStarted(this.presentationController.getState().started);
    this.ui.syncLayout(this.game.canvas);
    this.scale.on(Phaser.Scale.Events.RESIZE, this.syncUiLayout);
    window.addEventListener("resize", this.syncUiLayout);
    document.addEventListener("fullscreenchange", this.syncUiLayout);
    this.updateRoomVisuals();

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.clearProjectiles();
      this.inputController?.destroy();
      this.scale.off(Phaser.Scale.Events.RESIZE, this.syncUiLayout);
      window.removeEventListener("resize", this.syncUiLayout);
      document.removeEventListener("fullscreenchange", this.syncUiLayout);
      this.ui?.destroy();
      this.ui = undefined;
    });
  }

  public update(): void {
    if (!this.player || !this.inputController) {
      return;
    }

    this.handlePresentationKeys();

    const input = this.inputController.getState(this.player.x);
    if (input.controlEnabled !== this.lastControlEnabled) {
      this.lastControlEnabled = input.controlEnabled;
      this.refreshHud();
    }

    const blocked =
      !this.presentationController.getState().started ||
      this.transitionLocked ||
      (this.ui?.isPanelOpen ?? false);

    this.player.update(
      blocked
        ? { ...input, horizontalDirection: 0, jumpRequested: false, shootRequested: false }
        : input,
    );

    if (blocked) {
      return;
    }

    if (input.shootRequested) {
      this.shootAtHotspot(input.targetWorldX, input.targetWorldY);
    }

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

  private startPresentation(): void {
    if (this.presentationController.start()) {
      this.ui?.setStarted(true);
      this.refreshHud();
      this.ui?.showToast("PRESS N TO ADVANCE · H FOR HELP");
    }
  }

  private handlePresentationKeys(): void {
    if (this.enterKey && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      if (!this.presentationController.getState().started) {
        this.startPresentation();
      } else if (this.ui?.isPanelOpen) {
        this.ui.closePanel();
      }
    }

    if (this.fullscreenKey && Phaser.Input.Keyboard.JustDown(this.fullscreenKey)) {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    }

    if (this.escapeKey && Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
      this.ui?.closePanel();
    }

    if (!this.presentationController.getState().started || this.transitionLocked) {
      return;
    }

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
      this.blockedExitDirection = null;
      this.ui?.closePanel();
      this.updateRoomVisuals();
      this.ui?.showToast("ROOM RESET");
      return;
    }

    if (this.revealKey && Phaser.Input.Keyboard.JustDown(this.revealKey)) {
      this.revealWithKeyboard();
      return;
    }

    if (this.helpKey && Phaser.Input.Keyboard.JustDown(this.helpKey)) {
      this.ui?.openHelp();
    }
  }

  private revealWithKeyboard(): void {
    const room = this.presentationController.getCurrentRoom();
    const hotspot = room.hotspots.find(
      (candidate) =>
        getHotspotState(candidate, this.presentationController.getState()) === "available",
    );

    this.clearProjectiles();

    if (hotspot) {
      this.createImpact(hotspot.x, hotspot.y);
      this.revealHotspot(hotspot);
    } else {
      this.ui?.openIntroduction(room.id);
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
      this.ui?.showToast(direction === "next" ? "LAST ROOM" : "FIRST ROOM");
      return;
    }

    this.transitionLocked = true;
    this.blockedExitDirection = null;
    this.clearProjectiles();
    this.ui?.closePanel();
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
    this.roomBackdrop?.setFillStyle(roomIndex % 2 === 0 ? 0x0b1020 : 0x111827);
    this.renderHotspots();
    this.refreshHud();
  }

  private refreshHud(): void {
    if (!this.ui) {
      return;
    }

    const room = this.presentationController.getCurrentRoom();
    this.ui.updateHud(
      room,
      getRoomIndex(room.id),
      roomRegistry.length,
      this.presentationController.getState(),
      this.lastControlEnabled,
    );
  }

  private renderHotspots(): void {
    for (const decoration of this.hotspotDecorations) {
      decoration.destroy();
    }
    this.hotspotDecorations.length = 0;
    this.hotspotVisuals.clear();

    const room = this.presentationController.getCurrentRoom();
    const state = this.presentationController.getState();

    for (const hotspot of room.hotspots) {
      const hotspotState = getHotspotState(hotspot, state);
      const fillColor =
        hotspotState === "locked"
          ? 0x334155
          : hotspotState === "revealed"
            ? 0x14532d
            : 0x1e293b;
      const strokeColor =
        hotspotState === "locked"
          ? 0x64748b
          : hotspotState === "revealed"
            ? 0x86efac
            : 0xfacc15;

      const circle = this.add
        .circle(hotspot.x, hotspot.y, hotspot.radius, fillColor, 0.22)
        .setStrokeStyle(4, strokeColor, 0.8)
        .setDepth(1);

      const marker = this.add
        .circle(hotspot.x, hotspot.y, 18, strokeColor, 1)
        .setDepth(1);

      const label = this.add
        .text(
          hotspot.x,
          hotspot.y - hotspot.radius - 34,
          `${hotspot.id} · ${hotspotState.toUpperCase()}`,
          {
            fontFamily: "monospace",
            fontSize: "26px",
            color: hotspotState === "revealed" ? "#86efac" : "#f4f8ff",
            backgroundColor: "#0b1020",
            padding: { x: 10, y: 7 },
          },
        )
        .setOrigin(0.5)
        .setDepth(2);

      this.hotspotVisuals.set(hotspot.id, circle);
      this.hotspotDecorations.push(circle, marker, label);
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

    if (!target) {
      this.ui?.showToast(room.hotspots.length > 0 ? "NO VALID TARGET" : "PRESS N TO ADVANCE");
      return;
    }

    if (!this.player || this.inFlightRevealIds.has(target.hotspot.revealId)) {
      this.ui?.showToast("TARGET ALREADY IN FLIGHT");
      return;
    }

    this.hotspotVisuals.get(target.hotspot.id)?.setStrokeStyle(8, 0x86efac, 1);
    this.player.faceTarget(target.hotspot.x);
    this.inFlightRevealIds.add(target.hotspot.revealId);

    const arrow = new Arrow(
      this,
      this.player.x,
      this.player.y - 12,
      target.hotspot.x,
      target.hotspot.y,
      () => {
        this.activeArrows.delete(arrow);
        this.inFlightRevealIds.delete(target.hotspot.revealId);
        this.createImpact(target.hotspot.x, target.hotspot.y);
        this.revealHotspot(target.hotspot);
      },
    );

    this.activeArrows.add(arrow);
  }

  private revealHotspot(hotspot: HotspotDefinition): void {
    if (!this.presentationController.reveal(hotspot.revealId)) {
      return;
    }

    const room = this.presentationController.getCurrentRoom();
    for (const objective of room.objectives) {
      if (
        objective.requiredRevealIds.every((revealId) =>
          this.presentationController.getState().revealed.has(revealId),
        )
      ) {
        this.presentationController.completeObjective(objective.id);
      }
    }

    this.renderHotspots();
    this.refreshHud();
    this.ui?.openReveal(hotspot.revealId);
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
}
