import { AuthService } from "@/services/auth.service";
import { FastifyReply, FastifyRequest } from "fastify";
import { SignInInput, SignUpInput } from "types";

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
}
