import { config } from 'dotenv';
import { z } from "zod";

config();

const schema = z.object({
    PORT: z.string(),
    NODE_ENV: z.string(),
    HOST: z.string(),
    JWT_SECRET: z.string(),
})

export type Config = z.infer<typeof schema>;

export const { PORT, NODE_ENV, HOST, JWT_SECRET } = schema.parse(process.env);