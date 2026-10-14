import type { RoomDemo } from "./RoomDemoController";
import { InputTraceModel } from "./models/InputTraceModel";
import type { DemoCommand } from "./models/InputTraceModel";

/**
 * #38 pilot, NOT the full Game Loop or physics simulation (#39/#40).
 * A command changes real TypeScript state; the DOM renders its consequences.
 */
export class InputTraceDemo implements RoomDemo {
  private readonly model = new InputTraceModel();
  private host?: HTMLElement;
  private stage?: HTMLDivElement;
  private marker?: HTMLSpanElement;
  private summary?: HTMLParagraphElement;
  private readonly listeners: Array<() => void> = [];

  public mount(host: HTMLElement): void {
    this.host = host;
    host.replaceChildren();
    const title = document.createElement("h3");
    title.textContent = "INPUT → ESTADO → RESULTADO";
    const lead = document.createElement("p");
    lead.textContent =
      "Experimento de integração: use MOVER ou PULAR e observe como o mesmo modelo responde a comandos diferentes.";
    const controls = document.createElement("div");
    controls.className = "demo-controls";

    const addButton = (label: string, callback: () => void): HTMLButtonElement => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", callback);
      this.listeners.push(() => button.removeEventListener("click", callback));
      controls.appendChild(button);
      return button;
    };
    const first = addButton("MOVER →", () => this.perform("move"));
    addButton("PULAR ↑", () => this.perform("jump"));
    addButton("EXECUTAR EXEMPLO", () => {
      this.perform("move");
      this.perform("jump");
    });
    addButton("RESET DEMO", () => this.reset());

    this.stage = document.createElement("div");
    this.stage.className = "demo-stage";
    this.stage.setAttribute("aria-label", "Posição do personagem simulada");
    const ground = document.createElement("div");
    ground.className = "demo-ground";
    this.marker = document.createElement("span");
    this.marker.className = "demo-marker";
    this.marker.setAttribute("aria-hidden", "true");
    this.marker.textContent = "◆";
    this.stage.append(ground, this.marker);

    this.summary = document.createElement("p");
    this.summary.className = "demo-summary";
    this.summary.setAttribute("role", "status");
    this.summary.setAttribute("aria-live", "polite");

    const hint = document.createElement("p");
    hint.className = "demo-hint";
    hint.textContent = "D ou ESC fecha · E pula a demo e revela conteúdo · N/P troca sala · R reinicia";
    host.append(title, lead, controls, this.stage, this.summary, hint);
    this.render();
    first.focus();
  }

  public activate(): void {
    this.render();
  }

  public update(): void {
    // Intentionally no timer: the first demo proves event/state/lifecycle without a loop.
  }

  public reset(): void {
    this.model.reset();
    this.render();
  }

  public dispose(): void {
    for (const detach of this.listeners.splice(0)) {
      detach();
    }
    this.host?.replaceChildren();
    this.host = undefined;
    this.marker = undefined;
    this.stage = undefined;
    this.summary = undefined;
  }

  private perform(command: DemoCommand): void {
    this.model.dispatch(command);
    this.render();
  }

  private render(): void {
    if (!this.marker || !this.summary) {
      return;
    }
    const state = this.model.getState();
    this.marker.style.left = `${9 + state.x * 12}%`;
    this.marker.style.bottom = `${20 + state.height * 58}px`;
    this.summary.textContent = state.lastCommand
      ? `INPUT: ${state.lastCommand.toUpperCase()} → UPDATE: X=${state.x}, ALTURA=${state.height} → RENDER: posição alterada · AÇÕES ${state.commands}`
      : "INPUT: aguardando → UPDATE: X=0, ALTURA=0 → RENDER: posição inicial";
  }
}
