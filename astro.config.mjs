import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkPostLinks } from './src/lib/remark-post-links.mjs';
import { rehypeSidenotes } from './src/lib/rehype-sidenotes.mjs';
import { rehypeExternalLinks } from './src/lib/rehype-external-links.mjs';

export default defineConfig({
  site: 'https://atekihcan.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath, remarkPostLinks],
    rehypePlugins: [rehypeKatex, rehypeSidenotes, rehypeExternalLinks],
    shikiConfig: {
      theme: 'tokyo-night',
    },
  },
});
