import { postsRepository } from "@/db/post";
import type { Post } from "@/db/schema";
import { PostAction, postActionSchema } from "@/lib/schemas";
import type { APIRoute } from "astro";

export const config = {
  runtime: "edge",
};

export const prerender = false;

const incFieldsSchema: Record<PostAction, keyof Omit<Post, "id">> = {
  [PostAction.READ]: "reads",
  [PostAction.LIKE]: "likes",
  [PostAction.VIEW]: "views",
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await postActionSchema.safeParseAsync(await request.json());
    if (!body.success) return new Response(JSON.stringify(body.error.issues), { status: 400 });

    const { postId, action, increment } = body.data;

    const dbPost = await postsRepository.getPost(postId);

    if (!dbPost) {
      const post = await postsRepository.createPost({
        id: postId,
        views: 1,
        [incFieldsSchema[action]]: increment,
      });

      return new Response(JSON.stringify({ post }));
    }

    const post = await postsRepository.incrementPostField(
      postId,
      incFieldsSchema[action],
      increment,
    );

    return new Response(JSON.stringify({ post }));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }));
  }
};
