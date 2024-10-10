import type { Post } from "@prisma/client";
import { PostAction } from "./schemas";
import { getAbsoluteUrl } from "./utils";

const getPost = async (postId: string) => {
  return fetch(getAbsoluteUrl(`/api/blog/${postId}`)).then<Post>((res) =>
    res.json(),
  );
};

const readPost = async (postId: string) => {
  return fetch(`/api/blog`, {
    method: "POST",
    body: JSON.stringify({
      postId,
      action: PostAction.READ,
    }),
  }).then<{ success: boolean }>((res) => res.json());
};

const viewPost = async (postId: string) => {
  return fetch(`/api/blog/${postId}`, {
    method: "POST",
    body: JSON.stringify({
      postId,
      action: PostAction.VIEW,
    }),
  }).then<{ success: boolean }>((res) => res.json());
};

const likePost = async (postId: string) => {
  return fetch(`/api/blog`, {
    method: "POST",
    body: JSON.stringify({
      postId,
      action: PostAction.LIKE,
    }),
  }).then<{ success: boolean }>((res) => res.json());
};

export const postsApi = {
  getPost,
  readPost,
  viewPost,
  likePost,
} as const;
