---
sidebar_position: 5
title: "Критический путь и грабли"
sidebar_label: "★ Критический путь + грабли"
---

# Недели 9–12: критический путь, что резать и грабли

Бюджет месяца — ровно ~10 ч/нед × 4 = **~40 часов**. Интеграции обычно жрут 30–40% сверх плана
(env, подписи, CORS, cold starts). Ниже — как не утонуть.

## Что НЕ влезает в 40 часов (и это нормально)

Второй внешний API · email + Telegram одновременно · Stripe subscriptions / portal / refunds /
coupons · retry-dashboard и dead-letter queue (только `failed` status) · сложное rate limiting для
LLM · streaming LLM UI · embeddings / RAG / vector search · Playwright e2e · Sentry / observability
platform · health/status page · signature verification для каждого провайдера (обязательно только
Stripe) · красивый admin-дашборд · UI-полировка сверх понятного demo flow.

## Критический путь

Минимум, чтобы проект №2 считался integration-heavy MVP:

1. Server-side boundary, secrets не во frontend.
2. Один внешний API через backend, данные в Supabase и в UI.
3. Один webhook с idempotency, меняет статус бизнес-сущности.
4. Stripe test checkout, webhook обновляет статус оплаты.
5. Telegram notification после события.
6. LLM-фича: structured JSON + Zod.
7. README с demo script (показать flow за 5 минут).

**Резать нельзя:** backend boundary · secrets server-side · idempotency · сохранение событий в
Supabase · Zod-валидацию LLM · README с demo flow.

**Порядок среза, если отстаёте:** Telegram → сложность внешнего API (взять простейший/mock) →
human confirmation (оставить как TODO/security note) → UI-полировку LLM и оплаты → signature
verification для не-Stripe webhook.

## Топ-5 граблей недель 9–12

1. **Секреты утекают во frontend.** Все ключи (API, Stripe secret, Telegram token, LLM key) — только в serverless env.
2. **Stripe webhook падает на raw body/signature.** Официальный пример под ваш runtime, не парсить body до `constructEvent`, локально — Stripe CLI.
3. **CORS/auth ломают serverless endpoints.** Заранее сделать `ping`-endpoint, проверить `OPTIONS`/origin/headers. Публичные webhooks не требуют user JWT — проверяем подпись провайдера.
4. **Idempotency вспоминают поздно.** Завести `integration_events` с unique constraint в первый день недели 10.
5. **LLM возвращает невалидный JSON.** Structured output/schema, короткий ответ, Zod-валидация, `failed` при ошибке. Не строить чат.

## Пример сильного проекта №2 — AI Lead Processing Dashboard

1. Клиент оставляет заявку → данные в Supabase.
2. LLM делает summary и классификацию (structured output + Zod).
3. Менеджер получает Telegram-уведомление.
4. Статус заявки отображается в dashboard.
5. Тестовый Stripe checkout открывает доступ к premium-функции.
6. Webhook обновляет статус (idempotent).
7. Все события логируются в `integration_events`.
