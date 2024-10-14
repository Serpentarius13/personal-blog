import { getCollection } from "astro:content";
import { postsApi } from "./api";

export const getPosts = () =>
  getCollection("posts").then((res) =>
    import.meta.env.PROD ? res.filter((post) => !post.data.draft) : res,
  );

export const handleViewAndReadPosts = ({
  intersectionPoint,
  slug,
}: {
  intersectionPoint: string;
  slug: string;
}) => {
  let hasViewed = !!localStorage.getItem(`view-post-${slug}`);
  let hasRead = !!localStorage.getItem(`read-post-${slug}`);

  if (!hasRead) {
    const footer = document.querySelector(intersectionPoint);
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && !hasRead) {
            await postsApi.readPost(slug).then((res) => {
              if ("error" in res) {
                return;
              }
              localStorage.setItem(`read-post-${slug}`, "true");
              hasRead = true;
            });

            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" },
    );
    observer.observe(footer);
  }

  if (!hasViewed) {
    postsApi.viewPost(slug).then((res) => {
      if ("error" in res) {
        return;
      }
      localStorage.setItem(`view-post-${slug}`, "true");
      hasViewed = true;
    });
  }
};
