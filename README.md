# Do Zero ao Jogo

> **Status do workshop (2026-10-14):** Temos 11 storyboards e uma Room 6 com seis terminais, diagramas Unity/C# e revelações. As mecânicas de aprendizado **ainda não estão prontas**: quase todas as interações atuais apenas abrem texto. A próxima etapa é [Interactive Learning](./docs/INTERACTIVE-LEARNING.md), issues #37–#41, **antes de juice/arte/áudio**. — Workshop

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
8. [docs/STORYBOARDS.md](./docs/STORYBOARDS.md)
9. [docs/AUDITORIA-PRONTIDAO.md](./docs/AUDITORIA-PRONTIDAO.md)
10. [docs/PROJECAO-QA.md](./docs/PROJECAO-QA.md)
11. [docs/ART-AUDIO-PRODUCTION.md](./docs/ART-AUDIO-PRODUCTION.md)

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

**Estado após #27 (2026-10-14):** o registry contém **11 salas temáticas com 36 hotspots e painéis didáticos provisórios**. Todos os conteúdos e posições ficam em `src/rooms/workshopRooms.ts` e são narrados em [docs/STORYBOARDS.md](./docs/STORYBOARDS.md). Há meta de 13m30s de apresentação + 1m30s de contingência. O jogo mantém reveals ao voltar à sala; **R** reinicia apenas a sala atual. **#9** transformará a Room 6 em vertical slice visual de referência; **#23** continua exigindo validação física em projetor.

### Controles na apresentação

| Tecla / mouse | Ação |
|---|---|
| Enter | Começar / fechar painel |
| N / P | Próxima / sala anterior |
| R | Resetar sala e conteúdo |
| E | Revelar o próximo hotspot disponível sem atirar |
| H | Ajuda |
| ESC | Fechar painel |
| F | Tela cheia |
| Botão esquerdo | Atirar (se gameplay não estiver pausado) |
| Botão direito | Pular |
| Botão do meio | Ativar/desativar controle do personagem |

A antiga Room 02 de laboratório foi substituída por uma sala temática provisória de história dos jogos. Todas as onze salas são navegáveis; os detalhes visuais finais virão nas issues de produção. Painéis congelam o movimento do personagem enquanto abertos. A interface usa uma camada 1920×1080 que segue os bounds do canvas Phaser (FIT/letterbox).

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

## Room 6 — Engine Lab (vertical slice #9)

Pressione Enter, feche o painel inicial e use **6** para abrir diretamente a Room 6. Ela contém seis terminais de programação com diagramas didáticos de Unity/C#, código em painéis HTML, dependências de reveal, feedback visual e objetivo ROOM COMPLETE. **Unity não está instalado nem é usado como runtime**: o jogo continua em Phaser/TypeScript.

Use E para revelar sem flecha, N/P para navegar, R para resetar e ESC para fechar painéis. Quando todos os seis terminais estiverem revelados, E mostra a síntese da sala. Consulte [docs/ENGINE-LAB.md](./docs/ENGINE-LAB.md).

Arte final, SFX e teste físico de projetor ainda dependem de #24/#25/#26/#23.


## Próxima fase: Interactive Learning

Uma sala só é "jogável" se **uma escolha ou variável alterar o estado simulado e provocar resultado diferente**. As 11 mecânicas previstas e as regras de fallback estão em [INTERACTIVE-LEARNING.md](./docs/INTERACTIVE-LEARNING.md).

Ordem: **#38 (infra de demos)** → **#39/#40 (Room 6 com Game Loop + física manipuláveis)** → **#28/#29/#30 (mecânicas de todas as salas)** → **#24/#25/#26 (juice, sprites e SFX)** → **#41/#23/#31 (QA e palco)**. Nesta etapa estamos atualizando planejamento e issues; **não implementando simulações ainda**.
