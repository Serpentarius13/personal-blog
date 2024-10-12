import { db } from "@/lib/db";
import { postQuerySchema } from "@/lib/schemas";
import type { Post } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { APIRoute } from "astro";

export const prerender = false;

/**
 * Get post handler
 */
export const GET: APIRoute = async ({ params }) => {
  const result = await postQuerySchema.safeParseAsync(params);

  if (result.error) {
    throw new Response(JSON.stringify({ error: result.error.message }), {
      status: 400,
    });
  }

  const {
    data: { postId },
  } = result;

  const post =
    (await db.post
      .findUnique({
        where: { id: postId },
      })
      .catch((e) => {
        console.log(e);
      })) ??
    ({
      id: postId,
      views: 1,
      reads: 0,
      likes: 0,
    } satisfies Post);

  return new Response(JSON.stringify(post));
};

async function handlePrismaError(err: PrismaClientKnownRequestError, postId: string) {
  console.log(err);
}
