import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "./drizzle/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Resend from "next-auth/providers/resend"
import { accounts, sessions, users, verificationTokens } from "./drizzle/schema"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google, 
    Resend({
      from: "FinVue <finvue@gabrielhazout.me>",
      apiKey: process.env.AUTH_RESEND_KEY,
    }),
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  pages: {
    signIn: "/",
  },
}) 