---
sidebar_position: 4
title: "Неделя 12 — LLM-фича внутри продукта"
sidebar_label: "Неделя 12 · LLM-фича"
---

# Неделя 12 — LLM-фича внутри продукта

**Цель недели:** встроить LLM-фичу со **structured output** и **Zod-валидацией** ответа —
не «чатик», а полезное действие с human-in-the-loop. Бюджет — **10 ч**.

## План на неделю (10 ч)

| Задача | Часы |
|---|---:|
| Выбрать одну LLM-фичу: summary / classification / next action | 0.5 |
| Endpoint/function `generate-ai-summary` server-side | 1.5 |
| Prompt + structured JSON response | 1.5 |
| **Zod validation** ответа модели | 1 |
| Сохранить результат/status в Supabase | 1 |
| UI: кнопка generate + loading/error/result | 1 |
| Human confirmation перед использованием результата | 0.5 |
| README: architecture, env, integration flow, demo script | 1 |
| Буфер: JSON parsing, model errors, timeout, deploy env | 2 |
| **Итого** | **10 ч** |

## Теория: structured output + валидация

Модель может вернуть кривой JSON. Защита: просить structured output по схеме, держать ответ коротким,
валидировать через Zod, при ошибке — статус `failed` и понятная ошибка, а не краш.

```ts
const summarySchema = z.object({
  summary: z.string().max(500),
  category: z.enum(['hot', 'warm', 'cold']),
  nextAction: z.string(),
});
const parsed = summarySchema.safeParse(JSON.parse(modelOutput));
if (!parsed.success) { /* пометить failed, показать ошибку */ }
```

## Ресурсы

- [Anthropic — Tool use / structured output](https://docs.claude.com/en/docs/build-with-claude/tool-use).
- [OpenAI — Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs).
- [Zod — safeParse](https://zod.dev/?id=safeparse).
- [OWASP Top 10 for LLM Apps](https://owasp.org/www-project-top-10-for-large-language-model-applications/) — prompt injection.

## Критерий готовности (артефакт месяца)

- [ ] модель возвращает structured JSON, ответ валидируется Zod
- [ ] невалидный ответ → `failed` + понятная ошибка, а не краш
- [ ] результат сохраняется, пользователь видит статус генерации

> **Артефакт месяца 3 — проект №2:** integration-heavy MVP с serverless backend, внешним API,
> webhook, Stripe test payment, Telegram-уведомлением и LLM-фичей со structured output.

:::note
Без streaming, chat UI, embeddings/RAG и сложного cost tracking. Хороший формат фичи: «AI делает
summary и предлагает next action, но менеджер подтверждает действие» (human-in-the-loop).
:::
