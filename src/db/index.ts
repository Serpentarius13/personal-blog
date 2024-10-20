import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
import { type DB } from "./schema"; // this is the Database interface we defined earlier

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    connectionString: import.meta.env.DATABASE_URL,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
