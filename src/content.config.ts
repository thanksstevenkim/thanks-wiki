import { defineCollection, z } from "astro:content";

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    lang: z.enum(["kr", "en", "jp"]),
  }),
  // Remove the `.md` extension when generating slugs so they match the route
  // parameters used with `getEntry()`.
  slug: ({ id }) => id.replace(/\.md$/, ""),
});

export const collections = { docs };
