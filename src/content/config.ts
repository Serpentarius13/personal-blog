import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z
      .string()
      .max(60, "Title should be 60 characters or less for optimal Open Graph display."),
    description: z
      .string()
      .max(250, "Description should be 2500 characters or less for optimal Open Graph display."),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
