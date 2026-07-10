---
sidebar_position: 1
title: "Неделя 9 — Backend boundary + внешний API"
sidebar_label: "Неделя 9 · Backend + API"
---

# Неделя 9 — Backend boundary + один внешний API

**Цель недели:** ввести серверный слой (Edge/Vercel Functions), через который идут secrets и вызовы
внешнего API. Бюджет — ровно **10 ч**.

:::danger Главный принцип месяца 3
Secrets, вызовы внешних API, webhooks, платежи и LLM идут **только через backend boundary**.
Во frontend — только public Supabase anon key и URL. Всё остальное серверно.
:::

## План на неделю (10 ч)

| Задача | Часы |
|---|---:|
| Выбрать один runtime: Supabase Edge Functions **или** Vercel Functions (не оба) | 0.5 |
| Создать server-side endpoint `sync-external-data` | 1.5 |
| Настроить env secrets server-side | 1 |
| Подключить один **простой** external API через backend | 2 |
| Сохранить результат в Supabase | 1 |
| Показать данные в dashboard | 1 |
| Минимальный error handling: loading/error/empty | 1 |
| Буфер: CORS, env, deploy, auth/session | 2 |
| **Итого** | **10 ч** |

## Ресурсы

- [Supabase Edge Functions](https://supabase.com/docs/guides/functions) или [Vercel Functions](https://vercel.com/docs/functions).
- [Secrets в Edge Functions](https://supabase.com/docs/guides/functions/secrets).
- [AbortController — таймауты fetch](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

## Критерий готовности

- [ ] интеграция работает стабильно
- [ ] ключи не попадают во frontend и GitHub
- [ ] ошибки не ломают интерфейс

:::tip
Буфер здесь ниже идеального — берите **максимально простой API** (без OAuth-плясок).
:::
