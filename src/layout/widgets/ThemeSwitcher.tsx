import React, { useState } from "react";
import styled, { css, DefaultTheme } from "styled-components";
import themes from "../../styles/themes";
import type { ThemeSwitcherProps } from "../../types/window";
import { useTheme } from "../../hooks/useTheme";
import { PERSONAL_DATA } from "../../config/personalData.config";
import Tooltip from "../tooltips/Tooltip";

interface ThemeButtonProps {
  $isActive: boolean;
  $theme: DefaultTheme;
}

const Container = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: ${props => (props.$isVisible ? "50%" : "60px")};
  left: ${props => (props.$isVisible ? "50%" : "")};
  right: ${props => (props.$isVisible ? null : "16px")};
  transform: ${props => (props.$isVisible ? "translate(-50%, -50%)" : "")};

  z-index: ${props => (props.$isVisible ? 1000 : 100)};
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  background: rgba(0, 0, 0, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  width: auto;

  // isMobile
  ${props =>
    !props.$isVisible &&
    `@media (max-width: 550px) {
    width: 100%;
    right: 0;
    top: calc(100% - 86px);
  }`}
`;

const ThemeButton = styled.button<ThemeButtonProps>`
  position: relative;
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
    color: white;
  }

  ${props =>
    props.$isActive &&
    css`
      background: ${props.$theme.colors.body};
      color: ${props.$theme.colors.text[100]};
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 2px;
        background: ${props.$theme.colors.text[300]};
        box-shadow: 0 0 10px ${props.$theme.colors.body};
      }
    `}

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }

  /* Terminal-style cursor for active button */
  ${props =>
    props.$isActive &&
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

const TypingText = styled.div`
  font-family: "Courier New", Courier, monospace;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  padding: 8px 16px 12px 16px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  letter-spacing: 0.5px;
  grid-column: 1 / 3;

  /* Typing effect container */
  span {
    color: white;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    animation: typing 2s steps(18, end);
    position: relative;
  }

  p {
    margin: 0;
  }

  /* Cursor that blinks during the typing animation */
  span::after {
    content: "|";
    position: absolute;
    right: -1px;
    bottom: 2px;
    width: 4px;
    height: 12px;
    background: white;
    animation: blink 0.8s infinite;
    opacity: 1;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
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
`;

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  themeSwitcher,
  currentTheme,
}) => {
  const { themeLoaded } = useTheme();
  const [$isVisible, set$isVisible] = useState(!themeLoaded);

  const themesList = Object.keys(themes)
    .map((key: string) => {
      return {
        key: themes[key].id,
        label: themes[key].name,
        theme: themes[key],
      };
    })
    .filter(({ key }) => key !== "empty");

  const handleThemeChange = (newTheme: DefaultTheme) => {
    if (newTheme.id !== currentTheme.id) {
      themeSwitcher(newTheme);
      set$isVisible(themeLoaded);
    }
  };

  return (
    <Container $isVisible={$isVisible}>
      {themesList.map(({ key, label, theme }) => (
        <ThemeButton
          key={key}
          $isActive={currentTheme.id === theme.id}
          $theme={theme}
          onClick={() => handleThemeChange(theme)}
          aria-label={`Switch to ${label} theme`}
          title={`Switch to ${label} theme`}
        >
          {label}
        </ThemeButton>
      ))}
      {<Tooltip id="theme-switcher-hint" showCondition={!$isVisible} />}
      {$isVisible && (
        <TypingText>
          <span>Wecome to {PERSONAL_DATA.personalInfo.shortName}'s PC</span>
          <p>Choose an OS view</p>
        </TypingText>
      )}
    </Container>
  );
};

export default ThemeSwitcher;
