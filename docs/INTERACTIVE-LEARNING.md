# Interactive Learning — plano obrigatório para Slide Rooms jogáveis

> 2026-10-14 · Épico **#37** · Implementação pendente. Esta é uma **especificação de produção**, não funcionalidade já entregue.
>
> Problema identificado: 11 storyboards, hotspots, flechas e painéis funcionam; praticamente todas as salas ainda se resumem a **clicar no alvo → revelar texto**. Isso NÃO satisfaz o conceito de apresentações jogáveis.

## Princípio de produto

**O público deve conseguir perceber a consequência de uma escolha antes mesmo de o apresentador explicá-la.**

Uma interação de aprendizagem possui o ciclo:

```text
PERGUNTA / HIPÓTESE
      ↓
AÇÃO (mudar parâmetro, escolher, executar, pausar)
      ↓
ESTADO DO MODELO MUDA DE VERDADE
      ↓
VISUALIZAÇÃO COMPARÁVEL (antes / depois)
      ↓
EXPLICAÇÃO DO PORQUÊ + TAKEAWAY
```

Um círculo clicável que abre texto **não é uma interação didática**. Um botão Play que apenas dispara uma animação pré-renderizada também não é suficiente. O mesmo modelo, sujeito a parâmetros ou escolhas diferentes, precisa produzir resultado diferente que se possa explicar.

## Estados de prontidão — não misturar

| Nível | Descrição | Estado da maioria das salas hoje |
|---|---|---|
| S0 — estrutura | Room, renderer, HUD, navegação, fallback e dados | **Sim** |
| S1 — conteúdo | Explicações e reveals legíveis com storyboard | **Provisório** |
| S2 — *interactive learning* | Ação variável → simulação/estado → consequência comparável, reset e skip | **Não** |
| S3 — juiciness | Animação/feedback para a causa e efeito (sem prejudicar leitura) | **Não** |
| S4 — produção audiovisual | Sprites, áudio/SFX locais, licenças e mix | **Não** |
| S5 — palco aprovado | Browser smoke, 720p/1080p/16:10, projetor real, offline, 15 min | **Não** |

**A Room 6 (#9) está no nível S1**, apesar de possuir seis terminais, códigos Unity/C# e diagramas estilizados. O passo imediato é atingir S2. Não usar "gold standard" ou "concluída" sem indicar o nível e as pendências.

## Critérios comuns para TODA sala

- **Uma mecânica exclusiva** que provoque mudança observável em modelo/estado. Ela deve **ensinar um conceito do storyboard**.
- Pelo menos **duas condições comparáveis** com consequências diferentes (antes/depois, 30/60 FPS, com/sem colisão, áudio ligado/desligado etc.).
- Controle simples, acessível e de curta duração; botão **Executar exemplo** e **Reset demo**; atalho **Pular demo / Próximo**.
- Apresentador nunca é obrigado a acertar flechas, concluir puzzles, ouvir SFX ou esperar cronômetros para mudar de sala.
- O fallback `E` (reveal) e `N/P` (navegação) não depende de estado da simulação. `R` reseta a sala, incluindo demo ativa, sem apagar progresso de outras salas.
- Pausar gameplay ao manipular slider/DOM; desativar input da demo ao fechar/trocar de sala; não invadir `PresentationScene` com ifs por room.
- Sem backend, downloads em runtime, execução Unity ou dependência de rede. **Todas as simulações rodam em Phaser + TypeScript**; Unity + C# são exemplos de ensino.
- Todos os parâmetros validados com limites/NaN-safe e estados determinísticos com seed fixa quando houver aleatoriedade.
- Rotular números exemplificativos e "FPS simulado"; nunca fazer o público acreditar que um slider controla a performance real do navegador.
- A demo deve caber no tempo previsto; não bloquear os 90 segundos de contingência da apresentação.

## Inventário de experiências por room

| Room | Tempo | Mecânica jogável (a implementar) | Comparação observável | Explicação didática | Issue de produção |
|---|---:|---|---|---|---|
| **01** O que é um jogo? | 0:50 | **Mini-regra:** mover um token até a meta, alternar regra "pode atravessar parede?" e condições de vitória | mesma ação pode vencer/bater na parede, com feedback distinto | regra + interação + feedback definem experiência | #28 |
| **02** História | 1:00 | **Pong mínimo:** acionar rebatedor e alternar visual/controles "mecânica simples × acabamento moderno" | mesma regra tem apresentação distinta; pontuação reage à colisão | jogos eletrônicos evoluem em interface/hardware, não só objetivos | #28 |
| **03** Tecnologia | 0:45 | **Orçamento fictício de hardware:** variar nº de entidades/efeitos e assistir gráfico simplificado de carga de CPU/GPU | mudar objetos ou efeito altera carga **modelada**, não FPS real | escolhas de implementação/hardware trazem limites e trade-offs | #28 |
| **04** Quatro pilares | 0:40 | **Monte um game:** habilitar Design, Código, Arte, Áudio sobre o mesmo protótipo | ação passa de sem objetivo → jogável → legível → com feedback sonoro/visual | disciplinas trabalham juntas | #28 |
| **05** Game Design | 1:45 | **Core Loop / balanceamento:** escolher recompensa e dificuldade numa sequência curta de coletar → melhorar → repetir | rota/recompensa/risco altera pontuação/progressão | mecânicas e playtest produzem decisões de design | #29 |
| **06** Programação e Engine | 2:45 | **Simulador de frames** com play/pause/step, FPS teórico 30/60/120, timestep físico; **componentes/input/física** em uma arena de teste | nº de Updates/FixedUpdates, visibilidade, colisão, impulso e deslocamento mudam | engine orquestra sistemas e scripts; Unity/C# só ilustra | #39 + #40, core #38, complementa #9 |
| **07** Arte | 0:50 | **Animador de sprites:** navegar quadros e mudar velocidade de reprodução; habilitar/desabilitar camadas ou silhueta | frame rate da animação e legibilidade variam | spritesheet e timing comunicam ação | #29 |
| **08** Áudio | 0:50 | **A/B do MESMO hit**: simular ataque repetível com SFX off/on e intensidade; waveform/caption sempre presente | feedback sentido e percebido mudam sem alterar a regra | áudio comunica impacto/ritmo (precisa AudioManager #26 para A/B sonoro real) | #29 + #26 |
| **09** Física do pulo | 2:15 | **Laboratório de pulo:** alterar força e gravidade, disparar input, ver trajetória, velocidade e colisão | mesmo personagem salta alturas distintas e pousa de forma diferente | Input → Update → FixedUpdate → Rigidbody2D → animação | #30 |
| **10** Protótipo ao jogo | 1:05 | **Controle de camadas:** alternar um mesmo cenário entre colisões, sprite, UI, partículas, som e iluminação | A/B comparável, regra continua mas experiência muda | integração e juiciness transformam protótipo | #30 |
| **FINAL** Quest Complete | 0:25 | **Mapa de conquistas:** acender ícones das quatro disciplinas, mostrando o que foi aprendido e exibir Q&A | progresso do percurso se reflete visualmente; fallback "mostrar todas" | síntese + convite a criar jogos | #30 |

### Requisitos específicos por segmento

**Rooms 1–4 (#28):** experiências de 8–20 segundos, pensadas para explicação oral breve. Pong e carga de hardware são modelos didáticos, **não recriações licenciadas nem benchmarks reais**. Na Room 4, o áudio pode ter alternativa visual enquanto #26 estiver pendente.

**Rooms 5, 7, 8 (#29):** resultado manipulado em tempo real e resetável; animador de sprite deve usar quadro efetivamente diferente, não só multiplicar escala; A/B de som usa a mesma ação e volumes baixos, com caption/visual se sem dispositivo de saída.

**Rooms 6 (#39, #40):** prioridade máxima e primeira referência de arquitetura. Implementar simuladores com modelos puros e renderização desacoplada. Nenhum passo depende de possuir Unity instalado.

**Rooms 9, 10 e Final (#30):** Room 9 concentra a demo física mais forte; reutilizar princípios do laboratório da Room 6 sem duplicar física. Room 10 exibe a transformação da **mesma** cena, não imagens desconexas. Final é clímax narrativo, sem puzzle obrigatório.

## Interações da Room 6 detalhadas (2:45)

| Etapa | Alteração manipulável | Output | Tempo didático alvo |
|---|---|---|---:|
| Intro | escolher "executar exemplo" | 6 terminais com estados claros | 0:15 |
| Game Loop | Play/Pause/Step + FPS simulado | contador, marcador e highlight Input/Update/Render | 0:25 |
| MonoBehaviour | ligar/desligar script conceitual | callback Start/Update no log didático | 0:25 |
| FixedUpdate | alterar intervalo fixo enquanto avança frames | passos físicos por frame (0,1,2+) | 0:30 |
| Componentes | toggles SpriteRenderer, Collider2D, Rigidbody2D | objeto aparece/some/colide/é afetado | 0:20 |
| Input System | disparar Action por botão/tecla | fluxo Input → Action → comportamento | 0:20 |
| Rigidbody2D | impulso e gravidade (presets, não 20 sliders) | trajetória e velocidades A/B | 0:20 |
| Síntese | finalizar/skip | porta ENGINE ONLINE + mensagem | 0:10 |

**Precisão:** `Update` de Unity ocorre por frame, `FixedUpdate` usa passo fixo de física; zero/uma/múltiplas chamadas por frame; `AddForce` aplica força ou impulso de acordo com o modo, não muda posição diretamente. Simular isso com JS/Phaser e rotular sempre *demonstração conceitual*.

## Arquitetura proposta (#38)

- **Não reinventar o core:** conservar `PresentationController`, `PresentationState`, `roomRegistry`, `HotspotSystem`, `RoomRenderer` e DOM overlay atual.
- `src/game/demos/` abriga *features*, não um framework gigante; um `RoomDemoController` controla `mount/activate/reset/destroy` por sala.
- `src/game/demos/models/` concentra cálculos TS puros (fixed-step accumulator, jump solver, balanceamento). Vitest testa matemática independentemente do Phaser/DOM.
- `src/ui/demos/` concentra controles de demo seguros e acessíveis; uso de `textContent`, não injeção de HTML vindo do conteúdo.
- `DemoRegistry`: `roomId` → criador de demo; dados `storyboard` descrevem a escolha de módulos sem importar engine para Presentation Core.
- Entrar e sair: destrói listeners/tweens/timers; reset volta ao estado base; navegar cancela demo anterior; progresso narrativo continua por room.
- Botões grandes com foco/teclas, disabled claro e presets; não capturar N/P/F/ESC. Ao abrir demo, congelar mouse-follow/tiros até fechar.
- Modo demonstrador: 1 comando para executar e 1 para avançar/skip. Nunca fazer simulação rodar automaticamente indefinidamente num slide.
- A solução deve permitir placeholders de arte e som: **construir mecanismo antes de aplicar juice**.

## Gates / DoD

**IL0 — Spec:** documento e issues definidos (não é implementação).

**IL1 — Infra:** contrato de demos e testes de ciclo de vida implementados (#38).

**IL2 — Vertical slice pedagógica:** #39 + #40; Room 6 completa com **ação variável → consequência comparável → explicação**, sem obrigar minigame.

**IL3 — Conteúdo jogável:** #28/#29/#30 — 11/11 salas com mecânicas exclusivas e fallback, tempos de roteiro respeitados.

**IL4 — Polimento:** #24 + #25 + #26 passam a ser aplicados sobre interação validada; não substituir demo por efeito decorativo.

**IL5 — Release:** #41 + #23 + #31; QA e ensaio real, offline, projetor, 15 min.

**Não encerrar #9 nem declarar #37 concluído enquanto a Room 6 não atingir IL2 e a qualidade de palco pendente não estiver identificada.**

### Links
- Épico: [#37](https://github.com/EduardoLavall/do-zero-ao-jogo-workshop/issues/37)
- Core: [#38](https://github.com/EduardoLavall/do-zero-ao-jogo-workshop/issues/38)
- Game Loop: [#39](https://github.com/EduardoLavall/do-zero-ao-jogo-workshop/issues/39)
- Física e componentes: [#40](https://github.com/EduardoLavall/do-zero-ao-jogo-workshop/issues/40)
- QA didático: [#41](https://github.com/EduardoLavall/do-zero-ao-jogo-workshop/issues/41)
- Conteúdo das outras salas: #28 / #29 / #30
- Juice/arte/áudio: #24 / #25 / #26
- Projeção/release: #23 / #31
