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
  | { type: "room:entered"; roomId: RoomId }
  | { type: "presentation:next"; roomId: RoomId }
  | { type: "presentation:previous"; roomId: RoomId }
  | { type: "presentation:reset"; roomId: RoomId }
  | { type: "hotspot:revealed"; revealId: RevealId }
  | { type: "objective:completed"; objectiveId: ObjectiveId };

export type PresentationEventListener = (event: PresentationEvent) => void;

export class PresentationController {
  private state: PresentationState;
  private readonly listeners = new Set<PresentationEventListener>();

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

  public subscribe(listener: PresentationEventListener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  public enterRoom(roomId: RoomId): boolean {
    if (!getRoomById(roomId)) {
      return false;
    }

    this.state = createInitialPresentationState(roomId);
    this.emit({ type: "room:entered", roomId });
    return true;
  }

  public nextRoom(): boolean {
    const currentIndex = getRoomIndex(this.state.roomId);
    const nextRoom = roomRegistry[currentIndex + 1];

    if (!nextRoom) {
      return false;
    }

    this.state = createInitialPresentationState(nextRoom.id);
    this.emit({ type: "presentation:next", roomId: nextRoom.id });
    this.emit({ type: "room:entered", roomId: nextRoom.id });
    return true;
  }

  public previousRoom(): boolean {
    const currentIndex = getRoomIndex(this.state.roomId);
    const previousRoom = roomRegistry[currentIndex - 1];

    if (!previousRoom) {
      return false;
    }

    this.state = createInitialPresentationState(previousRoom.id);
    this.emit({ type: "presentation:previous", roomId: previousRoom.id });
    this.emit({ type: "room:entered", roomId: previousRoom.id });
    return true;
  }

  public resetRoom(): void {
    const roomId = this.state.roomId;
    this.state = createInitialPresentationState(roomId);
    this.emit({ type: "presentation:reset", roomId });
  }

  public reveal(revealId: RevealId): boolean {
    if (this.state.revealed.has(revealId)) {
      return false;
    }

    const revealed = new Set(this.state.revealed);
    revealed.add(revealId);

    this.state = {
      ...this.state,
      revealed,
    };

    this.emit({ type: "hotspot:revealed", revealId });
    return true;
  }

  public completeObjective(objectiveId: ObjectiveId): boolean {
    if (this.state.completedObjectives.has(objectiveId)) {
      return false;
    }

    const completedObjectives = new Set(this.state.completedObjectives);
    completedObjectives.add(objectiveId);

    this.state = {
      ...this.state,
      completedObjectives,
    };

    this.emit({ type: "objective:completed", objectiveId });
    return true;
  }

  private emit(event: PresentationEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}
