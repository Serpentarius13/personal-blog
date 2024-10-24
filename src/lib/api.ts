import { PostAction } from "./schemas";

class Client {
  constructor() {}

  #makeUrl(path: string) {
    return `/api${path}`;
  }

  request(path: string, init?: RequestInit) {
    return fetch(this.#makeUrl(path), init);
  }
}

type Post = {
  id: string;
  views: number;
  reads: number;
  likes: number;
};

const client = new Client();

const getPost = async (postId: string) => {
  return client.request(`/post/${postId}`).then<{ post: Post }>((res) => res.json());
};

type UpdateResponse = Post | { error: string };

const readPost = async (postId: string) => {
  return client
    .request(`/post`, {
      method: "POST",
      body: JSON.stringify({
        postId,
        action: PostAction.READ,
      }),
    })
    .then<UpdateResponse>((res) => res.json());
};

const viewPost = async (postId: string) => {
  return client
    .request(`/post`, {
      method: "POST",
      body: JSON.stringify({
        postId,
        action: PostAction.VIEW,
      }),
    })
    .then<UpdateResponse>((res) => res.json());
};

const likePost = async (postId: string, count = 1) => {
  return client
    .request(`/post`, {
      method: "POST",
      body: JSON.stringify({
        postId,
        action: PostAction.LIKE,
        increment: count,
      }),
    })
    .then<UpdateResponse>((res) => res.json());
};

export const postsApi = {
  getPost,
  readPost,
  viewPost,
  likePost,
} as const;
