import { createInitialPresentationState } from "./PresentationState";
import { getRoomById, getRoomIndex, roomRegistry } from "./roomRegistry";
import type {
  ObjectiveId,
  PresentationState,
  RevealId,
  RoomDefinition,
  RoomId,
} from "./types";

export type PresentationEvent =
  | { type: "presentation:started"; roomId: RoomId }
  | { type: "room:entered"; roomId: RoomId }
  | { type: "presentation:next"; roomId: RoomId }
  | { type: "presentation:previous"; roomId: RoomId }
  | { type: "presentation:reset"; roomId: RoomId }
  | { type: "hotspot:revealed"; revealId: RevealId }
  | { type: "objective:completed"; objectiveId: ObjectiveId };

export type PresentationEventListener = (event: PresentationEvent) => void;

interface SavedRoomProgress {
  revealed: Set<RevealId>;
  completedObjectives: Set<ObjectiveId>;
}

export class PresentationController {
  private state: PresentationState;
  private readonly listeners = new Set<PresentationEventListener>();
  private readonly progressByRoom = new Map<RoomId, SavedRoomProgress>();

  public constructor(initialRoomId: RoomId = roomRegistry[0]?.id ?? "") {
    if (!getRoomById(initialRoomId)) {
      throw new Error(`Unknown room: ${initialRoomId}`);
    }

    this.state = createInitialPresentationState(initialRoomId);
  }

  public getState(): PresentationState {
    return this.state;
  }

  public getCurrentRoom(): RoomDefinition {
    const room = getRoomById(this.state.roomId);
    if (!room) {
      throw new Error(`Unknown current room: ${this.state.roomId}`);
    }
    return room;
  }

  public start(): boolean {
    if (this.state.started) {
      return false;
    }

    this.state = { ...this.state, started: true };
    this.emit({ type: "presentation:started", roomId: this.state.roomId });
    return true;
  }

  public subscribe(listener: PresentationEventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public enterRoom(roomId: RoomId): boolean {
    if (!getRoomById(roomId)) {
      return false;
    }

    this.activateRoom(roomId);
    this.emit({ type: "room:entered", roomId });
    return true;
  }

  public nextRoom(): boolean {
    const nextRoom = roomRegistry[getRoomIndex(this.state.roomId) + 1];
    if (!nextRoom) {
      return false;
    }

    this.activateRoom(nextRoom.id);
    this.emit({ type: "presentation:next", roomId: nextRoom.id });
    this.emit({ type: "room:entered", roomId: nextRoom.id });
    return true;
  }

  public previousRoom(): boolean {
    const previousRoom = roomRegistry[getRoomIndex(this.state.roomId) - 1];
    if (!previousRoom) {
      return false;
    }

    this.activateRoom(previousRoom.id);
    this.emit({ type: "presentation:previous", roomId: previousRoom.id });
    this.emit({ type: "room:entered", roomId: previousRoom.id });
    return true;
  }

  public resetRoom(): void {
    const roomId = this.state.roomId;
    this.progressByRoom.delete(roomId);
    this.activateRoom(roomId);
    this.emit({ type: "presentation:reset", roomId });
  }

  public reveal(revealId: RevealId): boolean {
    const hotspot = this.getCurrentRoom().hotspots.find((item) => item.revealId === revealId);
    if (
      !hotspot ||
      this.state.revealed.has(revealId) ||
      !(hotspot.requiredRevealIds ?? []).every((id) => this.state.revealed.has(id))
    ) {
      return false;
    }

    const revealed = new Set(this.state.revealed);
    revealed.add(revealId);
    this.state = { ...this.state, revealed };
    this.persistCurrentProgress();
    this.emit({ type: "hotspot:revealed", revealId });

    for (const objective of this.getCurrentRoom().objectives) {
      if (objective.requiredRevealIds.every((id) => revealed.has(id))) {
        this.completeObjective(objective.id);
      }
    }

    return true;
  }

  public completeObjective(objectiveId: ObjectiveId): boolean {
    const objective = this.getCurrentRoom().objectives.find((item) => item.id === objectiveId);
    if (
      !objective ||
      this.state.completedObjectives.has(objectiveId) ||
      !objective.requiredRevealIds.every((id) => this.state.revealed.has(id))
    ) {
      return false;
    }

    const completedObjectives = new Set(this.state.completedObjectives);
    completedObjectives.add(objectiveId);
    this.state = { ...this.state, completedObjectives };
    this.persistCurrentProgress();
    this.emit({ type: "objective:completed", objectiveId });
    return true;
  }

  private activateRoom(roomId: RoomId): void {
    const progress = this.progressByRoom.get(roomId);
    this.state = {
      ...createInitialPresentationState(roomId),
      started: this.state.started,
      revealed: new Set(progress?.revealed ?? []),
      completedObjectives: new Set(progress?.completedObjectives ?? []),
    };
  }

  private persistCurrentProgress(): void {
    this.progressByRoom.set(this.state.roomId, {
      revealed: new Set(this.state.revealed),
      completedObjectives: new Set(this.state.completedObjectives),
    });
  }

  private emit(event: PresentationEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}
