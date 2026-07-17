import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    categories: z.array(z.string()),
    layout: z.enum(['post', 'deep-dive']).optional().default('post'),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { posts };
