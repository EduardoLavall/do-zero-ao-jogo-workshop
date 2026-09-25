# Do Zero ao Jogo — Workshop

Apresentação interativa sobre desenvolvimento de jogos.

Em vez de slides tradicionais, o workshop usa **Slide Rooms**: uma experiência 2D sidescroller em HTML na qual o apresentador controla um personagem, percorre salas temáticas e atira flechas em hotspots para revelar conteúdo.

## Objetivo

Explicar, em aproximadamente 15 minutos, como jogos são pensados e construídos:

- Game Design
- Programação
- Arte
- Áudio
- Game engines
- Integração entre sistemas

## Stack definida

- **TypeScript**
- **Phaser 3**
- **Vite**
- **HTML/CSS** para conteúdo textual, overlays e HUD
- **Vitest** para lógica isolada
- **ESLint + Prettier**

Sem React.

Leia antes de implementar:

1. [AGENTS.md](./AGENTS.md)
2. [docs/STACK.md](./docs/STACK.md)
3. [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
4. [docs/ROADMAP.md](./docs/ROADMAP.md)
5. [docs/BACKLOG.md](./docs/BACKLOG.md)
6. [docs/PLANO-MESTRE.md](./docs/PLANO-MESTRE.md)
7. [docs/FONTES.md](./docs/FONTES.md)

## Princípio do projeto

> Primeiro uma base estável de apresentação/jogo. Depois conteúdo, arte e polish.

O MVP precisa funcionar mesmo com placeholders geométricos.

## Estado atual

Fase de arquitetura e planejamento. As primeiras issues implementam o núcleo técnico antes das Slide Rooms finais.
