// astro.config.mjs
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';

export default defineConfig({
  integrations: [
    compress({
      html: true,
      css: true,
      js: true,
      img: false,
    }),
  ],
});
