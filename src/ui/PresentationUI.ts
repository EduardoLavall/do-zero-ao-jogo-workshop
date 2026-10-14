import type { PresentationState, RoomDefinition } from "../presentation/types";
import { getOverlayPlacement } from "./projection";
import { getRevealCopy, getRoomIntroduction, getRoomTakeaway } from "./presentationCopy";
import type { PresentationCopy } from "./presentationCopy";
import { fillEngineLessonDiagram } from "./EngineLessonDiagram";

const LOGICAL_WIDTH = 1920;
const LOGICAL_HEIGHT = 1080;

function requiredElement<T extends HTMLElement>(
  parent: HTMLElement,
  selector: string,
): T {
  const element = parent.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Presentation UI missing element: ${selector}`);
  }

  return element;
}

export class PresentationUI {
  private readonly root: HTMLElement;
  private readonly layer: HTMLDivElement;
  private readonly menu: HTMLElement;
  private readonly hud: HTMLElement;
  private readonly panel: HTMLElement;
  private readonly roomNumber: HTMLElement;
  private readonly roomTitle: HTMLElement;
  private readonly roomSubtitle: HTMLElement;
  private readonly objectives: HTMLElement;
  private readonly progressFill: HTMLElement;
  private readonly progressText: HTMLElement;
  private readonly controlText: HTMLElement;
  private readonly panelKicker: HTMLElement;
  private readonly panelTitle: HTMLElement;
  private readonly panelBody: HTMLElement;
  private readonly panelCode: HTMLElement;
  private readonly engineDiagram: HTMLElement;
  private readonly toast: HTMLElement;
  private readonly startButton: HTMLButtonElement;
  private readonly startHandler: () => void;
  private toastTimeout?: ReturnType<typeof setTimeout>;

  public constructor(root: HTMLElement, onStart: () => void) {
    this.root = root;
    this.startHandler = onStart;
    this.layer = document.createElement("div");
    this.layer.className = "presentation-layer";
    this.layer.innerHTML = `
      <section class="presentation-menu" aria-label="Menu inicial">
        <div class="menu-stars" aria-hidden="true"></div>
        <div class="menu-content">
          <span class="ui-kicker">WORKSHOP INTERATIVO · PLAYER ONE</span>
          <h1>DO ZERO <span>AO JOGO</span></h1>
          <p>Introdução ao Desenvolvimento de Games</p>
          <button type="button" class="start-button">PRESS ENTER TO BEGIN <span aria-hidden="true">↵</span></button>
          <small>Uma apresentação em salas jogáveis · ~15 MIN</small>
        </div>
        <div class="menu-corner menu-corner--tl"></div>
        <div class="menu-corner menu-corner--br"></div>
      </section>
      <header class="presentation-hud" aria-label="Progresso da apresentação" hidden>
        <div class="hud-identity">
          <span class="ui-kicker">DO ZERO AO JOGO <span class="hud-room-number"></span></span>
          <h2 class="hud-room-title"></h2>
          <p class="hud-room-subtitle"></p>
        </div>
        <div class="hud-stats">
          <span class="hud-progress-text"></span>
          <div class="hud-meter" aria-hidden="true"><div class="hud-meter-fill"></div></div>
          <div class="hud-objectives" aria-label="Objetivos da sala"></div>
          <span class="hud-controls"></span>
        </div>
      </header>
      <section class="presentation-panel" role="region" aria-label="Conteúdo revelado" aria-live="polite" hidden>
        <div class="panel-heading"><span class="panel-kicker ui-kicker"></span><span class="panel-diamond" aria-hidden="true">✦</span></div>
        <h3 class="panel-title"></h3>
        <p class="panel-body"></p>
        <pre class="panel-code" hidden><code></code></pre>
        <div class="panel-engine-diagram" aria-label="Diagrama da engine" hidden></div>
        <div class="panel-footer">ESC FECHAR <span aria-hidden="true">·</span> N PRÓXIMA SALA <span aria-hidden="true">·</span> E REVELAR</div>
      </section>
      <aside class="presentation-toast" role="status" aria-live="polite" hidden></aside>
      <footer class="presentation-keys" hidden>H AJUDA <span>·</span> E REVELAR <span>·</span> N / P SALAS <span>·</span> F TELA CHEIA</footer>
    `;

    this.menu = requiredElement(this.layer, ".presentation-menu");
    this.hud = requiredElement(this.layer, ".presentation-hud");
    this.panel = requiredElement(this.layer, ".presentation-panel");
    this.roomNumber = requiredElement(this.layer, ".hud-room-number");
    this.roomTitle = requiredElement(this.layer, ".hud-room-title");
    this.roomSubtitle = requiredElement(this.layer, ".hud-room-subtitle");
    this.objectives = requiredElement(this.layer, ".hud-objectives");
    this.progressFill = requiredElement(this.layer, ".hud-meter-fill");
    this.progressText = requiredElement(this.layer, ".hud-progress-text");
    this.controlText = requiredElement(this.layer, ".hud-controls");
    this.panelKicker = requiredElement(this.layer, ".panel-kicker");
    this.panelTitle = requiredElement(this.layer, ".panel-title");
    this.panelBody = requiredElement(this.layer, ".panel-body");
    this.panelCode = requiredElement(this.layer, ".panel-code");
    this.engineDiagram = requiredElement(this.layer, ".panel-engine-diagram");
    this.toast = requiredElement(this.layer, ".presentation-toast");
    this.startButton = requiredElement(this.layer, ".start-button");
    this.startButton.addEventListener("click", this.startHandler);
    this.root.appendChild(this.layer);
  }

  public syncLayout(canvas: HTMLCanvasElement): void {
    const canvasRect = canvas.getBoundingClientRect();
    const rootRect = this.root.getBoundingClientRect();

    const placement = getOverlayPlacement(canvasRect, rootRect, LOGICAL_WIDTH, LOGICAL_HEIGHT);
    this.layer.style.left = `${placement.left}px`;
    this.layer.style.top = `${placement.top}px`;
    this.layer.style.transform = `scale(${placement.scaleX}, ${placement.scaleY})`;
  }

  public setStarted(started: boolean): void {
    this.menu.hidden = started;
    this.hud.hidden = !started;
    requiredElement(this.layer, ".presentation-keys").hidden = !started;

    if (!started) {
      this.closePanel();
    }
  }

  public updateHud(
    room: RoomDefinition,
    roomIndex: number,
    totalRooms: number,
    state: PresentationState,
    controlEnabled: boolean,
  ): void {
    this.roomNumber.textContent = `/ ${String(roomIndex + 1).padStart(2, "0")} DE ${String(totalRooms).padStart(2, "0")}`;
    this.roomTitle.textContent = room.title.toUpperCase();
    this.roomSubtitle.textContent = getRoomIntroduction(room.id).kicker;

    const total = room.hotspots.length;
    const completed = room.hotspots.filter((hotspot) => state.revealed.has(hotspot.revealId)).length;
    this.progressText.textContent = total > 0 ? `REVEALS ${completed} / ${total}` : "SALA LIVRE";
    this.progressFill.style.width = total > 0 ? `${(completed / total) * 100}%` : "100%";

    this.objectives.replaceChildren();
    if (room.objectives.length > 0) {
      for (const objective of room.objectives) {
        const line = document.createElement("div");
        const done = state.completedObjectives.has(objective.id);
        line.className = `hud-objective ${done ? "is-complete" : ""}`;
        line.textContent = `${done ? "✓" : "◇"} ${objective.label}`;
        this.objectives.appendChild(line);
      }
    } else {
      this.objectives.textContent = "◇ Explore esta sala";
    }

    this.controlText.textContent = `CONTROLE: ${controlEnabled ? "ON" : "OFF"}`;
    this.controlText.classList.toggle("is-off", !controlEnabled);
  }

  public openReveal(revealId: string): void {
    this.openCopy(getRevealCopy(revealId), revealId);
  }

  public openIntroduction(roomId: string): void {
    this.openCopy(getRoomIntroduction(roomId));
  }

  public openTakeaway(roomId: string): void {
    this.openCopy(getRoomTakeaway(roomId));
  }

  public openHelp(): void {
    this.openCopy({
      kicker: "PRESENTER MODE / AJUDA",
      title: "Você controla a apresentação",
      body: "ENTER começa. N/P mudam de sala, R reinicia, E revela o próximo alvo disponível sem atirar, 6 abre o laboratório de programação, ESC fecha o painel, F alterna tela cheia e H abre esta ajuda. Mouse: esquerda atira, direita pula, meio alterna o controle.",
    });
  }

  public closePanel(): void {
    this.panel.hidden = true;
  }

  public get isPanelOpen(): boolean {
    return !this.panel.hidden;
  }

  public showToast(message: string): void {
    this.toast.textContent = message;
    this.toast.hidden = false;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.toast.hidden = true;
    }, 1600);
  }

  public destroy(): void {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.startButton.removeEventListener("click", this.startHandler);
    this.layer.remove();
  }

  private openCopy(copy: PresentationCopy, revealId?: string): void {
    this.panelKicker.textContent = copy.kicker;
    this.panelTitle.textContent = copy.title;
    this.panelBody.textContent = copy.body;
    const hasDiagram = revealId ? fillEngineLessonDiagram(this.engineDiagram, revealId) : false;
    this.engineDiagram.hidden = !hasDiagram;
    this.panel.classList.toggle("is-engine-panel", hasDiagram);
    this.panelCode.hidden = !copy.code;
    requiredElement(this.panelCode, "code").textContent = copy.code ?? "";
    this.panel.hidden = false;
  }
}
