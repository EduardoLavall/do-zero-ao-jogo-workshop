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

Fundação Vite + TypeScript + Phaser criada. O projeto está preparando o núcleo de apresentação antes das Slide Rooms finais.


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
