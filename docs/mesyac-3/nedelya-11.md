---
sidebar_position: 3
title: "Неделя 11 — Платежи и уведомления"
sidebar_label: "Неделя 11 · Stripe + Telegram"
---

# Неделя 11 — Платежи и уведомления

**Цель недели:** провести пользователя через **Stripe test checkout**, обновить статус по webhook и
отправить Telegram-уведомление. Бюджет — **10 ч**.

## План на неделю (10 ч)

| Задача | Часы |
|---|---:|
| Stripe test product/price (или amount в коде) | 1 |
| Endpoint `create-checkout-session` server-side | 2 |
| Redirect из UI на Stripe Checkout | 1 |
| Stripe webhook `checkout.session.completed` | 2 |
| Обновить `payment_status` в Supabase | 1 |
| Telegram notification после успешного события | 1 |
| Буфер: Stripe CLI, webhook secret, env, local vs deployed URL | 2 |
| **Итого** | **10 ч** |

## Ресурсы

- [Stripe Checkout — Quickstart](https://docs.stripe.com/checkout/quickstart).
- [Stripe CLI — локальная отладка webhook](https://docs.stripe.com/stripe-cli).
- [Проверка подписи webhook](https://docs.stripe.com/webhooks#verify-events) — `stripe.webhooks.constructEvent`.
- [Telegram Bot API — sendMessage](https://core.telegram.org/bots/api#sendmessage).

## Критерий готовности

- [ ] пользователь проходит test payment flow
- [ ] Stripe webhook обновляет статус оплаты
- [ ] уведомление уходит после события
- [ ] повторный webhook не создаёт дубль

:::warning Scope и грабли
Только **one-time payment**. Без subscriptions, customer portal, invoices, refunds, coupons. Один
канал уведомлений — **Telegram**. Ключевая грабля: не парсить body до `stripe.webhooks.constructEvent`;
локально — Stripe CLI; на деплое отдельно прописать webhook signing secret.
:::
