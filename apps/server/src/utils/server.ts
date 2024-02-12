import Fastify from "fastify";

export function getServer() {
    const server = Fastify({
        logger: {
            transport: {
                target: "pino-pretty",
            },
        },
    });

    server.get("/", async (request, reply) => {
        return reply.code(200).send("OK");
    })
    server.get("/hc", async (request, reply) => {
        // TODO: add health check
        return reply.code(200).send({ status: "healthy" });
    })

    return server
}


