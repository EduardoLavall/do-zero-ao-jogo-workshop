export type DemoCommand = "move" | "jump";

export interface InputTraceState {
  x: number;
  height: number;
  commands: number;
  lastCommand: DemoCommand | null;
}

/** Deterministic state transitions: the same input always gives the same result. */
export class InputTraceModel {
  private state: InputTraceState = { x: 0, height: 0, commands: 0, lastCommand: null };

  public getState(): Readonly<InputTraceState> {
    return { ...this.state };
  }

  public dispatch(command: DemoCommand): Readonly<InputTraceState> {
    this.state = {
      x: command === "move" ? Math.min(6, this.state.x + 1) : this.state.x,
      height: command === "jump" ? (this.state.height === 0 ? 1 : 0) : this.state.height,
      commands: this.state.commands + 1,
      lastCommand: command,
    };
    return this.getState();
  }

  public reset(): void {
    this.state = { x: 0, height: 0, commands: 0, lastCommand: null };
  }
}
