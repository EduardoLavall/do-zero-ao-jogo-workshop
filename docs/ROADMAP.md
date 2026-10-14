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
| 3 | **Vertical slice didática** | #9 | Room 6 com Game Loop, Unity/MonoBehaviour, Rigidbody2D, código+diagrama+efeito; apresentação completa com placeholders | P0 |
| 4 | **Juicy baseline** | #24 | hover, pose/tiro, trail, hit, particles, reveal, objective complete, transições com reduced-motion | P1 |
| 5 | **Sprite kit piloto** | #25 | style bible, spritesheet player, props/hotspots/UI e fundo modular da Room 6, assets locais e manifest | P1 |
| 6 | **SFX e ambiente de palco** | #26 | eventos mapeados a SFX próprios/CC0, audio buses, autoplay unlock, mute, mix sob voz e licença documentada | P1 |
| 7 | **Produção de conteúdo — onda A** | #28 | Rooms 1–4 (conceito, história, tecnologia, hub) | P1 |
| 8 | **Produção de conteúdo — onda B** | #29 | Rooms 5, 7, 8 (design, arte, áudio); Room 6 é #9 | P1 |
| 9 | **Produção de conteúdo — onda C** | #30 | Rooms 9, 10 e Final/Q&A; clímax do pulo demonstrado | P1 |
| 10 | **Tuning do apresentador + release** | #20 Fase 2, #31 | painel F2, presets, estabilidade, ensaio, offline, backup, performance e QA de projeção | P0 para #31 |

### Dependências

- Gate 1 + definição inicial do Gate 2 antes de produzir arte final.
- Gate 3 serve de gold standard. Gates 4/5/6 podem evoluir em paralelo **sobre uma única Room 6**.
- Gates 7/8/9 iniciam depois da aprovação da vertical slice, style bible e UI.
- Gate 10 inclui testes contínuos durante toda a produção; não deixar verificação em projetor só para a véspera.

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

## Quality gates obrigatórios

**G0 — protótipo técnico** (atingido, com testes manuais limitados): duas salas, player, hotspots, flechas e estado.

**G1 — apresentação funcional**: menu, conteúdos DOM, N/P/R/F/ESC, objetivos, progressão acessível sem controle mouse, 720p/1080p.

**G2 — vertical slice juicy**: uma room completa com sprites, SFX, impacto, reveal, narrativa e opção mute/reduced-motion.

**G3 — conteúdo completo**: 11 cenas, cada uma com tese, uma interação central, fallback, speaker cue e tempo cronometrado.

**G4 — release show-ready**: CI + build offline, projector last-row pass, consumo de memória/frames aceitável, stress/perda de foco, backup local e ensaio <=15 min.

## Notas de arquitetura

- Phaser para mundo/efeitos; DOM/CSS para texto, código, HUD e overlays. NÃO fixar texto de 14px Phaser como informação essencial.
- Distinção clara: exit zone invisível de ~22px, margem decorativa de ~29px no placeholder atual e **safe area real de conteúdo ~96px**, a validar. Nenhuma faixa gigante é necessária.
- Sprite/pixel grid coerente e assets locais; audio opt-in/baixo para não abafar fala.
- Regras de reveal devem sobreviver ao voltar à room se isso servir à apresentação; reset manual deve permanecer disponível.
- Não exigir ordem perfeita de cliques nem precisão do ponteiro. Uso ao vivo > fidelidade de gameplay.
- Documentos detalhados: [Auditoria](./AUDITORIA-PRONTIDAO.md), [Projeção](./PROJECAO-QA.md), [Assets e som](./ART-AUDIO-PRODUCTION.md), [Plano mestre](./PLANO-MESTRE.md), [Backlog](./BACKLOG.md).

## Próxima issue executável

**#9 — vertical slice da Room 6** (com #23: inspeção de legibilidade em projetor): usar as cenas autoradas da #27 como base, implementar explicações técnicas e diagramas visualmente ricos.

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
