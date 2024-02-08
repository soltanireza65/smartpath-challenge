import { FC, useEffect } from "react";
import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute: FC<RouteProps> = () => {
    const { accessToken, isAuthenticated, setIsAuthenticated } = useAuth()

    useEffect(() => {
        setIsAuthenticated(!!accessToken ?? false)
    }, [accessToken])

    if (!isAuthenticated) {
        return <Navigate to={"/auth/signup"} replace />;
    }

    return <Outlet />;
};