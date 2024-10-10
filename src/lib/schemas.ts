import { z } from "astro:schema";

export const postQuerySchema = z.object({
  postId: z.string(),
});
