---
sidebar_position: 2
title: "Неделя 2 — React и архитектура frontend"
sidebar_label: "Неделя 2 · React"
---

# Неделя 2 — React как рабочий инструмент + архитектура frontend

**Цель недели:** собрать SPA-каркас будущего проекта — компоненты, формы с валидацией, роутинг,
состояния загрузки/ошибок — и сразу заложить вменяемую архитектуру папок и слой доступа к данным.

## Теория

### Компоненты, props, хуки

```tsx
type Props = { lead: Lead; onSelect: (id: string) => void };

function LeadRow({ lead, onSelect }: Props) {
  return (
    <button onClick={() => onSelect(lead.id)}>
      {lead.name} — {lead.status}
    </button>
  );
}
```

Основные хуки, которые нужны сразу: `useState` (локальное состояние), `useEffect` (сайд-эффекты:
подписки, ручные запросы). Позже данные с сервера уйдут в TanStack Query — не тяните всё через `useEffect`.

### useMemo / useCallback / React.memo — интервью-тема (2–3 ч)

Это **тема для собеседования**, не повод оптимизировать всё подряд. Понимать нужно:

- **почему компонент ре-рендерится** — при изменении state/props или ре-рендере родителя;
- **referential equality** — новый объект/функция при каждом рендере ≠ прежний по ссылке;
- `useMemo` — кеширует **значение** дорогого вычисления;
- `useCallback` — кеширует **функцию** (стабильная ссылка для дочернего `React.memo`);
- `React.memo` — не ре-рендерит компонент, если props не изменились по ссылке.

```tsx
const filtered = useMemo(
  () => leads.filter((l) => l.status === status), // пересчитывается только при смене leads/status
  [leads, status],
);
```

:::warning Не мемоизируйте всё
Мемоизация сама стоит памяти и усложняет код. Сначала измерьте проблему (React DevTools Profiler),
потом оптимизируйте точечно. На собеседовании ценят именно это понимание, а не «обмазал useMemo везде».
:::

### Формы: React Hook Form + Zod

```tsx
const schema = z.object({
  name: z.string().min(1, 'Обязательное поле'),
  email: z.string().email('Неверный email'),
});
type FormValues = z.infer<typeof schema>;

const { register, handleSubmit, formState: { errors } } =
  useForm<FormValues>({ resolver: zodResolver(schema) });
```

Одна Zod-схема даёт и валидацию, и TypeScript-тип (`z.infer`). Дальше эта же схема пригодится для
валидации ответов API и LLM.

### Архитектура: структура и data access layer

Не вызывайте Supabase/`fetch` хаотично из компонентов. Заведите слой доступа к данным:

```
src/
  features/        # фичи по доменам: leads/, auth/, dashboard/
  routes/          # страницы и роутинг
  components/       # переиспользуемый UI
  lib/             # supabase client, api-функции, утилиты
```

```ts
// lib/leads.ts — единственное место, где знают, как достаётся лид
export async function getLeads(): Promise<Lead[]> { /* ... */ }
```

Компонент вызывает `getLeads()`, а не знает про Supabase. Это упрощает тесты, замену источника и ревью.

### Обязательный UX-минимум

Каждый экран с данными обрабатывает четыре состояния: **loading / error / empty / success**.
Плюс **error boundaries** — чтобы ошибка в одном виджете не роняла всё приложение.

## Ресурсы

- [React — Learn (официальный туториал)](https://react.dev/learn) — разделы Describing the UI, Adding Interactivity, Managing State.
- [`useMemo`](https://react.dev/reference/react/useMemo), [`useCallback`](https://react.dev/reference/react/useCallback), [`memo`](https://react.dev/reference/react/memo) — референс с примерами «когда нужно».
- [React Hook Form + Zod](https://react-hook-form.com/get-started#SchemaValidation) — интеграция resolver.
- [Zod — Basic usage](https://zod.dev/?id=basic-usage).
- [React Router — Tutorial](https://reactrouter.com/start/library/routing) или [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/quick-start).
- [Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

## Практика

- Собрать SPA-интерфейс для будущего проекта: страницы `login`, `dashboard`, `list`, `detail`, `settings`.
- Формы создания/редактирования сущностей с client-side валидацией (RHF + Zod).
- Выбрать роутер (React Router **или** TanStack Router) и задать структуру `features/routes/components/lib`.
- Ввести data access layer в `lib/`.
- Реализовать состояния loading/error/empty и хотя бы один error boundary.
- Сделать маленький пример, где видно лишние ре-рендеры (форма/таблица/фильтр).

## Критерий готовности

- [ ] приложение выглядит как небольшой внутренний инструмент, а не учебная страница
- [ ] есть формы, валидация, состояния загрузки и ошибок
- [ ] структура папок и data access layer заданы явно
- [ ] можете объяснить, почему и когда нужна мемоизация
