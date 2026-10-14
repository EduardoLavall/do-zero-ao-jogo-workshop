# Storyboards de produção — Do Zero ao Jogo

> Issue #27 · dados implementados em `src/rooms/workshopRooms.ts` · **roteiro inicial sujeito a ensaio**, não conteúdo artístico final. Este documento é derivado das mesmas definições do jogo.

## Contrato e operação

- **11 salas públicas**: 10 tópicos e Final; o laboratório de interação anterior foi substituído por conteúdo provisório baseado no roteiro.
- Tempo: menu **00:20** + cenas **13:10** = **13:30** de apresentação; reservar **01:30** para contingência = **15:00**.
- Todo roteiro de sala contém objetivo didático, tese, frase final, fala-guia do apresentador, cue de passagem, tempo estimado, intro DOM, hotspots com copy, um objetivo, composição provisória e IDs planejados de sprites/som.
- **Atirar** no hotspot disponível revela o painel; **E** revela sem gameplay; **N/P** navegam; **R** reinicia apenas a sala atual. O conteúdo já revelado é mantido ao voltar — exclusivamente na sessão atual (sem localStorage).
- O painel de introdução abre ao entrar na sala; **ESC/Enter** fecha. O HUD usa os objetivos e reveals do `PresentationState`.
- Anotações de fala (`presenterCue`) ficam nos metadados para script, ensaio ou modo apresentador futuro; **não** são exibidas à plateia como texto de slide.
- As cores e objetos são placeholders. IDs em `plannedAssets` **não carregam arquivos inexistentes**; a arte/áudio real é #25/#26. A vertical slice #9 transforma a Room 6 em padrão visual final.
- Direitos e precisão: usar ilustrações próprias/licenciadas, não copiar screenshots; história e API Unity devem ser checadas com `docs/FONTES.md` durante a produção das salas.

## Cronograma de palco

| Sala | Conteúdo | Duração | Principal ponto de interação |
|---|---|---:|---|
| 1 | O que é um jogo? | 00:50 | Regras |
| 2 | Da brincadeira ao videogame | 01:00 | Jogos antigos |
| 3 | Evolução tecnológica | 00:45 | CPU + GPU |
| 4 | Quatro pilares | 00:40 | Game Design |
| 5 | Game Design | 01:45 | Mecânicas e objetivos |
| 6 | Programação e Engine | 02:45 | Game Loop |
| 7 | Arte | 00:50 | Conceito |
| 8 | Áudio | 00:50 | Efeitos sonoros |
| 9 | A física do pulo | 02:15 | Intenção de pular |
| 10 | Do protótipo ao jogo | 01:05 | Protótipo |
| Final | Quest Complete | 00:25 | Quest Complete |
| Menu | Início | 00:20 | Enter |
| **Total com conteúdo** | | **13:30** | |
| Reserva | Tempo para perguntas / falhas | 01:30 | |
| **Total máximo** | | **15:00** | |

---

## 1. O que é um jogo? (`room-01`, 00:50)

**Tese:** Não é o realismo: são sistemas que respondem a escolhas.

**Objetivo didático:** Reconhecer regras, interação e feedback como elementos de uma experiência jogável.

**Fala-guia:** Pergunte à plateia o que Minecraft, xadrez e Pong têm em comum; não prolongue a resposta.

**Intro no painel:** “O que todos os jogos têm em comum?” — Antes de falar de motores gráficos, precisamos entender por que uma ação se transforma em jogo.

**Composição:** tema `opening`, cores provisórias e sign em (340, 870); console em (940, 870). Hotspots ficam na área central do canvas 1920×1080; usar HUD/safe area em todas as resoluções.

**Reveal / objetivo:**

| Ordem | Hotspot | Coordenadas | Mensagem principal | Requisitos |
|---|---|---|---|---|
| 1 | Regras | (500, 615), r=133 | Ações têm consequências | — |
| 2 | Interação | (960, 605), r=133 | O jogador toma decisões | — |
| 3 | Feedback | (1430, 615), r=133 | O jogo responde | — |

**Takeaway:** Jogo = regras + interação + feedback (modelo didático).

**Transição:** Da definição para as origens do brincar.

**Sprites planejados:** `gallery-cards`, `rule-icons`. **Eventos de áudio planejados:** `ui-reveal`, `target-hit`.

**Fallback:** E percorre revelações elegíveis; N/P troca sala, mesmo sem concluir objetivos. R zera apenas esta sala.

---

## 2. Da brincadeira ao videogame (`room-02`, 01:00)

**Tese:** Jogos antecedem computadores; os eletrônicos adicionam novas formas de feedback.

**Objetivo didático:** Situar rapidamente a passagem de jogos analógicos aos eletrônicos.

**Fala-guia:** Mencione Senet/Ur como exemplos antigos, depois destaque Tennis for Two, Spacewar! e Pong sem reivindicar um 'primeiro jogo' único.

**Intro no painel:** “Jogos existem há milênios” — Das regras escritas em tabuleiros à computação interativa.

**Composição:** tema `history`, cores provisórias e book em (340, 870); console em (940, 870). Hotspots ficam na área central do canvas 1920×1080; usar HUD/safe area em todas as resoluções.

**Reveal / objetivo:**

| Ordem | Hotspot | Coordenadas | Mensagem principal | Requisitos |
|---|---|---|---|---|
| 1 | Jogos antigos | (500, 615), r=133 | Antes das telas | — |
| 2 | Primeiros eletrônicos | (960, 605), r=133 | Computação como playground | — |
| 3 | Pong e consoles | (1430, 615), r=133 | Do laboratório ao público | — |

**Takeaway:** Tecnologia muda o suporte — não a necessidade de regras e escolhas.

**Transição:** Agora pergunte o que tornou jogos cada vez mais complexos.

**Sprites planejados:** `timeline-icons`, `retro-monitor`. **Eventos de áudio planejados:** `history-reveal`.

**Fallback:** E percorre revelações elegíveis; N/P troca sala, mesmo sem concluir objetivos. R zera apenas esta sala.

---

## 3. Evolução tecnológica (`room-03`, 00:45)

**Tese:** Mais computação, memória e conectividade ampliam as possibilidades de criação.

**Objetivo didático:** Ligar a evolução dos jogos à evolução do hardware e das ferramentas.

**Fala-guia:** Compare a simplicidade de Pong com um mundo 3D moderno, sem números históricos não verificados.

**Intro no painel:** “Do pixel ao mundo vivo” — As mesmas ideias ganham escala com hardware, redes e ferramentas melhores.

**Composição:** tema `technology`, cores provisórias e terminal em (340, 870); console em (940, 870). Hotspots ficam na área central do canvas 1920×1080; usar HUD/safe area em todas as resoluções.

**Reveal / objetivo:**

| Ordem | Hotspot | Coordenadas | Mensagem principal | Requisitos |
|---|---|---|---|---|
| 1 | CPU + GPU | (500, 615), r=133 | Simulação e imagem | — |
| 2 | Memória + redes | (960, 605), r=133 | Mundos maiores e conectados | — |
| 3 | Engines | (1430, 615), r=133 | Ferramentas que aceleram | — |

**Takeaway:** Computação e jogos evoluíram em conjunto.

**Transição:** Tecnologia sozinha não constrói um jogo: precisamos de disciplinas.

**Sprites planejados:** `hardware-icons`, `engine-badges`. **Eventos de áudio planejados:** `tech-sweep`.

**Fallback:** E percorre revelações elegíveis; N/P troca sala, mesmo sem concluir objetivos. R zera apenas esta sala.

---

## 4. Quatro pilares (`room-04`, 00:40)

**Tese:** A experiência final depende da colaboração de vários sistemas.

**Objetivo didático:** Apresentar design, programação, arte e áudio como disciplinas integradas.

**Fala-guia:** Pergunte que áreas a plateia acha necessárias; revele cada pilar em sequência.

**Intro no painel:** “Como se faz um jogo?” — Quatro pilares se encontram para criar uma experiência.

**Composição:** tema `hub`, cores provisórias e tree em (340, 870); sign em (940, 870). Hotspots ficam na área central do canvas 1920×1080; usar HUD/safe area em todas as resoluções.

**Reveal / objetivo:**

| Ordem | Hotspot | Coordenadas | Mensagem principal | Requisitos |
|---|---|---|---|---|
| 1 | Game Design | (400, 565), r=113 | O que fazemos e por quê? | — |
| 2 | Programação | (760, 615), r=113 | Como o sistema responde? | — |
| 3 | Arte | (1150, 615), r=113 | Como o mundo comunica? | — |
| 4 | Áudio | (1530, 565), r=113 | Como a ação soa? | — |

**Takeaway:** Design + programação + arte + áudio trabalham juntos.

**Transição:** Comecemos por decidir o que o jogador fará.

**Sprites planejados:** `four-pillars-icons`. **Eventos de áudio planejados:** `hub-unlock`.

**Fallback:** E percorre revelações elegíveis; N/P troca sala, mesmo sem concluir objetivos. R zera apenas esta sala.

---

## 5. Game Design (`room-05`, 01:45)

**Tese:** Uma boa ideia vira jogo quando seu loop pode ser testado e melhorado.

**Objetivo didático:** Mostrar core loop, regras e iteração como ferramentas de design.

**Fala-guia:** Mostre o loop explorar/coletar/construir como exemplo; pergunte por que repetimos a ação.

**Intro no painel:** “O que o jogador faz?” — Um jogo ganha identidade pelo que pede ao jogador — e pelo motivo para repetir.

**Composição:** tema `design`, cores provisórias e tree em (340, 870); sign em (940, 870). Hotspots ficam na área central do canvas 1920×1080; usar HUD/safe area em todas as resoluções.

**Reveal / objetivo:**

| Ordem | Hotspot | Coordenadas | Mensagem principal | Requisitos |
|---|---|---|---|---|
| 1 | Mecânicas e objetivos | (500, 615), r=133 | Ações com propósito | — |
| 2 | Core Loop | (960, 605), r=133 | A experiência se repete | — |
| 3 | Playtesting | (1430, 615), r=133 | Ideia não é evidência | — |

**Takeaway:** Prototipar → testar → observar → ajustar.

**Transição:** Como transformamos essas regras em execução real?

**Sprites planejados:** `skill-tree`, `core-loop-icons`. **Eventos de áudio planejados:** `skill-unlock`, `objective-complete`.

**Fallback:** E percorre revelações elegíveis; N/P troca sala, mesmo sem concluir objetivos. R zera apenas esta sala.

---

## 6. Programação e Engine (`room-06`, 02:45)

**Tese:** A engine chama nosso código; nosso código usa a engine.

**Objetivo didático:** Compreender a divisão entre game loop, scripts, componentes, input e física.

**Fala-guia:** Trate esta sala como a vertical slice #9. Mostre a engine chamando Update e FixedUpdate; compare exemplos de entrada antiga e moderna sem misturá-los.

**Intro no painel:** “Quem faz o jogo rodar?” — A engine organiza o loop, nossos scripts descrevem as regras e componentes aplicam os efeitos.

**Composição:** tema `programming`, cores provisórias e terminal em (340, 870); console em (940, 870); sign em (1540, 870). Hotspots ficam na área central do canvas 1920×1080; usar HUD/safe area em todas as resoluções.

**Reveal / objetivo:**

| Ordem | Hotspot | Coordenadas | Mensagem principal | Requisitos |
|---|---|---|---|---|
| 1 | Game Loop | (440, 495), r=105 | Input → Update → Render | — |
| 2 | MonoBehaviour | (960, 495), r=105 | Quem chama Update()? | — |
| 3 | FixedUpdate | (1480, 495), r=105 | Física tem outro ritmo | lifecycle |
| 4 | Componentes | (440, 780), r=105 | Compor em vez de monólito | — |
| 5 | Input System | (960, 780), r=105 | De onde vem o comando? | — |
| 6 | Rigidbody2D | (1480, 780), r=105 | Força não é teleporte | components, fixedupdate |

**Takeaway:** Input → Update → Física → Render → Feedback.

**Transição:** Com lógica funcionando, é hora de comunicar visualmente.

**Sprites planejados:** `player-code-demo`, `engine-diagram`, `physics-diagram`. **Eventos de áudio planejados:** `code-line-reveal`, `engine-ping`, `physics-hit`.

**Fallback:** E percorre revelações elegíveis; N/P troca sala, mesmo sem concluir objetivos. R zera apenas esta sala.

---

## 7. Arte (`room-07`, 00:50)

**Tese:** Arte transforma estados abstratos em comunicação visual.

**Objetivo didático:** Mostrar o pipeline de concept, sprites, animação e integração.

**Fala-guia:** Exiba primeiro um boneco retângulo; depois mostre sprite e animação com o mesmo movimento.

**Intro no painel:** “Como o jogo ganha forma?” — Arte não é só decoração: ela explica o que está acontecendo.

**Composição:** tema `art`, cores provisórias e sign em (340, 870); tree em (940, 870). Hotspots ficam na área central do canvas 1920×1080; usar HUD/safe area em todas as resoluções.

**Reveal / objetivo:**

| Ordem | Hotspot | Coordenadas | Mensagem principal | Requisitos |
|---|---|---|---|---|
| 1 | Conceito | (500, 615), r=133 | Silhueta reconhecível | — |
| 2 | Spritesheet | (960, 605), r=133 | Desenhos organizados | — |
| 3 | Animação + UI | (1430, 615), r=133 | Movimento que comunica | — |

**Takeaway:** Concept → Sprite → Animação → Engine.

**Transição:** Falta uma camada que sentimos mesmo de olhos fechados.

**Sprites planejados:** `concept-process`, `sprite-sheet-demo`. **Eventos de áudio planejados:** `art-swipe`.

**Fallback:** E percorre revelações elegíveis; N/P troca sala, mesmo sem concluir objetivos. R zera apenas esta sala.

---

## 8. Áudio (`room-08`, 00:50)

**Tese:** Som aumenta a clareza da ação e a sensação de resposta.

**Objetivo didático:** Demonstrar áudio como feedback e atmosfera, não mero enfeite.

**Fala-guia:** Compare o mesmo acontecimento silencioso e sonorizado; não dependa de volume alto no auditório.

**Intro no painel:** “Um jogo também é ouvido” — SFX, música e ambiência dão textura ao que o jogador faz.

**Composição:** tema `audio`, cores provisórias e speaker em (340, 870); console em (940, 870). Hotspots ficam na área central do canvas 1920×1080; usar HUD/safe area em todas as resoluções.

**Reveal / objetivo:**

| Ordem | Hotspot | Coordenadas | Mensagem principal | Requisitos |
|---|---|---|---|---|
| 1 | Efeitos sonoros | (500, 615), r=133 | Confirmação instantânea | — |
| 2 | Música e ambiência | (960, 605), r=133 | Ritmo e contexto | — |
| 3 | Evento → Mixer | (1430, 615), r=133 | O som vem de algum lugar | — |

**Takeaway:** O mesmo salto se sente diferente com som e feedback.

**Transição:** Vamos juntar código, física, arte e som numa única ação.

**Sprites planejados:** `waveform`, `audio-chain`. **Eventos de áudio planejados:** `sfx-ab-demo`, `ambient-loop`.

**Fallback:** E percorre revelações elegíveis; N/P troca sala, mesmo sem concluir objetivos. R zera apenas esta sala.

---

## 9. A física do pulo (`room-09`, 02:15)

**Tese:** Uma ação simples depende de múltiplas camadas coordenadas.

**Objetivo didático:** Explicar um salto de ponta a ponta, passando pelo código e sistemas da engine.

**Fala-guia:** Explique que o exemplo usa Input.GetKeyDown (legacy) por ser curto, e que o novo Input System usa ações/callbacks ou polling. Evite confundir Update e FixedUpdate.

**Intro no painel:** “O que acontece quando pulamos?” — Vamos seguir uma única ação do dispositivo até o frame exibido.

**Composição:** tema `jump`, cores provisórias e console em (340, 870); tree em (940, 870); sign em (1540, 870). Hotspots ficam na área central do canvas 1920×1080; usar HUD/safe area em todas as resoluções.

**Reveal / objetivo:**

| Ordem | Hotspot | Coordenadas | Mensagem principal | Requisitos |
|---|---|---|---|---|
| 1 | Intenção de pular | (400, 565), r=113 | Capturar no Update | — |
| 2 | Impulso físico | (760, 615), r=113 | Aplicar no FixedUpdate | intent |
| 3 | Gravidade e contato | (1150, 615), r=113 | Subir, parar, cair | force |
| 4 | Polish | (1530, 565), r=113 | De mecânica a experiência | gravity |

**Takeaway:** Input → intenção → FixedUpdate → Rigidbody2D → colisão → animação/som.

**Transição:** Agora podemos elevar o protótipo à experiência completa.

**Sprites planejados:** `jump-state-diagram`, `jump-fx`. **Eventos de áudio planejados:** `jump`, `land`, `polish-unlock`.

**Fallback:** E percorre revelações elegíveis; N/P troca sala, mesmo sem concluir objetivos. R zera apenas esta sala.

---

## 10. Do protótipo ao jogo (`room-10`, 01:05)

**Tese:** O primeiro protótipo prova uma ideia; o acabamento torna a experiência clara e atraente.

**Objetivo didático:** Sintetizar como diferentes disciplinas transformam uma mecânica em produto.

**Fala-guia:** Mostre a evolução em três etapas, sem transformar em uma demo longa de desenvolvimento.

**Intro no painel:** “O protótipo já é um jogo?” — Agora somamos regras, conteúdo, arte, feedback e testes.

**Composição:** tema `integration`, cores provisórias e console em (340, 870); door em (940, 870). Hotspots ficam na área central do canvas 1920×1080; usar HUD/safe area em todas as resoluções.

**Reveal / objetivo:**

| Ordem | Hotspot | Coordenadas | Mensagem principal | Requisitos |
|---|---|---|---|---|
| 1 | Protótipo | (500, 615), r=133 | Testar o coração do jogo | — |
| 2 | Integração | (960, 605), r=133 | Tudo conversa | — |
| 3 | Game Feel | (1430, 615), r=133 | O detalhe muda tudo | — |

**Takeaway:** Nenhuma disciplina cria o jogo sozinha.

**Transição:** Concluir, agradecer e abrir para perguntas.

**Sprites planejados:** `before-after-comparison`. **Eventos de áudio planejados:** `prototype-to-game`.

**Fallback:** E percorre revelações elegíveis; N/P troca sala, mesmo sem concluir objetivos. R zera apenas esta sala.

---

## 11. Quest Complete (`room-final`, 00:25)

**Tese:** Criar jogos é transformar sistemas em experiências que conseguimos sentir.

**Objetivo didático:** Reforçar a mensagem central e encerrar com Q&A.

**Fala-guia:** Agradeça, indique referências e convide perguntas. Não dependa do áudio para o fechamento.

**Intro no painel:** “Do Zero ao Jogo” — Criar jogos é unir regras, código, arte e som para provocar uma experiência.

**Composição:** tema `final`, cores provisórias e door em (340, 870); sign em (940, 870). Hotspots ficam na área central do canvas 1920×1080; usar HUD/safe area em todas as resoluções.

**Reveal / objetivo:**

| Ordem | Hotspot | Coordenadas | Mensagem principal | Requisitos |
|---|---|---|---|---|
| 1 | Quest Complete | (950, 590), r=133 | +100 XP — Thanks for Playing | — |

**Takeaway:** Quest Complete — obrigado por jogar.

**Transição:** Fim do roteiro. Q&A via Enter ou fala do apresentador (#30).

**Sprites planejados:** `quest-banner`, `credits`. **Eventos de áudio planejados:** `quest-complete`.

**Fallback:** E percorre revelações elegíveis; N/P troca sala, mesmo sem concluir objetivos. R zera apenas esta sala.

---

## Aceite da etapa de storyboard

- [x] 11 roteiros com durações/objetivos/reveals/posições/cues.
- [x] Fonte única TypeScript para room+copy+hotspots; renderer genérico.
- [x] Navegação e reset com progressão local à sala e fallback E.
- [x] Testes automatizados de cobertura, referências, ordem de unlock, 1920×1080 e 15 minutos.
- [ ] Room 6 com diagramas, código e juiciness final (#9).
- [ ] Assets/som reais (#25/#26).
- [ ] Testes visuais e de última fileira em projetor (#23).
- [ ] Ensaio de ritmo e revisão final de fontes (#31).
