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

export interface PresentationCopy {
  kicker: string;
  title: string;
  body: string;
  code?: string;
  diagram?: string;
}

export type RoomObjectKind = "display" | "plinth" | "prop" | "door";

export interface RoomObjectDefinition {
  id: string;
  kind: RoomObjectKind;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
}

export interface RoomRevealDefinition {
  id: RevealId;
  hotspot: { x: number; y: number; radius: number };
  requiredRevealIds?: readonly RevealId[];
  content: PresentationCopy;
  presenterCue: string;
  assetId?: string;
  sfxId?: string;
}

export interface RoomStoryboard {
  learningGoal: string;
  question: string;
  takeaway: string;
  presenterCue: string;
  durationSeconds: number;
  layout: {
    composition: string;
    focalPoint: string;
    theme: string;
  };
  introduction: PresentationCopy;
  objects: readonly RoomObjectDefinition[];
  reveals: readonly RoomRevealDefinition[];
  assets: readonly string[];
  audio: readonly string[];
  transition: { prompt: string; mode: "walk" | "presenter" | "final" };
  fallback: { revealKey: "E"; nextKey: "N"; previousKey: "P"; resetKey: "R" };
  productionStatus: "storyboard" | "vertical-slice" | "final";
}

export interface RoomDefinition {
  id: RoomId;
  title: string;
  width: number;
  objectives: readonly ObjectiveDefinition[];
  hotspots: readonly HotspotDefinition[];
  storyboard: RoomStoryboard;
}

export interface PresentationState {
  roomId: RoomId;
  revealed: ReadonlySet<RevealId>;
  completedObjectives: ReadonlySet<ObjectiveId>;
  started: boolean;
  credits: boolean;
}
