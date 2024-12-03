import { Box, Button, Modal, Typography } from "@mui/material";
import Container from "./Container";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../../lib/hooks/useQueryParams";
import {
  LocalNames,
  MODAL_NAMES,
  QueryParameters,
} from "../../lib/constant/local_enums";
import { GoogleIcon, LMenu } from "design_system";
import Cookies from "js-cookie";

interface RightSideNavProps {
  logo: string;
  title: string;
}

const RightSideNav = ({ logo, title }: RightSideNavProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      {logo}
      <Typography
        sx={(theme) => ({
          color: theme?.palette?.primary["main"],
        })}
        variant="subtitle2"
      >
        {title}
      </Typography>
    </Box>
  );
};

const LeftSideNav = () => {
  const { getSearchParams, setSearchParams, deleteSearchParams } =
    useQueryParams();

  const navigate = useNavigate();

  const handleLogoutModal = () => {
    setSearchParams(QueryParameters.modal, MODAL_NAMES.logout);
  };

  const handleCloseModal = () => {
    deleteSearchParams(QueryParameters.modal);
    Cookies.remove(LocalNames.token);
    sessionStorage.removeItem(LocalNames.token);
    navigate({ pathname: "/login" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      {/* <Link to="/notifications">
        <IconButton>
          <GoogleIcon iconName="notifications" />
        </IconButton>
      </Link> */}

      <LMenu
        triggerEl={
          <Button
            variant="outlined"
            color="gray"
            size="small"
            endIcon={<GoogleIcon iconName="account_circle" />}
            startIcon={<GoogleIcon iconName="keyboard_arrow_down" />}
            sx={{ width: 100 }}
          >
            ادمین
          </Button>
        }
      >
        <Button
          variant="text"
          onClick={handleLogoutModal}
          color="gray"
          sx={{ width: 100 }}
          endIcon={<GoogleIcon iconName="logout" />}
        >
          <Typography variant="body1">خروج</Typography>
        </Button>
      </LMenu>

      <Modal
        open={getSearchParams(QueryParameters.modal) === MODAL_NAMES.logout}
      >
        <Box
          sx={{
            bgcolor: "white",
            width: "440px",
            borderRadius: 2,
            paddingX: "24px",
            paddingY: "16px",
          }}
        >
          <Typography variant="h6" mb={2}>
            خروج از حساب کاربری
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mr: "auto",
              width: "fit-content",
            }}
          >
            <Button
              onClick={() => {
                deleteSearchParams(QueryParameters.modal);
              }}
              color="inherit"
              variant="text"
            >
              انصراف
            </Button>
            <Button onClick={handleCloseModal} color="error">
              خروج
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const Navigation = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        minHeight: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: 4,
        position: "relative",
        zIndex: 2,
        paddingX: 3,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <RightSideNav logo={"icon"} title="سیستم مدیریت کاربران" />
          <LeftSideNav />
        </Box>
      </Container>
    </Box>
  );
};

export default Navigation;
