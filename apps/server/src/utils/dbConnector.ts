import * as fastifyMongodb from "@fastify/mongodb";
import { FastifyInstance } from "fastify";

export async function dbConnector(server: FastifyInstance) {
    server.register(fastifyMongodb, {
        forceClose: true,
        url: 'mongodb://localhost:27017/fastify'
    })

    server.log.info("Connected to DB")
}