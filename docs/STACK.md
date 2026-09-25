# Stack e decisões técnicas

## Decisão

Usar:

- **TypeScript**
- **Phaser 3**
- **Vite**
- **HTML/CSS**
- **Vitest**
- **ESLint**
- **Prettier**

Sem framework SPA.

---

## Por que TypeScript?

O projeto possui vários contratos claros:

- Room
- Hotspot
- Reveal
- Objective
- PresentationState
- PlayerState
- InputAction

TypeScript torna esses contratos explícitos, melhora autocomplete e reduz mudanças inconsistentes feitas por humanos ou agentes de IA.

Usar `strict: true`.

---

## Por que Phaser?

Slide Rooms é essencialmente um jogo 2D para browser.

Phaser já oferece:

- game loop;
- input;
- câmera;
- sprites;
- animações;
- tweens;
- áudio;
- Arcade Physics;
- carregamento de assets;
- Scenes;
- integração TypeScript.

Não devemos gastar o workshop construindo nossa própria mini-engine.

### Escopo do Phaser

Usar Phaser para:

- mundo 2D;
- player;
- arrow projectile;
- hotspots físicos/espaciais;
- câmera;
- transições;
- partículas;
- som;
- loading.

Não usar Phaser para textos longos ou blocos de código quando DOM for mais legível.

---

## Por que Vite?

Vite fornece:

- dev server simples;
- build rápido;
- suporte natural a TypeScript;
- import de assets;
- estrutura pequena.

O build final deve ser estático e fácil de executar localmente.

---

## Por que não React?

Não há necessidade de uma aplicação SPA orientada a componentes.

Adicionar React criaria:

- lifecycle do React;
- lifecycle do Phaser;
- ponte de estado entre duas árvores;
- mais dependências;
- mais superfície para bugs.

DOM simples + TypeScript é suficiente para HUD, overlays e painéis.

---

## HTML/CSS

Usar para:

- HUD;
- caixas de conteúdo;
- diagramas;
- código;
- créditos;
- menu inicial;
- Q&A;
- acessibilidade textual.

O Canvas do Phaser fica responsável pelo mundo.

---

## Testes

### Vitest

Testar lógica que não depende de render:

- reducers/state;
- unlock rules;
- room progression;
- objective completion;
- hotspot selection;
- helpers.

### Teste visual/manual

Fluxos Phaser precisam de smoke test em browser.

Playwright pode entrar depois quando o núcleo estiver estável.

---

## Dependências: regra

Antes de adicionar uma dependência:

1. verificar se Phaser/Web Platform já resolvem;
2. justificar no PR;
3. preferir libs pequenas e mantidas;
4. evitar bibliotecas para uma única animação/helper trivial.

---

## Offline-first

Runtime não pode depender de:

- CDN;
- API externa;
- Google Fonts remotas;
- imagens remotas;
- áudio remoto.

Todos os assets devem ser locais.

---

## Build alvo

Desenvolvimento:

```bash
npm install
npm run dev
```

Validação:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Distribuição:

`dist/` deve conter a apresentação estática pronta para servir localmente.
