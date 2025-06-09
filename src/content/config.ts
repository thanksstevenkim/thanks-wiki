import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    lang: z.enum(['kr', 'en', 'jp']),
  }),
  slug: ({ id }) => id.replace(/\.md$/, ''),
});

export const collections = { docs };
