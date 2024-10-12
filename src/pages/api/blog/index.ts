import { db } from "@/lib/db";
import { PostAction, postActionSchema } from "@/lib/schemas";
import type { Post } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { APIRoute } from "astro";

const incFieldsSchema: Record<PostAction, keyof Omit<Post, "id">> = {
  [PostAction.READ]: "reads",
  [PostAction.LIKE]: "likes",
  [PostAction.VIEW]: "views",
};

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsedBody = await postActionSchema.safeParseAsync(body);

    if (!parsedBody.success) {
      throw new Error(parsedBody.error.message);
    }

    const { postId, action } = parsedBody.data;

    await db.post
      .update({
        where: { id: postId },
        data: {
          [incFieldsSchema[action]]: {
            increment: 1,
          },
        },
      })
      .catch(async (err) => {
        if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
          return db.post.create({
            data: {
              id: postId,
              ...{ [incFieldsSchema[action]]: 1 },
            },
          });
        }

        console.log(err);
      });

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ success: false }));
  }
};
