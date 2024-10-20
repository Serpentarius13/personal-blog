import type { Insertable, Updateable } from "kysely";
import { db } from ".";
import type { Post } from "./schema";

const createPost = async (post: Insertable<Post>) => {
  return db.insertInto("posts").values(post).returningAll().executeTakeFirst();
};

const getPost = async (postId: string) => {
  return db.selectFrom("posts").selectAll().where("id", "=", postId).executeTakeFirst();
};

const getPostOrDefault = async (postId: string) => {
  return db
    .selectFrom("posts")
    .selectAll()
    .where("id", "=", postId)
    .executeTakeFirst()
    .then((res) => {
      return (
        res ?? {
          id: postId,
          reads: 0,
          views: 1,
          likes: 0,
        }
      );
    });
};

const updatePost = async (post: Updateable<Post>, postId: string) => {
  return db
    .updateTable("posts")
    .set(post)
    .where("id", "=", postId)
    .returningAll()
    .executeTakeFirst();
};

const getAllPosts = async () => {
  return db.selectFrom("posts").selectAll().execute();
};

const incrementPostField = async (postId: string, field: keyof Post, value: number) => {
  return db
    .updateTable("posts")
    .where("id", "=", postId)
    .set((eb) => ({
      [field]: eb(`posts.${field}`, "+", value),
    }))
    .returningAll()
    .executeTakeFirst();
};

export const postsRepository = {
  createPost,
  getPost,
  getPostOrDefault,
  updatePost,
  getAllPosts,
  incrementPostField,
} as const;
