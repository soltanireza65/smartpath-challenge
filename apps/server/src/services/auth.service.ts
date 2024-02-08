import { App } from "@/app"
import { server } from "@/main"
import { SignInInput, SignInResponce, SignUpInput } from "@/schemas/auth.schemas"
import { hashPassword, verifyPassword } from "@/utils/hash.util"
import prisma from "@/utils/prisma"
import { getServer } from "@/utils/server"



export class AuthService {

    public static async signup(payload: SignUpInput) {

        const { password, ...rest } = payload

        const { hash, salt } = hashPassword(password)


        const user = await prisma.user.create({
            data: { ...rest, salt, password: hash }
        })
        return user
    }
    public static async signin(payload: SignInInput): Promise<SignInResponce> {


        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })

        if (!user) {
            throw new Error("Invalid Credentials")
        }


        const verified = verifyPassword({ candidatePassword: payload.password, hash: user.password, salt: user.salt })

        if (!verified) {
            throw new Error("Invalid Credentials")
        }

        const { password, salt, ...rest } = user
        const token = server.jwt.sign(rest)

        return { accessToken: token }
    }
}