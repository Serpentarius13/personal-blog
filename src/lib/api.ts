import type { Post } from "@prisma/client";
import { getAbsoluteUrl } from "./utils";

const getPost = async (postId: string) => {
  return fetch(getAbsoluteUrl(`/api/blog/${postId}`)).then<Post>((res) =>
    res.json(),
  );
};

const readPost = async (postId: string) => {
  return fetch(`/api/blog/${postId}`, {
    method: "POST",
  }).then<{ success: boolean }>((res) => res.json());
};

const viewPost = async (postId: string) => {
  return fetch(`/api/blog/${postId}`, {
    method: "PATCH",
  }).then<{ success: boolean }>((res) => res.json());
};

export const postsApi = {
  getPost,
  readPost,
  viewPost,
} as const;
