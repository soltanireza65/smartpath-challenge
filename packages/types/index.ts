export type SignUpInput = {
    password: string;
    email: string;
    name: string;
}


export type SignUpResponce = {
    id: number;
    email: string;
    name: string;
}

export type SignInInput = {
    email: string;
    password: string;
}

export type SignInResponce = {
    accessToken: string;
}

export type UserResponce = {
    id: number;
    email: string;
    name: string;
}

export type GoogleTokensResult = {
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

export type GoogleUserResult = {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}


export type JWTPayload = {
    id: number;
    email: string;
    name: string | null;
}