import { Box } from "@mui/material";
import { useApiCall } from "../../lib/services/apicall";

import { useLocation, useNavigate } from "react-router-dom";
import { LSidebar } from "design_system";

interface MenuItem {
  icon: string;
  id: number;
  menuChildren: MenuItem[];
  menuGroup: string;
  menuOrder: number;
  title: string;
  url: string;
}

interface Menu {
  SideBarMenu: MenuItem[];
}

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data, isLoading } = useApiCall<Menu>({
    url: "/api/v1/menu/",
    shouldCallApi: false,
  });

  return (
    <Box
      sx={(theme) => ({
        overflowY: "auto",
        overflowX: "hidden",
        height: "calc(100vh - 64px)",
        position: "sticky",
        top: 0,
        borderLeft: "1px solid",
        borderRight: "1px solid",
        borderColor: theme.palette?.grey["400"],
        pb: 4,
        direction: "ltr",
        width: 270,
      })}
    >
      <LSidebar
        loading={isLoading}
        pathname={pathname}
        navigate={navigate}
        routes={data?.SideBarMenu ?? []}
      />
    </Box>
  );
};

export default Sidebar;
