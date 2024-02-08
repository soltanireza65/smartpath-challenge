import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const AppLayout: FC<Props> = () => {
  return (
    <Box>
      <Box></Box>
      <Box>
        <Outlet />
      </Box>
      <Box></Box>
    </Box>
  );
};

export default AppLayout;
