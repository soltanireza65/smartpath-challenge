import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_OAUTH_REDIRECT_URL } from "@/config"
import { server } from "@/main"
import { hashPassword, verifyPassword } from "@/utils/hash.util"
import prisma from "@/utils/prisma"
import axios from "axios"
import { stringify } from "qs"
import { GoogleTokensResult, GoogleUserResult, SignInInput, SignInResponce, SignUpInput } from "types"



export class AuthService {

    public static async signup(payload: SignUpInput) {

        const { password, ...rest } = payload

        const { hash, salt } = hashPassword(payload.password)

        const user = await prisma.user.create({
            data: { ...rest, salt, password: hash }
        })

        const token = server.jwt.sign({ id: user.id, ...rest })

        return {
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
}


