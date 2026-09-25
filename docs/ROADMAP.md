# Roadmap

## Estratégia

Construir **de dentro para fora**.

Primeiro garantir que Slide Rooms funciona como sistema de apresentação. Depois adicionar conteúdo e estética.

---

# Fase 0 — Fundação do repositório

Objetivo: qualquer humano ou IA consegue clonar, rodar, entender e validar.

Entregas:

- Vite + TypeScript + Phaser;
- lint;
- format;
- typecheck;
- testes;
- estrutura inicial;
- README;
- AGENTS;
- documentação técnica.

**Definition of Done:** `npm install && npm run dev` abre uma tela mínima Phaser sem erros.

---

# Fase 1 — Presentation Core

Objetivo: navegar por rooms sem depender do personagem.

Entregas:

- tipos Room/Hotspot/Objective;
- room registry;
- PresentationState;
- PresentationController;
- next / previous / reset;
- eventos tipados;
- debug room switcher.

**DoD:** duas rooms placeholder navegáveis só por comandos de apresentação.

---

# Fase 2 — Game Shell

Objetivo: transformar a apresentação em Slide Rooms fixas e navegáveis.

Entregas:

- player placeholder;
- movimento horizontal mouse-first;
- viewport fixa 1280×720;
- câmera fixa;
- limites de room;
- exit zones esquerda/direita;
- transição entre rooms;
- reposicionamento do player na borda oposta.

**DoD:** player atravessa lateralmente entre duas rooms fixas sem arte final.

---

# Fase 3 — Interaction Core

Objetivo: flecha revela conteúdos.

Entregas:

- mouse aim;
- arrow;
- hotspot registry;
- aim assist;
- hit detection;
- reveal event;
- locked/revealed state.

**DoD:** clicar num hotspot faz a flecha acertá-lo e revelar conteúdo de forma determinística.

---

# Fase 4 — UI de apresentação

Objetivo: apresentação utilizável mesmo antes do polish.

Entregas:

- HUD;
- objetivos;
- room title;
- painéis DOM;
- menu inicial;
- fullscreen;
- fallback keyboard;
- progress indicator.

**DoD:** fluxo completo pode ser apresentado com placeholders.

---

# Fase 5 — Vertical Slice

Objetivo: uma Slide Room completa prova a linguagem final.

Escolha inicial: **Room 6 — Programação/Engine**.

Entregas:

- cenário provisório;
- skill/reveal chain;
- painel de código;
- Rigidbody2D;
- game loop;
- player loop;
- efeitos básicos;
- transição de saída.

**DoD:** uma room parece uma versão reduzida do workshop final.

---

# Fase 6 — Conteúdo das rooms

Implementar:

1. Room 1 — O que é um jogo?
2. Room 2 — História condensada
3. Room 3 — Evolução tecnológica
4. Room 4 — Hub
5. Room 5 — Game Design
6. Room 6 — Programação/Engine
7. Room 7 — Arte
8. Room 8 — Áudio
9. Room 9 — Pulo
10. Room 10 — Protótipo ao jogo
11. Final / créditos

Cada room precisa funcionar primeiro com assets provisórios.

---

# Fase 7 — Arte e áudio

- personagem final;
- animações;
- tiles/backgrounds;
- icons;
- SFX;
- música leve;
- particles;
- room-specific visual language.

---

# Fase 8 — Polish de apresentação

- transições;
- timing;
- preload;
- accessibility;
- projector safe area;
- performance;
- keyboard cheat sheet;
- presenter mode/debug;
- graceful fallback.

---

# Fase 9 — Ensaio e hardening

- ensaio cronometrado;
- testar offline;
- testar 1920×1080;
- testar notebook/projetor;
- testar perda de foco;
- testar spam de input;
- garantir reset;
- build final;
- backup local.
