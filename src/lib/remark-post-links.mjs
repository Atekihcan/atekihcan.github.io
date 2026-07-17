import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import path from 'node:path';

function buildSlugMap() {
  const postsDir = path.resolve('src/content/posts');
  const map = new Map();

  function scan(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        scan(path.join(dir, entry.name));
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        const content = fs.readFileSync(path.join(dir, entry.name), 'utf-8');
        const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
        if (!fmMatch) continue;

        const catMatch = fmMatch[1].match(/categories:\n((?:\s+-\s+\S+\n?)+)/);
        if (!catMatch) continue;

        const categories = catMatch[1].match(/- (\S+)/g)?.map((c) => c.slice(2)) ?? [];
        const slug = entry.name
          .replace(/\.(md|mdx)$/, '')
          .replace(/^\d{4}-\d{2}-\d{2}-/, '');

        map.set(slug, `/blog/${categories[0]}/${slug}/`);
      }
    }
  }

  scan(postsDir);
  return map;
}

export function remarkPostLinks() {
  const slugMap = buildSlugMap();

  return (tree) => {
    visit(tree, 'link', (node) => {
      const match = node.url.match(/^\/post:(.+)$/);
      if (!match) return;

      const slug = match[1];
      const resolved = slugMap.get(slug);
      if (resolved) {
        node.url = resolved;
      } else {
        console.warn(`[remark-post-links] Unknown post slug: "${slug}"`);
      }
    });
  };
}
