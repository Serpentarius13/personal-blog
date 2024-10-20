# Astro Void Flower - My personal blog

You can use this repo to learn about Astro or to setup your website - it's completely free to use.
I would also be grateful if you submit issues about bugs or your ideas about how to make it better!

## Tech choices:

- **Styling**: `Tailwind` with `daisyUI` and `@iconify/tailwind`
- **Code highlights**: `expressive-code`
- **Search**: `pagefind`
- **Utility UI-library**: `preact`
- **Databaase**: `postgres` with `supabase` hosting
- **ORM**: `kysely` with `Prisma` for migrations
- **Deployment** - `Vercel`

## Project structure:

`/src` is the main project directory. Everything outside is not related to the project content and what user sees, but rather configurations of database schema, plugins and so on.

- `/content` and `/pages` folders are reserved by Astro for content collections and serving pages.

  - `/pages/api` is for serverless API routes. Currently used for retrieving and updating post data.

- `/components` is a folder of folders for types of components divided by frameworks for easy search: `/astro`, `/react`. There's also `/mdx` folder which I think is okay to use for any shared interactive blocks between the articles. Inside every folder there is flat a division by entity: `/posts`, `/index`, `/navbar`

- `/db` is for Database initialization: `pg` pool, `kysely` instance. In `/db/schema.ts` is a generated file by `prisma-kysely` generator so there would be no need to map Prisma and kysely types. Also there are files like `post.ts` with repositories to manipulate the database, so that API routes would not be as bloated.

- `/layouts` is, well, for layouts. Perhaps its place is in components, but I have left it as is. There is a `base` folder where I split multiple parts of "Base" layout - scripts, favicons and so on.

- `/lib` is a folder for utilities, zod schemas, API client and so on.

- `/styles` is for global styles: there is a `components.css` for classes like `box` and `index.css` for other global styles and reexporting the other two.

`/plugins` is for any plugins, specifically for `rehype`, `remark` and `expressive-code`.

`/prisma` is for Prisma configuration.

`startup.sh` and `compose.yml` exist for the purpose of using database locally with ease. The script elevates `docker-compose` with postgres, runs migrations against the db and runs the server. Do not forget to add executable rights to `startup.sh.`

## Features:

- Multiple themes support via `daisyUI`
- Extended `MDX` support with `remark` and `rehype` plugins
- Cool themed code blocks with `expressive-code`
- Global search via `pagefind`
- Global `configuration` of text width and size
- Grid view to paginate posts
- `RSS`, `sitemap`, `OpenGraph` images, `SEO`-optimized, adaptive and performant without any unnecessary JS sent to the client
- Database integration via `postgres`, `supabase`, `Prisma` and `kysely`

This project is licensed under the terms of the MIT license.
