# Contrato de conteúdo e pipeline de produção das Slide Rooms

## Fonte de verdade

- `src/presentation/types.ts`: interfaces obrigatórias.
- `src/presentation/roomStoryboards.ts`: 11 storyboards tipados, conteúdo, falas, duração, geometria provisória, referências.
- `src/presentation/roomRegistry.ts`: lista de apresentações derivada de `roomStoryboards.ts`; `developmentRoom` isolada.
- `src/presentation/PresentationController.ts`: navegação, progress por room, reset e objetivos (nenhuma dependência de Phaser/DOM).
- `src/game/systems/RoomWorldRenderer.ts`: **placeholders geométricos**, objetos e hotspots como dados da room.
- `src/game/PresentationScene.ts`: player, flechas, transição e coordenação. Não adicionar `if (room.id === ...)` para desenhar conteúdo.
- `src/ui/presentationCopy.ts`: leitura de introduções, reveals e takeaway diretamente do registry; não duplicar textos das rooms.
- `src/ui/PresentationUI.ts`: painel DOM em fonte legível, HUD e elementos do modo apresentador.
- `docs/STORYBOARDS.md`: revisão humana de conteúdo, falas e posição (consulte o TS ao implementar).

## Modelo

Cada blueprint descreve `{id,title,storyboard}`, onde `storyboard` contém:

```ts
{
  learningGoal,
  question,
  takeaway,
  presenterCue,
  durationSeconds,
  layout: { composition, focalPoint, theme },
  introduction: { kicker, title, body },
  objects: [{ id, kind, x, y, width, height, label? }],
  reveals: [{
    id,
    hotspot: { x, y, radius },
    requiredRevealIds?,
    content: { kicker, title, body, code?, diagram? },
    presenterCue,
    assetId?,
    sfxId?,
  }],
  assets: ["..."],
  audio: ["..."],
  sources: ["..."],
  transition: { prompt, mode: "walk" | "presenter" | "final" },
  fallback: { revealKey: "E", nextKey: "N", previousKey: "P", resetKey: "R" },
  productionStatus: "storyboard" | "vertical-slice" | "final",
}
```

O código converte cada reveal em um hotspot e agrupa os reveals como objetivo da sala. **Não duplicar o mesmo ID de reveal entre rooms.** As coordenadas são **lógicas 1920×1080**, não pixels físicos.

### Política de estado — decisão de #27

- `enterRoom`, `nextRoom` e `previousRoom` restauram `revealed` e `completedObjectives` daquela sala, se já visitada.
- `resetRoom` limpa **só a sala atual**, mantendo `started` e o progresso nas outras.
- `PresentationController.reveal(id)` valida existência e dependências; repeated/locked/unknown retorna false.
- `completeObjective` verifica requisitos, e o controlador marca o objetivo automaticamente ao revelar o último requisito.
- Sem `localStorage` nesta etapa; atualização de página inicia uma nova sessão, decisão coerente com modo palestra. Config persistente de tuning permanece #20.
- No final, o presenter continua livre para navegar via N/P ou retornar em T; não existe bloqueio rígido por objetivo.

## Execução e roteirização

- Cada palco deve ter pergunta → ação → conceito → takeaway. `presenterCue` orienta a fala; não exibir texto de fala para a plateia.
- Introdução: `getRoomIntroduction(roomId)`; revelação: `getRevealCopy(revealId)`; recap: `getRoomTakeaway(roomId)`.
- **E** revela o primeiro hotspot `available`, sem física/flecha. Se não houver reveals restantes, E mostra o takeaway.
- **N/P** funcionam sem interação; **R** reinicia somente room atual; **T** alterna laboratório técnico sem entrar no roteiro; **H** ajuda; **ESC** fecha painel; **F** fullscreen.
- Arte/áudio referenciados nos arrays são **IDs planejados**, não arquivos prontos. Não tentar carregar até #25/#26 integrarem um manifest/loader com fallback.
- `RoomWorldRenderer` mostra placeholders, não salas com direção de arte final. Só marcar `productionStatus="final"` com aprovação de conteúdo, som, projeção e smoke.
- Na #9, substituir placeholders da Room 6 por estrutura visual rica **sem alterar o contrato de conteúdo** e usar o template nas #28–#30.

## Tempo

| Parte | Duração |
|---|---:|
| Menu | 00:20 |
| Rooms 1–10 e Final | 13:10 |
| **Tempo de fala/conteúdo** | **13:30** |
| Contingência | 01:30 |
| **Total** | **15:00** |

Testes de unit garantem esse total e que cada room tem intro, reveals, cues e ativos planejados. Ensaios presenciais continuam obrigatórios antes do release #31.

## Como adicionar ou modificar uma room

1. Ajuste o blueprint correspondente em `roomStoryboards.ts`, mantendo a ID estável.
2. Escreva uma ideia curta por reveal, uma fala orientadora e o takeaway; o painel deve ficar legível em projetor.
3. Acrescente `assetId/sfxId` no inventário planejado, mas não inclua recurso externo sem licença.
4. Garanta hotspots dentro da safe area, alvos acessíveis e objetivos deriváveis.
5. Rode `npm run typecheck`, `npm run lint`, `npm test` e `npm run build`.
6. Confira a storyboarding review, screenshots 720p/1080p/16:10 e teste `E/N/P/R/T` no navegador.

## Critérios de qualidade para conteúdo técnico

- Input.GetKeyDown é API legacy da Unity: rotular corretamente, não confundir com o novo Input System.
- `Update` ocorre a cada frame do comportamento habilitado, sem timestep fixo; `FixedUpdate` é usado com intervalo de física.
- Um frame renderizado pode incluir zero, um ou vários FixedUpdates.
- `Rigidbody2D` é o componente de simulação física; `Collider2D` define a forma de colisão.
- `while (running) { input(); update(); render(); }` é modelo **conceitual**, não o código literal do PlayerLoop Unity.
- Fonte primária de game loop: https://gameprogrammingpatterns.com/game-loop.html ; APIs Unity: https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.html e https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rigidbody2D.html.
