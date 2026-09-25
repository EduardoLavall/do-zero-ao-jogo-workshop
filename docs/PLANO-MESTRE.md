# Workshop — Do Zero ao Jogo
## Plano Mestre — Slide Rooms

> Workshop: **Do Zero ao Jogo: Introdução ao Desenvolvimento de Games**  
> Duração alvo: **~15 minutos**  
> Formato: HTML/CSS/JavaScript, offline, interativo.  
> Conceito principal: **Slide Rooms** — a apresentação começa como slides e se transforma em uma sequência de salas 2D fixas, cada uma funcionando como um “slide jogável” em 16:9. O apresentador controla um personagem dentro da room e troca de sala atravessando as bordas laterais.

---

# 1. Objetivo

Responder de forma visual, técnica e interativa:

> **O que é necessário saber para desenvolver um jogo?**

Os quatro pilares principais são:

- Game Design
- Programação
- Arte
- Áudio

A história dos jogos entra apenas como contexto. O foco principal é **como jogos são projetados, programados e integrados**.

---

# 2. Conceito — Slide Rooms

> **Slide Rooms são salas temáticas interativas que substituem slides tradicionais por espaços navegáveis, onde o conteúdo da apresentação faz parte do cenário e é revelado através das ações do personagem.**

O personagem:

- se move horizontalmente seguindo o cursor do mouse;
- pula com o botão direito;
- atira flechas com o botão esquerdo;
- pode ter o controle ligado/desligado com o botão do meio;
- acerta painéis, ícones e nós;
- revela conteúdo;
- desbloqueia novas informações;
- abre portas para a próxima room.

A própria apresentação demonstra o tema: enquanto falamos de game design, código, arte, áudio, feedback e engines, o público está vendo essas mesmas disciplinas funcionando juntas.

---

# 3. Fluxo geral

```text
MENU INICIAL
   ↓
ROOM 1 — O que todos esses jogos têm em comum?
   ↓
ROOM 2 — Da brincadeira ao videogame
   ↓
ROOM 3 — Evolução digital e tecnologia
   ↓
ROOM 4 — O que é necessário para desenvolver um jogo?
   ↓
ROOM 5 — Game Design
   ↓
ROOM 6 — Programação / Engine
   ↓
ROOM 7 — Arte
   ↓
ROOM 8 — Áudio
   ↓
ROOM 9 — Sistema de pulo / integração
   ↓
ROOM 10 — Do protótipo ao jogo
   ↓
FINAL ROOM — Quest Complete / Créditos
```

---

# 4. Menu inicial

Tela estilo jogo 16-bit moderno:

```text
DO ZERO AO JOGO

Introdução ao Desenvolvimento de Games

PRESS ENTER TO BEGIN
```

Elementos:

- personagem em idle;
- cenário animado;
- título;
- som ambiente discreto;
- “Press Enter” piscando.

Ao apertar Enter, a apresentação tradicional “vira” a primeira Slide Room jogável.

---

# 5. Controles do player

O controle principal do personagem é feito **inteiramente com o mouse**.

## Movimento horizontal — mouse follow

O cursor define o alvo horizontal do personagem.

```text
cursor.x > player.x
→ player anda para a direita

cursor.x < player.x
→ player anda para a esquerda

cursor.x ≈ player.x
→ player para e entra em idle
```

O player deve se mover até aproximar seu X do X do cursor dentro de uma pequena tolerância/dead zone, evitando jitter.

### Comportamento esperado

- cursor à direita → animação/movimento para direita;
- cursor à esquerda → animação/movimento para esquerda;
- cursor alinhado → velocidade horizontal zero + idle;
- o personagem deve olhar para a direção do movimento/alvo quando fizer sentido.

## Botões do mouse

- **Botão esquerdo** → atirar flecha;
- **Botão direito** → pular;
- **Botão do meio** → toggle do controle do player ON/OFF.

## Toggle de controle

Quando o controle estiver **OFF**:

- o player para de seguir o cursor;
- cliques não devem mover o personagem;
- a apresentação continua utilizável;
- o estado ON/OFF deve possuir feedback visual discreto no HUD.

Quando voltar para **ON**, o player volta a seguir o cursor normalmente.

## Controles de apresentação / fallback

O teclado continua existindo apenas como fallback da apresentação:

- Enter → confirmar/iniciar;
- ESC → fechar overlay;
- F → fullscreen;
- N / P → próxima/anterior room;
- R → reset da room.

O personagem não pode morrer, cair ou travar a apresentação.

---

# 6. Mecânica da flecha

```text
Left click
↓
resolve hotspot
↓
personagem mira
↓
Arrow spawn
↓
Arrow travel
↓
Hit target
↓
Impact FX
↓
Reveal
```

Quando um alvo é atingido:

- toca um som curto;
- partículas aparecem;
- glow destaca o objeto;
- painel/diagrama/código é revelado;
- objetivo pode ser marcado como concluído.

A flecha deve possuir aim assist para sempre acertar hotspots válidos.

Importante: o clique esquerdo serve para atirar, não para movimentar diretamente o player. O movimento vem continuamente da posição X do cursor.

---

# 7. Identidade visual

**8-bit / 16-bit + pixel art moderna + motion suave**

Misturar:

- sprites pixelados;
- HUD de RPG;
- caixas de diálogo;
- skill trees;
- parallax;
- glow sutil;
- partículas;
- animações modernas com easing;
- CRT apenas de forma muito leve.

Princípio:

> **aparência retro, comportamento moderno.**

---

# 8. Room 1 — O que todos esses jogos têm em comum?

Galeria com jogos populares:

- Minecraft
- Counter-Strike 2
- Super Mario
- GTA
- Stardew Valley
- Fortnite
- Balatro
- Elden Ring

Pergunta:

> **O que todos esses jogos têm em comum?**

Conforme a plateia responde, flechas revelam:

- regras;
- interação;
- feedback;
- objetivos;
- desafio;
- escolhas.

Resultado:

```text
JOGO
=
REGRAS
+
INTERAÇÃO
+
FEEDBACK
```

---

# 9. Room 2 — Da brincadeira ao videogame

Uma única room condensa o bloco histórico.

Etapas:

1. brincadeira em animais;
2. brincadeira → regras → jogo;
3. Senet / Royal Game of Ur;
4. Tennis for Two;
5. Spacewar!;
6. Pong;
7. linha rápida de consoles.

Pergunta rápida:

> **Qual foi o primeiro console de vocês?**

A história deve consumir pouco tempo.

---

# 10. Room 3 — Evolução digital e tecnologia

Comparar visualmente:

```text
Pong / Spacewar!
        ↓
jogos modernos
```

Revelar:

- CPU;
- GPU;
- memória;
- armazenamento;
- redes;
- áudio;
- ferramentas;
- engines.

Mensagem:

> **Games não só acompanharam a evolução da computação; muitas vezes pressionaram seus limites.**

Exemplo curto:

```text
Games
↓
gráficos 3D
↓
GPU
↓
computação paralela
↓
IA / ciência / simulação
```

---

# 11. Room 4 — Hub central

Pergunta principal:

> **O que vocês acham que é necessário saber para desenvolver um jogo?**

Quatro áreas aparecem gradualmente:

```text
                GAME DESIGN
                     │
ARTE ─────── DESENVOLVIMENTO ─────── PROGRAMAÇÃO
                     │
                   ÁUDIO
```

Essa room funciona como hub conceitual do workshop.

---

# 12. Room 5 — Game Design

Skill tree expansível.

Primeiro nível:

- Mecânicas
- Regras
- Objetivos

Segundo nível:

- Core Loop
- Progressão
- Balanceamento

Terceiro nível:

- Level Design
- Playtesting
- Iteração

Pergunta:

> **O que o jogador faz, por que ele faz e por que isso é interessante?**

Exemplo Minecraft:

```text
Explorar
↓
Coletar
↓
Construir
↓
Melhorar
↺
```

Playtest:

```text
Protótipo
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

# 13. Room 6 — Programação e Engine

Esta é uma das rooms mais técnicas.

Painéis principais:

- Game Loop;
- Player Loop;
- lifecycle;
- Input;
- Components;
- Rigidbody2D;
- Physics;
- Engine internals.

Pergunta:

> **Como fazemos as regras acontecerem no computador?**

---

# 14. Game Loop

Modelo conceitual:

```csharp
while (gameRunning) {
    processInput();
    update();
    render();
}
```

Visual:

```text
INPUT
↓
UPDATE
↓
RENDER
↺
```

Mostrar também:

```text
60 FPS ≈ 16,67 ms/frame
```

Cada frame possui um orçamento de tempo.

---

# 15. MonoBehaviour e lifecycle

Começar pelo script clássico:

```csharp
using UnityEngine;

public class Example : MonoBehaviour
{
    void Start()
    {
    }

    void Update()
    {
    }
}
```

Pergunta:

> **Quem chama essas funções?**

Resposta:

> **A Unity.**

A engine controla o Player Loop e chama os callbacks do script.

Principais callbacks do workshop:

- Awake
- Start
- Update
- FixedUpdate
- LateUpdate

---

# 16. Start / Update / FixedUpdate / LateUpdate

## Start

Executado uma vez antes do primeiro Update do script.

## Update

Chamado uma vez por frame renderizado.

```text
FRAME 1   FRAME 2   FRAME 3
   │         │         │
Update    Update    Update
```

Update não possui frequência fixa.

## FixedUpdate

Executado em timestep fixo, usado principalmente com física.

Valor padrão:

```text
Time.fixedDeltaTime = 0.02 s
≈ 50 Hz
```

## LateUpdate

Executado depois de Update naquele frame.

Exemplo clássico: câmera seguindo jogador.

---

# 17. “Ticks” na Unity

Evitar explicar Unity como se tivesse um único tick.

Forma didática:

```text
UNITY PLAYER LOOP
│
├── Input processing
├── FixedUpdate / Physics
├── Update
├── Animation
├── LateUpdate
├── Rendering
└── outros subsistemas
```

Mensagem:

> **O frame é uma iteração do grande loop da engine, mas nem todos os sistemas atualizam no mesmo ritmo.**

---

# 18. Update vs FixedUpdate

Visual:

```text
RENDER / UPDATE
|----|--|------|---|-----|
 U    U    U      U

PHYSICS / FIXED UPDATE
|-----|-----|-----|-----|
 F     F     F     F
```

Um frame pode ter zero, um ou vários passos físicos dependendo do timing.

O timestep fixo ajuda a manter a simulação física consistente entre diferentes frame rates.

---

# 19. Input — por trás dos panos

Pergunta:

> **Quando apertamos Space, existe algum if da Unity rodando infinitamente esperando a tecla?**

Explicação de alto nível:

```text
TECLADO / MOUSE
↓
Sistema Operacional / Driver
↓
Unity Runtime
↓
fila de eventos de input
↓
Input System processa eventos
↓
estado/actions ficam disponíveis
↓
gameplay reage
```

No Input System moderno, eventos dos dispositivos são processados pela engine e o gameplay pode usar polling ou callbacks/actions.

---

# 20. Polling vs callback

## Polling

```csharp
void Update()
{
    if (Keyboard.current.spaceKey.wasPressedThisFrame)
    {
        Jump();
    }
}
```

Mentalidade:

> “Space foi pressionado neste frame?”

## Callback / Input Action

```text
Jump Action
↓
performed
↓
Jump()
```

Mentalidade:

> “Quando essa ação acontecer, me avise.”

Para exemplos simples, pode-se usar `Input.GetKeyDown`, explicando que ele pertence ao sistema legacy.

---

# 21. Components

Personagem composto por:

```text
PLAYER
│
├── Transform
├── SpriteRenderer
├── Rigidbody2D
├── CapsuleCollider2D
├── Animator
├── AudioSource
└── PlayerController.cs
```

Mensagem:

> **Um personagem não é uma classe gigante. É uma composição de sistemas.**

---

# 22. Component / Behaviour / MonoBehaviour

Modelo simplificado:

```text
Component
│
├── Rigidbody2D
└── Behaviour
    └── MonoBehaviour
        └── PlayerController.cs
```

- Component → anexado a GameObject;
- Behaviour → Component que pode ser habilitado/desabilitado;
- MonoBehaviour → base típica de scripts de gameplay.

---

# 23. Rigidbody2D

Adicionar Rigidbody2D significa:

> **este objeto participa da simulação física 2D.**

Propriedades importantes:

- bodyType;
- mass;
- gravityScale;
- linearVelocity;
- angularVelocity;
- damping.

Operações:

- AddForce;
- alteração de velocidade;
- integração com colliders e física.

Body Types:

- Dynamic
- Kinematic
- Static

---

# 24. Rigidbody2D vs Collider2D

```text
Rigidbody2D
=
COMO o objeto se move fisicamente

Collider2D
=
QUAL forma participa das colisões
```

Mensagem:

> **Rigidbody não é a hitbox.**

---

# 25. Quem chama quem?

```text
          UNITY ENGINE
         ↙            ↘
 callbacks            APIs
    ↓                  ↑
Awake/Update       GetComponent
FixedUpdate        AddForce
Collision          Play
    ↓                  ↑
          SCRIPT
```

Mensagem:

> **A engine chama nosso código e nosso código chama APIs da engine.**

Para uma plateia de software:

> **MonoBehaviour é uma forma de plugar nossa lógica no loop da engine — inversão de controle aplicada ao game loop.**

---

# 26. Room 7 — Arte

Pipeline 2D:

```text
Concept
↓
Sprite
↓
Spritesheet
↓
Animation
↓
Engine
```

Pipeline 3D:

```text
Concept
↓
Model
↓
UV
↓
Texture
↓
Rig
↓
Animation
↓
Engine
```

Subáreas:

- concept;
- sprite/model;
- animação;
- UI;
- VFX;
- iluminação.

---

# 27. Room 8 — Áudio

Subáreas:

- música;
- SFX;
- ambiência;
- voz;
- feedback.

Evento simples:

```text
player_jump
↓
PlayerController
↓
AudioSource
↓
Audio Mixer
↓
Output
```

Demonstrar uma mesma ação sem áudio e depois com áudio/feedback.

---

# 28. Room 9 — Sistema de pulo

Mini-aula técnica aplicando tudo.

Pergunta:

> **O que precisa acontecer para um personagem pular?**

---

# 29. Script de pulo

```csharp
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [SerializeField] float jumpForce = 8f;

    Rigidbody2D rb;
    bool jumpRequested;

    void Awake()
    {
        rb = GetComponent<Rigidbody2D>();
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            jumpRequested = true;
        }
    }

    void FixedUpdate()
    {
        if (jumpRequested)
        {
            rb.AddForce(
                Vector2.up * jumpForce,
                ForceMode2D.Impulse
            );

            jumpRequested = false;
        }
    }
}
```

Objetivo do código:

- Update registra intenção;
- FixedUpdate aplica física;
- Rigidbody2D recebe impulso;
- Physics2D simula resultado.

---

# 30. Fluxo completo do pulo

```text
SPACE DOWN
↓
evento do dispositivo
↓
Unity processa Input
↓
Update()
↓
jumpRequested = true
↓
FixedUpdate()
↓
AddForce()
↓
Rigidbody2D
↓
Physics2D
↓
Transform muda
↓
Renderer
↓
novo frame na tela
```

Esse deve ser um dos principais diagramas técnicos do workshop.

---

# 31. AddForce — por trás dos panos

```csharp
rb.AddForce(
    Vector2.up * jumpForce,
    ForceMode2D.Impulse
);
```

Visual:

```text
Vector2.up
×
jumpForce
↓
AddForce
↓
Rigidbody2D
↓
Physics2D
↓
massa / gravidade / velocity / collisions
↓
novo estado físico
```

Mensagem:

> **O script descreve a intenção. A engine resolve a simulação.**

---

# 32. Subida, gravidade e queda

```text
(0, 8)
↓
(0, 4)
↓
(0, 0)
↓
(0, -4)
↓
(0, -9)
```

Usar para explicar `linearVelocity` e gravidade.

Painel de `gravityScale`:

```text
0  → flutua
1  → normal
3  → cai rápido
10 → tijolo intercontinental
```

---

# 33. Colisão com chão

```text
Player
├── Rigidbody2D
└── CapsuleCollider2D

Ground
└── BoxCollider2D
```

Fluxo:

```text
queda
↓
colliders se encontram
↓
Physics2D detecta contato
↓
resolve colisão
↓
player fica no chão
```

---

# 34. Transform vs Rigidbody

Movimento direto:

```csharp
transform.position += Vector3.up;
```

> “Coloque o objeto aqui.”

Física:

```csharp
rb.AddForce(...);
```

> “Aplique esta influência e deixe a engine simular.”

---

# 35. O pulo não é só física

Depois do pulo funcionar, desbloquear:

- Animator
- AudioSource
- ParticleSystem
- Camera

Fluxo:

```text
Jump()
│
├── Rigidbody2D → força
├── Animator → animação
├── AudioSource → jump.wav
└── Particles → poeira
```

Mensagem:

> **A mecânica é pular. A experiência é a soma dos sistemas.**

---

# 36. Room 10 — Do protótipo ao jogo

Mesmo protótipo evolui:

1. movimento;
2. objetivo;
3. regras;
4. inimigo;
5. arte;
6. animação;
7. áudio;
8. UI;
9. VFX;
10. game feel.

Mensagem:

> **Nenhuma disciplina cria o jogo sozinha.**

---

# 37. Final Room

Tela:

```text
QUEST COMPLETE

DO ZERO AO JOGO

+100 XP

THANKS FOR PLAYING
```

Depois, créditos estilo jogo.

Pode conter:

- título;
- apresentador;
- referências;
- tecnologias;
- QR code;
- agradecimentos.

Final:

```text
PRESS ENTER FOR Q&A
```

---

# 38. Timing aproximado

| Room | Tempo |
|---|---:|
| Menu | 0:20 |
| Room 1 | 0:50 |
| Room 2 | 1:20 |
| Room 3 | 0:50 |
| Room 4 | 0:40 |
| Room 5 | 2:00 |
| Room 6 | 2:20 |
| Room 7 | 0:50 |
| Room 8 | 0:50 |
| Room 9 | 3:00 |
| Room 10 | 1:20 |
| Final | 0:40 |

Total alvo: **~15 min**.

---

# 39. Arquitetura técnica dos slides

## Modelo espacial

Cada Slide Room usa um **canvas lógico de 1920×1080 (16:9)**, escalado responsivamente para caber no navegador/projetor mantendo a proporção.

```text
ROOM N
[← exit | conteúdo + hotspots | exit →]
```

A câmera não acompanha o player. Quando ele cruza uma exit zone lateral, o PresentationController troca de room e o player reaparece no lado oposto da nova tela.

Esse modelo prioriza composição previsível, legibilidade em projetor e comportamento de “slide jogável”. O layout é desenhado em coordenadas lógicas 1920×1080 e escalado com `Phaser.Scale.FIT`, evitando layout percentual solto para elementos de gameplay.

Usar uma safe area interna para conteúdo essencial, deixando margem visual nas bordas para HUD, exits e variações de viewport.

Recomendação:

## World layer
- personagem;
- cenário;
- flechas;
- partículas;
- objetos.

## Content layer
- HTML/SVG;
- textos;
- diagramas;
- código;
- skill trees.

## UI layer
- HUD;
- objetivos;
- menus;
- progresso.

---

# 40. Regras de implementação

- cada clique deve revelar uma ideia;
- personagem não pode bloquear a apresentação;
- controle principal do player é via mouse;
- teclado é fallback da apresentação, não navegação principal do player;
- botão esquerdo atira, direito pula e botão do meio liga/desliga o controle;
- sempre existir fallback de teclado para navegação da apresentação;
- conteúdo técnico deve ter **conceito → exemplo → diagrama → código → efeito no jogo**;
- história deve ser curta;
- se houver disputa de tempo, ganha o conteúdo técnico;
- Unity + C# são a referência técnica principal;
- outras engines entram apenas como comparações rápidas;
- a apresentação deve funcionar offline.

---

# 41. Regra de ouro

> **Isso ajuda a entender como jogos são pensados ou desenvolvidos?**

Se não, cortar.

Frase final:

> **Criar um jogo é transformar regras, código, arte e som em uma experiência que alguém consegue sentir.**
