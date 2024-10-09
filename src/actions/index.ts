import type { SearchRecord } from "@/components/solid/Search/types";
import { db } from "@/lib/db";
import type { Post } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { defineAction } from "astro:actions";
import { getCollection } from "astro:content";
import { z } from "astro:schema";
import Fuse from "fuse.js";

export const prerender = false;

export interface SearchRecordResult
  extends Pick<
    SearchRecord,
    "title" | "image" | "description" | "tags" | "slug"
  > {}

const collection = await getCollection("posts");

const records = collection.map((c) => {
  return {
    title: c.data.title,
    content: c.body,
    description: c.data.description,
    tags: c.data.tags || [],
    slug: c.slug,
    image: c.data.image.src,
  };
}) satisfies SearchRecord[];

const fuse = new Fuse(records, {
  keys: ["title", "content", "description", "tags"],
  threshold: 0.45,
  ignoreLocation: true,
  isCaseSensitive: false,
});

export const server = {
  searchArticles: defineAction({
    input: z.object({
      search: z
        .string()
        .max(200, "Search term must be less than 200 characters"),
    }),
    handler: async ({ search }): Promise<SearchRecordResult[]> => {
      if (!search) return records.map(({ content, ...record }) => record);

      return fuse
        .search(search, { limit: 30 })
        .map(({ item: { content, ...item } }) => item);
    },
  }),

  readPost: defineAction({
    input: z.object({
      postId: z.string(),
    }),
    handler: async ({ postId }) => {
      try {
        await db.post
          .update({
            where: { id: "123" },
            data: {
              reads: {
                increment: 1,
              },
            },
          })
          .catch(async (err) => {
            if (
              err instanceof PrismaClientKnownRequestError &&
              err.code === "P2025"
            ) {
              await db.post.create({
                data: {
                  id: postId,
                  reads: 1,
                },
              });
            }
          });

        return true;
      } catch (error) {
        console.log(error);

        return false;
      }
    },
  }),

  viewPost: defineAction({
    input: z.object({
      postId: z.string(),
    }),
    handler: async ({ postId }) => {
      try {
        await db.post
          .update({
            where: { id: "123" },
            data: {
              views: {
                increment: 1,
              },
            },
          })
          .catch(async (err) => {
            if (
              err instanceof PrismaClientKnownRequestError &&
              err.code === "P2025"
            ) {
              await db.post.create({
                data: {
                  id: postId,
                  views: 1,
                },
              });
            }
          });

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  }),

  getPost: defineAction({
    input: z.object({
      postId: z.string(),
    }),
    handler: async ({ postId }): Promise<Post> => {
      const post = await db.post.findUnique({
        where: { id: postId },
      });

      if (!post)
        return {
          id: postId,
          views: 1,
          reads: 1,
        };

      return post;
    },
  }),
};
