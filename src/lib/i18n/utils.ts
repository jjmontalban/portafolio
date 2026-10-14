import { ui, defaultLang, type UIKey } from './ui';

export type Lang = keyof typeof ui;

// Route mappings for each language
export const routes = {
  es: {
    services: '/servicios',
    contact: '/contacto',
    cases: '/casos',
    plugins: '/plugins',
    about: '/sobre',
  },
  en: {
    services: '/services',
    contact: '/contact',
    cases: '/cases',
    plugins: '/plugins',
    about: '/about',
  },
} as const;

export type RouteKey = keyof typeof routes.es;

/**
 * Get language from URL
 * Structure: Spanish at root (/), English at /en/
 */
export function getLangFromUrl(url: URL): Lang {
  const pathname = url.pathname;
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en';
  }
  return 'es';
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

/**
 * Get route without language prefix
 */
export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  if (pathname.startsWith('/en/')) {
    return pathname.slice(3) || '/';
  }
  if (pathname === '/en') {
    return '/';
  }
  return pathname;
}

/**
 * Translate path to the target language
 * Spanish: / (root), English: /en/
 */
export function translatePath(path: string, lang: Lang): string {
  let cleanPath = path;

  if (cleanPath.startsWith('/en/')) {
    cleanPath = cleanPath.slice(3);
  } else if (cleanPath === '/en') {
    cleanPath = '/';
  }

  if (lang === 'en') {
    if (cleanPath === '/') {
      return '/en/';
    }
    return '/en' + cleanPath;
  }

  // Spanish: use root (no prefix)
  return cleanPath || '/';
}

export function getAlternateLanguage(currentLang: Lang): Lang {
  return currentLang === 'es' ? 'en' : 'es';
}

/**
 * Get the base path for navigation links based on language
 * Spanish: '', English: '/en'
 */
export function getLangPrefix(lang: Lang): string {
  return lang === 'en' ? '/en' : '';
}

/**
 * Get a localized route for a given route key
 */
export function getLocalizedRoute(lang: Lang, routeKey: RouteKey): string {
  const prefix = getLangPrefix(lang);
  return prefix + routes[lang][routeKey];
}

/**
 * Map a route from one language to another
 */
export function getAlternateRoute(currentPath: string, currentLang: Lang, targetLang: Lang): string {
  // Handle home page
  if (currentPath === '/' || currentPath === '/en' || currentPath === '/en/') {
    return targetLang === 'en' ? '/en/' : '/';
  }

  // Get the path without language prefix
  let cleanPath = currentPath;
  if (cleanPath.startsWith('/en/')) {
    cleanPath = cleanPath.slice(3);
  }

  // Find matching route key from current language
  const currentRoutes = routes[currentLang];
  const targetRoutes = routes[targetLang];

  for (const [key, route] of Object.entries(currentRoutes)) {
    if (cleanPath === route || cleanPath.startsWith(route + '/')) {
      const targetRoute = targetRoutes[key as RouteKey];
      const suffix = cleanPath.slice(route.length);
      const prefix = targetLang === 'en' ? '/en' : '';
      return prefix + targetRoute + suffix;
    }
  }

  // Fallback: just add/remove prefix
  const prefix = targetLang === 'en' ? '/en' : '';
  return prefix + cleanPath;
}

/**
 * Get skill categories with translated labels
 */
export function getSkillCategories(t: (key: UIKey) => string, lang: Lang = 'es') {
  return [
    {
      labelKey: 'languages',
      label: t('sobre.languagesTitle'),
      items: ["TypeScript", "JavaScript (ES6)", "PHP", "HTML", "CSS", "SQL"]
    },
    {
      labelKey: 'frameworks',
      label: t('sobre.frameworksTitle'),
      items: ["Angular", "React", "NestJS", "Node.js", "WordPress", "Vue.js", "Astro", "Laravel"]
    },
    {
      labelKey: 'tools',
      label: t('sobre.toolsTitle'),
      items: ["Git / Gitflow", "GitHub Actions", "Docker", "npm", "Postman", "Composer"]
    },
    {
      labelKey: 'devops',
      label: t('sobre.devopsTitle'),
      items: ["Docker", "Nginx", "Linux", "MySQL", "PostgreSQL", "GitLab CI"]
    }
  ];
}

/**
 * Get jobs with translated position and period
 */
export function getJobs(t: (key: UIKey) => string, lang: Lang = 'es') {
  if (lang === 'es') {
    return [
      {
        company: "eXperience IT Solutions",
        position: t('sobre.job1.position'),
        period: t('sobre.job1.period')
      },
      {
        company: "Galacticblum SL",
        link: "https://www.galacticblum.com/",
        position: t('sobre.job2.position'),
        period: t('sobre.job2.period')
      },
      {
        company: "Piranha Design",
        link: "https://www.piranhadesigns.com/",
        position: t('sobre.job3.position'),
        period: t('sobre.job3.period')
      },
      {
        company: "Bloonde",
        link: "https://www.bloonde.com/",
        position: t('sobre.job4.position'),
        period: t('sobre.job4.period')
      },
      {
        company: "Spanish Chamber of Commerce",
        position: "Web Developer",
        period: "Feb. 2017 - Feb. 2018"
      },
      {
        company: "Evalfor",
        position: "Software Developer",
        period: "Ago. 2012 - Ene. 2013"
      }
    ];
  }

  return [
    {
      company: "eXperience IT Solutions",
      position: t('sobre.job1.position'),
      period: t('sobre.job1.period')
    },
    {
      company: "GalacticBlum",
      link: "https://www.galacticblum.com/",
      position: t('sobre.job2.position'),
      period: t('sobre.job2.period')
    },
    {
      company: "Piranha Designs",
      link: "https://www.piranhadesigns.com/",
      position: t('sobre.job3.position'),
      period: t('sobre.job3.period')
    },
    {
      company: "Bloonde",
      link: "https://www.bloonde.com/",
      position: t('sobre.job4.position'),
      period: t('sobre.job4.period')
    }
  ];
}
