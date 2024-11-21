import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z
        .string()
        .max(60, "Title should be 60 characters or less for optimal Open Graph display."),
      description: z
        .string()
        .max(250, "Description should be 250 characters or less for optimal Open Graph display."),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().optional(),

      image: image()
        .refine(
          (img) => {
            return img?.height === 630 && img.width === 1200;
          },
          { message: "Image must be 1200x630 for open graph" },
        )
        .optional(),
    }),
});

export const collections = {
  posts: postsCollection,
};
