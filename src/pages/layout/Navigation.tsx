import { Box } from "@mui/material";
import Container from "./Container";

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
      }}
    >
      <Container>Navigation part</Container>
    </Box>
  );
};

export default Navigation;
