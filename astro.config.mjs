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

// Fungsi untuk menginisialisasi skrip eksternal berdasarkan konfigurasi situs
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
        name: 'redirect-md-and-non-md-to-index',
        configureServer(server) {
          if (!server.middlewares) return;

          server.middlewares.use((req, res, next) => {
            // Menghapus trailing slash untuk konsistensi URL
            let cleanUrl = req.url.replace(/\/$/, '');

            // Jika URL mengandung hash, tetap lanjutkan
            if (cleanUrl.includes('#')) {
              next();
              return;
            }

            // Memeriksa apakah URL sesuai dengan path markdown baik dengan atau tanpa .md
            const isMarkdownPath = markdownPaths.some(
              (mdPath) =>
                cleanUrl === mdPath ||  // tanpa .md
                cleanUrl === mdPath + '.md' ||  // dengan .md
                cleanUrl.startsWith(mdPath + '/') ||  // sub-path tanpa .md
                cleanUrl.startsWith(mdPath + '.md/')  // sub-path dengan .md
            );

            // Jika URL sesuai dengan markdown path, redirect ke direktori induk
            if (isMarkdownPath) {
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
