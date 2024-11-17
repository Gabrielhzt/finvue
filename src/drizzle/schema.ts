import { sql } from "drizzle-orm";
import { uuid, varchar, timestamp} from "drizzle-orm/pg-core";

import { pgTable } from "drizzle-orm/pg-core";

const createdAt = timestamp('created_at').notNull().default(sql`now()`);
const updatedAt = timestamp('updated_at').notNull().default(sql`now()`);

export const users = pgTable('users', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    email: varchar('email', { length: 255 }).notNull().unique(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    createdAt,
    updatedAt,
});