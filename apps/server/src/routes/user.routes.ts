import { UserController } from "@/controllers/user.controller";
import prisma from "@/utils/prisma";
import { FastifyInstance } from "fastify";


const getUsersSchema = {
    response: {
        200: {
            type: "array",
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                }
            }
        },
    },
}

export async function userRoutes(server: FastifyInstance) {

    server.get("/", { schema: getUsersSchema }, UserController.get);
    server.delete("/", async () => {
        return await prisma.user.deleteMany({
        })
    });


    server.log.info("User routes registered")
}