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
        return { hello: "world" };
    })

    return server
}


