(() => {
  'use strict';

  const ALLOWED_LOGIN = 'mdanshin';
  const PRIVATE_DATA_URL = 'https://api.github.com/repos/mdanshin/DanshinTon/contents/private/ai-ticket-lab.json?ref=main';
  const STORAGE_KEY = 'ai-ticket-lab-progress-v2';

  if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    const secureUrl = `https://${location.host}${location.pathname}${location.search}${location.hash}`;
    location.replace(secureUrl);
    return;
  }

  const authView = document.getElementById('auth-view');
  const dashboardView = document.getElementById('dashboard-view');
  const form = document.getElementById('auth-form');
  const tokenInput = document.getElementById('token');
  const loginButton = document.getElementById('login-button');
  const errorBox = document.getElementById('auth-error');
  const logoutButton = document.getElementById('logout-button');
  const resetButton = document.getElementById('reset-button');

  let labData = null;
  let progress = loadProgress();

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Progress persistence is non-critical.
    }
  }

  function githubHeaders(token) {
    return {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };
  }

  async function githubJson(url, token) {
    const response = await fetch(url, {headers: githubHeaders(token)});
    if (!response.ok) {
      const error = new Error(`GitHub API: ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return response.json();
  }

  function decodeContent(payload) {
    if (!payload || payload.encoding !== 'base64' || !payload.content) {
      throw new Error('GitHub вернул private data в неожиданном формате.');
    }
    const binary = atob(payload.content.replace(/\s/g, ''));
    const bytes = Uint8Array.from(binary, ch => ch.charCodeAt(0));
    return JSON.parse(new TextDecoder('utf-8').decode(bytes));
  }

  function setLoading(loading) {
    loginButton.disabled = loading;
    tokenInput.disabled = loading;
    loginButton.textContent = loading ? 'Проверяю…' : 'Войти';
  }

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }

  function clearError() {
    errorBox.textContent = '';
    errorBox.hidden = true;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearError();

    const token = tokenInput.value.trim();
    if (!token) return;

    setLoading(true);
    try {
      const user = await githubJson('https://api.github.com/user', token);
      if (!user.login || user.login.toLowerCase() !== ALLOWED_LOGIN) {
        throw new Error('Доступ разрешён только GitHub-пользователю @mdanshin.');
      }

      let privatePayload;
      try {
        privatePayload = await githubJson(PRIVATE_DATA_URL, token);
      } catch (error) {
        if (error.status === 404 || error.status === 403) {
          throw new Error('Токен подтверждает @mdanshin, но не имеет Contents: Read-only к private repository mdanshin/DanshinTon.');
        }
        throw error;
      }

      labData = decodeContent(privatePayload);
      tokenInput.value = '';
      renderDashboard();
      authView.hidden = true;
      dashboardView.hidden = false;
      window.scrollTo({top: 0, behavior: 'instant'});
    } catch (error) {
      tokenInput.value = '';
      showError(error instanceof Error ? error.message : 'Не удалось выполнить вход.');
    } finally {
      setLoading(false);
    }
  });

  logoutButton.addEventListener('click', () => {
    labData = null;
    dashboardView.hidden = true;
    authView.hidden = false;
    clearError();
    tokenInput.focus();
  });

  resetButton.addEventListener('click', () => {
    progress = {};
    saveProgress();
    if (labData) renderDashboard();
  });

  function allTasks() {
    return labData ? labData.weeks.flatMap(week => week.tasks) : [];
  }

  function updateMetrics() {
    const tasks = allTasks();
    const completed = tasks.filter(task => progress[task.id]).length;
    const percent = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
    const next = tasks.find(task => !progress[task.id]);

    document.getElementById('progress-percent').textContent = `${percent}%`;
    document.getElementById('progress-fill').style.width = `${percent}%`;
    document.getElementById('progress-label').textContent = `${completed} из ${tasks.length} шагов завершено`;
    document.getElementById('next-task').textContent = next ? next.title : 'Месяц завершён ✓';
  }

  function renderDashboard() {
    if (!labData) return;

    document.title = `${labData.title} · Private Workspace`;
    document.getElementById('title').textContent = labData.title;
    document.getElementById('lead').textContent = labData.lead;

    renderArchitecture();
    renderWeeks();
    renderRhythm();

    document.getElementById('ai-rule-title').textContent = labData.aiRule.title;
    document.getElementById('ai-rule-text').textContent = labData.aiRule.text;
    document.getElementById('ai-rule-example').textContent = `«${labData.aiRule.example}»`;

    updateMetrics();
  }

  function renderArchitecture() {
    const root = document.getElementById('architecture');
    root.replaceChildren();

    labData.architecture.forEach((item, index) => {
      if (index > 0) {
        const arrow = document.createElement('b');
        arrow.textContent = '→';
        root.appendChild(arrow);
      }
      const node = document.createElement('span');
      node.textContent = item;
      root.appendChild(node);
    });
  }

  function renderWeeks() {
    const root = document.getElementById('weeks');
    root.replaceChildren();

    labData.weeks.forEach(week => {
      const card = document.createElement('article');
      card.className = 'week-card';

      const head = document.createElement('div');
      head.className = 'week-head';

      const number = document.createElement('div');
      number.className = 'week-number';
      number.textContent = String(week.number).padStart(2, '0');

      const titleWrap = document.createElement('div');
      titleWrap.className = 'week-title';
      const eyebrow = document.createElement('div');
      eyebrow.className = 'eyebrow';
      eyebrow.textContent = `WEEK ${week.number}`;
      const title = document.createElement('h2');
      title.textContent = week.title;
      const focus = document.createElement('p');
      focus.textContent = week.focus;
      titleWrap.append(eyebrow, title, focus);

      const percent = document.createElement('div');
      percent.className = 'week-percent';
      const completed = week.tasks.filter(task => progress[task.id]).length;
      percent.textContent = `${Math.round(completed / week.tasks.length * 100)}%`;

      head.append(number, titleWrap, percent);

      const outcome = document.createElement('p');
      outcome.className = 'outcome';
      const outcomeStrong = document.createElement('strong');
      outcomeStrong.textContent = 'Результат: ';
      outcome.append(outcomeStrong, document.createTextNode(week.outcome));

      const tasks = document.createElement('div');
      tasks.className = 'tasks';

      week.tasks.forEach(task => {
        const label = document.createElement('label');
        label.className = `task${progress[task.id] ? ' done' : ''}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = Boolean(progress[task.id]);
        const text = document.createElement('span');
        text.textContent = task.title;

        checkbox.addEventListener('change', () => {
          progress[task.id] = checkbox.checked;
          saveProgress();
          renderWeeks();
          updateMetrics();
        });

        label.append(checkbox, text);
        tasks.appendChild(label);
      });

      const issue = document.createElement('a');
      issue.className = 'issue-link';
      issue.href = week.issue;
      issue.target = '_blank';
      issue.rel = 'noreferrer';
      issue.textContent = 'Открыть лабораторную в private GitHub Issue ↗';

      card.append(head, outcome, tasks, issue);
      root.appendChild(card);
    });
  }

  function renderRhythm() {
    const root = document.getElementById('rhythm');
    root.replaceChildren();
    labData.rhythm.forEach(item => {
      const card = document.createElement('div');
      const label = document.createElement('strong');
      label.textContent = item.label;
      const text = document.createElement('span');
      text.textContent = item.text;
      card.append(label, text);
      root.appendChild(card);
    });
  }
})();
