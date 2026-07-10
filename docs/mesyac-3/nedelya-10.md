---
sidebar_position: 2
title: "Неделя 10 — Вебхуки и событийная логика"
sidebar_label: "Неделя 10 · Webhooks"
---

# Неделя 10 — Вебхуки и событийная логика

**Цель недели:** принять входящий webhook и обработать его **безопасно и повторяемо** (idempotency),
с таблицей событий. Бюджет — **10 ч**.

## План на неделю (10 ч)

| Задача | Часы |
|---|---:|
| Таблица `integration_events` (`provider`, `provider_event_id`, `status`, `payload`, `created_at`, unique по `provider + provider_event_id`) | 1 |
| Endpoint/function `webhook-handler` | 1.5 |
| Принять тестовое событие, сохранить payload | 1 |
| **Idempotency** через unique `provider_event_id` | 1.5 |
| Обработать 1 тип события и обновить связанную запись | 1.5 |
| Показать event log/status в dashboard | 1 |
| README-секция: webhook flow + idempotency | 0.5 |
| Буфер: raw body, signature, duplicate events, deploy logs | 2 |
| **Итого** | **10 ч** |

## Теория: idempotency

Провайдеры доставляют webhook **как минимум один раз** — дубли неизбежны. Idempotency = повторное
событие не создаёт повторный эффект. Приём: unique-констрейнт по `provider_event_id`; при вставке
дубля — тихо игнорируем/обновляем статус, а не создаём вторую запись.

## Ресурсы

- [Stripe — Webhooks (лучший разбор паттерна)](https://docs.stripe.com/webhooks).
- [Idempotent requests](https://docs.stripe.com/api/idempotent_requests).
- [Supabase Functions — HTTP](https://supabase.com/docs/guides/functions/quickstart).

## Критерий готовности

- [ ] webhook обрабатывается безопасно и повторяемо
- [ ] есть таблица `integration_events` со статусами `received / processed / failed`
- [ ] повторное событие не создаёт дубль

:::warning
Заведите `integration_events` в **первый же день недели**. Idempotency, «вспомненная» в конце, стоит
потерянных часов. Signature verification обязательна только для Stripe ([неделя 11](/mesyac-3/nedelya-11)).
:::
