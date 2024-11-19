import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    uuid,
    decimal,
    pgEnum,
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"
  
export const users = pgTable("user", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
})
  
export const accounts = pgTable("account", {
    userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
)

export const categories = pgTable("category", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name").notNull(),
    color: text("color").notNull(),
    icon: text("icon").notNull(),
    userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date" })
    .$defaultFn(() => new Date()),
})

export const transactionTypes = pgEnum("transaction_type", ["income", "expense"])

export const transactions = pgTable("transaction", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    type: transactionTypes("type").notNull(),
    description: text("description"),
    date: timestamp("date", { mode: "date" })
    .$defaultFn(() => new Date()),
    categoryId: uuid("categoryId")
    .references(() => categories.id, { onDelete: "set null" }),
    userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
})

export const budgets = pgTable("budget", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    spent: decimal("spent", { precision: 10, scale: 2 }).$default(() => "0"),
    month: integer("month").notNull(),
    year: integer("year").notNull(),
    categoryId: uuid("categoryId")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
    userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
})

export const recurringTransactionTypes = pgEnum("recurring_transaction_type", ["daily", "weekly", "monthly", "yearly"])

export const recurringTransactions = pgTable("recurring_transaction", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    type: transactionTypes("type").notNull(),
    description: text("description"),
    frequency: recurringTransactionTypes("frequency").notNull(),
    startDate: timestamp("start_date", { mode: "date" }).notNull(),
    endDate: timestamp("end_date", { mode: "date" }),
    categoryId: uuid("categoryId")
    .references(() => categories.id, { onDelete: "set null" }),
    userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
    lastProcessed: timestamp("last_processed", { mode: "date" }),
})