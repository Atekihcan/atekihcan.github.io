export function postSlug(id: string): string {
  const filename = id.includes('/') ? id.split('/').pop()! : id;
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

export function postUrl(post: { id: string; data: { categories: string[] } }): string {
  return `/blog/${post.data.categories[0]}/${postSlug(post.id)}/`;
}
