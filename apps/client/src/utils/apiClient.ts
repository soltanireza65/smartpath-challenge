import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:8000/api",
    // baseURL: process.env.NEX_PUBLIC_API_BASE_URL + "/api",
})