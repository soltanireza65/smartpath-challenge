import { App } from "@/app";

async function test() {
    const app = new App()
    const res = await app.server.inject({
        method: "GET",
        url: "/",
    })

    console.log(`Status: ${res.statusCode} Body: ${res.body}`)
}

test();