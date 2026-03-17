import React, { useState } from "react";
import styled, { css, DefaultTheme } from "styled-components";
import themes from "../styles/themes";
import type { ThemeSwitcher } from "../types/window";

interface ThemeSwitcherProps {
  themeSwitcher: ThemeSwitcher;
  currentTheme: DefaultTheme;
}

interface ThemeButtonProps {
  isActive: boolean;
  themeColor: string;
}

const Container = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: ${props => (props.isVisible ? "flex" : "none")};
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: -15px;
  right: -10px;
  width: 24px;
  height: 24px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1001;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }
`;

const ThemeButton = styled.button<ThemeButtonProps>`
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border-right: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  ${props =>
    props.isActive &&
    css`
      background: ${props.themeColor};
      color: #000;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 2px;
        background: ${props.themeColor};
        box-shadow: 0 0 10px ${props.themeColor};
      }
    `}

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }

  /* Terminal-style cursor for active button */
  ${props =>
    props.isActive &&
    css`
      &::before {
        content: "|";
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        animation: blink 1s infinite;
        font-weight: bold;
      }

      @keyframes blink {
        0%,
        50% {
          opacity: 1;
        }
        51%,
        100% {
          opacity: 0;
        }
      }
    `}
`;

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  themeSwitcher,
  currentTheme,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const themesList = [
    { key: "tech", label: "Linux", theme: themes.tech },
    { key: "fedora", label: "Fedora", theme: themes.fedora },
    { key: "kali", label: "Kali", theme: themes.kali },
  ];

  const handleThemeChange = (newTheme: DefaultTheme) => {
    if (newTheme.id !== currentTheme.id) {
      themeSwitcher(newTheme);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <Container isVisible={isVisible}>
      <CloseButton
        onClick={handleClose}
        aria-label="Close theme switcher"
        title="Close theme switcher"
      >
        ×
      </CloseButton>
      {themesList.map(({ key, label, theme }) => (
        <ThemeButton
          key={key}
          isActive={currentTheme.id === theme.id}
          themeColor={theme.colors.primary}
          onClick={() => handleThemeChange(theme)}
          aria-label={`Switch to ${label} theme`}
          title={`Switch to ${label} theme`}
        >
          {label}
        </ThemeButton>
      ))}
    </Container>
  );
};

export default ThemeSwitcher;
