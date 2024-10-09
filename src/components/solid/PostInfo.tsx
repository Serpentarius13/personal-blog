import { actions } from "astro:actions";
import { createResource, type Component } from "solid-js";

interface Props {
  date: string;
  postId: string;
}

export const PostInfo: Component<Props> = ({ postId, date }) => {
  const [post, {}] = createResource(postId, () => actions.getPost({ postId }));

  return (
    <>
      <div class="min-w-20 h-full">
        {post.state === "errored" || post()?.error ? (
          <div class="badge badge-error w-full"> Views: 1337 </div>
        ) : post.state === "pending" ? (
          <div class="skeleton h-full w-full" />
        ) : (
          <span class="badge badge-accent w-full">
            {" "}
            Views: {post()?.data?.views}
          </span>
        )}
      </div>

      <div class="badge badge-primary">{date}</div>
    </>
  );
};
