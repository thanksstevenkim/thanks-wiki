import { defineCollection, z } from "astro:content";

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    lang: z.enum(["kr", "jp", "en"]),
  }),
});

export const collections = {
  docs,
};
