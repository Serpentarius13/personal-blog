import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z
      .string()
      .max(60, "Title should be 60 characters or less for optimal Open Graph display."),
    description: z
      .string()
      .max(155, "Description should be 155 characters or less for optimal Open Graph display."),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
