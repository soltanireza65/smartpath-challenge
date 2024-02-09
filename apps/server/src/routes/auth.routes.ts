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
const passwordForgotSchema = {
    body: {
        required: ['email'],
        properties: {
            email: { type: "string" },
        },
    },
    response: {
        200: {
            type: "object",
            properties: {
                resetCode: { type: "string" },
            },
        },
    },
}
const passwordForgotVerifyCodeSchema = {
    body: {
        required: ['email'],
        properties: {
            email: { type: "string" },
        },
    },
    response: {
        200: {
            type: "object",
            properties: {
                resetCode: { type: "string" },
            },
        },
    },
}

const passwordResetSchema = {
    body: {
        required: ['email', 'code'],
        properties: {
            email: { type: "string" },
            code: { type: "string" },
        },
    },
    response: {
        200: {
            type: "object",
            properties: {
                resetCode: { type: "string" },
            },
        },
    },
}

export async function authRoutes(server: FastifyInstance) {

    server.post("/signup", { schema: signUpSchema }, AuthController.signup);
    server.post("/signin", { schema: signInSchema }, AuthController.signin);

    server.post("/password-forgot", { schema: passwordForgotSchema }, AuthController.forggotPassword);
    server.post("/password-forgot-verify", AuthController.verifyPasswordResetCode);
    server.post("/password-reset", AuthController.passwordReset);

    server.get("/oauth/google", AuthController.googleOAuth);
    server.log.info("Auth routes registered")
}