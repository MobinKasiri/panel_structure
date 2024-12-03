import { Color, PaletteColorOptions } from "@mui/material";
import React from "react";

declare module "@mui/material/styles" {
  interface PaletteColor extends Color {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
  }

  interface Palette {
    gray: PaletteColorOptions;
    pink: PaletteColorOptions;
  }
  interface PaletteOptions {
    gray?: PaletteColorOptions;
    pink?: PaletteColorOptions;
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    gray: true;
    pink: true;
  }
}
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    zero: true;
    mobileS: true;
    tabletM: true;
    tabletL: true;
    desktopS: true;
    desktopM: true;
    desktopL: true;
    desktopXl: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    buttonSmall: React.CSSProperties;
    buttonMedium: React.CSSProperties;
    buttonLarge: React.CSSProperties;
    subtitle3: React.CSSProperties;
    body3: React.CSSProperties;
    label1: React.CSSProperties;
    label2: React.CSSProperties;
    label3: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    buttonSmall?: React.CSSProperties;
    buttonMedium?: React.CSSProperties;
    buttonLarge?: React.CSSProperties;
    subtitle3?: React.CSSProperties;
    body3?: React.CSSProperties;
    label1?: React.CSSProperties;
    label2?: React.CSSProperties;
    label3?: React.CSSProperties;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    buttonSmall: true;
    buttonMedium: true;
    buttonLarge: true;
    subtitle3?: true;
    body3?: true;
    label1?: true;
    label2?: true;
    label3?: true;
    caption: true;
  }
}
