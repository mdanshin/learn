---
sidebar_position: 1
title: "Неделя 5 — Cursor/Cline как инструмент"
sidebar_label: "Неделя 5 · AI-инструмент"
---

# Неделя 5 — Cursor/Cline как инструмент разработки

**Цель недели:** научиться использовать AI-агента как ускоритель, а не как автопилот — внутри правил
проекта и через обязательный review каждого diff.

## Теория

**AI-агент — это junior, которому нельзя доверять вслепую.** Он быстр на boilerplate, но:
ломает контекст, переписывает лишнее, добавляет ненужные абстракции, может утащить секреты в код.

Ключевые режимы Cursor/Cline: chat по кодовой базе, inline edits, agent mode, работа с diff.
Главный навык — **читать и принимать/отклонять diff**, а не жать «accept all».

**Правила проекта (`AGENTS.md` / rules-файл):** описываете архитектуру, coding conventions и запреты —
не менять API без причины, не трогать env, не переписывать unrelated files.

**AI review checklist** (применяете к каждому diff): security · types · data boundaries · скрытые
изменения поведения · лишние абстракции · отсутствующие тесты · error handling.

## Ресурсы

- [Cursor — Docs](https://docs.cursor.com/) — chat, agent, rules.
- [Cline — Docs](https://docs.cline.bot/).
- [`AGENTS.md` — конвенция](https://agents.md/) для инструкций агенту.
- [Anthropic — Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices) — принципы применимы к любому агенту.

## Практика

- Создать `AGENTS.md` / rules-файл проекта: архитектура, conventions, запреты.
- Завести AI review checklist.
- Дать агенту одну маленькую задачу и разобрать diff по чеклисту.

## Критерий готовности

- [ ] агент работает внутри правил проекта
- [ ] все изменения проходят через review
- [ ] нет blind accept

:::note
Большой теоретический AI-workflow документ пока не пишем — он появится на [неделе 8](/mesyac-2/nedelya-8) на реальном примере.
:::
