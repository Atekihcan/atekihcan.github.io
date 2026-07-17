# Atekihcan

Personal website — [atekihcan.com](https://atekihcan.com)

Built with [Astro](https://astro.build/).

## Setup

```bash
npm install
npm run dev
```

## Deploy

Deploys automatically to GitHub Pages on push to `master` via GitHub Actions.

## Writing Posts

Add markdown files to `src/content/posts/`. Frontmatter format:

```yaml
---
title: Post Title
description: Optional summary
date: 2026-06-20
categories:
  - code
---
```

Use `.mdx` extension for posts that need JSX components. KaTeX math works in both:

```tex
Inline: $E = mc^2$
Block:
$$
\text{AI} = \frac{\text{FLOPs}}{\text{Bandwidth}}
$$
```
