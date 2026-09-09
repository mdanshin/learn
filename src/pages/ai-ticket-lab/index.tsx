import React, {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type Task = {id: string; title: string; detail?: string};
type Week = {
  number: number;
  title: string;
  focus: string;
  outcome: string;
  issue: string;
  tasks: Task[];
};

const weeks: Week[] = [
  {
    number: 1,
    title: 'API skeleton',
    focus: 'Python · FastAPI · Pydantic · pytest',
    outcome: 'Работающий HTTP API без LLM, который вы понимаете построчно.',
    issue: 'https://github.com/mdanshin/learn/issues/1',
    tasks: [
      {id: 'w1-uv', title: 'Установить uv и Python 3.12'},
      {id: 'w1-health', title: 'Сделать GET /health'},
      {id: 'w1-models', title: 'Описать TicketRequest и TicketAnalysis'},
      {id: 'w1-endpoint', title: 'Сделать POST /tickets/analyze'},
      {id: 'w1-rules', title: 'Добавить detect_category() без AI'},
      {id: 'w1-validation', title: 'Намеренно сломать payload и изучить validation'},
      {id: 'w1-tests', title: 'Добавить минимум 2 pytest-теста'},
      {id: 'w1-commit', title: 'Сделать осмысленный git commit'},
    ],
  },
  {
    number: 2,
    title: 'Real LLM integration',
    focus: 'httpx · async/await · structured output · errors',
    outcome: 'Классификацию выполняет реальная модель, ответ валидируется.',
    issue: 'https://github.com/mdanshin/learn/issues/2',
    tasks: [
      {id: 'w2-provider', title: 'Выбрать один OpenAI-compatible endpoint'},
      {id: 'w2-httpx', title: 'Добавить httpx и app/llm.py'},
      {id: 'w2-env', title: 'Убрать ключи и endpoint в environment variables'},
      {id: 'w2-async', title: 'Сделать async вызов с timeout'},
      {id: 'w2-json', title: 'Получать structured TicketAnalysis'},
      {id: 'w2-errors', title: 'Обработать timeout, 4xx и 5xx'},
      {id: 'w2-mock', title: 'Замокать LLM в тестах'},
      {id: 'w2-review', title: 'Уметь объяснить весь request path'},
    ],
  },
  {
    number: 3,
    title: 'Persistence',
    focus: 'PostgreSQL · persistence · Docker Compose',
    outcome: 'Заявки и AI-анализ сохраняются и переживают рестарт API.',
    issue: 'https://github.com/mdanshin/learn/issues/3',
    tasks: [
      {id: 'w3-db', title: 'Поднять PostgreSQL'},
      {id: 'w3-table', title: 'Создать таблицу tickets'},
      {id: 'w3-save', title: 'Сохранять input + analysis'},
      {id: 'w3-get', title: 'Добавить GET /tickets/{id}'},
      {id: 'w3-list', title: 'Добавить список последних tickets'},
      {id: 'w3-compose', title: 'Собрать API + DB в compose.yaml'},
      {id: 'w3-test', title: 'Добавить интеграционный тест'},
      {id: 'w3-restart', title: 'Проверить сохранность после restart'},
    ],
  },
  {
    number: 4,
    title: 'Production hardening',
    focus: 'logging · retries · Docker · health · documentation',
    outcome: 'Сервис можно клонировать, поднять и проверить без устного сопровождения.',
    issue: 'https://github.com/mdanshin/learn/issues/4',
    tasks: [
      {id: 'w4-logs', title: 'Добавить structured logging'},
      {id: 'w4-retry', title: 'Добавить безопасные retries'},
      {id: 'w4-errors', title: 'Сделать явные error responses'},
      {id: 'w4-ready', title: 'Добавить health/readiness'},
      {id: 'w4-image', title: 'Собрать Docker image'},
      {id: 'w4-env', title: 'Добавить .env.example'},
      {id: 'w4-tests', title: 'Проверить happy + error paths'},
      {id: 'w4-readme', title: 'Документировать запуск и архитектуру'},
      {id: 'w4-metrics', title: 'Замерить latency/cost на 20 tickets'},
    ],
  },
];

const allTasks = weeks.flatMap((week) => week.tasks);
const STORAGE_KEY = 'ai-ticket-lab-progress-v1';

export default function AiTicketLab(): JSX.Element {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setDone(JSON.parse(saved));
    } catch {
      // Progress tracking is non-critical; the dashboard still works without storage.
    }
  }, []);

  const toggle = (id: string) => {
    setDone((current) => {
      const next = {...current, [id]: !current[id]};
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const completed = useMemo(() => allTasks.filter((task) => done[task.id]).length, [done]);
  const percent = Math.round((completed / allTasks.length) * 100);
  const nextTask = allTasks.find((task) => !done[task.id]);

  const reset = () => {
    setDone({});
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  return (
    <Layout title="AI Ticket Lab" description="Практический 4-недельный AI engineering lab">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.eyebrow}>AI ENGINEERING · HANDS-ON</div>
          <h1>AI Ticket Lab</h1>
          <p className={styles.lead}>
            Четыре недели, один проект, никакого изучения технологий «в вакууме».
            Каждый инструмент появляется только тогда, когда он нужен работающему сервису.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="https://github.com/mdanshin/learn/issues/1" target="_blank" rel="noreferrer">Начать Week 1 ↗</a>
            <a className={styles.secondaryButton} href="https://github.com/mdanshin/learn" target="_blank" rel="noreferrer">Repository ↗</a>
          </div>
        </section>

        <section className={styles.statusGrid}>
          <div className={styles.progressCard}>
            <div className={styles.metricRow}><span>Общий прогресс</span><strong>{percent}%</strong></div>
            <div className={styles.progressTrack}><div className={styles.progressFill} style={{width: `${percent}%`}} /></div>
            <div className={styles.muted}>{completed} из {allTasks.length} шагов завершено</div>
          </div>
          <div className={styles.nextCard}>
            <span className={styles.cardLabel}>Следующий шаг</span>
            <strong>{nextTask ? nextTask.title : 'Месяц завершён ✓'}</strong>
            <span className={styles.muted}>Не изучайте следующую технологию заранее.</span>
          </div>
          <div className={styles.ruleCard}>
            <span className={styles.cardLabel}>Правило обучения</span>
            <strong>Работающий этап = commit</strong>
            <span className={styles.muted}>Вы должны уметь объяснить каждую изменённую часть.</span>
          </div>
        </section>

        <section className={styles.architecture}>
          <div>
            <div className={styles.eyebrow}>TARGET ARCHITECTURE</div>
            <h2>Что вы построите за месяц</h2>
          </div>
          <div className={styles.flow}>
            <span>Client</span><b>→</b><span>FastAPI</span><b>→</b><span>LLM</span><b>→</b><span>Pydantic</span><b>→</b><span>PostgreSQL</span>
          </div>
        </section>

        <section className={styles.weeks}>
          {weeks.map((week) => {
            const weekDone = week.tasks.filter((task) => done[task.id]).length;
            const weekPercent = Math.round((weekDone / week.tasks.length) * 100);
            return (
              <article className={styles.weekCard} key={week.number}>
                <div className={styles.weekHeader}>
                  <div className={styles.weekNumber}>0{week.number}</div>
                  <div className={styles.weekTitleBlock}>
                    <div className={styles.eyebrow}>WEEK {week.number}</div>
                    <h2>{week.title}</h2>
                    <p>{week.focus}</p>
                  </div>
                  <div className={styles.weekPercent}>{weekPercent}%</div>
                </div>
                <p className={styles.outcome}><strong>Результат:</strong> {week.outcome}</p>
                <div className={styles.taskList}>
                  {week.tasks.map((task) => (
                    <label className={`${styles.task} ${done[task.id] ? styles.taskDone : ''}`} key={task.id}>
                      <input type="checkbox" checked={Boolean(done[task.id])} onChange={() => toggle(task.id)} />
                      <span>{task.title}</span>
                    </label>
                  ))}
                </div>
                <a className={styles.issueLink} href={week.issue} target="_blank" rel="noreferrer">Открыть лабораторную в GitHub Issue ↗</a>
              </article>
            );
          })}
        </section>

        <section className={styles.practice}>
          <div>
            <div className={styles.eyebrow}>WEEKLY RHYTHM</div>
            <h2>Как работать параллельно с основной работой</h2>
          </div>
          <div className={styles.rhythmGrid}>
            <div><strong>10 мин</strong><span>Читаете только то, что требуется текущей задаче.</span></div>
            <div><strong>50–60 мин</strong><span>Пишете, запускаете, ломаете и исправляете код.</span></div>
            <div><strong>10 мин</strong><span>Фиксируете, что поняли и что осталось непонятно.</span></div>
            <div><strong>commit</strong><span>Фиксируете только работающий этап.</span></div>
          </div>
        </section>

        <section className={styles.aiRule}>
          <div className={styles.eyebrow}>AI CODING RULE</div>
          <h2>AI — напарник, не генератор проекта</h2>
          <p>Просите объяснить 10–20 строк, добавить один endpoint, написать один тест или найти одну ошибку. Не просите собрать весь production-ready сервис за один prompt.</p>
          <div className={styles.promptExample}>«Вот мой код. Найди причину ошибки, но не переписывай проект. Сначала объясни, что происходит.»</div>
        </section>

        <section className={styles.footerCta}>
          <div><strong>Состояние чек-листа хранится только в вашем браузере.</strong><div className={styles.muted}>GitHub Issues остаются каноническими лабораторными заданиями.</div></div>
          <button className={styles.resetButton} onClick={reset}>Сбросить локальный прогресс</button>
        </section>
      </main>
    </Layout>
  );
}
