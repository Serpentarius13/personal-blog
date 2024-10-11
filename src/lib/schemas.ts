import { z } from "astro:schema";

export const postQuerySchema = z.object({
  postId: z.string(),
});

export enum PostAction {
  READ = "read",
  LIKE = "like",
  VIEW = "view",
}

export const postActionSchema = z.object({
  postId: z.string(),
  action: z.enum([PostAction.READ, PostAction.LIKE, PostAction.VIEW]),
});
