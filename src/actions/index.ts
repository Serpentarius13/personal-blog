import { defineAction } from "astro:actions";
import { getCollection, type CollectionEntry } from "astro:content";
import Fuse from "fuse.js";

const copy = (arr: any[], times: number) => {
  const result = [];
  for (let i = 0; i < times; i++) {
    result.push(arr.slice());
  }
  return result;
};
const collection = await getCollection("posts").then(
  (r) => copy(r, 100).flat() as CollectionEntry<"posts">[],
);

const fuse = new Fuse(
  collection.map((c) => {
    return {
      title: c.data.title,
      content: c.body,
      description: c.data.description,
      tags: c.data.tags,
    };
  }),
  {
    keys: ["title", "content", "description", "tags"],
    threshold: 0.45,
    ignoreLocation: true,
    includeScore: true,
    isCaseSensitive: true,
  },
);

export const server = {
  myAction: defineAction({
    handler: async () => {
      return fuse.search("Hello world");
    },
  }),
};
