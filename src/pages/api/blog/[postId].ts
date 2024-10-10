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
  try {
    const postId = await parseIdParams(params);
    const post =
      (await db.post.findUnique({
        where: { id: postId },
      })) ??
      ({
        id: postId,
        views: 1,
        reads: 0,
      } satisfies Post);
    return new Response(JSON.stringify(post));
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Read post handler
 */
export const POST: APIRoute = async ({ params }) => {
  try {
    const postId = await parseIdParams(params);

    await db.post
      .update({
        where: { id: postId },
        data: {
          reads: {
            increment: 1,
          },
        },
      })
      .catch(async (err) => {
        return handlePrismaError(err, postId);
      });

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return handleError(error);
  }
};

/**
 * View post handler
 */
export const PATCH: APIRoute = async ({ params }) => {
  try {
    const postId = await parseIdParams(params);

    await db.post
      .update({
        where: { id: postId },
        data: {
          views: {
            increment: 1,
          },
        },
      })
      .catch(async (err) => {
        return handlePrismaError(err, postId);
      });

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return handleError(error);
  }
};

async function parseIdParams(params: unknown) {
  const result = await postQuerySchema.safeParseAsync(params);
  if (result.error) {
    throw new Error(result.error.message);
  }

  const {
    data: { postId },
  } = result;

  return postId;
}

async function handleError(error: unknown) {
  if (error instanceof Error) {
    return new Response(JSON.stringify({ error: error.message }));
  }

  return new Response(JSON.stringify({ error: "Unknown error occured" }));
}

async function handlePrismaError(
  err: PrismaClientKnownRequestError,
  postId: string,
) {
  if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
    return db.post.create({
      data: {
        id: postId,
        reads: 1,
        views: 1,
      },
    });
  }

  console.log(err);
}
