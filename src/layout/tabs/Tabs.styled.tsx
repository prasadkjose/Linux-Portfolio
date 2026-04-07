import styled, { css } from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(24, 24, 24, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
`;

export const TabBar = styled.div`
  display: flex;
  background: linear-gradient(
    to bottom,
    rgba(32, 32, 32, 0.9),
    rgba(24, 24, 24, 0.9)
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 0 8px;
  height: 40px;
  align-items: center;
  gap: 2px;

  @media (max-width: 550px) {
    flex-direction: column;
    padding: 0;
    border-bottom: none;
    gap: 0;
  }
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  position: relative;
  background: transparent;
  border: none;
  color: #d8dee9;
  padding: 8px 16px;
  font-size: 13px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px 6px 0 0;
  transition: all 0.2s ease;
  margin: 0;
  width: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #eceff4;
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      background: rgba(0, 212, 255, 0.15);
      color: #00d4ff;
      border-bottom: 2px solid #00d4ff;
      box-shadow: 0 2px 8px rgba(0, 212, 255, 0.2);

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: #00d4ff;
      }
    `}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.3);
  }

  @media (max-width: 550px) {
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 12px 16px;
    text-align: left;
    width: 100%;
    background: black;

    &:last-child {
      border-bottom: none;
    }

    ${({ $isActive }) =>
      $isActive &&
      css`
        border-bottom: none;
        background: rgba(0, 213, 255, 1);
        color: #ffffffff;

        &::after {
          display: none;
        }
      `}
  }
`;

export const TabContent = styled.div`
  flex: 1;
  padding: 36px;
  background: rgba(24, 24, 24, 0.85);
  color: #eceff4;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
  overflow: auto;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 550px) {
    padding: 20px 16px;
    scrollbar-width: thin;
  }
`;

export const MobileMenuButton = styled.button`
  display: flex;
  background: rgba(32, 32, 32, 0.95);
  border: none;
  color: #eceff4;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;

  @media (max-width: 550px) {
    display: flex;
  }

  &:hover {
    background: rgba(40, 40, 40, 0.95);
  }
`;

export const MobileMenuIcon = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  transform: ${props => (props.$isOpen ? "rotate(180deg)" : "rotate(0)")};

  svg {
    width: 20px;
    height: 20px;
    stroke: #00d4ff;
  }
`;

export const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(24, 24, 24, 0.98);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  overflow-y: auto;

  @media (max-width: 550px) {
    display: contents;
    > * {
      transform-origin: top center;
      animation: slideDown 0.28s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
  }

  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-4px) scaleY(0.96);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scaleY(1);
    }
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;
