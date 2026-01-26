import { ui, defaultLang, type UIKey } from './ui';

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  const parts = pathname.split('/').filter(Boolean);

  // Remove lang prefix if present
  if (parts[0] in ui) {
    parts.shift();
  }

  return '/' + parts.join('/');
}

export function translatePath(path: string, lang: Lang): string {
  // Remove leading slash for processing
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const parts = cleanPath.split('/').filter(Boolean);

  // Remove existing lang prefix if present
  if (parts[0] in ui) {
    parts.shift();
  }

  // Add new lang prefix
  return `/${lang}/${parts.join('/')}`.replace(/\/+$/, '') || `/${lang}`;
}

export function getAlternateLanguage(currentLang: Lang): Lang {
  return currentLang === 'es' ? 'en' : 'es';
}
