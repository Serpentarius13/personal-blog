import { getCollection } from "astro:content";

export const getPosts = () =>
  getCollection("posts").then((res) =>
    import.meta.env.PROD ? res.filter((post) => !post.data.draft) : res,
  );
