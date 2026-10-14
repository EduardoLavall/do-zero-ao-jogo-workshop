import type { RevealId, RoomId } from "../presentation/types";

export interface PresentationCopy {
  kicker: string;
  title: string;
  body: string;
  code?: string;
}

const introductions: Readonly<Record<string, PresentationCopy>> = {
  "room-01": {
    kicker: "01 / BASE INTERATIVA",
    title: "Uma apresentação que se joga",
    body: "Esta é uma sala provisória. Use N para conhecer a sala de testes ou caminhe até a saída à direita.",
  },
  "room-02": {
    kicker: "02 / LABORATÓRIO DE INTERAÇÃO",
    title: "Aponte. Dispare. Revele.",
    body: "Clique nos alvos para testar o aim assist e a flecha. O alvo bloqueado só fica disponível depois de Alpha. A tecla E revela sem atirar.",
  },
};

const reveals: Readonly<Record<string, PresentationCopy>> = {
  "test-alpha": {
    kicker: "TARGET 01 / INPUT",
    title: "O comando virou uma ação",
    body: "O clique encontrou um hotspot válido e disparou uma flecha. Agora o alvo dependente pode ser desbloqueado.",
  },
  "test-beta": {
    kicker: "TARGET 02 / INTERAÇÃO",
    title: "Aim assist em funcionamento",
    body: "O sistema escolhe o alvo disponível mais próximo dentro do raio de seleção, sem exigir precisão absoluta.",
  },
  "test-gamma": {
    kicker: "TARGET 03 / FEEDBACK",
    title: "Impacto → revelação",
    body: "A chegada da flecha dispara um evento; o estado da apresentação muda e a interface reage.",
  },
  "test-locked": {
    kicker: "TARGET 04 / PROGRESSÃO",
    title: "Dependências desbloqueadas",
    body: "Este alvo exigia a revelação Alpha. O estado disponível é derivado dos requisitos, não de sprites ou de cliques aleatórios.",
  },
};

export function getRoomIntroduction(roomId: RoomId): PresentationCopy {
  return (
    introductions[roomId] ?? {
      kicker: "SLIDE ROOM",
      title: "Próxima etapa do workshop",
      body: "Conteúdo em preparação. Use os atalhos de apresentação para navegar.",
    }
  );
}

export function getRevealCopy(revealId: RevealId): PresentationCopy {
  return (
    reveals[revealId] ?? {
      kicker: "CONTENT REVEALED",
      title: "Novo conteúdo",
      body: "O alvo foi revelado. Esta seção receberá o conteúdo didático no storyboard da sala.",
    }
  );
}
