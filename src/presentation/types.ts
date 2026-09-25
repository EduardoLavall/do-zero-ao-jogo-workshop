export type RoomId = string;
export type HotspotId = string;
export type ObjectiveId = string;
export type RevealId = string;

export type HotspotState = "locked" | "available" | "revealed";
export type ObjectiveState = "pending" | "completed";

export interface ObjectiveDefinition {
  id: ObjectiveId;
  label: string;
  requiredRevealIds: readonly RevealId[];
}

export interface HotspotDefinition {
  id: HotspotId;
  x: number;
  y: number;
  radius: number;
  revealId: RevealId;
  objectiveId?: ObjectiveId;
  requiredRevealIds?: readonly RevealId[];
}

export interface RoomDefinition {
  id: RoomId;
  title: string;
  width: number;
  objectives: readonly ObjectiveDefinition[];
  hotspots: readonly HotspotDefinition[];
}

export interface PresentationState {
  roomId: RoomId;
  revealed: ReadonlySet<RevealId>;
  completedObjectives: ReadonlySet<ObjectiveId>;
  started: boolean;
  credits: boolean;
}
