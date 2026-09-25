import Phaser from "phaser";

import { PresentationController } from "../presentation/PresentationController";
import { getRoomIndex, roomRegistry } from "../presentation/roomRegistry";
import { GAME_HEIGHT, GAME_WIDTH, WORLD_HEIGHT, WORLD_WIDTH } from "./config";
import { Player } from "./entities/Player";
import { InputController } from "./systems/InputController";
import {
  ENTRY_OFFSET,
  EXIT_ZONE_WIDTH,
  SAFE_AREA_MARGIN,
  getEntryX,
  resolveRoomExit,
} from "./systems/RoomTransition";
import type { RoomExitDirection } from "./systems/RoomTransition";

const GROUND_HEIGHT = 150;
const PLAYER_START_Y = GAME_HEIGHT - GROUND_HEIGHT - 54;
const TRANSITION_DURATION = 180;

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
      .text(34, GAME_HEIGHT / 2, "← PREVIOUS", {
        fontFamily: "monospace",
        fontSize: "20px",
        color: "#64748b",
      })
      .setOrigin(0, 0.5)
      .setAngle(-90);

    this.nextExitText = this.add
      .text(GAME_WIDTH - 34, GAME_HEIGHT / 2, "NEXT →", {
        fontFamily: "monospace",
        fontSize: "20px",
        color: "#64748b",
      })
      .setOrigin(1, 0.5)
      .setAngle(90);

    this.player = new Player(this, ENTRY_OFFSET, PLAYER_START_Y);
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
      this.flashAction("SHOOT REQUEST");
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
      this.presentationController.resetRoom();
      this.player?.setPosition(ENTRY_OFFSET, PLAYER_START_Y);
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
    this.player.stopHorizontal();
    this.cameras.main.fadeOut(TRANSITION_DURATION, 0, 0, 0);

    this.time.delayedCall(TRANSITION_DURATION, () => {
      if (!this.player) {
        return;
      }

      this.updateRoomVisuals();
      this.player.setPosition(getEntryX(direction, GAME_WIDTH), PLAYER_START_Y);
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
