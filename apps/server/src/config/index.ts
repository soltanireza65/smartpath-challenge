import { config } from 'dotenv';
import { z } from "zod";

config();

const schema = z.object({
    PORT: z.string(),
    NODE_ENV: z.string(),
    HOST: z.string(),
    JWT_SECRET: z.string(),
})
// const userSchema = z.object({
//     username: z.string(),
//     password: z.string(),
//     confirmPassword: z.string(),
// }).refine(data => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"]
// })

// userSchema.parse({ username: "test", password: "test", confirmPassword: "testt" })

export type Config = z.infer<typeof schema>;

export const { PORT, NODE_ENV, HOST, JWT_SECRET } = schema.parse(process.env);