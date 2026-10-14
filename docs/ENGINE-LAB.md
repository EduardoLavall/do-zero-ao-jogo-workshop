# Vertical slice — Room 6: Programação e Engine (#9)

## Escopo entregue

A apresentação continua executada **inteiramente em Phaser 3 + TypeScript**. Unity/C# aparecem **somente nos exemplos didáticos**, não são dependências de execução.

- `RoomRenderer` encaminha a Room 6 ao `EngineRoomVisuals`, que desenha 6 terminais, fluxo de sinais, estados READY/LOCK/ONLINE e porta de saída; nas outras salas o renderer genérico permanece intacto.
- `EngineLessonDiagram` produz 6 diagramas DOM acessíveis e com textos estáticos seguros.
- Os painéis têm código C# e explicações em tamanho lógico apropriado para leitura em 720p (inspeção no projetor **ainda pendente**, issue #23).
- O gameplay reaproveita HotspotSystem, Arrow, PresentationController, HUD e overlays. Nenhuma física é executada por C#/Unity.
- Quando os seis alvos são revelados, o objective existente conclui automaticamente e a porta muda para ENGINE ONLINE.
- A tecla **6** entra direto na Room 6 para teste/apresentação; **E** revela primeiro alvo desbloqueado sem depender do mouse; **N/P** navegam; **R** reinicia só a Room 6, preservando as outras.
- Quando não houver mais alvos, **E** abre a síntese/recap da sala.
- Animação de entrada dos diagramas e pulso de conclusão são leves; `prefers-reduced-motion` desabilita animações DOM. Sprites, SFX, ambiente musical e FX gerais são tarefas futuras (#24/#25/#26).

## Roteiro alvo — 2min45s

| Etapa | Tempo aproximado | Objetivo do apresentador |
|---|---:|---|
| Pergunta / tela de intro | 15 s | Quem chama as funções do script? |
| Game Loop | 25 s | INPUT → UPDATE → RENDER, modelo conceitual; 60 FPS ~16,67 ms/frame |
| MonoBehaviour | 25 s | A engine invoca Start/Update; inversão de controle |
| FixedUpdate | 30 s | passos físicos fixos não são iguais à frequência de render |
| Componentes | 20 s | game object composto de componentes |
| Input System | 20 s | eventos → Input System → actions; antigo `Input.GetKeyDown` é legacy |
| Rigidbody2D | 20 s | AddForce ≠ teleporte; Rigidbody2D vs Collider2D |
| Recap / saída | 10 s | Engine chama código → código usa APIs da engine |
| **Total** | **2m45s** | |

### Precisão técnica

- Código `while (running) { input(); update(); render(); }` é **pseudocódigo conceitual** do loop, não a implementação literal do Unity PlayerLoop.
- `Update` é chamado uma vez por frame para scripts ativos/habilitados; `FixedUpdate` executa em timestep fixo e pode ocorrer zero, uma ou múltiplas vezes por frame renderizado.
- O valor padrão de timestep da física é comumente `0.02 s` (50 Hz), mas é configurável por projeto.
- O exemplo de `Keyboard.current.spaceKey.wasPressedThisFrame` depende do **pacote Unity Input System**; `Input.GetKeyDown` é da API de entrada legada.
- `Rigidbody2D` participa da física; `Collider2D` descreve geometria de contato. `ForceMode2D.Impulse` aplica impulso, não define diretamente a posição.

## Checklist de QA manual

1. Acesse o workshop e pressione Enter, feche o painel com ESC e pressione **6**; deve entrar na Room 6 sem percorrer 1–5.
2. Verifique as seis estações em duas fileiras, HUD legível e sala sem arte externa.
3. Dispare no Game Loop, espere a flecha chegar e veja o diagrama; ESC fecha sem interferir na navegação.
4. Tente o FixedUpdate antes do MonoBehaviour: deve estar locked. Revele MonoBehaviour com E e confirme liberação de FixedUpdate.
5. Revele Componentes e FixedUpdate para desbloquear Rigidbody2D.
6. Conclua os 6 alvos; o progresso deve marcar objetivo completo e a porta deve ficar verde/ENGINE ONLINE. E exibe a síntese.
7. N/P sai e volta com o progresso preservado. R limpa só a Room 6.
8. Inspecione 1920×1080, 1280×720 e 1280×800, fullscreen, letras de código sem cortes; última fileira de projetor real é bloqueio para fechar #23.
9. Confira modo reduzido e funcionamento offline; console sem erros, sem downloads de Unity ou áudio ausente.

## Dependências seguintes

- **#24:** juicy global (anticipation, recoil, trails, hit sparkles, game feel e FX modes).
- **#25:** spritesheet/player e cenários finais.
- **#26:** SFX e AudioManager; nunca bloquear fluxo caso som falhe.
- **#23:** prova em projetor real e screenshots.
- **#31:** smoke de navegador e ensaio final.

Não marcar a Room 6 como sala audiovisual final antes de completar essas etapas.
