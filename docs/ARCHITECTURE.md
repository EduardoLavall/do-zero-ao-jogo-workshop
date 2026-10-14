# Arquitetura — Slide Rooms

## Objetivo

Manter a experiência simples o bastante para ser compreendida por uma IA e confiável o bastante para uma apresentação ao vivo.

---

# Camadas

## 1. Game World — Phaser

Responsável por:

- Player
- Arrow
- Hotspots espaciais
- Rooms
- Camera fixa por room
- Physics
- Tweens
- Particles
- Audio

## 2. Presentation Core — TypeScript puro

Responsável por:

- room atual;
- estado de revelações;
- objetivos completos;
- progressão;
- comandos de próxima/anterior/reset;
- regras de unlock.

Não deve depender diretamente de elementos DOM.

## 3. Presentation UI — DOM/CSS

Responsável por:

- HUD;
- títulos;
- conteúdo textual;
- código;
- overlays;
- créditos;
- menu inicial;
- Q&A.

---

# Fluxo principal

```text
Mouse / Presentation fallback
  ↓
InputController
  ↓
Player / PresentationController
  ↓
HotspotSystem
  ↓
PresentationState
  ↓
Reveal event
  ├── Phaser world reaction
  └── DOM content reaction
```

---

# InputController — contrato principal

O player é **mouse-driven**.

O `InputController` deve traduzir o mouse em intenções de gameplay explícitas:

```text
pointer.x
↓
targetWorldX
↓
moveLeft / moveRight / idle
```

Botões:

```text
Left Button   → shoot
Right Button  → jump
Middle Button → toggle player control
```

Não espalhar leitura direta de mouse por entidades e rooms. O player deve receber intenções/estado do `InputController`.

## Mouse follow no eixo X

Regra:

```text
targetX > playerX + deadZone
→ move right

targetX < playerX - deadZone
→ move left

abs(targetX - playerX) <= deadZone
→ stop / idle
```

Usar coordenadas de mundo da room atual. A câmera é fixa, mas o contrato continua em world coordinates para manter o input desacoplado de screen-space.

A `deadZone` evita jitter quando cursor e player ficam praticamente alinhados.

## Toggle de controle

O `InputController` mantém:

```ts
playerControlEnabled: boolean
```

Quando `false`:

- movimento por cursor fica desabilitado;
- jump e shoot do player também devem ser ignorados, salvo decisão explícita futura;
- fallback de apresentação continua funcionando;
- UI recebe evento/estado para exibir feedback de controle desativado.

---

# Estrutura alvo

```text
src/
├── main.ts
├── game/
│   ├── config.ts
│   ├── PresentationScene.ts
│   ├── entities/
│   │   ├── Player.ts
│   │   └── Arrow.ts
│   ├── systems/
│   │   ├── InputController.ts
│   │   ├── HotspotSystem.ts
│   │   └── RoomWorld.ts
│   └── types.ts
├── presentation/
│   ├── PresentationController.ts
│   ├── PresentationState.ts
│   ├── roomRegistry.ts
│   └── types.ts
├── ui/
│   ├── HudController.ts
│   ├── OverlayController.ts
│   └── CreditsController.ts
├── rooms/
│   ├── room-01.ts
│   ├── room-02.ts
│   └── ...
└── styles/
    ├── base.css
    ├── hud.css
    └── overlays.css
```

---

# Gameplay tuning

Parâmetros de game feel e navegação devem vir de uma fonte única versionada:

`src/config/gameplayConfig.ts`

Exemplos:
- player width/height;
- move speed;
- jump velocity;
- mouse dead zone;
- projectile speed;
- ground height;
- room entry offset;
- exit zone width;
- safe area margin;
- transition duration.

Evitar reintroduzir números mágicos equivalentes em Player, InputController, Arrow ou sistemas de room.

# Modelo de Slide Rooms

Cada room usa um **canvas lógico 16:9 de 1920×1080**, escalado responsivamente para caber no viewport.

Não existe sidescroller contínuo como modelo principal. A câmera permanece fixa enquanto o player se move dentro da room atual.

```text
ROOM A (1920×1080 lógico)
[player ......................... →]
                         cruza borda direita
                                  ↓
                             nextRoom()
                                  ↓
ROOM B (1920×1080 lógico)
[← player ........................]
```

Regras:
- câmera fixa;
- uma room por viewport;
- resolução lógica 1920×1080;
- scaling responsivo com `Phaser.Scale.FIT`;
- manter proporção 16:9;
- nunca reposicionar conteúdo principal com layout percentual solto;
- usar safe area interna para textos, hotspots e elementos essenciais;
- sair pela direita → próxima room;
- sair pela esquerda → room anterior;
- player reaparece pela borda oposta;
- transição visual simples pode usar fade;
- transição deve possuir lock para evitar double-trigger;
- primeira/última room respeitam os limites do registry.

# Navegação

Gameplay:
- movimento horizontal seguindo cursor;
- botão direito pula;
- botão esquerdo atira;
- botão do meio ativa/desativa controle;
- exit zones laterais controlam troca de room.

Fallback de apresentação:
- próxima/anterior room;
- reset;
- jump direto para room por debug/dev.

A progressão visual pode exigir objetivos, mas fallback de apresentação nunca deve ser bloqueado.

---

# Hotspots

Hotspot não é necessariamente um objeto físico.

Ele é um alvo interativo com:

- posição;
- área de seleção;
- reveal associado;
- estado locked/unlocked/revealed.

Aim assist resolve o hotspot **available** mais próximo do clique esquerdo dentro do raio/tolerância definido pelo próprio hotspot.

Regras de seleção:
- `available` → pode ser selecionado;
- `locked` → ignorado;
- `revealed` → ignorado para evitar interação repetida;
- se mais de um hotspot estiver dentro da tolerância, vence o de menor distância ao pointer;
- se nenhum alvo válido estiver no raio, o resultado é `null`.

Importante: o mesmo pointer controla o target X do personagem e a mira. Atirar não deve criar efeitos colaterais indesejados no movimento; o player continua usando o X do cursor como alvo de movimento.

---

# Projectile / Arrow flow

O projectile não conhece regras específicas de room.

Fluxo:

```text
Left click
  ↓
HotspotSystem.resolveHotspotTarget(...)
  ↓
Player faces target
  ↓
Arrow(start, target, gameplayConfig.projectile.speed)
  ↓
hit callback
  ↓
PresentationController.reveal(revealId)
  ↓
impact visual + refresh de hotspot state
```

Regras:
- a velocidade vem de `gameplayConfig.projectile.speed`;
- a Arrow recebe apenas coordenadas e callback de impacto;
- a Scene coordena seleção, spawn, hit e reveal;
- projectiles ativos são destruídos em reset, troca de room e shutdown;
- o mesmo reveal não recebe dois projectiles simultâneos;
- reveal já concluído deixa de ser target elegível via `HotspotSystem`.

# Conteúdo e render

Conteúdo longo permanece em DOM.

Exemplo:

```text
Arrow hits Rigidbody hotspot
        ↓
PresentationController.reveal("rigidbody")
        ↓
Phaser: glow + impact
DOM: abre painel Rigidbody2D
HUD: objective complete
```

---

# Estado

Ter uma única fonte de verdade para progressão da apresentação.

Não armazenar estado crítico apenas em:
- sprite visibility;
- classes CSS;
- variáveis soltas em rooms.

---

# Eventos

Preferir eventos explícitos pequenos:

- `room:entered`
- `room:completed`
- `hotspot:revealed`
- `objective:completed`
- `presentation:next`
- `presentation:reset`
- `player-control:changed`

Evitar event bus genérico usado para tudo sem tipagem.

---

# MVP técnico

O primeiro marco precisa funcionar apenas com retângulos:

- tela inicial;
- Enter;
- player placeholder;
- mouse-follow horizontal;
- idle ao alinhar com cursor;
- botão direito para pular;
- botão esquerdo para atirar;
- botão do meio para toggle de controle;
- câmera fixa;
- duas rooms fixas 16:9 com canvas lógico 1920×1080;
- exit zones esquerda/direita;
- transição entre rooms;
- hotspot;
- flecha;
- reveal;
- HUD;
- porta;
- próxima room;
- fallback;
- reset.

Nenhuma arte final é necessária para validar a arquitetura.

---

# Plano de evolução para apresentação completa (2026-10-14)

- **Game World (Phaser)**: mantém física, animação, sprite, flecha, hotspots e FX. Extrair componentes de `PresentationScene` quando novos painéis/rooms exigirem mais lógica.
- **Presentation Core (TS puro)**: resolver persistência de state por room (visitar e voltar não apaga reveal por acidente), objetivos, cue do apresentador e skip determinístico.
- **Presentation UI (DOM/CSS)**: menu, títulos, conteúdo técnico, código C#, diagramas, objetivos, progresso, overlays, créditos. Overlay deve acompanhar o canvas escalado em FIT/letterbox.
- **Input**: mouse-first mantido, mas não deve mover jogador sem controle sobre aiming/painéis; fallback N/P/R/F/ESC e avançar reveal sem gameplay é obrigatório.
- **Juice**: FeedbackSystem orientado a eventos (`shoot`, `hit`, `reveal`, `objective:completed`, `room:entered`) coordena animações/SFX/partículas; cooldown/budget/reduced motion; sem side effect no PresentationState.
- **Audio**: AudioManager com master/music/sfx/ambient, mute, autoplay unlock e fallback silencioso.
- **Assets**: carregados localmente com manifest de autoria/licença; 1 pack piloto aprovado na Room 6 antes de replicar outras salas.
- **Projeção**: manter 1920×1080/FIT; não confundir SAFE_AREA_MARGIN visual atual (29px) com área segura de conteúdo (alvo ~96px). Saída 720p exige corpo maior do que os 14–20px lógicos atuais.

Referências: [Auditoria](./AUDITORIA-PRONTIDAO.md) · [Projeção](./PROJECAO-QA.md) · [Arte e áudio](./ART-AUDIO-PRODUCTION.md) · [Roadmap](./ROADMAP.md).


## Implementação da interface de apresentação — #8 (2026-10-14)

- `src/ui/PresentationUI.ts`: menu Enter/Click, HUD por `PresentationState`, objetivos/progresso, conteúdo/ajuda, toast e desmontagem.
- `src/ui/presentationCopy.ts`: textos provisórios separados da cena (Room 01 e sala de testes); a #27 fornecerá o contrato real para as demais rooms.
- `src/ui/projection.ts`: deriva `left/top/scaleX/scaleY` dos bounds reais do canvas em relação a `#game-root`; `Phaser.Scale.FIT` permanece fonte de verdade. Tests cobrem 1080p, 720p e 16:10.
- `src/styles/presentation.css`: camada DOM 1920×1080 com `transform-origin: top left`, margem interna de 96px para conteúdo, fontes projetáveis, opção `prefers-reduced-motion`.
- Interação com o canvas: `pointer-events: none` sobre HUD/painéis; somente menu inicial recebe clique. Painel aberto congela input de gameplay, mas **não** bloqueia atalhos.
- Controller guarda `started` e preserva esse estado através de navegação e reset.
- Teclas: Enter inicia/fecha painel, N/P trocam room, R reinicia, E revela próximo alvo disponível sem flecha, H abre ajuda, ESC fecha painel, F alterna fullscreen.
- Na Room 02 de testes há um objetivo real de 4 reveals, concluído ao satisfazer as dependências. O atalho E chama `reveal` do core e cancela flechas pendentes antes de pular.
- Testes de alinhamento não substituem screenshot e leitura na última fileira: #23 **permanece aberta**.

**Cuidado:** UI projetável de teste não equivale a conteúdos das 11 salas. #27 e #9 são as próximas etapas.


## Authoring de salas data-driven — #27

- `src/presentation/types.ts`: `RoomStoryboard`, `StoryboardRoomDefinition`, `PanelContent`, `StageProp`, `HotspotDefinition`.
- `src/rooms/workshopRooms.ts`: 10 salas temáticas + Final (11 entradas); por sala: `learningGoal`, `thesis`, `takeaway`, `presenterCue`, `transitionCue`, `durationSeconds`, `introduction`, `visual`, `plannedAssets`, `hotspots`, `objectives`. Objeto tipado com `satisfies`.
- `src/presentation/roomRegistry.ts`: fonte de navegação dos 11 registros. Antiga sala de testes substituída pela Room 2 temática.
- `src/ui/presentationCopy.ts`: pega intro e conteúdo de hotspot diretamente no registry, sem switch/hardcode de IDs. A `PresentationUI` usa o mesmo modelo de progresso.
- `src/game/systems/RoomRenderer.ts`: geometria placeholder a partir de `visual.props`, `accentColor`, `backgroundColor`, posição de hotspot e estado. `PresentationScene` orquestra input, flechas e navegação.
- **Política de sessão:** `PresentationController` mantém um mapa de `roomId -> reveals/objetivos` ao navegar; `R` elimina só progresso da room atual, e `started` permanece true. Não salvar em localStorage nesta issue.
- O estado da UI e os objetivos dependem de `PresentationState`, não do sprite. O controller deriva automaticamente objetivos quando todos os `requiredRevealIds` são revelados.
- Conteúdo provisório pode ser apresentado agora por clique/flecha ou teclado `E`; textos técnicos e mídia finais continuam nas issues #9/#25/#26.
- O prefixo dos IDs dos hotspots/reveals é a room (ex. `room-06-game-loop`). Validação automatizada impede dependências cíclicas sem saída e orçamento fora de 13:30 + 1:30.
- Cuidados: duração é meta de roteiro, **não** cronômetro forçando transições; a fala-guia não deve ser exibida à plateia. Arquivos em `plannedAssets` são IDs **planejados**, sem fetch em runtime. [STORYBOARDS.md](./STORYBOARDS.md).


## #9 — Room 6 Engine Lab

`RoomRenderer` delega a temática de programação a `src/game/systems/EngineRoomVisuals.ts`. Isso mantém `PresentationScene` sem detalhamento de cenário. O renderer usa somente Phaser geometry para prototipar terminais, estado READY/LOCK/ONLINE e saída habilitada por `completedObjectives`.

`src/ui/EngineLessonDiagram.ts` contém um mapa de diagramas didáticos para os seis reveals e preenche o DOM somente por `textContent`; a UI usa CSS específico para texto/código em projetor e ativa a apresentação temática por `revealId`. As outras salas mantêm o visual simples e os painéis existentes.

`6` é atalho para teste do Engine Lab, sem alterar progresso de outras salas; `E` permite revelar sem flecha e, após completar, exibe o takeaway. Scene usa apenas core, Renderer, Input e UI. A dependência de pacote Unity no texto de exemplo não exige instalar Unity.

Ver `docs/ENGINE-LAB.md` (storyboard cronometrado e validações manuais pendentes).
