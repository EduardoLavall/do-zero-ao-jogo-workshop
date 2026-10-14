# Auditoria crítica de prontidão — 2026-10-14

## Escopo e evidências

Inspeção **estática** da branch `main` no GitHub (head `98323cabe264db86a25ab54ae918ee3fe6343abe`), registry, scene, configuração, scripts, árvore de arquivos e documentação. **Não foi realizado teste visual em projetor**, benchmark ou build local nesta auditoria (ambiente do repositório não executado). Hipóteses de UX/performance estão marcadas como riscos a validar.

## Estado real

| Domínio | Constatação | Prontidão |
|---|---|---|
| Ferramentas | Vite, TypeScript, Phaser, Vitest, lint e scripts existem | Fundação presente |
| Spatial shell | 1920×1080 / 16:9 / FIT / câmera fixa / nav bordas | Protótipo funcional |
| Input | mouse-follow X, LMB shoot, RMB jump, MMB toggle | Funcional, conflito UX possível |
| Interaction | alvo próximo, locked/revealed, Arrow tween até hotspot e reveal | Demo técnica |
| Dados de conteúdo | `roomRegistry` só tem Room 01 vazia e Room 02 de testes | 0/11 salas finais |
| UI | títulos e status desenhados via Phaser; nenhum painel HTML real | Incompleta |
| Arte | retângulos, círculos, sem spritesheets/atlas/backgrounds no repo | Ausente |
| Áudio | sem arquivos locais nem AudioManager | Ausente |
| Demo | só teste de interação, sem menu, Q&A, conteúdo, duração, backup | Não pronta |

## Riscos de arquitetura / apresentação

1. `PresentationScene.ts` concentra render, HUD, hotspots, projectile, troca de room e estado visual: extrair sistemas de UI e room rendering antes de escala (#27).
2. `PresentationController` reinicializa estado ao entrar/voltar em room: revelar conteúdo novamente ao retroceder pode quebrar a narrativa. Definir persistência por room e reset explícito (#27).
3. Mesmo mouse X serve para deslocar personagem e mirar: em alvos altos/laterais o jogador anda enquanto apresenta. Testar hold-to-aim, pause/freeze sob overlay, ou alternância sem bloquear fallback (#24).
4. Clicar em room durante fade ainda gera pedido de tiro antes do teste de `transitionLocked`; revisar bloqueio e callbacks (#24/#31).
5. O canvas usa texto de debug 14–20px lógicos e SAFE_AREA_MARGIN=29: inadequado para declarar legibilidade em 720p. Validar projetor (#23).
6. Gameplay e texto técnico não podem depender do sucesso de acerto; oferecer revelar via teclado e avançar conteúdo por cue, sem mouse (#8/#27).
7. Sem assets offline, preloader, áudio desbloqueado por gesto, mute e smoke test cross-resolution; risco para palco (#26/#31).
8. Sem lockfile, GitHub Pages usa npm install: reprodução de build pode variar; considerar versionar lock e npm ci (#31).
9. O plano atual soma exatamente 15:00, sem folga; adotar 13:30 de conteúdo + 1:30 de contingência (#27/#31).
10. Slides com galeria de games precisam política de imagem e direitos: preferir ilustrações autorais e sinais visuais explicativos a screenshots/logotipos de terceiros sem licença.

## Juiciness: diagnóstico

O jogo tem 'ação' (seta e impacto), mas ainda não tem cadeia sensorial. Objetivo por interação:

`antecipação curta → ação legível → resultado imediato → celebração contida → conteúdo didático`

Orçamento inicial recomendado (a tunar com ensaio, não valores absolutos):
- aim hover: pulso lento suave, outline estável;
- tiro: 80–140ms de antecipação, traço/trail curto e recoil leve;
- impacto: flash até ~100ms, partículas ~200–450ms, escala rápida e som curto;
- reveal: conteúdo DOM por blocos ~150–300ms, legível antes de nova ação;
- objetivo concluído: ícone/contador + SFX discreto, sem esconder mensagem;
- transição: ~180–350ms, cancelável/skip quando necessário.
- reduzir partículas em projetor fraco e respeitar preferência de movimento reduzido.

**Juicy não significa movimento constante:** evitar shake/CRT/câmara balançando durante explicações de código. Efeitos devem reforçar causalidade, não competir com voz/legibilidade.

## Decisão

Não produzir arte final de 11 salas agora. Sequência crítica: #23 + #8 + #27 → #9 (vertical slice) → #24 + #25 + #26 → #28/#29/#30 → #20 F2 + #31.

## Critérios de release

- 11 cenas do roteiro e todas as ideias centrais têm versão apresentável;
- um único fluxo pode percorrer menu → rooms → Q&A sem mouse;
- projeção 720p/1080p/16:10 e última fileira verificadas;
- build, lint, testes, navegação e funcionamento offline com screenshots/relatório;
- sem áudio e em reduce-motion continua funcional;
- ensaio real <=15 minutos, incluindo 90s de buffer;
- licenças de cada asset externas verificadas, credits versionados, backup local testado.
