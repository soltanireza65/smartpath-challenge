import { getServer } from "@/server"
// import { dbConnector } from "./utils/dbConnector"
import { userRoutes } from "@/routes/user.routes"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

export class App {
    private _server: FastifyInstance
    constructor(
        private readonly _port: number = 8000,
        private readonly _host: string = "0.0.0.0"
    ) {
        this._server = getServer()
    }

    async start() {
        this.decorate()

        this.connnectDB()

        this.registerRoutes()

        this.addHook();

        await this.listen();

        this.gracefullyClose()
    }

    decorate() {
        this._server.decorate("signJWT", () => "token")
        this._server.decorate("verifyJWT", () => ({ "name": "reza" }))
    }
    addHook() {
        this._server.decorateRequest("user", null)
        this._server.addHook("preHandler", async (request: FastifyRequest, reply: FastifyReply) => {
            request.user = {
                name: "reza"
            }
        })

        this._server.addHook("onRequest", async (req, reply) => this._server.log.info("onRequest"))

        this._server.addHook("onResponse", async (req, reply) => this._server.log.info(`onResponse: ${reply.elapsedTime}`))

    }

    registerRoutes() {
        this._server.register(userRoutes, { prefix: "/api/users" });
    }

    connnectDB() {
        // this._server.register(dbConnector)
    }

    public get server(): FastifyInstance {
        return this._server
    }


    async listen() {
        await this._server.listen({
            port: this._port,
            host: this._host,
        });
    }

    gracefullyClose() {
        ["SIGINT", "SIGTERM"].forEach((signal) => {
            process.on(signal, async () => {
                await this._server.close();
                process.exit(0);
            });
        });
    }
}