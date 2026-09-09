import React, {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

type Task = {id: string; title: string};
type Week = {
  number: number;
  title: string;
  focus: string;
  outcome: string;
  issue: string;
  tasks: Task[];
};
type Rhythm = {label: string; text: string};
type LabData = {
  version: number;
  title: string;
  lead: string;
  architecture: string[];
  weeks: Week[];
  rhythm: Rhythm[];
  aiRule: {title: string; text: string; example: string};
};

type GitHubContent = {content?: string; encoding?: string};

const ALLOWED_LOGIN = 'mdanshin';
const PRIVATE_DATA_URL = 'https://api.github.com/repos/mdanshin/learn/contents/private/ai-ticket-lab.json?ref=main';
const STORAGE_KEY = 'ai-ticket-lab-progress-v1';

function decodeGitHubContent(payload: GitHubContent): LabData {
  if (!payload.content || payload.encoding !== 'base64') {
    throw new Error('GitHub вернул данные в неожиданном формате.');
  }

  const binary = atob(payload.content.replace(/\s/g, ''));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  const text = new TextDecoder('utf-8').decode(bytes);
  return JSON.parse(text) as LabData;
}

async function githubRequest(url: string, token: string): Promise<Response> {
  return fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export default function AiTicketLab(): JSX.Element {
  const [token, setToken] = useState('');
  const [data, setData] = useState<LabData | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setDone(JSON.parse(saved));
    } catch {
      // Progress is non-critical and contains no authentication data.
    }
  }, []);

  const authenticate = async (event: React.FormEvent) => {
    event.preventDefault();
    const candidate = token.trim();
    if (!candidate) return;

    setLoading(true);
    setError('');

    try {
      const userResponse = await githubRequest('https://api.github.com/user', candidate);
      if (!userResponse.ok) throw new Error('GitHub не принял токен. Проверьте его срок действия и права.');

      const user = (await userResponse.json()) as {login?: string};
      if (user.login?.toLowerCase() !== ALLOWED_LOGIN) {
        throw new Error('Доступ разрешён только владельцу этого проекта.');
      }

      const dataResponse = await githubRequest(PRIVATE_DATA_URL, candidate);
      if (!dataResponse.ok) {
        throw new Error('Токен подтверждает личность, но не имеет доступа Contents: read к репозиторию learn.');
      }

      const payload = (await dataResponse.json()) as GitHubContent;
      setData(decodeGitHubContent(payload));
      setToken('');
    } catch (caught) {
      setData(null);
      setError(caught instanceof Error ? caught.message : 'Не удалось выполнить вход.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken('');
    setData(null);
    setError('');
  };

  const allTasks = useMemo(() => data?.weeks.flatMap((week) => week.tasks) ?? [], [data]);
  const completed = useMemo(() => allTasks.filter((task) => done[task.id]).length, [allTasks, done]);
  const percent = allTasks.length ? Math.round((completed / allTasks.length) * 100) : 0;
  const nextTask = allTasks.find((task) => !done[task.id]);

  const toggle = (id: string) => {
    setDone((current) => {
      const next = {...current, [id]: !current[id]};
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const reset = () => {
    setDone({});
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  if (!data) {
    return (
      <Layout title="Private AI Ticket Lab" description="Private AI engineering learning dashboard">
        <main className={styles.authPage}>
          <section className={styles.authCard}>
            <div className={styles.lockIcon} aria-hidden="true">⌁</div>
            <div className={styles.eyebrow}>PRIVATE WORKSPACE</div>
            <h1>AI Ticket Lab</h1>
            <p className={styles.authLead}>
              План и лабораторные данные не входят в публичную сборку сайта. Для загрузки требуется GitHub-токен владельца <strong>@mdanshin</strong>.
            </p>

            <form className={styles.authForm} onSubmit={authenticate}>
              <label htmlFor="github-token">Fine-grained personal access token</label>
              <input
                id="github-token"
                type="password"
                value={token}
                onChange={(event) => setToken(event.target.value)}
                placeholder="github_pat_…"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                disabled={loading}
              />
              <button className={styles.primaryButton} type="submit" disabled={loading || !token.trim()}>
                {loading ? 'Проверяю GitHub…' : 'Войти через GitHub'}
              </button>
            </form>

            {error && <div className={styles.authError} role="alert">{error}</div>}

            <div className={styles.securityNote}>
              <strong>Минимальные права токена</strong>
              <span>Repository access: только <code>mdanshin/learn</code></span>
              <span>Repository permissions: <code>Contents → Read-only</code></span>
              <span>Токен хранится только в памяти этой вкладки и не записывается в localStorage.</span>
            </div>

            <a
              className={styles.tokenLink}
              href="https://github.com/settings/personal-access-tokens/new"
              target="_blank"
              rel="noreferrer"
            >
              Создать fine-grained token в GitHub ↗
            </a>
          </section>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title={data.title} description="Private AI engineering learning dashboard">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.privateBar}>
            <span className={styles.privateBadge}>PRIVATE · @mdanshin</span>
            <button className={styles.logoutButton} onClick={logout}>Выйти</button>
          </div>
          <div className={styles.eyebrow}>AI ENGINEERING · HANDS-ON</div>
          <h1>{data.title}</h1>
          <p className={styles.lead}>{data.lead}</p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href={data.weeks[0]?.issue} target="_blank" rel="noreferrer">Начать Week 1 ↗</a>
            <a className={styles.secondaryButton} href="https://github.com/mdanshin/learn" target="_blank" rel="noreferrer">Private repository ↗</a>
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
            {data.architecture.map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 && <b>→</b>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className={styles.weeks}>
          {data.weeks.map((week) => {
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
                <a className={styles.issueLink} href={week.issue} target="_blank" rel="noreferrer">Открыть лабораторную в private GitHub Issue ↗</a>
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
            {data.rhythm.map((item) => (
              <div key={item.label}><strong>{item.label}</strong><span>{item.text}</span></div>
            ))}
          </div>
        </section>

        <section className={styles.aiRule}>
          <div className={styles.eyebrow}>AI CODING RULE</div>
          <h2>{data.aiRule.title}</h2>
          <p>{data.aiRule.text}</p>
          <div className={styles.promptExample}>«{data.aiRule.example}»</div>
        </section>

        <section className={styles.footerCta}>
          <div>
            <strong>План загружен из private GitHub repository после проверки личности.</strong>
            <div className={styles.muted}>Только прогресс чек-листа хранится локально в браузере.</div>
          </div>
          <button className={styles.resetButton} onClick={reset}>Сбросить локальный прогресс</button>
        </section>
      </main>
    </Layout>
  );
}
