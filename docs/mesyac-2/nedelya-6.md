---
sidebar_position: 2
title: "Неделя 6 — Спецификации и декомпозиция"
sidebar_label: "Неделя 6 · Спецификации"
---

# Неделя 6 — Спецификации и декомпозиция задач

**Цель недели:** давать агенту не «сделай фичу», а нормальное техзадание — тогда diff предсказуем и проверяем.

## Теория

**Issue-driven development:** каждая единица работы = issue с чёткими границами. Формула хорошей задачи:

> **context → task → constraints → done criteria**

Плюс: какие файлы можно менять, какие нельзя. Small batch changes (маленькими порциями) + rollback
thinking (как откатить). Планирование **до** генерации кода экономит часы на переделке.

## Ресурсы

- [GitHub Issues — про хорошие issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues).
- [User story + acceptance criteria](https://www.atlassian.com/agile/project-management/user-stories) — формат постановки.

## Практика

- Взять проект №1, создать 3–5 GitHub issues.
- Для каждой: цель, контекст, ограничения, критерии готовности, какие файлы можно/нельзя менять.
- Один issue оформить как готовый prompt для агента.

Примеры задач: экспорт CSV, статусы заявок, фильтр по датам, email notification mock, dashboard metric.

## Критерий готовности

- [ ] агент получает нормальное техзадание, а не «сделай фичу»
- [ ] каждая задача проверяется отдельным diff
