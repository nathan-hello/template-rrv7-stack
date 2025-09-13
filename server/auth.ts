import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./drizzle/db";

const prodUrl = process.env.PRODUCTION_URL;

if (!prodUrl) {
        throw Error(".env: `PRODUCTION_URL` is required")
}

const devUrl = "http://localhost:5173";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "pg" or "mysql"
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
    revokeSessionsOnPasswordReset: true,
  },
  trustedOrigins: [prodUrl, devUrl],
  account: {
    accountLinking: {
      enabled: true,
      allowUnlinkingAll: true,
      allowDifferentEmails: true,
      updateUserInfoOnLink: true,
    },
    updateAccountOnSignIn: true,
  },
  session: {
    storeSessionInDatabase: true,
  },
  cors: {
    origin: [prodUrl, devUrl],
    credentials: true,
  },
});
