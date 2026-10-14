# AGENTS.md

## Missão

Este repositório contém uma apresentação interativa em formato de jogo 2D chamada **Do Zero ao Jogo**.

A prioridade é produzir uma experiência previsível para apresentação ao vivo. Confiabilidade e legibilidade são mais importantes que abstrações sofisticadas.

## Antes de alterar código

Leia, nesta ordem:

1. `docs/STACK.md`
2. `docs/ARCHITECTURE.md`
3. `docs/ROADMAP.md`
4. a issue atual
5. arquivos diretamente relacionados à mudança

Consulte `docs/PLANO-MESTRE.md` e `docs/STORYBOARDS.md` para conteúdo, comportamento e cues das rooms. Conteúdo autorado fica em `src/rooms/workshopRooms.ts`.

## Stack obrigatória

- TypeScript
- Phaser 3
- Vite
- HTML/CSS para overlays e conteúdo textual
- Vitest
- ESLint + Prettier

Não adicionar React, Vue, Angular ou outra engine sem uma decisão arquitetural documentada.

## Controles canônicos do player

O player é **mouse-first**:

- cursor à direita do player → mover para direita;
- cursor à esquerda → mover para esquerda;
- X aproximadamente igual → parar / idle;
- botão esquerdo → atirar flecha;
- botão direito → pular;
- botão do meio → toggle do controle do player ON/OFF.

A implementação deve usar coordenadas de mundo e uma pequena dead zone horizontal para evitar jitter.

Teclado não é a navegação principal do player. Ele existe como fallback de apresentação.

## Modelo espacial canônico

- cada Slide Room usa canvas lógico 1920×1080 em proporção 16:9;
- escalar responsivamente com `Phaser.Scale.FIT`;
- preservar coordenadas lógicas estáveis para player, hotspots e conteúdo;
- usar safe area interna para conteúdo essencial;
- a câmera permanece fixa dentro da room;
- não implementar sidescroller contínuo como arquitetura principal;
- cruzar a borda direita avança para a próxima room;
- cruzar a borda esquerda volta para a room anterior;
- após a troca, reposicionar o player na borda oposta;
- usar lock de transição para evitar double-trigger;
- fallback da apresentação nunca depende das exit zones.

## Regras de implementação

- TypeScript em modo strict.
- Preferir módulos pequenos e nomes explícitos.
- Evitar singletons globais quando um serviço simples ou estado explícito resolver.
- Separar **game world**, **presentation state** e **DOM UI**.
- Leitura de pointer deve ficar centralizada no `InputController`; evitar input espalhado por Player/Rooms.
- Conteúdo de rooms deve ser data-driven sempre que possível.
- Não hardcodar lógica específica de uma room dentro do player.
- Toda navegação deve possuir fallback por teclado.
- O personagem nunca pode bloquear a apresentação.
- Hotspots importantes devem possuir aim assist.
- O projeto deve funcionar com assets placeholder.
- Não introduzir backend.
- Não depender de internet em runtime.

## Hierarquia de prioridades

1. presentation controller
2. room state/navigation
3. input
4. player
5. hotspot/reveal system
6. arrow interaction
7. HUD
8. conteúdo real
9. arte
10. áudio/polish

## Qualidade de produção para palco

- Manter 1920×1080 lógico e FIT; validar a leitura também em 1280×720/1280×800 e projetor real.
- Exit zone e borda decorativa **não** definem safe area de conteúdo; deixar margem de leitura sem criar faixa grossa.
- Informações essenciais e código devem estar em DOM/CSS com corpo/títulos legíveis à distância; não usar Phaser.Text minúsculo como slide final.
- Cada room precisa de tese, interação principal, presenter cue, takeaway, tempo e avanço/reveal sem mouse.
- Juiciness deve comunicar causalidade sem esconder texto: breve antecipação, hit, flash/trail/sparks, SFX curto e reveal.
- Áudio/música e FX precisam ter mute/reduced-motion; sem internet ou áudio o workshop funciona integralmente.
- Todo asset externo precisa de fonte, licença/atribuição e cópia local; proibir rip não licenciado.
- Priorizar Room 6 piloto (#9) antes de produzir as outras 10 cenas.
- Consultar `docs/AUDITORIA-PRONTIDAO.md`, `docs/PROJECAO-QA.md` e `docs/ART-AUDIO-PRODUCTION.md` nas mudanças de conteúdo/visuais/áudio.

## Validação obrigatória

Antes de considerar uma tarefa concluída:

- `npm run typecheck`
- `npm run lint`
- `npm test`
- `npm run build`

Para alterações visuais/interativas, também executar o app e verificar o fluxo afetado.

## Documentação

Se uma mudança alterar arquitetura, convenções ou fluxo de execução, atualize os documentos correspondentes na mesma PR.

## Commits

Preferir Conventional Commits:

- `feat:`
- `fix:`
- `docs:`
- `test:`
- `refactor:`
- `chore:`

## Não fazer

- não reescrever o projeto inteiro para resolver uma issue pontual;
- não duplicar sistemas já existentes;
- não criar uma mini-engine própria em cima do Phaser;
- não acoplar conteúdo textual à física/renderização;
- não fazer uma room depender de ordem de cliques sem necessidade;
- não sacrificar fallback de apresentação em favor de game feel.
