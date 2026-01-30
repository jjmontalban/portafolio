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
 * New structure: Spanish at root (/), English at /en/
 */
export function getLangFromUrl(url: URL): Lang {
  const pathname = url.pathname;
  // If path starts with /en, it's English
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en';
  }
  // Everything else is Spanish (root)
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

  // Remove /en prefix if present
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
  // First, get the clean path without any language prefix
  let cleanPath = path;

  if (cleanPath.startsWith('/en/')) {
    cleanPath = cleanPath.slice(3);
  } else if (cleanPath === '/en') {
    cleanPath = '/';
  }

  // Now add the appropriate prefix
  if (lang === 'en') {
    // English: add /en prefix
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
    // Check if path matches or starts with this route
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
export function getSkillCategories(t: (key: UIKey) => string) {
  return [
    {
      labelKey: 'languages',
      label: t('sobre.languagesTitle'),
      items: ["PHP", "Javascript(ES6)", "TypeScript", "SQL", "CSS", "HTML"]
    },
    {
      labelKey: 'frameworks',
      label: t('sobre.frameworksTitle'),
      items: ["WordPress", "Laravel", "jQuery", "Vue", "Astro", "Sass"]
    },
    {
      labelKey: 'tools',
      label: t('sobre.toolsTitle'),
      items: ["Git", "PHPUnit", "Composer", "npm", "Jenkins", "Postman"]
    },
    {
      labelKey: 'devops',
      label: t('sobre.devopsTitle'),
      items: ["SSH", "Docker", "Nginx", "MySQL", "Plesk / cPanel", "AWS Basics"]
    }
  ];
}

/**
 * Get jobs with translated position and period
 */
export function getJobs(t: (key: UIKey) => string) {
  return [
    {
      company: "Fundación Telefónica",
      link: "https://www.fundaciontelefonica.com/",
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
