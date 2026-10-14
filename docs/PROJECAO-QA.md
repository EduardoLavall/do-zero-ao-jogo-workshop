# Guia de projeção, legibilidade e QA visual

## Resolução

**Manter canvas lógico Phaser em 1920×1080, proporção 16:9 e `Phaser.Scale.FIT`**. Resolução lógica NÃO é a resolução real do projetor. Aplicar `FIT` e centralizar sem esticar. Não mudar para 1280×720 por padrão.

| Saída física | Fator visual vs 1920×1080 | Resultado |
|---|---:|---|
| 1920×1080 (16:9) | 1 | usa a tela toda |
| 1280×720 (16:9) | 0,667 | usa a tela toda |
| 1280×800 (16:10) | 0,667 | conteúdo 1280×720, com 40px de letterbox acima e abaixo |
| 1440×900 (16:10) | 0,75 | 1440×810, ~45px acima e abaixo |

## Tamanhos de referência para 720p

| Papel | Lógico recomendado | Aproximado em 720p |
|---|---:|---:|
| Título principal | >= 48–60px | >=32–40px |
| Título de bloco | >= 38–44px | >=25–29px |
| Corpo essencial | >= 30–32px | >=20–21px |
| Código essencial | >= 30–34px | >=20–23px |
| Legenda indispensável | >=24–28px | >=16–19px |

Não colocar informação essencial apenas em letras minúsculas. Tomar isso como **hipótese de design**, não garantia: aprovação depende de teste da última fileira no projetor real.

## Safe area

- O valor atual `SAFE_AREA_MARGIN=29` é **margem visual/de debug**, não garantia de área legível (~1,5% da largura).
- Definir área de segurança **de conteúdo**, preferencialmente margem alvo de 96 px em cada lateral do canvas lógico (5% da largura), com ajuste vertical e para UI real.
- Isso **não obriga faixas laterais largas ou borda aparente**. Exit zones invisíveis podem permanecer 22px, independentes da composição do texto.
- Diagrama, painel, ícones e texto não podem encostar ou cruzar o retângulo seguro.
- Não deixar objetos importantes encobertos por HUD/overlay/character.

## Conteúdo/DOM

- Texto longo, code snippets, diagrams e menus: DOM/CSS overlay acessível, não Phaser.Text.
- Coordenadas lógicas compartilhadas e transformação/resizing alinhada ao canvas efetivo (letterbox incluso).
- Canvas para sprites, partículas, flechas e world.
- Testar foco, teclas, alto contraste, reduced motion, fullscreen e zoom do browser.

## Plano mínimo de inspeção

1. Chrome/Firefox em 1920×1080, 1280×720, 1280×800, 1366×768, com fullscreen.
2. Screenshots de menu, room de texto denso, room de código, impacto, overlay, credits.
3. Conferir: sem corte ou sobreposição, ação óbvia, fonte legível, contraste e cursor/hit-test alinhado.
4. Validar posição do mouse no hotspot com escala fracionária e letterbox.
5. Mover a janela, alternar monitor, sair e entrar de fullscreen, redimensionar durante reveal.
6. Projetor real: leitura da última fileira, fluxo com e sem áudio, com brilho/contraste reais.

## Go/no-go

Bloquear release se: texto técnico não legível na última fileira; conteúdo cortado; HUD colide com painel; alvo deslocado; input não funciona em 16:10; fullscreen quebra conteúdo. GitHub CI não substitui teste de projetor.
