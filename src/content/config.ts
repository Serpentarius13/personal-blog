import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z
      .object({
        title: z
          .string()
          .max(60, "Title should be 60 characters or less for optimal Open Graph display."),
        description: z
          .string()
          .max(155, "Description should be 155 characters or less for optimal Open Graph display."),
        date: z.coerce.date(),
        image: image(),
        //.refine((image) => image.width === 1200 && image.height === 630, {
        //   message: "The image must be exactly 1200px × 630px for Open Graph requirements.",
        // })
        tags: z.array(z.string()).optional(),
        draft: z.boolean().optional(),

        trackIndex: z.number().optional(),
        trackName: z.string().optional(),
      })
      .superRefine((data, ctx) => {
        if ((data.trackIndex && !data.trackName) || (!data.trackIndex && data.trackName)) {
          return ctx.addIssue({
            path: ["trackIndex", "trackName"],
            code: z.ZodIssueCode.custom,
            message: "trackIndex and trackName must be used together",
          });
        }
      }),
});

export const collections = {
  posts: postsCollection,
};
