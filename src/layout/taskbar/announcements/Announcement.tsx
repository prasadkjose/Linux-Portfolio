import React, { useRef } from "react";
import styled from "styled-components";
import { NewFeature, newFeatures } from "../../../config/features.config";
import { WidgetComponentProps } from "../../../config/taskbar.config";
import { useWidgetPanelCloseHandlers } from "../hooks/useWidgetPanelCloseHandlers";

export const AnnouncementTaskbarBtn = ({
  onClick,
  title,
  id,
}: WidgetComponentProps) => {
  return (
    <StyledButton id={id} onClick={onClick} title={title}>
      ✨
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #eceff4;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.15s ease;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &::after {
    content: "";
    position: absolute;
    top: 6px;
    right: 6px;
    width: 6px;
    height: 6px;
    background: #4caf50;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
    }
    70% {
      box-shadow: 0 0 0 8px rgba(76, 175, 80, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
    }
  }
`;

const BannerContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  bottom: 56px;
  right: 12px;
  width: 380px;
  max-height: 480px;
  background: rgba(12, 12, 12, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0)" : "translateY(16px)"};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 9998;

  @media (max-width: 480px) {
    width: calc(100vw - 24px);
    right: 12px;
    left: 12px;
  }
`;

const BannerHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: #eceff4;
    font-family:
      system-ui,
      -apple-system,
      Segoe UI,
      Roboto,
      sans-serif;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const FeatureList = styled.div`
  max-height: 380px;
  overflow-y: auto;
  padding: 8px 0;

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

const FeatureItem = styled.div`
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const FeatureTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #eceff4;
  margin-bottom: 4px;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FeatureDescription = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
`;

const FeatureDate = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 6px;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    sans-serif;
`;

const Badge = styled.span<{ $type: string }>`
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: ${({ $type }) => {
    switch ($type) {
      case "new":
        return "rgba(76, 175, 80, 0.2)";
      case "improvement":
        return "rgba(33, 150, 243, 0.2)";
      case "fix":
        return "rgba(255, 193, 7, 0.2)";
      default:
        return "rgba(255, 255, 255, 0.1)";
    }
  }};
  color: ${({ $type }) => {
    switch ($type) {
      case "new":
        return "#4caf50";
      case "improvement":
        return "#2196f3";
      case "fix":
        return "#ffc107";
      default:
        return "rgba(255, 255, 255, 0.7)";
    }
  }};
`;

const Announcement: React.FC<WidgetComponentProps> = ({
  isOpen,
  onClose,
  $parentID,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Use shared widget close handlers
  useWidgetPanelCloseHandlers(
    isOpen ?? false,
    onClose ?? (() => {}),
    panelRef,
    `[id*=${$parentID}]`
  );

  return (
    <BannerContainer
      ref={panelRef}
      $isOpen={!!isOpen}
      onClick={e => e.stopPropagation()}
    >
      <BannerHeader>
        <h3>✨ What's New</h3>
        <span style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)" }}>
          {newFeatures.length} updates
        </span>
      </BannerHeader>
      <FeatureList>
        {newFeatures.map((feature: NewFeature) => (
          <FeatureItem key={feature.id}>
            <FeatureTitle>
              {feature.title}
              {feature.icon && (
                <Badge $type={feature.icon}>{feature.icon}</Badge>
              )}
            </FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
            <FeatureDate>{feature.date}</FeatureDate>
          </FeatureItem>
        ))}
      </FeatureList>
    </BannerContainer>
  );
};

export default Announcement;
