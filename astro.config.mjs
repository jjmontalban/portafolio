// astro.config.mjs
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jjmontalban.com',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US',
        },
      },
      filter: (page) => !page.includes('/index'),
    }),
    compress({
      html: true,
      css: true,
      js: true,
      img: false,
    }),
  ],
});
