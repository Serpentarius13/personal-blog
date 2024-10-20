import { postsRepository } from "@/db/post";
import { postQuerySchema } from "@/lib/schemas";
import type { APIRoute } from "astro";

export const config = {
  runtime: "edge",
};

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    const paramsParsed = await postQuerySchema.safeParseAsync(params);

    if (!paramsParsed.success)
      return new Response(JSON.stringify(paramsParsed.error.issues), {
        status: 400,
      });

    const { postId } = paramsParsed.data;

    const post = await postsRepository.getPostOrDefault(postId);

    return new Response(JSON.stringify({ post }), {
      headers: {
        "Vercel-CDN-Cache-Control": "max-age=30",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: error.message }));
  }
};
