import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

const LoginCallBack: FC<{}> = ({ }) => {
    // const navigate = useNavigate()

    // const { session: { info: { isLoggedIn } } } = useSession();

    // useEffect(() => {
    //  const t = setTimeout(() => {
    //     navigate("/", { replace: true });
    //   }, 2000);

    //   return () => clearTimeout(t);
    // }, [isLoggedIn])

    return (
        <Box>
            <Text>Redirecting...</Text>
        </Box>
    );
};

export default LoginCallBack;