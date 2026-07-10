---
id: intro
title: Введение
slug: /
sidebar_position: 1
sidebar_label: Введение
---

# AI-Assisted Full-Stack Roadmap

Учебник по дорожной карте на 4 месяца: как с прошлым опытом кодинга выйти на роль
**AI-assisted full-stack developer / MVP builder / prototyping engineer** на стеке
**React + TypeScript + Supabase + AI-агенты**.

- **Профиль:** есть опыт кодинга, нужно освежить и актуализировать.
- **Темп:** ~10 ч/нед.
- **Срок:** ~4 месяца / ~160 часов.
- **Результат:** портфолио из 2 сильных проектов + 1 небольшой утилиты, с которым можно откликаться.

:::tip Как устроен этот сайт
Каждая неделя — отдельная страница в едином формате:

1. **Теория** — сжато, по ключевым концепциям, с примерами кода.
2. **Ресурсы** — кураторские ссылки на лучшие внешние источники для глубины (MDN, официальные доки, разборы). Мы не переписываем документацию — мы ведём по ней.
3. **Практика** — что именно сделать руками на этой неделе.
4. **Критерий готовности** — чеклист, по которому видно, что неделя закрыта.

Не пытайтесь прочитать всё подряд. Идите по неделям, делайте практику, сверяйтесь с чеклистом.
:::

## Основной стек

Весь период работаем в одном боевом наборе, чтобы не распыляться:

| Слой | Инструмент |
|---|---|
| Frontend | React + TypeScript + Vite |
| Package manager | pnpm |
| UI | Tailwind CSS + shadcn/ui |
| Routing | React Router **или** TanStack Router (один) |
| Server state | TanStack Query (+ Zustand только при нужде) |
| Backend/BaaS | Supabase |
| **Backend boundary** | Supabase Edge Functions **или** Vercel/Netlify Functions |
| DB | PostgreSQL через Supabase (migrations + generated types) |
| Auth / Access | Supabase Auth + RLS |
| Validation / Forms | Zod + React Hook Form |
| Deploy / CI | Vercel/Netlify + Supabase + GitHub Actions |
| Testing | Vitest |
| AI coding | Cursor + Cline |
| LLM API | OpenAI / Anthropic / другой |

:::info Почему именно так
**Backend-слой (Edge/Vercel Functions) — обязателен, а не опционален.** Webhooks, платежи,
вызовы LLM и secrets нельзя безопасно делать из чистого frontend. Это главный принцип месяца 3.

**Дисциплина с первого дня, а не с недели 14:** минимальный CI, Vitest, generated types, README
и env-гигиена появляются уже в проекте №1. Копить hardening на конец — главная причина, по которой
проекты не доходят до живого демо.
:::

## Маршрут по месяцам

- **[Месяц 1 — База full-stack MVP](/mesyac-1/nedelya-1)** — React/TS/Supabase, auth, RLS, деплой, первый проект.
- **[Месяц 2 — AI coding workflow](/mesyac-2/nedelya-5)** — Cursor/Cline под контролем, ревью AI-кода, тесты.
- **[Месяц 3 — Интеграции](/mesyac-3/nedelya-9)** — backend boundary, внешний API, webhook, Stripe, LLM-фича. Самый плотный участок.
- **[Месяц 4 — Портфолио и рынок](/mesyac-4/nedelya-13)** — утилита, hardening, упаковка, резюме и отклики.

Плюс сквозные разделы: **[Постоянные привычки](/privychki)**, **[Финальное портфолио](/portfolio)**,
**[Когда можно откликаться](/gotovnost)**.

## Реалистичный итог

При 10 ч/нед и наличии прошлой базы реальная цель —
**junior+/middle-leaning AI-assisted prototyping developer**: быстро собирает MVP, безопасно
подключает интеграции через backend, работает с AI-агентами под контролем и доводит проект до
живого демо.

Нереалистичная формулировка — «уверенный full-stack за 160 часов с нуля». Ставка не на ширину
стека, а на способность показать живой продукт, реальные интеграции, инженерную дисциплину и
контроль над AI.
