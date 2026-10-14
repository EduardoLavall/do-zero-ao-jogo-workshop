import type { StoryboardRoomDefinition } from "../presentation/types";

/**
 * Data-only workshop storyboards (issue #27).
 * Artwork/audio IDs are planning references, never runtime downloads.
 * The renderer uses Phaser geometry until #9, #25 and #26 integrate final assets.
 */
export const workshopRooms = [
  {
    "id": "room-01",
    "title": "O que é um jogo?",
    "width": 1920,
    "objectives": [
      {
        "id": "room-01-objective",
        "label": "Concluir as revelações",
        "requiredRevealIds": [
          "room-01-regras",
          "room-01-interacao",
          "room-01-feedback"
        ]
      }
    ],
    "hotspots": [
      {
        "id": "room-01-regras",
        "label": "Regras",
        "x": 500,
        "y": 615,
        "radius": 133,
        "revealId": "room-01-regras",
        "content": {
          "kicker": "ROOM-01 / 01",
          "title": "Ações têm consequências",
          "body": "Regras definem o que pode acontecer, quais limites existem e quando o jogo muda de estado."
        }
      },
      {
        "id": "room-01-interacao",
        "label": "Interação",
        "x": 960,
        "y": 605,
        "radius": 133,
        "revealId": "room-01-interacao",
        "content": {
          "kicker": "ROOM-01 / 02",
          "title": "O jogador toma decisões",
          "body": "Uma escolha muda o sistema. Sem resposta às ações, temos mais uma exibição do que uma experiência jogável."
        }
      },
      {
        "id": "room-01-feedback",
        "label": "Feedback",
        "x": 1430,
        "y": 615,
        "radius": 133,
        "revealId": "room-01-feedback",
        "content": {
          "kicker": "ROOM-01 / 03",
          "title": "O jogo responde",
          "body": "Som, imagem, física ou pontuação informam o resultado da ação e ajudam a próxima decisão."
        }
      }
    ],
    "storyboard": {
      "learningGoal": "Reconhecer regras, interação e feedback como elementos de uma experiência jogável.",
      "thesis": "Não é o realismo: são sistemas que respondem a escolhas.",
      "takeaway": "Jogo = regras + interação + feedback (modelo didático).",
      "presenterCue": "Pergunte à plateia o que Minecraft, xadrez e Pong têm em comum; não prolongue a resposta.",
      "transitionCue": "Da definição para as origens do brincar.",
      "durationSeconds": 50,
      "introduction": {
        "kicker": "01 · O QUE É UM JOGO?",
        "title": "O que todos os jogos têm em comum?",
        "body": "Antes de falar de motores gráficos, precisamos entender por que uma ação se transforma em jogo."
      },
      "visual": {
        "theme": "opening",
        "backgroundColor": 596528,
        "accentColor": 7333366,
        "props": [
          {
            "id": "room-01-prop-1",
            "kind": "sign",
            "x": 340,
            "y": 870
          },
          {
            "id": "room-01-prop-2",
            "kind": "console",
            "x": 940,
            "y": 870
          }
        ]
      },
      "plannedAssets": {
        "sprites": [
          "gallery-cards",
          "rule-icons"
        ],
        "audio": [
          "ui-reveal",
          "target-hit"
        ]
      }
    }
  },
  {
    "id": "room-02",
    "title": "Da brincadeira ao videogame",
    "width": 1920,
    "objectives": [
      {
        "id": "room-02-objective",
        "label": "Concluir as revelações",
        "requiredRevealIds": [
          "room-02-tabuleiro",
          "room-02-eletronicos",
          "room-02-pong"
        ]
      }
    ],
    "hotspots": [
      {
        "id": "room-02-tabuleiro",
        "label": "Jogos antigos",
        "x": 500,
        "y": 615,
        "radius": 133,
        "revealId": "room-02-tabuleiro",
        "content": {
          "kicker": "ROOM-02 / 01",
          "title": "Antes das telas",
          "body": "Senet e o Jogo Real de Ur mostram que tabuleiros, turnos e objetivos já existiam muito antes dos videogames."
        }
      },
      {
        "id": "room-02-eletronicos",
        "label": "Primeiros eletrônicos",
        "x": 960,
        "y": 605,
        "radius": 133,
        "revealId": "room-02-eletronicos",
        "content": {
          "kicker": "ROOM-02 / 02",
          "title": "Computação como playground",
          "body": "Tennis for Two (1958) e Spacewar! (1962) são marcos de experiências eletrônicas interativas."
        }
      },
      {
        "id": "room-02-pong",
        "label": "Pong e consoles",
        "x": 1430,
        "y": 615,
        "radius": 133,
        "revealId": "room-02-pong",
        "content": {
          "kicker": "ROOM-02 / 03",
          "title": "Do laboratório ao público",
          "body": "Pong popularizou um formato fácil de entender: poucos controles, resposta imediata e competição."
        }
      }
    ],
    "storyboard": {
      "learningGoal": "Situar rapidamente a passagem de jogos analógicos aos eletrônicos.",
      "thesis": "Jogos antecedem computadores; os eletrônicos adicionam novas formas de feedback.",
      "takeaway": "Tecnologia muda o suporte — não a necessidade de regras e escolhas.",
      "presenterCue": "Mencione Senet/Ur como exemplos antigos, depois destaque Tennis for Two, Spacewar! e Pong sem reivindicar um 'primeiro jogo' único.",
      "transitionCue": "Agora pergunte o que tornou jogos cada vez mais complexos.",
      "durationSeconds": 60,
      "introduction": {
        "kicker": "02 · HISTÓRIA",
        "title": "Jogos existem há milênios",
        "body": "Das regras escritas em tabuleiros à computação interativa."
      },
      "visual": {
        "theme": "history",
        "backgroundColor": 2169646,
        "accentColor": 16366975,
        "props": [
          {
            "id": "room-02-prop-1",
            "kind": "book",
            "x": 340,
            "y": 870
          },
          {
            "id": "room-02-prop-2",
            "kind": "console",
            "x": 940,
            "y": 870
          }
        ]
      },
      "plannedAssets": {
        "sprites": [
          "timeline-icons",
          "retro-monitor"
        ],
        "audio": [
          "history-reveal"
        ]
      }
    }
  },
  {
    "id": "room-03",
    "title": "Evolução tecnológica",
    "width": 1920,
    "objectives": [
      {
        "id": "room-03-objective",
        "label": "Concluir as revelações",
        "requiredRevealIds": [
          "room-03-cpu-gpu",
          "room-03-memoria-rede",
          "room-03-ferramentas"
        ]
      }
    ],
    "hotspots": [
      {
        "id": "room-03-cpu-gpu",
        "label": "CPU + GPU",
        "x": 500,
        "y": 615,
        "radius": 133,
        "revealId": "room-03-cpu-gpu",
        "content": {
          "kicker": "ROOM-03 / 01",
          "title": "Simulação e imagem",
          "body": "CPU processa a lógica e coordena sistemas; GPU acelera grande parte do trabalho gráfico paralelo."
        }
      },
      {
        "id": "room-03-memoria-rede",
        "label": "Memória + redes",
        "x": 960,
        "y": 605,
        "radius": 133,
        "revealId": "room-03-memoria-rede",
        "content": {
          "kicker": "ROOM-03 / 02",
          "title": "Mundos maiores e conectados",
          "body": "Memória, armazenamento e redes ampliam assets, persistência e experiências multijogador."
        }
      },
      {
        "id": "room-03-ferramentas",
        "label": "Engines",
        "x": 1430,
        "y": 615,
        "radius": 133,
        "revealId": "room-03-ferramentas",
        "content": {
          "kicker": "ROOM-03 / 03",
          "title": "Ferramentas que aceleram",
          "body": "Engines reúnem renderização, entrada, áudio e física para não reinventarmos tudo a cada projeto."
        }
      }
    ],
    "storyboard": {
      "learningGoal": "Ligar a evolução dos jogos à evolução do hardware e das ferramentas.",
      "thesis": "Mais computação, memória e conectividade ampliam as possibilidades de criação.",
      "takeaway": "Computação e jogos evoluíram em conjunto.",
      "presenterCue": "Compare a simplicidade de Pong com um mundo 3D moderno, sem números históricos não verificados.",
      "transitionCue": "Tecnologia sozinha não constrói um jogo: precisamos de disciplinas.",
      "durationSeconds": 45,
      "introduction": {
        "kicker": "03 · TECNOLOGIA",
        "title": "Do pixel ao mundo vivo",
        "body": "As mesmas ideias ganham escala com hardware, redes e ferramentas melhores."
      },
      "visual": {
        "theme": "technology",
        "backgroundColor": 861233,
        "accentColor": 7663056,
        "props": [
          {
            "id": "room-03-prop-1",
            "kind": "terminal",
            "x": 340,
            "y": 870
          },
          {
            "id": "room-03-prop-2",
            "kind": "console",
            "x": 940,
            "y": 870
          }
        ]
      },
      "plannedAssets": {
        "sprites": [
          "hardware-icons",
          "engine-badges"
        ],
        "audio": [
          "tech-sweep"
        ]
      }
    }
  },
  {
    "id": "room-04",
    "title": "Quatro pilares",
    "width": 1920,
    "objectives": [
      {
        "id": "room-04-objective",
        "label": "Concluir as revelações",
        "requiredRevealIds": [
          "room-04-design",
          "room-04-programacao",
          "room-04-arte",
          "room-04-audio"
        ]
      }
    ],
    "hotspots": [
      {
        "id": "room-04-design",
        "label": "Game Design",
        "x": 400,
        "y": 565,
        "radius": 113,
        "revealId": "room-04-design",
        "content": {
          "kicker": "ROOM-04 / 01",
          "title": "O que fazemos e por quê?",
          "body": "Mecânicas, objetivos, regras e decisões criam o espaço de possibilidades."
        }
      },
      {
        "id": "room-04-programacao",
        "label": "Programação",
        "x": 760,
        "y": 615,
        "radius": 113,
        "revealId": "room-04-programacao",
        "content": {
          "kicker": "ROOM-04 / 02",
          "title": "Como o sistema responde?",
          "body": "Código processa entrada, atualiza estados e integra ferramentas."
        }
      },
      {
        "id": "room-04-arte",
        "label": "Arte",
        "x": 1150,
        "y": 615,
        "radius": 113,
        "revealId": "room-04-arte",
        "content": {
          "kicker": "ROOM-04 / 03",
          "title": "Como o mundo comunica?",
          "body": "Sprites, animações, composição e UI tornam eventos perceptíveis."
        }
      },
      {
        "id": "room-04-audio",
        "label": "Áudio",
        "x": 1530,
        "y": 565,
        "radius": 113,
        "revealId": "room-04-audio",
        "content": {
          "kicker": "ROOM-04 / 04",
          "title": "Como a ação soa?",
          "body": "Efeitos, música e ambiência reforçam ritmo, emoção e feedback."
        }
      }
    ],
    "storyboard": {
      "learningGoal": "Apresentar design, programação, arte e áudio como disciplinas integradas.",
      "thesis": "A experiência final depende da colaboração de vários sistemas.",
      "takeaway": "Design + programação + arte + áudio trabalham juntos.",
      "presenterCue": "Pergunte que áreas a plateia acha necessárias; revele cada pilar em sequência.",
      "transitionCue": "Comecemos por decidir o que o jogador fará.",
      "durationSeconds": 40,
      "introduction": {
        "kicker": "04 · HUB",
        "title": "Como se faz um jogo?",
        "body": "Quatro pilares se encontram para criar uma experiência."
      },
      "visual": {
        "theme": "hub",
        "backgroundColor": 1382191,
        "accentColor": 14334719,
        "props": [
          {
            "id": "room-04-prop-1",
            "kind": "tree",
            "x": 340,
            "y": 870
          },
          {
            "id": "room-04-prop-2",
            "kind": "sign",
            "x": 940,
            "y": 870
          }
        ]
      },
      "plannedAssets": {
        "sprites": [
          "four-pillars-icons"
        ],
        "audio": [
          "hub-unlock"
        ]
      }
    }
  },
  {
    "id": "room-05",
    "title": "Game Design",
    "width": 1920,
    "objectives": [
      {
        "id": "room-05-objective",
        "label": "Concluir as revelações",
        "requiredRevealIds": [
          "room-05-mecanicas",
          "room-05-loop",
          "room-05-iterar"
        ]
      }
    ],
    "hotspots": [
      {
        "id": "room-05-mecanicas",
        "label": "Mecânicas e objetivos",
        "x": 500,
        "y": 615,
        "radius": 133,
        "revealId": "room-05-mecanicas",
        "content": {
          "kicker": "ROOM-05 / 01",
          "title": "Ações com propósito",
          "body": "Mover, coletar e construir só viram um desafio quando existem regras, objetivos e consequências."
        }
      },
      {
        "id": "room-05-loop",
        "label": "Core Loop",
        "x": 960,
        "y": 605,
        "radius": 133,
        "revealId": "room-05-loop",
        "content": {
          "kicker": "ROOM-05 / 02",
          "title": "A experiência se repete",
          "body": "Em jogos de exploração: explorar → coletar → construir → melhorar → explorar novamente."
        }
      },
      {
        "id": "room-05-iterar",
        "label": "Playtesting",
        "x": 1430,
        "y": 615,
        "radius": 133,
        "revealId": "room-05-iterar",
        "content": {
          "kicker": "ROOM-05 / 03",
          "title": "Ideia não é evidência",
          "body": "Protótipo, jogo, observação e ajuste revelam o que realmente funciona para o jogador."
        }
      }
    ],
    "storyboard": {
      "learningGoal": "Mostrar core loop, regras e iteração como ferramentas de design.",
      "thesis": "Uma boa ideia vira jogo quando seu loop pode ser testado e melhorado.",
      "takeaway": "Prototipar → testar → observar → ajustar.",
      "presenterCue": "Mostre o loop explorar/coletar/construir como exemplo; pergunte por que repetimos a ação.",
      "transitionCue": "Como transformamos essas regras em execução real?",
      "durationSeconds": 105,
      "introduction": {
        "kicker": "05 · GAME DESIGN",
        "title": "O que o jogador faz?",
        "body": "Um jogo ganha identidade pelo que pede ao jogador — e pelo motivo para repetir."
      },
      "visual": {
        "theme": "design",
        "backgroundColor": 2038566,
        "accentColor": 16765812,
        "props": [
          {
            "id": "room-05-prop-1",
            "kind": "tree",
            "x": 340,
            "y": 870
          },
          {
            "id": "room-05-prop-2",
            "kind": "sign",
            "x": 940,
            "y": 870
          }
        ]
      },
      "plannedAssets": {
        "sprites": [
          "skill-tree",
          "core-loop-icons"
        ],
        "audio": [
          "skill-unlock",
          "objective-complete"
        ]
      }
    }
  },
  {
    "id": "room-06",
    "title": "Programação e Engine",
    "width": 1920,
    "objectives": [
      {
        "id": "room-06-objective",
        "label": "Concluir as revelações",
        "requiredRevealIds": [
          "room-06-game-loop",
          "room-06-lifecycle",
          "room-06-fixedupdate",
          "room-06-components",
          "room-06-input",
          "room-06-physics"
        ]
      }
    ],
    "hotspots": [
      {
        "id": "room-06-game-loop",
        "label": "Game Loop",
        "x": 440,
        "y": 495,
        "radius": 105,
        "revealId": "room-06-game-loop",
        "content": {
          "kicker": "ROOM-06 / 01",
          "title": "Input → Update → Render",
          "body": "Um jogo repete entrada, atualização e renderização. A 60 FPS, um frame dura em média cerca de 16,67 ms.",
          "code": "while (running) {\n  input();\n  update();\n  render();\n}"
        }
      },
      {
        "id": "room-06-lifecycle",
        "label": "MonoBehaviour",
        "x": 960,
        "y": 495,
        "radius": 105,
        "revealId": "room-06-lifecycle",
        "content": {
          "kicker": "ROOM-06 / 02",
          "title": "Quem chama Update()?",
          "body": "Em Unity, o Player Loop chama os callbacks do MonoBehaviour. Start inicializa; Update roda por frame quando habilitado.",
          "code": "void Start() { /* início */ }\nvoid Update() { /* por frame */ }"
        }
      },
      {
        "id": "room-06-fixedupdate",
        "label": "FixedUpdate",
        "x": 1480,
        "y": 495,
        "radius": 105,
        "revealId": "room-06-fixedupdate",
        "content": {
          "kicker": "ROOM-06 / 03",
          "title": "Física tem outro ritmo",
          "body": "FixedUpdate é chamado no timestep fixo, tipicamente 0,02 s por padrão (50 Hz); um frame pode conter zero, um ou vários passos.",
          "code": "void FixedUpdate() {\n  // lógica de física\n}"
        },
        "requiredRevealIds": [
          "room-06-lifecycle"
        ]
      },
      {
        "id": "room-06-components",
        "label": "Componentes",
        "x": 440,
        "y": 780,
        "radius": 105,
        "revealId": "room-06-components",
        "content": {
          "kicker": "ROOM-06 / 04",
          "title": "Compor em vez de monólito",
          "body": "GameObject combina Transform, SpriteRenderer, Rigidbody2D, Collider2D e scripts. Cada parte tem responsabilidade.",
          "code": "var rb = GetComponent<Rigidbody2D>();\n// Cada componente tem sua função."
        }
      },
      {
        "id": "room-06-input",
        "label": "Input System",
        "x": 960,
        "y": 780,
        "radius": 105,
        "revealId": "room-06-input",
        "content": {
          "kicker": "ROOM-06 / 05",
          "title": "De onde vem o comando?",
          "body": "O dispositivo gera eventos; o runtime os processa. Podemos consultar estados por frame ou reagir a callbacks de Input Actions.",
          "code": "using UnityEngine.InputSystem;\n\nif (Keyboard.current.spaceKey.wasPressedThisFrame) {\n  RequestJump();\n}"
        }
      },
      {
        "id": "room-06-physics",
        "label": "Rigidbody2D",
        "x": 1480,
        "y": 780,
        "radius": 105,
        "revealId": "room-06-physics",
        "content": {
          "kicker": "ROOM-06 / 06",
          "title": "Força não é teleporte",
          "body": "Rigidbody2D participa da simulação de movimento. Colliders definem formas de colisão; AddForce solicita uma influência física.",
          "code": "rb.AddForce(\n  Vector2.up * jumpForce,\n  ForceMode2D.Impulse\n);"
        },
        "requiredRevealIds": [
          "room-06-components",
          "room-06-fixedupdate"
        ]
      }
    ],
    "storyboard": {
      "learningGoal": "Compreender a divisão entre game loop, scripts, componentes, input e física.",
      "thesis": "A engine chama nosso código; nosso código usa a engine.",
      "takeaway": "Input → Update → Física → Render → Feedback.",
      "presenterCue": "Trate esta sala como a vertical slice #9. Mostre a engine chamando Update e FixedUpdate; compare exemplos de entrada antiga e moderna sem misturá-los.",
      "transitionCue": "Com lógica funcionando, é hora de comunicar visualmente.",
      "durationSeconds": 165,
      "introduction": {
        "kicker": "06 · PROGRAMAÇÃO",
        "title": "Quem faz o jogo rodar?",
        "body": "A engine organiza o loop, nossos scripts descrevem as regras e componentes aplicam os efeitos."
      },
      "visual": {
        "theme": "programming",
        "backgroundColor": 728619,
        "accentColor": 8250877,
        "props": [
          {
            "id": "room-06-prop-1",
            "kind": "terminal",
            "x": 340,
            "y": 870
          },
          {
            "id": "room-06-prop-2",
            "kind": "console",
            "x": 940,
            "y": 870
          },
          {
            "id": "room-06-prop-3",
            "kind": "sign",
            "x": 1540,
            "y": 870
          }
        ]
      },
      "plannedAssets": {
        "sprites": [
          "player-code-demo",
          "engine-diagram",
          "physics-diagram"
        ],
        "audio": [
          "code-line-reveal",
          "engine-ping",
          "physics-hit"
        ]
      }
    }
  },
  {
    "id": "room-07",
    "title": "Arte",
    "width": 1920,
    "objectives": [
      {
        "id": "room-07-objective",
        "label": "Concluir as revelações",
        "requiredRevealIds": [
          "room-07-concept",
          "room-07-sprites",
          "room-07-animation"
        ]
      }
    ],
    "hotspots": [
      {
        "id": "room-07-concept",
        "label": "Conceito",
        "x": 500,
        "y": 615,
        "radius": 133,
        "revealId": "room-07-concept",
        "content": {
          "kicker": "ROOM-07 / 01",
          "title": "Silhueta reconhecível",
          "body": "Começamos por referências, formas e uma linguagem visual que combine com o jogo."
        }
      },
      {
        "id": "room-07-sprites",
        "label": "Spritesheet",
        "x": 960,
        "y": 605,
        "radius": 133,
        "revealId": "room-07-sprites",
        "content": {
          "kicker": "ROOM-07 / 02",
          "title": "Desenhos organizados",
          "body": "Spritesheets armazenam quadros de animação. A engine escolhe qual quadro exibir a cada momento."
        }
      },
      {
        "id": "room-07-animation",
        "label": "Animação + UI",
        "x": 1430,
        "y": 615,
        "radius": 133,
        "revealId": "room-07-animation",
        "content": {
          "kicker": "ROOM-07 / 03",
          "title": "Movimento que comunica",
          "body": "Antecipação, poses e interface deixam ações legíveis; VFX destacam o que importa."
        }
      }
    ],
    "storyboard": {
      "learningGoal": "Mostrar o pipeline de concept, sprites, animação e integração.",
      "thesis": "Arte transforma estados abstratos em comunicação visual.",
      "takeaway": "Concept → Sprite → Animação → Engine.",
      "presenterCue": "Exiba primeiro um boneco retângulo; depois mostre sprite e animação com o mesmo movimento.",
      "transitionCue": "Falta uma camada que sentimos mesmo de olhos fechados.",
      "durationSeconds": 50,
      "introduction": {
        "kicker": "07 · ARTE",
        "title": "Como o jogo ganha forma?",
        "body": "Arte não é só decoração: ela explica o que está acontecendo."
      },
      "visual": {
        "theme": "art",
        "backgroundColor": 2429736,
        "accentColor": 16749513,
        "props": [
          {
            "id": "room-07-prop-1",
            "kind": "sign",
            "x": 340,
            "y": 870
          },
          {
            "id": "room-07-prop-2",
            "kind": "tree",
            "x": 940,
            "y": 870
          }
        ]
      },
      "plannedAssets": {
        "sprites": [
          "concept-process",
          "sprite-sheet-demo"
        ],
        "audio": [
          "art-swipe"
        ]
      }
    }
  },
  {
    "id": "room-08",
    "title": "Áudio",
    "width": 1920,
    "objectives": [
      {
        "id": "room-08-objective",
        "label": "Concluir as revelações",
        "requiredRevealIds": [
          "room-08-sfx",
          "room-08-music",
          "room-08-pipeline"
        ]
      }
    ],
    "hotspots": [
      {
        "id": "room-08-sfx",
        "label": "Efeitos sonoros",
        "x": 500,
        "y": 615,
        "radius": 133,
        "revealId": "room-08-sfx",
        "content": {
          "kicker": "ROOM-08 / 01",
          "title": "Confirmação instantânea",
          "body": "Um clique, uma flecha ou um impacto ficam mais claros com sons curtos e distintos."
        }
      },
      {
        "id": "room-08-music",
        "label": "Música e ambiência",
        "x": 960,
        "y": 605,
        "radius": 133,
        "revealId": "room-08-music",
        "content": {
          "kicker": "ROOM-08 / 02",
          "title": "Ritmo e contexto",
          "body": "Música cria tensão ou descanso; ambiência situa o lugar. Na palestra, o volume deve respeitar a voz."
        }
      },
      {
        "id": "room-08-pipeline",
        "label": "Evento → Mixer",
        "x": 1430,
        "y": 615,
        "radius": 133,
        "revealId": "room-08-pipeline",
        "content": {
          "kicker": "ROOM-08 / 03",
          "title": "O som vem de algum lugar",
          "body": "Um evento dispara um AudioSource ou sistema de áudio, passa pela mixagem e chega à saída."
        }
      }
    ],
    "storyboard": {
      "learningGoal": "Demonstrar áudio como feedback e atmosfera, não mero enfeite.",
      "thesis": "Som aumenta a clareza da ação e a sensação de resposta.",
      "takeaway": "O mesmo salto se sente diferente com som e feedback.",
      "presenterCue": "Compare o mesmo acontecimento silencioso e sonorizado; não dependa de volume alto no auditório.",
      "transitionCue": "Vamos juntar código, física, arte e som numa única ação.",
      "durationSeconds": 50,
      "introduction": {
        "kicker": "08 · ÁUDIO",
        "title": "Um jogo também é ouvido",
        "body": "SFX, música e ambiência dão textura ao que o jogador faz."
      },
      "visual": {
        "theme": "audio",
        "backgroundColor": 1320243,
        "accentColor": 10352058,
        "props": [
          {
            "id": "room-08-prop-1",
            "kind": "speaker",
            "x": 340,
            "y": 870
          },
          {
            "id": "room-08-prop-2",
            "kind": "console",
            "x": 940,
            "y": 870
          }
        ]
      },
      "plannedAssets": {
        "sprites": [
          "waveform",
          "audio-chain"
        ],
        "audio": [
          "sfx-ab-demo",
          "ambient-loop"
        ]
      }
    }
  },
  {
    "id": "room-09",
    "title": "A física do pulo",
    "width": 1920,
    "objectives": [
      {
        "id": "room-09-objective",
        "label": "Concluir as revelações",
        "requiredRevealIds": [
          "room-09-intent",
          "room-09-force",
          "room-09-gravity",
          "room-09-polish"
        ]
      }
    ],
    "hotspots": [
      {
        "id": "room-09-intent",
        "label": "Intenção de pular",
        "x": 400,
        "y": 565,
        "radius": 113,
        "revealId": "room-09-intent",
        "content": {
          "kicker": "ROOM-09 / 01",
          "title": "Capturar no Update",
          "body": "No exemplo com Input.GetKeyDown (API legacy), guardamos um pedido durante Update para não perder o clique entre passos fixos.",
          "code": "void Update() {\n  if (Input.GetKeyDown(KeyCode.Space))\n    jumpRequested = true;\n}"
        }
      },
      {
        "id": "room-09-force",
        "label": "Impulso físico",
        "x": 760,
        "y": 615,
        "radius": 113,
        "revealId": "room-09-force",
        "content": {
          "kicker": "ROOM-09 / 02",
          "title": "Aplicar no FixedUpdate",
          "body": "No próximo passo fixo, usamos Rigidbody2D.AddForce com modo Impulse. O script solicita; a física calcula o resultado.",
          "code": "void FixedUpdate() {\n  if (!jumpRequested) return;\n  rb.AddForce(Vector2.up * jumpForce,\n    ForceMode2D.Impulse);\n  jumpRequested = false;\n}"
        },
        "requiredRevealIds": [
          "room-09-intent"
        ]
      },
      {
        "id": "room-09-gravity",
        "label": "Gravidade e contato",
        "x": 1150,
        "y": 615,
        "radius": 113,
        "revealId": "room-09-gravity",
        "content": {
          "kicker": "ROOM-09 / 03",
          "title": "Subir, parar, cair",
          "body": "Velocidade vertical diminui na subida, muda de sinal no ápice e cresce na queda; colisores delimitam o contato com o chão."
        },
        "requiredRevealIds": [
          "room-09-force"
        ]
      },
      {
        "id": "room-09-polish",
        "label": "Polish",
        "x": 1530,
        "y": 565,
        "radius": 113,
        "revealId": "room-09-polish",
        "content": {
          "kicker": "ROOM-09 / 04",
          "title": "De mecânica a experiência",
          "body": "Animação, poeira, SFX e feedback tornam o pulo legível e satisfatório; a regra física continua a mesma."
        },
        "requiredRevealIds": [
          "room-09-gravity"
        ]
      }
    ],
    "storyboard": {
      "learningGoal": "Explicar um salto de ponta a ponta, passando pelo código e sistemas da engine.",
      "thesis": "Uma ação simples depende de múltiplas camadas coordenadas.",
      "takeaway": "Input → intenção → FixedUpdate → Rigidbody2D → colisão → animação/som.",
      "presenterCue": "Explique que o exemplo usa Input.GetKeyDown (legacy) por ser curto, e que o novo Input System usa ações/callbacks ou polling. Evite confundir Update e FixedUpdate.",
      "transitionCue": "Agora podemos elevar o protótipo à experiência completa.",
      "durationSeconds": 135,
      "introduction": {
        "kicker": "09 · SISTEMA DE PULO",
        "title": "O que acontece quando pulamos?",
        "body": "Vamos seguir uma única ação do dispositivo até o frame exibido."
      },
      "visual": {
        "theme": "jump",
        "backgroundColor": 1055794,
        "accentColor": 10280703,
        "props": [
          {
            "id": "room-09-prop-1",
            "kind": "console",
            "x": 340,
            "y": 870
          },
          {
            "id": "room-09-prop-2",
            "kind": "tree",
            "x": 940,
            "y": 870
          },
          {
            "id": "room-09-prop-3",
            "kind": "sign",
            "x": 1540,
            "y": 870
          }
        ]
      },
      "plannedAssets": {
        "sprites": [
          "jump-state-diagram",
          "jump-fx"
        ],
        "audio": [
          "jump",
          "land",
          "polish-unlock"
        ]
      }
    }
  },
  {
    "id": "room-10",
    "title": "Do protótipo ao jogo",
    "width": 1920,
    "objectives": [
      {
        "id": "room-10-objective",
        "label": "Concluir as revelações",
        "requiredRevealIds": [
          "room-10-prototype",
          "room-10-systems",
          "room-10-feel"
        ]
      }
    ],
    "hotspots": [
      {
        "id": "room-10-prototype",
        "label": "Protótipo",
        "x": 500,
        "y": 615,
        "radius": 133,
        "revealId": "room-10-prototype",
        "content": {
          "kicker": "ROOM-10 / 01",
          "title": "Testar o coração do jogo",
          "body": "Um quadrado que pula já permite validar altura, timing e desafio antes de investir em arte final."
        }
      },
      {
        "id": "room-10-systems",
        "label": "Integração",
        "x": 960,
        "y": 605,
        "radius": 133,
        "revealId": "room-10-systems",
        "content": {
          "kicker": "ROOM-10 / 02",
          "title": "Tudo conversa",
          "body": "Código, design, sprites, áudio, UI e efeitos compartilham eventos e estados."
        }
      },
      {
        "id": "room-10-feel",
        "label": "Game Feel",
        "x": 1430,
        "y": 615,
        "radius": 133,
        "revealId": "room-10-feel",
        "content": {
          "kicker": "ROOM-10 / 03",
          "title": "O detalhe muda tudo",
          "body": "Antecipação, resposta visual, som e ritmo tornam a mesma regra muito mais agradável."
        }
      }
    ],
    "storyboard": {
      "learningGoal": "Sintetizar como diferentes disciplinas transformam uma mecânica em produto.",
      "thesis": "O primeiro protótipo prova uma ideia; o acabamento torna a experiência clara e atraente.",
      "takeaway": "Nenhuma disciplina cria o jogo sozinha.",
      "presenterCue": "Mostre a evolução em três etapas, sem transformar em uma demo longa de desenvolvimento.",
      "transitionCue": "Concluir, agradecer e abrir para perguntas.",
      "durationSeconds": 65,
      "introduction": {
        "kicker": "10 · INTEGRAÇÃO",
        "title": "O protótipo já é um jogo?",
        "body": "Agora somamos regras, conteúdo, arte, feedback e testes."
      },
      "visual": {
        "theme": "integration",
        "backgroundColor": 1906736,
        "accentColor": 13742079,
        "props": [
          {
            "id": "room-10-prop-1",
            "kind": "console",
            "x": 340,
            "y": 870
          },
          {
            "id": "room-10-prop-2",
            "kind": "door",
            "x": 940,
            "y": 870
          }
        ]
      },
      "plannedAssets": {
        "sprites": [
          "before-after-comparison"
        ],
        "audio": [
          "prototype-to-game"
        ]
      }
    }
  },
  {
    "id": "room-final",
    "title": "Quest Complete",
    "width": 1920,
    "objectives": [
      {
        "id": "room-final-objective",
        "label": "Concluir o workshop",
        "requiredRevealIds": [
          "room-final-credits"
        ]
      }
    ],
    "hotspots": [
      {
        "id": "room-final-credits",
        "label": "Quest Complete",
        "x": 950,
        "y": 590,
        "radius": 133,
        "revealId": "room-final-credits",
        "content": {
          "kicker": "ROOM-FINAL / 01",
          "title": "+100 XP — Thanks for Playing",
          "body": "Agora vocês conhecem os quatro pilares: Game Design, Programação, Arte e Áudio. Obrigado! Perguntas?"
        }
      }
    ],
    "storyboard": {
      "learningGoal": "Reforçar a mensagem central e encerrar com Q&A.",
      "thesis": "Criar jogos é transformar sistemas em experiências que conseguimos sentir.",
      "takeaway": "Quest Complete — obrigado por jogar.",
      "presenterCue": "Agradeça, indique referências e convide perguntas. Não dependa do áudio para o fechamento.",
      "transitionCue": "Fim do roteiro. Q&A via Enter ou fala do apresentador (#30).",
      "durationSeconds": 25,
      "introduction": {
        "kicker": "FINAL · QUEST COMPLETE",
        "title": "Do Zero ao Jogo",
        "body": "Criar jogos é unir regras, código, arte e som para provocar uma experiência."
      },
      "visual": {
        "theme": "final",
        "backgroundColor": 1055784,
        "accentColor": 16767877,
        "props": [
          {
            "id": "room-final-prop-1",
            "kind": "door",
            "x": 340,
            "y": 870
          },
          {
            "id": "room-final-prop-2",
            "kind": "sign",
            "x": 940,
            "y": 870
          }
        ]
      },
      "plannedAssets": {
        "sprites": [
          "quest-banner",
          "credits"
        ],
        "audio": [
          "quest-complete"
        ]
      }
    }
  }
] satisfies readonly StoryboardRoomDefinition[];
