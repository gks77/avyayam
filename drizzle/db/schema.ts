import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  username: varchar('username',{ length: 256 }).unique(),
  password: varchar('password',{length: 256})
});