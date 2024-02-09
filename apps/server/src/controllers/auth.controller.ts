import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_OAUTH_REDIRECT_URL } from "@/config";
import { AuthService } from "@/services/auth.service";
import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import { GoogleUserResult, SignInInput, SignUpInput } from "types";
import { stringify } from "qs";
import { server } from "@/main";
import prisma from "@/utils/prisma";

export class AuthController {
    public static async signup(
        request: FastifyRequest<{ Body: SignUpInput }>,
        reply: FastifyReply
    ) {
        const { body } = request

        try {
            const user = await AuthService.signup(body)

            return reply.code(201).send(user)
        } catch (error) {
            return reply.code(500).send(error)
        }
    }

    public static async signin(
        request: FastifyRequest<{ Body: SignInInput }>,
        reply: FastifyReply
    ) {
        const { body } = request

        try {
            const res = await AuthService.signin(body)

            return reply.code(201).send(res)
        } catch (error) {
            return reply.code(401).send(error)
        }
    }
    public static async googleOAuth(
        request: FastifyRequest<{ Querystring: { code: string } }>,
        reply: FastifyReply
    ) {
        const { code } = request.query

        try {
            const { id_token, access_token } = await AuthService.getGoogleOAuthToken(code)

            // const googleUser = server.jwt.decode(id_token) as GoogleUserResult
            const googleUser = await AuthService.getGoogleUser(id_token, access_token)

            if (googleUser.verified_email !== true) {
                throw new Error("Email not verified")
            }

            const user = await prisma.user.findUnique({
                where: {
                    email: googleUser.email
                }
            })

            if (!user) {
                throw new Error("User not found")
            }

            const { password, salt, ...rest } = user

            const token = server.jwt.sign(rest)

            return reply.redirect(`http://localhost:5173/auth/callback?accessToken=${token}`)

        } catch (error) {
            console.log("🚀 ~ AuthController ~ error:", error)
            reply.redirect("http://localhost:5173")
        }
    }
}
