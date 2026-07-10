import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AI-Assisted Full-Stack Roadmap',
  tagline: 'Учебник по дорожной карте: React + TypeScript + Supabase + AI-агенты',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Продакшн-адрес: сайт живёт на danshin.ms/learn (через reverse-proxy на GitHub Pages)
  url: 'https://danshin.ms',
  baseUrl: '/learn/',

  organizationName: 'mdanshin',
  projectName: 'learn',

  // Пока идёт наполнение — не валим сборку на битых внутренних ссылках-заглушках
  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/', // docs = корень сайта, без префикса /docs
          editUrl: 'https://github.com/mdanshin/learn/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'AI Full-Stack Roadmap',
      logo: {
        alt: 'Roadmap',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'roadmapSidebar',
          position: 'left',
          label: 'Дорожная карта',
        },
        {
          href: 'https://github.com/mdanshin/learn',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Учебник',
          items: [
            {label: 'Введение', to: '/'},
            {label: 'Месяц 1 — База', to: '/mesyac-1/nedelya-1'},
            {label: 'Месяц 3 — Интеграции', to: '/mesyac-3/nedelya-9'},
          ],
        },
        {
          title: 'Ресурсы',
          items: [
            {label: 'React', href: 'https://react.dev'},
            {label: 'TypeScript', href: 'https://www.typescriptlang.org/docs/'},
            {label: 'Supabase', href: 'https://supabase.com/docs'},
          ],
        },
        {
          title: 'Ещё',
          items: [
            {label: 'GitHub', href: 'https://github.com/mdanshin/learn'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Mikhail Danshin. Собрано на Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'tsx', 'sql', 'diff'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
