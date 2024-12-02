import { PropsWithChildren } from "react";
import { Container as MuiContainer } from "@mui/material";

const Container = ({ children }: PropsWithChildren) => {
  return (
    <MuiContainer
      sx={(theme) => ({
        [theme.breakpoints.down("desktopL")]: {
          padding: 0,
        },
      })}
    >
      {children}
    </MuiContainer>
  );
};

export default Container;
