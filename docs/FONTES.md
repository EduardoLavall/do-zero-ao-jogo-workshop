# Fontes e Referências — Do Zero ao Jogo

> Documento de apoio do workshop **Do Zero ao Jogo: Introdução ao Desenvolvimento de Games**.
> Aqui ficam reunidas as fontes usadas para embasar os slides, exemplos técnicos, fatos históricos e conceitos de game development.

---

# 1. Comportamento lúdico e origem do brincar

## Mammalian play: training for the unexpected
Špinka, Newberry & Bekoff — *Animal Behaviour* (2001)

Discussão sobre a hipótese de que a brincadeira ajuda animais a desenvolver flexibilidade comportamental e lidar com situações inesperadas.

https://pubmed.ncbi.nlm.nih.gov/11409050/

## The neurobiology of social play behaviour: Past, present and future
Achterberg & Vanderschuren — *Neuroscience & Biobehavioral Reviews* (2023)

Revisão sobre bases e funções da brincadeira social.

https://pubmed.ncbi.nlm.nih.gov/37454882/

## A review of interspecific social play among nonhuman animals
Brooks & Burghardt (2023)

Revisão sobre brincadeira social entre espécies diferentes.

https://pubmed.ncbi.nlm.nih.gov/37182799/

---

# 2. Jogos antigos

## Metropolitan Museum of Art — Board Games from Ancient Egypt and the Near East

Referência sobre Senet e outros jogos de tabuleiro antigos.

https://www.metmuseum.org/essays/board-games-from-ancient-egypt-and-the-near-east

## British Museum — Royal Game of Ur

Página de acervo do Royal Game of Ur.

https://www.britishmuseum.org/collection/object/W_1928-1009-378

## British Museum — Historical board games

Material introdutório sobre jogos históricos.

https://www.britishmuseum.org/blog/top-10-historical-board-games

---

# 3. História dos videogames

## Computer History Museum — Graphics & Games Timeline

Linha do tempo sobre computação gráfica e jogos digitais.

https://www.computerhistory.org/timeline/graphics-games/

## Computer History Museum — Spacewar!

Material histórico sobre Spacewar! e o PDP-1.

https://www.computerhistory.org/pdp-1/spacewar/

## Computer History Museum — Pong

Material histórico relacionado ao Pong e à Atari.

https://www.computerhistory.org/tdih/november/29/

## Smithsonian — Video Game History

Material histórico cobrindo os primeiros experimentos, Ralph Baer, Odyssey, Pong, Atari e NES.

https://www.si.edu/spotlight/the-father-of-the-video-game-the-ralph-baer-prototypes-and-electronic-games/video-game-history

## The Strong National Museum of Play — Video Game History Timeline

Linha do tempo de videogames por décadas.

https://www.museumofplay.org/video-game-history-timeline/

## The Strong — Console Central

História visual de consoles domésticos.

https://www.museumofplay.org/exhibit/console-central/

---

# 4. Relação entre games e evolução da computação

## Computer History Museum — Graphics

Material sobre evolução de hardware, memória, displays e computação gráfica.

https://www.computerhistory.org/brochures/graphics/

## NVIDIA — Corporate Timeline

Material histórico da NVIDIA, evolução de GPUs e expansão da computação paralela.

https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/

## NVIDIA — AI Computing

Material institucional sobre GPUs, computação paralela e IA.

https://www.nvidia.com/pt-br/about-nvidia/ai-computing/

> Observação: usar com cautela em afirmações históricas amplas, pois é fonte institucional da própria empresa.

---

# 5. Game Design

## MIT OpenCourseWare — Introduction to Game Design Methods

Curso introdutório cobrindo:
- mecânicas;
- prototipagem;
- playtesting;
- iteração.

https://ocw.mit.edu/courses/cms-301-introduction-to-game-design-methods-spring-2016/

## MIT Education — Introduction to Game Design

Visão geral de métodos e fundamentos de game design.

https://education.mit.edu/course/11-126x-introduction-to-game-design/

## MDA Framework

Hunicke, LeBlanc & Zubek — *MDA: A Formal Approach to Game Design and Game Research*

Referência para:

- Mechanics
- Dynamics
- Aesthetics

https://www.cs.northwestern.edu/~hunicke/MDA.pdf

---

# 6. Game Loop e arquitetura de jogos

## Game Programming Patterns — Game Loop

Explicação conceitual de game loop.

https://gameprogrammingpatterns.com/game-loop.html

Modelo simplificado usado no workshop:

```text
Input
↓
Update
↓
Render
↺
```

---

# 7. Unity — base técnica da apresentação

A Unity será usada como referência prática principal para explicar:

- GameObjects;
- Components;
- MonoBehaviour;
- lifecycle;
- Player Loop;
- Rigidbody2D;
- Collider2D;
- Input;
- física;
- scripts de gameplay.

## Unity Manual / Scripting API

Documentação principal:

https://docs.unity3d.com/

---

# 8. Unity — MonoBehaviour

## MonoBehaviour

Classe base típica para scripts de gameplay.

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.html

## Awake

Callback executado durante inicialização do componente.

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.Awake.html

## Start

Callback executado antes do primeiro Update, desde que o componente esteja habilitado.

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.Start.html

## Update

Chamado uma vez por frame enquanto o MonoBehaviour está habilitado.

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.Update.html

## FixedUpdate

Callback associado ao timestep fixo, normalmente usado em lógica física.

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.FixedUpdate.html

## LateUpdate

Executado depois de Update no frame.

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.LateUpdate.html

---

# 9. Unity — Time e timestep

## Time.fixedDeltaTime

Intervalo em segundos entre updates físicos.

Valor padrão comum:

```text
0.02 s
≈ 50 Hz
```

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Time-fixedDeltaTime.html

---

# 10. Unity — Rigidbody2D

## Rigidbody2D

Componente principal para física 2D.

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rigidbody2D.html

## Rigidbody2D.bodyType

Tipos:

- Dynamic
- Kinematic
- Static

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rigidbody2D-bodyType.html

## Rigidbody2D.AddForce

Aplica força ao Rigidbody2D.

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rigidbody2D.AddForce.html

## Rigidbody2D.linearVelocity

Velocidade linear do corpo.

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rigidbody2D-linearVelocity.html

## Rigidbody2D.gravityScale

Escala de gravidade aplicada ao corpo.

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rigidbody2D-gravityScale.html

---

# 11. Unity — Collider2D

## Collider2D

Base para componentes de colisão 2D.

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Collider2D.html

Conceito usado no workshop:

```text
Rigidbody2D
=
como o objeto participa da simulação

Collider2D
=
qual forma participa dos contatos/colisões
```

---

# 12. Unity — GetComponent

## Component.GetComponent

Busca um componente associado ao mesmo GameObject.

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Component.GetComponent.html

Exemplo:

```csharp
rb = GetComponent<Rigidbody2D>();
```

---

# 13. Unity — Input

## Legacy Input Manager

Exemplo simples:

```csharp
Input.GetKeyDown(KeyCode.Space)
```

Documentação:

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Input.GetKeyDown.html

Usar no workshop principalmente por clareza visual.

## Input System moderno

Pacote atual da Unity para:
- dispositivos;
- controls;
- actions;
- bindings;
- callbacks.

Documentação:

https://docs.unity3d.com/Packages/com.unity.inputsystem@latest

## Events do Input System

Material sobre eventos de input e processamento do runtime.

https://docs.unity3d.com/Packages/com.unity.inputsystem@latest/manual/Events.html

---

# 14. Unity — Player Loop / Order of Execution

## Order of Execution for Event Functions

Referência sobre a ordem geral dos callbacks e subsistemas da Unity.

https://docs.unity3d.com/Manual/ExecutionOrder.html

Usar para embasar:
- Awake;
- Start;
- FixedUpdate;
- Update;
- LateUpdate;
- física;
- render.

> O diagrama mostrado no workshop será propositalmente simplificado.

---

# 15. Unity — GameObject e Components

## GameObject

https://docs.unity3d.com/Manual/GameObjects.html

## Components

https://docs.unity3d.com/Manual/Components.html

Conceito principal:

```text
PLAYER
│
├── Transform
├── SpriteRenderer
├── Rigidbody2D
├── Collider2D
├── Animator
├── AudioSource
└── PlayerController
```

---

# 16. Unity — Rendering / SpriteRenderer

## SpriteRenderer

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/SpriteRenderer.html

Usado como exemplo simples da separação entre:
- estado do objeto;
- física;
- renderização.

---

# 17. Unity — Animator

## Animator

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Animator.html

## Animator.SetTrigger

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Animator.SetTrigger.html

Exemplo conceitual:

```csharp
animator.SetTrigger("Jump");
```

---

# 18. Unity — AudioSource

## AudioSource

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AudioSource.html

## PlayOneShot

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/AudioSource.PlayOneShot.html

Exemplo:

```csharp
audioSource.PlayOneShot(jumpSound);
```

---

# 19. Unity — ParticleSystem

## ParticleSystem

https://docs.unity3d.com/6000.0/Documentation/ScriptReference/ParticleSystem.html

Usado no workshop como exemplo de VFX/feedback visual.

---

# 20. Godot — referência comparativa

Não será a base técnica, mas pode aparecer como comparação rápida.

## Key concepts — Nodes and Scenes

https://docs.godotengine.org/en/stable/getting_started/introduction/key_concepts_overview.html

Comparação conceitual:

```text
Unity
GameObject + Components

Godot
Node + Scene
```

---

# 21. Unreal Engine — referência comparativa

## Actors and Components

https://dev.epicgames.com/documentation/en-us/unreal-engine/actors-and-geometry-in-unreal-engine

Comparação:

```text
Unity
GameObject + Components

Unreal
Actor + Components
```

---

# 22. Arte e pipeline

## Unity Learn — Creative Core

Material introdutório sobre:
- animação;
- materiais;
- iluminação;
- VFX;
- áudio.

https://learn.unity.com/pathway/creative-core

---

# 23. Level Design

## GDC Vault

Material geral de conferências e talks sobre level design.

https://www.gdcvault.com/

Temas relevantes para pesquisa futura:

- flow;
- pacing;
- readability;
- player guidance;
- encounter design.

---

# 24. Playtesting e prototipagem

Principal referência:

MIT OpenCourseWare — Introduction to Game Design Methods

https://ocw.mit.edu/courses/cms-301-introduction-to-game-design-methods-spring-2016/

Loop usado na apresentação:

```text
Prototipar
↓
Jogar
↓
Observar
↓
Ajustar
↓
Repetir
```

---

# 25. Assuntos ainda pendentes de pesquisa

## Game Design
- [ ] aprofundar definição de mecânica;
- [ ] diferença entre mechanic / dynamic / aesthetic;
- [ ] exemplos de core loop em jogos populares;
- [ ] level design;
- [ ] progressão;
- [ ] balanceamento;
- [ ] game feel.

## Programação
- [ ] Player Loop da Unity em mais detalhe;
- [ ] processamento de input no runtime;
- [ ] timestep fixo;
- [ ] interpolation;
- [ ] colisão e resolução de contatos;
- [ ] state machines;
- [ ] IA clássica;
- [ ] NavMesh;
- [ ] asset loading;
- [ ] rendering pipeline em nível introdutório.

## Arte
- [ ] pipeline real 2D;
- [ ] pipeline real 3D;
- [ ] spritesheets;
- [ ] rigging;
- [ ] animation states;
- [ ] shaders;
- [ ] VFX.

## Áudio
- [ ] adaptive music;
- [ ] spatial audio;
- [ ] mixers;
- [ ] event-driven audio;
- [ ] feedback sonoro.

## História
- [ ] revisar datas finais usadas nos slides;
- [ ] revisar licenças/direitos de imagens;
- [ ] encontrar imagens em boa resolução;
- [ ] atribuições necessárias.

---

# 26. Regra para novas fontes

Ao adicionar uma informação ao workshop:

1. preferir documentação oficial;
2. preferir material acadêmico ou museus para história;
3. guardar URL original;
4. anotar exatamente qual fato/conceito a fonte sustenta;
5. evitar depender de blogs quando houver documentação primária;
6. marcar fontes institucionais/comerciais quando houver possível viés;
7. separar claramente simplificação didática de comportamento técnico exato.

---

# 27. Observação sobre simplificações

Vários diagramas do workshop serão simplificações pedagógicas.

Exemplo:

```text
Input
↓
Update
↓
Physics
↓
Render
```

não representa literalmente toda a ordem e todos os subsistemas internos da Unity.

Sempre que necessário, usar a indicação:

> **diagrama simplificado**

O objetivo é ensinar o modelo mental correto sem transformar uma introdução de 15 minutos em uma aula de engine internals.
