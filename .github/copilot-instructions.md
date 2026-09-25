# GitHub Copilot Instructions

Este é um projeto TypeScript + Phaser 3 + Vite para uma apresentação interativa chamada **Slide Rooms**.

Antes de implementar uma tarefa, leia `AGENTS.md`, `docs/STACK.md` e `docs/ARCHITECTURE.md`.

Regras principais:

- use TypeScript strict;
- mantenha game world, presentation controller e DOM UI separados;
- Phaser controla mundo 2D, câmera, input, sprites, tweens, áudio e física;
- HTML/CSS controla painéis de conteúdo, código, HUD e créditos;
- rooms e hotspots devem ser preferencialmente data-driven;
- não adicione React ou outra framework UI;
- não adicione outra engine;
- preserve navegação por teclado como fallback;
- o personagem não pode impedir a apresentação;
- valide com typecheck, lint, testes e build;
- atualize documentação quando alterar arquitetura.
