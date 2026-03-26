import React from "react";
import styled, { DefaultTheme } from "styled-components";
import type { ThemeSwitcherProps } from "../types/window";

const Container = styled.div<{ $theme: DefaultTheme }>`
  position: fixed;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.96);
  background-image: url(${props => props.$theme.splashImage});
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const SplashScreen: React.FC<ThemeSwitcherProps> = ({ currentTheme }) => {
  return <Container $theme={currentTheme} />;
};

export default SplashScreen;
