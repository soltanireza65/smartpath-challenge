import { UserService } from "@/services/user.service";
import { FastifyReply, FastifyRequest } from "fastify";

export class UserController {
    public static async get(
        request: FastifyRequest,
        reply: FastifyReply
    ) {
        try {
            const users = await UserService.findUsers()

            return reply.code(200).send(users)
        } catch (error) {
            return reply.code(500).send(error)
        }
    }
}
