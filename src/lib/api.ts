import { CONFIG } from "config";
import { PostAction } from "./schemas";

class Client {
  #url = CONFIG.API_URL;
  constructor() {}

  #makeUrl(path: string) {
    return `${this.#url}${path}`;
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
  return client.request(`/post/${postId}`).then<Post>((res) => res.json());
};

const readPost = async (postId: string) => {
  return client
    .request(`/api/post`, {
      method: "POST",
      body: JSON.stringify({
        postId,
        action: PostAction.READ,
      }),
    })
    .then<{ post: Post }>((res) => res.json());
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
    .then<{ post: Post }>((res) => res.json());
};

const likePost = async (postId: string) => {
  return client
    .request(`/post`, {
      method: "POST",
      body: JSON.stringify({
        postId,
        action: PostAction.LIKE,
      }),
    })
    .then<{ post: Post }>((res) => res.json());
};

export const postsApi = {
  getPost,
  readPost,
  viewPost,
  likePost,
} as const;
