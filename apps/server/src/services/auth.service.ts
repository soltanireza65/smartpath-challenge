import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_OAUTH_REDIRECT_URL } from "@/config"
import { server } from "@/main"
import { hashPassword, verifyPassword } from "@/utils/hash.util"
import { Mailer } from "@/utils/mailer"
import { generateRandomNumber } from "@/utils/num.utils"
import prisma from "@/utils/prisma"
import * as fastifyJwt from "@fastify/jwt"
import axios from "axios"
import { stringify } from "qs"
import { GoogleTokensResult, GoogleUserResult, JWTPayload, SignInInput, SignInResponce, SignUpInput } from "types"



export class AuthService {

    public static async signup(payload: SignUpInput) {

        const { password, ...rest } = payload

        const { hash, salt } = hashPassword(payload.password)
        try {
            const user = await prisma.user.create({
                data: { ...rest, salt, password: hash }
            })
            server.log.info("🚀 ~ AuthService ~ signup ~ user:", user)

            const token = this.signJWT({ id: user.id, ...rest })

            return {
                accessToken: token,
            }
        } catch (error: any) {
            server.log.error(error)
            if (error.code === "P2002") {
                throw new Error("Email already exists")
            }
            throw error
        }

    }

    public static async signin(payload: SignInInput) {


        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: payload.email
                }
            })

            if (!user) {
                throw new Error("Invalid Credentials1")
            }

            const verified = verifyPassword({ candidatePassword: payload.password, hash: user.password, salt: user.salt })

            if (!verified) {
                throw new Error("Invalid Credentials2")
            }

            const { password, salt, passwordResetCode, ...rest } = user

            const token = this.signJWT(rest, {
                ...(payload.remember && { expiresIn: "30d" })
            })

            return { accessToken: token }
        } catch (error) {
            throw error
        }
    }
    public static async forggotPassword(payload: { email: string }): Promise<any> {


        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })

        if (!user) {
            throw new Error("Invalid Credentials")
        }

        const resetCode = generateRandomNumber()
        console.log("🚀 ~ AuthService ~ forggotPassword ~ resetCode:", resetCode)

        // TODO: set this back to null after reset has been done
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                passwordResetCode: resetCode
            }
        })

        await Mailer.sendEmail({
            from: "0Ug1I@example.com",
            to: user.email,
            subject: "Password Reset",
            text: `Your password reset code is ${resetCode}`
        })

        return { resetCode }
    }

    public static async verifyPasswordResetCode(payload: { email: string, code: string }): Promise<any> {


        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })
        console.log("🚀 ~ AuthService ~ verifyPasswordResetCode ~ user:", user)

        if (!user || user.passwordResetCode != payload.code) {
            throw new Error("Invalid Credentials")
        }

        return {
            success: true
        }
    }
    public static async passwordReset(payload: { email: string, password: string, code: string }): Promise<any> {


        const user = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        })

        // console.log("🚀 ~ AuthService ~ verifyPasswordResetCode ~ user:", user)

        if (!user || user.passwordResetCode != payload.code) {
            throw new Error("Invalid Credentials")
        }

        // we don't need to get passwordConfirmation, since its more of a client side validation than server side (imo).

        const { hash, salt } = hashPassword(payload.password)

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: hash,
                salt,
                passwordResetCode: null
            }
        })

        return {
            success: true
        }
    }



    public static async getGoogleOAuthToken(code: string): Promise<GoogleTokensResult> {
        const url = "https://oauth2.googleapis.com/token";
        const values = {
            code,
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: GOOGLE_OAUTH_REDIRECT_URL,
            grant_type: "authorization_code",
        };

        try {
            const res = await axios.post<GoogleTokensResult>(
                url,
                stringify(values),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            return res.data;
        } catch (error: any) {
            console.error(error.response.data.error);
            // log.error(error, "Failed to fetch Google Oauth Tokens");
            throw new Error(error.message);
        }
    }
    public static async getGoogleUser(id_token: string, access_token: string) {
        try {
            const res = await axios.get<GoogleUserResult>(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${id_token}`,
                    },
                }
            );
            return res.data;
        } catch (error: any) {
            // log.error(error, "Error fetching Google user");
            throw new Error(error.message);
        }
    }


    private static signJWT(payload: JWTPayload, options?: Partial<fastifyJwt.SignOptions>) {
        return server.jwt.sign(payload, {
            // algorithm: "ES256",
            expiresIn: "2h",
            // key: server.config.JWT_PRIVATE_KEY, use separate key for access token and refresh token
            ...(options && options),
        })
    }
}


