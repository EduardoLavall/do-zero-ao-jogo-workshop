# Storyboards — Do Zero ao Jogo

> Gerado a partir de `src/presentation/roomStoryboards.ts`, que é a fonte tipada dos dados do jogo. **São salas com conteúdo/geometry placeholders, não artes finais.** Atualizado em 2026-10-14.

## Ritmo e narrativa

- Menu: **0:20**; 11 salas: **13:10**; conteúdo + menu: **13:30**; reserva: **1:30**; total máximo: **15:00**.
- Ordem: O que é um jogo → História → Tecnologia → Quatro pilares → Design → Programação → Arte → Áudio → Pulo → Integração → Créditos.
- Cada alvo corresponde a uma única ideia, com fala e painel de conteúdo. O apresentador não precisa acertá-lo: **E** revela; **N/P** navegam; **R** reseta só a sala; **T** abre a sala técnica de testes.
- **Estado**: visitas subsequentes preservam reveals/objetivos daquela sala durante a sessão; reinício da página reseta (persistência em localStorage só no futuro, se aprovada).
- Fontes de terceiros são **referências documentais**, não assets ou capturas licenciados automaticamente.
- Falas abaixo são sugestões para apresentação oral; não são texto para ser lido em voz alta da tela.

## 1. O que é um jogo? — 00:50 (`room-01`)

**Tese / pergunta:** O que jogos tão diferentes têm em comum?

**Objetivo de aprendizagem:** Reconhecer regras, interação e feedback como fundamentos de um jogo.

**Composição:** Galeria de silhuetas abstratas inspiradas em gêneros distintos; três placas interativas no primeiro plano.

**Foco visual:** Painel central com a pergunta; alvo ativo separado do HUD. · Tema: `arcade-gallery`

**Introdução no painel:** O que jogos tão diferentes têm em comum? — Jogos podem ter estilos completamente diferentes. O que não pode faltar para que algo seja um jogo?

**Fala de abertura:** Abra com exemplos reconhecíveis, ouça uma resposta e mostre a ideia central sem definir videogame apenas por gráficos.

### Revelações (3)

**1. Regras** (`room-01-regras`)

- Ideia no painel: Regras descrevem o que é permitido e como o sistema reage.
- Fala: Diga: sem regras, não há sistema compartilhado de decisões.
- Hotspot: x=480, y=595, raio=114 (canvas 1920×1080)

**2. Interação** (`room-01-interacao`)

- Ideia no painel: O jogador toma decisões e o jogo devolve consequências.
- Fala: Demonstre o mouse e convide a plateia a prever o resultado.
- Hotspot: x=960, y=550, raio=114 (canvas 1920×1080)

**3. Feedback** (`room-01-feedback`)

- Ideia no painel: Som, imagem e animação deixam claro o que acabou de acontecer.
- Fala: Ligue o acerto ao brilho da placa e feche com a fórmula.
- Hotspot: x=1440, y=595, raio=114 (canvas 1920×1080)

**Takeaway:** JOGO = REGRAS + INTERAÇÃO + FEEDBACK

**Transição / saída:** Essas ideias existem muito antes do computador.

**Assets previstos (a produzir/licenciar):** scene/gallery-original, icon/rules, icon/interaction, icon/feedback

**Sons previstos (a produzir/licenciar):** ambient/gallery, sfx/reveal

**Fontes para checagem:** `docs/PLANO-MESTRE.md`

---

## 2. Da brincadeira ao videogame — 01:00 (`room-02`)

**Tese / pergunta:** Quem inventou os jogos?

**Objetivo de aprendizagem:** Conectar a origem do jogar a jogos eletrônicos sem confundir marcos históricos.

**Composição:** Linha do tempo em três estações, com marcos históricos autorais.

**Foco visual:** Marcos em ordem cronológica, sem imagens licenciadas de terceiros. · Tema: `time-capsule`

**Introdução no painel:** Quem inventou os jogos? — Pessoas jogavam muito antes dos computadores. A tecnologia apenas criou novas formas de jogar.

**Fala de abertura:** Use a linha do tempo como contexto curto: brincadeiras, jogos de tabuleiro antigos e experiências eletrônicas, evitando declarar um único inventor.

### Revelações (3)

**1. Jogos antigos** (`room-02-antigos`)

- Ideia no painel: Senet e o Jogo Real de Ur mostram que regras e competição já existiam na Antiguidade.
- Fala: Cite os exemplos sem tentar escolher um primeiro jogo absoluto.
- Hotspot: x=480, y=595, raio=114 (canvas 1920×1080)

**2. Experimentos eletrônicos** (`room-02-eletronicos`)

- Ideia no painel: Tennis for Two e Spacewar! representam experiências importantes anteriores à popularização doméstica.
- Fala: Explique que vários marcos coexistem e têm definições diferentes de primeiro.
- Hotspot: x=960, y=550, raio=114 (canvas 1920×1080)

**3. Popularização** (`room-02-pong`)

- Ideia no painel: Pong ajudou o videogame a chegar a públicos mais amplos.
- Fala: Pergunte: qual foi o primeiro console ou jogo de vocês?
- Hotspot: x=1440, y=595, raio=114 (canvas 1920×1080)

**Takeaway:** O jogo antecede o computador.

**Transição / saída:** Os jogos passaram a explorar os limites da tecnologia.

**Assets previstos (a produzir/licenciar):** scene/timeline, icon/boardgame, icon/oscilloscope

**Sons previstos (a produzir/licenciar):** sfx/timeline

**Fontes para checagem:** [Referência](https://www.metmuseum.org/essays/board-games-from-ancient-egypt-and-the-near-east) · [Referência](https://www.computerhistory.org/pdp-1/spacewar/)

---

## 3. Tecnologia transforma jogos — 00:45 (`room-03`)

**Tese / pergunta:** Como fomos de Pong aos mundos atuais?

**Objetivo de aprendizagem:** Identificar como hardware e ferramentas ampliam as possibilidades dos games.

**Composição:** Painel hardware simplificado à esquerda e resultado visual à direita.

**Foco visual:** Fluxo da CPU/GPU até a imagem. · Tema: `circuit-lab`

**Introdução no painel:** Como fomos de Pong aos mundos atuais? — Mais processamento, memória e ferramentas permitiram mundos maiores, simulações e experiências em rede.

**Fala de abertura:** Compare o que a máquina conseguia desenhar e simular antes e agora. Evite afirmar causalidade exclusiva entre videogames e toda evolução das GPUs.

### Revelações (2)

**1. CPU, GPU e memória** (`room-03-hardware`)

- Ideia no painel: CPU calcula lógica, a GPU ajuda a renderizar imagens e a memória mantém dados acessíveis.
- Fala: Mostre trabalho conjunto, não componentes isolados.
- Hotspot: x=680, y=595, raio=114 (canvas 1920×1080)

**2. Engines e ferramentas** (`room-03-ferramentas`)

- Ideia no painel: Engines organizam rendering, input, física, áudio e fluxo de produção.
- Fala: Transicione do hardware para pessoas e disciplinas.
- Hotspot: x=1240, y=550, raio=114 (canvas 1920×1080)

**Takeaway:** Limitações técnicas moldam o design.

**Transição / saída:** Mas hardware sozinho não cria um bom jogo.

**Assets previstos (a produzir/licenciar):** scene/hardware-lab, icon/cpu, icon/gpu

**Sons previstos (a produzir/licenciar):** sfx/technology

**Fontes para checagem:** [Referência](https://www.computerhistory.org/timeline/graphics-games/)

---

## 4. Quatro pilares para criar jogos — 00:40 (`room-04`)

**Tese / pergunta:** O que você precisa aprender para criar um jogo?

**Objetivo de aprendizagem:** Nomear as quatro áreas e mostrar que se integram.

**Composição:** Hub com quatro totens conectados ao centro.

**Foco visual:** Símbolo de desenvolvimento no centro. · Tema: `workshop-hub`

**Introdução no painel:** O que você precisa aprender para criar um jogo? — Um jogo nasce quando várias disciplinas cooperam para transformar ideias em experiências.

**Fala de abertura:** Peça um palpite antes de revelar as quatro áreas; diga que a ordem não implica hierarquia.

### Revelações (4)

**1. Game Design** (`room-04-design`)

- Ideia no painel: Define regras, objetivos e experiências desejadas.
- Fala: Dê o exemplo de uma decisão do jogador.
- Hotspot: x=420, y=595, raio=98 (canvas 1920×1080)

**2. Programação** (`room-04-codigo`)

- Ideia no painel: Transforma as decisões em comportamentos executáveis.
- Fala: Relacione com o evento da flecha no jogo.
- Hotspot: x=780, y=550, raio=98 (canvas 1920×1080)

**3. Arte** (`room-04-arte`)

- Ideia no painel: Dá forma, estilo e leitura às ações.
- Fala: Aponte a importância da silhueta e UI.
- Hotspot: x=1170, y=595, raio=98 (canvas 1920×1080)

**4. Áudio** (`room-04-audio`)

- Ideia no painel: Ajuda a comunicar impacto, ambiente e ritmo.
- Fala: Imite um feedback sem som e depois com som, se possível.
- Hotspot: x=1510, y=550, raio=98 (canvas 1920×1080)

**Takeaway:** Design + Programação + Arte + Áudio

**Transição / saída:** Comecemos pelas decisões: Game Design.

**Assets previstos (a produzir/licenciar):** scene/hub, icon/design, icon/code, icon/art, icon/audio

**Sons previstos (a produzir/licenciar):** sfx/skill-unlock

**Fontes para checagem:** `docs/PLANO-MESTRE.md`

---

## 5. Game Design — 01:45 (`room-05`)

**Tese / pergunta:** Por que alguém continua jogando?

**Objetivo de aprendizagem:** Entender mecânicas, core loop e playtest como processo iterativo.

**Composição:** Skill tree em três níveis e destaque progressivo.

**Foco visual:** Loop central de decisão e recompensa. · Tema: `skill-tree`

**Introdução no painel:** Por que alguém continua jogando? — O design combina regras e escolhas para criar um ciclo que o jogador quer repetir.

**Fala de abertura:** Explique que design define a experiência antes do polimento visual. Use o ciclo explorar/coletar/construir como exemplo de core loop.

### Revelações (3)

**1. Mecânicas e objetivos** (`room-05-mecanicas`)

- Ideia no painel: Mecânicas são ações possíveis; objetivos dão direção e significado a elas.
- Fala: Peça ao público uma ação simples e um objetivo.
- Hotspot: x=480, y=595, raio=114 (canvas 1920×1080)

**2. Core Loop** (`room-05-loop`)

- Ideia no painel: Explorar → Coletar → Construir → Melhorar → Repetir.
- Fala: Mostre a repetição como motivação para novas escolhas.
- Hotspot: x=960, y=550, raio=114 (canvas 1920×1080)

```csharp
EXPLORAR → COLETAR → CONSTRUIR → MELHORAR → ↻
```

**3. Playtesting e iteração** (`room-05-playtest`)

- Ideia no painel: Uma ideia só se torna design sólido ao ser testada, observada e ajustada.
- Fala: Diga: medir comportamento é mais útil do que adivinhar diversão.
- Hotspot: x=1440, y=595, raio=114 (canvas 1920×1080)

**Takeaway:** Protótipo → Teste → Ajuste → Repetir

**Transição / saída:** Como essas regras viram código funcionando?

**Assets previstos (a produzir/licenciar):** scene/design-tree, icon/mechanics, icon/loop, icon/test

**Sons previstos (a produzir/licenciar):** sfx/node-unlock

**Fontes para checagem:** [Referência](https://ocw.mit.edu/courses/cms-301-introduction-to-game-design-methods-spring-2016/)

---

## 6. Programação e Engine — 02:45 (`room-06`)

**Tese / pergunta:** Quem faz o jogo rodar a cada frame?

**Objetivo de aprendizagem:** Explicar game loop, callbacks, componentes e Rigidbody2D em Unity sem confundir frame com física.

**Composição:** Laboratório tecnológico com cinco terminais; painel DOM legível domina quando aberto.

**Foco visual:** Telas de Game Loop, lifecycle e componentes interligadas. · Tema: `engine-laboratory`

**Introdução no painel:** Quem faz o jogo rodar a cada frame? — Toda regra precisa de um lugar para executar. A engine fornece o loop e os sistemas que ligam código ao mundo.

**Fala de abertura:** Esta é a vertical slice de referência: 2min45. Mostre conceito → diagrama → código → impacto no jogo. Não leia o código linha a linha.

### Revelações (5)

**1. Game Loop** (`room-06-loop`)

- Ideia no painel: Input, atualização e renderização se repetem enquanto o jogo está ativo; 60 FPS oferecem ~16,67 ms por frame.
- Fala: Mostre o loop visual e lembre que FPS não é frequência fixa.
- Hotspot: x=380, y=595, raio=98 (canvas 1920×1080)

```csharp
while (running) {
  processInput();
  update();
  render();
}
```

**2. MonoBehaviour** (`room-06-lifecycle`)

- Ideia no painel: Em Unity, a engine invoca callbacks como Awake, Start e Update. Update depende dos frames renderizados.
- Fala: Pergunte: quem chama Update? A engine.
- Hotspot: x=680, y=550, raio=98 (canvas 1920×1080)

```csharp
void Start() { /* uma vez */ }
void Update() { /* por frame */ }
```

**3. Input e eventos** (`room-06-input`)

- Ideia no painel: Os eventos de teclado/mouse passam pela plataforma e pelo sistema de input antes da lógica do jogo.
- Fala: Compare polling com callback; Input.GetKeyDown pertence ao input legado.
- Hotspot: x=970, y=595, raio=98 (canvas 1920×1080)

**4. Composição por componentes** (`room-06-components`)

- Ideia no painel: Transform, SpriteRenderer, Collider2D, Rigidbody2D e scripts cooperam em um GameObject.
- Fala: Mostre composição, não uma classe gigante.
- Hotspot: x=1260, y=550, raio=98 (canvas 1920×1080)

**5. Rigidbody2D e FixedUpdate** (`room-06-physics`)

- Ideia no painel: FixedUpdate usa um timestep fixo para trabalhar com física. Rigidbody2D controla simulação; Collider2D define a forma de contato.
- Fala: Enfatize: um frame pode ter zero, um ou múltiplos passos de física.
- Hotspot: x=1550, y=595, raio=98 (canvas 1920×1080)

```csharp
void FixedUpdate() {
  rb.AddForce(Vector2.up * jumpForce,
              ForceMode2D.Impulse);
}
```

**Takeaway:** A engine chama nosso código; nosso código usa a engine.

**Transição / saída:** Programação não está sozinha: precisamos representar o mundo visualmente.

**Assets previstos (a produzir/licenciar):** scene/engine-lab, ui/code-panel, icon/loop, icon/component, icon/physics

**Sons previstos (a produzir/licenciar):** sfx/code-reveal, sfx/engine-pulse

**Fontes para checagem:** [Referência](https://gameprogrammingpatterns.com/game-loop.html) · [Referência](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.html) · [Referência](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rigidbody2D.html)

---

## 7. Arte e Animação — 00:50 (`room-07`)

**Tese / pergunta:** Como uma ideia vira algo que vemos no jogo?

**Objetivo de aprendizagem:** Visualizar o pipeline que transforma uma ideia em sprites legíveis e animados.

**Composição:** Ateliê com cavalete de pixel art e folhas de animação.

**Foco visual:** Comparação sprite estático / animado. · Tema: `art-studio`

**Introdução no painel:** Como uma ideia vira algo que vemos no jogo? — Arte não é apenas decorar: também ensina onde olhar e o que pode ser usado.

**Fala de abertura:** Mostre camadas do sprite e a mudança para uma animação em looping. Priorize leitura e silhueta.

### Revelações (2)

**1. Sprite e silhueta** (`room-07-sprite`)

- Ideia no painel: Um sprite comunica forma, função e estado. A silhueta precisa ser clara mesmo de longe.
- Fala: Compare contorno/cores, lembrando projeção em 720p.
- Hotspot: x=680, y=595, raio=114 (canvas 1920×1080)

**2. Spritesheet e animação** (`room-07-animacao`)

- Ideia no painel: Uma sequência de frames reproduzida no tempo cria movimento; animação comunica intenção e reação.
- Fala: Mostre idle → walk → jump com a mesma sprite sheet.
- Hotspot: x=1240, y=550, raio=114 (canvas 1920×1080)

**Takeaway:** Concept → Sprite → Spritesheet → Animação

**Transição / saída:** Falta uma dimensão que muitas vezes percebemos antes mesmo de ver.

**Assets previstos (a produzir/licenciar):** scene/art-studio, art/spritesheet-example, icon/brush

**Sons previstos (a produzir/licenciar):** sfx/frame-step

**Fontes para checagem:** `docs/PLANO-MESTRE.md`

---

## 8. Áudio e Feedback — 00:50 (`room-08`)

**Tese / pergunta:** O que muda quando adicionamos som?

**Objetivo de aprendizagem:** Reconhecer SFX, música e ambiência como sistemas de comunicação.

**Composição:** Mesa de mixagem e visualização de ondas no fundo.

**Foco visual:** Comparação visual A/B de feedback da flecha. · Tema: `sound-studio`

**Introdução no painel:** O que muda quando adicionamos som? — O áudio torna ações mais claras e pode alterar completamente como sentimos um jogo.

**Fala de abertura:** Faça uma demonstração A/B da mesma ação com e sem som; mantenha volume baixo para a fala.

### Revelações (2)

**1. SFX** (`room-08-sfx`)

- Ideia no painel: Sons pontuais informam pulo, impacto, erro e confirmação. O momento exato importa.
- Fala: Dispare uma flecha uma vez em silêncio e outra com som quando o sistema de áudio existir.
- Hotspot: x=680, y=595, raio=114 (canvas 1920×1080)

**2. Música e mixagem** (`room-08-mix`)

- Ideia no painel: Música estabelece ritmo; ambiência cria espaço; um mixer equilibra volumes sem cobrir a fala.
- Fala: Explique que áudio pode estar mudo sem quebrar interação.
- Hotspot: x=1240, y=550, raio=114 (canvas 1920×1080)

**Takeaway:** Som reforça ação, ambiente e emoção.

**Transição / saída:** Agora vamos juntar design, código, arte e áudio numa mecânica.

**Assets previstos (a produzir/licenciar):** scene/sound-studio, icon/waveform

**Sons previstos (a produzir/licenciar):** sfx/hit, sfx/ui, ambient/room

**Fontes para checagem:** `docs/PLANO-MESTRE.md`

---

## 9. Anatomia de um pulo — 02:15 (`room-09`)

**Tese / pergunta:** O que acontece quando apertamos para pular?

**Objetivo de aprendizagem:** Percorrer input → Update → FixedUpdate → Rigidbody2D → física → feedback.

**Composição:** Arena de teste com pipeline de sinais sobre a plataforma.

**Foco visual:** Personagem e painel de código sincronizados. · Tema: `jump-chamber`

**Introdução no painel:** O que acontece quando apertamos para pular? — O pulo parece uma ação simples, mas atravessa vários sistemas da engine.

**Fala de abertura:** Esta é a demonstração técnica principal. Construa a cadeia passo a passo e só então acrescente os efeitos juicy.

### Revelações (4)

**1. Input captura intenção** (`room-09-input`)

- Ideia no painel: Update pode registrar uma solicitação de pulo quando o botão é pressionado.
- Fala: Mostre o flag que separa leitura do input e uso de física.
- Hotspot: x=420, y=595, raio=98 (canvas 1920×1080)

```csharp
void Update() {
  if (Input.GetKeyDown(KeyCode.Space))
    jumpRequested = true;
}
```

**2. FixedUpdate aplica a física** (`room-09-fixed`)

- Ideia no painel: A lógica de física usa o próximo timestep fixo para aplicar o impulso uma vez.
- Fala: Evite o erro de aplicar impulso a cada frame.
- Hotspot: x=780, y=550, raio=98 (canvas 1920×1080)

```csharp
void FixedUpdate() {
  if (!jumpRequested) return;
  rb.AddForce(Vector2.up * jumpForce,
              ForceMode2D.Impulse);
  jumpRequested = false;
}
```

**3. Simulação e colisão** (`room-09-motion`)

- Ideia no painel: Rigidbody2D integra velocidade, gravidade e colisão com o chão.
- Fala: Diferencie Rigidbody2D e Collider2D.
- Hotspot: x=1170, y=595, raio=98 (canvas 1920×1080)

**4. Game Feel** (`room-09-juice`)

- Ideia no painel: Animação, poeira, SFX e squash/stretch tornam o mesmo salto muito mais satisfatório.
- Fala: Reproduza antes/depois da mesma mecânica, sem efeitos vs juicy.
- Hotspot: x=1510, y=550, raio=98 (canvas 1920×1080)

**Takeaway:** Mecânica + arte + som + feedback = experiência.

**Transição / saída:** O mesmo processo transforma qualquer protótipo em jogo.

**Assets previstos (a produzir/licenciar):** scene/jump-lab, icon/input, icon/physics, vfx/dust

**Sons previstos (a produzir/licenciar):** sfx/jump, sfx/land

**Fontes para checagem:** [Referência](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rigidbody2D.html) · `docs/PLANO-MESTRE.md`

---

## 10. Do protótipo ao jogo — 01:05 (`room-10`)

**Tese / pergunta:** Quando um protótipo se torna um jogo de verdade?

**Objetivo de aprendizagem:** Mostrar que o produto resulta de integrar as quatro disciplinas.

**Composição:** Duas vitrines lado a lado: bloco simples vs experiência polida.

**Foco visual:** Transformação A/B do mesmo gameplay. · Tema: `prototype-evolution`

**Introdução no painel:** Quando um protótipo se torna um jogo de verdade? — Não basta funcionar: precisamos tornar a ação compreensível, coerente e prazerosa.

**Fala de abertura:** Retome o protótipo de pulo e aplique camadas: regra, arte, som, UI e feedback. Não introduza nova teoria.

### Revelações (3)

**1. Protótipo** (`room-10-prototipo`)

- Ideia no painel: Primeiro validamos a mecânica com blocos e regras simples.
- Fala: Mostre que protótipo feio ainda pode ensinar muito.
- Hotspot: x=480, y=595, raio=114 (canvas 1920×1080)

**2. Integração** (`room-10-camadas`)

- Ideia no painel: Animações, SFX, UI e VFX aumentam a legibilidade e sensação de resposta.
- Fala: Aponte a cadeia de eventos entre sistemas.
- Hotspot: x=960, y=550, raio=114 (canvas 1920×1080)

**3. Experiência completa** (`room-10-jogo`)

- Ideia no painel: O jogo emerge quando design, programação, arte e áudio trabalham juntos.
- Fala: Retome os quatro pilares para encerrar o raciocínio.
- Hotspot: x=1440, y=595, raio=114 (canvas 1920×1080)

**Takeaway:** As disciplinas convergem para criar a experiência.

**Transição / saída:** Chegou a hora de concluir a missão.

**Assets previstos (a produzir/licenciar):** scene/prototype-evolution, icon/polish

**Sons previstos (a produzir/licenciar):** sfx/polish, sfx/quest

**Fontes para checagem:** `docs/PLANO-MESTRE.md`

---

## 11. Quest Complete — 00:25 (`room-final`)

**Tese / pergunta:** Pronto para criar o seu primeiro jogo?

**Objetivo de aprendizagem:** Sintetizar o workshop e abrir a sessão de perguntas.

**Composição:** Sala final de conquista, créditos e espaço para QR code autoral.

**Foco visual:** QUEST COMPLETE central, sem poluição visual. · Tema: `victory-hall`

**Introdução no painel:** Pronto para criar o seu primeiro jogo? — Missão concluída. Você acabou de ver design, código, arte e áudio trabalhando juntos.

**Fala de abertura:** Agradeça, mostre a frase final, referências e convide para perguntas. ENTER/tecla de ajuda conduz ao Q&A na implementação final.

### Revelações (1)

**1. QUEST COMPLETE** (`room-final-quest`)

- Ideia no painel: +100 XP · Obrigado por jogar. Perguntas?
- Fala: Reforce a mensagem final e abra para Q&A.
- Hotspot: x=960, y=595, raio=114 (canvas 1920×1080)

**Takeaway:** Criar jogos é transformar ideias em experiências.

**Transição / saída:** PRESS ENTER FOR Q&A — futura integração com créditos finais.

**Assets previstos (a produzir/licenciar):** scene/victory-hall, ui/credits

**Sons previstos (a produzir/licenciar):** sfx/quest-complete

**Fontes para checagem:** `docs/FONTES.md`

---

## DoD desta etapa (#27)

1. Existe contrato tipado para introdução, revelar, objetivo, duração, cena, assets e SFX.
2. As 11 salas constam em `roomRegistry` como storyboards jogáveis com placeholders geométricos; o `RoomWorldRenderer` recebe dados da room.
3. Progresso é por sala, objetivos derivam dos reveals, retorno preserva estado e R reseta só a room atual.
4. O laboratório `dev-interactions` está isolado do roteiro, acessível por T.
5. As produções artísticas, sons e demonstrações ricas ainda dependem de #9, #24, #25, #26, #28, #29 e #30.
6. Aprovação física de projeção continua na #23.
