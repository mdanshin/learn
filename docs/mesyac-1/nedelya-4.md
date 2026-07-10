---
sidebar_position: 4
title: "Неделя 4 — Проект №1: внутренний инструмент"
sidebar_label: "Неделя 4 · Проект №1"
---

# Неделя 4 — Проект №1: внутренний инструмент

**Цель недели:** собрать и задеплоить первый законченный full-stack MVP — не учебный TODO, а
что-то ближе к бизнесу, сведённое к **одному конкретному сценарию**.

## Что делаем

Выберите один сценарий и сузьте его:

- мини-CRM для лидов
- трекер заявок
- booking dashboard
- expense tracker
- панель обработки клиентских запросов
- контент-планер
- personal finance dashboard

### Обязательные элементы

- auth
- база данных (migrations + generated types)
- CRUD
- фильтры/поиск
- **статусы/workflow** (например `new → contacted → qualified → won/lost`)
- роли или ownership через RLS
- dashboard metrics
- **seed / demo data** (демо не должно ломаться на пустой базе)
- деплой
- README + скриншоты + короткий architecture diagram
- `.env.example`
- короткое demo video

:::tip Scope-контроль
**Saved views — убрать. Activity log — optional**, если не успеваете. Фильтров + статусов достаточно,
чтобы показать зрелость. Лучше один доведённый сценарий, чем три наполовину.
:::

## Теория: что показывает этот проект работодателю

Проект №1 — доказательство, что вы умеете собрать целостное приложение: аутентификация, изоляция
данных через RLS, CRUD с фильтрами, метрики и деплой. На собеседовании по нему спросят про auth,
RLS и архитектуру — держите ответы наготове (см. [Неделя 16](/mesyac-4/nedelya-16)).

## Ресурсы

- [Supabase — Deploy to Vercel](https://vercel.com/guides/deploying-react-with-vercel) / [Netlify](https://docs.netlify.com/frameworks/vite/).
- [Supabase — Seeding data](https://supabase.com/docs/guides/local-development/seeding-your-database).
- [shadcn/ui — компоненты](https://ui.shadcn.com/docs/components) для таблиц, форм, дашборда.
- [Mermaid](https://mermaid.js.org/intro/) — architecture diagram текстом (Docusaurus и GitHub рендерят их).

## Практика

- Реализовать выбранный сценарий целиком (auth → CRUD → фильтры → статусы → dashboard).
- Добавить ownership через RLS.
- Насыпать seed/demo data.
- Задеплоить (Vercel/Netlify + Supabase).
- Написать README со скриншотами и короткой диаграммой архитектуры.
- Записать 30–60-секундное demo video.

## Критерий готовности (артефакт месяца)

- [ ] **задеплоенный full-stack MVP №1** на React/TS + Supabase
- [ ] auth, RLS ownership, CRUD, фильтры, статусы, dashboard metrics
- [ ] migrations + generated types
- [ ] зелёный CI (lint / typecheck / build)
- [ ] README + скриншоты + demo video + `.env.example`

> **Артефакт месяца 1:** задеплоенный full-stack MVP №1 с CI, migrations и generated types.
