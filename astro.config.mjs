import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',

  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],

  vite: {
    plugins: [tailwindcss()],
    // Mark native modules as external for OG image generation
    ssr: {
      external: ['@resvg/resvg-js'],
    },
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },

  security: {
    checkOrigin: true,
  },

  experimental: {
    contentIntellisense: true,
  },

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
