export type RoomId = string;
export type HotspotId = string;
export type ObjectiveId = string;
export type RevealId = string;

export type HotspotState = "locked" | "available" | "revealed";
export type ObjectiveState = "pending" | "completed";

export interface PanelContent {
  kicker: string;
  title: string;
  body: string;
  code?: string;
}

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
  /** Label drawn in the game world. */
  label?: string;
  /** Large, projector-safe DOM panel shown after a hit. */
  content?: PanelContent;
}

export interface StageProp {
  id: string;
  kind: "terminal" | "book" | "sign" | "console" | "tree" | "door" | "speaker";
  x: number;
  y: number;
  /** Optional future sprite identifier; geometry is used as a fallback. */
  assetId?: string;
}

export interface RoomStoryboard {
  learningGoal: string;
  thesis: string;
  takeaway: string;
  /** Private speaker guidance for rehearsals / future presenter view. */
  presenterCue: string;
  transitionCue: string;
  durationSeconds: number;
  introduction: PanelContent;
  /** Scene palette and placeholder composition; no assets needed to render. */
  visual: {
    theme: string;
    backgroundColor: number;
    accentColor: number;
    props: readonly StageProp[];
  };
  /** Planned asset IDs, not network URLs or required runtime files. */
  plannedAssets: {
    sprites: readonly string[];
    audio: readonly string[];
  };
}

export interface RoomDefinition {
  id: RoomId;
  title: string;
  width: number;
  objectives: readonly ObjectiveDefinition[];
  hotspots: readonly HotspotDefinition[];
  /** Optional on simple test fixtures; required in authored workshop rooms. */
  storyboard?: RoomStoryboard;
}

export type StoryboardRoomDefinition = RoomDefinition & {
  storyboard: RoomStoryboard;
};

export interface PresentationState {
  roomId: RoomId;
  revealed: ReadonlySet<RevealId>;
  completedObjectives: ReadonlySet<ObjectiveId>;
  started: boolean;
  credits: boolean;
}
