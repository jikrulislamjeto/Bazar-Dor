import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.BETTER_AUTH_DB_URL || "";

declare global {
    var _mongoClient: MongoClient | undefined;
}

if (!globalThis._mongoClient) {
    globalThis._mongoClient = new MongoClient(uri);
}
const client = globalThis._mongoClient;
const db = client.db("bazardor");

const socialProviders: Record<
    string,
    { clientId: string; clientSecret: string }
> = {};

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    socialProviders.google = {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    };
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    socialProviders.github = {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    };
}

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
    },
    socialProviders:
        Object.keys(socialProviders).length > 0 ? socialProviders : undefined,
    session: {
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
    },
});