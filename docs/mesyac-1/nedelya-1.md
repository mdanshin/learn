---
sidebar_position: 1
title: "Неделя 1 — TypeScript, окружение, дисциплина"
sidebar_label: "Неделя 1 · TS и окружение"
---

# Неделя 1 — TypeScript, окружение, базовая дисциплина

**Цель недели:** поднять современный React + TypeScript + Vite-проект с линтингом, типами,
env-переменными, Git и минимальным CI — фундамент, на котором дальше вырастут оба проекта.

## Теория

### Современный TypeScript на практическом уровне

Не нужно учить всю систему типов. Нужен рабочий минимум, которым вы реально пользуетесь каждый день.

**Типы, interfaces, union types:**

```ts
// primitives + объекты
type Id = string;
interface Lead {
  id: Id;
  name: string;
  email: string;
  status: 'new' | 'contacted' | 'qualified' | 'won' | 'lost'; // union — конечный набор значений
  createdAt: string;
}

// union нескольких форм
type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
```

**Generics** — когда логика одна, а тип данных разный:

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}
const lead = first<Lead>(leads); // тип выводится как Lead | undefined
```

**Nullable-состояния** — главный источник багов. Включите строгий режим и обрабатывайте
`null`/`undefined` явно:

```ts
function displayName(lead: Lead | null): string {
  if (!lead) return 'Без имени';       // narrowing: дальше lead точно не null
  return lead.name.trim() || 'Без имени';
}
```

В `tsconfig.json` держите `"strict": true` — это включает `strictNullChecks` и ловит эти ошибки
на этапе компиляции, а не в проде.

**async/await** вместо цепочек `.then()`:

```ts
async function loadLead(id: string): Promise<Lead> {
  const res = await fetch(`/api/leads/${id}`);
  if (!res.ok) throw new Error(`Не удалось загрузить лид: ${res.status}`);
  return res.json() as Promise<Lead>;
}
```

### Окружение и дисциплина

- **pnpm** как менеджер пакетов — быстрее npm и экономит диск. Ставится через `corepack enable`.
- **Vite** — дев-сервер и сборка. Мгновенный HMR, минимум конфигурации.
- **ESLint + Prettier** — линтер ловит ошибки, форматтер убирает споры о стиле.
- **env-переменные** — секреты и конфиг вне кода. В Vite клиентские переменные начинаются с `VITE_`.
  Реальные значения в `.env` (в `.gitignore`), а в репозитории — только `.env.example` с пустыми ключами.
- **Git с первого дня** — коммит после каждого осмысленного шага, а не «в конце».
- **scripts** в `package.json`: `dev`, `lint`, `typecheck`, `build`, `test` — единые команды проекта.

:::tip Минимальный CI сразу
Не откладывайте CI на конец. GitHub Actions из трёх шагов (`lint`, `typecheck`, `build`) на каждый
push — это 20 минут настройки, которые всю дорогу страхуют вас от «сломал и не заметил».
:::

## Ресурсы

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) — официальный, читать разделы Everyday Types, Narrowing, Generics.
- [Total TypeScript — Beginner's Tutorial](https://www.totaltypescript.com/tutorials/beginners-typescript) — бесплатные интерактивные упражнения.
- [Vite — Getting Started](https://vite.dev/guide/) — создание проекта, env-переменные.
- [tsconfig `strict`](https://www.typescriptlang.org/tsconfig/#strict) — что именно включает строгий режим.
- [pnpm — Installation](https://pnpm.io/installation) и [corepack](https://nodejs.org/api/corepack.html).
- [ESLint](https://eslint.org/docs/latest/use/getting-started) + [Prettier](https://prettier.io/docs/en/install.html).

## Практика

- Поднять проект: `pnpm create vite@latest my-app -- --template react-ts`.
- Настроить **Tailwind CSS** ([инструкция для Vite](https://tailwindcss.com/docs/installation/using-vite)).
- Подключить **shadcn/ui** ([инструкция](https://ui.shadcn.com/docs/installation/vite)).
- Настроить scripts: `lint`, `typecheck` (`tsc --noEmit`), `build`.
- Добавить минимальный **GitHub Actions**: `lint` + `typecheck` + `build` на каждый push.
- Создать `README.md` сразу с разделами: setup, scripts, env.
- Добавить `.env.example`.

## Критерий готовности

- [ ] проект запускается локально (`pnpm dev`)
- [ ] есть базовая структура папок
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm build` проходят без ошибок
- [ ] CI на push гоняет lint / typecheck / build

:::note
husky / lint-staged / conventional commits — по желанию. Если времени в обрез, не добавляйте:
CI важнее pre-commit хуков.
:::
