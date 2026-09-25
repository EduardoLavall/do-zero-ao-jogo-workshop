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
- Camera
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
Input
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

# Estrutura alvo

```text
src/
├── main.ts
├── game/
│   ├── config.ts
│   ├── GameScene.ts
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

# Modelos de dados

## RoomDefinition

```ts
interface RoomDefinition {
  id: string;
  title: string;
  width: number;
  objectives: ObjectiveDefinition[];
  hotspots: HotspotDefinition[];
}
```

## HotspotDefinition

```ts
interface HotspotDefinition {
  id: string;
  x: number;
  y: number;
  radius: number;
  revealId: string;
  required?: string[];
}
```

## PresentationState

```ts
interface PresentationState {
  roomId: string;
  revealed: Set<string>;
  completedObjectives: Set<string>;
  started: boolean;
  credits: boolean;
}
```

Os tipos reais podem evoluir, mas preservar a separação conceitual.

---

# Scenes do Phaser

Inicialmente manter o mínimo:

- `BootScene` / preload
- `PresentationScene` — todas as Slide Rooms no mesmo mundo ou carregadas por dados

Evitar uma Scene diferente para cada conteúdo se isso gerar boilerplate.

Rooms devem ser **dados**, não subclasses.

---

# Navegação

Sempre oferecer:

- gameplay: andar e abrir porta;
- presentation fallback: próxima/anterior room;
- reset da room;
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

Aim assist resolve o hotspot mais próximo do clique dentro de uma tolerância.

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

Evitar event bus genérico usado para tudo sem tipagem.

---

# MVP técnico

O primeiro marco precisa funcionar apenas com retângulos:

- tela inicial;
- Enter;
- player placeholder;
- movimento;
- câmera;
- duas rooms;
- hotspot;
- clique;
- flecha;
- reveal;
- HUD;
- porta;
- próxima room;
- fallback;
- reset.

Nenhuma arte final é necessária para validar a arquitetura.
