import { CLIENT_URL } from "@/config";
import { server } from "@/main";
import { AuthService } from "@/services/auth.service";
import { SignInInput, SignUpInput } from "@/types";
import prisma from "@/utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

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
    public static async forggotPassword(
        request: FastifyRequest<{ Body: { email: string } }>,
        reply: FastifyReply
    ) {
        const { email } = request.body

        try {
            const res = await AuthService.forggotPassword({ email })

            return reply.code(201).send(res)
        } catch (error) {
            return reply.code(401).send(error)
        }
    }
    public static async verifyPasswordResetCode(
        request: FastifyRequest<{ Body: { email: string, code: string } }>,
        reply: FastifyReply
    ) {
        const { email, code } = request.body

        try {
            const res = await AuthService.verifyPasswordResetCode({ email, code })

            return reply.code(200).send(res)
        } catch (error) {
            return reply.code(401).send(error)
        }
    }
    public static async passwordReset(
        request: FastifyRequest<{ Body: { email: string, password: string, code: string } }>,
        reply: FastifyReply
    ) {
        const { email, password, code } = request.body

        try {
            const res = await AuthService.passwordReset({ email, password, code })

            return reply.code(200).send(res)
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

            return reply.redirect(`${CLIENT_URL}/auth/callback?accessToken=${token}`)

        } catch (error) {
            server.log.error("🚀 ~ AuthController ~ error:", error)
            reply.redirect(CLIENT_URL)
        }
    }
}
