# Interactive Core — ciclo de vida de demonstrações (#38)

## Estado

Infra de demo e uma experiência **piloto** na Room 6. Não confundir com o simulador de FPS e física planejado em #39/#40: essa primeira experiência verifica **input diferente → estado diferente → render diferente**, e testa o ciclo de vida.

## Fluxo prático

1. Abrir workshop e pressionar Enter.
2. Pressionar **6** para Room 6, **ESC** para fechar a introdução.
3. Pressionar **D** ou clicar **EXPERIMENTAR DEMO**. O jogador para de seguir o mouse enquanto o painel está aberto.
4. No laboratório clicar **MOVER**, **PULAR**, **EXECUTAR EXEMPLO** ou **RESET DEMO**. O marcador, contagem e mensagem de estado mudam por transições de um modelo puro TypeScript.
5. Pressionar **D** ou **ESC** fecha e descarta a demo; voltar a abrir começa do estado inicial. **E** fecha e revela o próximo hotspot sem física, e **N/P** saem normalmente da sala. **R** reseta o progresso narrativo da sala atual e reinicia a demo na próxima abertura.
6. Entrar noutra sala não oferece demo enquanto não houver um módulo registrado. UI e jogo anteriores seguem disponíveis.

## Arquitetura (mínima)

- `RoomDemoController` é o dono de uma única instância ativa, consulta `DemoRegistry`, chama `mount(host)`, `activate()`, `update(dtMs)`, `reset()` e `dispose()`.
- `demoRegistry` mapeia ID de sala para fábrica. Nenhum `if (room.id === ...)` de conteúdo foi inserido no Player; `PresentationScene` só orquestra acesso e lifecycle.
- `PresentationUI` usa a mesma camada HTML 1920×1080/FIT, com botão launch, modal com controles HTML e botão fechar, foco inicial via `focus()`.
- `InputTraceModel` é lógica TypeScript pura, determinística e testável, sem Phaser nem DOM. `InputTraceDemo` traduz eventos DOM em comandos e atualiza texto e posição de marcador.
- Input no canvas continua no `InputController`; botões da demo ficam em DOM com `pointer-events: auto`, bloqueando clique-through. A Scene impede movimento, pulo e tiro enquanto a demo estiver ativa.
- `dispose` remove todos os listeners dos botões, libera referência aos elementos e remove DOM da demo. O controller fecha a demo também ao sair, resetar e receber shutdown da Scene.
- `update` limita delta a [0,50] ms, inclusive NaN, evitando saltos enormes depois de Alt+Tab. O piloto não possui loop, timers ou música contínua.
- Estado narrativo (revelações, objetivos) continua sob `PresentationController`; fechar a demo **não** apaga reveals. Estado de demo é **efêmero**: reabrir monta nova instância.
- Fallback mesmo sem gameplay: D abre demo (se disponível), botões recebem foco para Enter/Espaço, E pula, N/P navegam, ESC fecha, R reseta a sala.
- Respeita `prefers-reduced-motion` e não exige recursos externos.

## Extensão prevista — #39 / #40

Registrar outras demos de `room-06` ou submódulos dentro de uma única fábrica responsável pelo laboratório:
- #39 substitui o piloto por um simulador puro Game Loop/FixedUpdate com play/pause/step e FPS modelado.
- #40 adiciona toggles de componentes, eventos de input e simulação simples de física/gravidade.
- O `RoomDemoController` continua inalterado; todos os efeitos DOM/Phaser devem ter `dispose()` idempotente.

## QA esperado

- Testes: `RoomDemoController.test.ts` (mount, troca, delta, reset, dispose, falha), `InputTraceModel.test.ts` (estado e comandos).
- CI: typecheck, ESLint, Vitest e build Vite.
- **Smoke de navegador obrigatório**: Enter → 6 → ESC → D, botões / foco, fechar, reabrir, N/P, R, E, fullscreen F, 720p/1080p e 16:10.
- **Projetor real** ainda em #23; não declarar legibilidade final nem ausência de vazamento em ambiente real sem verificar.
