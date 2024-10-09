import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (context) => {
  if (!context.site) {
    throw new Error("No site specified in config");
  }

  const posts = await getCollection("posts");

  return rss({
    // `<title>` field in output xml
    title: "Void Flower",
    // `<description>` field in output xml
    description: "Peaceful blog about software engineering",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    trailingSlash: false,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      content: `<p> ${post.data.story || post.data.description} </p>
      <div style="margin-top: 50px; font-style: italic;"> <strong><a href="${context.site}/blog/${post.slug}">Keep reading here 👻</a>.</strong>
      </div> <br /> <br />`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
};
