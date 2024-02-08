import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createUserSchema } from "./schemas/createUser.schema";
import { AuthController } from "@/controllers/auth.controller";
export async function authRoutes(server: FastifyInstance) {
    server.addHook("onRequest", async (req, reply) => server.log.info("api/user: onRequest"))
    server.addHook("onResponse", async (req, reply) => server.log.info(`api/user: onResponse: ${reply.elapsedTime}`))


    server.addSchema({
        $id: "creatUserSchema",
        type: "object",
        required: ['username', 'password'],
        properties: {
            username: { type: "string" },
            password: { type: "string" },
        },
    })

    server.post("/signup", AuthController.signup);
    
    // server.post("/signup", {
    //     schema: createUserSchema,
    //     handler: async (
    //         request: FastifyRequest<{ Body: { username: string, password: string } }>,
    //         reply: FastifyReply,
    //     ) => {
    //         const { body } = request

    //         server.signJWT()


    //         return reply.code(201).send({
    //             ...body,
    //             user: request.user,
    //             token: server.signJWT(),
    //             verified: server.verifyJWT()
    //         });
    //     },
    // });
    // server.post("/signin", {
    //     schema: createUserSchema,
    //     handler: async (
    //         request: FastifyRequest<{ Body: { username: string, password: string } }>,
    //         reply: FastifyReply,
    //     ) => {
    //         const { body } = request

    //         server.signJWT()


    //         return reply.code(201).send({
    //             ...body,
    //             user: request.user,
    //             token: server.signJWT(),
    //             verified: server.verifyJWT()
    //         });
    //     },
    // });

    server.log.info("User routes registered")
}