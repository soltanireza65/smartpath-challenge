import { FastifySchema } from "fastify";
import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";


const authCoreSchema = {
    email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" }).email(),
    name: z.string(),
}

// SIGNUP
const signUpRequestSchema = z.object({
    ...authCoreSchema,
    password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string" }),
})

const signUpResponceSchema = z.object({
    id: z.number(),
    ...authCoreSchema,
})
// SIGNUP

// SIGNIN
const signInRequestSchema = z.object({
    email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" }).email(),
    password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string" }),
})

const signInResponceSchema = z.object({
    accessToken: z.string(),
})

// SIGNIN




export type SignUpInput = z.infer<typeof signUpRequestSchema>;
export type SignUpResponce = z.infer<typeof signUpResponceSchema>;

export type SignInInput = z.infer<typeof signInRequestSchema>;
export type SignInResponce = z.infer<typeof signInResponceSchema>;

export const { schemas: authSchemas, $ref: $authSchemaRef } = buildJsonSchemas({ signUpRequestSchema, signUpResponceSchema, signInRequestSchema, signInResponceSchema })

export const signUpSchema: FastifySchema = { body: $authSchemaRef("signUpRequestSchema"), response: { 201: $authSchemaRef("signUpResponceSchema") } }
export const signInSchema: FastifySchema = { body: $authSchemaRef("signInRequestSchema"), response: { 201: $authSchemaRef("signInResponceSchema") } }