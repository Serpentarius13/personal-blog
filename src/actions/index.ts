import type { SearchRecord } from "@/components/solid/Search/types";
import { defineAction } from "astro:actions";
import { getCollection } from "astro:content";
import { z } from "astro:schema";
import Fuse from "fuse.js";

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
};
