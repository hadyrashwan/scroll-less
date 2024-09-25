import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";

import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "./schema"


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Resend({
    from:process.env.AUTH_FROM_EMAIL_NO_REPLY
  })],
  adapter: DrizzleAdapter(db),
});
import type { NextAuthOptions } from "next-auth"
