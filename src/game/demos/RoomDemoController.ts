/** A demo owns its local state and all of its event listeners / visual resources. */
export interface RoomDemo {
  mount(host: HTMLElement): void;
  activate(): void;
  update(deltaMs: number): void;
  reset(): void;
  dispose(): void;
}

export type RoomDemoFactory = () => RoomDemo;

/**
 * Scene-level owner for exactly one demo at a time. PresentationState remains
 * the source of truth for reveals; demos have deliberately ephemeral state.
 */
export class RoomDemoController {
  private active?: RoomDemo;
  private activeRoomId?: string;

  public constructor(private readonly registry: Readonly<Record<string, RoomDemoFactory>>) {}

  public canOpen(roomId: string): boolean {
    return this.registry[roomId] !== undefined;
  }

  public get isActive(): boolean {
    return this.active !== undefined;
  }

  public get roomId(): string | undefined {
    return this.activeRoomId;
  }

  public open(roomId: string, host: HTMLElement): boolean {
    this.close();
    const factory = this.registry[roomId];
    if (!factory) {
      return false;
    }

    const demo = factory();
    this.active = demo;
    this.activeRoomId = roomId;
    try {
      demo.mount(host);
      demo.activate();
    } catch (error) {
      this.close();
      throw error;
    }
    return true;
  }

  public update(deltaMs: number): void {
    if (!this.active) {
      return;
    }

    const safeDelta = Number.isFinite(deltaMs) ? Math.max(0, Math.min(deltaMs, 50)) : 0;
    this.active.update(safeDelta);
  }

  public reset(): void {
    this.active?.reset();
  }

  public close(): void {
    const previous = this.active;
    this.active = undefined;
    this.activeRoomId = undefined;
    previous?.dispose();
  }
}
