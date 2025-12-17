import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    lang: z.enum(['kr', 'en', 'jp']),
  }),
  slug: ({ id }) => id.replace(/^docs\//, '').replace(/\.md$/, ''),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(['seed', 'growing', 'evergreen']).optional(),
    lang: z.enum(['ko', 'en', 'jp']).default('ko').optional(),
  }),
  slug: ({ id }) => id.replace(/^notes\//, '').replace(/\.md$/, ''),
});

export const collections = { docs, notes };
