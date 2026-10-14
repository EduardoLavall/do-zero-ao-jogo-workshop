import type { RoomDefinition, RoomStoryboard } from "./types";

interface RoomBlueprint {
  id: string;
  title: string;
  storyboard: RoomStoryboard;
}

// These are playable STORYBOARD SCAFFOLDS, not completed visual rooms.
// Content, cue order, placeholders and metadata are authoritative for #9/#28–#30.
const blueprints: readonly RoomBlueprint[] = [
  {
    "id": "room-01",
    "title": "O que é um jogo?",
    "storyboard": {
      "learningGoal": "Reconhecer regras, interação e feedback como fundamentos de um jogo.",
      "question": "O que jogos tão diferentes têm em comum?",
      "takeaway": "JOGO = REGRAS + INTERAÇÃO + FEEDBACK",
      "presenterCue": "Abra com exemplos reconhecíveis, ouça uma resposta e mostre a ideia central sem definir videogame apenas por gráficos.",
      "durationSeconds": 50,
      "layout": {
        "composition": "Galeria de silhuetas abstratas inspiradas em gêneros distintos; três placas interativas no primeiro plano.",
        "focalPoint": "Painel central com a pergunta; alvo ativo separado do HUD.",
        "theme": "arcade-gallery"
      },
      "introduction": {
        "kicker": "ROOM 01 / ARCADE-GALLERY",
        "title": "O que jogos tão diferentes têm em comum?",
        "body": "Jogos podem ter estilos completamente diferentes. O que não pode faltar para que algo seja um jogo?"
      },
      "objects": [
        {
          "id": "01-plinth-0",
          "kind": "plinth",
          "x": 480,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Regras"
        },
        {
          "id": "01-plinth-1",
          "kind": "plinth",
          "x": 960,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Interação"
        },
        {
          "id": "01-plinth-2",
          "kind": "plinth",
          "x": 1440,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Feedback"
        },
        {
          "id": "01-door",
          "kind": "door",
          "x": 1810,
          "y": 805,
          "width": 75,
          "height": 220,
          "label": "PRÓXIMA"
        }
      ],
      "reveals": [
        {
          "id": "room-01-regras",
          "hotspot": {
            "x": 480,
            "y": 595,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 1/3 · ROOM 01",
            "title": "Regras",
            "body": "Regras descrevem o que é permitido e como o sistema reage."
          },
          "presenterCue": "Diga: sem regras, não há sistema compartilhado de decisões.",
          "assetId": "scene/gallery-original#regras",
          "sfxId": "ambient/gallery"
        },
        {
          "id": "room-01-interacao",
          "hotspot": {
            "x": 960,
            "y": 550,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 2/3 · ROOM 01",
            "title": "Interação",
            "body": "O jogador toma decisões e o jogo devolve consequências."
          },
          "presenterCue": "Demonstre o mouse e convide a plateia a prever o resultado.",
          "assetId": "scene/gallery-original#interacao",
          "sfxId": "ambient/gallery"
        },
        {
          "id": "room-01-feedback",
          "hotspot": {
            "x": 1440,
            "y": 595,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 3/3 · ROOM 01",
            "title": "Feedback",
            "body": "Som, imagem e animação deixam claro o que acabou de acontecer."
          },
          "presenterCue": "Ligue o acerto ao brilho da placa e feche com a fórmula.",
          "assetId": "scene/gallery-original#feedback",
          "sfxId": "ambient/gallery"
        }
      ],
      "assets": [
        "scene/gallery-original",
        "icon/rules",
        "icon/interaction",
        "icon/feedback"
      ],
      "audio": [
        "ambient/gallery",
        "sfx/reveal"
      ],
      "sources": [
        "docs/PLANO-MESTRE.md"
      ],
      "transition": {
        "prompt": "Essas ideias existem muito antes do computador.",
        "mode": "walk"
      },
      "fallback": {
        "revealKey": "E",
        "nextKey": "N",
        "previousKey": "P",
        "resetKey": "R"
      },
      "productionStatus": "storyboard"
    }
  },
  {
    "id": "room-02",
    "title": "Da brincadeira ao videogame",
    "storyboard": {
      "learningGoal": "Conectar a origem do jogar a jogos eletrônicos sem confundir marcos históricos.",
      "question": "Quem inventou os jogos?",
      "takeaway": "O jogo antecede o computador.",
      "presenterCue": "Use a linha do tempo como contexto curto: brincadeiras, jogos de tabuleiro antigos e experiências eletrônicas, evitando declarar um único inventor.",
      "durationSeconds": 60,
      "layout": {
        "composition": "Linha do tempo em três estações, com marcos históricos autorais.",
        "focalPoint": "Marcos em ordem cronológica, sem imagens licenciadas de terceiros.",
        "theme": "time-capsule"
      },
      "introduction": {
        "kicker": "ROOM 02 / TIME-CAPSULE",
        "title": "Quem inventou os jogos?",
        "body": "Pessoas jogavam muito antes dos computadores. A tecnologia apenas criou novas formas de jogar."
      },
      "objects": [
        {
          "id": "02-plinth-0",
          "kind": "plinth",
          "x": 480,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Jogos antigos"
        },
        {
          "id": "02-plinth-1",
          "kind": "plinth",
          "x": 960,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Experimentos el"
        },
        {
          "id": "02-plinth-2",
          "kind": "plinth",
          "x": 1440,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Popularização"
        },
        {
          "id": "02-door",
          "kind": "door",
          "x": 1810,
          "y": 805,
          "width": 75,
          "height": 220,
          "label": "PRÓXIMA"
        }
      ],
      "reveals": [
        {
          "id": "room-02-antigos",
          "hotspot": {
            "x": 480,
            "y": 595,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 1/3 · ROOM 02",
            "title": "Jogos antigos",
            "body": "Senet e o Jogo Real de Ur mostram que regras e competição já existiam na Antiguidade."
          },
          "presenterCue": "Cite os exemplos sem tentar escolher um primeiro jogo absoluto.",
          "assetId": "scene/timeline#antigos",
          "sfxId": "sfx/timeline"
        },
        {
          "id": "room-02-eletronicos",
          "hotspot": {
            "x": 960,
            "y": 550,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 2/3 · ROOM 02",
            "title": "Experimentos eletrônicos",
            "body": "Tennis for Two e Spacewar! representam experiências importantes anteriores à popularização doméstica."
          },
          "presenterCue": "Explique que vários marcos coexistem e têm definições diferentes de primeiro.",
          "assetId": "scene/timeline#eletronicos",
          "sfxId": "sfx/timeline"
        },
        {
          "id": "room-02-pong",
          "hotspot": {
            "x": 1440,
            "y": 595,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 3/3 · ROOM 02",
            "title": "Popularização",
            "body": "Pong ajudou o videogame a chegar a públicos mais amplos."
          },
          "presenterCue": "Pergunte: qual foi o primeiro console ou jogo de vocês?",
          "assetId": "scene/timeline#pong",
          "sfxId": "sfx/timeline"
        }
      ],
      "assets": [
        "scene/timeline",
        "icon/boardgame",
        "icon/oscilloscope"
      ],
      "audio": [
        "sfx/timeline"
      ],
      "sources": [
        "https://www.metmuseum.org/essays/board-games-from-ancient-egypt-and-the-near-east",
        "https://www.computerhistory.org/pdp-1/spacewar/"
      ],
      "transition": {
        "prompt": "Os jogos passaram a explorar os limites da tecnologia.",
        "mode": "walk"
      },
      "fallback": {
        "revealKey": "E",
        "nextKey": "N",
        "previousKey": "P",
        "resetKey": "R"
      },
      "productionStatus": "storyboard"
    }
  },
  {
    "id": "room-03",
    "title": "Tecnologia transforma jogos",
    "storyboard": {
      "learningGoal": "Identificar como hardware e ferramentas ampliam as possibilidades dos games.",
      "question": "Como fomos de Pong aos mundos atuais?",
      "takeaway": "Limitações técnicas moldam o design.",
      "presenterCue": "Compare o que a máquina conseguia desenhar e simular antes e agora. Evite afirmar causalidade exclusiva entre videogames e toda evolução das GPUs.",
      "durationSeconds": 45,
      "layout": {
        "composition": "Painel hardware simplificado à esquerda e resultado visual à direita.",
        "focalPoint": "Fluxo da CPU/GPU até a imagem.",
        "theme": "circuit-lab"
      },
      "introduction": {
        "kicker": "ROOM 03 / CIRCUIT-LAB",
        "title": "Como fomos de Pong aos mundos atuais?",
        "body": "Mais processamento, memória e ferramentas permitiram mundos maiores, simulações e experiências em rede."
      },
      "objects": [
        {
          "id": "03-plinth-0",
          "kind": "plinth",
          "x": 680,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "CPU, GPU e memó"
        },
        {
          "id": "03-plinth-1",
          "kind": "plinth",
          "x": 1240,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Engines e ferra"
        },
        {
          "id": "03-door",
          "kind": "door",
          "x": 1810,
          "y": 805,
          "width": 75,
          "height": 220,
          "label": "PRÓXIMA"
        }
      ],
      "reveals": [
        {
          "id": "room-03-hardware",
          "hotspot": {
            "x": 680,
            "y": 595,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 1/2 · ROOM 03",
            "title": "CPU, GPU e memória",
            "body": "CPU calcula lógica, a GPU ajuda a renderizar imagens e a memória mantém dados acessíveis."
          },
          "presenterCue": "Mostre trabalho conjunto, não componentes isolados.",
          "assetId": "scene/hardware-lab#hardware",
          "sfxId": "sfx/technology"
        },
        {
          "id": "room-03-ferramentas",
          "hotspot": {
            "x": 1240,
            "y": 550,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 2/2 · ROOM 03",
            "title": "Engines e ferramentas",
            "body": "Engines organizam rendering, input, física, áudio e fluxo de produção."
          },
          "presenterCue": "Transicione do hardware para pessoas e disciplinas.",
          "assetId": "scene/hardware-lab#ferramentas",
          "sfxId": "sfx/technology"
        }
      ],
      "assets": [
        "scene/hardware-lab",
        "icon/cpu",
        "icon/gpu"
      ],
      "audio": [
        "sfx/technology"
      ],
      "sources": [
        "https://www.computerhistory.org/timeline/graphics-games/"
      ],
      "transition": {
        "prompt": "Mas hardware sozinho não cria um bom jogo.",
        "mode": "walk"
      },
      "fallback": {
        "revealKey": "E",
        "nextKey": "N",
        "previousKey": "P",
        "resetKey": "R"
      },
      "productionStatus": "storyboard"
    }
  },
  {
    "id": "room-04",
    "title": "Quatro pilares para criar jogos",
    "storyboard": {
      "learningGoal": "Nomear as quatro áreas e mostrar que se integram.",
      "question": "O que você precisa aprender para criar um jogo?",
      "takeaway": "Design + Programação + Arte + Áudio",
      "presenterCue": "Peça um palpite antes de revelar as quatro áreas; diga que a ordem não implica hierarquia.",
      "durationSeconds": 40,
      "layout": {
        "composition": "Hub com quatro totens conectados ao centro.",
        "focalPoint": "Símbolo de desenvolvimento no centro.",
        "theme": "workshop-hub"
      },
      "introduction": {
        "kicker": "ROOM 04 / WORKSHOP-HUB",
        "title": "O que você precisa aprender para criar um jogo?",
        "body": "Um jogo nasce quando várias disciplinas cooperam para transformar ideias em experiências."
      },
      "objects": [
        {
          "id": "04-plinth-0",
          "kind": "plinth",
          "x": 420,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Game Design"
        },
        {
          "id": "04-plinth-1",
          "kind": "plinth",
          "x": 780,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Programação"
        },
        {
          "id": "04-plinth-2",
          "kind": "plinth",
          "x": 1170,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Arte"
        },
        {
          "id": "04-plinth-3",
          "kind": "plinth",
          "x": 1510,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Áudio"
        },
        {
          "id": "04-door",
          "kind": "door",
          "x": 1810,
          "y": 805,
          "width": 75,
          "height": 220,
          "label": "PRÓXIMA"
        }
      ],
      "reveals": [
        {
          "id": "room-04-design",
          "hotspot": {
            "x": 420,
            "y": 595,
            "radius": 98
          },
          "content": {
            "kicker": "REVEAL 1/4 · ROOM 04",
            "title": "Game Design",
            "body": "Define regras, objetivos e experiências desejadas."
          },
          "presenterCue": "Dê o exemplo de uma decisão do jogador.",
          "assetId": "scene/hub#design",
          "sfxId": "sfx/skill-unlock"
        },
        {
          "id": "room-04-codigo",
          "hotspot": {
            "x": 780,
            "y": 550,
            "radius": 98
          },
          "content": {
            "kicker": "REVEAL 2/4 · ROOM 04",
            "title": "Programação",
            "body": "Transforma as decisões em comportamentos executáveis."
          },
          "presenterCue": "Relacione com o evento da flecha no jogo.",
          "assetId": "scene/hub#codigo",
          "sfxId": "sfx/skill-unlock"
        },
        {
          "id": "room-04-arte",
          "hotspot": {
            "x": 1170,
            "y": 595,
            "radius": 98
          },
          "content": {
            "kicker": "REVEAL 3/4 · ROOM 04",
            "title": "Arte",
            "body": "Dá forma, estilo e leitura às ações."
          },
          "presenterCue": "Aponte a importância da silhueta e UI.",
          "assetId": "scene/hub#arte",
          "sfxId": "sfx/skill-unlock"
        },
        {
          "id": "room-04-audio",
          "hotspot": {
            "x": 1510,
            "y": 550,
            "radius": 98
          },
          "content": {
            "kicker": "REVEAL 4/4 · ROOM 04",
            "title": "Áudio",
            "body": "Ajuda a comunicar impacto, ambiente e ritmo."
          },
          "presenterCue": "Imite um feedback sem som e depois com som, se possível.",
          "assetId": "scene/hub#audio",
          "sfxId": "sfx/skill-unlock"
        }
      ],
      "assets": [
        "scene/hub",
        "icon/design",
        "icon/code",
        "icon/art",
        "icon/audio"
      ],
      "audio": [
        "sfx/skill-unlock"
      ],
      "sources": [
        "docs/PLANO-MESTRE.md"
      ],
      "transition": {
        "prompt": "Comecemos pelas decisões: Game Design.",
        "mode": "walk"
      },
      "fallback": {
        "revealKey": "E",
        "nextKey": "N",
        "previousKey": "P",
        "resetKey": "R"
      },
      "productionStatus": "storyboard"
    }
  },
  {
    "id": "room-05",
    "title": "Game Design",
    "storyboard": {
      "learningGoal": "Entender mecânicas, core loop e playtest como processo iterativo.",
      "question": "Por que alguém continua jogando?",
      "takeaway": "Protótipo → Teste → Ajuste → Repetir",
      "presenterCue": "Explique que design define a experiência antes do polimento visual. Use o ciclo explorar/coletar/construir como exemplo de core loop.",
      "durationSeconds": 105,
      "layout": {
        "composition": "Skill tree em três níveis e destaque progressivo.",
        "focalPoint": "Loop central de decisão e recompensa.",
        "theme": "skill-tree"
      },
      "introduction": {
        "kicker": "ROOM 05 / SKILL-TREE",
        "title": "Por que alguém continua jogando?",
        "body": "O design combina regras e escolhas para criar um ciclo que o jogador quer repetir."
      },
      "objects": [
        {
          "id": "05-plinth-0",
          "kind": "plinth",
          "x": 480,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Mecânicas e obj"
        },
        {
          "id": "05-plinth-1",
          "kind": "plinth",
          "x": 960,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Core Loop"
        },
        {
          "id": "05-plinth-2",
          "kind": "plinth",
          "x": 1440,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Playtesting e i"
        },
        {
          "id": "05-door",
          "kind": "door",
          "x": 1810,
          "y": 805,
          "width": 75,
          "height": 220,
          "label": "PRÓXIMA"
        }
      ],
      "reveals": [
        {
          "id": "room-05-mecanicas",
          "hotspot": {
            "x": 480,
            "y": 595,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 1/3 · ROOM 05",
            "title": "Mecânicas e objetivos",
            "body": "Mecânicas são ações possíveis; objetivos dão direção e significado a elas."
          },
          "presenterCue": "Peça ao público uma ação simples e um objetivo.",
          "assetId": "scene/design-tree#mecanicas",
          "sfxId": "sfx/node-unlock"
        },
        {
          "id": "room-05-loop",
          "hotspot": {
            "x": 960,
            "y": 550,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 2/3 · ROOM 05",
            "title": "Core Loop",
            "body": "Explorar → Coletar → Construir → Melhorar → Repetir.",
            "code": "EXPLORAR → COLETAR → CONSTRUIR → MELHORAR → ↻"
          },
          "presenterCue": "Mostre a repetição como motivação para novas escolhas.",
          "assetId": "scene/design-tree#loop",
          "sfxId": "sfx/node-unlock"
        },
        {
          "id": "room-05-playtest",
          "hotspot": {
            "x": 1440,
            "y": 595,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 3/3 · ROOM 05",
            "title": "Playtesting e iteração",
            "body": "Uma ideia só se torna design sólido ao ser testada, observada e ajustada."
          },
          "presenterCue": "Diga: medir comportamento é mais útil do que adivinhar diversão.",
          "assetId": "scene/design-tree#playtest",
          "sfxId": "sfx/node-unlock"
        }
      ],
      "assets": [
        "scene/design-tree",
        "icon/mechanics",
        "icon/loop",
        "icon/test"
      ],
      "audio": [
        "sfx/node-unlock"
      ],
      "sources": [
        "https://ocw.mit.edu/courses/cms-301-introduction-to-game-design-methods-spring-2016/"
      ],
      "transition": {
        "prompt": "Como essas regras viram código funcionando?",
        "mode": "walk"
      },
      "fallback": {
        "revealKey": "E",
        "nextKey": "N",
        "previousKey": "P",
        "resetKey": "R"
      },
      "productionStatus": "storyboard"
    }
  },
  {
    "id": "room-06",
    "title": "Programação e Engine",
    "storyboard": {
      "learningGoal": "Explicar game loop, callbacks, componentes e Rigidbody2D em Unity sem confundir frame com física.",
      "question": "Quem faz o jogo rodar a cada frame?",
      "takeaway": "A engine chama nosso código; nosso código usa a engine.",
      "presenterCue": "Esta é a vertical slice de referência: 2min45. Mostre conceito → diagrama → código → impacto no jogo. Não leia o código linha a linha.",
      "durationSeconds": 165,
      "layout": {
        "composition": "Laboratório tecnológico com cinco terminais; painel DOM legível domina quando aberto.",
        "focalPoint": "Telas de Game Loop, lifecycle e componentes interligadas.",
        "theme": "engine-laboratory"
      },
      "introduction": {
        "kicker": "ROOM 06 / ENGINE-LABORATORY",
        "title": "Quem faz o jogo rodar a cada frame?",
        "body": "Toda regra precisa de um lugar para executar. A engine fornece o loop e os sistemas que ligam código ao mundo."
      },
      "objects": [
        {
          "id": "06-plinth-0",
          "kind": "plinth",
          "x": 380,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Game Loop"
        },
        {
          "id": "06-plinth-1",
          "kind": "plinth",
          "x": 680,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "MonoBehaviour"
        },
        {
          "id": "06-plinth-2",
          "kind": "plinth",
          "x": 970,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Input e eventos"
        },
        {
          "id": "06-plinth-3",
          "kind": "plinth",
          "x": 1260,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Composição por "
        },
        {
          "id": "06-plinth-4",
          "kind": "plinth",
          "x": 1550,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Rigidbody2D e F"
        },
        {
          "id": "06-door",
          "kind": "door",
          "x": 1810,
          "y": 805,
          "width": 75,
          "height": 220,
          "label": "PRÓXIMA"
        }
      ],
      "reveals": [
        {
          "id": "room-06-loop",
          "hotspot": {
            "x": 380,
            "y": 595,
            "radius": 98
          },
          "content": {
            "kicker": "REVEAL 1/5 · ROOM 06",
            "title": "Game Loop",
            "body": "Input, atualização e renderização se repetem enquanto o jogo está ativo; 60 FPS oferecem ~16,67 ms por frame.",
            "code": "while (running) {\n  processInput();\n  update();\n  render();\n}"
          },
          "presenterCue": "Mostre o loop visual e lembre que FPS não é frequência fixa.",
          "assetId": "scene/engine-lab#loop",
          "sfxId": "sfx/code-reveal"
        },
        {
          "id": "room-06-lifecycle",
          "hotspot": {
            "x": 680,
            "y": 550,
            "radius": 98
          },
          "content": {
            "kicker": "REVEAL 2/5 · ROOM 06",
            "title": "MonoBehaviour",
            "body": "Em Unity, a engine invoca callbacks como Awake, Start e Update. Update depende dos frames renderizados.",
            "code": "void Start() { /* uma vez */ }\nvoid Update() { /* por frame */ }"
          },
          "presenterCue": "Pergunte: quem chama Update? A engine.",
          "assetId": "scene/engine-lab#lifecycle",
          "sfxId": "sfx/code-reveal"
        },
        {
          "id": "room-06-input",
          "hotspot": {
            "x": 970,
            "y": 595,
            "radius": 98
          },
          "content": {
            "kicker": "REVEAL 3/5 · ROOM 06",
            "title": "Input e eventos",
            "body": "Os eventos de teclado/mouse passam pela plataforma e pelo sistema de input antes da lógica do jogo."
          },
          "presenterCue": "Compare polling com callback; Input.GetKeyDown pertence ao input legado.",
          "assetId": "scene/engine-lab#input",
          "sfxId": "sfx/code-reveal"
        },
        {
          "id": "room-06-components",
          "hotspot": {
            "x": 1260,
            "y": 550,
            "radius": 98
          },
          "content": {
            "kicker": "REVEAL 4/5 · ROOM 06",
            "title": "Composição por componentes",
            "body": "Transform, SpriteRenderer, Collider2D, Rigidbody2D e scripts cooperam em um GameObject."
          },
          "presenterCue": "Mostre composição, não uma classe gigante.",
          "assetId": "scene/engine-lab#components",
          "sfxId": "sfx/code-reveal"
        },
        {
          "id": "room-06-physics",
          "hotspot": {
            "x": 1550,
            "y": 595,
            "radius": 98
          },
          "content": {
            "kicker": "REVEAL 5/5 · ROOM 06",
            "title": "Rigidbody2D e FixedUpdate",
            "body": "FixedUpdate usa um timestep fixo para trabalhar com física. Rigidbody2D controla simulação; Collider2D define a forma de contato.",
            "code": "void FixedUpdate() {\n  rb.AddForce(Vector2.up * jumpForce,\n              ForceMode2D.Impulse);\n}"
          },
          "presenterCue": "Enfatize: um frame pode ter zero, um ou múltiplos passos de física.",
          "assetId": "scene/engine-lab#physics",
          "sfxId": "sfx/code-reveal"
        }
      ],
      "assets": [
        "scene/engine-lab",
        "ui/code-panel",
        "icon/loop",
        "icon/component",
        "icon/physics"
      ],
      "audio": [
        "sfx/code-reveal",
        "sfx/engine-pulse"
      ],
      "sources": [
        "https://gameprogrammingpatterns.com/game-loop.html",
        "https://docs.unity3d.com/6000.0/Documentation/ScriptReference/MonoBehaviour.html",
        "https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rigidbody2D.html"
      ],
      "transition": {
        "prompt": "Programação não está sozinha: precisamos representar o mundo visualmente.",
        "mode": "walk"
      },
      "fallback": {
        "revealKey": "E",
        "nextKey": "N",
        "previousKey": "P",
        "resetKey": "R"
      },
      "productionStatus": "storyboard"
    }
  },
  {
    "id": "room-07",
    "title": "Arte e Animação",
    "storyboard": {
      "learningGoal": "Visualizar o pipeline que transforma uma ideia em sprites legíveis e animados.",
      "question": "Como uma ideia vira algo que vemos no jogo?",
      "takeaway": "Concept → Sprite → Spritesheet → Animação",
      "presenterCue": "Mostre camadas do sprite e a mudança para uma animação em looping. Priorize leitura e silhueta.",
      "durationSeconds": 50,
      "layout": {
        "composition": "Ateliê com cavalete de pixel art e folhas de animação.",
        "focalPoint": "Comparação sprite estático / animado.",
        "theme": "art-studio"
      },
      "introduction": {
        "kicker": "ROOM 07 / ART-STUDIO",
        "title": "Como uma ideia vira algo que vemos no jogo?",
        "body": "Arte não é apenas decorar: também ensina onde olhar e o que pode ser usado."
      },
      "objects": [
        {
          "id": "07-plinth-0",
          "kind": "plinth",
          "x": 680,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Sprite e silhue"
        },
        {
          "id": "07-plinth-1",
          "kind": "plinth",
          "x": 1240,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Spritesheet e a"
        },
        {
          "id": "07-door",
          "kind": "door",
          "x": 1810,
          "y": 805,
          "width": 75,
          "height": 220,
          "label": "PRÓXIMA"
        }
      ],
      "reveals": [
        {
          "id": "room-07-sprite",
          "hotspot": {
            "x": 680,
            "y": 595,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 1/2 · ROOM 07",
            "title": "Sprite e silhueta",
            "body": "Um sprite comunica forma, função e estado. A silhueta precisa ser clara mesmo de longe."
          },
          "presenterCue": "Compare contorno/cores, lembrando projeção em 720p.",
          "assetId": "scene/art-studio#sprite",
          "sfxId": "sfx/frame-step"
        },
        {
          "id": "room-07-animacao",
          "hotspot": {
            "x": 1240,
            "y": 550,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 2/2 · ROOM 07",
            "title": "Spritesheet e animação",
            "body": "Uma sequência de frames reproduzida no tempo cria movimento; animação comunica intenção e reação."
          },
          "presenterCue": "Mostre idle → walk → jump com a mesma sprite sheet.",
          "assetId": "scene/art-studio#animacao",
          "sfxId": "sfx/frame-step"
        }
      ],
      "assets": [
        "scene/art-studio",
        "art/spritesheet-example",
        "icon/brush"
      ],
      "audio": [
        "sfx/frame-step"
      ],
      "sources": [
        "docs/PLANO-MESTRE.md"
      ],
      "transition": {
        "prompt": "Falta uma dimensão que muitas vezes percebemos antes mesmo de ver.",
        "mode": "walk"
      },
      "fallback": {
        "revealKey": "E",
        "nextKey": "N",
        "previousKey": "P",
        "resetKey": "R"
      },
      "productionStatus": "storyboard"
    }
  },
  {
    "id": "room-08",
    "title": "Áudio e Feedback",
    "storyboard": {
      "learningGoal": "Reconhecer SFX, música e ambiência como sistemas de comunicação.",
      "question": "O que muda quando adicionamos som?",
      "takeaway": "Som reforça ação, ambiente e emoção.",
      "presenterCue": "Faça uma demonstração A/B da mesma ação com e sem som; mantenha volume baixo para a fala.",
      "durationSeconds": 50,
      "layout": {
        "composition": "Mesa de mixagem e visualização de ondas no fundo.",
        "focalPoint": "Comparação visual A/B de feedback da flecha.",
        "theme": "sound-studio"
      },
      "introduction": {
        "kicker": "ROOM 08 / SOUND-STUDIO",
        "title": "O que muda quando adicionamos som?",
        "body": "O áudio torna ações mais claras e pode alterar completamente como sentimos um jogo."
      },
      "objects": [
        {
          "id": "08-plinth-0",
          "kind": "plinth",
          "x": 680,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "SFX"
        },
        {
          "id": "08-plinth-1",
          "kind": "plinth",
          "x": 1240,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Música e mixage"
        },
        {
          "id": "08-door",
          "kind": "door",
          "x": 1810,
          "y": 805,
          "width": 75,
          "height": 220,
          "label": "PRÓXIMA"
        }
      ],
      "reveals": [
        {
          "id": "room-08-sfx",
          "hotspot": {
            "x": 680,
            "y": 595,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 1/2 · ROOM 08",
            "title": "SFX",
            "body": "Sons pontuais informam pulo, impacto, erro e confirmação. O momento exato importa."
          },
          "presenterCue": "Dispare uma flecha uma vez em silêncio e outra com som quando o sistema de áudio existir.",
          "assetId": "scene/sound-studio#sfx",
          "sfxId": "sfx/hit"
        },
        {
          "id": "room-08-mix",
          "hotspot": {
            "x": 1240,
            "y": 550,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 2/2 · ROOM 08",
            "title": "Música e mixagem",
            "body": "Música estabelece ritmo; ambiência cria espaço; um mixer equilibra volumes sem cobrir a fala."
          },
          "presenterCue": "Explique que áudio pode estar mudo sem quebrar interação.",
          "assetId": "scene/sound-studio#mix",
          "sfxId": "sfx/hit"
        }
      ],
      "assets": [
        "scene/sound-studio",
        "icon/waveform"
      ],
      "audio": [
        "sfx/hit",
        "sfx/ui",
        "ambient/room"
      ],
      "sources": [
        "docs/PLANO-MESTRE.md"
      ],
      "transition": {
        "prompt": "Agora vamos juntar design, código, arte e áudio numa mecânica.",
        "mode": "walk"
      },
      "fallback": {
        "revealKey": "E",
        "nextKey": "N",
        "previousKey": "P",
        "resetKey": "R"
      },
      "productionStatus": "storyboard"
    }
  },
  {
    "id": "room-09",
    "title": "Anatomia de um pulo",
    "storyboard": {
      "learningGoal": "Percorrer input → Update → FixedUpdate → Rigidbody2D → física → feedback.",
      "question": "O que acontece quando apertamos para pular?",
      "takeaway": "Mecânica + arte + som + feedback = experiência.",
      "presenterCue": "Esta é a demonstração técnica principal. Construa a cadeia passo a passo e só então acrescente os efeitos juicy.",
      "durationSeconds": 135,
      "layout": {
        "composition": "Arena de teste com pipeline de sinais sobre a plataforma.",
        "focalPoint": "Personagem e painel de código sincronizados.",
        "theme": "jump-chamber"
      },
      "introduction": {
        "kicker": "ROOM 09 / JUMP-CHAMBER",
        "title": "O que acontece quando apertamos para pular?",
        "body": "O pulo parece uma ação simples, mas atravessa vários sistemas da engine."
      },
      "objects": [
        {
          "id": "09-plinth-0",
          "kind": "plinth",
          "x": 420,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Input captura i"
        },
        {
          "id": "09-plinth-1",
          "kind": "plinth",
          "x": 780,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "FixedUpdate apl"
        },
        {
          "id": "09-plinth-2",
          "kind": "plinth",
          "x": 1170,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Simulação e col"
        },
        {
          "id": "09-plinth-3",
          "kind": "plinth",
          "x": 1510,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Game Feel"
        },
        {
          "id": "09-door",
          "kind": "door",
          "x": 1810,
          "y": 805,
          "width": 75,
          "height": 220,
          "label": "PRÓXIMA"
        }
      ],
      "reveals": [
        {
          "id": "room-09-input",
          "hotspot": {
            "x": 420,
            "y": 595,
            "radius": 98
          },
          "content": {
            "kicker": "REVEAL 1/4 · ROOM 09",
            "title": "Input captura intenção",
            "body": "Update pode registrar uma solicitação de pulo quando o botão é pressionado.",
            "code": "void Update() {\n  if (Input.GetKeyDown(KeyCode.Space))\n    jumpRequested = true;\n}"
          },
          "presenterCue": "Mostre o flag que separa leitura do input e uso de física.",
          "assetId": "scene/jump-lab#input",
          "sfxId": "sfx/jump"
        },
        {
          "id": "room-09-fixed",
          "hotspot": {
            "x": 780,
            "y": 550,
            "radius": 98
          },
          "content": {
            "kicker": "REVEAL 2/4 · ROOM 09",
            "title": "FixedUpdate aplica a física",
            "body": "A lógica de física usa o próximo timestep fixo para aplicar o impulso uma vez.",
            "code": "void FixedUpdate() {\n  if (!jumpRequested) return;\n  rb.AddForce(Vector2.up * jumpForce,\n              ForceMode2D.Impulse);\n  jumpRequested = false;\n}"
          },
          "presenterCue": "Evite o erro de aplicar impulso a cada frame.",
          "assetId": "scene/jump-lab#fixed",
          "sfxId": "sfx/jump"
        },
        {
          "id": "room-09-motion",
          "hotspot": {
            "x": 1170,
            "y": 595,
            "radius": 98
          },
          "content": {
            "kicker": "REVEAL 3/4 · ROOM 09",
            "title": "Simulação e colisão",
            "body": "Rigidbody2D integra velocidade, gravidade e colisão com o chão."
          },
          "presenterCue": "Diferencie Rigidbody2D e Collider2D.",
          "assetId": "scene/jump-lab#motion",
          "sfxId": "sfx/jump"
        },
        {
          "id": "room-09-juice",
          "hotspot": {
            "x": 1510,
            "y": 550,
            "radius": 98
          },
          "content": {
            "kicker": "REVEAL 4/4 · ROOM 09",
            "title": "Game Feel",
            "body": "Animação, poeira, SFX e squash/stretch tornam o mesmo salto muito mais satisfatório."
          },
          "presenterCue": "Reproduza antes/depois da mesma mecânica, sem efeitos vs juicy.",
          "assetId": "scene/jump-lab#juice",
          "sfxId": "sfx/jump"
        }
      ],
      "assets": [
        "scene/jump-lab",
        "icon/input",
        "icon/physics",
        "vfx/dust"
      ],
      "audio": [
        "sfx/jump",
        "sfx/land"
      ],
      "sources": [
        "https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Rigidbody2D.html",
        "docs/PLANO-MESTRE.md"
      ],
      "transition": {
        "prompt": "O mesmo processo transforma qualquer protótipo em jogo.",
        "mode": "walk"
      },
      "fallback": {
        "revealKey": "E",
        "nextKey": "N",
        "previousKey": "P",
        "resetKey": "R"
      },
      "productionStatus": "storyboard"
    }
  },
  {
    "id": "room-10",
    "title": "Do protótipo ao jogo",
    "storyboard": {
      "learningGoal": "Mostrar que o produto resulta de integrar as quatro disciplinas.",
      "question": "Quando um protótipo se torna um jogo de verdade?",
      "takeaway": "As disciplinas convergem para criar a experiência.",
      "presenterCue": "Retome o protótipo de pulo e aplique camadas: regra, arte, som, UI e feedback. Não introduza nova teoria.",
      "durationSeconds": 65,
      "layout": {
        "composition": "Duas vitrines lado a lado: bloco simples vs experiência polida.",
        "focalPoint": "Transformação A/B do mesmo gameplay.",
        "theme": "prototype-evolution"
      },
      "introduction": {
        "kicker": "ROOM 10 / PROTOTYPE-EVOLUTION",
        "title": "Quando um protótipo se torna um jogo de verdade?",
        "body": "Não basta funcionar: precisamos tornar a ação compreensível, coerente e prazerosa."
      },
      "objects": [
        {
          "id": "10-plinth-0",
          "kind": "plinth",
          "x": 480,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Protótipo"
        },
        {
          "id": "10-plinth-1",
          "kind": "plinth",
          "x": 960,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Integração"
        },
        {
          "id": "10-plinth-2",
          "kind": "plinth",
          "x": 1440,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "Experiência com"
        },
        {
          "id": "10-door",
          "kind": "door",
          "x": 1810,
          "y": 805,
          "width": 75,
          "height": 220,
          "label": "PRÓXIMA"
        }
      ],
      "reveals": [
        {
          "id": "room-10-prototipo",
          "hotspot": {
            "x": 480,
            "y": 595,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 1/3 · ROOM 10",
            "title": "Protótipo",
            "body": "Primeiro validamos a mecânica com blocos e regras simples."
          },
          "presenterCue": "Mostre que protótipo feio ainda pode ensinar muito.",
          "assetId": "scene/prototype-evolution#prototipo",
          "sfxId": "sfx/polish"
        },
        {
          "id": "room-10-camadas",
          "hotspot": {
            "x": 960,
            "y": 550,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 2/3 · ROOM 10",
            "title": "Integração",
            "body": "Animações, SFX, UI e VFX aumentam a legibilidade e sensação de resposta."
          },
          "presenterCue": "Aponte a cadeia de eventos entre sistemas.",
          "assetId": "scene/prototype-evolution#camadas",
          "sfxId": "sfx/polish"
        },
        {
          "id": "room-10-jogo",
          "hotspot": {
            "x": 1440,
            "y": 595,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 3/3 · ROOM 10",
            "title": "Experiência completa",
            "body": "O jogo emerge quando design, programação, arte e áudio trabalham juntos."
          },
          "presenterCue": "Retome os quatro pilares para encerrar o raciocínio.",
          "assetId": "scene/prototype-evolution#jogo",
          "sfxId": "sfx/polish"
        }
      ],
      "assets": [
        "scene/prototype-evolution",
        "icon/polish"
      ],
      "audio": [
        "sfx/polish",
        "sfx/quest"
      ],
      "sources": [
        "docs/PLANO-MESTRE.md"
      ],
      "transition": {
        "prompt": "Chegou a hora de concluir a missão.",
        "mode": "walk"
      },
      "fallback": {
        "revealKey": "E",
        "nextKey": "N",
        "previousKey": "P",
        "resetKey": "R"
      },
      "productionStatus": "storyboard"
    }
  },
  {
    "id": "room-final",
    "title": "Quest Complete",
    "storyboard": {
      "learningGoal": "Sintetizar o workshop e abrir a sessão de perguntas.",
      "question": "Pronto para criar o seu primeiro jogo?",
      "takeaway": "Criar jogos é transformar ideias em experiências.",
      "presenterCue": "Agradeça, mostre a frase final, referências e convide para perguntas. ENTER/tecla de ajuda conduz ao Q&A na implementação final.",
      "durationSeconds": 25,
      "layout": {
        "composition": "Sala final de conquista, créditos e espaço para QR code autoral.",
        "focalPoint": "QUEST COMPLETE central, sem poluição visual.",
        "theme": "victory-hall"
      },
      "introduction": {
        "kicker": "FINAL / VITÓRIA",
        "title": "Pronto para criar o seu primeiro jogo?",
        "body": "Missão concluída. Você acabou de ver design, código, arte e áudio trabalhando juntos."
      },
      "objects": [
        {
          "id": "final-plinth-0",
          "kind": "plinth",
          "x": 960,
          "y": 820,
          "width": 210,
          "height": 28,
          "label": "QUEST COMPLETE"
        },
        {
          "id": "final-door",
          "kind": "door",
          "x": 1810,
          "y": 805,
          "width": 75,
          "height": 220,
          "label": "Q&A"
        }
      ],
      "reveals": [
        {
          "id": "room-final-quest",
          "hotspot": {
            "x": 960,
            "y": 595,
            "radius": 114
          },
          "content": {
            "kicker": "REVEAL 1/1 · FINAL",
            "title": "QUEST COMPLETE",
            "body": "+100 XP · Obrigado por jogar. Perguntas?"
          },
          "presenterCue": "Reforce a mensagem final e abra para Q&A.",
          "assetId": "scene/victory-hall#quest",
          "sfxId": "sfx/quest-complete"
        }
      ],
      "assets": [
        "scene/victory-hall",
        "ui/credits"
      ],
      "audio": [
        "sfx/quest-complete"
      ],
      "sources": [
        "docs/FONTES.md"
      ],
      "transition": {
        "prompt": "PRESS ENTER FOR Q&A — futura integração com créditos finais.",
        "mode": "final"
      },
      "fallback": {
        "revealKey": "E",
        "nextKey": "N",
        "previousKey": "P",
        "resetKey": "R"
      },
      "productionStatus": "storyboard"
    }
  }
];

function createRoom(blueprint: RoomBlueprint): RoomDefinition {
  const reveals = blueprint.storyboard.reveals;
  return {
    id: blueprint.id,
    title: blueprint.title,
    width: 1920,
    storyboard: blueprint.storyboard,
    objectives: [{
      id: `${blueprint.id}-objective`,
      label: blueprint.storyboard.takeaway,
      requiredRevealIds: reveals.map((reveal) => reveal.id),
    }],
    hotspots: reveals.map((reveal) => ({
      id: `hotspot-${reveal.id}`,
      x: reveal.hotspot.x,
      y: reveal.hotspot.y,
      radius: reveal.hotspot.radius,
      revealId: reveal.id,
      requiredRevealIds: reveal.requiredRevealIds,
    })),
  };
}

export const storyboardRooms: readonly RoomDefinition[] = blueprints.map(createRoom);

export const STORYBOARD_MENU_SECONDS = 20;
export const STORYBOARD_BUFFER_SECONDS = 90;
export const STORYBOARD_TOTAL_CONTENT_SECONDS = storyboardRooms.reduce(
  (total, room) => total + room.storyboard.durationSeconds,
  0,
);
