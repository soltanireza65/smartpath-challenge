import { config } from 'dotenv';
import { z } from "zod";

config();

const schema = z.object({
    PORT: z.string(),
    NODE_ENV: z.string(),
    HOST: z.string(),
    JWT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_OAUTH_REDIRECT_URL: z.string(),

    MAILER_USER: z.string(),
    MAILER_PASS: z.string(),
    MAILER_HOST: z.string(),
    MAILER_PORT: z.string(),
    MAILER_SECURE: z.string(),

    CLIENT_URL: z.string(),
})

export type Config = z.infer<typeof schema>;

export const {
    PORT,
    NODE_ENV,
    HOST,
    JWT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_OAUTH_REDIRECT_URL,

    MAILER_HOST,
    MAILER_PASS,
    MAILER_PORT,
    MAILER_SECURE,
    MAILER_USER,

    CLIENT_URL
} = schema.parse(process.env);