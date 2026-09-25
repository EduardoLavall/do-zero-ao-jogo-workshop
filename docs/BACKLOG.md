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
- [ ] **P1** Remover camera follow e manter câmera fixa
- [ ] **P1** Room fixa 1280×720 / bounds por viewport
- [ ] **P1** Exit zone esquerda
- [ ] **P1** Exit zone direita
- [ ] **P1** Troca de room ao cruzar borda
- [ ] **P1** Reposicionar player na borda oposta
- [ ] **P1** Lock contra double-trigger
- [ ] **P1** Fade/transição simples entre rooms

## Fase 3 — Interaction Core

- [ ] **P0** HotspotSystem
- [x] **P0** mouse world coordinates
- [ ] **P0** aim assist
- [ ] **P1** Arrow entity
- [ ] **P1** shoot animation placeholder
- [ ] **P1** arrow hit
- [ ] **P1** reveal state
- [ ] **P1** locked/unlocked/revealed

## Fase 4 — UI

- [ ] **P1** menu Press Enter to Begin
- [ ] **P1** HUD de room
- [ ] **P1** objectives checklist
- [ ] **P1** overlay/panel controller
- [ ] **P1** progress
- [ ] **P1** fullscreen
- [ ] **P0** fallback next/previous/reset
- [ ] **P2** credits controller

## Vertical Slice

- [ ] **P1** Room Programação placeholder
- [ ] **P1** Game Loop reveal
- [ ] **P1** MonoBehaviour lifecycle reveal
- [ ] **P1** Components diagram
- [ ] **P1** Rigidbody2D reveal
- [ ] **P1** engine internals reveal
- [ ] **P2** code syntax styling
- [ ] **P2** unlock line animations

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
