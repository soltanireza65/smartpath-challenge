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