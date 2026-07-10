---
sidebar_position: 3
title: "Неделя 3 — Supabase, auth, база, RLS"
sidebar_label: "Неделя 3 · Supabase + RLS"
---

# Неделя 3 — Supabase, auth, база, RLS

**Цель недели:** подключить настоящий backend — PostgreSQL через Supabase, регистрацию/логин,
и, главное, **Row Level Security**, чтобы пользователь видел только свои данные.

## Теория

### Supabase как backend

Supabase — это управляемый PostgreSQL + Auth + Storage + автогенерируемый REST/JS-клиент.
Для MVP закрывает почти весь backend без своего сервера.

### Migrations и generated types

Схему БД держите в **migrations через Supabase CLI**, а не меняйте таблицы вручную «на глаз» —
иначе прод и локалка разъедутся, и это не воспроизвести.

```bash
supabase init
supabase migration new create_leads
# правите SQL в supabase/migrations/*.sql
supabase db push
```

Из схемы генерируйте **типы TypeScript** — тогда запросы типобезопасны:

```bash
supabase gen types typescript --project-id <ref> > src/lib/database.types.ts
```

### Row Level Security (RLS)

RLS — это правила на уровне строк: кто какие строки может читать/менять. Без RLS с anon-ключом
любой может прочитать всю таблицу. Включаете RLS и пишете политики:

```sql
alter table leads enable row level security;

-- пользователь видит только свои строки
create policy "own leads - select"
on leads for select
using (auth.uid() = owner_id);

create policy "own leads - insert"
on leads for insert
with check (auth.uid() = owner_id);
```

`using` — условие для чтения/фильтрации существующих строк; `with check` — условие для новых/изменённых.

:::danger Главная ошибка новичков
Забыть включить RLS или оставить политику `using (true)`. Тогда `anon` видит всё. Всегда проверяйте:
залогиньтесь двумя разными пользователями и убедитесь, что данные не пересекаются.
:::

### CRUD + TanStack Query

Серверные данные — через **TanStack Query** (кеш, инвалидация, loading/error из коробки):

```ts
const { data, isLoading, error } = useQuery({
  queryKey: ['leads'],
  queryFn: getLeads, // из вашего data access layer
});
```

Мутации — через `useMutation` + инвалидация `queryKey`. Optimistic updates — по желанию, на простом уровне.

## Ресурсы

- [Supabase Docs — Getting Started](https://supabase.com/docs/guides/getting-started).
- [Supabase Auth](https://supabase.com/docs/guides/auth) — email/password, сессии.
- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) — читать внимательно, это ядро безопасности.
- [Supabase CLI + migrations](https://supabase.com/docs/guides/deployment/database-migrations).
- [Generating TypeScript types](https://supabase.com/docs/guides/api/rest/generating-types).
- [TanStack Query — Quick Start](https://tanstack.com/query/latest/docs/framework/react/quick-start).

## Практика

- Создать таблицы для проекта через migrations, сгенерировать типы.
- Подключить регистрацию/логин (Supabase Auth).
- Включить RLS и написать политики доступа (select/insert/update/delete).
- Подключить CRUD к UI через data access layer + TanStack Query.
- Добавить protected routes (неавторизованного редиректит на login).

## Критерий готовности

- [ ] пользователь видит только свои данные (проверено двумя аккаунтами)
- [ ] данные сохраняются в Supabase
- [ ] auth работает
- [ ] схема живёт в migrations, типы генерятся
- [ ] базовые RLS-политики можете объяснить словами и кратко описали в README
