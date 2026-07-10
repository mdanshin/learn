---
sidebar_position: 2
title: "Неделя 14 — Hardening проектов"
sidebar_label: "Неделя 14 · Hardening"
---

# Неделя 14 — Hardening проектов

**Цель недели:** пройтись по проектам как ревьюер **по чеклисту** — без новых больших фич.

## Чеклист hardening

- env review (секреты только в `.env` / serverless env, `.env.example` на месте)
- RLS review
- webhook review: idempotency, retry, статусы
- dead code cleanup
- README cleanup
- seed/demo data — убедиться, что demo не ломается
- CI: добавить прогон tests, если ещё нет (lint / typecheck / build / test)
- простые failed events видны в dashboard (вместо внешней observability)

## Ресурсы

- [GitHub Actions — CI для Node](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs).
- [The Twelve-Factor App — Config](https://12factor.net/config) — про env и секреты.

## Критерий готовности

- [ ] проект можно открыть по ссылке
- [ ] можно понять по README
- [ ] можно запустить локально
- [ ] можно объяснить архитектуру

:::warning Что убрано
**Sentry/Highlight.io** (заменяем таблицей событий в Supabase), **health/status page**. **Playwright** —
только если остался реальный запас времени, 1–2 smoke-сценария на главный флоу.
:::
