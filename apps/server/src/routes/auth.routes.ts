import { AuthController } from "@/controllers/auth.controller";
import { FastifyInstance } from "fastify";

const signUpSchema = {
    body: {
        required: ['name', 'email', 'password'],
        properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
        },
    },
    response: {
        201: {
            type: "object",
            properties: {
                accessToken: { type: "string" },
            },
        },
    },
}

const signInSchema = {
    body: {
        required: ['email', 'password'],
        properties: {
            email: { type: "string" },
            password: { type: "string" },
        },
    },
    response: {
        200: {
            type: "object",
            properties: {
                accessToken: { type: "string" },
            },
        },
    },
}

export async function authRoutes(server: FastifyInstance) {

    server.post("/signup", { schema: signUpSchema }, AuthController.signup);
    server.post("/signin", { schema: signInSchema }, AuthController.signin);

    server.log.info("Auth routes registered")
}