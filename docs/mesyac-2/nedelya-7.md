---
sidebar_position: 3
title: "Неделя 7 — Ревью за ИИ, тесты, безопасность"
sidebar_label: "Неделя 7 · Тесты и ревью"
---

# Неделя 7 — Код-ревью за ИИ, тесты, безопасность

**Цель недели:** выработать привычку читать сгенерированный код и подстраховываться тестами на
критичных местах.

## Теория

**Типовые ошибки агента:** избыточная абстракция, дублирование, нарушение boundaries, утечки env,
небезопасные SQL/RLS-политики, unchecked user input, базовый XSS.

**Тесты как страховка.** Не гонитесь за 100% покрытием. Покрывайте самое хрупкое и чистое:
Zod-схемы, бизнес-логику, важные преобразования данных. Мокайте внешние API-ответы (пригодится в месяце 3).

```ts
import { describe, it, expect } from 'vitest';
import { leadSchema } from '../lib/schemas';

it('отклоняет неверный email', () => {
  const r = leadSchema.safeParse({ name: 'A', email: 'oops' });
  expect(r.success).toBe(false);
});
```

## Ресурсы

- [Vitest — Getting Started](https://vitest.dev/guide/).
- [Zod — safeParse](https://zod.dev/?id=safeparse) для тестов схем.
- [OWASP — XSS](https://owasp.org/www-community/attacks/xss/) — базовое понимание.

## Практика

- Добавить Vitest.
- Покрыть тестами: Zod-схемы, бизнес-логику, важные data transforms.
- Мокать внешние API-ответы.
- Прогонять lint/typecheck/build/test после AI-изменений.
- Написать review notes по 2–3 agent-generated PR.

## Критерий готовности

- [ ] есть тесты на schemas и бизнес-логику
- [ ] есть привычка проверять diff
- [ ] есть заметки: что агент сделал хорошо, где ошибся, что пришлось исправлять

:::warning Не must-have
**React Testing Library** и **Playwright** убраны из обязательного. RTL — только для критичных форм при наличии времени; Playwright — опционально на [неделе 14](/mesyac-4/nedelya-14).
:::
