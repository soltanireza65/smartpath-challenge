import { server } from "@/main"
import { hashPassword, verifyPassword } from "@/utils/hash.util"
import prisma from "@/utils/prisma"
import { SignInInput, SignInResponce, SignUpInput } from "types"



export class AuthService {

    public static async signup(payload: SignUpInput) {

        const { password, ...rest } = payload

        const { hash, salt } = hashPassword(payload.password)

        const user = await prisma.user.create({
            data: { ...rest, salt, password: hash }
        })

        const token = server.jwt.sign({ id: user.id, ...rest })

        return {
            ...user,
            accessToken: token,
        }
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