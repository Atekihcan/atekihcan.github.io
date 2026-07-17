import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { postUrl } from '../lib/slugs';

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('posts'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'atekihcan',
    description: 'Personal website of Nachiketa Das',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
    })),
  });
}
