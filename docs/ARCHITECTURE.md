# Arquitetura — Slide Rooms

## Objetivo

Manter a experiência simples o bastante para ser compreendida por uma IA e confiável o bastante para uma apresentação ao vivo.

---

# Camadas

## 1. Game World — Phaser

Responsável por:

- Player
- Arrow
- Hotspots espaciais
- Rooms
- Camera fixa por room
- Physics
- Tweens
- Particles
- Audio

## 2. Presentation Core — TypeScript puro

Responsável por:

- room atual;
- estado de revelações;
- objetivos completos;
- progressão;
- comandos de próxima/anterior/reset;
- regras de unlock.

Não deve depender diretamente de elementos DOM.

## 3. Presentation UI — DOM/CSS

Responsável por:

- HUD;
- títulos;
- conteúdo textual;
- código;
- overlays;
- créditos;
- menu inicial;
- Q&A.

---

# Fluxo principal

```text
Mouse / Presentation fallback
  ↓
InputController
  ↓
Player / PresentationController
  ↓
HotspotSystem
  ↓
PresentationState
  ↓
Reveal event
  ├── Phaser world reaction
  └── DOM content reaction
```

---

# InputController — contrato principal

O player é **mouse-driven**.

O `InputController` deve traduzir o mouse em intenções de gameplay explícitas:

```text
pointer.x
↓
targetWorldX
↓
moveLeft / moveRight / idle
```

Botões:

```text
Left Button   → shoot
Right Button  → jump
Middle Button → toggle player control
```

Não espalhar leitura direta de mouse por entidades e rooms. O player deve receber intenções/estado do `InputController`.

## Mouse follow no eixo X

Regra:

```text
targetX > playerX + deadZone
→ move right

targetX < playerX - deadZone
→ move left

abs(targetX - playerX) <= deadZone
→ stop / idle
```

Usar coordenadas de mundo da room atual. A câmera é fixa, mas o contrato continua em world coordinates para manter o input desacoplado de screen-space.

A `deadZone` evita jitter quando cursor e player ficam praticamente alinhados.

## Toggle de controle

O `InputController` mantém:

```ts
playerControlEnabled: boolean
```

Quando `false`:

- movimento por cursor fica desabilitado;
- jump e shoot do player também devem ser ignorados, salvo decisão explícita futura;
- fallback de apresentação continua funcionando;
- UI recebe evento/estado para exibir feedback de controle desativado.

---

# Estrutura alvo

```text
src/
├── main.ts
├── game/
│   ├── config.ts
│   ├── PresentationScene.ts
│   ├── entities/
│   │   ├── Player.ts
│   │   └── Arrow.ts
│   ├── systems/
│   │   ├── InputController.ts
│   │   ├── HotspotSystem.ts
│   │   └── RoomWorld.ts
│   └── types.ts
├── presentation/
│   ├── PresentationController.ts
│   ├── PresentationState.ts
│   ├── roomRegistry.ts
│   └── types.ts
├── ui/
│   ├── HudController.ts
│   ├── OverlayController.ts
│   └── CreditsController.ts
├── rooms/
│   ├── room-01.ts
│   ├── room-02.ts
│   └── ...
└── styles/
    ├── base.css
    ├── hud.css
    └── overlays.css
```

---

# Modelo de Slide Rooms

Cada room usa um **canvas lógico 16:9 de 1920×1080**, escalado responsivamente para caber no viewport.

Não existe sidescroller contínuo como modelo principal. A câmera permanece fixa enquanto o player se move dentro da room atual.

```text
ROOM A (1920×1080 lógico)
[player ......................... →]
                         cruza borda direita
                                  ↓
                             nextRoom()
                                  ↓
ROOM B (1920×1080 lógico)
[← player ........................]
```

Regras:
- câmera fixa;
- uma room por viewport;
- resolução lógica 1920×1080;
- scaling responsivo com `Phaser.Scale.FIT`;
- manter proporção 16:9;
- nunca reposicionar conteúdo principal com layout percentual solto;
- usar safe area interna para textos, hotspots e elementos essenciais;
- sair pela direita → próxima room;
- sair pela esquerda → room anterior;
- player reaparece pela borda oposta;
- transição visual simples pode usar fade;
- transição deve possuir lock para evitar double-trigger;
- primeira/última room respeitam os limites do registry.

# Navegação

Gameplay:
- movimento horizontal seguindo cursor;
- botão direito pula;
- botão esquerdo atira;
- botão do meio ativa/desativa controle;
- exit zones laterais controlam troca de room.

Fallback de apresentação:
- próxima/anterior room;
- reset;
- jump direto para room por debug/dev.

A progressão visual pode exigir objetivos, mas fallback de apresentação nunca deve ser bloqueado.

---

# Hotspots

Hotspot não é necessariamente um objeto físico.

Ele é um alvo interativo com:

- posição;
- área de seleção;
- reveal associado;
- estado locked/unlocked/revealed.

Aim assist resolve o hotspot mais próximo do clique esquerdo dentro de uma tolerância.

Importante: o mesmo pointer controla o target X do personagem e a mira. Atirar não deve criar efeitos colaterais indesejados no movimento; o player continua usando o X do cursor como alvo de movimento.

---

# Conteúdo e render

Conteúdo longo permanece em DOM.

Exemplo:

```text
Arrow hits Rigidbody hotspot
        ↓
PresentationController.reveal("rigidbody")
        ↓
Phaser: glow + impact
DOM: abre painel Rigidbody2D
HUD: objective complete
```

---

# Estado

Ter uma única fonte de verdade para progressão da apresentação.

Não armazenar estado crítico apenas em:
- sprite visibility;
- classes CSS;
- variáveis soltas em rooms.

---

# Eventos

Preferir eventos explícitos pequenos:

- `room:entered`
- `room:completed`
- `hotspot:revealed`
- `objective:completed`
- `presentation:next`
- `presentation:reset`
- `player-control:changed`

Evitar event bus genérico usado para tudo sem tipagem.

---

# MVP técnico

O primeiro marco precisa funcionar apenas com retângulos:

- tela inicial;
- Enter;
- player placeholder;
- mouse-follow horizontal;
- idle ao alinhar com cursor;
- botão direito para pular;
- botão esquerdo para atirar;
- botão do meio para toggle de controle;
- câmera fixa;
- duas rooms fixas 16:9 com canvas lógico 1920×1080;
- exit zones esquerda/direita;
- transição entre rooms;
- hotspot;
- flecha;
- reveal;
- HUD;
- porta;
- próxima room;
- fallback;
- reset.

Nenhuma arte final é necessária para validar a arquitetura.
