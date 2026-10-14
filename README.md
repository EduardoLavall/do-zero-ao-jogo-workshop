# Do Zero ao Jogo — Workshop

Apresentação interativa sobre desenvolvimento de jogos.

Em vez de slides tradicionais, o workshop usa **Slide Rooms**: uma experiência 2D de salas fixas 16:9 em HTML na qual o apresentador controla um personagem, percorre salas temáticas e atira flechas em hotspots para revelar conteúdo.

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
8. [docs/AUDITORIA-PRONTIDAO.md](./docs/AUDITORIA-PRONTIDAO.md)
9. [docs/PROJECAO-QA.md](./docs/PROJECAO-QA.md)
10. [docs/ART-AUDIO-PRODUCTION.md](./docs/ART-AUDIO-PRODUCTION.md)

## Princípio do projeto

> Primeiro uma base estável de apresentação/jogo. Depois conteúdo, arte e polish.

O MVP precisa funcionar mesmo com placeholders geométricos.

## Desenvolvimento

Instale as dependências:

```bash
npm install
```

Inicie o servidor local:

```bash
npm run dev
```

## Validação

Antes de considerar uma mudança concluída:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Comandos adicionais:

```bash
npm run lint:fix
npm run format
npm run format:check
npm run test:watch
```

## Estado atual

**Estado de protótipo técnico (2026-10-14)**: shell Phaser/Vite, player mouse-first, 2 rooms placeholder (01 vazia + 02 de testes), HotspotSystem e Arrow→reveal. **As 10 salas de conteúdo e o encerramento ainda não estão implementados**. UI DOM, sprites, áudio, assets e teste em projetor ainda faltam.

**Próxima prioridade:** #23 + #8 (projeção/UI apresentável), #27 (storyboards), #9 (Room 6 vertical slice), então #24/#25/#26 (juice/arte/SFX) e #28/#29/#30 (conteúdo). #20 Fase 2 é painel F2. #31 é hardening final.

Produção e critérios: [Auditoria de prontidão](./docs/AUDITORIA-PRONTIDAO.md), [Guia de projeção](./docs/PROJECAO-QA.md) e [Plano de arte/áudio](./docs/ART-AUDIO-PRODUCTION.md).


## GitHub Pages

O projeto é publicado automaticamente no GitHub Pages quando houver push/merge na `main`.

URL esperada:

`https://eduardolavall.github.io/do-zero-ao-jogo-workshop/`

Pipeline:

```text
push/merge em main
↓
typecheck
↓
lint
↓
test
↓
build
↓
upload de dist/
↓
GitHub Pages
```

### Configuração inicial do repositório

No GitHub:

`Settings → Pages → Build and deployment → Source → GitHub Actions`

Observação: enquanto o repositório não possuir `package-lock.json`, o workflow usa `npm install`. Quando o lockfile for versionado, deve-se preferir `npm ci`.
