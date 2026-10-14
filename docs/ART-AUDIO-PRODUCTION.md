# Produção visual e sonora — estilo juicy retro-moderno

## Objetivo

Transformar Slide Rooms em apresentação de ~15 min com **pixel art retro-moderna**, leitura em projetor e feedback sensorial memorável. Primeiro validar Room 6; só depois escalar assets para as demais salas.

## Style bible — proposta a validar no piloto

- Fundo noturno/escuro azul-ardósia; elementos de leitura em alto contraste e acentos por disciplina: Game Design dourado, Programação ciano, Arte magenta, Áudio verde (cores indicativas; validar paleta e daltonismo).
- Silhuetas grandes, bordas nítidas; 8/16-bit no mundo, tipografia clara e não-pixelada para código/longos textos.
- Resolução lógica 1920×1080 **não obriga sprites de 1920px**: fonte de personagem proposta 32×48 ou 48×64 pixels, escalada para altura visível consistente. A escala final deve ser aferida em 720p; evitar shimmering de pixel em escala fracionária.
- HUD RPG discreto, placas/quadros temáticos, ícones consistentes, glow legível, partículas de baixo custo, sem CRT pesado.
- Não usar arte final que comprometa leitura, pontos de interação ou safe area.

## Sprite inventory — primeiro pack

| Asset | Produção | Critério |
|---|---|---|
| Player | criação própria ou adaptação CC0 verificada | idle 6–8 frames; walk 6–8; jump/fall 2–4; aim/draw/shoot 4–6; land 3–4 |
| Arrow | próprio | corpo/ponta/efeito e pivot consistente |
| Hotspot / target | próprio | locked / available / hover / hit / revealed |
| World kit | pack CC0 + personalização | floor 3 variações, paredes, placas, portas, objetos de cena |
| Background layers | próprio/modular | 3 layers, sem roubar foco dos textos |
| UI | próprio ou kit licenciado | molduras, objetivos, ícones, cursores e checkmarks |
| Disciplines icons | próprio | Game Design / Programação / Arte / Áudio |
| VFX atlas | próprio | poeira, faíscas, sparkle, glow, wave, streak |
| Room-specific props | após Room 6 aprovada | somente o necessário para sustentar cada conceito |

## Pipeline visual

1. Concept/style tiles (Room 6 em 720p e 1080p).
2. Produzir `assets/source/` (editable source Aseprite/LibreSprite/Krita/PNG), exportando para `public/assets/sprites/`, `public/assets/backgrounds/`, `public/assets/ui/`.
3. Tiles/sprites em tamanhos lógicos consistentes (8/16/32px para módulos); spritesheet/atlas com `frameWidth`, `frameHeight`, pivôs e nomes `player-idle`, `player-run`, `player-shoot`.
4. Export PNG RGBA sem interpolação, nearest-neighbor, border/extrude quando atlas exigir; compressão lossless.
5. Carregar via Phaser preload, atlas metadata tipado e fallback placeholder se asset falhar.
6. Revisar licença/autor/origem de cada item no manifest; manter fonte editável versionada quando possível.
7. Testar idle, run, jump, shoot em 720p e 1080p com movimento sem shimmer.

## Fontes visuais possíveis (não incorporadas automaticamente)

- Kenney assets/pixel packs: https://kenney.nl/assets/pixel-pack ; https://kenney.nl/assets/pixel-platformer ; https://kenney.nl/support — assets dessas páginas indicam CC0, conferir a licença do pacote baixado.
- OpenGameArt: https://opengameart.org/ — cada item tem licença própria (CC0, CC BY, CC BY-SA etc.); usar preferencialmente CC0, registrar autor e requisitos.
- Pixel editor: LibreSprite/Krita ou Aseprite; criação autoral dá mais coesão.
- Não importar sprites/spritesheets, marcas, capas, screenshots ou músicas de franquias conhecidas sem verificar direitos/uso pretendido; preferir ilustrações didáticas próprias.

## Eventos sonoros — primeiro pack

| Evento | Característica / feedback |
|---|---|
| `ui_hover` | blip baixo e sutil (com cooldown) |
| `ui_confirm` / `ui_back` | pluck curto / descida tonal |
| `bow_draw` | tensão suave 80–140ms |
| `arrow_release` | ataque curto |
| `arrow_whoosh` | ruído estéreo breve, distância opcional |
| `target_hit` | tick/percussão + impacto, variante |
| `unlock` | subida de 2–3 notas |
| `objective_complete` | mini fanfarra de 0,4–0,8s |
| `jump`, `land` | blip ascendente / poeira subgrave discreta |
| `room_transition` | swish suave sem mascarar voz |
| `quest_complete` | stinger de encerramento |
| `ambient_loop`, `music_loop` | opcionais, sem letra e sem ocupar voz |

## Obtenção/criação de áudio

Preferência:
1. **Gerar os SFX** com jfxr (https://github.com/ttencate/jfxr e https://jfxr.frozenfractal.com), preservar presets/source e export final em OGG/WAV/MP3 conforme compatibilidade.
2. **Assets CC0** de Kenney (https://kenney.nl/support) após verificação de licença exata por pack.
3. **Freesound** (https://freesound.org/help/faq/) apenas quando cada som tiver licença verificada; CC BY requer atribuição, CC BY-NC impõe limitação de uso.
4. Criar ambiência/música própria ou licenciar explicitamente. Evitar rip de músicas de jogos.

Não adotar fonte ou áudio remoto em runtime. Manifest:
`id | arquivo | autor | origem URL | licença/versão | atribuição exigida | alterações | data revisão`.

## AudioManager / mix

- Bus master, sfx, music, ambient; mute global imediato, master baixo por padrão e limite de polifonia.
- Música é **opt-in** no modo palestra (desativada por padrão até ensaio com microfone); SFX pontuais baixos.
- Browsers impedem autoplay não autorizado: desbloquear áudio após Enter/click e tolerar recusas. Sem dispositivo de áudio, apresentação prossegue.
- Evitar áudio em hover contínuo, clipagem e efeitos altos. Duck music sob fala importante; crossfade em transições.
- Opção de SFX OFF e modo FX reduzido, com preferências persistidas somente quando aprovado.

## Juice com significado

- Atirar: anticipation 80–140ms + release + arrow trail.
- Acertar: hit marker, brilho 80–120ms, 3–10 sparks de 200–450ms, som curto.
- Revelar: título/diagrama aparece em 150–300ms por bloco, objetivo é marcado e hotspot muda estado.
- Concluir: microstinger, porta reage, HUD mostra progresso. Sem screen shake durante fala/código.
- Efeitos com pooling/budget e reduced-motion.

## Definition of Done

Pack Room 6 e áudio local integrados, manifesto de licenças assinado/verificado, FPS e legibilidade em projetor avaliados, modo mudo e FX mínimo completos. Só depois produzir variações de sala.
