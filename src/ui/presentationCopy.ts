import { getRoomById, roomRegistry } from "../presentation/roomRegistry";
import type { PanelContent, RevealId, RoomId } from "../presentation/types";

export type PresentationCopy = PanelContent;

export function getRoomIntroduction(roomId: RoomId): PresentationCopy {
  return (
    getRoomById(roomId)?.storyboard.introduction ?? {
      kicker: "SLIDE ROOM",
      title: "Conteúdo em preparação",
      body: "Use N / P para navegar e E para revelar a próxima ideia.",
    }
  );
}

export function getRevealCopy(revealId: RevealId): PresentationCopy {
  for (const room of roomRegistry) {
    const hotspot = room.hotspots.find((item) => item.revealId === revealId);

    if (hotspot?.content) {
      return hotspot.content;
    }
  }

  return {
    kicker: "REVEAL",
    title: "Conteúdo indisponível",
    body: "Este alvo não possui um painel didático associado.",
  };
}

export function getRoomTakeaway(roomId: RoomId): PresentationCopy {
  const room = getRoomById(roomId);
  return {
    kicker: "ROOM COMPLETE / APRENDIZADO",
    title: room?.storyboard.thesis ?? "Sala concluída",
    body: room?.storyboard.takeaway ?? "Avance com N.",
  };
}
