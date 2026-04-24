import { useState, useEffect } from "react";
import styled from "styled-components";
import { getDatabaseStatus } from "../services/databaseService";
import logger from "../utils/logger";
import { ThemeSwitcherProps } from "../types/window";
import { DefaultTheme } from "styled-components/dist/types";

type LoadingState = {
  label: string;
  onStateLoad?: () => void;
};

const StatusContainer = styled.div<{ $currentTheme: DefaultTheme }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  font-size: 13px;
  color: ${props => props.$currentTheme.colors.text[100]};
  z-index: 1000;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusPulse = styled.div`
  width: 10px;
  height: 10px;
  background-color: #22c55e;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
`;

const LoadingStatus = styled.div`
  display: flex;
  gap: 4px;
  margin-left: auto;
  font-size: 11px;
  align-items: center;
`;

const LoadingSpinner = styled.div`
  width: 12px;
  height: 12px;
  border: 2px solid #ccc;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
`;

const LOADING_STATES: LoadingState[] = [
  {
    label: "Initializing Resources",
  },
  {
    label: "Configuring Database Connection",
    onStateLoad: async () => {
      logger.log("Establishing database connection...");
      try {
        const status = await getDatabaseStatus();
        // Log connection info WITHOUT exposing user credentials
        logger.log(`Database connection status:, {
          configured: ${status.configured},
          host: ${status.host},
          port: ${status.port},
          database: ${status.database},
          poolerType: ${status.poolerType},
          region: ${status.region},
          timestamp: ${status.timestamp}
        }`);
      } catch (error) {
        logger.error(`Failed to get database status: ${error}`);
      }
    },
  },
  {
    label: "Loading Application Assets",
  },
  {
    label: "Establishing Secure Session",
  },
  {
    label: "Preparing User Interface",
  },
];

const LoadingStatusBar: React.FC<ThemeSwitcherProps> = ({ currentTheme }) => {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  useEffect(() => {
    // Run onStateLoad method for initial state
    LOADING_STATES[0].onStateLoad?.();

    const interval = setInterval(() => {
      setCurrentStateIndex(prev => {
        const nextIndex = prev < LOADING_STATES.length - 1 ? prev + 1 : prev;

        // Execute optional method when state changes
        if (nextIndex !== prev) {
          LOADING_STATES[nextIndex].onStateLoad?.();
        }

        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Status Bar - Loading Indicator */}
      <StatusContainer $currentTheme={currentTheme}>
        <StatusIndicator>
          {/* Green Success Pulse Indicator */}
          <StatusPulse />
          <span>Active</span>
        </StatusIndicator>
        <LoadingStatus>
          {LOADING_STATES[currentStateIndex].label} ...
          <LoadingSpinner />
        </LoadingStatus>
      </StatusContainer>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
          }
          
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }
      `}</style>
    </>
  );
};

export default LoadingStatusBar;
