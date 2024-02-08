import { App } from "@/app";
import { HOST, PORT } from '@/config'
import { getServer } from "./utils/server";

// declare module "fastify" {
//     interface FastifyRequest {
//         user: {
//             name: string;
//         };
//     }

//     interface FastifyInstance {
//         signJWT(): string;
//         verifyJWT(): { name: string };
//     }
// }

export const server = getServer()
async function main() {
    const app = new App(server, +PORT, HOST);

    await app.start();
}

main();
