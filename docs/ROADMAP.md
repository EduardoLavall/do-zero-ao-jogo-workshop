# Roadmap de produção — Do Zero ao Jogo

> Atualizado após auditoria da `main` em 2026-10-14. **Meta de entrega:** workshop 15 minutos com 13:30 de conteúdo + 1:30 de contingência. **Critério:** apresentações podem ocorrer inteiramente pelo teclado mesmo se gameplay, áudio ou FX falharem.

## Ponto de partida (já existente)

- [x] #1–#4: stack, validações, tipos e PresentationController.
- [x] #5/#17: player mouse-first e rooms fixas 1920×1080 16:9, `Phaser.Scale.FIT`, câmera fixa, navegação lateral.
- [x] #6: HotspotSystem e aim assist.
- [x] #7: Arrow placeholder, impacto/reveal básico.
- [x] #13: GitHub Pages; deploy Vercel utilizado em paralelo.
- [x] #20 Fase 1: gameplayConfig.ts para game feel.
- [ ] #20 Fase 2: F2/localStorage/reset defaults.
- [x] #8: UI de apresentação inicial com menu, HUD, painel DOM, atalhos e fallback de reveal (pendente smoke visual em projetor).
- [ ] #23: validação em projetor real e screenshots das três resoluções; geometria e tipografia inicial implementadas.
- [x] #27: 11 storyboards executáveis com metas de tempo, painel, hotspots, props e presenter cue.
- [x] #9: Room 6 vertical slice funcional de Phaser + Core + DOM, seis terminais, diagramas, código Unity/C# e completion (arte/SFX/projetor ainda pendentes nas #24/#25/#26/#23).

**Não confundir infraestrutura implementada com slides concluídos:** registry agora contém 11 rooms autoradas como placeholders com painéis, hotspots e falas-guia; arte, efeitos e polimento de conteúdo ainda estão pendentes.

## Sequência de produção (gates; fases numeradas daqui para frente)

| Ordem | Gate | Issue(s) | Saída / definição de pronto | Prioridade |
|---|---|---|---|---|
| 1 | **Projeção + UX de apresentação** | #23, #8 | tipografia legível em 720p/1080p, conteúdo DOM, menu Enter, HUD/overlay, fullscreen F, N/P/R, modo sem mouse | P0 |
| 2 | **Roteiro e estrutura data-driven** | #27 | 11 storyboards, data schema, presenter cues, reveal persistence decidida, orçamento 13:30+1:30 | P0 |
| 3 | **Base didática de Room 6** | #9 | seis terminais, diagramas e código Unity/C# como referência; **entregue como conteúdo, não como simulação** | S1 entregue |
| 4 | **Interactive Core (novo)** | #37, #38 | contrato de demos, estado, inputs/controles, reset, lifecycle e fallback seguros | **P0, AGORA** |
| 5 | **Room 6 realmente interativa** | #39, #40 (+ #9) | Game Loop com play/pause/step/FPS, componentes ligáveis e laboratório de impulso/colisão | **P0** |
| 6 | **Produção jogável — onda A** | #28 | Rooms 1–4: regras, Pong mínimo, modelo de hardware e quatro pilares ligados/desligados | P0 |
| 7 | **Produção jogável — onda B** | #29 | Rooms 5, 7 e 8: balanceamento/core loop, spritesheet em movimento e áudio A/B | P0 |
| 8 | **Produção jogável — onda C** | #30 | Rooms 9, 10 e Final: pulo parametrizado, camadas do protótipo e Q&A interativo | P0 |
| 9 | **Juicy baseline** | #24 | antecipação, impacto, partículas, trail e reveal para **interações já funcionais** | P1 |
| 10 | **Sprite kit piloto** | #25 | personagem, terminais, props e UI da Room 6, com asset manifest e origem/licença | P1 |
| 11 | **SFX e ambiente** | #26 | áudio A/B funcional da Room 8, SFX, mix e fallback mudo | P1 |
| 12 | **Validação pedagógica e release** | #41, #23, #20 Fase 2, #31 | 11/11 demos, tests, projetor, offline, ensaio <=15 min e F2 | **P0 release** |

### Dependências

- **S0/S1 não significam slide jogável:** #27 definiu conteúdo, #9 desenhou terminais e diagramas, mas ainda faltam modelos manipuláveis.
- **#38 → #39 → #40** é a trilha crítica. A Room 6 é o primeiro *gold standard interativo* quando os simuladores exibirem consequências variáveis (IL2).
- **#28/#29/#30** usam o mesmo contrato para as outras salas. Uma mecânica relevante por room, não seis minijogos obrigatórios.
- **#24/#25/#26** polirão as demos aprovadas; a Room 8 precisará do áudio #26 para teste A/B sonoro real.
- **#41/#23/#31** verificam o todo durante a produção; incluir projeção e ensaios frequentes, não só na véspera.

## Roteiro de 15 minutos

| Segmento | Alvo |
|---|---:|
| Menu | 0:20 |
| Room 1 | 0:50 |
| Room 2 | 1:00 |
| Room 3 | 0:45 |
| Room 4 | 0:40 |
| Room 5 | 1:45 |
| Room 6 | 2:45 |
| Room 7 | 0:50 |
| Room 8 | 0:50 |
| Room 9 | 2:15 |
| Room 10 | 1:05 |
| Final | 0:25 |
| **Conteúdo** | **13:30** |
| **Contingência** | **1:30** |
| **Tempo máximo** | **15:00** |

Regra de corte: manter a explicação técnica (Game Loop / pulo) e diminuir história/efeitos se o ensaio passar de 15 minutos. Não inserir mini-jogos, física obrigatória, menus complexos ou quizzes que possam travar a fala.

## Critério de qualidade: uma sala só conta como "jogável" se

1. O apresentador puder **mudar** ao menos uma escolha/variável ou acionar simulação real;
2. o **estado e o resultado** reagirem de maneira diferente entre duas configurações comparáveis;
3. houver **takeaway didático** conectando input e consequência;
4. a experiência for **resetável e pulável** sem mouse/áudio, em poucos segundos;
5. o código for testado e o modelo não depender de Unity instalado;
6. o roteiro continuar dentro de **13:30 de conteúdo + 1:30 de contingência**.

Mapa por sala: [Interactive Learning](./INTERACTIVE-LEARNING.md). Épico **#37**, QA **#41**.

## Quality gates obrigatórios

**G0 — protótipo técnico** (atingido, com testes manuais limitados): duas salas, player, hotspots, flechas e estado.

**G1 — apresentação funcional**: menu, conteúdos DOM, N/P/R/F/ESC, objetivos, progressão acessível sem controle mouse, 720p/1080p.

**G2A — vertical slice INTERATIVA (novo bloqueio)**: Room 6 com simulações manipuláveis, passo único de frame, física, componentes, comparação A/B e fallback, antes de sprites/SFX.

**G2B — vertical slice juicy**: demo da Room 6 com sprites, SFX, impacto, reveal, narrativa e opção mute/reduced-motion.

**G3 — conteúdo JOGÁVEL completo**: 11 cenas, cada uma com tese, **mecânica realmente executável com mudança de estado e resultado**, fallback, speaker cue e tempo cronometrado.

**G4 — release show-ready**: CI + build offline, projector last-row pass, consumo de memória/frames aceitável, stress/perda de foco, backup local e ensaio <=15 min.

## Notas de arquitetura

- Phaser para mundo/efeitos; DOM/CSS para texto, código, HUD e overlays. NÃO fixar texto de 14px Phaser como informação essencial.
- Distinção clara: exit zone invisível de ~22px, margem decorativa de ~29px no placeholder atual e **safe area real de conteúdo ~96px**, a validar. Nenhuma faixa gigante é necessária.
- Sprite/pixel grid coerente e assets locais; audio opt-in/baixo para não abafar fala.
- Regras de reveal devem sobreviver ao voltar à room se isso servir à apresentação; reset manual deve permanecer disponível.
- Não exigir ordem perfeita de cliques nem precisão do ponteiro. Uso ao vivo > fidelidade de gameplay.
- Documentos detalhados: [Auditoria](./AUDITORIA-PRONTIDAO.md), [Projeção](./PROJECAO-QA.md), [Assets e som](./ART-AUDIO-PRODUCTION.md), [Plano mestre](./PLANO-MESTRE.md), [Backlog](./BACKLOG.md).

## Próxima issue executável

**#38 — contrato de demo por sala**, depois **#39 e #40** (Room 6 executável) com #23 (projeção). **Não partir para #24 como próximo passo** só porque #9 implementou diagramas.

## Atualização de implementação — #8 / #23 (2026-10-14)

A base UI foi implementada no PR da issue #8: camada DOM proporcional ao canvas, menu, HUD, painéis, teclado e reveal manual; uma sala de teste já atualiza objetivos/progresso. A #23 **não** está pronta: é obrigatório conferir screenshots 1280×720, 1920×1080, 1280×800 e testar a leitura física em projetor. O próximo gate após o smoke test é #27 → #9 (Room 6), não a produção em massa de sprites.

## Atualização de storyboards — #27 (2026-10-14)

Os 11 storyboards estão centralizados em `src/rooms/workshopRooms.ts`, conectados a `roomRegistry`, `PresentationUI` e `RoomRenderer`. Contém roteiro, composições provisórias, narrativa, conteúdo de reveals, assets planejados e objetivos. O `PresentationController` guarda progresso por sala durante a sessão e o reset R atua somente na sala atual. O menu (20s) + salas (790s) = 13:30, com 90s reservados para contingência. Veja [STORYBOARDS.md](./STORYBOARDS.md).

**Gate atual:** validar a versão em browser e trabalhar #9 na Room 6; ainda faltam assets/audio reais, verificação de fontes, revisão didática e ensaio físico.

## Entrega da Room 6 (#9) — 2026-10-14

- Seis terminais ENGINE LAB, game loop/lifecycle/fixed update/componentes/input/física, painéis de código+diagrama e porta de progresso.
- Alternância entre flecha e fallback E; tecla 6 para quick jump; P/N para troca, R para reset; tempo de palco planejado em 2min45s.
- Diagrama e código em DOM, placeholders Phaser sem download; impressão de Unity/C# **somente didática**.
- Detalhes, roteiro e QA em [ENGINE-LAB.md](./ENGINE-LAB.md). O gate de *assets finais*, *SFX*, *efeitos juicy* e *projetor real* permanece aberto; não confundir vertical slice funcional com release G2 totalmente polido.

## Correção estratégica — 2026-10-14: Interactive Learning (#37)

O produto estava sendo tratado como pronto para polish embora quase todas as rooms seguissem `hotspot → texto`. A auditoria mostrou que **interação mecânica ≠ interação didática**. Mantemos os 11 storyboards e a Room 6 como conteúdo/base, mas a transição para arte e juice fica condicionada ao **IL2** (Room 6 manipulável) e a expansão ao **IL3** (11 rooms com ao menos uma experiência própria).

- **Agora:** #38 — estrutura modular de demonstrações. Sem frameworks extras e sem duplicar `PresentationController`.
- **Depois:** #39 (frames/FixedUpdate) e #40 (Componentes/Input/Rigidbody2D).
- **Em seguida:** #28/#29/#30, aproveitando stories/tempos atuais.
- **Então:** #24/#25/#26; áudio da Room 8 exige #26 para A/B real.
- **Validação:** #41 com QA por sala, depois #23/#31.

O plano completo de ações, variáveis e resultados das **11 salas** está em [docs/INTERACTIVE-LEARNING.md](./INTERACTIVE-LEARNING.md). Issues [#37](https://github.com/EduardoLavall/do-zero-ao-jogo-workshop/issues/37)–[#41](https://github.com/EduardoLavall/do-zero-ao-jogo-workshop/issues/41).

**Estado:** documentação e tarefas criadas; **as novas simulações não estão implementadas nesta PR**.
