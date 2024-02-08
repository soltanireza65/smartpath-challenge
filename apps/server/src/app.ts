import { getServer } from "@/utils/server"
import { authRoutes } from "@/routes/auth.routes"
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
        this._server.register(authRoutes, { prefix: "/api/auth" });
    }

    connnectDB() {
        // this._server.register(dbConnector)
    }

    public get server(): FastifyInstance {
        return this._server
    }


    async listen() {
        try {
            await this._server.listen({
                port: this._port,
                host: this._host,
            });
        } catch (error) {
            this._server.log.error(error);
            process.exit(1);
        }
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