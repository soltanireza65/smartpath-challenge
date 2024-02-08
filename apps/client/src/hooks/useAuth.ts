import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const useAuth = () => {
    const [accessToken, setAccessToken] = useLocalStorage('accessToken', null)
    const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken ?? false)

    useEffect(() => {
        setIsAuthenticated(!!accessToken ?? false)
    }, [accessToken])

    return {
        accessToken,
        setAccessToken,
        isAuthenticated,
        setIsAuthenticated
    }
}