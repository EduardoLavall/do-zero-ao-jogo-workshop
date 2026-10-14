import { developmentRoom, getRoomById, roomRegistry } from "../presentation/roomRegistry";
import type { PresentationCopy, RevealId, RoomId } from "../presentation/types";

export type { PresentationCopy } from "../presentation/types";

export function getRoomIntroduction(roomId: RoomId): PresentationCopy {
  return (
    getRoomById(roomId)?.storyboard.introduction ?? {
      kicker: "SLIDE ROOM",
      title: "Sala não encontrada",
      body: "Volte à apresentação com N/P.",
    }
  );
}

export function getRevealCopy(revealId: RevealId): PresentationCopy {
  for (const room of [...roomRegistry, developmentRoom]) {
    const match = room.storyboard.reveals.find((item) => item.id === revealId);
    if (match) {
      return match.content;
    }
  }

  return {
    kicker: "REVEAL INDISPONÍVEL",
    title: "Conteúdo ainda não registrado",
    body: "Este reveal não existe no roteiro; confira os dados da sala.",
  };
}

export function getRoomTakeaway(roomId: RoomId): PresentationCopy {
  const room = getRoomById(roomId);
  return {
    kicker: room ? "ROOM COMPLETE / APRENDIZADO" : "SLIDE ROOM",
    title: room?.storyboard.introduction.title ?? "Fim da sala",
    body: room?.storyboard.takeaway ?? "Avance com N.",
  };
}
