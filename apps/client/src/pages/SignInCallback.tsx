import { Box, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SignInCallback: FC<{}> = ({ }) => {
    const { setAccessToken, isAuthenticated, setIsAuthenticated } = useAuth()
    const [searchParams] = useSearchParams();
    const accessToken = searchParams.get('accessToken');


    const navigate = useNavigate()


    useEffect(() => {
        accessToken && setAccessToken(accessToken as any)

        const t = setTimeout(() => {
            navigate("/", { replace: true });
        }, 2000);

        return () => clearTimeout(t);
    }, [accessToken])

    return (
        <Box>
            <Text>Redirecting...</Text>
        </Box>
    );
};

export default SignInCallback;