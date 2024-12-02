import { Box, Collapse, Typography } from "@mui/material";
import { useApiCall } from "../../lib/services/apicall";
import { useState } from "react";

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

const RecursiveSideBar = ({ data }: { data: MenuItem }) => {
  const [open, openSet] = useState(false);

  const switchCollapse = () => {
    openSet((prev) => !prev);
  };

  if (!data?.menuChildren?.length) {
    return <Typography>{data?.title}</Typography>;
  }
  return (
    <>
      <Typography onClick={switchCollapse}>{data?.title}</Typography>
      <Collapse in={open}>
        {data?.menuChildren?.length ? (
          <Box>
            {data.menuChildren?.map((item, index) => (
              <RecursiveSideBar key={index} data={item} />
            ))}
          </Box>
        ) : null}
      </Collapse>
    </>
  );
};

const Sidebar = () => {
  const { data } = useApiCall<Menu>({
    url: "/api/v1/menu/",
  });

  return (
    <Box
      sx={{
        backgroundColor: "tomato",
        width: 300,
        position: "sticky",
        top: 0,
        height: 100,
      }}
    >
      {data?.SideBarMenu?.map((item, index) => (
        <RecursiveSideBar key={index} data={item} />
      ))}
    </Box>
  );
};

export default Sidebar;
