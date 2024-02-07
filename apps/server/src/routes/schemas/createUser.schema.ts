export const createUserSchema = {
    body: {
        // $ref: "creatUserSchema#"
        required: ['username', 'password'],
        properties: {
            username: { type: "string" },
            password: { type: "string" },
        },
    },
    response: {
        201: {
            type: "object",
            properties: {
                username: { type: "string" },
                password: { type: "string" },
            },
        },
    },
}