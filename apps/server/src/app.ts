import { authRoutes } from "@/routes/auth.routes"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import fastifyJWT from "@fastify/jwt"
import { JWT_SECRET } from "./config"
import { userRoutes } from "./routes/user.routes"
import cors from '@fastify/cors'


export class App {
    constructor(
        private _server: FastifyInstance,
        private readonly _port: number = 8000,
        private readonly _host: string = "0.0.0.0"
    ) { }

    async start() {
        this.registerCors()

        this.registerJwt()

        this.decorate()

        this.registerSchema()

        this.registerRoutes()

        this.addHook();

        await this.listen();

        this.gracefullyShutDown()
    }

    registerJwt() {
        this._server.register(fastifyJWT, {
            secret: JWT_SECRET
        })
    }

    decorate() {
        this._server.decorate("auth", async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await request.jwtVerify()
            } catch (error) {
                return reply.send(error)
            }
        })
    }


    async registerCors() {
        await this._server.register(cors, {})
    }

    addHook() { }

    registerSchema() {
        // [...authSchemas].forEach((schema) => this._server.addSchema(schema))

    }
    registerRoutes() {
        this._server.register(authRoutes, { prefix: "/api/auth" });
        this._server.register(userRoutes, { prefix: "/api/users" });
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

    gracefullyShutDown() {
        ["SIGINT", "SIGTERM"].forEach((signal) => {
            process.on(signal, async () => {
                await this._server.close();
                process.exit(0);
            });
        });
    }
}