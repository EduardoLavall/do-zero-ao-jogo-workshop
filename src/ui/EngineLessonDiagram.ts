export interface DiagramStep {
  title: string;
  detail: string;
}

export interface EngineLessonDiagram {
  caption: string;
  steps: readonly DiagramStep[];
  hint: string;
}

const lessons: Readonly<Record<string, EngineLessonDiagram>> = {
  "room-06-game-loop": {
    caption: "CICLO DE UM FRAME · MODELO CONCEITUAL",
    steps: [
      { title: "INPUT", detail: "Comandos" },
      { title: "UPDATE", detail: "Regras" },
      { title: "RENDER", detail: "Imagem" },
    ],
    hint: "60 FPS ≈ 16,67 ms por frame · execução real tem mais subsistemas",
  },
  "room-06-lifecycle": {
    caption: "ENGINE CONTROL FLOW · INVERSÃO DE CONTROLE",
    steps: [
      { title: "ENGINE", detail: "Player Loop" },
      { title: "START", detail: "Uma vez" },
      { title: "UPDATE", detail: "Por frame" },
    ],
    hint: "A Unity chama os métodos do script — não precisamos criar o loop manualmente.",
  },
  "room-06-fixedupdate": {
    caption: "DUAS FREQUÊNCIAS, UM MESMO JOGO",
    steps: [
      { title: "UPDATE", detail: "Frames variáveis" },
      { title: "FIXED", detail: "Passos fixos" },
      { title: "PHYSICS", detail: "Simulação" },
    ],
    hint: "Um frame pode executar zero, um ou vários passos de física. O passo padrão é 0,02 s.",
  },
  "room-06-components": {
    caption: "UM GAMEOBJECT, MUITAS RESPONSABILIDADES",
    steps: [
      { title: "OBJECT", detail: "Entidade" },
      { title: "COMPONENTS", detail: "Transform · Sprite" },
      { title: "BEHAVIOUR", detail: "Seu script" },
    ],
    hint: "Collider2D define a forma do contato; Rigidbody2D participa da simulação.",
  },
  "room-06-input": {
    caption: "DO DISPOSITIVO À AÇÃO DE JOGO",
    steps: [
      { title: "TECLADO", detail: "Evento" },
      { title: "INPUT SYS", detail: "Processa" },
      { title: "ACTION", detail: "Gameplay" },
    ],
    hint: "Polling ou callbacks no Input System moderno; Input.GetKeyDown é da API legada.",
  },
  "room-06-physics": {
    caption: "O SCRIPT PEDE · A FÍSICA RESOLVE",
    steps: [
      { title: "ADDFORCE", detail: "Impulso" },
      { title: "RIGIDBODY", detail: "Velocidade" },
      { title: "PHYSICS", detail: "Novo estado" },
    ],
    hint: "Não é teleporte: gravidade, massa e colisões determinam o resultado.",
  },
};

export function getEngineLessonDiagram(revealId: string): EngineLessonDiagram | null {
  return lessons[revealId] ?? null;
}

/** Keeps illustration DOM independent from Phaser and safe from HTML injection. */
export function fillEngineLessonDiagram(element: HTMLElement, revealId: string): boolean {
  const diagram = getEngineLessonDiagram(revealId);
  element.replaceChildren();

  if (!diagram) {
    return false;
  }

  const caption = document.createElement("span");
  caption.className = "engine-diagram-caption";
  caption.textContent = diagram.caption;
  element.appendChild(caption);

  const flow = document.createElement("div");
  flow.className = "engine-diagram-flow";
  for (const [index, step] of diagram.steps.entries()) {
    if (index > 0) {
      const arrow = document.createElement("span");
      arrow.className = "engine-diagram-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "→";
      flow.appendChild(arrow);
    }

    const node = document.createElement("div");
    node.className = "engine-diagram-node";
    const title = document.createElement("strong");
    title.textContent = step.title;
    const detail = document.createElement("small");
    detail.textContent = step.detail;
    node.append(title, detail);
    flow.appendChild(node);
  }
  element.appendChild(flow);

  const hint = document.createElement("p");
  hint.className = "engine-diagram-hint";
  hint.textContent = diagram.hint;
  element.appendChild(hint);

  return true;
}
