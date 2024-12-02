import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";
import Container from "./Container";
import { accessTokenExist } from "../../lib/utils/functions";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Layout = () => {
  if (!accessTokenExist()) {
    return <Navigate to="/" />;
  }

  return (
    <Box>
      <Box>
        <Navigation />
      </Box>
      <Box>
        <Container>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Sidebar />
            <Box sx={{ width: "calc(100% - 300px)" }}>
              <Outlet />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
