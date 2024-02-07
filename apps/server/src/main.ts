import { App } from "@/app";
import { HOST, PORT } from '@/config'

declare module "fastify" {
    interface FastifyRequest {
        user: {
            name: string;
        };
    }

    interface FastifyInstance {
        signJWT(): string;
        verifyJWT(): { name: string };
    }
}

async function main() {
    const app = new App(+PORT, HOST);

    await app.start();
}

main();
