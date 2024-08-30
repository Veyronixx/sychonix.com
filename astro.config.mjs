import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import compress from 'astro-compress';
import react from '@astrojs/react';
import fs from 'fs';

import { SITE } from './src/config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const whenExternalScripts = (items = []) =>
  SITE.googleAnalyticsId
    ? Array.isArray(items)
      ? items.map((item) => item())
      : [items()]
    : [];

// Fungsi untuk mendapatkan semua path file .md dalam folder tertentu
const getMarkdownPaths = (baseDir) => {
  const paths = [];
  const files = fs.readdirSync(baseDir);
  files.forEach((file) => {
    const fullPath = path.join(baseDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      paths.push(...getMarkdownPaths(fullPath)); // Rekursif untuk folder dalam
    } else if (file.endsWith('.md')) {
      const relativePath = path.relative(__dirname, fullPath);
      paths.push(`/${relativePath.replace(/\\/g, '/').replace('src/pages/', '').replace('.md', '')}`);
    }
  });
  return paths;
};

// Mengumpulkan semua path .md dari folder mainnet dan testnet
const markdownPaths = [
  ...getMarkdownPaths(path.join(__dirname, 'src/pages/mainnet')),
  ...getMarkdownPaths(path.join(__dirname, 'src/pages/testnet')),
];

export default defineConfig({
  site: SITE.origin,
  base: SITE.basePathname,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'static',
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    mdx({
      remarkPlugins: [],
      gfm: false,
    }),
    ...whenExternalScripts(() =>
      partytown({
        config: {
          forward: ['dataLayer.push'],
        },
      })
    ),
    compress({
      css: true,
      html: {
        removeAttributeQuotes: false,
      },
      img: false,
      js: false,
      svg: false,
      logger: 1,
    }),
    react(),
  ],
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [],
    rehypePlugins: [],
    gfm: true,
    copyButton: true,
  },
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    server: {
      middlewareMode: false,
    },
    plugins: [
      {
        name: 'redirect-md-to-index',
        configureServer(server) {
          if (!server.middlewares) return;

          server.middlewares.use((req, res, next) => {
            // Hapus trailing slash dan hash untuk konsistensi URL
            let cleanUrl = req.url.replace(/\/$/, '');

            // Jika URL mengandung hash, tetap lanjutkan
            if (cleanUrl.includes('#')) {
              next();
              return;
            }

            // Cek apakah URL mengarah ke file markdown
            if (markdownPaths.some((mdPath) => cleanUrl.startsWith(mdPath))) {
              // Mengambil folder induk untuk redirect
              const basePath = cleanUrl.split('/').slice(0, -1).join('/');
              res.writeHead(302, { Location: basePath });
              res.end();
            } else {
              next();
            }
          });
        },
      },
    ],
  },
});
