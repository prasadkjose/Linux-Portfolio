import React from "react";
import styled, { DefaultTheme } from "styled-components";
import type { ThemeSwitcherProps } from "../types/window";

const Container = styled.div<{ $theme: DefaultTheme; $isBGChange: boolean }>`
  position: fixed;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.96);
  background-image: url(${props =>
    props.$isBGChange
      ? props.$theme.newBackgroundImage
      : props.$theme.splashImage});
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const SplashScreen: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  isBGChange,
}) => {
  return <Container $theme={currentTheme} $isBGChange={isBGChange ?? false} />;
};

export default SplashScreen;
