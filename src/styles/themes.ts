import { DefaultTheme } from "styled-components";

export type Themes = {
  [key: string]: DefaultTheme;
};

const theme: Themes = {
  tech: {
    id: "T_007",
    name: "tech",
    colors: {
      body: "#0C0C0C",
      scrollHandle: "#2E3440",
      scrollHandleHover: "#434C5E",
      primary: "#00D4FF",
      secondary: "#FF6B6B",
      text: {
        100: "#ECEFF4",
        200: "#D8DEE9",
        300: "#88C0D0",
      },
    },
    backgroundImage:
      "https://images.unsplash.com/photo-1649675211216-bf4b26942b88?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
};

export default theme;
