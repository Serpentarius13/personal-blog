import type { SearchRecord } from "@/components/solid/Search/types";
import { defineAction } from "astro:actions";
import { getCollection } from "astro:content";
import { z } from "astro:schema";
import Fuse, { type FuseResult } from "fuse.js";

const copy = (arr: any[], times: number) => {
  const result = [];
  for (let i = 0; i < times; i++) {
    result.push(arr.slice());
  }
  return result;
};

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
    handler: async ({ search }): Promise<FuseResult<SearchRecord>[]> => {
      if (!search) return records.map((r) => ({ item: r, refIndex: 0 }));

      return fuse.search(search, { limit: 30 });
    },
  }),
};
