import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

type Props = {};

const AppLayout: FC<Props> = () => {
  return (
    <Box>
      <Flex gap={4} justifyContent="center" bg={"gray.100"} p={4}>
        <Link to="/">Home</Link>
        <Link to="/auth/signin">signin</Link>
        <Link to="/auth/signup">signup</Link>
        <Link to="/auth/password-forgot">forgot</Link>
        <Link to="/auth/password-reset">reset</Link>
      </Flex>
      <Box>
        <Outlet />
      </Box>
      <Box></Box>
    </Box>
  );
};

export default AppLayout;
