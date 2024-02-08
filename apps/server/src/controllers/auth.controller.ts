import { FastifyReply, FastifyRequest } from "fastify";

export class AuthController {
    public static async signup(
        request: FastifyRequest<{ Body: { username: string; password: string } }>,
        reply: FastifyReply
    ) {
        const { body } = request

        // server.signJWT()


        return reply.code(201).send({
            ...body,
            user: request.user,
            // token: server.signJWT(),
            // verified: server.verifyJWT()
        });
    }
    public static async signin(
        request: FastifyRequest<{ Body: { username: string; password: string } }>,
        reply: FastifyReply
    ) {

    }
}
