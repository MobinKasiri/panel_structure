import { useMemo } from "react";
import { theme as getTheme } from "design_system";
import { ThemeProvider as Provider } from "@mui/material";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useMemo(() => getTheme("light"), []);

  return <Provider theme={theme}>{children}</Provider>;
};

export default ThemeProvider;
