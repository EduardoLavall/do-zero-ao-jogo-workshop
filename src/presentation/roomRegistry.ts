import { storyboardRooms } from "./roomStoryboards";
import type { RoomDefinition, RoomId } from "./types";

// The speaker's N/P sequence includes ONLY the 11 workshop rooms.
export const roomRegistry: readonly RoomDefinition[] = storyboardRooms;

// Keep #6/#7's test laboratory separate from the 15-minute narrative.
// The presenter can reach it with T, and return to the previous room with T.
export const developmentRoom: RoomDefinition = {
  id: "dev-interactions",
  title: "Laboratório de Interações",
  width: 1920,
  objectives: [{
    id: "dev-complete",
    label: "Revelar os 4 alvos de teste",
    requiredRevealIds: ["test-alpha", "test-beta", "test-gamma", "test-locked"],
  }],
  hotspots: [
    { id: "hotspot-alpha", x: 620, y: 520, radius: 150, revealId: "test-alpha" },
    { id: "hotspot-beta", x: 980, y: 430, radius: 110, revealId: "test-beta" },
    { id: "hotspot-gamma", x: 1320, y: 560, radius: 180, revealId: "test-gamma" },
    {
      id: "hotspot-locked",
      x: 1580,
      y: 570,
      radius: 130,
      revealId: "test-locked",
      requiredRevealIds: ["test-alpha"],
    },
  ],
  storyboard: {
    learningGoal: "Validar mecânicas sem interferir no roteiro.",
    question: "As interações funcionam?",
    takeaway: "O alvo bloqueado depende da revelação Alpha.",
    presenterCue: "Esta room é só para desenvolvimento. Use T para retornar.",
    durationSeconds: 0,
    layout: {
      composition: "Quatro alvos grandes espalhados pelo laboratório.",
      focalPoint: "Alvos visíveis com locked/unlocked/revealed.",
      theme: "debug-test",
    },
    introduction: {
      kicker: "DEV / LABORATÓRIO",
      title: "Teste de interações",
      body: "Atire em Alpha e desbloqueie o alvo dependente. Use E para reveal por teclado ou T para voltar.",
    },
    objects: [],
    reveals: [
      {
        id: "test-alpha",
        hotspot: { x: 620, y: 520, radius: 150 },
        content: { kicker: "TESTE 01", title: "Input", body: "Alpha desbloqueia o último alvo." },
        presenterCue: "Confira o desbloqueio.",
      },
      {
        id: "test-beta",
        hotspot: { x: 980, y: 430, radius: 110 },
        content: { kicker: "TESTE 02", title: "Aim assist", body: "Seleção por proximidade." },
        presenterCue: "Teste tolerância.",
      },
      {
        id: "test-gamma",
        hotspot: { x: 1320, y: 560, radius: 180 },
        content: { kicker: "TESTE 03", title: "Hit", body: "Impacto gera reveal." },
        presenterCue: "Teste o fluxo.",
      },
      {
        id: "test-locked",
        hotspot: { x: 1580, y: 570, radius: 130 },
        requiredRevealIds: ["test-alpha"],
        content: { kicker: "TESTE 04", title: "Progressão", body: "Dependência atendida." },
        presenterCue: "Teste bloqueio.",
      },
    ],
    assets: [],
    audio: [],
    sources: [],
    transition: { prompt: "Pressione T para retornar.", mode: "presenter" },
    fallback: { revealKey: "E", nextKey: "N", previousKey: "P", resetKey: "R" },
    productionStatus: "storyboard",
  },
};

export function getRoomById(roomId: RoomId): RoomDefinition | undefined {
  if (roomId === developmentRoom.id) {
    return developmentRoom;
  }
  return roomRegistry.find((room) => room.id === roomId);
}

export function getRoomIndex(roomId: RoomId): number {
  return roomRegistry.findIndex((room) => room.id === roomId);
}
