import { ui, defaultLang, type UIKey } from './ui';

export type Lang = keyof typeof ui;

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
