# Backlog

Legenda:

- **P0** bloqueia o restante
- **P1** núcleo necessário
- **P2** importante para conteúdo
- **P3** polish

---

## Fase 0 — Fundação

- [x] **P0** Inicializar Vite + TypeScript + Phaser
- [x] **P0** TypeScript strict
- [x] **P0** Configurar ESLint e Prettier
- [x] **P0** Configurar Vitest
- [x] **P0** Scripts: dev, build, typecheck, lint, test
- [x] **P1** Estrutura inicial de diretórios
- [x] **P1** Placeholder Presentation Scene

## Fase 1 — Presentation Core

- [x] **P0** Definir tipos de Room/Hotspot/Objective
- [x] **P0** PresentationState
- [x] **P0** PresentationController
- [x] **P0** Room registry data-driven
- [x] **P1** next/previous/reset
- [x] **P1** eventos tipados
- [ ] **P1** dev room switcher

## Fase 2 — Game Shell

- [x] **P1** Player placeholder
- [x] **P1** InputController mouse-first
- [x] **P1** Converter pointer para world X
- [x] **P1** Mouse-follow horizontal com dead zone
- [x] **P1** Idle quando player X ≈ cursor X
- [x] **P1** Botão direito → jump
- [x] **P1** Botão esquerdo → shoot request
- [x] **P1** Botão do meio → toggle player control
- [x] **P1** Feedback visual do control ON/OFF
- [x] **P1** Remover camera follow e manter câmera fixa
- [x] **P1** Room lógica 1920×1080 / bounds por viewport
- [x] **P1** Scaling responsivo 16:9 com Phaser FIT
- [x] **P1** Safe area interna da room
- [x] **P1** Exit zone esquerda
- [x] **P1** Exit zone direita
- [x] **P1** Troca de room ao cruzar borda
- [x] **P1** Reposicionar player na borda oposta
- [x] **P1** Lock contra double-trigger
- [x] **P1** Fade/transição simples entre rooms

## Configuração / Tuning

- [x] **P1** Config central versionada de gameplay
- [x] **P1** Player/Input/Room lendo config central
- [x] **P1** Projectile speed reservado na config
- [ ] **P2** Painel F2 de tuning persistente
- [ ] **P2** Overrides via localStorage
- [ ] **P2** Reset defaults

## Fase 3 — Interaction Core

- [x] **P0** HotspotSystem
- [x] **P0** mouse world coordinates
- [x] **P0** aim assist
- [x] **P1** Arrow entity
- [x] **P1** shoot animation placeholder
- [x] **P1** arrow hit
- [x] **P1** reveal state
- [x] **P1** locked/unlocked/revealed

## Fase 4 — UI e legibilidade de palco (#8, #23)

- [ ] **P0** projeção 1280×720 / 1920×1080 / 1280×800 sem clipping
- [ ] **P0** safe area de conteúdo independente de exit zones/ornamento
- [ ] **P0** tipografia e código legíveis da última fileira
- [ ] **P0** conteúdo/hotspots coordenados com DOM overlays em resize
- [ ] **P0** presenter fallback revelar/avançar mesmo sem usar flecha
- [ ] **P1** atalhos e instruções sob demanda, não microtexto permanente
- [ ] **P1** fullscreen / foco / ESC / modo reduzido

## Fase 4 — UI

- [ ] **P1** menu Press Enter to Begin
- [ ] **P1** HUD de room
- [ ] **P1** objectives checklist
- [ ] **P1** overlay/panel controller
- [ ] **P1** progress
- [ ] **P1** fullscreen
- [ ] **P0** fallback next/previous/reset
- [ ] **P2** credits controller

## Storyboard e arquitetura de conteúdo (#27)

- [ ] **P0** roteiro por room com objetivo didático, fala, duração, revelações e fallback
- [ ] **P0** separar room renderer e conteúdo de `PresentationScene`
- [ ] **P0** progress/reveal persistidos por sala conforme política explicitada
- [ ] **P0** ensaio-alvo: 13:30 + 1:30 de contingência

## Vertical Slice (#9)

- [ ] **P1** Room Programação placeholder
- [ ] **P1** Game Loop reveal
- [ ] **P1** MonoBehaviour lifecycle reveal
- [ ] **P1** Components diagram
- [ ] **P1** Rigidbody2D reveal
- [ ] **P1** engine internals reveal
- [ ] **P2** code syntax styling
- [ ] **P2** unlock line animations

## Juiciness / Game Feel (#24)

- [ ] **P1** antecipação visual do tiro, recoil, trail, hit flash e sparks
- [ ] **P1** reveal com stagger curto e objetivo completo celebratório
- [ ] **P1** pulo/landing com poeira e squash/stretch
- [ ] **P1** UX do cursor: mira não pode impedir apresentação
- [ ] **P1** orçamento de efeitos / performance e reduce-motion
- [ ] **P1** não disparar/cumprir hit/reveal em transição bloqueada

## Sprites / Arte (#25)

- [ ] **P1** style bible pixel art retro-moderna e paleta por disciplina
- [ ] **P1** player idle/walk/jump/aim/shoot/land spritesheets
- [ ] **P1** targets / arrow / door / floor / props / fundos em layers
- [ ] **P1** atlas e pivôs / escala nearest-neighbor / piloto Room 6
- [ ] **P1** registro de autoria/licença/URLs de todos assets externos

## Áudio (#26)

- [ ] **P1** mapa de eventos para bow/arrow/hit/unlock/jump/UI/transition/quest
- [ ] **P1** AudioManager com preload, autoplay unlock, mute e mix por bus
- [ ] **P1** SFX próprios via jfxr ou pacotes com licença verificada
- [ ] **P1** música opt-in, volumes adequados para palestra
- [ ] **P1** fallback sem dispositivo de áudio e assets totalmente offline

## Conteúdo

- [ ] **P2** Room 1
- [ ] **P2** Room 2
- [ ] **P2** Room 3
- [ ] **P2** Room 4
- [ ] **P2** Room 5
- [ ] **P2** Room 6
- [ ] **P2** Room 7
- [ ] **P2** Room 8
- [ ] **P2** Room 9
- [ ] **P2** Room 10
- [ ] **P2** Final Room

## Entregas de rooms agrupadas

- [ ] **P1** #28: Rooms 1–4 com conteúdo e interação
- [ ] **P1** #9: Room 6 como referência completa (Programação / Engine)
- [ ] **P1** #29: Rooms 5, 7, 8 (Game Design, Arte, Áudio)
- [ ] **P1** #30: Rooms 9, 10, Final (Pulo, Protótipo, Q&A)

## Ensaio e release (#31)

- [ ] **P0** smoke em navegador, navegação N/P/R/F/ESC e skip de revelaçōes
- [ ] **P0** teste 720p / 1080p / 16:10 com screenshots
- [ ] **P0** projetor real e última fileira: texto/código legíveis
- [ ] **P0** offline (sem CDN, mídia remota, fonte remota) e backup local
- [ ] **P0** sem som / perda de foco / resize / spam de input
- [ ] **P0** ensaio 15min com buffer de 90s e recovery plan
- [ ] **P1** versionar lockfile, usar npm ci para builds reproduzíveis
- [ ] **P1** manifest/credits/licenças e checagem de FPS/memória

## Polish

- [ ] **P3** personagem final
- [ ] **P3** arrow art
- [ ] **P3** tiles/backgrounds
- [ ] **P3** parallax
- [ ] **P3** audio
- [ ] **P3** particles
- [ ] **P3** room transitions
- [ ] **P3** credits scroll
- [ ] **P3** Q&A screen
- [ ] **P3** presenter debug panel
